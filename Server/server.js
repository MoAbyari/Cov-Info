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

// 404 page:
app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started at http://localhost:${ port }`);
