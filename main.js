const cheerio = require("cheerio");
const request = require("request");
const path = require("path");
const fs = require("fs");
const extractIssues = require("./issues");

request("https://github.com/topics",maincb);

function maincb(err,response,html){
   if(err){
       console.error("Error : ",err);
   }else{
       bringTopics(html);
   }
}

function bringTopics(html){
    let  $ = cheerio.load(html);
    let upperLink = $(".d-flex.flex-wrap.flex-justify-start.flex-items-stretch.list-style-none.gutter.my-4 li");
    for(let i=0;i<$(upperLink).length;i++){
        let topiclink = $(upperLink[i]).find("a").attr("href");
        let link = "https://github.com"+topiclink;
        let maintopicname = link.split("/").pop();
        //console.log(maintopicname);
       getInsideTopics(link,maintopicname);
    }

    function getInsideTopics(link,maintopicname){
         request(link,cb);
         function cb(err,response,html){
              if(err){
                  console.error("error : ",err);
              }else{
                  top8topics(html,maintopicname);
              }
         }         
    }
}

function top8topics(html,maintopicname){
    let $ = cheerio.load(html);
    let topeight = $(".col-md-8.col-lg-9 article h1 .text-bold");
    let filePath = path.join(__dirname,maintopicname);
    dirCreator(filePath);
    
    for(let i=0;i<8;i++){
        let linktorepo = $(topeight[i]).attr("href");
        let nameofrepo = $(topeight[i]).text().trim();
       // console.log(nameofrepo);
        goInsideIssuePage("https://github.com"+linktorepo+"/issues",nameofrepo,filePath);       
    }

    function goInsideIssuePage(link,name,filePath){
        request(link,cb);
        function cb(err,response,html){
             if(err)
              console.error("Error : ",err);
             else{
                 extractIssues(html,name,filePath);
             } 
        }
        //console.log(link);
    }   
}

function dirCreator(filePath){
     if(fs.existsSync(filePath)==false){
         fs.mkdirSync(filePath);
     }
}



