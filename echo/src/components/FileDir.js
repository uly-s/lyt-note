import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FolderIcon from '@material-ui/icons/Folder';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={props.addFolder}>
            <FolderIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Files
          </Typography>
           
        </Toolbar>
      </AppBar>
    </div>
  );
}


function alterJson(data, id, value)
{
  if (data.id === id && data.hasOwnProperty('text'))
    data.text = value;
  else if (data.hasOwnProperty('children'))
    data.children.map((child) => {alterJson(child, id, value)})
  
};



function FileTree(handleSelect, data) {

  const StyledTreeItem = withStyles({
    label: {
      color: "black"
    },
  })(TreeItem);

  const renderTree = (nodes) => (
    <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.label}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </StyledTreeItem>
  );
  
  return (
    
    <TreeView
      color="black"
      defaultCollapseIcon={<ExpandMoreIcon color="primary" />}
      defaultExpandIcon={<ChevronRightIcon color="primary"/>}
      defaultExpanded={["root"]}
      onNodeSelect={(e, v) => handleSelect(e, v)}>
      {renderTree(data)}
    </TreeView>
    
  );
}

 export default class FileSystem extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {selectedId: "root", selectedText:"", data: {}, refresh: false};
    this.handleSelect = this.handleSelect.bind(this);
    this.addFolder = this.addFolder.bind(this);

    this.updateNote = this.updateNote.bind(this);
    this.updateData = this.updateData.bind(this);

    this.noteRef = props.noteRef;
    fetch("./files.json").then((response) => response.json()).then((input) => { this.setState({data: input.data})});
  }

  addFolder(event) {
    event.preventDefault();
    let name = "sub2";
    let id = this.state.selectedId;
    let newId = id + "/" + name;
    let newItem = {id: newId, label: name};
    this.state.data.children.push(newItem);
    this.setState({refresh: !this.state.refresh});
    console.log(this.state.data);
  }

  handleSelect(event, value)
  {
    event.preventDefault();

    if(value !== this.state.selectedId)
    {
      this.updateData(this.state.selectedId, this.noteRef.current.getText());

      this.updateNote(this.state.data, value);

      this.setState({selectedId:value})
    }
  }



  updateNote(data, id) {
    if (data.id === id && data.hasOwnProperty('text'))
      this.noteRef.current.setText(data.text);
    else if (data.hasOwnProperty('children'))
      data.children.map((child) => {this.updateNote(child, id)});
  };



  updateData(id, value)
  {
    let json = this.state.data;
    console.log(json);
    alterJson(json, id, value);
    console.log(json);

    this.setState({data:json});
  }



  render() {
    return (
      <div>
        <div>
        <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu" onClick={(e) => this.addFolder(e)}>
            <FolderIcon />
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
           
        </Toolbar>
      </AppBar>
        </div>
        <div>
          {FileTree(this.handleSelect, this.state.data)}
        </div>
      </div>
    );
  }
  
}