class PriorityQueue {
    constructor(comparerFn) {
        this.heap = [];
    }
    
    size() {
        return this.heap.length;
    }
    
    enqueue(item) {
        this.heap.push(item);
        this.heapifyUp();
    }
    dequeue() {
        const max = this.heap[0];
        const end = this.heap.pop();
        if(this.heap.length > 0) {
            this.heap[0] = end;
            this.heapifyDown();
        }
        return max;
    }
    heapifyUp() {
        let index = this.heap.length-1;
        const element = this.heap[index];

        while(index > 0) {
            const parentIndex = Math.floor((index-1)/2);
            const parent = this.heap[parentIndex];
            if (parent[1] <= element[1]) break;
            
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }
    heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[index];
        while(true) {
            const leftChildIndex = index*2+1;
            const rightChildIndex = index*2 + 2;
            let leftChild, rightChild;
            let swap = null;
            
            if(leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if(leftChild[1] < element[1]) {
                    swap = leftChildIndex;
                }
            }
            
            if(rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if((swap === null && rightChild[1] < element[1]) || 
                   (swap !== null && rightChild[1] < leftChild[1])
                ) {
                    swap = rightChildIndex;
                }
            }
            if(swap === null) {
                break;
            }
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}

function solution(jobs) {
    const count = jobs.length;
    const heap = new PriorityQueue()
    jobs.sort((a,b) => a[0] - b[0]);
    
    let time = 0;
    let complete = 0;
    let total = 0;
    
    while(jobs.length || heap.size()) {
        while(jobs.length) {
            if(jobs[0][0] === time) {
                heap.enqueue(jobs.shift());
            } else break;
        }
        if(heap.size() && time >= complete) {
            const task = heap.dequeue();
            console.log(task[0], task[1])
            complete = task[1] + time;
            total += complete - task[0];
        }
        time+=1;
    }
    return Math.floor(total/count)
}