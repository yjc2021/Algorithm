// 2023-10-13
// 백준 17822
// 골드 2
// 시뮬레이션, 구현

#include <bits/stdc++.h>
using namespace std;
typedef pair<int, int> ii;

const int dx[] = { -1, 1, 0, 0 };
const int dy[] = { 0, 0, -1, 1 };
const int MAX = 50 + 1;
deque<int> dq[MAX];
bool visited[MAX][MAX];
int n, m, t;

void Rotate(int x, int d, int k) {
	for (int i = x; i <= n; i += x) {
		for (int j = 0; j < k; ++j) {
			if (d == 0) {
				dq[i].push_front(dq[i].back());
				dq[i].pop_back();
			}
			else {
				dq[i].push_back(dq[i].front());
				dq[i].pop_front();
			}
		}
	}
}

void Transform() {
	bool noAdj = true;
	memset(visited, false, sizeof(visited));
	for (int i = 1; i <= n; ++i) {
		for (int j = 0; j < m; ++j) {
			if (dq[i][j] != 0 && !visited[i][j]) {
				queue<pair<int, int>> q;
				q.push({ i, j });
				bool hasSame = false;
				int value = dq[i][j];
				while (!q.empty()) {
					int x = q.front().first;
					int y = q.front().second;
					q.pop();
					for (int i = 0; i < 4; ++i) {
						int nx = x + dx[i];
						int ny = y + dy[i];
						if ((1 <= nx && nx <= n) && (-1 <= ny && ny <= m)) {
							if (ny == -1)
								ny = m - 1;
							else if (ny == m)
								ny = 0;
							if (visited[nx][ny] || dq[nx][ny] != value)
								continue;
							hasSame = true;
							dq[nx][ny] = 0;
							visited[nx][ny] = true;
							q.push({ nx, ny });
						}
					}
				}
				if (hasSame) {
					noAdj = false;
					dq[i][j] = 0;
				}
			}
		}
	}
	if (noAdj) {
		double average = 0;
		int num = 0;
		for (int i = 1; i <= n; ++i)
			for (int j = 0; j < m; ++j) {
				average += dq[i][j];
				if (dq[i][j] != 0) num++;
			}
		if (num == 0) return;
		average /= num;
		for (int i = 1; i <= n; ++i) {
			for (int j = 0; j < m; ++j) {
				if (dq[i][j] == 0) continue;
				if ((double)dq[i][j] > average)
					dq[i][j]--;
				else if ((double)dq[i][j] < average)
					dq[i][j]++;
			}
		}
	}
}

void solution() {
	cin >> n >> m >> t;
	for (int i = 1; i <= n; ++i) {
		dq[i].resize(m);
		for (int j = 0; j < m; ++j) {
			int x;
			cin >> x;
			dq[i][j] = x;
		}
	}
	while (t--) {
		int x, d, k;
		cin >> x >> d >> k;
		Rotate(x, d, k);
		Transform();
	}
	int ans = 0;
	for (int i = 1; i <= n; i++) {
		for (int j = 0; j < m; j++)
			ans += dq[i][j];
	}

	cout << ans << '\n';
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(0);
	freopen("input.txt", "rt", stdin);
	solution();
	return 0;
}
