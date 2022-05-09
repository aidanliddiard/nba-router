import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Header() {
  const history = useHistory();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1>US Parks and Sites</h1>
      <button style={{ height: '50px' }} onClick={history.goBack}>
        Back
      </button>
    </div>
  );
}
