//load required libraries
const express = require('express');
const withQuery = require('with-query').default;
const fetch = require('node-fetch');


const baseUrl = 'https://newsapi.org/v2/top-headlines?';

const ENDPOINT = (country) => withQuery(baseUrl, {
    category: 'general',
    pageSize: '30',
    country: country

})

module.exports = (req, res) => {

    const app = express();
    app.get('/api/news', async (req,res) => {

        const apiKey = req.header('X-Api-Key')
        const country = req.query.country;
        const data = await fetch(ENDPOINT(country), {headers: {'X-Api-Key' : apiKey}})
        const newsJson =  await data.json()
        res.status(200);
        res.type('application/json');
        res.json(newsJson)

    })

    app(req,res)

}
