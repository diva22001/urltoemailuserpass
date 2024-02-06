const fs = require('fs');

// Definisikan pola regex
const regex = /[^\/:]+:[^\/:]+$/;

// Baca input dari file
const inputFile = 'input.txt';
const inputData = fs.readFileSync(inputFile, 'utf8').split('\n').filter(Boolean);

// Proses data dan filter hasil yang unik, kurang dari 100 karakter, tidak mengandung 'UNKNOWN'
const uniqueResults = new Set();

console.log('Processing...');

inputData.forEach((url, index) => {
  process.stdout.write(`\rProgress: ${((index + 1) / inputData.length * 100).toFixed(2)}%`);

  const match = url.match(regex);

  // Verifikasi apakah match ada, panjangnya kurang dari atau sama dengan 100, tidak mengandung 'UNKNOWN'
  if (match && match[0].length <= 100 && !match[0].includes('UNKNOWN')) {
    uniqueResults.add(match[0]);
  }
});

// Konversi Set ke array untuk output
const outputData = Array.from(uniqueResults);

// Tulis hasil ke file output
const outputFile = 'output.txt';
fs.writeFileSync(outputFile, outputData.join('\n'), 'utf8');

console.log('\nProses selesai. Output ditulis ke', outputFile);
