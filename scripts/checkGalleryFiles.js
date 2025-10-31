const fs = require('fs');
const path = require('path');
const GALLERY = path.join(__dirname, '..', 'public', 'assets', 'images', 'gallery');

if (!fs.existsSync(GALLERY)) {
  console.error('Gallery folder not found:', GALLERY);
  process.exit(2);
}

const files = fs.readdirSync(GALLERY).filter(f => !fs.statSync(path.join(GALLERY,f)).isDirectory());
let ok = true;
files.forEach(f => {
  const p = path.join(GALLERY, f);
  const fd = fs.openSync(p, 'r');
  const buf = Buffer.alloc(4);
  fs.readSync(fd, buf, 0, 4, 0);
  fs.closeSync(fd);
  const hex = buf.toString('hex');
  // JPEG files start with ffd8ffe0 or ffd8ffdb or ffd8ffe1 etc. Check first two bytes ffd8
  if (!hex.startsWith('ffd8')) {
    console.log(`${f}: MISSING JPEG magic (starts ${hex})`);
    ok = false;
  } else {
    console.log(`${f}: OK (starts ${hex})`);
  }
});
process.exit(ok ? 0 : 1);
