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
            y_size: 37,
            x_size: 75,
        };
        this.graph = graphInit(this.state.y_size, this.state.x_size);
        this.ref_array = nodeRefInit(this.state.y_size, this.state.x_size);
    }

    render() {
        return (
            <div className="grid" onMouseLeave={this.handleMouseLeave}>
                {this.graph.map((row, row_num) => {
                    return (
                        <div className="row" id={row_num} key={row_num}>
                            {row.map( (node, col_num) => {
                                return (
                                    <Node ref={this.ref_array[row_num][col_num]} key={col_num} x={node.x} y={node.y}
                                        onMD={this.handleMouseDown} onMO={this.handleMouseOver} onDrag={this.handleDrag}></Node>
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

    componentDidMount() {
        //Component rendered set the initial start, end point.
        this.graph[19][15].isStart = true;
        this.graph[19][60].isEnd = true;
        this.start = {y: 19, x: 15};
        this.end = {y: 19, x:60};
        this.ref_array[this.start.y][this.start.x].current.setState({isStart: true});
        this.ref_array[this.end.y][this.end.x].current.setState({isEnd: true });
    }

    handleMouseDown(row, col) {
        this.graph[row][col].isWall = !this.graph[row][col].isWall;
    }

    handleMouseOver(row, col) {
        if(window.GLOBAL.mouse_down) {
            this.graph[row][col].isWall = !this.graph[row][col].isWall;
        }
    }

    handleMouseLeave = (e) => {
        window.GLOBAL.dragging = false; 
        window.GLOBAL.prev = null;
        window.GLOBAL.mouse_down = false;
    }

    handleDrag = (prev_x, prev_y, x, y) => {
        const prev = this.graph[prev_y][prev_x];
        const node = this.graph[y][x];
        if(node.isWall || node.isStart || node.isEnd) return; 
        if(prev.isStart) {
            prev.isStart = false;
            this.ref_array[prev_y][prev_x].current.setState({isStart: false});
            node.isStart = true;
            this.ref_array[y][x].current.setState({isStart: true});
            this.start = {x: node.x, y: node.y};
        }
        else {
            prev.isEnd = false;
            this.ref_array[prev_y][prev_x].current.setState({isEnd: false});
            node.isEnd = true;
            this.ref_array[y][x].current.setState({isEnd: true});
            this.end = {x: node.x, y: node.y};
        }
    }

    runAlgorithm(props) {
        if(window.GLOBAL.animated) {
            this.clearAnimation();
        }
        let animate = this.algos.run(this.graph, this.graph[this.start.y][this.start.x], this.graph[this.end.y][this.end.x], this.h.manhattan, props.algorithm);
        animate.animate(this.ref_array);
    }

    clear= ()=> {
        const {x_size, y_size} = this.state; 
        this.graph = graphInit(y_size, x_size);
        for(const row of this.ref_array) {
            for(const node of row) {
                node.current.div_ref.current.classList = ['node'];
                const state = {wall: false, isStart: false, isEnd: false};
                if(node.isStart) state.isStart = true;
                if(node.isEnd) state.isEnd = true;
                node.current.setState(state);
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
                node.current.div_ref.current.classList.remove('light');
                node.current.div_ref.current.classList.remove('medium');
                node.current.div_ref.current.classList.remove('heavy');
                node.current.div_ref.current.classList.remove('insane');
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
                    distance: Infinity,
                    fScore: Infinity
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
        fScore: Infinity,
        isWall: false,
        visited: false,
        prev: null,
        isStart: false,
        isEnd: false
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