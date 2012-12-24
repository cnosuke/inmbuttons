/*
	inm btn created by moosan63
*/

var SOUND_PATH = "./sounds/";

var play = function(element){
	var name = element.getAttribute("name");
	var file_path = SOUND_PATH + name + ".mp3";
	var audio = new Audio(file_path);
	audio.play();
};