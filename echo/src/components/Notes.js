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



class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: "do your worst!", 
                   newItem: "", 
                   counter: 0, 
                   fileSelection: ""} // You can also pass a Quill Delta here

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.fileRef = React.createRef();
  }
 
  handleChange(value) {
    this.setState({ text: value })
  }



  handleSelect(event, value) {
    event.preventDefault();
    var clean = value.replace('/', '');
    notes[this.state.fileSelection] = this.state.text;
    this.setState({ fileSelection: clean });
    this.setState({ text: notes[clean] });
    this.fileRef.current.setFile(value);
  }

 
  handleClick(event) {
    event.preventDefault();
    
 
      console.log("ya");
      this.fileRef.current.save();
    

    this.setState((state) => {
      return {counter : state.counter + 1};
    });
  }

  handleInput(event) {
    event.preventDefault();
    this.setState({newItem : event.target.value});
  }




  render() {
    return (
      
      <div className="row">
        <div className="col-n-1">

        <div className="psu-row">
          <FileSystem  ref={this.fileRef} handleSelect={this.handleSelect}/>
        </div>

        

        </div>

        <div className="col-n-2">
          <div className="Notes-body">
               <ReactQuill theme="snow" value={this.state.text} onChange={this.handleChange} />
          </div>
          <div className="psu-row-add">
            <button className="button" onClick = {(e) => this.handleClick(e)} />
          </div>
         
        </div>
          
      </div>


 
    );
  }
}

export default Notes;