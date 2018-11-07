export const API = {
	request: async (endpoint) => {
		const response = await fetch("./api/" + endpoint);
		if (!response.ok) throw Error();

		const body = await response.json();
		if (body.error) throw Error(`Server said "${body.errorMessage}"`);

		return body;
	}
};
