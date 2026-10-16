// Regenerates the TMDB fixtures next to this file: `node e2e/fixtures/generate.mjs`.
// Why a script: live TMDB data changes daily and recording needs a real API key, so the
// fixtures are small, fixed payloads that follow the TMDB v3 response shapes the app reads.
// The JSON output is committed; this script only exists so it can be reviewed and rebuilt.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const write = (name, data) => writeFileSync(join(dir, `${name}.json`), `${JSON.stringify(data, null, 2)}\n`);

const OVERVIEW =
  'A fixed placeholder synopsis used for visual regression tests. It is long enough to wrap onto several lines at every viewport so layout changes show up in the screenshots.';

const movieGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 878, name: 'Science Fiction' },
  { id: 18, name: 'Drama' },
  { id: 35, name: 'Comedy' },
];
const tvGenres = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 18, name: 'Drama' },
  { id: 35, name: 'Comedy' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
];
write('genre-movie', { genres: movieGenres });
write('genre-tv', { genres: tvGenres });

// Ratings cover the three Rating colours (red < 5, orange 5-7, green >= 7).
const ratings = [8.4, 6.2, 4.1, 7.5, 5.8, 9.0, 3.3, 7.0];

const movieList = (base, titles) => ({
  page: 1,
  total_pages: 1,
  total_results: titles.length,
  results: titles.map((title, i) => ({
    id: base + i,
    title,
    original_title: title,
    overview: OVERVIEW,
    backdrop_path: `/bd${base + i}.jpg`,
    poster_path: `/po${base + i}.jpg`,
    release_date: `2025-0${(i % 9) + 1}-1${i % 9}`,
    vote_average: ratings[i % ratings.length],
    popularity: 100 - i * 7 + (base % 10),
    genre_ids: i % 2 === 0 ? [28, 12] : [18, 35, 878],
  })),
});

// TV items only carry first_air_date, like the real API.
const tvList = (base, names) => ({
  page: 1,
  total_pages: 1,
  total_results: names.length,
  results: names.map((name, i) => ({
    id: base + i,
    name,
    original_name: name,
    overview: OVERVIEW,
    backdrop_path: `/bd${base + i}.jpg`,
    poster_path: `/po${base + i}.jpg`,
    first_air_date: `2024-1${i % 3}-0${(i % 9) + 1}`,
    vote_average: ratings[(i + 2) % ratings.length],
    popularity: 90 - i * 6 + (base % 10),
    genre_ids: i % 2 === 0 ? [18, 35] : [10759, 10765],
  })),
});

write('movie-now_playing', movieList(100, ['Northern Lights', 'The Last Lighthouse', 'Paper Moons', 'Static Hearts', 'Midnight Orchard', 'Glass Harbour', 'Ember Road', 'Quiet Thunder']));
write('movie-top_rated', movieList(130, ['The Long Return', 'Salt and Iron', 'A Winter Letter', 'Open Water', 'Hollow Crown', 'Silver Street', 'Dust Bowl Blues', 'Lantern Hill']));
write('movie-popular', movieList(160, ['Neon Skyline', 'Crimson Tide Pool', 'Orbit Seven', 'The Fox Court', 'Starlight Diner', 'Riverbend', 'Cold Signal', 'Brass Garden']));
write('movie-upcoming', movieList(190, ['Coming Dawn', 'The Next Wave', 'Afterglow', 'Paper Kingdom', 'Low Tide', 'High Noon Again', 'Mirror Lake', 'Last Orders']));

write('tv-on_the_air', tvList(200, ['Harbour Lights', 'The Night Shift', 'Small Town Signal', 'Kingfisher', 'Field Notes', 'Second Chances', 'Iron Valley', 'Paper Trail']));
write('tv-top_rated', tvList(230, ['Chronicle', 'The Long Table', 'Blue Hour', 'Stonebridge', 'Cartographers', 'Evergreen', 'Wild Meadow', 'Grand Hotel Nova']));
write('tv-popular', tvList(260, ['Tidewater', 'Ghost Orchid', 'The Understudy', 'Rooftop', 'Last Light Café', 'Signal Fire', 'Marigold', 'Deep Field']));

const detailBase = {
  overview: `${OVERVIEW} ${OVERVIEW}`,
  backdrop_path: '/bd-detail.jpg',
  poster_path: '/po-detail.jpg',
  vote_average: 7.6,
  popularity: 88.8,
  genres: [movieGenres[0], movieGenres[2], movieGenres[3]],
};
write('movie-detail', { ...detailBase, id: 101, title: 'The Last Lighthouse', release_date: '2025-03-14', runtime: 128 });
write('tv-detail', {
  ...detailBase,
  id: 201,
  name: 'The Night Shift',
  first_air_date: '2024-10-02',
  episode_run_time: [45],
  number_of_seasons: 3,
  number_of_episodes: 27,
  genres: [tvGenres[1], tvGenres[3]],
});

const reviews = {
  id: 101,
  page: 1,
  results: [
    {
      id: 'r1',
      author: 'reviewer_one',
      content: `${OVERVIEW} ${OVERVIEW} ${OVERVIEW} A deliberately long review body so the 300 character trimming is exercised.`,
      url: 'https://www.themoviedb.org/review/r1',
    },
    { id: 'r2', author: 'reviewer_two', content: 'Short and sweet.', url: 'https://www.themoviedb.org/review/r2' },
  ],
};
write('movie-reviews', reviews);
write('tv-reviews', reviews);

const castNames = ['Ada Marlowe', 'Ben Okafor', 'Chloe Vance', 'Dev Patel-Rowe', 'Elena Fischer', 'Farid Haddad', 'Grace Lindqvist', 'Hugo Barros', 'Iris Tanaka', 'Jonah Reyes', 'Kira Novak', 'Liam Doyle', 'Mara Quinn', 'Nico Santos'];
const credits = {
  id: 101,
  cast: castNames.map((name, i) => ({
    id: 500 + i,
    name,
    character: `Character ${i + 1}`,
    // Every fifth member has no photo so the imageNotFound fallback is covered.
    profile_path: i % 5 === 4 ? null : `/pr${500 + i}.jpg`,
  })),
};
write('movie-credits', credits);
write('tv-credits', credits);

const videos = {
  id: 101,
  results: [1, 2, 3].map((n) => ({ id: `v${n}`, key: `fixturekey${n}`, name: `Trailer ${n}`, site: 'YouTube', type: 'Trailer' })),
};
write('movie-videos', videos);
write('tv-videos', videos);

write('movie-similar', movieList(300, ['Echo Park', 'Winter Garden', 'Slow Burn', 'The Understory', 'Copper Sky', 'Distant Shore']));
write('tv-similar', tvList(330, ['Echo Valley', 'Winter Court', 'Slow Tide', 'The Underpass', 'Copper Hill', 'Distant Light']));

write('person', {
  id: 501,
  name: 'Ben Okafor',
  gender: 2,
  birthday: '1984-06-21',
  place_of_birth: 'Lagos, Nigeria',
  known_for_department: 'Acting',
  profile_path: '/pr501.jpg',
  biography: `${OVERVIEW} ${OVERVIEW}`,
});
write('person-movie_credits', {
  id: 501,
  cast: [
    ...movieList(400, ['Role Model', 'The Understudy Returns', 'Quiet Streets', 'Borrowed Time', 'Fault Lines', 'Homecoming', 'Night Owls']).results,
    { id: 407, title: 'No Artwork Film', overview: OVERVIEW, backdrop_path: null, poster_path: '/po407.jpg', release_date: '2020-02-02', vote_average: 6.6, popularity: 5, genre_ids: [18] },
  ],
});

const searchMovies = movieList(600, ['Matrix of Lies', 'The Matrix Garden', 'Matrix Road', 'Digital Matrix', 'Matrix Falls']).results;
const searchTv = tvList(650, ['Matrix Mysteries', 'Inside the Matrix', 'Matrix Nights', 'Matrix Academy']).results;
// First movie has no poster and a short overview; one tv overview is long enough to be trimmed.
searchMovies[0].poster_path = null;
searchMovies[0].overview = 'Short overview.';
write('search-movie', { page: 1, total_pages: 1, total_results: searchMovies.length, results: searchMovies });
write('search-tv', { page: 1, total_pages: 1, total_results: searchTv.length, results: searchTv });
