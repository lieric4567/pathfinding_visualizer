import React from 'react';
import './css/App.css';
import Graph from './components/graph';
import {Navbar, Button} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';
import './css/navbar.css';

const GLOBAL = {
  mouse_down: false,
  start: [0, 0],
  end: [8, 75]
};

class App extends React.Component {
  constructor(props){
    super(props);
    this.algorithms = ['Djikstra', 'A*'];
    this.handleSelect = this.handleSelect.bind(this);
    this.graph_ref = React.createRef();
    this.handleVisualize = this.handleVisualize.bind(this);
    this.state = {
      dropdownTitle: "Algorithms",
      algoIndex: null,
    };
  }

  render() {
    const {dropdownTitle} = this.state;
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Nav variant="row">
            <NavDropdown ref={this.dropdown} className="order-0 static-width" title={dropdownTitle} id="basic-nav-dropdown">
              <NavDropdown.Item eventKey="0" onSelect={this.handleSelect}>Djikstra</NavDropdown.Item>
              <NavDropdown.Item eventKey="1" onSelect={this.handleSelect}>A*</NavDropdown.Item>
            </NavDropdown>
            <Button className="mx-auto" variant="outline-success" onClick={this.handleVisualize}>Visualize</Button>
          </Nav>
        </Navbar>        
        <Graph ref={this.graph_ref}></Graph>
      </div>
    )
  }
  
  handleSelect(key, e) {
    const newTitle = this.algorithms[parseInt(key)];
    this.setState({dropdownTitle: newTitle, algoIndex: parseInt(key)}); 
  }

  handleVisualize(e) {
    const props = {
      algorithm: this.state.algoIndex,
    }
    this.graph_ref.current.runAlgorithm(props);
  }

}

export default App; 
export {GLOBAL};