class Queue {
    constructor() {
        this.queue = [];
        this.l = 0;
        this.r = 0;
    }
    enqueue(v) {
        this.queue[this.r] = v;
        this.r+=1;
    }
    dequeue() {
        const del = this.queue[this.l];
        this.l+=1;
        return del;
    }
    size() {
        return this.r - this.l;
    }
}

function solution(n, edge) {
    const _graph = Array.from(Array(n+1), () => []);
    
    edge.forEach(([a, b]) => {
        _graph[a].push(b);
        _graph[b].push(a);
    })
        
    const visited = Array(n+1).fill(0);
    
    const queue = new Queue();
    
    queue.enqueue(1);
    visited[1] = 1;
    while(queue.size()) {
        const entry = queue.dequeue();
        
        
        _graph[entry].forEach(i => {
            if(visited[i]) return;
            visited[i] = visited[entry] + 1;
            queue.enqueue(i);
        })
    }
    
    const max = Math.max(...visited);
    return visited.filter(i => i === max).length;
    
}