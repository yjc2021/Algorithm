#include <cstdio>
void swap(int* a, int* b) {
	int tmp = *a;
	*a = *b;
	*b = tmp;
}
int gcd(int a, int b) {
	if (a < b) swap(&a, &b);
	int mod;
	while ((mod = a % b) != 0) {
		a = b;
		b = mod;
	}
	return b;
}
int main() {
	int a, b;
	scanf("%d %d", &a, &b);
	printf("%d\n", gcd(a, b));
	printf("%d", a * b / gcd(a, b));
	return 0;
}