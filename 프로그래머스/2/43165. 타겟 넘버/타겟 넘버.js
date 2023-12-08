function solution(numbers, target) {
    const length = numbers.length;
    let ans = 0;
    
    function dfs(count, sum) {
        if(count === length) {
            if(sum === target) {
                ans+=1;
            }
            return;
        }
        dfs(count + 1, sum + numbers[count]);
        dfs(count + 1, sum - numbers[count]);
        
    }
    dfs(0, 0);
    return ans;
}