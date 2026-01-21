from collections import deque

def solution(prices):
    prices = deque(prices)
    answer = []

    while prices:
        current_price = prices.popleft()
        price_not_fall_period = 0
        for next_price in prices:
            price_not_fall_period += 1
            if current_price > next_price:
                break

        answer.append(price_not_fall_period)

    return answer