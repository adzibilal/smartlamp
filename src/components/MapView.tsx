import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { Lamp } from "../types";

// Fix for default marker icons in React Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons for lamp status
const createLampIcon = (status: "ON" | "OFF") => {
  const color = status === "ON" ? "#10b981" : "#ef4444";
  return L.divIcon({
    className: "custom-lamp-marker",
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

interface MapViewProps {
  lamps: Lamp[];
  center?: [number, number];
  zoom?: number;
  renderPopup?: (lamp: Lamp) => React.ReactNode;
}

function FitBounds({ lamps }: { lamps: Lamp[] }) {
  const map = useMap();

  useEffect(() => {
    if (lamps.length > 0) {
      const bounds = L.latLngBounds(lamps.map((l) => l.location));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [lamps, map]);

  return null;
}

export function MapView({
  lamps,
  center = [-6.9175, 107.6191],
  zoom = 13,
  renderPopup,
}: MapViewProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-zinc-200 shadow-sm h-[400px]">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lamps.map((lamp) => (
          <Marker
            key={lamp.id}
            position={lamp.location}
            icon={createLampIcon(lamp.status)}
          >
            {renderPopup && <Popup>{renderPopup(lamp)}</Popup>}
          </Marker>
        ))}
        <FitBounds lamps={lamps} />
      </MapContainer>
    </div>
  );
}

