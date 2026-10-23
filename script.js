const languages = [
  ["en", "English"], ["hi", "Hindi"], ["es", "Spanish"], ["fr", "French"],
  ["de", "German"], ["it", "Italian"], ["pt", "Portuguese"], ["ru", "Russian"],
  ["ja", "Japanese"], ["ko", "Korean"], ["zh-CN", "Chinese"], ["ar", "Arabic"],
  ["bn", "Bengali"], ["ta", "Tamil"], ["te", "Telugu"], ["mr", "Marathi"],
  ["gu", "Gujarati"], ["pa", "Punjabi"], ["ur", "Urdu"]
];

const source = document.getElementById("sourceLanguage");
const target = document.getElementById("targetLanguage");
const input = document.getElementById("inputText");
const output = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btnText");
const status = document.getElementById("status");
const charCount = document.getElementById("charCount");
const toast = document.getElementById("toast");

languages.forEach(([code, name]) => {
  source.add(new Option(name, code));
  target.add(new Option(name, code));
});

source.value = "en";
target.value = "hi";

input.addEventListener("input", () => {
  charCount.textContent = `${input.value.length} / 500`;
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

async function translateText() {
  const text = input.value.trim();
  if (!text) {
    showToast("Please enter some text first.");
    input.focus();
    return;
  }
  if (source.value === target.value) {
    output.textContent = text;
    status.textContent = "Done";
    return;
  }

  translateBtn.disabled = true;
  spinner.classList.remove("hidden");
  btnText.textContent = "Translating...";
  status.textContent = "Processing";

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(source.value)}|${encodeURIComponent(target.value)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();

    if (data.responseStatus !== 200 || !data.responseData?.translatedText) {
      throw new Error(data.responseDetails || "Translation failed");
    }

    output.textContent = data.responseData.translatedText;
    status.textContent = "Translated";
  } catch (error) {
    output.textContent = "Unable to translate right now. Please check your internet connection and try again.";
    status.textContent = "Error";
    showToast("Translation API error.");
  } finally {
    translateBtn.disabled = false;
    spinner.classList.add("hidden");
    btnText.textContent = "Translate Text";
  }
}

translateBtn.addEventListener("click", translateText);

document.getElementById("clearBtn").addEventListener("click", () => {
  input.value = "";
  output.textContent = "Your translation will appear here.";
  charCount.textContent = "0 / 500";
  status.textContent = "Ready";
  input.focus();
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  const text = output.textContent;
  if (!text || text === "Your translation will appear here.") {
    showToast("Nothing to copy.");
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    showToast("Translation copied!");
  } catch {
    showToast("Copy is not supported in this browser.");
  }
});

document.getElementById("swapBtn").addEventListener("click", () => {
  const oldSource = source.value;
  source.value = target.value;
  target.value = oldSource;

  if (output.textContent !== "Your translation will appear here.") {
    input.value = output.textContent;
    output.textContent = "Your translation will appear here.";
    charCount.textContent = `${input.value.length} / 500`;
    status.textContent = "Ready";
  }
});

function speak(text, lang) {
  if (!text || text === "Your translation will appear here.") {
    showToast("Nothing to listen to.");
    return;
  }
  if (!("speechSynthesis" in window)) {
    showToast("Text-to-speech is not supported.");
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  speechSynthesis.speak(utterance);
}

document.getElementById("speakInputBtn").addEventListener("click", () => speak(input.value, source.value));
document.getElementById("speakOutputBtn").addEventListener("click", () => speak(output.textContent, target.value));

input.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") translateText();
});
