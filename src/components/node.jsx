import React from 'react';
import '../css/node.css';

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.div_ref = React.createRef();
        this.state = {
            wall: false,
            isStart: false,
            isEnd: false
        }
    }

    render() {
        console.log('rerendering');
        const {wall, isStart, isEnd} = this.state;
        return wall && !isStart && !isEnd ? (<div ref={this.div_ref} className="node wall" 
                          onMouseDown={this.handleMouseDown} 
                          onMouseOver={this.handleMouseOver}
                          onMouseUp={this.handleMouseUp}></div>
        ) : (
        <div ref={this.div_ref} className="node"
            onMouseDown={this.handleMouseDown} 
            onMouseOver={this.handleMouseOver}
            onMouseUp={this.handleMouseUp}></div>);
    }

    handleMouseDown(e) {
        if (!window.GLOBAL.animate){
            window.GLOBAL.mouse_down = true; 
            const {wall, isStart, isEnd} = this.state; 
            if(!wall && !isStart && !isEnd) {
                this.setState({wall: true});
                this.props.onMD(this.props.y, this.props.x);
            }
        }
    }

    handleMouseOver(e) {
        const {wall, isStart, isEnd} = this.state; 
        const {x, y} = this.props;
        if(window.GLOBAL.mouse_down && !window.GLOBAL.animate) {
            if(!wall && !isStart && !isEnd) {
            this.setState({wall: true});
            this.props.onMO(y, x);
            }
        }
    }

    handleMouseUp(e) {
        window.GLOBAL.mouse_down = false;
    }
    
}

export default Node