import React from 'react';
import '../css/node.css';
import '../css/grid.css';
import Node from './node';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x_size: 30,
            y_size: 50,
            graph: [],
        };
    }

    componentDidMount() {
        const graph = graphInit(this.state.x_size, this.state.y_size);
        this.setState({graph: graph});
    }

    render() {
        const {graph, mouse_down} = this.state;
        return (
            <div className="grid">
                {graph.map((row, row_num) => {
                    return (
                        <div className="row" id={row_num} key={row_num}>
                            {row.map( (node, col_num) => {
                                return (
                                    <Node key={col_num} distance={node.distance} x={node.x} y={node.y}></Node>
                                )
                            })}
                        </div>
                    );
                })}
            </div>
        )
    }
}

const createNode = (row, col) => {
    return {
        x: row,
        y: col,
        distance: Infinity,
    };
};

const graphInit = (rows, cols) => {
    const graph = [];
    for(let row = 0; row < rows; row++) {
        graph[row] = [];
        for(let col = 0; col < cols; col++) {
            graph[row].push(createNode(row, col));
        }
    }
    return graph;
}

export default Graph;