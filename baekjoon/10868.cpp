#include <bits/stdc++.h>
#define INF 1000000001

using namespace std;
typedef long long ll;

int n, m;

void init(vector<ll>& a, vector<ll>& tree, int node, int start, int end) {
    if (start == end) {
        tree[node] = a[start];
    }
    else {
        init(a, tree, node * 2, start, (start + end) / 2);
        init(a, tree, node * 2 + 1, (start + end) / 2 + 1, end);
        tree[node] = min(tree[node * 2], tree[node * 2 + 1]);
    }
}

ll query(vector<ll>& tree, int node, int start, int end, int left, int right) {
    if (left > end || right < start)
        return INF;
    else if (left <= start && end <= right)
        return tree[node];
    ll lmin = query(tree, node * 2, start, (start + end) / 2, left, right);
    ll rmin = query(tree, node * 2 + 1, (start + end) / 2 + 1, end, left, right);
    return min(lmin, rmin);
}
void solution() {
    cin >> n >> m;
    vector<ll> a(n);
    int h = (int)ceil(log2(n));
    int tree_size = (1 << (h + 1));
    vector<ll> tree(tree_size);
    for (int i = 0; i < n; i++)
        cin >> a[i];
    init(a, tree, 1, 0, n - 1);

    for (int k = 0; k < m; k++) {
        int a, b;
        cin >> a >> b;
        cout << query(tree, 1, 0, n - 1, a - 1, b - 1) << '\n';
      
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
