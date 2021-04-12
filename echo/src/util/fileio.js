import React from 'react';

function alterJson(data, id, value)
{
  if (data.id === id && data.hasOwnProperty('text'))
    data.text = value;
  else if (data.hasOwnProperty('children'))
    data.children.map((child) => {alterJson(child, id, value)})
  
};




var folders = [];
var files = [];
var tree = {};


function buildTree() {
  tree = folders[0];

  for(let i = 0; i < folders.length; i += 1)
  {
    for(let j = i; j < folders.length; j += 1)
    {
      if(folders[j].parent === folders[i].id)
        folders[i].children.push(folders[j]);
    }
  }
}




class FileIO {

    constructor(props)
    {
      fetch("./files.json").then((response) => response.json()).then((input) => { folders = input.folders; });
      fetch("./files.json").then((response) => response.json()).then((input) => { files = input.files; });
        
      buildTree();

    }

    show() {
      console.log(tree);
      //console.log(files);
        
    }

}

export default FileIO;