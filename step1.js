const fs = require('fs');
const process = require('process');

const cat = function (path) {
    fs.readFile(`${path}`, 'utf8', (err, data) => {
        if (err) {
            console.log(`ERROR reading: ${path}, ${err}`);
            process.exit(1);
        }
        console.log("DATA:", data);
    })
}
// for (let arg of process.argv) {
//     console.log(arg)
// }
cat(process.argv[2])