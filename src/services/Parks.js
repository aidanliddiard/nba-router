const API_KEY = process.env.REACT_APP_API_KEY;

export default async function fetchParks(state) {
  const url =
    state === 'all' || !state
      ? `https://developer.nps.gov/api/v1/parks?&api_key=${API_KEY}`
      : `https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=${API_KEY}`;
  const data = await fetch(url);
  const response = await data.json();
  return response.data;
}

export async function fetchParkByCode(code) {
  const data = await fetch(
    `https://developer.nps.gov/api/v1/parks?parkCode=${code}&api_key=${API_KEY}`
  );
  const response = await data.json();
  return response.data[0];
}
