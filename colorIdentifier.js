// Color Identifier Script. Should probably add the special char purge to utilities if it's not there already, huh.

const fs = require('fs');


function specialCharPurge(word){
    const specialChars = [',','.','!','?','"',"'","`","(",")","-"];
    return word.split('').filter(char => !(specialChars.includes(char))).join('') //Splits the word into an array, kills every char that is in the special chars list, and rejoins all the remaining things
}


//Probably not the most efficient method but eh
function identifyColorsFile(file,encoding){
    let allWordsInText = fs.readFileSync(file,encoding).split(' '); //I don't want to play with callbacks today thanks. sync version it is.
    allWordsInText = allWordsInText.map(specialCharPurge);
    allWordsInText = allWordsInText.map(word => word.toLowerCase())
    const colorArray = [
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "magenta",
    "purple",
    "white",
    "black",
    "gray",
    "grey",
    "silver",
    "pink",
    "maroon",
    "brown",
    "beige",
    "tan",
    "peach",
    "lime",
    "olive",
    "turquoise",
    "teal",
    "navy blue",
    "indigo",
    "violet",]
    let colors = allWordsInText.filter(word => colorArray.includes(word));
    const resultArray = [];
    const colorLength = colors.length;
    for(let i = 0; i < colorLength; i++){
        console.log(`\n\ncolors: ${colors}; i: ${i}`)
        let underConsideration = colors.shift();
        console.log(`colors: ${colors}; underConsideration: ${underConsideration}`)
        colors = colors.filter(color => !(color == underConsideration)); //removes everything that is identical to the popped-off color
        resultArray.push(underConsideration);
    }
    //See, now I could have done it so that in the colors = colors.filter(blahblah => blah) that the callback would reduce colorLength by one each time it removed a duplicate. This would probably fix the problem in a sensible way.
    //But this is faster lol
    return resultArray.filter(color => color !== undefined)
}


// A modified version of the above, which instead of just filtering out duplicates, adds them to an array and then records the length of this array + 1. Pushes a tuple-like list with the color and this number instead of just the color, so that a complete record of all colors appearing in a text, plus how many times they occur, is produced. 
function countColors(file,encoding){ 
    let allWordsInText = fs.readFileSync(file,encoding).split(' ');
    allWordsInText = allWordsInText.map(specialCharPurge);
    allWordsInText = allWordsInText.map(word => word.toLowerCase())
    const colorArray = [
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "magenta",
    "purple",
    "white",
    "black",
    "gray",
    "grey",
    "silver",
    "pink",
    "maroon",
    "brown",
    "beige",
    "tan",
    "peach",
    "lime",
    "olive",
    "turquoise",
    "teal",
    "navy blue",
    "indigo",
    "violet",]
    let colors = allWordsInText.filter(word => colorArray.includes(word));
    const resultArray = [];
    let colorLength = colors.length;
    for(let i = 0; i < colorLength; i++){
        let underConsideration = colors.shift();
        const allInstancesOfThatColor = colors.filter(color => color == underConsideration); 
        colors = colors.filter(color => {
            if(color == underConsideration){
                colorLength -= 1;
                return false;
            } else{
                return true;
            }}); //removes everything that is identical to the popped-off color
        resultArray.push([underConsideration,allInstancesOfThatColor.length + 1]);
    }
    //But this is faster lol
    return resultArray.filter(color => color !== undefined)
}

console.log(identifyColorsFile("./exampleFile.txt","utf-8"))
console.log(countColors("./exampleFile.txt","utf-8"))

//maybe find a way to make this work with colors in words. Like if someone was doing an essay on Game of Thrones and wanted to detect for "Greyworm"