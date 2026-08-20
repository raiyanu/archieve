const print = console.log;

// function summarize() {
//   print("summarizing...");
//   let Transcript = document.getElementById("Transcript").value;
//   print(`Transcript: ${Transcript}`);
//   //   let Summary = nlp(Transcript).sentences().out("text");
//   let Summary = summarizeText(Transcript);
//   print(`Summary: ${Summary}`);
//   document.getElementById("Summary").value = Summary;
// }

function summarize() {
  let Transcript = document.getElementById("Transcript").value;
  axios({
    method: "get",
    url: "/summarize",
    params: {
      text: Transcript,
    },
  }).then(function (response) {
    console.log(response.data);
    document.getElementById("Summary").value = response.data;
  });
}

function summarizeText(text) {
  const sentences = text.split("\n");
  const sentenceCount = Math.min(sentences.length, 5);
  const summary = sentences.slice(0, sentenceCount).join(" ");
  return summary;
}
