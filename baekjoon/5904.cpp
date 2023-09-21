#include <bits/stdc++.h>
using namespace std;
typedef pair<int, int> ii;

char s[3] = { 'm', 'o', 'o' };
int n;

int go(int n, int k, int l) {
    int nl = l * 2 + k + 3;

    if (n <= 3) {
        cout << s[n-1];
        exit(0);
    }
    if (nl < n) {
        go(n, k + 1, nl);
    }
    else {
        if (n > l && n <= l + k + 3) {
            if (n - l == 1) 
                cout << 'm' << '\n';
            else
                cout << 'o' << '\n';
            exit(0);
        }
        else {
            go(n - (l + k + 3), 1, 3);
        }
    }
}
void solution() {
    cin >> n;

    go(n, 1, 3);
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);
    //freopen("input.txt", "rt", stdin);
    solution();
    return 0;
}
