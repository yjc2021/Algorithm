function solution(friends, gifts) {
    const len = friends.length;
    const nameMap = new Map();
    const giftTable = Array.from(Array(len), () => Array(len).fill(0));
    const giftRank = Array(len).fill(0);
    const nextMonth = Array(len).fill(0);
    
    friends.forEach((friend, idx) => nameMap.set(friend, idx));
    
    gifts.forEach(gift => {
        const [from, to] = gift.split(' ');
        giftTable[nameMap.get(from)][nameMap.get(to)] += 1;
    })
    
    for(let i = 0; i < len; i+=1) {
        giftRank[i] = giftTable[i].reduce((acc,cur) => acc + cur, 0);
        
        for(let j = 0; j < len; j+=1) {
            giftRank[i] -= giftTable[j][i];
        }
    }
    
    for(let i = 0; i < len; i+=1) {
        for(let j = i+1; j < len; j+=1) {
            if(i === j) continue;
            if(giftTable[i][j] < giftTable[j][i]) nextMonth[j] += 1;
            if(giftTable[i][j] > giftTable[j][i]) nextMonth[i] += 1;
            if(giftTable[i][j] === giftTable[j][i]) {
                if(giftRank[i] > giftRank[j]) nextMonth[i] += 1;
                if(giftRank[i] < giftRank[j]) nextMonth[j] += 1;
            }
        }
    }
    
    return Math.max(...nextMonth);
}