var triviaQuestions = [{
  question: 'Who had a hit with "Bad Boys"?',
	answerList: ['Duran Duran', 'Wham!', 'Elton John', 'Olivia Newton John'],
	answer: 1
},{
  question: 'Who is known as the Piano Man?',
	answerList: ['Elton John', 'Prince', 'Freddie Mercury', 'Billy Joel'],
  answer: 3
},
{
  question: 'Who was married to Sean Penn?',
	answerList: ['Cindy Lauper', 'Tiffany', 'Madonna', 'Debbie Gibson'],
  answer: 2
},
{
  question: 'Who sang "Nothing at All"?',
	answerList: ['Jets', 'Roxette', 'Heart', 'Devo'],
  answer: 3
},
{
  question: 'Who welcomed us to the Jungle?',
	answerList: ['Guns n Roses', 'Duran Duran', 'Weird Al', 'Van Halen'],
  answer: 0
},
{
  question: 'Who remade "Mama dont Dance"?',
	answerList: ['Rick Springfield','Boy George','George Michael','Poison'],
  answer: 3
},
{
  question: 'Who had a video staring a Captain Lou Albano?',
	answerList: ['Sinead Oconner', 'Cindy Lauper', 'AC/DC','Madonna'],
  answer: 1
},
{
  question: 'Who warned against talking to strangers?',
	answerList: ['Rick Springfield','Boy George','George Michael','Poisen'],
  answer: 0
},
{
  question: 'Who gave John Travolta chills?',
	answerList: ['Duran Duran', 'Wham!', 'Elton John', 'Olivia Newton John'],
  answer: 3
},
{
  question: "Who sent us all The Message?",
	answerList: ['Guns n Roses', 'Duran Duran', 'Grand Master Flash', 'Police'],
  answer: 2
},
{
  question: "Who told us It's Tricky?",
	answerList: ['Elton John', 'Run DMC', 'Grand Master Flash', 'Alicia Silverstone'],
  answer: 1
}];

    

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11'];

var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "So cool, you got it right!",
	incorrect: "Gag me with a spoon, that's so not right.",
	endTime: "Out of time!",
  finished: "How did you score?"
}

// Why in the heck won't this work!!!
$(document).on('click','#startBtn', function(){
	console.log('lol')
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
