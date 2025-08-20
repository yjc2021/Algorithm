function cmp(a, b, genrePlayMap) {
        const [idA, genreA, playsA] = a;
        const [idB, genreB, playsB] = b;
        
        if(genrePlayMap[genreA] !== genrePlayMap[genreB]) return genrePlayMap[genreB] - genrePlayMap[genreA];
        
        if(playsA !== playsB) return playsB - playsA;
        
        return idA - idB;
}

function solution(genres, plays) {
    const genrePlayMap = {};
    const songs = [];
    
    for(let i = 0; i < genres.length; i+=1) {
        genrePlayMap[genres[i]] = (genrePlayMap[genres[i]] || 0) + plays[i];
        songs.push([i, genres[i], plays[i]]);
    }
    
    const agg = {}
    for(const key in genrePlayMap) {
        if(agg[key]) continue;
        agg[key] = 2;
    }
    
    return songs.sort((a,b) => cmp(a,b,genrePlayMap)).filter(([id, genre, play]) => {
        if(agg[genre] > 0) {
            agg[genre] -= 1;
            return true;
        }
        return false;
    }).map(([id])=>id);
}