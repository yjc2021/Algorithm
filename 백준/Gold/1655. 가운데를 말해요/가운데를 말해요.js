const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
// 큰수그룹
class MinHeap {
  constructor() {
    this.values = [];
  }

  getLen() {
    return this.values.length;
  }

  enqueue(val) {
    this.values.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element >= parent) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftIdx = 2 * idx + 1;
      let rightIdx = 2 * idx + 2;
      let left, right;
      let swap = null;
      if (leftIdx < length) {
        left = this.values[leftIdx];
        if (left < element) {
          swap = leftIdx;
        }
      }
      if (rightIdx < length) {
        right = this.values[rightIdx];
        if (
          (swap === null && right < element) ||
          (swap !== null && right < left)
        ) {
          swap = rightIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

// 작은수그룹
class MaxHeap {
  constructor() {
    this.values = [];
  }

  getLen() {
    return this.values.length;
  }

  enqueue(val) {
    this.values.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element <= parent) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return max;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftIdx = 2 * idx + 1;
      let rightIdx = 2 * idx + 2;
      let left, right;
      let swap = null;
      if (leftIdx < length) {
        left = this.values[leftIdx];
        if (left > element) {
          swap = leftIdx;
        }
      }
      if (rightIdx < length) {
        right = this.values[rightIdx];
        if (
          (swap === null && right > element) ||
          (swap !== null && right > left)
        ) {
          swap = rightIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

rl.on("line", (line) => {
  input.push(+line);
}).on("close", () => {
  const N = input[0];
  const minHeap = new MinHeap();
  const maxHeap = new MaxHeap();
  const answer = [input[1]];
  maxHeap.enqueue(input[1]);
  for (let i = 2; i <= N; i++) {
    if (input[i] > maxHeap.values[0]) minHeap.enqueue(input[i]);
    else maxHeap.enqueue(input[i]);

    // 큰수그룹의 길이가 작은수그룹의 길이보다 커지면
    // 큰수그룹의 최솟값(최소힙의 루트)을 작은수그룹으로 보낸다 (중위값 변경)
    if (minHeap.getLen() > maxHeap.getLen()) {
      maxHeap.enqueue(minHeap.dequeue());
      // 작은수그룹의 길이가 큰수그룹의 길이보다 2개 많으면
      // 작은수그룹의 최댓값(최대힙의 루트, 현재중위값)을 큰수그룹으로 보낸다 (중위값 변경)
    } else if (minHeap.getLen() + 1 < maxHeap.getLen()) {
      minHeap.enqueue(maxHeap.dequeue());
    }
    answer.push(maxHeap.values[0]);
  }
  console.log(answer.join("\n"));
});