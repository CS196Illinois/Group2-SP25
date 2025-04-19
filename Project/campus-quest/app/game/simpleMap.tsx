"use client"
import React, { useRef } from "react";
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.icon({ iconUrl: "/marker-icon.png" });

const SimpleMap = ({upgrades} : {upgrades: {
  name: string;
  level: string;
}[]}) => {
  const mapRef = useRef(null);
  const latitude = 40.10764371678033;
  const longitude = -88.22717929582448;


  return (
    <div className="bg-[#061119]"> 
      <MapContainer center={[latitude, longitude]} minZoom={16} zoom={18} ref={mapRef} style={{height: "100vh", width: "100vw"}}
        maxBounds={new L.LatLngBounds(L.latLng(40.112568, -88.243503), L.latLng(40.091010, -88.214226))}
        maxBoundsViscosity={1}
      >
        <TileLayer
          attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
      </div>
  );
};

export default SimpleMap;