import {PriorityQueue} from './structs';
import GLOBAL from '../App';
export {Algorithms, Animate};

class Algorithms {

    run_djikstra(graph, start, end) { 
        const visited = [];
        const q = new PriorityQueue();
        start.distance = 0;
        
        start.visited = true;
        q.enqueue(start, start.distance);
        while(!q.isEmpty()) {
            const node = q.dequeue();
            if (node === end) return back_trace(node); 

            let neighbors = get_neighbor(graph, node);
            for (const neighbor of neighbors) {
                const dist = node.distance + neighbor.length;
                if (dist < neighbor.distance) {
                    neighbor.distance = dist;
                    neighbor.prev = node;
                    neighbor.visited = true;
                    q.enqueue(neighbor, neighbor.distance);
                }
            }
        }
        q.display();
    }
}

class Animate {
    constructor (animate, shortest_path) {
        this.animate = animate;
        this.shortest_path = shortest_path;
    }
}

const get_neighbor = (graph, node) => {
    const {x, y} = node;
    const neighbors = [];
    if (y > 0) neighbors.push(graph[y - 1][x]);
    if (y < graph.length - 1) neighbors.push(graph[y + 1][x]);
    if (x > 0) neighbors.push(graph[y][x - 1]);
    if (x < graph[0].length - 1) neighbors.push(graph[y][x + 1]);

    return neighbors.filter(neighbor => !neighbor.visited && !neighbor.isWall);
};

const back_trace = (node) => {
    const shortest_path = []
    let cur = node;
    while (cur != null) {
        shortest_path.push(cur);
        cur = cur.prev;
    }  
    
    return shortest_path.reverse();
};