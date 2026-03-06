import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYmViZWJlcnIiLCJhIjoiY2t5Znp0eHl5MDkzeTJ2cW5jb2VrajdnYSJ9.IPe3dtWlbTSqiJYOmkHKag';

function getColor(count) {
  if (count >= 50) return '#ff3757';
  if (count >= 30) return '#ff715a';
  if (count >= 10) return '#ffa974';
  return '#64c4ed';
}

function VisitorMapSection() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/bebeberr/clccwruan000114p9wc087o71',
      center: [180.3949, 36.7639],
      zoom: 2,
      attributionControl: false,
    });

    fetch('https://api.luyuan.wang/visit/result')
      .then((response) => response.json())
      .then((visitorRecords) => {
        const dataList = [...visitorRecords.data].sort((left, right) => left[2] - right[2]);

        dataList.forEach((entry) => {
          const markerNode = document.createElement('div');
          markerNode.className = 'visitor-marker';
          markerNode.style.backgroundColor = getColor(entry[2]);

          new mapboxgl.Marker(markerNode).setLngLat([entry[0], entry[1]]).addTo(map);
        });
      })
      .catch(() => {
        //
      });

    return () => map.remove();
  }, []);

  return (
    <section className="visitor-map">
      <div ref={mapContainerRef} className="visitor-map__canvas" />
      <div className="visitor-map__legend">
        <div className="visitor-map__legend-item">
          <span className="visitor-marker" style={{ backgroundColor: getColor(50) }} />
          <span>&gt; 50</span>
        </div>
        <div className="visitor-map__legend-item">
          <span className="visitor-marker" style={{ backgroundColor: getColor(30) }} />
          <span>&gt; 30</span>
        </div>
        <div className="visitor-map__legend-item">
          <span className="visitor-marker" style={{ backgroundColor: getColor(10) }} />
          <span>&gt; 10</span>
        </div>
        <div className="visitor-map__legend-item">
          <span className="visitor-marker" style={{ backgroundColor: getColor(1) }} />
          <span>&lt; 10</span>
        </div>
      </div>
    </section>
  );
}

export default VisitorMapSection;
