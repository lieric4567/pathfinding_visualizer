import PriorityQueue from 'goog.structs'

class Algorithms {

    run_djikstra(graph, start, end) {
        const animate = [];
        const shortest_path = [];
        const queue = new PriorityQueue();
        console.log(graph[0]);
    }
}

class Animate {
    constructor (animate, shortest_path) {
        this.animate = animate;
        this.shortest_path = shortest_path;
    }
}

export {Algorithms, Animate};