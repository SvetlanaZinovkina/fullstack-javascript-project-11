import onChange from 'on-change';
import * as yup from 'yup';
import keyBy from 'lodash/keyBy.js';

let schema = yup.object().shape({
		url: yup.string().url().required('this rss already add'),
});

const isValid = (state) => {
		schema.isValid({url: state.url})
				.then((result) => {
						state.valid = result;
						if (state.valid === true && !isIncludes(state)) {
								state.rss.push(state.url);
						}
						console.log(state);

						render(state);
				})
};

const isIncludes = (state) => state.rss.includes(state.url);

export const render = (state) => {
		const input = document.getElementById('url-input');
		state.valid === false ? input.classList.add('is-invalid') : input.classList.remove('is-invalid');
};

export const data = () => {
		const state = {
			valid: true,
				url: '',
				rss: [],
		};
		const watchedState = onChange(state, (path, value, previousValue) => {
				render(state);
		});
		console.log(state);
		view(state)
};

export const view = (state) => {
		const form  = document.querySelector('form');
		const input = document.getElementById('url-input');

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			input.focus();
		});

		input.addEventListener('input', (e) => {
				state.url = e.target.value;
				isValid(state);
		});
}
