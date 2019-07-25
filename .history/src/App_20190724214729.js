import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import * as schoolData from "./data/montgomeryschools.json"


export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 39.133938,
    longitude: -77.181251,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })

  const [selectedPark, setSelectedPark] = useState(null)

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
            <button className="marker-btn" onClick={(e) => {
              e.preventDefault()
              setSelectedPark(school)
            }}>
              <img src="/schoolicon.png" alt="Public School Icon" />
            </button>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup 
            latitude={selectedPark.geometry.coordinates[1]} 
            longitude={selectedPark.geometry.coordinates[0]}
          >
            <div>
              school
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  )
}
