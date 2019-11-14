import React from 'react';
import '../css/node.css';
import '../css/grid.css';
import Node from './node';
import GLOBAL from '../App';
import {Algorithms, Animate} from '../algorithms/algorithm';

class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.state = {
            y_size: 39,
            x_size: 76,
            startSet: false,
            endSet: false,
        };
        this.graph = graphInit(this.state.y_size, this.state.x_size);
        this.ref_array = nodeRefInit(this.state.y_size, this.state.x_size);
    }
    render() {
        return (
            <div className="grid">
                {this.graph.map((row, row_num) => {
                    return (
                        <div className="row" id={row_num} key={row_num}>
                            {row.map( (node, col_num) => {
                                return (
                                    <Node ref={this.ref_array[row_num][col_num]} key={col_num} distance={node.distance} x={node.x} y={node.y}
                                        onMD={this.handleMouseDown} onMO={this.handleMouseOver}></Node>
                                )
                            })}
                        </div>
                    );
                })}
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    handleMouseDown(row, col) {
        this.graph[row][col].isWall = !this.graph[row][col].isWall;
    }

    handleMouseOver(row, col) {
        if(GLOBAL.mouse_down) {
            this.graph[row][col].isWall = !this.graph[row][col].isWall;
        }
    }

    runAlgorithm() {
        const algos = new Algorithms();
        const shortest = algos.run_djikstra(this.graph, this.graph[0][0], this.graph[38][75]);
        console.log(this.ref_array[0][0].current);
    }
}

const createNode = (row, col) => {
    return {
        y: row,
        x: col,
        length: 1,
        distance: Infinity,
        isWall: false,
        visited: false,
        prev: null,
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

const nodeRefInit = (rows, cols) => {
    const ref_array = [];
    for(let row = 0; row < rows; row++){
        ref_array[row] = [];
        for (let col = 0; col < cols; col++){
            ref_array[row].push(React.createRef());
        }
    }
    return ref_array;
}

export default Graph;