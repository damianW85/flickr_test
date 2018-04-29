export const makeRequest = (url, successCB) => {
	return fetch(url)
		.then(response => {
			return response.ok
				? response.json()
				: console.log(`Something went wrong with request to: ${url}`);
		})
		.then(data => {
			successCB(data);
		})
		.catch(error => {
			console.log(error);
		});
};

export const removeHTMLTags = htmlString => {
	return htmlString.replace(/(<([^>]+)>)/gi, " ")
    .trim();
};
