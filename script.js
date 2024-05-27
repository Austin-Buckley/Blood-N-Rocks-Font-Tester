const inputField = document.getElementById("input");
const resultsContainer = document.getElementById("results-container");
const results = document.getElementById("results");
const output = document.getElementById("output");

inputField.addEventListener('input', (event) => {
    const word = event.target.value;
    output.textContent = word;
});

inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const word = output.textContent;
        addLine(word);
        output.textContent = '';
        inputField.value = '';
    }
});

const imgURL = "https://github.com/Austin-Buckley/Blood-N-Rocks/blob/main/Blood-N-Rocks/Images/Fonts/";

const pngFormat = ".png?raw=true";

const getFontURL = (font = "Sawf", letter = "A", format = pngFormat) => {
  return imgURL + font + "/" + letter + format;
}

const transparentImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAAG1/igAAAAASUVORK5CYII=";

const addLine = (word) => {
  const line = document.createElement('div');
  line.className = 'line';

  const letters = word.split("");
  letters.forEach(letter => {
    const img = document.createElement('img');
    if (letter === " ") {
      img.src = transparentImage;
    } else {
      img.src = getFontURL("Sawf", letter.toUpperCase());
    }
    img.alt = letter.toUpperCase();
    img.width = 100;
    line.appendChild(img);
  });

  results.appendChild(line);
}
