import React, { useState } from 'react'
import ReactMapGL from "react-map-gl"


export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 39.133938,
    longitude: -77.181251,
    width: '100vw',
    height: '100vh',
    zoom: 9
  });

  return (
    <div> 
      <ReactMapGL 
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1IjoianNob3dlOCIsImEiOiJjanloeTgzZ2owMGQwM2Nyemxwb2x1amVvIn0.oRg3u4UCMX_v6HjCMiMJYw"}
        >
        markers here
      </ReactMapGL>
    </div>
  )
}

