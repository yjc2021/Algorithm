#include <cstdio>
int main() {
	int n, i, cnt = 0, num, flag;
	scanf("%d", &n);
	while (n--) {
		scanf("%d", &num);
		if (num == 1) continue;
		flag = 0;
		for (i = 2; i * i <= num; i++) {
			if (num % i == 0) {
				flag = 1;
				break;
			}
		}
		if (flag == 0) cnt++;
	}
	printf("%d", cnt);
	return 0;
}