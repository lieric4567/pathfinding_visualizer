import React from 'react';
import '../css/node.css';
import GLOBAL from '../App';

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.state = {isWall: false};
    }

    render() {
        console.log('updating')
        const {isWall} = this.state;
        return isWall ? (<div className="node wall" 
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
        const {isWall} = this.state;
        !isWall ? this.setState({isWall: true}) :
        this.setState({isWall: false});
    }

    handleMouseOver(e) {
        const {isWall} = this.state;
        if(!isWall && GLOBAL.mouse_down) {
            this.setState({isWall: true});
        }
        else if (isWall && GLOBAL.mouse_down) {
            this.setState({isWall: false});
        }
    }

    handleMouseUp(e) {
        GLOBAL.mouse_down = false;
    }
    
}

export default Node