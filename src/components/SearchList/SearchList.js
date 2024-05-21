import React from 'react';
import { Input } from 'antd';
import CardList from '../CardList';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

export default class SearchList extends React.Component {
    state = {
        searchInput: ''
    };

    searchDebounced = debounce((input) => {
        this.setState({
            searchInput: input
        });

        if (!input.length) {
            this.props.resetState();
        } else {
            this.props.getMovieList(input);
        }
    }, 400);

    render() {
        return (
            <>
                <Input
                    allowClear
                    size="large"
                    placeholder="Type to search..."
                    className="list__input"
                    onChange={(e) => {
                        this.searchDebounced(e.target.value);
                    }}
                />
                <CardList
                    movieList={this.props.movieList}
                    loading={this.props.loading}
                    totalResults={this.props.totalResults}
                    getMovieList={this.props.getMovieList}
                    searchInput={this.state.searchInput}
                    setRatingMovie={this.props.setRatingMovie}
                    removeRatingMovie={this.props.removeRatingMovie}
                />
            </>
        );
    }
}
SearchList.propTypes = {
    movieList: PropTypes.array,
    loading: PropTypes.bool,
    totalResults: PropTypes.number,
    setRatingMovie: PropTypes.func,
    removeRatingMovie: PropTypes.func,
    resetState: PropTypes.func,
    getMovieList: PropTypes.func
};
SearchList.defaultProps = {
    movieList: [],
    loading: false,
    totalResults: 0,
    setRatingMovie: () => {},
    removeRatingMovie: () => {},
    resetState: () => {},
    getMovieList: () => {}
};
