#include <bits/stdc++.h>
using namespace std;

int dp[1001], before[1001], n, a[1001], ret = 1, idx;

void go(int idx) {
	if (idx == -1) return;
	go(before[idx]);
	cout << a[idx] << " ";
	return;
}
void solution() {
	cin >> n;
	for (int i = 0; i < n; i++)
		cin >> a[i];
	fill(before, before + 1001, -1);
	fill(dp, dp + 1001, 1);

	for (int i = 0; i < n; i++) {
		for (int j = 0; j < i; j++) {
			if (a[j] < a[i] && dp[i] < dp[j] + 1) {
				dp[i] = dp[j] + 1;
				before[i] = j;
				if (ret < dp[i]) {
					ret = dp[i];
					idx = i;
				}
			}
		}
	}
	cout << ret << '\n';
	go(idx);
}
int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(NULL); cout.tie(NULL);
	freopen("input.txt", "rt", stdin);
	solution();
	return 0;
}
