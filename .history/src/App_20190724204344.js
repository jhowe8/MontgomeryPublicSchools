import React, { useState } from 'react'
import ReactMapGL from "react-map-gl"


export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 39.133938,
    longitude: -77.181251,
    width: '100vw',
    height: '100vh',
    zoom: 10
  });

  return (
    <div> 
      <ReactMapGL 
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
        markers here
      </ReactMapGL>
    </div>
  )
}

