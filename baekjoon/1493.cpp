#include <bits/stdc++.h>
using namespace std;
typedef pair<int, int> ii;

int cube[21];

long long cnt;


void sol(int l, int w, int h, int c_idx) {
    int flag = 0;
    int k;
    int a;
    if (l == 0 || w == 0 || h == 0)
        return;

    k = min({ l, w, h });
    c_idx = log2(k);

    for (int i = c_idx; i >= 0; i--) {
        if (cube[i] > 0) {
            c_idx = i;
            flag = 1;
            break;
        }

    }

    if (flag == 0) {
        printf("-1\n");
        exit(0);

    }

    a = pow(2, c_idx);
    cnt++;
    cube[c_idx]--;
    sol(l - a, w, h, c_idx);
    sol(a, w, h - a, c_idx);
    sol(a, w - a, a, c_idx);
}

void solution() {
    int l, w, h;
    int n;
    int a, b;

    cin >> l >> w >> h;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> a >> b;
        cube[a] = b;
    }

    sol(l, w, h, n - 1);
    printf("%lld\n", cnt);
}
int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);
    //freopen("input.txt", "rt", stdin);
    solution();
    return 0;
}
