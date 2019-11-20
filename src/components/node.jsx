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
        
        if(isStart) {
            return <div ref={this.div_ref} className="node start" 
            onMouseDown={this.handleMouseDown} 
            onMouseOver={this.handleMouseOver}
            onMouseUp={this.handleMouseUp}
            onMouseLeave={this.handleMouseLeave}></div>
        }

        else if(isEnd) {
            return <div ref={this.div_ref} className="node end" 
            onMouseDown={this.handleMouseDown} 
            onMouseOver={this.handleMouseOver}
            onMouseUp={this.handleMouseUp}
            onMouseLeave={this.handleMouseLeave}></div>
        }

        else if(wall) { 
            return <div ref={this.div_ref} className="node wall" 
            onMouseDown={this.handleMouseDown} 
            onMouseOver={this.handleMouseOver}
            onMouseUp={this.handleMouseUp}
            onMouseLeave={this.handleMouseLeave}></div>
        }
        
        else {
            return <div ref={this.div_ref} className="node" 
            onMouseDown={this.handleMouseDown} 
            onMouseOver={this.handleMouseOver}
            onMouseUp={this.handleMouseUp}
            onMouseLeave={this.handleMouseLeave}></div>
        }
    }

    handleMouseDown(e) {
        if (!window.GLOBAL.animate){
            window.GLOBAL.mouse_down = true; 
            const {wall, isStart, isEnd} = this.state;
            if(isStart || isEnd){
                const {x, y} = this.props;
                window.GLOBAL.dragging = true;
                window.GLOBAL.prev = {x: x, y: y};
                window.cursor = window.getComputedStyle(e.target).getPropertyValue("background-image");
            } 
            else if(!wall && !isStart && !isEnd) {
                this.setState({wall: true});
                this.props.onMD(this.props.y, this.props.x);
            }
        }
    }

    handleMouseOver(e) {
        const {wall, isStart, isEnd} = this.state; 
        const {x, y} = this.props;
        if(window.GLOBAL.dragging) {
            e.target.style.cursor = `${window.cursor}, auto`;
        }
        if(window.GLOBAL.mouse_down && !window.GLOBAL.animate && !window.GLOBAL.dragging) {
            if(!wall && !isStart && !isEnd) {
            this.setState({wall: true});
            this.props.onMO(y, x);
            }
        }
    }

    handleMouseLeave = (e) => {
        e.target.style.cursor = 'pointer';
    }

    handleMouseUp(e) {
        window.GLOBAL.mouse_down = false;
        if(window.GLOBAL.dragging) {
            window.GLOBAL.dragging = false;
            this.props.onDrag(window.GLOBAL.prev.x, window.GLOBAL.prev.y, this.props.x, this.props.y);
            window.GLOBAL.prev = null;
        }
    }
    
}

export default Node