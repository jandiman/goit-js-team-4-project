
const fetch = require('node-fetch');

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'df3d71dc2c14b1899746da6d2afcfb5b';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjNkNzFkYzJjMTRiMTg5OTc0NmRhNmQyYWZjZmI1YiIsInN1YiI6IjY1OTdkZjU5ZWEzN2UwMDc1MzRkMjg5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w533noJmEtlJnHHuk4Sz73gd8UTaV4LMC6MLn7MP8mE'
    }
  };

export function movieSearch({data,page,adult,sort,lang}) {
  const url_search = `${BASE_URL}/search/movie?query=${data}&include_adult=${adult}&language=${lang}&page=${page}&sort_by=${sort}&genres=18&api_key=${API_KEY}`;
  return fetch(url_search, options)
  .then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

export function movieDetail(id) {
    const url_search = `${BASE_URL}/movie/${id}?&api_key=${API_KEY}`;
    return fetch(url_search, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  }

  export function movieTrend({time_window,lang}) {
    const url_search = `${BASE_URL}/trending/movie/${time_window}?language=${lang}&api_key=${API_KEY}`;
    return fetch(url_search, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  }