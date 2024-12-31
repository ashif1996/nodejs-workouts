// Perform web scraping using Axios and Cheerio.

const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://example.com').then((response) => {
    const $ = cheerio.load(response.data);
    const title = $('title').text();
    console.log('Page title:', title);
});