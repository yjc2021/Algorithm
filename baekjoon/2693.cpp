#include <cstdio>
#include <algorithm>
using namespace std;
int arr[10];
int i;
int main() {
	int T;
	scanf("%d", &T);
	while (T--) {
		for (i = 0; i < 10; i++)
			scanf("%d", &arr[i]);
		sort(arr, arr + 10);
		printf("%d\n", arr[7]);
	}
	return 0;