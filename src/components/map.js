import React from 'react';
import '../styles/map.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "pk.eyJ1IjoiYmViZWJlcnIiLCJhIjoiY2t5Znp0eHl5MDkzeTJ2cW5jb2VrajdnYSJ9.IPe3dtWlbTSqiJYOmkHKag";

class VisitorMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 180.3949,
            long: 36.7639,
            zoom: 2
        };
        this.mapContainer = React.createRef();
    }

    getColor(count) {
        if (count >= 50) return "#ff3757;";
        if (count >= 30) return "#ff715a;";
        if (count >= 10) return "#ffa974;";
        return "#64c4ed;";
    }

    componentDidMount() {
        const {lat, long, zoom} = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [lat, long],
            attributionControl: false,
            zoom: zoom
        });

        fetch('https://api.luyuan.wang/visit/result').then(response => response.json()).then((visitor_records) => {
            var data_list = visitor_records.data;
            // draw higher count markers last -- to avoid blocking
            data_list.sort((e1, e2) => {
                return e1[2] - e2[2];
            });
            console.log(data_list);
            data_list.forEach(each => {
                const ele = document.createElement('div');
                ele.className = 'marker';
                ele.setAttribute("style", "background-color: " + this.getColor(each[2]));
                // eslint-disable-next-line
                const marker = new mapboxgl.Marker(ele)
                    .setLngLat([each[0], each[1]])
                    .addTo(map);
            });
        });

    }
    render() {
        return (
            <div className="map-div">
                <div ref={this.mapContainer} className="map-container" />
            </div>
        );
    }
}

export default VisitorMap;