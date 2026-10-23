# LinguaFlow — Language Translation Tool

A clean, responsive language translation web application created for the **Task 1: Language Translation Tool** assignment.

## Features

- Enter source text through a text area.
- Select source and target languages.
- Sends text to a real translation REST API.
- Displays translated text clearly.
- Swap source/target languages.
- Copy translated text.
- Text-to-speech for both input and output.
- Character counter.
- Loading state and error handling.
- Responsive design for mobile and desktop.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- REST API: MyMemory Translation API
- Browser SpeechSynthesis API for text-to-speech

## How to run

### Option 1 — Easiest
Open `index.html` in a browser and make sure you have an internet connection.

### Option 2 — Recommended
Run a local server from this folder:

```bash
python3 -m http.server 5500
```

Then open:

`http://localhost:5500`

## API

The application calls:

`https://api.mymemory.translated.net/get`

The API does not require an API key for this student/demo implementation.

## Assignment mapping

1. **Create a user interface** → language dropdowns + input/output panels.
2. **Use a translation API** → MyMemory REST Translation API.
3. **Send text to API** → JavaScript `fetch()` request.
4. **Display translated text** → output panel.
5. **Optional usability features** → Copy, Swap and Text-to-Speech buttons.

## Note

For a production application, a backend should be used for API authentication, rate limiting, validation, and error handling.
