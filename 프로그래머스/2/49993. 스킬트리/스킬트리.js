function solution(skill, skill_trees) {
    let ans = 0;
    skill_trees.forEach((entry, idx) => {
        const tmp = [];
        for(c of entry) if(isTarget(c,skill)) tmp.push(c)
        if(tmp.length === 0){ans += 1; return;}
        if(tmp[0] !== skill[0]) return
        if(skill.includes(tmp.join(''))) ans+=1;
    })
    return ans
}
function isTarget(c,skill) {
    return skill.includes(c)
}