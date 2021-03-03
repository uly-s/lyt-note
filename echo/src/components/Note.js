import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./styles/Notes.css"
import FileSystem from './FileDir.js';


 
var notes = {
 root1: "1. loot\n2. kill\n3. return",
 root2: "The way a crow\nshook down on me\n",
 root3: '',
 root4: "",

}



class Note extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: "aye lmao" } // You can also pass a Quill Delta here

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getText = this.getText.bind(this);
    this.setText = this.setText.bind(this);
    this.fileRef = props.fileRef;
  }
 
  handleChange(value) {
    this.setState({ text: value })
  }



  handleSelect(event, value) {
    event.preventDefault();
    this.fileRef.current.setFile(value);
    this.setState({ fileSelection: value });
    let newText = this.fileRef.current.getText()
    this.setState({ text: newText});
    
    //console.log(value);
  }

  getText() {
    return this.state.text;
  }

  setText(value) {
    this.setState({ text: value })
  }
 





  render() {
    return (
          <div className="Notes-body">
               <ReactQuill theme="snow" value={this.state.text} onChange={this.handleChange} />
          </div> 
    );
  }
}

export default Note;