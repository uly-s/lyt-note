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

function loadFolders() {
    fetch("./files.json").then((response) => response.json()).then((input) => { folders = input.folders; });
}

function loadFiles() {
    fetch("./files.json").then((response) => response.json()).then((input) => { files = input.files; });
}

function makeTree() {

}


class FileIO {
    constructor(props)
    {
        loadFolders();
        loadFiles();
        console.log(folders);
        console.log(files);
        
    }
}

export default FileIO;