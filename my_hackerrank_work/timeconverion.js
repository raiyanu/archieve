function timeConversion(s) {
  let time = s.split(":");
  time.push(time[2].slice(2));
  time[2] = time[2].slice(0, 2);
  console.log(time);

  if (time[3] == "AM") {
    console.log("A");
    if (time[0] == "12") {
      console.log("A1");
      time[0] = "00";
    }
  } else {
    console.log("B");
    if (time[0] < "12") {
      console.log("B1");
      time[0] = (parseInt(time[0]) + 12).toString();
    }
  }
  time.pop(-1);
  return time.join(":");
}

function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  // const s = readLine();

  // const result = timeConversion("12:45:54PM");
  // const result = timeConversion("12:00:00AM");
  const result = timeConversion("07:05:45PM");

  // ws.write(result + "\n");

  // ws.end();
  console.log(result);
}
main();
