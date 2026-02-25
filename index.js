import { nvda, voiceOver } from "@guidepup/guidepup";
import { chromium } from "playwright";

// Detect operating system
const os = process.platform === "darwin" ? "mac" : "windows";

// Select the appropriate screen reader based on OS
const screenReader = os === "mac" ? voiceOver : nvda;

async function stopScreenReader(sr) {
    await sr.stop();
}

async function moveToNextHeading(sr) {
    if (os === "mac") {
        // VoiceOver: Use keyboard command to move to next heading
        await sr.perform(sr.keyboardCommands.moveToNextHeading);
    } else {
        // NVDA (Windows): Press 'h' key (standard screen reader shortcut)
        await sr.press("h");
    }
    console.log('Text from screen reader:', await sr.lastSpokenPhrase());
}

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://github.com/ruxailab/gsoc");

    // Start the screen reader
    await screenReader.start();

    // Move to the next item
    await screenReader.next();

    let intervalId = setInterval(async () => {
        await moveToNextHeading(screenReader);
    }, 3000);

    setTimeout(async () => {
        clearInterval(intervalId);
        await stopScreenReader(screenReader);
        await browser.close();
        console.log("Done!");
    }, 15000);

})();
