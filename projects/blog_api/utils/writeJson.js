import fs from 'fs'; 
// ====== helper functions write to js=========
const writeJson = (data) =>{
     // Data to write to Another file
     const dataToWrite = JSON.stringify(data, null, 4);

     fs.writeFileSync('./blog.json', dataToWrite, 'utf-8') // Params: OUTFILE, datatowrite, the format
}

 export default writeJson;
