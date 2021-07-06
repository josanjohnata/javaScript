let base = 5;
let symbol = '*';
let inputLine = '';
let position = base;

for (let lineIndex = 0; lineIndex <= base; lineIndex += 1) {
  for (let columnIndex = 0; columnIndex <= base; columnIndex += 1) {
    if (columnIndex < position) {
      inputLine = inputLine + ' ';
    } else {
      inputLine = inputLine + symbol;
    }
  }
  console.log(inputLine);
  inputLine = '';
  position -= 1;
};
