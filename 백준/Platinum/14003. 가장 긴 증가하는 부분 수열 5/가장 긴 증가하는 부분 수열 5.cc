#include <bits/stdc++.h>
using namespace std;

int n, lis[1000001], a[1000001], _index[1000001], ans[1000001],idx;

void solution() {
	cin >> n;
	for (int i = 1; i <= n; i++) {
		cin >> a[i];
		if (idx == 0) {
			lis[idx++] = a[i];
			_index[i] = 0;
		}

		else {
			if (lis[idx - 1] < a[i]) {
				_index[i] = idx;
				lis[idx++] = a[i];
			} 
			else {
				_index[i] = lower_bound(lis, lis + idx, a[i]) - lis;
				lis[lower_bound(lis, lis + idx, a[i]) - lis] = a[i];
			}
		}
	}
	cout << idx << '\n';
	int t = 0;
	for (int i = n; i >= 1; i--) {
		if (idx == _index[i] + 1) {
			ans[t++] = a[i];
			idx--;
		}
	}
	for (int i = t - 1; i >= 0; i--) cout << ans[i] << " ";
}
int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(NULL); cout.tie(NULL);
	//freopen("input.txt", "rt", stdin);
	solution();
	return 0;
}