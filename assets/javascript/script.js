console.log("Jeans app works!")

$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    // questions options and answers data
    questions: {
      q1: 'Who had a hit with "Bad Boys"?',
      q2: 'Who is known as the Piano Man?',
      q3: 'Who was married to Sean Penn?',
      q4: 'Who sang "Nothing at All"?',
      q5: "Who welcomed us to the Jungle?",
      q6: 'Who remade "Mama dont Dance"?',
      q7: "Who had a video staring a Captain Lou Albano?",
      q8: "Who warned against talking to strangers?",
      q9: "Who gave John Travolta chills?",
      q10: "Who sent The Message?",
      q11: "Who told us to was Tricky when they sang Walk This Way with Aerosmith"
      
    },
    options: {
      q1: ['Duran Duran', 'Wham!', 'Elton John', 'Olivia Newton John'],
      q2: ['Elton John', 'Prince', 'Freddie Mercury', 'Billy Joel'],
      q3: ['Cindy Lauper', 'Tiffany', 'Madonna', 'Debbie Gibson'],
      q4: ['Jets', 'Roxette', 'Heart', 'Devo'],
      q5: ['Guns n Roses', 'Duran Duran', 'Weird Al', 'Van Halen'],
      q6: ['Rick Springfield','Boy George','George Michael','Poisen'],
      q7: ['Sinead Oconner', 'Cindy Lauper', 'AC/DC','Madonna'],
      q8: ['Rick Springfield','Boy George','George Michael','Poisen'],
      q9: ['Duran Duran', 'Wham!', 'Elton John', 'Olivia Newton John'],
      q10: ['Guns n Roses', 'Duran Duran', 'Grand Master Flash', 'Police'],
      q11: ['Elton John', 'Run DMC', 'Grand Master Flash', 'Alicia Silverstone'],
    },
    answers: {
      q1: 'Wham',
      q2: 'Billy Joel',
      q3: 'Madonna',
      q4: 'Heart',
      q5: 'Rac',
      q6: 'Poisen',
      q7: "Cindy Lauper",
      q8: "Rick Springfield",
      q9: "Olivia Newton John",
      q10: "Grand Master Flash",
      q11: "Run DMC"
    },
   
    //  initialize game
    startGame: function(){
      // restarting game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      // show game section
      $('#game').show();
      
      //  empty last results
      $('#results').html('');
      
      // show timer
      $('#timer').text(trivia.timer);
      
      // remove start button
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // ask first question
      trivia.nextQuestion();
      
    },
    // method to loop through and display questions and options 
    nextQuestion : function(){
      
      // set timer to 20 seconds each question
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      // to prevent timer speed up
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      // gets all the questions then indexes the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      // an array of all the user options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // the time has run out and increment unanswered, run result
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        // hide game sction
        $('#game').hide();
        
        // show start button to begin a new game
        $('#start').show();
      }
      
    },
    // method to evaluate the option clicked
    guessChecker : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      // if the text of the option picked matches the answer of the current question, increment correct
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // else the user picked the wrong option, increment incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      trivia.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivia.nextQuestion();
       
    }
  
  }

  
  