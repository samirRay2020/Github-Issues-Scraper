const cheerio = require("cheerio");
const request = require("request");
const pdfkit = require("pdfkit");
const fs = require("fs");
const path = require("path");
function extractIssues(html,name,filePath){
     let $ =  cheerio.load(html);
     let issuesEleArr = $(".flex-auto.min-width-0.p-2.pr-3.pr-md-2");
    arr = [];
    for(let i=0;i<issuesEleArr.length;i++){
        let issue = $(issuesEleArr[i]).find("a").attr("href");
        arr.push(issue);
    } 
    let mainpath = path.join(filePath,name+".pdf");
    let txt = JSON.stringify(arr);
    let pdfdoc = new pdfkit();
    pdfdoc.pipe(fs.createWriteStream(mainpath));
    pdfdoc.text(txt);
    pdfdoc.end();
}


module.exports = extractIssues;