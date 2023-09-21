#include <bits/stdc++.h>
using namespace std;
typedef pair<int, int> ii;

int n;
struct Node {
	int x, h, flag;
};

vector<Node> v;


bool cmp(Node a, Node b) {
	if (a.x != b.x) return a.x < b.x;
	if (a.flag != b.flag) return a.flag < b.flag;
	return !a.flag ? a.h > b.h : a.h < b.h;
}

void solution() {
	cin >> n;
	for (int i = 0; i < n; i++) {
		int l, h, r;
		cin >> l >> h >> r;
		v.push_back({ l, h, 0 });
		v.push_back({ r, h, 1 });
	}
	
	sort(v.begin(), v.end(), cmp);
	multiset<int> S;

	for (auto nv : v) {
		int x = nv.x;
		int h = nv.h;
		int flag = nv.flag;

		if (!flag) {
			if (S.empty() || *S.rbegin() < h) cout << x << " " << h << " ";
			S.insert(h);
		}
		else {
			auto p = *S.rbegin();
			auto it = S.find(h);
			if (it != S.end()) S.erase(it);
			if (S.empty()) cout << x << " " << 0 << " ";
			else if (p != *S.rbegin()) cout << x << " " << *S.rbegin() << " ";
		}
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
