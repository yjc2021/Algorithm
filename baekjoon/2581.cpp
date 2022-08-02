#include <cstdio>
int arr[10001];
int main() {
	int m, n, i, sum = 0, min=0;
	scanf("%d %d", &m, &n);
	for (i = 2; i <= n; i++)
		arr[i] = 1;
	for (i = 2; i * i <= n; i++) {
		if (arr[i] == 0)
			continue;
		for (int j = i + i; j <= n; j+=i)
			arr[j] = 0;
	}
	for (i = m; i <= n; i++) {
		if (arr[i] == 0) continue;
		sum += i;
	}
	if (sum == 0) {
		printf("-1");
		return 0;
	}
	for (i = m; i <= n; i++) {
		if (arr[i] == 1) {
			min = i;
			break;
		}
	}
	printf("%d\n%d", sum, min);
	return 0;
}