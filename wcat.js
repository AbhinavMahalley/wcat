#!/usr/bin/env node

let fs=require("fs");

// input
let inputArr = process.argv.slice(2);

//options
let optionsArr = [];
let filesArr = [];
//identify -> options
for(let i=0;i<inputArr.length;i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        optionsArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }
}

// options check (edge case -n and -b both includes only 1st enter option should work)
if(optionsArr.includes("-n") && optionsArr.includes("-b")){
    let tempArr=[];
    for(let i=0;i<optionsArr.length;i++){
        if(optionsArr[i]=="-n"){
            tempArr.push(optionsArr[i]);
            break;
        }
        if(optionsArr[i]=="-b"){
            tempArr.push(optionsArr[i]);
            break;
        }
    }
// if -s also include with -n -b (wcat.js -s -n -b or -s -b -n ,etc then possible condition -s -n or -s -b)
    if(optionsArr.includes("-s")){
        tempArr.push("-s");
    }
    optionsArr=tempArr;
}

// file exist or not
for(let i=0;i<filesArr.length;i++){
    let isPresent =fs.existsSync(filesArr[i]);
    if(isPresent==false){
        console.log(`file ${filesArr[i]} is not present`);
        return;
    }
}

// read contents of file/files
let content = "";
for(let i=0;i<filesArr.length;i++){
    //buffer
    let bufferContent = fs.readFileSync(filesArr[i]);
    content += bufferContent+"\r\n";
}

//split content array
let contentArr=content.split("\r\n");
// console.log(contentArr);

// ***********  -s   *************
let isSPresent = optionsArr.includes("-s");
if(isSPresent==true){

    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]==""&&contentArr[i-1]==""){
            contentArr[i]=null;
        }else if(contentArr[i]==""&&contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }

    let tempArr=[];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
        tempArr.push(contentArr[i]);
        }
    }

    contentArr=tempArr;
}

// ************  -n   ************
let isNPresent = optionsArr.includes("-n");
if(isNPresent==true){
   
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=`${i+1} ${contentArr[i]}`;
    }

}


//  ****************    -b  *************
let isBPresent = optionsArr.includes("-b");
if(isBPresent==true){
   let count=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i]=`${count} ${contentArr[i]}`;
            count++;
        }
    }

}

// display contents of files according the command
console.log(contentArr.join("\n"));

