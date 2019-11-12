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
            while( this.comparator(this.array[index], this.array[Math.floor(index/2)]) ){
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
        let ret = this.array.pop();
        let index = 1;
        this.sinkDown(index);
        return ret;
    }

    sinkDown(cur) {
        console.log('sinking');
        let smallest = cur;
        let left = 2 * cur;
        let right = 2 * cur + 1; 
        console.log(smallest, left, right);
        console.log(this.comparator(this.array[smallest], this.array[left]));
        if(left < this.array.length && this.comparator(this.array[left], this.array[smallest]) ) {
            smallest = left;
        }
        if(right < this.array.length && this.comparator(this.array[right], this.array[smallest]) ) {
            smallest = right;
        }
        if(smallest !== cur) {
            [this.array[cur], this.array[smallest]] = [this.array[smallest], this.array[cur]];
            console.log('hi');
            this.sinkDown(smallest);
        }
    }

    display = () => {
        console.log(this.array);
    }

    top = () => {
        return this.array[1];
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
    constructor(comparator) {
        this.heap = new MinHeap(comparator);
    }

    enqueue = (obj) => {
        this.heap.insert(obj);
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
}