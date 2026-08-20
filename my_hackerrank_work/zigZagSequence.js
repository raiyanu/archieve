// zig zag sequence 
function processData(data) {
    // sort data array
    // let data = new Array(input);
    data.sort((a, b) => a - b);
    let firstHalfArray = data.slice(0, data.length / 2 % 2 == 0 ? data.length / 2 : data.length / 2 + 1);
    let secondHalfArray = data.slice(data.length / 2 % 2 == 0 ? data.length / 2 + 1 : data.length / 2 + 1, data.length);
    let permutatedArray = [];
    console.log("first:" + firstHalfArray);
    console.log("second:" + secondHalfArray);
    for (let index = 0; index < secondHalfArray.length + 1; index++) {
        if (index % 2 == 0) {
            permutatedArray.push(firstHalfArray.shift());
            permutatedArray.push(secondHalfArray.shift());
            permutatedArray.push(secondHalfArray.shift());
        } else {
            permutatedArray.push(firstHalfArray.shift());
            permutatedArray.push(firstHalfArray.shift());
            permutatedArray.push(secondHalfArray.shift());
        }
    }
    console.log(...permutatedArray);
    return permutatedArray;
}


processData([1, 3, 2, 5, 4, 7, 6, 9, 8]);