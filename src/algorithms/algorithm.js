import {PriorityQueue} from './structs';
export {Algorithms, Animate, Heuristic};

class Algorithms {

    run_djikstra(graph, start, end) { 
        const visited = [];
        let shortest = null; 
        const q = new PriorityQueue();
        start.distance = 0;

        q.enqueue(start, start.distance);
        while(!q.isEmpty()) {
            const node = q.dequeue();
            if (node.isWall) break;

            start.visited = true;
            visited.push(node);
            if (node === end) {
                shortest = back_trace(node); 
                break;
            }

            let neighbors = get_neighbor(graph, node);
            for (const neighbor of neighbors) {
                console.log(neighbor.length);
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
        q.enqueue(start, heuristic(start, end));

        while(!q.isEmpty()) {
            const node = q.dequeue();

            if (node.isWall) break;
            start.visited = true;
            visited.push(node);

            if(node === end) {
                shortest = back_trace(node);
                break;
            }
            
            const neighbors = get_neighbor(graph, node);
            for(const neighbor of neighbors) {
                const dist = node.distance + neighbor.length + heuristic(neighbor, end);
                if (dist < neighbor.distance) {
                    neighbor.distance = dist;
                    neighbor.prev = node;
                    neighbor.visited = true;
                    q.enqueue(neighbor, heuristic(neighbor, end) + neighbor.length);
                }
            }
        }

        return new Animate(visited, shortest);
    };
}

class Animate {
    constructor (visited , shortest_path) {
        this.visited = visited;
        this.shortest = shortest_path;
    }

    animate = (ref)=> {
        console.log(this.visited, this.shortest);
        window.GLOBAL.animate = true;
        this.animate_visited(ref);
    };

    animate_visited = (ref)=> {
        let iter = 1;
        for (const node of this.visited) {
            const {x, y} = node;
            setTimeout((ref) => {
                console.log('animating')
                ref.current.div_ref.current.classList.add('visited');
            }, 5 * iter, ref[y][x]);
            iter++;
        }  
        console.log(iter);
        setTimeout((ref, func) => {
            func(ref);
        }, (5 * iter), ref, this.animate_shortest);
    };

    animate_shortest = (ref) => {
        console.log('shortest')
        if(this.shortest == null) {
            return; 
        }
        let iter = 1;
        for (const node of this.shortest) {
            const {x, y} = node;
            setTimeout((ref) => {
                ref.current.div_ref.current.classList.add('path');
            }, 15 * iter, ref[y][x]);
            iter++;
        }
        
        setTimeout(() => {
            window.GLOBAL.animate = false;
            window.GLOBAL.animated = true;
        }, 15 * iter);
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