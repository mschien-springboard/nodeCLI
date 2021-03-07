const fs = require('fs');
const process = require('process');
const axios = require('axios');

const cat = function (path) {
    fs.readFile(`${path}`, 'utf8', (err, data) => {
        if (err) {
            console.log(`ERROR reading: ${path}, ${err}`);
            process.exit(1);
        }
        console.log("DATA:", data);
    })
}

const webCat = async function (url) {
    try {
        if (url.includes('http')) {
            let resp = await axios.get(url);
            console.log("DATA:", resp.data);
        } else {
            httpUrl = 'http://' + url;
            let resp = await axios.get(httpUrl);
            console.log("DATA:", resp.data);
        }
    } catch (err) {
        console.log(`ERROR reading: ${url}, ${err}`);
        process.exit(1);
    }
};

let input = process.argv[2];

if (input.includes('http') || input.includes('www')) {
    webCat(input);
} else {
    cat(input);
}