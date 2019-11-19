import React from 'react';
import '../css/node.css';
import '../css/grid.css';
import Node from './node';
import {Algorithms, Heuristic} from '../algorithms/algorithm';
import {NoiseGen, GraphGen} from '../algorithms/generators';

class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.algos = new Algorithms();
        this.h = new Heuristic();
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.state = {
            y_size: 39,
            x_size: 75,
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
                                    <Node ref={this.ref_array[row_num][col_num]} key={col_num} x={node.x} y={node.y}
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
        if(window.GLOBAL.mouse_down) {
            this.graph[row][col].isWall = !this.graph[row][col].isWall;
        }
    }

    runAlgorithm(props) {
        if(window.GLOBAL.animated) {
            this.clearAnimation();
        }
        let animate = this.algos.run(this.graph, this.graph[0][0], this.graph[38][74], this.h.euclidian, props.algorithm);
        animate.animate(this.ref_array);
    }

    clear= ()=> {
        const {x_size, y_size} = this.state; 
        this.graph = graphInit(y_size, x_size);
        for(const row of this.ref_array) {
            for(const node of row) {
                node.current.div_ref.current.classList = ['node'];
                node.current.div_ref.current.classList = ['node'];
                node.current.setState({wall: false, isStart: false, isEnd: false});
            }
        }
    };

    clearVisual= () => {
        for(const row of this.ref_array) {
            for(const node of row) {
                const {x, y} = node.current.props;
                const temp = this.graph[y][x];
                if (temp.isWall) continue;
                this.graph[y][x] = {
                    ...temp,
                    visited: false,
                    prev: null,
                    distance: Infinity
                }
                node.current.div_ref.current.classList = ['node'];
                node.current.div_ref.current.classList = ['node'];
            }
        }
    }

    clearAnimation= () => {
        for(const row of this.ref_array) {
            for(const node of row) {
                const {x, y} = node.current.props;
                const temp = this.graph[y][x];
                this.graph[y][x] = {
                    ...temp,
                    visited: false,
                    prev: null,
                    distance: Infinity
                }
                node.current.div_ref.current.classList.remove('path');
                node.current.div_ref.current.classList.remove('visited');
            }
        }
    }

    generateWeight = () => {
        this.clearVisual();
        const {y_size, x_size} = this.state;
        const nGen = new NoiseGen(y_size, x_size);
        nGen.perlin(this.graph);
        nGen.applyWeight(this.graph, this.ref_array);
        console.log(this.graph);
    }

    generateMaze = () => {
        this.clearVisual();
        const mGen = new GraphGen ();
        mGen.backtracing(this.graph, this.ref_array);
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