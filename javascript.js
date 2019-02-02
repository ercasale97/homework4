var currentQuestion = 0;
var correctAnswers = 0;
var triviaOver = false;

var questions = [{
    question: "In Florida, it is illegal to",
    choices: ["Fart in a public place after 6 PM on Thursdays", "Tie a rhino to a parking meter", "Own more than 50 hair dryers without a license", "Shower with your clothes on"],
    correctAnswer: 2
}, {
    question: "In Baltimore, Maryland, it is illegal to take what to the movies?",
    choices: ["Your mother-in-law", "Piglets", "A lion", "A swarm of bees"],
    correctAnswer: 3
}, {
    question: "Which of these are illegal in Alabama?",
    choices: ["Wearing masks in private", "Females spitting in front of other females", "Playing dominoes on Friday", "Wearing a fake moustache that causes laughter in church"],
    correctAnswer: 4
}, {
    question: "Citizens are not allowed to take a shower on Wednesday in what state?",
    choices: ["Wyoming", "Minnesota", "California", "Texas"],
    correctAnswer: 1
}, {
    question: "It is illegal to do what to a fish in Ohio?",
    choices: ["Throw it back in the river after catching it", "Fry it on Sunday", "Get it drunk", "Name it Fido"],
    correctAnswer: 3
}];


//timer
$(document).ready(function () {

var count = 15;
var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;
  count--;
  if (count === 0){
    clearInterval(interval);
    document.getElementById('count').innerHTML='Please choose an answer';
    alert("You're out of time!");
  }
}, 1000);
//end of timer


    // questions
    displayCurrentQuestion();
    $(this).find(".message").hide();

    $(this).find(".nextButton").on("click", function () {
        if (!triviaOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".message").text("Please select an answer");
                $(document).find(".message").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".message").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                  
                }
            }
        } else { 
            triviaOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".container > .question");
    var choiceList = $(document).find(".container > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="choice" />' + choice + '</li>').appendTo(choiceList);
    }
}

function displayScore() {
    $(document).find(".container > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".container > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
