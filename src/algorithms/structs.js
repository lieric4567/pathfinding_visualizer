export {PriorityQueue};

class MinHeap {
    /*
    This is a min-heap implementation using an array.
    The constructor has 1 argument which is a comparator function.
    The comparator defaults to integer comparison if no comparator
    is supplied.
    left child's index: 2 * i
    right child's index: 2 * i + 1    
    */
    constructor(comparator=null) {
        if(comparator) {
            this.comparator = comparator;
        }
        this.array = [null];
    }

    insert = (obj) => {
        this.array.push(obj);
        if(this.array.length > 2) {
            let index = this.array.length - 1;
            while( this.comparator(this.array[index].priority, this.array[Math.floor(index/2)].priority) ){
                //swap
                if(index >= 1) {
                    [this.array[index], this.array[Math.floor(index/2)]] = [this.array[Math.floor(index/2)], this.array[index]];
                    if (Math.floor(index/2) > 1){ 
                        index = Math.floor(index/2);
                    }
                    else {
                        break;  
                    } 
                }
            }
        }
    }

    popMin = () => {
        //delete min
        //first swap root and last node.
        [this.array[1], this.array[this.array.length - 1]] = [this.array[this.array.length - 1], this.array[1]];
        let ret = this.array.pop().obj;
        let index = 1;
        this.sinkDown(index);
        return ret;
    }

    sinkDown(cur) {
        let smallest = cur;
        let left = 2 * cur;
        let right = 2 * cur + 1; 
        if(left < this.array.length && this.comparator(this.array[left].priority, this.array[smallest].priority) ) {
            smallest = left;
        }
        if(right < this.array.length && this.comparator(this.array[right].priority, this.array[smallest].priority) ) {
            smallest = right;
        }
        if(smallest !== cur) {
            [this.array[cur], this.array[smallest]] = [this.array[smallest], this.array[cur]];
            this.sinkDown(smallest);
        }
    }

    display = () => {
        console.log(this.array);
    }

    top = () => {
        return this.array[1].obj;
    }

    isEmpty = () => {
        return this.array.length === 1;
    }

    comparator = (num1, num2) => {
        return num1 <= num2;
    }

    length = () => {
        return this.array.length - 1; 
    }
}

class PriorityQueue {
    constructor() {
        this.heap = new MinHeap();
    }

    enqueue = (obj, priority) => {

        this.heap.insert({obj: obj, priority: priority});
    }

    dequeue = (obj) => {
        return this.heap.popMin();
    }

    isEmpty = (obj) => {
        return this.heap.isEmpty();
    }

    size = () => {
        return this.heap.length();
    }

    front = () => {
        return this.heap.top();
    }

    display = () => {
        this.heap.display();
    }
}