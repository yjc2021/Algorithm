#include <bits/stdc++.h>
using namespace std;
typedef pair<int, int> ii;
typedef long long ll;

int n, c, ret;

vector<int> v;

void solution() {
    cin >> n >> c;
    for (int i = 0; i < n; i++) {
        int tmp;
        cin >> tmp;
        v.push_back(tmp);
    }

    sort(v.begin(), v.end());

    int l = 1, r = v[n-1] - v[0];
    while (l <= r) {
        int router = 1;
        int p = v[0];
        // 이분탐색으로 공유기 사이 최소 거리 탐색
        int mid = (l + r) / 2;

        for (int i = 1; i < n; i++) {
            if (v[i] - p >= mid) {
                router++;
                p = v[i];
            }
        }

        if (router >= c) {
            l = mid + 1;
            ret = max(ret, mid);
        }
        else {
            r = mid - 1;
        }
    }
    
    cout << ret << '\n';
}


int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);
    //freopen("input.txt", "rt", stdin);
    solution();
    return 0;
}
