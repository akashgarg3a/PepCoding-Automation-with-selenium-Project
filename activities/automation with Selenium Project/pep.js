require('chromedriver');
let sd = require('selenium-webdriver');
let fs = require('fs');
let path = require('path');

async function login() {
    try {
        let Contents = await fs.promises.readFile(process.argv[2]);
        let FileRead = JSON.parse(Contents);
        let password = FileRead.pwd;
        let userName = FileRead.un;
        await driver.get('http://www.pepcoding.com/login');
        let idBox = await driver.findElement(sd.By.css('input[type=email]'));
        await idBox.sendKeys(userName);
        let passBox = await driver.findElement(sd.By.css('input[type=password]'));
        await passBox.sendKeys(password);
        let submitBox = await driver.findElement(sd.By.css('button[type=submit]'));
        await submitBox.click();
        let waitForResouses = await driver.wait(sd.until.elementLocated(sd.By.css('div.resource a')));
        let resLink = await waitForResouses.getAttribute('href');
        await driver.get(resLink);
        let overLayElement = await driver.findElement(sd.By.css('div#siteOverlay'))
        await driver.wait(sd.until.elementIsNotVisible(overLayElement));
        await driver.wait(sd.until.elementLocated(sd.By.css('h2.courseInput')));
        let CoursesFind = await driver.findElements(sd.By.css('h2.courseInput'));
        let CeTextPromises = [];
        for (let x = 0; x < CoursesFind.length; x++) {
            CeTextPromises.push(CoursesFind[x].getText());
        }
        let arrOfTexts = await Promise.all(CeTextPromises);
        let cname = process.argv[3];
        let idxOfCourse;
        for (let x = 0; x < arrOfTexts.length; x++) {
            if (cname === arrOfTexts[x]) {
                idxOfCourse = x;
                break;
            }
        }
        await CoursesFind[idxOfCourse].click();
        let CouseUrl = driver.getCurrentUrl();
        let mdata = process.argv[4];
        let Content = await fs.promises.readFile(mdata);
        let metadata = await JSON.parse(Content);
        for (let x = 0; x < metadata.questions.length; x++) {
            driver.get(CouseUrl);
            await SolveQuestion(metadata.questions[x]);
            console.log("Question " + x + "th solved");
        }
    }
    catch (err) {
        console.log(err);
    }
}

async function SolveQuestion(question) {
    try {
        await getToProblemPage(question);
        let proPage = await driver.findElement(sd.By.css('.lang'));
        await proPage.click();
        let Contents = await fs.promises.readFile(path.join(question.path, 'main.java'));
        let findinputBlock = await driver.findElement(sd.By.css('#customInput'));
        await findinputBlock.click();
        await findinputBlock.sendKeys(Contents + "");

        await findinputBlock.sendKeys(sd.Key.CONTROL + "a");
        await findinputBlock.sendKeys(sd.Key.CONTROL + "x");
        let codeEditer = await driver.findElement(sd.By.css('textarea.ace_text-input'));
        await codeEditer.sendKeys(sd.Key.CONTROL + "a");
        await codeEditer.sendKeys(sd.Key.CONTROL + "v");
        let submit = await driver.findElement(sd.By.css('a#submitCode'));
        await submit.click();
        await driver.wait(sd.until.elementLocated(sd.By.css('span.col.l7.s3')));
        let testcases = await driver.findElements(sd.By.css('#testCases'));
        let testCasesArr = [];
        for(let x = 0; x < testcases.length; x++) {
            let oneFullTestCase = testcases[x].findElements(sd.By.css('input[type=hidden]'));
            testCasesArr.push(oneFullTestCase);
        }
        let PromiseOfTestCasesArr = await Promise.all(testCasesArr);
        let rowArr = [];
            for(let x = 0; x < PromiseOfTestCasesArr.length; x++) {
                let testCase = PromiseOfTestCasesArr[x][0].getAttribute("value");
                let requiredOutput = PromiseOfTestCasesArr[x][1].getAttribute("value");
                let actualOutput = PromiseOfTestCasesArr[x][2].getAttribute("value");
                let OnePromiseArr =  Promise.all([testCase, requiredOutput, actualOutput]);
                rowArr.push(OnePromiseArr);
            }
        let FinalArr = await Promise.all(rowArr);
        let objArr = FinalArr.map(function(row) {
            let rowObj = {};
            rowObj.input = row[0];
            rowObj.expected = row[1];
            rowObj.actual = row[2];
            return rowObj;
        });
        let testCaseWritten = fs.promises.writeFile(path.join(question.path, "tc.json"), JSON.stringify(objArr));
        return testCaseWritten;
    }
    catch (err) {
        console.log(err);
    }
}

async function getToProblemPage(question) {
    try {
        await driver.wait(sd.until.elementLocated(sd.By.css('li.lis.tab div.hoverable')));
        let getLists = await driver.findElements(sd.By.css('li.lis.tab div.hoverable'));
        let inCourseLinkArr = [];
        for (let x = 0; x < getLists.length; x++) {
            inCourseLinkArr.push(getLists[x].getText());
        }
        let CourseLinkArr = await Promise.all(inCourseLinkArr);
        let InCourse;
        for (let x = 0; x < CourseLinkArr.length; x++) {
            if (CourseLinkArr[x] === question.module) {
                InCourse = getLists[x];
                break;
            }
        }
        await InCourse.click();
        let inQuestion = await driver.findElements(sd.By.css('a p.title'));
        let inQuestionLinkArr = [];
        for (let x = 0; x < inQuestion.length; x++) {
            inQuestionLinkArr.push(inQuestion[x].getText())
        }
        let QuestionLinkArr = await Promise.all(inQuestionLinkArr);
        let QuestionPage;
        for (let x = 0; x < QuestionLinkArr.length; x++) {
            if (QuestionLinkArr[x] === question.lecture) {
                QuestionPage = inQuestion[x];
                break;
            }
        }
        await QuestionPage.click();
        let getProblem = await driver.findElements(sd.By.css('p.no-margin'));
        let inProblemLinkArr = [];
        for (let x = 0; x < getProblem.length; x++) {
            inProblemLinkArr.push(getProblem[x].getText())
        }
        let PromniseProblemArr = await Promise.all(inProblemLinkArr);
        let InProblem;
        for (let x = 0; x < PromniseProblemArr.length; x++) {
            if (PromniseProblemArr[x].trim().includes(question.title)) {
                InProblem = getProblem[x];
                break;
            }
        }
        await InProblem.click();
        let overLayElement = await driver.findElement(sd.By.css('div#siteOverlay'))
        await driver.wait(sd.until.elementIsNotVisible(overLayElement));
        await driver.wait(sd.until.elementIsVisible(sd.By.css("button[type=submit]")));
        await (await driver.findElement(sd.By.css("buttonyar [type=submit]"))).click();
    }
    catch (err) {
        console.log(err);
    }
}

let bldr = new sd.Builder();
let driver = bldr.forBrowser('chrome').build();
driver.manage().window().maximize();

login();