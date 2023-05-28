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
	genres: Array<{ id: number; name: string; selected: boolean }>,
	streaming: Array<{
		id: number;
		name: string;
		selected: boolean;
		img: string;
	}>,
	startYear: null,
	endYear: null,
	setGenre: function (
		genre: Array<{ id: number; name: string; selected: boolean }>
	) {
		this.genres = genre;
	},
	getGenre: function (): Array<{
		id: number;
		name: string;
		selected: boolean;
	}> {
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
					if (
						!res[i].provider_name.includes('Channel') &&
						acceptableStreamers.includes(res[i].provider_id)
					) {
						newArr.push({
							name: res[i].provider_name,
							id: res[i].provider_id,
							img: res[i].logo_path,
							selected: false,
						});
					}
				}
				this.streaming = newArr;
				console.log(this.streaming);
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
};
