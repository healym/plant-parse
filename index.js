const dgram = require('dgram');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const server;
const server_active = false;

module.exports = {
  startServer,
  writeToFile,
  readLatest
};

const startServer = () => {
  server = dgram.createSocket('udp4');
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

const readLatest = (ID) => {
  console.log("TODO -- healym");
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
