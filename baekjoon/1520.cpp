#include <bits/stdc++.h>
#define MAX 501


using namespace std;

int a[MAX][MAX], dp[MAX][MAX], n, m, ret;
bool visited[MAX][MAX];
int dx[4] = { -1, 1, 0, 0 }, dy[4] = {0,0,-1,1};

int dfs(int y, int x) {
	if (y == n-1 && x == m-1) {
		return 1;
	}

	if (visited[y][x]) {
		return dp[y][x];
	}
	visited[y][x] = 1;
	for (int i = 0; i < 4; i++) {
		int ny = y + dy[i];
		int nx = x + dx[i];
		if (ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
		if (a[y][x] > a[ny][nx] ) {
			dp[y][x] += dfs(ny, nx);
		}
	}
	return dp[y][x];
}


void solution() {
	cin >> n >> m;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			cin >> a[i][j];
		}
	}

	
	cout << dfs(0, 0) << '\n';
}
int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(NULL); cout.tie(NULL);
	freopen("input.txt", "rt", stdin);
	solution();
	return 0;
}
