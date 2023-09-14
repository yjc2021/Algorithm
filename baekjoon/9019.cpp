#include <bits/stdc++.h>
using namespace std;
typedef pair<int, int> ii;

int t, a, b;
bool visited[10001];
struct node {
	int n;
	string c;
};
string bfs() {
	queue<node> q;
	q.push({ a, "" });
	visited[a] = true;
	

	while (!q.empty()) {
		int n = q.front().n;
		string nc = q.front().c;
		q.pop();

		int nn;
		if (n == b) return nc;


		for (int i = 0; i < 4; i++) {
			switch (i) {
			case 0:
				nn = 2 * n;
				if (nn > 9999) {
					nn = nn % 10000;
				}
				if (!visited[nn]) {
					visited[nn] = true;
					q.push({ nn, nc + "D" });
				}
				break;
			case 1:
				nn = n - 1;
				if (nn == -1) {
					nn = 9999;
				}
				if (!visited[nn]) {
					visited[nn] = true;
					q.push({ nn, nc + "S" });
				}
				break;
			case 2:
				nn = (n % 1000) * 10 + n / 1000;
				if (!visited[nn]) {
					visited[nn] = true;
					q.push({ nn, nc + "L" });
				}
				break;
			case 3:
				nn = (n % 10) * 1000 + n / 10;
				if (!visited[nn]) {
					visited[nn] = true;
					q.push({ nn, nc + "R" });
				}
				break;
			default:
				break;
			}
		}
	}
}
void solution() {
	cin >> t;
	while(t--) {
		cin >> a >> b;
		fill(visited, visited + 10001, false);
		cout << bfs() << '\n';
	}
}

int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(NULL); cout.tie(NULL);
	freopen("input.txt", "rt", stdin);
	solution();
	return 0;
}
