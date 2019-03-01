const dgram = require('dgram');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

let server = dgram.createSocket('udp4');
const server_active = false;

const startServer = () => {
  server.bind(5000);
  server_active = true;
}

const writeToFile = (plantData) => {
  if (!fs.existsSync(plantData.ID))
    writer = csvWriter({ headers: ["humidity", "light_exposure"]});
  else
    writer = csvWriter({sendHeaders: false});
  writer.pipe(fs.createWriteStream(plantData.ID, {flags: 'a'}));
  writer.write({
    humidity:plantData.humidity,
    light_exposure:plantData.light_exposure,
  });
  writer.end();
};

const readLast = (ID) => {
  return readLines(ID, numEntries);
};

const readLines = (ID, numEntries) => {
  entries = [];
  fs.readFile(ID, 'utf-8', function(err, data) {
    if (err) throw err;

    var lines = data.trim().split('\n');
    var lastLines = lines.slice((0 - numEntries));
    for (line in lastLines) {
      fields = line.split(',');
      entry = { humidity: fields[0], light_exposure: fields[1]};
      entries.push(entry);
    }
  });
};

server.on('error', (err) => {
  const readLatest = 
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  plantData = JSON.parse(msg.toString('utf8').substring(0, str.length-1));
  writeToFile(plantData);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

module.exports = {
  startServer,
  writeToFile,
  readLast,
  readLines
};