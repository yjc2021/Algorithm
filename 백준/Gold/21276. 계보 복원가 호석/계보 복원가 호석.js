class Queue {
  constructor() {
    this.q = [];
    this.h = 0;
    this.t = 0;
  }
  size() {
    return this.t - this.h;
  }
  push(item) {
    this.q[this.t++] = item;
  }
  pop() {
    const del = this.q[this.h];
    delete this.q[this.h++];
    return del;
  }
  map(fn) {
    return this.q.map(fn);
  }
}

const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const n = Number(input[0]);
const people = input[1].split(' ').sort();
const nameTable = new Map(people.map((v,idx) => [v, idx]));
const children = Array.from({length: n}, () => []);
const m = Number(input[2]);
const adj = Array.from({length: n}, () => []);
const deg = Array(n).fill(0);
input.slice(3, 3+m).forEach(line => {
  const [u,v] = line.split(' ').map(v => nameTable.get(v))
  adj[v].push(u);
  deg[u]+=1;
})

const q = new Queue();
for(let i = 0; i < n; i+=1) {
  if(deg[i] !== 0) continue;
  q.push(i);
}
for(let i = 0; i<n; i+=1) {
  adj[i].sort((a,b) => people[a] > people[b] ? 1 : -1);
  for(next of adj[i]) {
    if(deg[next] - deg[i] === 1) children[i].push(next);
  }
}
console.log(q.size());
console.log(q.map(v => people[v]).sort().join(' '));

children.forEach((v, idx) =>{
  let str = `${people[idx]} ${v.length}`
  for(ch of v) {
    str += ` ${people[ch]}`
  }
  console.log(str);
})