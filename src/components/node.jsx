import React from 'react';
import './css/node.css';

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visited: false,
            animated: false,
        };
    }

    render() {
        return (
            <div class="node"></div>
        );
    }

    const createNode = (row, col) => {
        const props = {
            
        }
    };

    const createGrid = (row, col) => {
        
    };
}

export default Node