function addCustomRule() {
  const key = document.getElementById("customKey").value.toUpperCase().trim();
  const value = document.getElementById("customValue").value.trim();

  if (key && value) {
    // Regel zum Wörterbuch hinzufügen
    customDictionary[key] = value;

    // UI aktualisieren
    const rulesList = document.getElementById("rulesList");
    const listItem = document.createElement("li");
    listItem.textContent = `${key} → ${value}`;
    rulesList.appendChild(listItem);

    // Eingabefelder zurücksetzen
    document.getElementById("customKey").value = "";
    document.getElementById("customValue").value = "";
  } else {
    alert("Bitte sowohl Eingabetext als auch Übersetzung eingeben!");
  }
}

// Funktion: Übersetzen
function translate() {
  const inputText = document.getElementById("inputText").value;
  const language = document.getElementById("language").value;
  let outputText = "";

  if (language === "morse") {
    outputText = toMorse(inputText);
  } else if (language === "leet") {
    outputText = toLeet(inputText);
  } else if (language === "custom") {
    outputText = toCustom(inputText);
  }

  document.getElementById("outputText").textContent = outputText;
}

// Funktion: Rückübersetzen
function reverseTranslate() {
  const inputText = document.getElementById("inputText").value;
  const language = document.getElementById("language").value;
  let outputText = "";

  if (language === "custom") {
    outputText = reverseCustom(inputText);
  } else {
    alert("Rückübersetzung ist nur für die eigene Sprache verfügbar!");
    return;
  }

  document.getElementById("outputText").textContent = outputText;
}

// Morsecode-Übersetzung
function toMorse(text) {
  const morseCode = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
    G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
    M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
    S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..", " ": "/",
    1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....",
    6: "-....", 7: "--...", 8: "---..", 9: "----.", 0: "-----"
  };

  return text.toUpperCase().split("").map(char => morseCode[char] || char).join(" ");
}

// Leetspeak-Übersetzung
function toLeet(text) {
  const leetMap = {
    A: "4", B: "8", C: "(", D: "[)", E: "3", F: "|=", G: "6",
    H: "#", I: "1", J: "_|", K: "|<", L: "1", M: "/\\/\\",
    N: "/\\/", O: "0", P: "|D", Q: "(,)", R: "|2", S: "5",
    T: "7", U: "|_|", V: "\\/", W: "\\/\\/", X: "><", Y: "`/", Z: "2"
  };

  return text.toUpperCase().split("").map(char => leetMap[char] || char).join("");
}

// Benutzerdefinierte Sprache (Übersetzen)
function toCustom(text) {
  let translated = text.toUpperCase();

  // Ersetze Wörter oder Phrasen basierend auf customDictionary
  for (const [key, value] of Object.entries(customDictionary)) {
    const regex = new RegExp(key, "g");
    translated = translated.replace(regex, value);
  }

  return translated;
}

// Benutzerdefinierte Sprache (Rückübersetzen)
function reverseCustom(text) {
  let translated = text;

  // Umkehren: Durchsuche das customDictionary nach den Werten
  for (const [key, value] of Object.entries(customDictionary)) {
    const regex = new RegExp(value, "g");
    translated = translated.replace(regex, key);
  }

  return translated;
}






