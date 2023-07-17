const os = require('os');
const fs = require('fs');
const path = require('path');

const networkInterfaces = os.networkInterfaces();
const networkValues = Object.values(networkInterfaces).flat();
const networkValue = networkValues.find((iface) => iface.family === 'IPv4' && !iface.internal && iface.address.startsWith('192.168'));

if(!networkValue.address) {
    throw new Error('No IP address found!. Change the IP address manually in .env.development file and run "start" command in package.json');
}
try{
    const envPath = path.join(__dirname, '.env.development');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    const modifiedLines = lines.map((line) => line.includes('API_URL') ? `API_URL=http://${networkValue.address}:3000/api/` : line);
    const modifiedData = modifiedLines.join('\n');
    fs.writeFileSync(envPath, modifiedData, 'utf8');

    console.log(`"API_URL" in file .env.development was updated to "API_URL=http://${networkValue.address}:3000/api/".`)
}
catch(err){
    throw new Error('No IP address found!. Change the IP address manually in .env.development file and run "start" command in package.json');
}
