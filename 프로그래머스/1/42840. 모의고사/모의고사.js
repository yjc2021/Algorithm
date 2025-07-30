function countCorrect(pattern, answers) {
    let current = 0;
    let correctCount = 0;
    for(let i = 0; i < answers.length; i+=1) {
        if(answers[i] === pattern[current]) correctCount += 1;
        
        current = (current+1) % pattern.length;
    }
    return correctCount;
}

function solution(answers) {
    const patterns = [[1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
    ];
    
    
    
    const correctCounts = patterns.map(pattern => {
        return countCorrect(pattern, answers);
    });
    const ret = [];
    const maxCorrect = Math.max(...correctCounts)
    
    correctCounts.forEach((count, index) => {
        if(count === maxCorrect) ret.push(index+1);
    })
    
    return ret;
}