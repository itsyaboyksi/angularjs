var app=angular.module("HangMan Game", []);
app.controller("GameController", ['$scope', '$timeout', function($scope,$timeout){

var words = ["ratata", "catan", "buttonwa", "mat"];
$scope.incorrectLetterChosen = [];
$scope.correctLetterChosen = [];
var selectedWord = "";
$scope.guesses = 6;
$scope.displayWord = '';
$scope.input = {
	letter: ''
};

var selectRandomWord = function() {
	var index = Math.round(Math.random()*words.length)
	if (index == 0) {
		index = 1;
	}
	return words[index];
}

var newGame = function() {
	$scope.incorrectLetterChosen = [];
	$scope.correctLetterChosen = [];
	$scope.guesses = 6;
	$scope.displayWord = '';
	selectedWord = selectRandomWord();
	var tempDisplayWord = '';
	for (var i = 0; i < selectedWord.length; i++) {
		tempDisplayWord += "*"
	}
	$scope.displayWord = tempDisplayWord;
}

$scope.letterChosen = function() {

	for (var i = 0; i < $scope.correctLetterChosen.length; i++) {
		if ($scope.correctLetterChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
			$scope.input.letter = "";
			return;
		}
	}

	for (var i = 0; i < $scope.incorrectLetterChosen.length; i++) {
		if ($scope.incorrectLetterChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
			$scope.input.letter = "";
			return;
		}
	}

	var correct = false;

	for (var i = 0; i < selectedWord.length; i++) {
		if(selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()){
			$scope.displayWord = $scope.displayWord.slice(0,i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i+1);
			correct = true;
		}
	}

	if (correct) {
		$scope.correctLetterChosen.push($scope.input.letter.toUpperCase());
	}
	else{

		$scope.guesses--;
		$scope.incorrectLetterChosen.push($scope.input.letter.toUpperCase());
	}

	$scope.input.letter = '';
	
	if($scope.guesses == 0){
		$timeout(function(){
			newGame();
		}, 500);
	}

	if($scope.displayWord.indexOf("*") == -1){
		$timeout(function(){
			newGame();
		}, 500);
	}
}

newGame();
}]);