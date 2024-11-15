const dd = {
    U: [0,1],
    D: [0,-1],
    R: [1,0],
    L: [-1,0]
}

function solution(dirs) {
    let pos = [0,0];
    const visited = new Set();
    for(dir of dirs) {
        const [nx,ny] = [pos[0] + dd[dir][0], pos[1] + dd[dir][1]];
        if(isInvalidPos(nx,ny)) continue;
        visited.add(`${nx}${ny}${pos[0]}${pos[1]}`);
        visited.add(`${pos[0]}${pos[1]}${nx}${ny}`);
        pos = [nx,ny]
    }
    
    return visited.size/2;
}

function isInvalidPos(x,y) {
    return x < -5 || y < -5 || x > 5 || y > 5
}