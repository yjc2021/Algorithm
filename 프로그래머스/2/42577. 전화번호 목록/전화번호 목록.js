function solution(phone_book) {
    let answer = phone_book.sort().some((value, index, self) => self[index + 1]?.startsWith(value));
    return !answer;
}