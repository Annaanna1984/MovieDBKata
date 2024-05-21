import MDBService from '../../service/MDBService';
import React from 'react';
import './App.css';
import { Layout, Tabs } from 'antd';
import { Content } from 'antd/es/layout/layout';
import MySpin from '../Spin';
import MyAlert from '../Alert';
import { Offline } from 'react-detect-offline';
import { GenreProvider } from '../../GenreContext';
import SearchList from '../SearchList';
import CardList from '../CardList';

export default class App extends React.Component {
    state = {
        movieList: [],
        loading: false,
        error: false,
        totalResults: 0,

        sessionId: '',
        ratedMovieList: [],
        ratedLoading: false,
        ratedError: false,
        ratedTotalResults: 0,
        genres: []
    };
    service = new MDBService();

    getGenreMovies = () => {
        this.service.getGenres().then((res) => {
            this.setState({
                genres: res.genres
            });
        });
    };

    createGuestSession = () => {
        const sessionObj = JSON.parse(localStorage.getItem('session'));
        if (sessionObj) {
            const dateDiff = Date.now() - sessionObj.date;
            if (dateDiff / (1000 * 60 * 60 * 24) < 24) {
                this.setState(
                    {
                        sessionId: sessionObj.session
                    },
                    () => this.getRatedMovieList()
                );
            }
        } else {
            this.service.getGuestSessionId().then((res) => {
                const obj = { session: res.guest_session_id, date: Date.now() };
                localStorage.setItem('session', JSON.stringify(obj));
                this.setState(
                    {
                        sessionId: res.guest_session_id
                    },
                    () => this.getRatedMovieList()
                );
            });
        }
    };

    getRatedMovieList = (page = 1) => {
        this.setState({
            ratedMovieList: [],
            ratedTotalResults: 0,
            ratedLoading: true
        });

        this.service
            .getRatedMovies(this.state.sessionId, page)
            .then((res) => {
                this.setState({
                    ratedMovieList: res.results,
                    ratedTotalResults: res.total_results,
                    ratedLoading: false
                });
            })
            .catch(this.onRatedError);
    };

    setRatingMovie = (movie, rating) => {
        this.service.setRating(this.state.sessionId, movie.id, rating).then(() => {
            if (this.state.ratedMovieList.find((i) => i.id === movie.id)) {
                this.setState((ratedMovieList) => {
                    ratedMovieList.map((el) => {
                        if (el.id === movie.id) {
                            el.rating = rating;
                        }
                        return el;
                    });
                });
            } else {
                const movieList = this.state.ratedMovieList;
                movieList.push(movie);
                this.setState({
                    ratedMovieList: movieList,
                    ratedTotalResults: this.state.ratedTotalResults + 1
                });
            }
        });
    };

    removeRatingMovie = (movie) => {
        this.service.deleteRating(this.state.sessionId, movie.id).then(() => {
            this.setState(({ ratedMovieList }) => {
                const idx = ratedMovieList.findIndex((el) => el.id === movie.id);
                const newArr = [...ratedMovieList.slice(0, idx), ...ratedMovieList.slice(idx + 1)];
                return {
                    ratedMovieList: newArr
                };
            });
        });
    };

    componentDidMount() {
        this.createGuestSession();
        this.getGenreMovies();
    }

    resetState = () => {
        this.setState({
            movieList: [],
            loading: false,
            error: false
        });
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    };

    onRatedError = () => {
        this.setState({
            ratedLoading: false,
            ratedError: true
        });
    };

    getMovieList = (movieName, page = 1) => {
        this.setState({
            movieList: [],
            totalResults: 0,
            loading: true
        });

        this.service
            .getMoviesByName(movieName, page)
            .then((res) => {
                this.setState({
                    movieList: res.results,
                    totalResults: res.total_results,
                    loading: false
                });
            })
            .catch(this.onError);
    };

    render() {
        const { loading, error, ratedLoading } = this.state;
        const errorMessage = <MyAlert message={'Server not responding.'} />;
        const spinner = <MySpin />;
        const tabItems = [
            {
                label: 'Search',
                key: '1',
                children: (
                    <>
                        {error && errorMessage}
                        {loading && spinner}
                        <SearchList
                            resetState={this.resetState}
                            getMovieList={this.getMovieList}
                            movieList={this.state.movieList}
                            loading={this.state.loading}
                            totalResults={this.state.totalResults}
                            setRatingMovie={this.setRatingMovie}
                            removeRatingMovie={this.removeRatingMovie}
                        />
                    </>
                )
            },
            {
                label: 'Rated',
                key: '2',
                children: (
                    <>
                        {ratedLoading && spinner}
                        <CardList
                            movieList={this.state.ratedMovieList}
                            loading={this.state.ratedLoading}
                            totalResults={this.state.ratedTotalResults}
                            getRatedMovieList={this.getRatedMovieList}
                            setRatingMovie={this.setRatingMovie}
                            removeRatingMovie={this.removeRatingMovie}
                            rated={true}
                        />
                    </>
                )
            }
        ];
        return (
            <>
                <GenreProvider value={this.state.genres}>
                    <Offline>
                        <MyAlert message={'No internet connection.'} />
                    </Offline>
                    <Layout className="app__layout">
                        <Content className="app__content">
                            <Tabs items={tabItems} />
                        </Content>
                    </Layout>
                </GenreProvider>
            </>
        );
    }
}
