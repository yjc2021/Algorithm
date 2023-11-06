#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef pair<int, int> ii;
struct Cart {
	int to;
	int box;
};
int N, C, M;
int capacity[2001];
int res;
pair<ii, int> arr[10001];



bool comp(pair<ii, int> a, pair<ii, int> b) {
	if (a.first.second < b.first.second)
		return true;
	else if (a.first.second == b.first.second) {
		return a.first.first < b.first.first;
	}
	return false;
}
void solution() {
	cin >> N >> C;
	cin >> M;
	for (int i = 0; i < M; i++) {
		cin >> arr[i].first.first >> arr[i].first.second >> arr[i].second;
	}
	
	sort(arr, arr + M, comp);

	for (int i = 0; i < M; i++) {
		int boxCnt = 0;
		// from - to 구간에서 최대 적재량 
		for (int j = arr[i].first.first; j < arr[i].first.second; j++) {
			boxCnt = max(boxCnt, capacity[j]);
		}
		int leftSpace = min(arr[i].second, C - boxCnt);
		res += leftSpace;

		for (int j = arr[i].first.first; j < arr[i].first.second; j++) {
			capacity[j] += leftSpace;
		}
	}
	cout << res << '\n';
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(0);
	freopen("input.txt", "rt", stdin);
	solution();
	return 0;
}
