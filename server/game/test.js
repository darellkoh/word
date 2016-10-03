//tests speed of the trie dictionary lookup

var spellCheck = require('./spellCheck.js').isMatch;


var word;
var counter = 0;
var initTime = new Date().getTime();
for (var i = 0; i<words.length-10; i+=10){
	word = words[i];
	//checks every 10th word, as well as a non-word that would fall right after it
	spellCheck(word);
	spellCheck(word+'jz');
	counter+=2;
}
var endTime = new Date().getTime();

console.log((endTime-initTime)/counter); //last check averaged .007ms per word