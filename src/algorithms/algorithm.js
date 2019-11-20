import {PriorityQueue} from './structs';
export {Algorithms, Animate, Heuristic};

class Algorithms {

    run = (graph, start, end, h, algo) => {
        if (algo === 1) {
            return this.run_djikstra(graph, start, end);
        }
        if (algo === 2) {
            return this.aStar(graph, start, end, h);
        }
        if (algo === 3) {
            return this.BreadthFirst(graph, start, end);
        }
        if (algo === 4) {
            //Depth fist search
            return this.depthFirst(graph, start, end);
        }
        else {
            //default to djikstra
            return this.run_djikstra(graph, start, end);
        }
    }

    run_djikstra(graph, start, end) { 
        console.log('running djikstra');
        const visited = [];
        let shortest = null; 
        const q = new PriorityQueue();
        start.distance = 0;

        q.enqueue(start, start.distance);
        while(!q.isEmpty()) {
            const node = q.dequeue();
            if (node.isWall) break;

            node.visited = true;
            visited.push(node);

            let neighbors = get_neighbor(graph, node);
            for (const neighbor of neighbors) {
                const dist = node.distance + neighbor.length;
                if (dist < neighbor.distance) {
                    neighbor.distance = dist;
                    neighbor.prev = node;
                    if(neighbor === end) console.log(neighbor);
                    neighbor.visited = true;
                    q.enqueue(neighbor, neighbor.distance);
                }
            }
        }

        shortest = back_trace(end); 
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
            node.visited = true;
            visited.push(node);

            if(node === end) {
                shortest = back_trace(node);
                break;
            }
            
            const neighbors = get_neighbor(graph, node);
            for(const neighbor of neighbors) {
                const dist = node.distance + neighbor.length;
                if (dist < neighbor.distance) {
                    neighbor.distance = dist;
                    neighbor.fScore = dist + heuristic(neighbor, end);
                    neighbor.prev = node;
                    neighbor.visited = true;
                    q.enqueue(neighbor, neighbor.fScore);
                }
            }
        }

        return new Animate(visited, shortest);
    };

    BreadthFirst = (graph, start, end) => {
        const q = new PriorityQueue();
        const visited = [];
        let shortest = null;
        let iter = 1;
        
        q.enqueue(start, iter); iter++;
        
        while(!q.isEmpty()) {
            const cur = q.dequeue();

            if(cur.isWall) break;
            cur.visited = true;
            visited.push(cur);

            const neighbors = get_neighbor(graph, cur);
            
            for (const neighbor of neighbors) {
                neighbor.prev = cur;
                neighbor.visited = true;
                visited.push(neighbor);
                q.enqueue(neighbor, iter); iter++;
            }
        }

        shortest = back_trace(end);
        return new Animate(visited, shortest);
    }; 

    depthFirst = (graph, start, end) => {
        const visited = [];
        let shortest = null; 
        const stack = [];
        stack.push(start);

        while(stack.length > 0) {
            let cur = stack.pop();

            if(cur.isWall) break;

            if(cur === end) shortest = back_trace(cur);

            if(!cur.visited) {
                cur.visited = true;
                visited.push(cur);
                const neighbors = get_neighbor(graph, cur);
                for(const neighbor of neighbors) {
                    neighbor.prev = cur;
                    stack.push(neighbor);
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
        window.GLOBAL.animate = true;
        this.animate_visited(ref);
    };

    animate_visited = (ref)=> {
        let iter = 1;
        for (const node of this.visited) {
            const {x, y} = node;
            setTimeout((ref) => {
                ref.current.div_ref.current.classList.add('visited');
            }, 7 * iter, ref[y][x]);
            iter++;
        }  
        setTimeout((ref, func) => {
            func(ref);
        }, (7 * iter), ref, this.animate_shortest);
    };

    animate_shortest = (ref) => {
        if(this.shortest == null) {
            window.GLOBAL.animate = false;
            window.GLOBAL.animated = true;
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
        const x = end.x - start.x;
        const y = end.y - start.y;

        return Math.sqrt( (x*x + y*y) );
    }

    manhattan = (start, end) => {
        const x = Math.abs(end.x - start.x);
        const y = Math.abs(end.y - start.y);
        return  x + y;
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
    if(node.isWall) return null;
    let cost = 0;
    const shortest_path = []
    let cur = node;
    while (cur != null) {
        cost += cur.length;
        shortest_path.push(cur);
        cur = cur.prev;
    }  
    console.log(cost);

    return shortest_path.length === 0 ? null: shortest_path.reverse();
};