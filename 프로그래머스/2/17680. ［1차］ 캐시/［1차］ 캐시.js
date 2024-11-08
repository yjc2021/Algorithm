function solution(cacheSize, cities) {
    let ans = 0;
    let cache = [];
    
    for(city of cities) {
        city = city.toLowerCase();
        const idx = cache.findIndex(v=>v===city)
        if(idx !== -1) {
            cache = [...cache.slice(0,idx), ...cache.slice(idx+1), city];
            ans+=1;
        } 
        else {
            cache.push(city);
            if(cache.length > cacheSize) {
                cache = [...cache.slice(1)]
            }
            ans+=5;
        }
    }
    return ans;
}