function solution(files) {
    let ans = files.map((file, index) => ({file, index}))
    const compare = (a,b) => {
        const reg = /(\D*)([0-9]*)/i;
        const A = a.match(reg);
        const B = b.match(reg);
        const compareHead = A[1].toLowerCase().localeCompare(B[1].toLowerCase());
        const compareNum = (a,b) => parseInt(a) > parseInt(b) ? 1 : parseInt(a) < parseInt(b) ? -1 : 0;
        return compareHead === 0 ? compareNum(A[2], B[2]) : compareHead
    }
    ans.sort((a,b) => {
        const result = compare(a.file,b.file);
        return result === 0 ? a.index - b.index : result;
    })
    return ans.map(a => a.file)
}