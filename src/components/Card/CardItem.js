import React from 'react';
import './CardItem.css';
import { Card, Rate, Tag, Typography } from 'antd';
import format from 'date-fns/format';
import { GenreConsumer } from '../GenreContext';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;
const _posterUrl = `https://image.tmdb.org/t/p/original/`;

const _overviewLimit = 150;
export default class CardItem extends React.Component {
    wrapOverview(text) {
        if (text.length < _overviewLimit) return text;

        const substr = text.substring(0, _overviewLimit);
        return substr.substring(0, substr.lastIndexOf(' ')) + ' ...';
    }

    voteColor = (vote) => {
        if (vote < 3) return 'low';
        if (vote < 5) return 'medium';
        if (vote < 7) return 'high';
        return 'very-high';
    };

    changeRating = (value) => {
        this.props.film.rating = value;
        if (value === 0) {
            this.props.removeRatingMovie(this.props.film);
        } else {
            this.props.setRatingMovie(this.props.film, value);
        }
    };

    render() {
        const { title, overview, release_date, poster_path, vote_average, rating, genre_ids } = this.props.film;
        const path = poster_path ? `${_posterUrl}${poster_path}` : 'notFound.jpeg';
        return (
            <GenreConsumer>
                {(genres) => {
                    const cardGenres = genres
                        .filter((el) => genre_ids.indexOf(el.id) >= 0)
                        .map((genre, idx) => {
                            return (
                                <Tag key={idx} className="card__genre-tag">
                                    {genre.name}
                                </Tag>
                            );
                        });

                    return (
                        <Card hoverable className="card">
                            <img src={path} alt="котик" className="card__poster" />
                            <Title level={4} className="card__title">
                                {title}
                            </Title>
                            <Text className={`card__vote-average card__vote-average_${this.voteColor(vote_average)}`}>
                                {Number.isInteger(vote_average) ? vote_average : vote_average.toPrecision(2)}
                            </Text>
                            <div className="card__genres">{cardGenres}</div>
                            <Text className="card__date" type="secondary">
                                {release_date ? format(new Date(release_date), 'MMMM d, yyyy') : null}
                            </Text>
                            <Text className="card__overview">{this.wrapOverview(overview)}</Text>
                            <Rate
                                className="card__rate"
                                allowHalf
                                count={10}
                                defaultValue={0}
                                value={rating}
                                onChange={(value) => this.changeRating(value)}
                            />
                        </Card>
                    );
                }}
            </GenreConsumer>
        );
    }
}
CardItem.propTypes = {
    film: PropTypes.shape({
        rating: PropTypes.number,
        title: PropTypes.string,
        overview: PropTypes.string,
        release_date: PropTypes.string,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        genre_ids: PropTypes.number
    }),
    removeRatingMovie: PropTypes.func,
    setRatingMovie: PropTypes.func
};
CardItem.defaultProps = {
    film: {
        rating: 0,
        title: '',
        overview: '',
        release_date: '',
        poster_path: '',
        vote_average: 0,
        genre_ids: 0
    },
    removeRatingMovie: () => {},
    setRatingMovie: () => {}
};
