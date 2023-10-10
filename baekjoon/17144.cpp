// 2023-10-10
// 백준 17144
// 골드5
// 구현, 시뮬레이션

#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int, int> ii;

int r, c, t, ret;
int a[54][54], add[54][54];

vector<ii> filter;

void disperse() {
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (a[i][j]) {
                int cnt = 0;
                if (i - 1 >= 0 && a[i-1][j] != -1) {
                    add[i - 1][j] += a[i][j] / 5;
                    cnt++;
                }
                if (j - 1 >= 0 && a[i][j-1] != -1) {
                    add[i][j - 1] += a[i][j] / 5;
                    cnt++;
                }
                if (i + 1 < r && a[i+1][j] != -1) {
                    add[i + 1][j] += a[i][j] / 5;
                    cnt++;
                }
                if (j + 1 < c && a[i][j+1] != -1) {
                    add[i][j + 1] += a[i][j] / 5;
                    cnt++;
                }
                    
                a[i][j] -= (a[i][j] / 5) * cnt;
            }
        }
    }
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            a[i][j] += add[i][j];
            add[i][j] = 0;
        }
    }
}
void display() {
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cout << a[i][j] << " ";
        }
        cout << '\n';
    }
    cout << '\n';
}
void machine() {
    // 위
    int fy = filter[0].first;
    int fx = filter[0].second;

    for (int i = fy-1; i > 0; i--) {
        a[i][fx] = a[i - 1][fx];
    }

    for (int j = 0; j+1 < c; j++) {
        a[0][j] = a[0][j + 1];
    }
    for (int i = 0; i + 1 <= fy; i++) {
        a[i][c-1] = a[i + 1][c - 1];
    }
    for (int j = c - 1; j-1 > 0; j--) {
        a[fy][j] = a[fy][j - 1];
    }
    a[fy][1] = 0;
    // 아래
    fy = filter[1].first;
    fx = filter[1].second;
    for (int i = fy + 1; i+1 <= r; i++) {
        a[i][fx] = a[i + 1][fx];
    }
    for (int j = 0; j + 1 < c; j++) {
        a[r-1][j] = a[r-1][j + 1];
    }
    for (int i = r-1; i - 1 >= fy; i--) {
        a[i][c - 1] = a[i - 1][c - 1];
    }
    for (int j = c - 1; j - 1 > 0; j--) {
        a[fy][j] = a[fy][j - 1];
    }
    a[fy][1] = 0;
}
void solution() {
    cin >> r >> c >> t;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
            if (a[i][j] == -1)
                filter.push_back({ i,j });
        }
    }

    while (t--) {
        disperse();
        machine();
    }
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (a[i][j] == 0 || a[i][j] == -1  ) continue;
            ret += a[i][j];
        }
    }
    cout << ret << '\n';
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);
    freopen("input.txt", "rt", stdin);
    solution();
    return 0;
}
