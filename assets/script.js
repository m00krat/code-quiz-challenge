//variables
var score = 0;
var questionStart = 0;
var secsLeft = 60; 
var intervalTime = 0; 
var penaltyTime = 10;

var currentTime = document.querySelector("#time");
var timer = document.querySelector("#startQuiz");
var questionsDiv = document.querySelector("#questionsDiv");
var container = document.querySelector("#container");

var ulCreateEl = document.createElement("ul");

//'questions' variable with answers inside
var questions = [
    {
        question: "What does CSS stand for?",
        answers: ["Closing Serial Sheet", "Cascading Style Sheets", "Coding Simple Style", "Cockroach Santa Serebelum"],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "What is not a built in HTML element?",
        answers: ["<div>","<head>","<button>","<box>"],
        correctAnswer: "<box>"
    },
    {
        question: "CSS codes are mainly written in what language?",
        answers: ["C++","Python","HTML","Javascript"],
        correctAnswer: "C++"
    },
    {
        question: "What does the following mean to the computer? div p {color: #fff;}",
        answers: ["The div p element will be blue","The div p element will be red","The div p element will be black","The div p element will be white"],
        correctAnswer: "The div p element will be white"
    },
    {
        question: "Which of the following type of variable is visible everywhere in your JavaScript code?",
        answers: ["local variable","serial variable","global variable","none of the above"],
        correctAnswer: "global variable"
    },
    {
        question: "Is GitBash fun and easy to use?",
        answers: ["Ofcourse!","Yeah I thinks so","Piece of cake","hell no."],
        correctAnswer: "hell no."
    }
];

timer.addEventListener("click", function () {
    //checks for time to be 0
    if (intervalTime === 0) {
        intervalTime = setInterval(function () {
            secsLeft--;
            currentTime.textContent = "Time: " + secsLeft;
            if (secsLeft <= 0) {
                clearInterval(intervalTime);
                finished();
                currentTime.textContent = "Time is up! Put down your pencils!.. or mouse I guess...";
            }
        }, 1000);
    }
    render(questionStart);
});

//sets questions and choices to page: 
function render(questionStart) {
    questionsDiv.innerHTML = "";
    ulCreateEl.innerHTML = "";
    //loops through all info in array
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionStart].question;
        var userChoices = questions[questionStart].answers;
        questionsDiv.textContent = userQuestion;
    }
    //new 'forEach' for question choices
    userChoices.forEach(function (item) {
        var listedItem = document.createElement("li");
        listedItem.textContent = item;
        questionsDiv.appendChild(ulCreateEl);
        ulCreateEl.appendChild(listedItem);
        listedItem.addEventListener("click", (check));
    })
}
//check choices and answer
function check(event) {
    var eventTarget = event.target;

    if (eventTarget.matches("li")) {

        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv");

        if (eventTarget.textContent == questions[questionStart].correctAnswer) {
            score++;
            newDiv.textContent = "Correct! The answer is:  " + questions[questionStart].correctAnswer;
        
        } else {
            //takes 10 seconds off timer for every wrong answer
            secsLeft = secsLeft - penaltyTime;
            newDiv.textContent = "Wrong! The correct answer is:  " + questions[questionStart].correctAnswer;
        }

    }
    //questionStart knows the question number the user is on
    questionStart++;

    if (questionStart >= questions.length) {
        //finished() will append last page with user stats
        finished();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionStart);
    }
    questionsDiv.appendChild(createDiv);

}
//finished() will append last page
function finished() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    //newH1 heading element
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Finished!"
    questionsDiv.appendChild(newH1);

    //newP paragraph element
    var newP = document.createElement("p");
    newP.setAttribute("id", "newP");

    questionsDiv.appendChild(newP);

    //calculates time left and makes the time remainng the users score
    if (secsLeft >= 0) {
        var timeRemaining = secsLeft;
        var newP2 = document.createElement("p");
        clearInterval(intervalTime);
        newP.textContent = "Your score is: " + timeRemaining + "/" + "60";

        questionsDiv.appendChild(newP2);
    }

    //newLabel label element
    var newLabel = document.createElement("label");
    newLabel.setAttribute("id", "newLabel");
    newLabel.textContent = "Enter your initials:";

    questionsDiv.appendChild(newLabel);

    //newInput element
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "initials");
    newInput.textContent = "";

    questionsDiv.appendChild(newInput);

    // submit
    var newSubmit = document.createElement("button");
    newSubmit.setAttribute("type", "submit");
    newSubmit.setAttribute("id", "submit");
    newSubmit.textContent = "Submit";

    questionsDiv.appendChild(newSubmit);

    //listening for initials and score
    newSubmit.addEventListener("click", function () {
        var initials = newInput.value;

        if (initials === null) {

            console.log("You have to enter something");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var scores = localStorage.getItem("scores");
            if (scores === null) {
                scores = [];
            } else {
                scores = JSON.parse(scores);
            }
            scores.push(finalScore);
            var newScore = JSON.stringify(scores);
            localStorage.setItem("scores", newScore);
            
            window.location.replace("./highscores.html");
        }
    });

}