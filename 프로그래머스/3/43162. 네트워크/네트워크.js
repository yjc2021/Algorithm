// function dfs(n, computers, visited, start) {
//     const stack = [start];
    
//     while(stack.length) {
//         const cur = stack.pop();
        
//         visited[cur] = true;
        
//         for(let i = 0; i < n; i+=1) {
//             if(!visited[i] && computers[cur][i]) 
//                 stack.push(i);
//         }
//     }
// }



function solution(n, computers) {
    let answer = 0;
    const visited = new Array(n).fill(false);
    
    function dfs(idx) {
        visited[idx] = 1;
        
        for(let i = 0; i < computers[idx].length; i+=1) {
            if(!visited[i] && computers[idx][i]) {
                dfs(i);
            }
        }
    }
    
    for (let i = 0; i < n; i+=1) {
        if(!visited[i]) {
            dfs(i);
            answer += 1;
        }
    }
    return answer;
}