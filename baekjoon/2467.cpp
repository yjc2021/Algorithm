#include <bits/stdc++.h>
using namespace std;
typedef pair<int, int> ii;
typedef long long ll;

int n;
vector<ll> v;
ll a, b, sum;

void solution() {
    cin >> n;
    for (int i = 0; i < n; i++) {
        ll tmp;
        cin >> tmp;
        v.push_back(tmp);
    }

    int l = 0, r = n - 1;

    sum = INT_MAX;

    while (l < r) {
        ll tmp = v[l] + v[r];
        if (abs(tmp) < abs(sum)) {
            sum = tmp;
            a = v[l];
            b = v[r];
        }

        if (tmp == 0) break;
        else if (tmp > 0) r--;
        else l++;
    }
    cout << a << " " << b;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);
    //freopen("input.txt", "rt", stdin);
    solution();
    return 0;
}
