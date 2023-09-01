#include <bits/stdc++.h>
#define INF 1e9 
#define MAX 501  
using namespace std;

int n, m;
vector<pair<int, pair<int, int>>> edges;
long long d[MAX];

bool bellmanFord(int start) {
	d[start] = 0;

	for (int i = 1; i <= n; i++) {
		for (int j = 0; j < m; j++) {
			int from = edges[j].first;
			int to = edges[j].second.first;
			int cost = edges[j].second.second;

			if (d[from] == INF) continue;

			if (d[to] > d[from] + cost) {
				d[to] = d[from] + cost;

				if (i == n) return true;
			}
		}
	}

	return false;
}

void solution() {
	cin >> n >> m;
	for (int i = 0; i < m; i++) {
		int a, b, c;
		cin >> a >> b >> c;
		edges.push_back({ a, {b, c} });
	}

	fill_n(d, MAX, INF);

	bool negativeCycle = bellmanFord(1);

	if (negativeCycle) {
		cout << "-1\n";
		return;
	}

	for (int i = 2; i <= n; i++) {
		if (d[i] == INF) {
			cout << "-1\n";
		}
		else {
			cout << d[i] << "\n";
		}
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
