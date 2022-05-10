import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Header() {
  const history = useHistory();

  const handleHome = async () => {
    history.push('/');
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <h1>US Parks and Sites</h1>
      </div>
      <div>
        <button
          style={{ height: '30px', margin: '10px' }}
          onClick={history.goBack}
        >
          Back
        </button>
        <button style={{ height: '30px' }} onClick={handleHome}>
          Home
        </button>
      </div>
    </div>
  );
}
