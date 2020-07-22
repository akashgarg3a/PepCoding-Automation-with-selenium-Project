require('chromeDriver');
let swd = require('selenium-webdriver');
let fs = require('fs');
let path = require('path')


let bldr = new swd.Builder()
let driver = bldr.forBrowser('chrome').build();

let cmain = process.argv[2];
let mdata = process.argv[3];
let cname = process.argv[4];

let readFile = fs.promises.readFile(cmain);

let url, metadata;

let userName, password;
let gci, gcrsElements, gCourseArr, gQuestionArr, gProblemArr;

function getUrl(problem) {
    return new Promise(function (resolve, reject) {
        let currPage = driver.get(url);
        currPage.then(function() {
            let getLists = driver.findElements(swd.By.css('li.lis.tab div.hoverable'));
            return getLists
        }).then(function (getLists) {
            gCourseArr = getLists;
            let inCourseLinkArr = [];
            for (let x = 0; x < getLists.length; x++) {
                inCourseLinkArr.push(getLists[x].getText())
            }
            return Promise.all(inCourseLinkArr);
        }).then(function(CourseLinkArr) {
            let InCourse;
            for(let x = 0; x < CourseLinkArr.length; x++) {
                if(CourseLinkArr[x] === problem.module) {
                    InCourse = gCourseArr[x];  
                    break;
                }
            }
            return InCourse;
        }).then(function (inCourse) {
            let enterInCourse = inCourse.click();
            return enterInCourse;
        }).then(function () {
            let inQuestion = driver.findElements(swd.By.css('a p.title'));
            return inQuestion;
        }).then(function (getQuestion) {
            gQuestionArr = getQuestion;
            let inQuestionLinkArr = [];
            for (let x = 0; x < getQuestion.length; x++) {
                inQuestionLinkArr.push(getQuestion[x].getText())
            }
            return Promise.all(inQuestionLinkArr);
        }).then(function(QuestionLinkArr) {
            let InQuestion;
            for(let x = 0; x < QuestionLinkArr.length; x++) {
                if(QuestionLinkArr[x] === problem.lecture) {
                    InQuestion = gQuestionArr[x];  
                    break;
                }
            }
            return InQuestion;
        }).then(function (inCourse) {
            let enterInCourse = inCourse.click();
            return enterInCourse;
        }).then(function () {
            let inProblem = driver.findElements(swd.By.css('p.no-margin'));
            return inProblem;
        }).then(function (getProblem) {
            gProblemArr = getProblem;
            let inProblemLinkArr = [];
            for (let x = 0; x < getProblem.length; x++) {
                inProblemLinkArr.push(getProblem[x].getText())
            }
            return Promise.all(inProblemLinkArr);
        }).then(function(ProblemLinkArr) {
            let InProblem;
            for(let x = 0; x < ProblemLinkArr.length; x++) {
                if(ProblemLinkArr[x].trim().includes(problem.title)) {
                    InProblem = gProblemArr[x];  
                    break;
                }
            }
            return InProblem;
        }).then(function (inEditing) {
            let enterEdit = inEditing.click();
            return enterEdit;
        }).then(function () {
            resolve();
        }).catch(function (error) {
            reject(error);
        })
    });
}

let EditorLink, gcode, gInputBlock;

function SolveQuestion(problem) { 
    return new Promise(function (resolve, reject) {
        let page = getUrl(problem);
        page.then(async function () {
            let proPage = driver.findElement(swd.By.css('.lang'));
            return proPage;
        }).then(function (problem) {
            let editor = problem.click();
            return editor;
        }).then(function () {
            let codeEditer = driver.findElement(swd.By.css('textarea.ace_text-input'));
            EditorLink = codeEditer;
            return codeEditer;
        }).then(function (codeEditer) {
            let afterEditing = codeEditer.sendKeys(swd.Key.CONTROL + "a");
            return afterEditing;
        }).then(function () {
            let afterEditing = EditorLink.sendKeys(swd.Key.DELETE);
            return afterEditing;
        }).then(function () {
            let readFile = fs.promises.readFile(path.join(problem.path, 'main.java'));
            return readFile;
        }).then(function (contents) {
            gcode = contents + "";
            let findinputBlock = driver.findElement(swd.By.css('#customInput'));
            return findinputBlock;
        }).then(function(findinputBlock) {
            gInputBlock = findinputBlock;
            let InInputBLock = findinputBlock.click();
            return InInputBLock;
        }).then(function() {
            let addText = gInputBlock.sendKeys(gcode);
            return addText;
        }).then(function() {
            let copInputBlock = gInputBlock.sendKeys(swd.Key.CONTROL + "a");
            return copInputBlock;
        }).then(function() {
            let copInputBlock = gInputBlock.sendKeys(swd.Key.CONTROL + "x");
            return copInputBlock;
        }).then(function() {
            let copInputBlock = EditorLink.sendKeys(swd.Key.CONTROL + "v");
            return copInputBlock;
        }).then(function () {
            let sumbit = driver.findElement(swd.By.css('a#submitCode'));
            return sumbit;
        }).then(function (submit) {
            let clickButton = submit.click();
            return clickButton;
        }).then(function () {
            return driver.wait(swd.until.elementLocated(swd.By.css('span.col.l7.s3')));
        }).then(function() {
            let testcases = driver.findElements(swd.By.css('#testCases'));
            return testcases;
        }).then(function(testCases) {
            let testCasesArr = [];

            for(let x = 0; x < testCases.length; x++) {
                let oneFullTestCase = testCases[x].findElements(swd.By.css('input[type=hidden]'));
                testCasesArr.push(oneFullTestCase);
            }
           return  Promise.all(testCasesArr);
        }).then(function(testCasesArr) {
            let rowArr = [];
            for(let x = 0; x < testCasesArr.length; x++) {
                let testCase = testCasesArr[x][0].getAttribute("value");
                let requiredOutput = testCasesArr[x][1].getAttribute("value");
                let actualOutput = testCasesArr[x][2].getAttribute("value");
                let OnePromiseArr = Promise.all([testCase, requiredOutput, actualOutput]);
                rowArr.push(OnePromiseArr);
            }
            return Promise.all(rowArr);
        }).then(function(rowArr) {
            let objArr = rowArr.map(function(row) {
                let rowObj = {};
                rowObj.input = row[0];
                rowObj.expected = row[1];
                rowObj.actual = row[2];
                return rowObj;
            });
            let testCaseWritten = fs.promises.writeFile(path.join(problem.path, "tc.json"), JSON.stringify(objArr));
            return testCaseWritten;
        }).then(function () {
            resolve();
        }).catch(function (err) {
            // resolve()
            console.log(err)
            reject(err);
        })
    });


}

readFile.then(function (contents) {
    let credentials = JSON.parse(contents)
    userName = credentials.un;
    password = credentials.pwd;

    let loginPage = driver.get('http://pepcoding.com/login');

    return loginPage;
}).then(function () {
    driver.manage().window().maximize();
    let userNameBox = driver.findElement(swd.By.css('input[type=email]'));
    let passwordBox = driver.findElement(swd.By.css('input[type=password]'));

    return Promise.all([userNameBox, passwordBox]);
}).then(function (elements) {
    let userNameEnter = elements[0].sendKeys(userName);
    let passwordEnter = elements[1].sendKeys(password)

    return Promise.all([userNameEnter, passwordEnter])
}).then(function () {
    let sumbitButton = driver.findElement(swd.By.css('button[type=submit]'))
    return sumbitButton
}).then(function (sumbitButton) {
    let loggedIn = sumbitButton.click();
    return loggedIn;
}).then(function () {
    let waitForPopUp = driver.wait(swd.until.elementLocated(swd.By.css('div.resource a')), 1000);
    return waitForPopUp;
}).then(function (rlinkPromesis) {
    let rlink = rlinkPromesis.getAttribute('href')
    let openResorses = driver.get(rlink);
    return openResorses;
}).then(function () {
    let findSiteOverlay = driver.findElement(swd.By.css("div#siteOverlay"));
    return findSiteOverlay;
}).then(function (soe) {
    let willWaitForSOToHide = driver.wait(swd.until.elementIsNotVisible(soe), 10000);
    return willWaitForSOToHide;
}).then(function () {
    let waitForSite = driver.wait(swd.until.elementLocated(swd.By.css('h2.courseInput')));
    return waitForSite;
}).then(function () {
    let courseElementsWillBeFoundPromise = driver.findElements(swd.By.css('h2.courseInput'));
    return courseElementsWillBeFoundPromise;
}).then(function (crsElements) {
    gcrsElements = crsElements;

    let ceTextPromises = [];
    for (let i = 0; i < gcrsElements.length; i++) {
        ceTextPromises.push(gcrsElements[i].getText());
    }

    let arrOfTexts = Promise.all(ceTextPromises);
    return arrOfTexts;
}).then(function (arrOfTexts) {
    console.log(arrOfTexts);
    for (let i = 0; i < arrOfTexts.length; i++) {
        if (cname === arrOfTexts[i]) {
            gci = i;
            break;
        }
    }
    let InCourse = gcrsElements[gci].click();
    return InCourse;
}).then(function () {
    url = driver.getCurrentUrl();
    let readFile = fs.promises.readFile(mdata);
    return readFile;
}).then(function (contents) {
    metadata = JSON.parse(contents);
    // console.log(metadata);
}).then(function () {
    let solvedArray = [];
    let rpf = SolveQuestion(metadata.questions[0]);
    for (let x = 1; x < metadata.questions.length; x++) {
        rpf = rpf.then(function () {
            return SolveQuestion(metadata.questions[x]);
        }).catch(function (err) {
            console.log(err);
        })

        // solvedArray.push(rpf);
    }

    let allSolvedQuestionsPromses = Promise.all(solvedArray);
    return allSolvedQuestionsPromses;
}).catch(function (err) {
    console.log(err);
}).finally(function () {

    // driver.quit();
})