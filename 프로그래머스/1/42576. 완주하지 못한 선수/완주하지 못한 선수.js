function solution(participant, completion) {
    const completionMap = {};
    for (const item of completion) {
        if(!completionMap[item])
            completionMap[item] = 1;
        else 
            completionMap[item] += 1;
    }
    
    for(const item of participant) {
        if(completionMap[item]) 
            completionMap[item]-=1;
        else 
            return item;
    }
    
    for(item in completionMap){
        if(completionMap[item]) return item;
    }
}