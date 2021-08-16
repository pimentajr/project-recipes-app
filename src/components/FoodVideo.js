import React from 'react';

function foodVideo(details) {
  return details ? (<iframe
    width="355"
    height="320"
    data-testid="video"
    src={ `https://www.youtube.com/embed/${details[0].strYoutube.split('=')[1]}` }
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />) : '';
}

export default foodVideo;
