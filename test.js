import { nvda } from "@guidepup/guidepup";
import { chromium } from "playwright";
async function stopNvda(nvda){
    await nvda.stop()
}

async function moveToNextHeading(nvda){
    // await nvda.perform(nvda.keyboardCommands.moveToNextLink);
    // await nvda.press("b")
    await nvda.press("h") //Next heading 
    // await nvda.press("f")
    // await nvda.press("g")
    // await nvda.press("m")
    console.log('Text from nvda : ',await nvda.lastSpokenPhrase());
}

(async () => {

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    // await page.goto("https://github.com/guidepup/guidepup");
    // await page.goto("https://github.com/login");
    // await page.goto("https://github.com");

    await page.goto("https://github.com/ruxailab/gsoc");



  // Start NVDA.
  await nvda.start();

  // Move to the next item.
  await nvda.next();

//   console.log(await nvda.spokenPhraseLog());

  let intervalId=setInterval(()=>{
    moveToNextHeading(nvda)
  },3000)

    // while(true){
        
    //     await nvda.perform(nvda.keyboardCommands.moveToNextHeading);
    //     console.log(await nvda.lastSpokenPhrase());
    // }
  // Stop NVDA.

  setTimeout(()=>{
    clearInterval(intervalId)
    stopNvda(nvda)
    browser.close();
  },15000)

})();