function solution(price, money, count) {
    const dif = Array(count).fill(price).map((v,idx) => (idx+1)*v).reduce((acc,cur) => acc+cur, 0) - money;
    return dif < 0 ? 0 : dif;
}