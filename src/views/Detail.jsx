import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
          <h5>Designation: {park.designation}</h5>
          <h5>States: {park.states}</h5>
          <p>{park.description}</p>
          <img
            src={park.images[0].url}
            alt={park.images[0].altText}
            style={{ width: '75%' }}
          />
          <p>{park.images[0].caption}</p>
          <img
            src={park.images[1].url}
            alt={park.images[1].altText}
            style={{ width: '75%' }}
          />
          <p>{park.images[1].caption}</p>
          <img
            src={park.images[2].url}
            alt={park.images[2].altText}
            style={{ width: '75%' }}
          />
          <p>{park.images[2].caption}</p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Weather Info:</span>{' '}
            {park.weatherInfo}
          </p>
        </>
      )}
    </div>
  );
}
