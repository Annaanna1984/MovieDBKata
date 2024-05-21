import React from 'react';
import './CardList.css';
import CardItem from '../Card';
import { Col, List, Row, Pagination } from 'antd';
import MyAlert from '../Alert';
import PropTypes from 'prop-types';

export default class CardList extends React.Component {
    page = 1;
    idx = 0;

    render() {
        const { movieList, loading, totalResults, getMovieList, getRatedMovieList } = this.props;
        const limitedList = movieList.length <= 20 ? movieList : movieList.slice(0, 20);
        const listItems = limitedList.map((film) => {
            return (
                <Col key={this.idx++} xs={36} sm={36} md={12} lg={12} xl={12}>
                    <List.Item className="list__item">
                        <CardItem
                            film={film}
                            setRatingMovie={this.props.setRatingMovie}
                            removeRatingMovie={this.props.removeRatingMovie}
                        />
                    </List.Item>
                </Col>
            );
        });

        return (
            <>
                {!limitedList.length && !loading && (this.props.rated || this.props.searchInput) ? (
                    <MyAlert message={'Nothing found.'} />
                ) : (
                    <List
                        size="large"
                        grid={{
                            gutter: 36,
                            xs: 1,
                            sm: 1,
                            md: 1,
                            lg: 1,
                            xl: 2,
                            xxl: 2
                        }}
                    >
                        <Row gutter={8} className="list">
                            {listItems}
                        </Row>
                        {!this.props.loading && (this.props.rated || this.props.searchInput) && (
                            <Pagination
                                rootClassName="list__pagination"
                                defaultPageSize={20}
                                total={totalResults}
                                showSizeChanger={false}
                                current={this.page}
                                onChange={(page) => {
                                    this.page = page;
                                    this.props.rated
                                        ? getRatedMovieList(page)
                                        : getMovieList(this.props.searchInput, page);
                                }}
                            />
                        )}
                    </List>
                )}
            </>
        );
    }
}
CardList.propTypes = {
    movieList: PropTypes.array,
    loading: PropTypes.bool,
    totalResults: PropTypes.number,
    getMovieList: PropTypes.func,
    getRatedMovieList: PropTypes.func,
    setRatingMovie: PropTypes.func,
    removeRatingMovie: PropTypes.func,
    rated: PropTypes.bool,
    searchInput: PropTypes.string
};

CardList.defaultProps = {
    rated: false,
    searchInput: '',
    movieList: [],
    loading: false,
    totalResults: 0,
    getRatedMovieList: () => {},
    getMovieList: () => {},
    setRatingMovie: () => {},
    removeRatingMovie: () => {}
};
