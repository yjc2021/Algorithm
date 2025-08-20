function solution(want, number, discount) {
    const n = discount.length;
    const saleMap = [...new Array(n)].fill({});
    saleMap[n-1][discount[n-1]] = 1;
    
    for(let i = n-2; i >= 0; i-=1) {
        saleMap[i] = {...saleMap[i+1]};
        if(i + 10 <= n-1) saleMap[i][discount[i+10]] -= 1;
        if(saleMap[i][discount[i]]) saleMap[i][discount[i]] += 1;
        else saleMap[i][discount[i]] = 1;
    }
    
    const filtered = saleMap.filter((sales, index) => {
        for(let i = 0; i < want.length; i+=1) {
            if(!sales[want[i]]) return false;
            if(sales[want[i]] < number[i]) return false;
        }
        return true;
    })
        
    return filtered.length;
    
}