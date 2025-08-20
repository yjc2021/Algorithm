function solution(progresses, speeds) {
    const daysLeft = progresses.map((progress, i) => Math.ceil((100 - progress) / speeds[i]));
    let count = 0;
    let maxDay = daysLeft[0];
    const answer = [];
    
    for(const currentDay of daysLeft) {
        if(currentDay <= maxDay) count+=1;
        else {
            answer.push(count);
            count = 1;
            maxDay = currentDay;
        }
    }
    answer.push(count);
    return answer;
}