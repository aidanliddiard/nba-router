import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Images from '../components/Images';
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
          {park.images.map((image) => (
            <div key={image.url}>
              <Images image={image} />
            </div>
          ))}
          <p>
            <span style={{ fontWeight: 'bold' }}>Weather Info:</span>{' '}
            {park.weatherInfo}
          </p>
        </>
      )}
    </div>
  );
}
