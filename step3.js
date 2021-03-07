const fs = require('fs');
const process = require('process');
const axios = require('axios');

const output = function (data, out) {
    if (out) {
        fs.writeFile(`${out}`, data, 'utf8', (err) => {
            if (err) {
                console.log(`ERROR writing: ${path}, ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log("DATA:", data);
    }
}


const cat = function (path, out) {
    fs.readFile(`${path}`, 'utf8', (err, data) => {
        if (err) {
            console.log(`ERROR reading: ${path}, ${err}`);
            process.exit(1);
        } else {
            output(data, out);
        }
    });
}

const webCat = async function (url, out) {
    try {
        if (url.includes('http')) {
            let resp = await axios.get(url);
            output(resp.data, out);
        } else {
            httpUrl = 'http://' + url;
            let resp = await axios.get(httpUrl);
            output(resp.data, out);
        }
    } catch (err) {
        console.log(`ERROR reading: ${url}, ${err}`);
        process.exit(1);
    }
};

let input;
let out;

if (process.argv[2] == '--out') {
    out = process.argv[3];
    input = process.argv[4];
}
else {
    input = process.argv[2];
}

if (input.includes('http') || input.includes('www')) {
    webCat(input, out);
} else {
    cat(input, out);
}