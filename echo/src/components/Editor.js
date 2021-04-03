import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./styles/Notes.css"
import FileNav from './FileDir.js';
import Note from './Note.js'

 
class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: "aye lmao", 
                   newItem: "", 
                   counter: 0, 
                   selectedId: "root"} // You can also pass a Quill Delta here




    this.fileRef = React.createRef();
    this.noteRef = React.createRef();
  }
 
 




  render() {
    return (
      
      <div className="row">
        <div className="col-n-1">

        <div className="psu-row">
          <FileNav  ref={this.fileRef} noteRef={this.noteRef} handleSelect={this.handleSelect}/>
        </div>

        

        </div>

        <div className="col-n-2">
          <div className="Notes-body">
               <Note ref={this.noteRef} fileRef={this.fileRef}  />
          </div>
         
        </div>
          
      </div>


 
    );
  }
}

export default Editor;