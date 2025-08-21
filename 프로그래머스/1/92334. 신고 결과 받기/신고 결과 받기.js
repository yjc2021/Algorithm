function solution(id_list, report, k) {
    const reportMap = {};
    const resultMap = {};
    
    for(const id of id_list) {
        reportMap[id] = new Set();
        resultMap[id] = 0;
    }
    
    for(const context of report) {
        const [userId, reportedId] = context.split(' ');
        reportMap[reportedId].add(userId);
    }
    
    Object.values(reportMap).filter(item => item.size >= k).forEach((ids) => {
        for (const id of ids) {
            resultMap[id] += 1;
        }
    });
    
    return Object.values(resultMap)
}