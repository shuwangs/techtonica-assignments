import fs from 'fs'; 

// ====== helper functions write to js=========
export const writeJson = (data) =>{
     // Data to write to Another file
     const dataToWrite = JSON.stringify(data, null, 4);

     fs.writeFileSync('./blog.json', dataToWrite, 'utf-8') // Params: OUTFILE, datatowrite, the format
}


// ====== helper function: read JSON from file ======
export const readJson = (path) => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};
