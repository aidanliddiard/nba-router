import React from 'react';

export default function Images({ image }) {
  return (
    <>
      <h4>{image.title}</h4>
      <img src={image.url} alt={image.altText} style={{ width: '75%' }} />
      <p>{image.caption}</p>
    </>
  );
}
