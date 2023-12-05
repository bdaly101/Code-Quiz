var timer = document.querySelector(".timer");
var startBtn = document.querySelector(".start")
var quesBox = document.querySelector(".quesBox");
var qButton = document.querySelectorAll("#qButton");
var highScoreBtn = document.querySelector(".highScore");
var header = document.querySelector(".pageHead");
var qNumber = 0;
var body = document.querySelector(".mainBody");
var quesList = document.querySelector(".quesList");
var ans = document.querySelector(".answer");
var hiddenEl = document.querySelectorAll(".hidden");
var corrAns = 0;
var initials = document.querySelector(".enterInitials");
var allScores = []
var currIndex = 0;
var isQuiz = false;
var newInitials = ""
var initTxt;
var initBox;
var submitBtn;


var question1 = {
    question: 'What does HTML stand for?',
    options: ["Hyper Trainer Marking Language", 'Hyper Text Markup Language', ' Hyperlinks and Text Markup Language','Home Tool Markup Language'],
    answer: 1

}
var question2 = {
    question: 'What is the purpose of CSS in web development?',
    options: ["To structure the content of web pages", 'To add styling to web pages', 'To add interactivity to web pages', 'To create and manage databases'],
    answer: 1

}
var question3 = {
    question: 'Which of the following is a JavaScript data type?',
    options: ["element", 'tag', 'Number', 'style'],
    answer: 2
}
var question4 = {
    question: 'Which tag is used to create a hyperlink in HTML?',
    options: ["<link>", '<href>', '<hyperlink>', '<a>'],
    answer: 3
}

var question5 = {
    question: 'How do you change the text color to red in CSS?',
    options: ["color: red;", 'text-color: red;', 'font-color: red;', 'text-style: color-red;'],
    answer: 0
}

var allQuestions = [question1,question2,question3,question4,question5];
var currQues = allQuestions[currIndex];

for (var i = 0; i<hiddenEl.length; i++) {
    hiddenEl[i].textContent = ""
}
var goBack;
var editScores;
var scoresList;

function viewScores() {
    header.textContent = "High Scores";
    highScoreBtn.textContent = "";
    timer.textContent = "";
    quesBox.textContent = "";
    initials.setAttribute("id", "scoreList");
    if (initTxt) {
        initTxt.textContent = "";
    }
    if (submitBtn) {
        submitBtn.textContent = "";
    }

    for (var i = 0; i < allScores.length; i++) {
        scoresList = document.createElement("p");
        scoresList.textContent = allScores[i];
        initials.appendChild(scoresList);
    }
    editExit = document.createElement("section");
    body.appendChild(editExit);
    goBack = document.createElement("p");
    goBack.textContent = "Go Back";
    editExit.appendChild(goBack);
    goBack.addEventListener("click", function(event) {
        highScoreBtn.textContent = "View High Scores";
        timer.textContent = "Time: 0";
        header.textContent = "Coding Quiz Challenge";
        quesBox.textContent = "Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score by ten seconds!";
        startBtn.textContent = "Start Quiz";
        initials.textContent = "";
        goBack.remove();
    })
    
}

highScoreBtn.addEventListener('click', function(event) {
    startBtn.textContent = ""
    viewScores()
    console.log("a")
})

function endQuiz() {
    isQuiz = false;
    stopTime();
    initials.setAttribute("id", "none");
    quesList.textContent = "";
    ans.textContent = "";
    header.textContent = "All done!";
    quesBox.textContent = "Your final score is " + corrAns;
    initTxt = document.createElement("p");
    initTxt.textContent = "Enter Initials:"
    initBox = document.createElement("input");
    initBox.setAttribute("type", "text");
    submitBtn = document.createElement("p");
    submitBtn.setAttribute("class", "btn");
    submitBtn.textContent = "Submit";
    initials.appendChild(initTxt);
    initials.appendChild(initBox);
    initials.appendChild(submitBtn);
    
    
    submitBtn.addEventListener("click", function(event) {
        newInitials = initBox.value;
        console.log(newInitials);
        allScores.push(newInitials + " - " + corrAns);
        console.log(allScores);
        initBox.remove()
        viewScores();
        
    }) 
}
var timeLeft;
var timerInt;

function stopTime() {
    clearInterval(timerInt);
    timer.textContent = "Time: " + timeLeft;
  }

function setTime() {
    timer.textContent = "Time: " + timeLeft;
    timerInt = setInterval(function() {
      timeLeft--;
      timer.textContent = "Time: " + timeLeft;
      if(timeLeft === 0) {
        if (isQuiz === true) {
            endQuiz();
        }
        clearInterval(timerInt);
      }
  
    }, 1000);
  }

function next() {
    currIndex += 1;
    currQues = allQuestions[currIndex];
}

function renderPage() {
    header.textContent = currQues.question;
    for (var i = 0; i<4; i++) {
        quesList.children[i].textContent = currQues.options[i];
    }
    
}

startBtn.addEventListener("click", function() {
    //Iterate through questions
    isQuiz = true;
    corrAns = 0;
    timeLeft = 75;
    currIndex = 0;
    currQues = allQuestions[currIndex];
    setTime();
    for (var i = 1; i<5; i++) {
        var listEl = document.createElement('li');
        listEl.setAttribute('id', 'qButton');
        listEl.setAttribute("class", "btn");
        listEl.setAttribute('value', i);
        listEl.textContent = currQues.options[i];
        quesList.appendChild(listEl);
    }
    quesBox.textContent = ""
    renderPage()
    startBtn.textContent = ""
    
})

quesList.addEventListener("click", function(event) {
    var element = event.target;

    if (element.textContent === currQues.options[currQues.answer]) {
        corrAns += 1;
        ans.textContent = "Correct!";
    }
    else {
        ans.textContent = "Wrong!";
        console.log(timeLeft)
        if ((timeLeft - 15) < 0) {
            console.log("a")
            timeLeft = 0;
            //endQuiz();
            //header.textContent = "All Done!";
        }
        else {
            timeLeft -= 15;
        }
        
    }
    if (currIndex === (allQuestions.length-1) || timeLeft === 0) {
        endQuiz();
    }
    else {
        next();
        renderPage();
    }
})





