function timeToMin(time) {
  const [hh, mm] = time.split(':').map(Number);
  return hh * 60 + mm;
}

function solution(plans) {
  const answer = [];
  const stack = [];

  const sortedPlans = plans
    .map(([subject, time, playTime]) => [subject, timeToMin(time), Number(playTime)])
    .sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < sortedPlans.length - 1; i++) {
    const [subject, time, playTime] = sortedPlans[i];

    if (time + playTime <= sortedPlans[i + 1][1]) {
      answer.push(subject);
      let availableTime = sortedPlans[i + 1][1] - time - playTime;

      while (stack.length) {
        const [stackedSubject, stackedPlayTime] = stack.pop();
        if (stackedPlayTime <= availableTime) {
          availableTime -= stackedPlayTime;
          answer.push(stackedSubject);
        } else {
          stack.push([stackedSubject, stackedPlayTime - availableTime]);
          break;
        }
      }
    } else {
      stack.push([subject, playTime - (sortedPlans[i + 1][1] - time)]);
    }
  }
  answer.push(sortedPlans[sortedPlans.length - 1][0]);

  while (stack.length) {
    answer.push(stack.pop()[0]);
  }
  return answer;
}