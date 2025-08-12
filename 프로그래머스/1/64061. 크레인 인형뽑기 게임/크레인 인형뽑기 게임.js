function solution(board, moves) {
    let answer = 0;
    const n = board.length;
    const boardStack = Array.from({length: n}, () => []);
    const basket = [];
    
    for(let i = 0; i < n; i+=1) {
        for(let j = n-1; j >= 0; j-=1) {
            if(board[j][i] === 0) continue;
            boardStack[i].push(board[j][i])
        }
    }
    
    for(const col of moves) {
        if(boardStack[col-1].length === 0) continue;
        const top = boardStack[col-1].pop()
        if(basket.length && basket[basket.length - 1] === top) {
            basket.pop();
            answer += 2;
        } else {
            basket.push(top);
        }
    }
    
    return answer;
}