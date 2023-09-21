#include <bits/stdc++.h>
using namespace std;
typedef pair<int, int> ii;


int d;
long long x, y;
string q_Num;

pair<long long, long long> get_Coordinate(string& str, int index, long long r, long long c, long long size)
{
    if (size == 1) return make_pair(r, c);
    else
    {
        if (str[index] == '1') {
            return get_Coordinate(str, index + 1, r, c + size / 2, size / 2);
        }
        else if (str[index] == '2') {
            return get_Coordinate(str, index + 1, r, c, size / 2);
        }
        else if (str[index] == '3') {
            return get_Coordinate(str, index + 1, r + size / 2, c, size / 2);
        }
        else if (str[index] == '4') {
            return get_Coordinate(str, index + 1, r + size / 2, c + size / 2, size / 2);
        }
    }
    return make_pair(0, 0);
}

string go(long long r, long long c, long long size, long long x, long long y)
{
    if (size == 1) return "";
    if (x < r + size / 2 && y < c + size / 2) return "2" + go(r, c, size / 2, x, y);
    else if (x < r + size / 2 && y >= c + size / 2) return "1" + go(r, c + size / 2, size / 2, x, y);
    else if (x >= r + size / 2 && y < c + size / 2) return "3" + go(r + size / 2, c, size / 2, x, y);
    else return "4" + go(r + size / 2, c + size / 2, size / 2, x, y);

}

void solution() {
    cin >> d >> q_Num;
    cin >> x >> y;

    long long size = (1LL << d);

    auto p = get_Coordinate(q_Num, 0, 0, 0, size);

    p.first -= y;
    p.second += x;

    if (0 <= p.first && p.first < size && 0 <= p.second && p.second < size)
        cout << go(0, 0, size, p.first, p.second);
    else cout << "-1" << "\n";
}
int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(NULL); cout.tie(NULL);
	//freopen("input.txt", "rt", stdin);
	solution();
	return 0;
}
