#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

// 2023-10-04
// 백준 3584 : 가장 가까운 공통 조상
// 공통 조상 찾기 문제
// n개의 노드 ( < 10,000)
// 1. 먼저 노드 하나에 대해서 root노드까지 탐색 (DFS?). visited처리
// 2. 나머지 노드에 대해서 visited값이 true인 노드를 발견할 때까지 탐색
// visited가 true인 노드가 공통 조상 노드이다

int n, a, b, t, u, v;

int parent[10001];
bool visited[10001];


void solution() {
    cin >> t;
    while (t--) {
        cin >> n;
        for (int i = 1; i <= n; i++) {
            parent[i] = -1;
            visited[i] = false;
        }
        for (int i = 0; i < n-1; i++) {
            cin >> a >> b;
            parent[b] = a;
        }
        cin >> u >> v;

        while (u != -1) {
            visited[u] = true;
            u = parent[u];
        }

        while (!visited[v]) {
            v = parent[v];
        }

        cout << v << '\n';
    }
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);
    //freopen("input.txt", "rt", stdin);
    solution();
    return 0;
}
