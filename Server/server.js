const express = require('express');
const axios = require('axios');
const cors = require('cors');


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.listen(port);

app.get('/info', (req, res) => {
    axios.get('https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/stats.json')
    .then((response) => {
        res.json(response.data.data[0]);
    });
});

app.get('/vaccine', (req, res) => {
    axios.get('https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/agedata_vaccines.json')
    .then((response) => {
      console.log(response.data.data)
        res.json(response.data.data);
    });
});

app.get('/cases-by-age', (req, res) => {
    axios.get('https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/agedata.json')
    .then((response) => {
        res.json(response.data.data);
    });
});

app.get('/lga-daily-cases', (req, res) => {
    axios.get('https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/lga_daily_cases.json')
    .then((response) => {
        res.json(response.data.data);
    });
});

app.get('/fatalities-by-age', (req, res) => {
    axios.get('https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/fatalitiesdata.json')
    .then((response) => {
        res.json(response.data.data);
    });
});

app.get('/nsw-geojson', (req, res) => {
    axios.get('https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/geojson/lga_2019_nsw_simplified.json')
        .then((response) => {
            res.json(response.data);
        });
});

// 404 page:
app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started at http://localhost:${ port }`);
