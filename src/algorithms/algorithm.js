import {PriorityQueue} from './structs';
import GLOBAL from '../App';
export {Algorithms, Animate, Heuristic};

class Algorithms {

    run_djikstra(graph, start, end) { 
        const visited = [];
        let shortest = null; 
        const q = new PriorityQueue();
        start.distance = 0;
        
        start.visited = true;
        q.enqueue(start, start.distance);
        while(!q.isEmpty()) {
            const node = q.dequeue();
            visited.push(node);
            if (node === end) {
                shortest = back_trace(node); 
                break;
            }

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
        
        return new Animate(visited, shortest);
    }

    aStar = (graph, start, end, heuristic) => {
        /* Runs A* with the provided heuristic funtion */
        const q = new PriorityQueue();
        const visited = [];
        let shortest = null;
        start.distance = 0 + heuristic(start, end);
        start.visited = true;
        q.enqueue(start, start.distance);

        while(!q.isEmpty()) {
            const node = q.dequeue();
            if(node === end) {
                shortest = back_trace(node);
                break;
            }
            visited.push(node);
            
            const neighbors = get_neighbor(graph, node);
            for(const neighbor of neighbors) {
                const dist = node.distance + neighbor.length + heuristic(neighbor, end);
                if (dist < neighbor.distance) {
                    neighbor.distance = dist;
                    neighbor.prev = node;
                    neighbor.visited = true;
                    q.enqueue(neighbor, neighbor.distance);
                }
            }
        }

        return new Animate(visited, shortest);
    };
}

class Animate {
    constructor (visited , shortest_path) {
        this.visited = visited;
        this.shortest_path = shortest_path;
    }

    animate = (ref)=> {
        if(this.shortest_path != null) {
            this.animate_shortest(ref); 
        }
    };

    animate_visited = (visisted, ref)=> {
        
    };

    animate_shortest = (ref) => {
        for (const node of this.shortest_path) {
            const {x, y} = node;
            ref[y][x].current.div_ref.current.classList.toggle('path');
        }
    };
}

class Heuristic {
    
    euclidian = (start, end) => {
        return Math.sqrt( ( Math.pow((end.x - start.x), 2) + Math.pow((end.y - start.y), 2) ) );
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