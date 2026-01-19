import sys

n = int(sys.stdin.readline().strip())
sequence = [int(sys.stdin.readline().strip()) for _ in range(n)]

def stack_sequence(n, sequence):
    stack = []
    num = 1
    sequence_idx = 0
    answer = []
    
    while True:
        if len(stack) == 0:
            stack.append(num)
            answer.append('+')
            num+=1
        elif sequence[sequence_idx] == stack[-1]:
            stack.pop()
            answer.append('-')
            sequence_idx+=1
            if sequence_idx == n:
                break
        else:
            if n < num:
                print("NO")
                break
            stack.append(num)
            answer.append('+')
            num+=1

    if len(stack) == 0:
        for char in answer:
            print(char)
            
stack_sequence(n, sequence)