#include <bits/stdc++.h>
using namespace std;
typedef pair<int, int> ii;

int row, col, num, cache[1009][1009];
vector<ii> pathA, pathB;
vector<int> v;

int getMaxDistance(int A, int B) {
	if (A == num || B == num) return 0;
	int& ret = cache[A][B];
	if (ret != -1) return ret;
	ret = 987654321;

	int maxLocation = max(A, B) + 1;
	int distA = abs(pathA[maxLocation].first - pathA[A].first) + abs(pathA[maxLocation].second - pathA[A].second);
	int distB = abs(pathB[maxLocation].first - pathB[B].first) + abs(pathB[maxLocation].second - pathB[B].second);

	int ret1 = getMaxDistance(maxLocation, B) + distA;
	int ret2 = getMaxDistance(A, maxLocation) + distB;

	return ret = min(ret1, ret2);
}
void reconstruct(int A, int B) {
	if (A == num || B == num) return;
	int maxLocation = max(A, B) + 1;
	int distA = abs(pathA[maxLocation].first - pathA[A].first) + abs(pathA[maxLocation].second - pathA[A].second);
	int distB = abs(pathB[maxLocation].first - pathB[B].first) + abs(pathB[maxLocation].second - pathB[B].second);

	int ret1 = getMaxDistance(maxLocation, B) + distA;
	int ret2 = getMaxDistance(A, maxLocation) + distB;

	if (ret1 > ret2) {
		cout << 2 << '\n';
		reconstruct(A, maxLocation);
	}
	else {
		cout << 1 << '\n';
		reconstruct(maxLocation, B);
	}
}

void solve() {
	cout << getMaxDistance(0, 0) << '\n';
	reconstruct(0, 0);
}
void solution() {
	cin >> row >> num;
	col = row;
	memset(cache, -1, sizeof(cache));
	
	pathA.push_back({ 1,1 });
	pathB.push_back({ row,row });

	for (int i = 0; i < num; i++) {
		int x, y;
		cin >> x >> y;
		pathA.push_back({ x,y });
		pathB.push_back({ x,y });
	}
	solve();
}

int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(NULL); cout.tie(NULL);
	//freopen("input.txt", "rt", stdin);
	solution();
	return 0;
}
