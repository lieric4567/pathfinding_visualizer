import React from 'react';
import './css/App.css';
import Graph from './components/graph';
import {Navbar, Button} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';
import './css/navbar.css';


const GLOBAL = {
  mouse_down: false
};

class App extends React.Component {
  constructor(props){
    super(props);
    this.algorithms = ['Djikstra', 'A*'];
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      dropdownTitle: "Algorithms", 
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
              <NavDropdown.Item>Something</NavDropdown.Item>
            </NavDropdown>
            <Button className="mx-auto" variant="outline-success">Visualize</Button>
          </Nav>
        </Navbar>        
        <Graph></Graph>
      </div>
    )
  }
  
  handleSelect(key, e) {
    const newTitle = this.algorithms[parseInt(key)];
    this.setState({dropdownTitle: newTitle}); 
  }
}

export default App; 
export {GLOBAL};