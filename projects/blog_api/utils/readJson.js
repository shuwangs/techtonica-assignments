import fs from 'fs';

// ====== helper function: read JSON from file ======
const readJson = (path) => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

export default readJson;