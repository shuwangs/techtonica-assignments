import fs from 'fs'; 

// ====== helper functions write to js=========
export const writeJson = (data) =>{
     const dataToWrite = JSON.stringify(data, null, 4);

     fs.writeFileSync('./blog.json', dataToWrite, 'utf-8') // Params: OUTFILE, datatowrite, the format
}


// ====== helper function: read JSON from file ======
export const readJson = (path) => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};


// ====== API helper function: ======
export const validateId = (id) => {
  if (isNaN(id)) {
    return false;
  }
  return true;
};


// ====== READ Markdown file into db helper function: ======
