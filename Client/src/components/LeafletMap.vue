<template>
 <div id="container">
     <h2>Map of NSW COVID-19 case locations</h2>
   <div id="mapContainer"></div>
 </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { api } from '../helpers/helpers';
import L from "leaflet";
import _ from 'lodash';
const getColor = (d) => {
                return  d > 1000 ? '#3D2807' :
                        d > 500  ? '#bd0026' :
                        d > 100  ? '#fb6a4a' :
                        d > 50   ? '#fe9929' :
                        d > 9   ?   'yellow' :
                                    '#f0f0f0';
        };

export default {
    name: "Map",
    data() {
        return{
            NSWGeoJson: [],
            dailyCasesInState: [],
            center: [-33.8555, 151.1155],
        }
    },
    methods: {
        getColor(d) {
                return  d > 1000 ? '#3D2807' :
                        d > 500  ? '#bd0026' :
                        d > 100  ? '#fb6a4a' :
                        d > 50   ? '#fe9929' :
                        d > 10   ?   'yellow' :
                                    '#f0f0f0';
        },
        styleMap(feature){
            if (feature?.properties.LGA_CODE19) {
                const lgaCode = feature.properties.LGA_CODE19;
                const numberOfCasesByLga = _.find(this.dailyCasesInState, {lga_code: lgaCode});
            
                const totalCases = numberOfCasesByLga?.total_cases || 0;
                const color = this.getColor(totalCases);
                return { 
                    color: "black",
                    fillColor: color,
                    weight: 1,
                    // opacity: 0.5,
                    fillOpacity: 1
                };
            } else {
                return { color: "white" };
            }
        },
        onEachFeature(feature, layer) {
            if (feature?.properties.LGA_CODE19) {
                 const numberOfCasesByLga = _.find(this.dailyCasesInState, {lga_code: feature.properties.LGA_CODE19});

                if (numberOfCasesByLga) {
                    layer.bindPopup(`${feature.properties.LGA_NAME19.bold()}, Total cases: ${numberOfCasesByLga.total_cases}`);
                    layer.on('mouseover', () => { layer.openPopup(); });
                    layer.on('mouseout', () => { layer.closePopup(); });
                }
            }
        },
        addLegend(mapDiv) {
            const legend = L.control({position: 'bottomright'});

            legend.onAdd = function () {
                const div = L.DomUtil.create('div', 'info legend');
                const grades = [1, 10, 50, 100, 500, 1000];
                const labels = ['<strong>Number of Cases</strong><br>'];
                

                // loop through density intervals and generate a label with a colored square for each interval
                for (let i = 0; i < grades.length; i++) {
                div.innerHTML +=
                labels.push(
                    '<i class="circle" style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'));
                }
                div.innerHTML = labels.join('<br>');
                return div;
            };
            legend.addTo(mapDiv);
        },
        setupLeafletMap: function () {
            const mapDiv = L.map("mapContainer").setView(this.center, 8);
            L.tileLayer(
                "https://api.mapbox.com/styles/v1/moabyari/cktbirbqp2m7v17o50gpwe5x6/tiles/{z}/{x}/{y}?access_token={accessToken}",
                {
                    attribution:
                    'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 16,
                    minZoom: 6,
                    id: "mapbox/streets-v11",
                    accessToken: "XXX",
                }).addTo(mapDiv);

            L.geoJson(this.NSWGeoJson, {onEachFeature: this.onEachFeature, style: this.styleMap}).addTo(mapDiv);
            return mapDiv;
        },
    },
    async mounted() {
        this.NSWGeoJson = await api.getNSWGeoJson();
        this.dailyCasesInState = _.uniqBy(await api.getCasesInState(), 'lga_code');
        const mapDiv = this.setupLeafletMap();
        this.styleMap();
        this.addLegend(mapDiv)
    }
};
</script>

<style>
    #mapContainer {
        /* width: 300px; */
        height: 90vh;
        margin: 0 auto;
    }

    #container {
        padding: 0 29px 29px 29px;
    }

    #container h2 {
        font-size: 21px;
        text-align: center;
    }

    .legend {
        line-height: 18px;
        color: rgb(35, 29, 29);
        background-color: rgb(255, 255, 255, 0.45);
        padding: 5px 10px;
        border-radius: 3%;
    }

    .circle {
        width: 18px;
        height: 18px;
        float: left;
        margin-right: 8px;
        opacity: 1;
        border-radius: 50%;
    }   
</style>