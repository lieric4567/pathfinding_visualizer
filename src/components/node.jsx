import React from 'react';
import '../css/node.css';
import GLOBAL from '../App';

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
        GLOBAL.mouse_down = true; 
        const {wall, isStart, isEnd} = this.state; 
        wall && !isStart && !isEnd ? this.setState({wall: false}) : this.setState({wall: true});
        this.props.onMD(this.props.y, this.props.x);
    }

    handleMouseOver(e) {
        const {wall, isStart, isEnd} = this.state; 
        const {x, y} = this.props;
        if(GLOBAL.mouse_down) {
            wall && !isStart && !isEnd ? this.setState({wall: false}) : this.setState({wall: true});
            this.props.onMO(y, x);
        }
    }

    handleMouseUp(e) {
        GLOBAL.mouse_down = false;
    }
    
}

export default Node