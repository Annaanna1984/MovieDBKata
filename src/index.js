import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App className="app" />);

// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Basic 1588da012771dbcaca018a98a3b39bfe'
//     }
// };

// fetch('https://api.themoviedb.org/3/search/movie?query=Shrek&include_adult=false&language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(body => console.log(body))
//     .catch(err => console.error(err));

// const getResource = async (url, options) => {
//     const res = await fetch(url, options)
//     if(!res.ok){
//         throw new Error(`could not fetch ${url}, received ${res.status}`)
//     }
//     const body = await res.json()
//     return body
// }
// getResource('https://api.themoviedb.org/3/search/movie?query=Shrek&include_adult=false&language=en-US&page=1',options)
//     .then((body)=>{
//         console.log(body)
//     })
//     .catch((err)=>{
//         console.error(err)
//     })
