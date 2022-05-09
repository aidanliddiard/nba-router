export default async function fetchParks() {
  const data = await fetch(
    'https://developer.nps.gov/api/v1/parks?&api_key=FQMUwL6Z2pLHdDxZBqT2qjEjg50tohVzVAstgdTO'
  );
  const response = await data.json();
  return response.data;
}

export async function fetchParkByCode(code) {
  const data = await fetch(
    `https://developer.nps.gov/api/v1/parks?parkCode=${code}&api_key=FQMUwL6Z2pLHdDxZBqT2qjEjg50tohVzVAstgdTO`
  );
  const response = await data.json();
  return response.data[0];
}
