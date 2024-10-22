const express = require("express");
const fs = require("fs");
const statusMonitor = require('express-status-monitor');
const zlib = require('zlib')

const app = express();
const PORT = 8000;
app.use(statusMonitor());

// Stream Read (text.txt) --> Zipper --> fs write stream
fs.createReadStream("./text.txt").pipe(
    zlib.createGzip().pipe(fs.createWriteStream("./text.zip"))
)
app.get('/', (req, res) => {
    const stream = fs.createReadStream("./text.txt","utf-8");
     stream.on('data', (chunk)=>{
        res.write(chunk);
        stream.on("end" , () => res.end());
     })
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});