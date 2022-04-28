const expect = require("chai").expect;
const { setWorldConstructor, setDefaultTimeout } = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");

const PAGE = "https://outlook.live.com/owa/?nlp=1";
const EMAILINPUT = "#i0116";
const NEWMESSAGEBUTTON = "#id__8";
const ADDRESSEINPUT = ".ms-SelectionZone";
const SUBJECTINPUT = 'input[type="text"]';
const MESSAGEINPUT = ".h04ZZTiPR1gPpezg0OQA";
const SENDBUTTON = '[title="Küldés (Ctrl+Enter)"]';
const LISTOFSENTEMAILS = 'div[title="Elküldött elemek"]';
const ONEEMAIL = 'div[class="s0OAmtxWyjwp1q8ElgO7"]';
const DELETEALLEMAILSBUTTON = ('button[name="Mappa ürítése"]');

//const HEADLESS = process.env.HEADLESS !== "false";

setDefaultTimeout(30 * 1000);

class OutlookWorld {
  async openOutlookPage() {
    this.browser = await puppeteer.launch({ args: ["--window-size=1920,1080"], headless: false, slowMo: 120 });
    this.page = await this.browser.newPage();
    await this.page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
    await this.page.goto(PAGE);
  }

  async closeOutlookPage() {
    await this.browser.close()
  }

  async loginToOutlook() {
    await this.page.type(EMAILINPUT, "andras.pasztor2022@outlook.hu");
    await this.page.click('input[type="submit"]');
    await this.page.waitForSelector("#i0118");
    await this.page.type("#i0118", "QaYwSx789");
    await this.page.click('input[type="submit"]');
    await this.page.waitForSelector("#idSIButton9");
    await this.page.click("#idSIButton9");
  }

  async writeEmail() {
    await this.page.waitForSelector(NEWMESSAGEBUTTON);
    await this.page.click(NEWMESSAGEBUTTON);
    await this.page.waitForSelector(ADDRESSEINPUT);
    await this.page.type(ADDRESSEINPUT, "andras.pasztor1@gmail.com");
    await this.page.keyboard.press("Enter");
    await this.page.type(SUBJECTINPUT, "Teszt tárgy");
    await this.page.click(MESSAGEINPUT);
    await this.page.type(MESSAGEINPUT, "Teszt üzenet");
  }

  async sendEmail() {
    await this.page.click(SENDBUTTON);
  }

  async checkEmail() {
    let expected = true;
    let actual;

    await this.page.waitForSelector(LISTOFSENTEMAILS);
    await this.page.click(LISTOFSENTEMAILS);
    await this.page.waitForSelector(LISTOFSENTEMAILS);
    if (ONEEMAIL) {
      await this.page.click(ONEEMAIL);
      await this.page.waitForSelector(ONEEMAIL);
      actual = true;
    } else {
      actual = false;
    }
    expect(actual).to.eql(expected);
  }
  
  async listOfEmail() {
    await this.page.waitForSelector(LISTOFSENTEMAILS);
    await this.page.click(LISTOFSENTEMAILS);
  }

  async checkSentEmail() {
    let expected = true;
    let actual;
    if(ONEEMAIL) {
      await this.page.waitForSelector(ONEEMAIL);
      await this.page.click(ONEEMAIL);
      actual = true
    } else {
      actual = false
    }
    expect(actual).to.eql(expected);
  }

  async deleteAllEmails() {
    let expected = true;
    let actual;

    await this.page.waitForSelector(DELETEALLEMAILSBUTTON)
    await this.page.click(DELETEALLEMAILSBUTTON)
    if(DELETEALLEMAILSBUTTON) {
      await this.page.waitForSelector('button[id="ok-1"]');
      await this.page.click('button[id="ok-1"]');
      actual = true
    } else {
      actual = false
    }
    expect(actual).to.eql(expected)
  } 
}

setWorldConstructor(OutlookWorld);
