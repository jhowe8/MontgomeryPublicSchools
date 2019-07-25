import React, { useState } from 'react'
import ReactMapGL, { Marker } from "react-map-gl"
import * as schoolData from "./data/montgomeryschools.json"


export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 39.133938,
    longitude: -77.181251,
    width: '100vw',
    height: '100vh',
    zoom: 9.5
  });

  return (
    <div> 
      <ReactMapGL 
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1IjoianNob3dlOCIsImEiOiJjanloeTgzZ2owMGQwM2Nyemxwb2x1amVvIn0.oRg3u4UCMX_v6HjCMiMJYw"}
        mapStyle="mapbox://styles/jshowe8/cjyhyques04e41clpog7nq9mr"
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
      >
        {schoolData.features.map((school => 
          <Marker 
            key={school.properties.name}
            latitude={school.geometry.coordinates[1]}
            longitude={school.geometry.coordinates[0]}>
            <button class="marker button">
              <img src="./data/schoolicon.png" alt="Public School Icon" />
            </button>
          </Marker>
        
        ))}
      </ReactMapGL>
    </div>
  )
}

