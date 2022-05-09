import React, { useEffect, useState } from 'react';
import fetchParks from '../services/Parks';

export default function Home() {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParks()
      .then(setParks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading parks...</p>
      ) : (
        <>
          <h1>Welcome</h1>{' '}
          <ul>
            {parks.map((park) => (
              <li key={park.id}>{park.fullName}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
