#include <bits/stdc++.h>
using namespace std;

int n, dp[1000001], before[1000001];

void solution() {
	cin >> n;
	before[1] = -1;

	for (int i = 2; i <= n; i++) {
		dp[i] = dp[i - 1] + 1;
		before[i] = i - 1;
		if (i % 3 == 0 && dp[i] > dp[i/3] + 1) {
			dp[i] = dp[i / 3] + 1;
			before[i] = i / 3;
		}
		if (i % 2 == 0 && dp[i] > dp[i/2] + 1) {
			dp[i] = dp[i / 2] + 1;
			before[i] = i / 2;
		}
	}
	cout << dp[n] << '\n';
	while (n != -1) {
		cout << n << " ";
		n = before[n];
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
