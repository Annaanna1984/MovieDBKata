const _apiBase = 'https://api.themoviedb.org/3/';
const _guestSessionURL = 'authentication/guest_session/new';

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
        const res = await fetch(
            `${_apiBase}search/movie?query=${filmName}&include_adult=false&language=en-US&page=${page}`,
            this.options
        );
        if (!res.ok) {
            throw new Error(`could not fetch ${filmName}, received ${res.status}`);
        }
        return await res.json();
    };

    getGuestSessionId = async () => {
        const res = await fetch(`${_apiBase}${_guestSessionURL}`, this.options);
        if (!res.ok) {
            throw new Error(`could not create guest session, received ${res.status}`);
        }
        return await res.json();
    };

    getRatedMovies = async (guestSessionId, page) => {
        const res = await fetch(
            `${_apiBase}guest_session/${guestSessionId}/rated/movies?query=language=en-US&page=${page}`,
            this.options
        );
        if (!res.ok) {
            throw new Error(`could not fetch rated movies, received ${res.status}`);
        }
        return await res.json();
    };

    setRating = async (guestSessionId, movie_id, rating) => {
        const postOptions = this.postOptions;
        postOptions['body'] = `{"value":${rating}}`;

        const res = await fetch(
            `${_apiBase}movie/${movie_id}/rating?guest_session_id=${guestSessionId}`,
            this.postOptions
        );
        return await res.json();
    };

    deleteRating = async (guestSessionId, movie_id) => {
        const res = await fetch(
            `${_apiBase}movie/${movie_id}/rating?guest_session_id=${guestSessionId}`,
            this.deleteOptions
        );
        return await res.json();
    };

    getGenres = async function () {
        const res = await fetch(`${_apiBase}genre/movie/list`, this.options);
        return await res.json();
    };
}
