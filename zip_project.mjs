import fs from 'fs';
import * as archiverModule from 'archiver';
const archiver = archiverModule.default || archiverModule;

const output = fs.createWriteStream('C:\\Users\\DHANUSH\\mana-naidupalli-project.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Exclude heavy/unnecessary folders
archive.glob('**/*', {
  cwd: 'C:\\Users\\DHANUSH\\mana-naidupalli',
  ignore: ['node_modules/**', 'dist/**', 'dev-dist/**', '.git/**', '*.zip', 'extracted/**']
});

archive.glob('.*', {
  cwd: 'C:\\Users\\DHANUSH\\mana-naidupalli',
  ignore: ['.git/**', '.git/']
});

archive.finalize();