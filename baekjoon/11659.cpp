// 2023-09-28
// 백준 11659
// 접근 : 펜윅트리

#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

int n, m;

ll sum(vector<ll>& tree, int i) {
    ll ans = 0;
    while (i > 0) {
        ans += tree[i];
        i -= (i & -i);
    }
    return ans;
}
void update(vector<ll>& tree, int i, ll diff) {
    while (i < tree.size()) {
        tree[i] += diff;
        i += (i & -i);
    }
}
void solution() {
    cin >> n >> m;
    vector<int> a(n+1);
    vector<ll> tree(n+1);
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        update(tree, i, a[i]);
    }
    while (m--) {
        int i, j;
        cin >> i >> j;
        cout << sum(tree, j) - sum(tree, i - 1) << '\n';
    }
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);
    //freopen("input.txt", "rt", stdin);
    solution();
    return 0;
}
