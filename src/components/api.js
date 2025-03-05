export const GEO_API_url = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
export const weather_api_url = 'https://api.openweathermap.org/data/2.5';


export const GeoOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
		'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
	}
};
export const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
