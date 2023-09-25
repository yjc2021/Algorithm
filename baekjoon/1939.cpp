#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
using namespace std;

int n, m;
int a, b, c;
vector <pair<int, int>> vec[10001];
bool visited[10001];
int s, e;
int bfs(int cost) {
	queue <int> que;
	que.push(s);
	visited[s] = 1;

	while (!que.empty()) {

		int cur = que.front();
		que.pop();
		if (cur == e)
			return true;
		for (int i = 0; i < vec[cur].size(); i++) {
			int ncur = vec[cur][i].first;
			int ncos = vec[cur][i].second;

			if (!visited[ncur] && ncos >= cost) {
				visited[ncur] = 1;
				que.push(ncur);

			}

		}



	}

	return false;

}

int main() {
	ios_base::sync_with_stdio(0);
	cin.tie(0); cout.tie(0);

	cin >> n >> m;
	int from, to, cost;
	int maxcost = 0;
	for (int i = 0; i < m; i++) {
		cin >> from >> to >> cost;
		vec[from].push_back(make_pair(to, cost));
		vec[to].push_back(make_pair(from, cost));
		if (cost > maxcost)
			maxcost = cost;
	}
	
	cin >> s >> e;
	
	int low = 0, high = maxcost;
	while (low <= high) {
		
		memset(visited, 0, sizeof(visited));
		int mid = (low + high)/2;

		if (bfs(mid)) {
			low = mid  + 1;
		}
		else {
			high = mid  - 1;
		}
		
	}
	cout << high << endl;

	return 0;
}
