import React, { useState, useEffect } from 'react'
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

  const [selectedSchool, setSelectedSchool] = useState(null)

  useEffect(() => {
    const listener = (e) => {}
  }, [])

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
              setSelectedSchool(school)
            }}>
              <img src="/schoolicon.png" alt="Public School Icon" />
            </button>
          </Marker>
        ))}

        {selectedSchool ? (
          <Popup 
            latitude={selectedSchool.geometry.coordinates[1]} 
            longitude={selectedSchool.geometry.coordinates[0]}
            onClose = {() => (
              setSelectedSchool(null)
            )}
          >
            <div>
              <h2>{selectedSchool.properties.name}</h2>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  )
}
