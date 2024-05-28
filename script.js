const inputField = document.getElementById("input");
const resultsContainer = document.getElementById("results-container");
const results = document.getElementById("results");
const output = document.getElementById("output");
const letterSpacing = document.getElementById("letter-spacing");
const fontSize = document.getElementById("font-size");
const fontFamily = document.getElementById("font-family");

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

const punctuation = [ ">", "<", "^", "]", "[", ")", "(", "{", "}", ".", "!", "/", "\\", ",", "-", "?", "'", '"', "_" ];

const punctuationName = {
  ">": "greater_than",
  "<": "less_than",
  "^": "caret",
  "]": "right_bracket",
  "[": "left_bracket",
  ")": "right_parenthesis",
  "(": "left_parenthesis",
  ".": "period",
  "!": "exclamation",
  "/": "forward_slash",
  "\\": "back_slash",
  ",": "comma",
  "-": "hyphen",
  "?": "question",
  "'": "single_quote",
  "{": "curly_brace_left",
  "}": "curly_brace_right",
  "_": "underscore",
  "\"": { left: "double_quote_left", right: "double_quote_right" }
};

const addLine = (word) => {
  const line = document.createElement('div');
  line.className = 'line';

  const letters = word.split("");
  letters.forEach((letter, index) => {
    const img = document.createElement('img');
    img.classList.add('letter-img');
    if (letter === " ") {
      img.src = transparentImage;
      img.classList.add('transparent');
    } 
    else if (punctuation.includes(letter)) {
      img.classList.add('punctuation');
      if (letter === '"') {
        const isAtStart = index === 0 || word[index - 1] === " ";
        const isAtEnd = index === letters.length - 1 || word[index + 1] === " ";
        const quoteType = isAtStart ? punctuationName[letter].left : (isAtEnd ? punctuationName[letter].right : letter);
        if (quoteType.includes("left")){
          console.log(quoteType)
          img.style.marginRight = "0.5rem"
          img.style.paddingLeft = "1.5rem"
          img.style.paddingRight = "0.2rem"
          img.style.paddingBottom = "1.5rem"
        }
        else if (quoteType.includes("right")){
         console.log(quoteType)
          img.style.paddingLeft = "0.5rem"
          img.style.marginLeft = "1.5rem"
          img.style.marginRight = "1.5rem"
          img.style.paddingBottom = "1.5rem"
        }
        img.src = getFontURL(fontFamily.value, quoteType);
      } else {
        img.src = getFontURL(fontFamily.value, punctuationName[letter]);
        img.style.marginRight = "-1.8rem"
        img.style.marginLeft = "-1.5rem"
        img.style.paddingLeft = "1rem"
      }
    } else {
      img.src = getFontURL(fontFamily.value, letter.toUpperCase());
    }
    img.alt = letter.toUpperCase();
    img.style.height = `${fontSize.value}px`;
    img.style.width = 'auto';
    img.style.marginLeft = `-${letterSpacing.value}%`
    line.appendChild(img);
  });

  results.appendChild(line);

}
