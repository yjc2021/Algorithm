function solution(fees, records) {
    const cars = new Map();
    const totalTime = new Map();
    const [baseTime, baseFee, plusTime, plusFee] = fees;
    const ans = [];
    records.forEach((record, idx) => {
        const [time, carId, state] = record.split(' ');
        if(state === 'IN') {
            cars.set(carId, timeToMin(time));
        } else if (state === 'OUT') {
            let dif = timeToMin(time) - cars.get(carId);
            dif += totalTime.get(carId) ? totalTime.get(carId) : 0;
            totalTime.set(carId, dif);
            cars.delete(carId);
        }
    })
    if(cars.size) {
        for([carId, time] of cars) {
            let dif = timeToMin('23:59') - cars.get(carId);
            dif += totalTime.get(carId) ? totalTime.get(carId) : 0;
            totalTime.set(carId, dif);
        }
    }
    for([carId, time] of totalTime.entries()) {
        ans.push([carId, getFee(time, baseTime, baseFee, plusTime, plusFee)])
    }
    return ans.sort((a,b) => a[0] - b[0]).map(v => v[1]).flatMap(x=>x)
}

function timeToMin(time) {
    const [hh,mm] = time.split(':').map(Number);
    return hh*60 + mm;
}
function getFee(time, baseTime, baseFee, plusTime, plusFee) {
    let fee = baseFee;
    if(time <= baseTime) return fee;
    fee += Math.ceil((time - baseTime)/plusTime)*plusFee;
    return fee;
}