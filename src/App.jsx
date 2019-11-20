import React from 'react';
import './css/App.css';
import Graph from './components/graph';
import {Navbar, Button} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';
import './css/navbar.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.algorithms = ['Djikstra', 'A*', 'BFS', 'DFS'];
    this.handleSelect = this.handleSelect.bind(this);
    this.graph_ref = React.createRef();
    this.handleVisualize = this.handleVisualize.bind(this);
    this.handleClear = this.handleClear.bind(this); 
    this.state = {
      dropdownTitle: "Djikstra",
      algoIndex: 1,
    };
  }

  render() {
    const {dropdownTitle} = this.state;
    return (
      <div className="wrapper">
        <Navbar className="nav-wide" bg="dark" variant="dark" expand="lg">
          <Nav variant="row">
            <NavDropdown ref={this.dropdown} className="order-0 static-width bold" title={dropdownTitle} id="basic-nav-dropdown">
              <NavDropdown.Item eventKey="1" onSelect={this.handleSelect}>Djikstra</NavDropdown.Item>
              <NavDropdown.Item eventKey="2" onSelect={this.handleSelect}>A*</NavDropdown.Item>
              <NavDropdown.Item eventKey="3" onSelect={this.handleSelect}>Breadth First Search</NavDropdown.Item>
              <NavDropdown.Item eventKey="4" onSelect={this.handleSelect}>Depth First Search</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="mx-auto bold"  onClick={this.handleVisualize}>Visualize</Nav.Link>
            <Nav.Link className="mx-auto bold"  onClick={this.handleClear}>Clear</Nav.Link>
            <Nav.Link className="mx-auto bold"  onClick={this.handleWeight}>Random Weights</Nav.Link>
            <Nav.Link className="mx-auto bold"  onClick={this.handleGraph}>Random Maze</Nav.Link>
          </Nav>
        </Navbar>        
        <Graph ref={this.graph_ref}></Graph>
      </div>
    )
  }
  
  handleSelect(key, e) {
    const newTitle = this.algorithms[parseInt(key) - 1];
    this.setState({dropdownTitle: newTitle, algoIndex: parseInt(key)}); 
  }

  handleVisualize(e) {
    if(!window.GLOBAL.animate) {
      const props = {
        algorithm: this.state.algoIndex,
      }
      this.graph_ref.current.runAlgorithm(props);
    }
  }

  handleClear(e) {
    if(!window.GLOBAL.animate) {
      this.graph_ref.current.clear();
    }
  }

  handleWeight = (e) => {
    if(!window.GLOBAL.animate) {
      this.graph_ref.current.generateWeight();
    }
  }

  handleGraph = (e) => {
    if(!window.GLOBAL.animate) {
      this.graph_ref.current.generateMaze();
    }
  }

}

export default App; 