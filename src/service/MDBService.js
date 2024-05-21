import { _apiBase } from '../constants/constants';

export default class MDBService {
    options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTg4ZGEwMTI3NzFkYmNhY2EwMThhOThhM2IzOWJmZSIsInN1YiI6IjY0OTMzNzc2MjczNjQ4MDBjOWYxMWY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Oy4ntqc9CcqsPuwkN0-qUMbi6q5uf3n0BYdDobEsWA'
        }
    };

    postOptions = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTg4ZGEwMTI3NzFkYmNhY2EwMThhOThhM2IzOWJmZSIsInN1YiI6IjY0OTMzNzc2MjczNjQ4MDBjOWYxMWY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Oy4ntqc9CcqsPuwkN0-qUMbi6q5uf3n0BYdDobEsWA'
        }
    };

    deleteOptions = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTg4ZGEwMTI3NzFkYmNhY2EwMThhOThhM2IzOWJmZSIsInN1YiI6IjY0OTMzNzc2MjczNjQ4MDBjOWYxMWY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Oy4ntqc9CcqsPuwkN0-qUMbi6q5uf3n0BYdDobEsWA'
        }
    };

    getMoviesByName = async (filmName, page) => {
        const url = new URL('search/movie', _apiBase);
        url.searchParams.set('query', filmName);
        url.searchParams.set('include_adult', 'false');
        url.searchParams.set('language', 'en-US');
        url.searchParams.set('page', page);
        const res = await fetch(url, this.options);
        if (!res.ok) {
            throw new Error(`could not fetch ${filmName}, received ${res.status}`);
        }
        return await res.json();
    };

    getGuestSessionId = async () => {
        const url = new URL('authentication/guest_session/new', _apiBase);
        const res = await fetch(url, this.options);
        if (!res.ok) {
            throw new Error(`could not create guest session, received ${res.status}`);
        }
        return await res.json();
    };

    getRatedMovies = async (guestSessionId, page) => {
        const url = new URL(`guest_session/${guestSessionId}/rated/movies`, _apiBase);
        url.searchParams.set('query', 'language=en-US');
        url.searchParams.set('page', page);
        const res = await fetch(url, this.options);
        if (!res.ok) {
            throw new Error(`could not fetch rated movies, received ${res.status}`);
        }
        return await res.json();
    };

    setRating = async (guestSessionId, movieId, rating) => {
        const postOptions = this.postOptions;
        postOptions['body'] = `{"value":${rating}}`;
        const url = new URL(`movie/${movieId}/rating`, _apiBase);
        url.searchParams.set('guest_session_id', guestSessionId);
        const res = await fetch(url, this.postOptions);
        if (!res.ok) {
            throw new Error(`could not set rating for movie ${movieId}, received ${res.status}`);
        }
        return await res.json();
    };

    deleteRating = async (guestSessionId, movieId) => {
        const url = new URL(`movie/${movieId}/rating`, _apiBase);
        url.searchParams.set('guest_session_id', guestSessionId);
        const res = await fetch(url, this.deleteOptions);
        if (!res.ok) {
            throw new Error(`could not delete rating for movie ${movieId}, received ${res.status}`);
        }
        return await res.json();
    };

    getGenres = async () => {
        const url = new URL('genre/movie/list', _apiBase);
        const res = await fetch(url, this.options);
        if (!res.ok) {
            throw new Error(`could not get genres, received ${res.status}`);
        }
        return await res.json();
    };
}
