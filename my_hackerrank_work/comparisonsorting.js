let arr = [1, 1, 3, 2, 1],
  arrFreq = [],
  arrSorted = [];

for (let i = 0; i < arr.length; i++) {
  arrFreq.push(0);
}

arr.forEach((item) => {
  arrFreq[item] = arrFreq[item] + 1;
});
for (let j = 0; j < arrFreq.length; j++) {
  for (let i = 0; i < arrFreq[j]; i++) {
    arrSorted.push(j);
  }
}
console.log(arrFreq);
console.log(arrSorted);
