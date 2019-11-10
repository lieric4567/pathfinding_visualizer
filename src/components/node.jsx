import React from 'react';
import '../css/node.css';
import GLOBAL from '../App';

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.state = {
            wall: false
        }
    }

    render() {
        const {wall} = this.state;
        return wall ? (<div className="node wall" 
                          onMouseDown={this.handleMouseDown} 
                          onMouseOver={this.handleMouseOver}
                          onMouseUp={this.handleMouseUp}></div>
        ) : (
        <div className="node"
            onMouseDown={this.handleMouseDown} 
            onMouseOver={this.handleMouseOver}
            onMouseUp={this.handleMouseUp}></div>);
    }

    handleMouseDown(e) {
        GLOBAL.mouse_down = true; 
        const {wall} = this.state; 
        wall ? this.setState({wall: false}) : this.setState({wall: true});
        this.props.onMD(this.props.x, this.props.y);
    }

    handleMouseOver(e) {
        const {wall} = this.state;
        const {x, y} = this.props;
        if(GLOBAL.mouse_down) {
            wall ? this.setState({wall: false}) : this.setState({wall: true});
            this.props.onMO(x, y);
        }
    }

    handleMouseUp(e) {
        GLOBAL.mouse_down = false;
    }
    
}

export default Node