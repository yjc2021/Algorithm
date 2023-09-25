#include <bits/stdc++.h>
using namespace std;
typedef pair<int, int> ii;
typedef long long ll;

double x, y, c, ret;

double func(double mid) {
    double h1 = sqrt(x * x - mid * mid);
    double h2 = sqrt(y * y - mid * mid);

    return (h1 * h2) / (h1 + h2);
}

void solution() {
    cin >> x >> y >> c;

    double l, r;
    l = 0;
    r = min(x, y);

    while (r-l > 0.000001) {
        double mid = (l + r) / 2.0;

        if (func(mid) >= c) {
            ret = mid;
            l = mid + 0.000001;
        }
        else {
            r = mid - 0.000001;
        }
    }

    printf("%.3lf\n", ret);
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);
    //freopen("input.txt", "rt", stdin);
    solution();
    return 0;
}
