function solution(picks, minerals) {
    const pickNum = picks.reduce((acc,cur) => acc + cur, 0);
    const pickableMinerals = minerals.slice(0,pickNum*5);
    
    const mineralsPerPick = pickableMinerals.reduce((acc,cur,idx) => {
        const index = Math.floor(idx/5)
        if(!acc[index]) acc[index] = [0,0,0];
        if(cur==='diamond') 
            acc[index][0]+=1;
        else if (cur === 'iron')
            acc[index][1]+=1;
        else 
            acc[index][2]+=1;
        return acc;
    }, [])
    
    mineralsPerPick.sort((a,b) => b[0]-a[0] || b[1]-a[1]);
    
    let stress = 0;
    for(const [d,i,s] of mineralsPerPick) {
        if(picks[0]) {
            stress += d*1 + i*1 + s*1;
            picks[0]-=1;
        } else if (picks[1]) {
            stress += d*5 + i*1 + s*1;
            picks[1]-=1;
        } else {
            stress += d*25 + i*5 + s*1;
            picks[2] -=1;
        }
    }
    return stress;
}