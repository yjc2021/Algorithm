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
        this.queue[this.l] = null;
        this.l+=1;
        return del;
    }
    size() {
        return this.r - this.l;
    }
}
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1]
function solution(maps) {
    const n = maps.length;
    const m = maps[0].length;
    let visited = Array.from(Array(n), () => Array(m).fill(0));
    
    const queue = new Queue();
    
    queue.enqueue([0,0]);
    visited[0][0] = 1;
    while(queue.size()) {
        const [y,x] = queue.dequeue();
        for(let i = 0; i < 4; i++) {
            let nx = x + dx[i];
            let ny = y + dy[i];
            if(ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
            if(visited[ny][nx]) continue;
            if(maps[ny][nx] === 0 ) continue;
            queue.enqueue([ny,nx]);
            visited[ny][nx] = visited[y][x] + 1;
        }
    }

   return (visited[n-1][m-1] ? visited[n-1][m-1] : -1);
    
    
}