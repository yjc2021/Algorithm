class Queue {
    constructor(){
        this.q = [];
        this.front = 0;
        this.rear = 0;
    }
    size() {
        return this.rear - this.front;
    }
    enqueue(value) {
        this.q[this.rear] = value;
        this.rear+=1;
    }
    dequeue() {
        const del = this.q[this.front];
        delete this.q[this.front++];
        return del;
    }
}
function isValidPos(y, x, board) {
    if(y < 0 || x < 0 || y >= board.length || x >= board[0].length || board[y][x] === 'D' ) return false;
    return true;
}
function solution(board) {
    const dir = [[-1,0], [1,0], [0,-1], [0,1]]
    let robot, goal;
    const visited = Array.from(Array(board.length), () => Array(board[0].length).fill(0));
    
    for(let i = 0; i < board.length; i+=1) {
        for(let j = 0; j < board[0].length; j+=1) {
            if(board[i][j] === 'R') {
                robot = [i,j];
            } else if (board[i][j] === 'G') {
                goal = [i,j];
            }
        }
    }
    
    const q = new Queue();
    q.enqueue(robot);
    visited[robot[0]][robot[1]] = 1;
    
    while(q.size()) {
        const [cy,cx] = q.dequeue();
        for(const [yy, xx] of dir) {
            let [ny,nx] = [cy+yy, cx+xx];
            while(isValidPos(ny,nx,board)) {
                ny += yy;
                nx += xx;
            }
            if(visited[ny-yy][nx-xx]) continue;
            q.enqueue([ny-yy, nx-xx]);
            visited[ny-yy][nx-xx] = visited[cy][cx] + 1;
        }
    }
    const count = visited[goal[0]][goal[1]];
    return count ? count-1 : -1;
    
}