import React from 'react';
import './css/App.css';
import Graph from './components/graph';

const GLOBAL = {
  mouse_down: false
};

class App extends React.Component {
  render() {
    return (
      <Graph></Graph>
    )
  }
}

export default App; 
export {GLOBAL};