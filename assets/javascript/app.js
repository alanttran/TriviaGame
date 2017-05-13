$(document).ready(function() {
    var questions = [{
        question: "What type of animal is known as the ship of the desert?",
        choices: ["Snake", "Camel", "Cougar", "Rabbit", "Coyote"],
        correctAnswer: "Camel"
    }, {
        question: "What is the largest island in the Caribbean Sea?",
        choices: ["Antigua", "Virgin-Gorda", "Barbuda", "Cuba", "Nevis"],
        correctAnswer: "Cuba"
    }, {
        question: "In what year was the US Constitution written?",
        choices: [1673, 1787, 1989, 1750, 1560],
        correctAnswer: 1787
    }, {
        question: "What is name of the scale used to measure the spicy heat of peppers?",
        choices: ["Scoville-scale", "Fahrenheit", "Death", "Celsius", "Kelvin"],
        correctAnswer: "Scoville-scale"
    }, {
        question: "The martial art of kung fu originated in which country?",
        choices: ["Russia", "United-States", "Thailand", "Japan", "China"],
        correctAnswer: "China"
    }];

    var totalQuestions = questions.length;
    var questionCounter = -1;
    var correctAnswer = 0;
    var countdown;

    startTimer();

    // starts the timer
    // if timer hits 0, then the correct answer blinks for 5 seconds
    // calls nextQuestion
	function startTimer() {
        console.log('starttimerfunction')
        var counter = 10;
        $('#countdown').html(counter);
        nextQuestion();
        countdown = setInterval(function() {
            counter--;
            $('#countdown').html(counter);
            console.log(counter);
            if (counter <= 0) {
                counter = 0;

                $('#countdown').html(counter);
                $(".answer-choice[data-value = " + questions[questionCounter].correctAnswer + "]").css('color', 'blue').addClass('blink');;
                clearInterval(countdown);
                setTimeout(function() {
                    startTimer();
                }, 5000);
            }
        }, 1000);
    }


    // checks to see if all the questions are done
    function outOfQuestionsCheck(){
    	if(questionCounter === totalQuestions){
    		return true;
    	}
    	else{
    		return false;
    	}
    }

    // initiates the end game
    // shows modal of user's game status
    function endTrivia(){ 
    	clearInterval(countdown);
    	$('.modal-body').html('You completed ' + correctAnswer + "/" + questions.length + " questions!");
    	$('#myModal').modal();
    }

    // injects question to the HTML
    // injects all the question choices
    // checks to see if game needs to end
    function nextQuestion() {
        questionCounter++;
        if(outOfQuestionsCheck()){
        	endTrivia();
        }
        $('#question').html(questions[questionCounter].question);
        var answerChoices = "";
        $.each(questions[questionCounter].choices, function(i, val) {
            answerChoices += "<div class = 'answer-choice' data-value = '" + val + "'>" + val + "</div>";
        })
        $('#choices').html(answerChoices);

    }

    // if any choice gets clicked
    // check to see if answer matches, apply green, blink
    // if wrong, then apply red, blink correct answer
    // initiate startTimer() after 5 seconds
    $(document).on('click', '.answer-choice', function() {
        console.log('answer-choice click');
        console.log($(this).attr('data-value'));
        console.log(questions[questionCounter].correctAnswer);
        clearInterval(countdown);

        if ($(this).attr('data-value') === questions[questionCounter].correctAnswer.toString()) {
            console.log('correct!');
            correctAnswer++;
            $(this).css('color', 'green').addClass('blink');

            //startTimer();
        } else {
            console.log('wrong!');
            $(this).css('color', 'red');
            $(".answer-choice[data-value = " + questions[questionCounter].correctAnswer + "]").addClass('blink');
            
        }
        setTimeout(function() {
            startTimer();
        }, 5000);
    });

    $('#newGame').on('click', function(){
    	location.reload();
    });

});
