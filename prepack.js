const fs = require('fs');

// Leer el package.json del proyecto
const packageData = require('./package.json');

// Actualizar valores
packageData.main = './index.js';
packageData.types = './index.d.ts';
packageData.module = './index.js';

delete packageData.files;
delete packageData.devDependencies;
delete packageData.scripts.pack;

// Guardar el nuevo package.json en la carpeta dist
const data = JSON.stringify(packageData, null, 2);
fs.writeFileSync('./dist/package.json', data);

// Copiar el README.md a la carpeta dist
fs.copyFileSync('./README.md', 'dist/README.md');