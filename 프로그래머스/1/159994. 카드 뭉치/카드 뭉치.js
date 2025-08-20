class Queue {
    constructor(array) {
        this.q = [...array];
        this.rear = array.length;
        this.front = 0;
    }
    push(v) {
        this.q[this.rear++] = v;
    }
    pop() {
        return this.q[this.front++]
    }
    top() {
        return this.q[this.front];
    }
    isEmpty() {
        return this.rear === this.front;
    }
}

function solution(cards1, cards2, goal) {
    const q1 = new Queue(cards1);
    const q2 = new Queue(cards2);
    const qGoal = new Queue(goal);

    while(!qGoal.isEmpty()) {
        const curGoal = qGoal.pop();
        
        if(q1.top() === curGoal) {
            q1.pop();
        }
        else if (q2.top() === curGoal) {
            q2.pop();
        } else {
            return "No";
        }
    }
    return "Yes"
}