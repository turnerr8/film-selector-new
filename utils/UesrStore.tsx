import { join } from 'path';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmRhMjZkYmE3NzgzYzE0ZmIyOTJjNTNlMzk0N2YzZSIsInN1YiI6IjYwYmRiNWUyOGRkYzM0MDAyOTEyNTkzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tNwxD2mmhrGvqNmWubA6i__ACcUDHXREVgWf9c21P80',
	},
};

const acceptableStreamers = [
	8, 9, 337, 350, 350, 15, 384, 283, 386, 387, 531, 37, 99, 300,
];

export const userStore = {
	genres: [12, 45, 7],
	streaming: [],
	startYear: null,
	endYear: null,
	finalMovies: [0, 0],
	setGenre: function (
		genre: Array<{ id: number; name: string; selected: boolean }>
	) {
		this.genres = genre;
	},
	getGenre: function (): {
		id: number;
		name: string;
		selected: boolean;
	}[] {
		return this.genres;
	},
	fetchGenres: function () {
		fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				return res.genres;
			})
			.then((res) => {
				this.genres = res.map((genre) => {
					return {
						name: genre.name,
						id: genre.id,
						selected: false,
					};
				});
			})

			.catch((err) => console.error(err));
	},
	fetchStreaming: function () {
		fetch(
			'https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=US',
			options
		)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				return res.results;
			})
			.then((res) => {
				const newArr = [];
				for (let i = 0; i < res.length; i++) {
					if (acceptableStreamers.includes(res[i].provider_id)) {
						newArr.push({
							name: res[i].provider_name,
							id: res[i].provider_id,
							img: res[i].logo_path,
							selected: false,
						});
					}
				}
				this.streaming = newArr;
			});
	},
	getProvider: function (): Array<{
		id: number;
		name: string;
		selected: boolean;
		img: string;
	}> {
		return this.streaming;
	},
	fetchResults: function () {
		const genreString = [];
		this.getGenre().map((genre) => {
			if (genre.selected) {
				genreString.push(genre.id);
			}
		});
		const streamingString = [];
		this.streaming.map((streaming) => {
			if (streaming.selected) {
				streamingString.push(streaming.id);
			}
		});

		const searchString = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc${
			genreString.length > 0 ? `&with_genres=${genreString.join(',')}` : ''
		}${
			streamingString.length > 0
				? `&with_watch_providers=${streamingString.join('|')}`
				: `&with_watch_providers=${acceptableStreamers.join('|')}`
		}${
			this.startYear && this.endYear
				? `&primary_release_date.gte=${this.startYear}&primary_release_date.lte=${this.endYear}`
				: ''
		}`;
		var page = 0;
		return fetch(searchString, options)
			.then((responseTotal) => responseTotal.json())
			.then((responseTotal) => {
				if (responseTotal.total_pages > 500) {
					page = 500;
				} else {
					page = responseTotal.total_pages;
				}
				return this.finalMovies.map((finalMovie, index) => {
					const newString = searchString.concat(
						`&page=${Math.floor(Math.random() * page + 1)}`
					);
					console.log(`newString: ${newString}`);
					return fetch(newString, options)
						.then((response) => response.json())
						.then((response) => {
							const currentFilm =
								response.results[
									Math.floor(Math.random() * response.results.length)
								];
							this.finalMovies[index] = currentFilm;

							console.log(currentFilm);
							return fetch(
								`https://api.themoviedb.org/3/movie/${currentFilm.id}/watch/providers`,
								options
							)
								.then((res) => {
									if (res.ok) {
										return res.json();
									}
								})
								.then((res) => {
									return res.results.US;
								})
								.then((res) => {
									console.log(res);

									const movieobj = {
										name: currentFilm.title,
										backdrop_path: currentFilm.backdrop_path,
										id: currentFilm.id,
										img: currentFilm.poster_path,
										movieLink: res.link !== undefined ? res.link : null,
										overview: currentFilm.overview,
										rating: currentFilm.vote_average,
										releaseDate: currentFilm.release_date,
										genres: currentFilm.genre_ids,
										flatrate:
											res.flatrate !== undefined
												? res.flatrate.filter((cur) => {
														if (acceptableStreamers.includes(cur.provider_id)) {
															return cur;
														}
												  })
												: null,
										buy:
											res.buy !== undefined
												? res.buy.filter((cur) => {
														if (acceptableStreamers.includes(cur.provider_id)) {
															return cur;
														}
												  })
												: null,
										rent:
											res.rent !== undefined
												? res.rent.filter((cur) => {
														if (acceptableStreamers.includes(cur.provider_id)) {
															return cur;
														}
												  })
												: null,
									};
									console.log(movieobj);
								})
								.catch((err) => console.error(err));
						});
				});
			})
			.catch((err) => console.error(err));

		this.finalMovies.map((movie, index) => {});
	},
};
