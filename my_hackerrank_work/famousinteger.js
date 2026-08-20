function lonelyinteger(a) {
  while (a.length > 0) {
    let item = a[0];
    a.shift();
    for (let i = 0; i < a.length; i++) {
      if (item == a[i]) {
        return a[i];
      }
    }
    console.log(a, a.length);
  }
  return null;
}

function main() {
  let a = [4, 1, 2, 3, 5, 7, 8, 9, 5];
  const result = lonelyinteger(a);

  console.log(result);
}
main();
