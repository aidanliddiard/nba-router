import React, { useEffect, useState } from 'react';
import fetchParks from '../services/Parks';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import SelectState from '../components/SelectState';

export default function Home() {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const stateCode =
    new URLSearchParams(location.search).get('stateCode') ?? 'all';

  useEffect(() => {
    fetchParks(stateCode)
      .then(setParks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [stateCode]);

  const handleStateSelection = (e) => {
    const state = e.target.value;
    state.toLowerCase();

    history.push(
      `/parks?stateCode=${state}&api_key=${process.env.REACT_APP_API_KEY}`
    );
  };

  return (
    <div>
      {loading ? (
        <p>Loading parks...</p>
      ) : (
        <>
          <h1>Welcome</h1>
          <SelectState
            stateCode={stateCode}
            handleStateSelection={handleStateSelection}
          />
          <ul>
            {parks.map((park) => (
              <li key={park.id}>
                <Link to={`/park/${park.parkCode}`}>{park.fullName}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
