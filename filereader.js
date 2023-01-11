const fs = require('fs');
const fsPromises = fs.promises;

const PATH = './files';

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, time);
  })
}

// Асинхронная загрузка.
async function loadFiles() {
  try{
    const filesStat = [];
    let counter = 0;
    let sum = 0;
    const arrLength = 100;
    let arr = new Array(arrLength).fill(' ');
    let files = await fsPromises.readdir(PATH);
    for (let i = 0; i < files.length; i++){
      let x = await fsPromises.stat(`${PATH}/${files[i]}`);
      filesStat.push(x);
    }
    const filesSize = filesStat.reduce((acc, el) => {
      return acc + el.size;
    }, 0);
    for (let i = 0; i < filesStat.length; i++){
      sum += filesStat[i].size;
      await delay(1000);
      console.clear();
      console.log(arr.fill('█', 0, Math.round((sum / filesSize)*100)).join(''), `   ${Math.round((sum / filesSize)*100)}%   `,`${sum}/${filesSize} bytes`);
    }
    console.log('File Analysis Completed');
  } catch (error){
    console.log(error);
  }
}

loadFiles();
