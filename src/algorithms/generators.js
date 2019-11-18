export {GraphGen, NoiseGen};

/* 
Here contains some generators to make the
graph more interesting. To generate weights
for the graph there will be different noise
generators.
To generate different mazes we will use some maze generation algorithms.
*/

class GraphGen {
    backtracing = () => {

    }
}

class NoiseGen {

    constructor(y_size, x_size) {
        this.gradient = [];
        for( let row = 0; row < y_size; row++) {
            this.gradient[row] = [];
            for( let col = 0; col < x_size; col++){
                let vector = []
                vector.push(Math.random());
                vector.push(Math.random());
                this.gradient[row].push(vector);
            }
        }
        this.values = [];
    }

    perlin = (graph) => {
        /*
        Generates perlin noise to populate graph with weights
        */

        let zoom = 0.4;
        console.log('generating weights');
        for (let row=0 ; row < graph.length; row++) {
            this.values[row] = [];
            for (let col=0 ; col < graph[0].length; col++) {
                let amplitude = 1.0;
                let value = 0; 

                for(let i = 0; i < 4; i++ ) {
                    let t = row - 1;
                    let b = row + 1;
                    let l = col - 1;
                    let r = col + 1;
    
                    //Edge cases wrap around the graph;
                    if (row === 0) t = graph.length - 1;
                    if (row === graph.length - 1) b = 0;
                    if (col === 0) l = graph[0].length - 1;
                    if (col === graph[0].length - 1) r = 0;
                    
                    let n0 = this.dotProduct(row, col, t, col);
                    let n1 = this.dotProduct(row, col, row, l);
                    let ix0 = this.lerp(n0, n1, zoom);
    
                    n0 = this.dotProduct(row, col, b, col);
                    n1 = this.dotProduct(row, col, row, r);
                    let ix1 = this.lerp(n0, n1, zoom);
                    
                    value += this.lerp(ix0, ix1, zoom) * amplitude;
                    amplitude *= 0.15;
                }

                this.values[row].push(Math.abs(value));
            }
        }
        console.log(this.values);
    }

    applyWeight = (graph, ref) => {

        for (let row = 0; row < this.values.length ; row++) {
            for (let col = 0; col < this.values[0].length ; col++) {
                if (graph[row][col].isWall) continue;
                const cur = this.values[row][col];

                if (cur > 0 && cur <= 0.25){
                    graph[row][col].length = 10;
                    ref[row][col].current.div_ref.current.classList.add('light');
                }
                else if (cur > 0.25 && cur <= 0.50){
                    graph[row][col].length = 30;
                    ref[row][col].current.div_ref.current.classList.add('medium');
                }

                else if (cur > 0.50 && cur <= 0.75){
                    graph[row][col].length = 80;
                    ref[row][col].current.div_ref.current.classList.add('heavy');
                }
                else if (cur > 0.75){
                    graph[row][col].length = 100;
                    ref[row][col].current.div_ref.current.classList.add('insane');
                }
            }
        }
    }


    lerp = (a0, a1, w) => {
        return (1.0 - w)*a0 + w*a1;
    } 

    dotProduct = (y, x, y1, x1) => {
        const dx = this.gradient[y][x][0];
        const dy = this.gradient[y][x][1];
        
        return (dx*this.gradient[y1][x1][0] + dy*this.gradient[y1][x1][1]);
    }

}