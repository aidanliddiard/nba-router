import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchParkByCode } from '../services/Parks';

export default function Detail() {
  const { parkCode } = useParams();
  const [park, setPark] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParkByCode(parkCode)
      .then(setPark)
      .catch(console.error.message)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading Information...</p>
      ) : (
        <>
          <h1>{park.fullName}</h1>
          <h6>{park.states}</h6>
        </>
      )}
    </div>
  );
}
