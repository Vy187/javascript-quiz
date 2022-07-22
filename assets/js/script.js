currentQuestion = 0;
score = 75;
const questions = [
    {
        question: "Commonly used data types DO NOT include ______",
        a: "strings",
        b: "booleans",
        c: "alerts",
        d: "numbers",
        correct: "c"
    },
    {
        question: "The condition in an if/else statement is enclosed within ______",
        a: "quotes",
        b: "curly brackets",
        c: "parenthesis",
        d: "square brackers",
        correct: "b"
    },
    {
        question: "Arrays in JavaScript can be used to store ______",
        a: "numbers and strings",
        b: "other arrays",
        c: "booleans",
        d: "all of the above",
        correct: "d"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables",
        a: "commas",
        b: "curly brackets",
        c: "quotes",
        d: "parenthesis",
        correct: "c"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is ______",
        a: "Javascript",
        b: "terminal/bash",
        c: "for loops",
        d: "console.log",
        correct: "d"
    }
]

function renderQuestion() {
    document.querySelector("#question").textContent = questions[currentQuestion].question;
    document.querySelector("#a").textContent = "a. " + questions[currentQuestion].a;
    document.querySelector("#b").textContent = "b. " + questions[currentQuestion].b
    document.querySelector("#c").textContent = "c. " + questions[currentQuestion].c;
    document.querySelector("#d").textContent = "d. " + questions[currentQuestion].d;
}

function results() {
    document.querySelector("#a").remove();
    document.querySelector("#b").remove();
    document.querySelector("#c").remove();

    finalScoreP = document.createElement("p");
    container = document.createElement("aside");
    intialPrompt = document.createElement("p");
    intialText = document.createElement("input")

    document.querySelector("#questions").setAttribute("id", "results");
    document.querySelector("#question").setAttribute("id", "title");
    document.querySelector("#d").setAttribute("id", "submit")
    intialText.setAttribute("style", "text");
    intialText.setAttribute("id", "intial-text");

    document.querySelector("#title").textContent = "All Done!";
    document.querySelector("#submit").textContent = "Submit";
    finalScoreP.textContent = "Your final score is " + score + ".";
    intialPrompt.textContent = "Enter intials:";

    document.querySelector("#title").after(finalScoreP);
    finalScoreP.after(container);
    container.appendChild(intialPrompt);
    container.appendChild(intialText);
    container.appendChild(document.querySelector("#submit"));
}

function viewScores() {
    document.querySelector("section").remove();

    data = JSON.parse(localStorage.getItem("scores"));
    scoreOrder = 1;
    scoreboardS = document.createElement("section");
    scoreboardH1 = document.createElement("h1");
    restartB = document.createElement("button");
    clearB = document.createElement("button");

    scoreboardS.setAttribute("id", "scoreboard");
    restartB.setAttribute("id", "restart");
    clearB.setAttribute("id", "clear");

    scoreboardH1.textContent = "Scoreboard";
    restartB.textContent = "Restart";
    clearB.textContent = "Clear Scoreboard";

    document.querySelector("main").appendChild(scoreboardS);
    scoreboardS.appendChild(scoreboardH1);
    if (data != null) {
        for (i = 0; i < data.length; i++) {
            currentScore = document.createElement("p");
            currentScore.textContent = scoreOrder + ". " + data[i][0] + " - " + data[i][1];
            scoreboardS.appendChild(currentScore);
            scoreOrder++;
        }
    }
    scoreboardS.appendChild(restartB);
    scoreboardS.appendChild(clearB);

}

document.querySelector("main").addEventListener("click", function (event) {
    switch (event.target.getAttribute("id")) {
        case 'start':
            document.querySelector("#homepage").setAttribute("id", "questions");
            document.querySelector("#title").setAttribute("id", "question");
            document.querySelector("#description").remove();
            document.querySelector("#start").setAttribute("id", "a")

            b = document.createElement("button");
            c = document.createElement("button");
            d = document.createElement("button");
            selection = document.createElement("article");

            b.setAttribute("id", "b");
            c.setAttribute("id", "c");
            d.setAttribute("id", "d");
            selection.setAttribute("style", "visibility: hidden");

            document.querySelector("#questions").appendChild(b);
            document.querySelector("#questions").appendChild(c);
            document.querySelector("#questions").appendChild(d);
            document.querySelector("#questions").appendChild(selection);

            renderQuestion();

            timerInterval = setInterval(function () {
                if (score !== 0) {
                    score--;
                    document.querySelector("#timer").textContent = "Timer: " + score;
                } else {
                    document.querySelector("#timer").textContent = "Timer: " + score;
                    clearInterval(timerInterval);
                    results();
                }
            }, 1000)
            break;
        case 'a':
        case 'b':
        case 'c':
        case 'd':
            if (event.target.id == questions[currentQuestion].correct) {
                document.querySelector("article").textContent = "Correct!";
            } else {
                document.querySelector("article").textContent = "Wrong!";
                if (score > 10) {
                    score = score - 10;
                } else {
                    score = 0;
                }
            }

            document.querySelector("article").setAttribute("style", "visibility: visible");
            setTimeout(function () { document.querySelector("article").setAttribute("style", "visibility: hidden"); }, 1000)

            if (currentQuestion < 4) {
                currentQuestion++;
                renderQuestion();
            } else {
                clearInterval(timerInterval);
                document.querySelector("#timer").textContent = "Timer: " + score;
                results();
            }
            break;
        case 'submit':
            if (document.querySelector("#intial-text").value === "") {
                document.querySelector("article").textContent = "Cannot submit something blank";
            } else if (document.querySelector("#intial-text").value.length > 3) {
                document.querySelector("article").textContent = "Intials cannot be greater than 3 letters";
            } else if (!/^[a-zA-Z\s.,]+$/.test(document.querySelector("#intial-text").value)) {
                document.querySelector("article").textContent = "Intials cannot contain numbers";
            } else {
                tempScore = [document.querySelector("#intial-text").value.toUpperCase(), score];

                if (localStorage.getItem("scores") == null) {
                    localStorage.setItem("scores", JSON.stringify([tempScore]));
                } else {
                    addScore = JSON.parse(localStorage.getItem("scores"));
                    addScore.push(tempScore);
                    localStorage.setItem("scores", JSON.stringify(addScore));
                }
                viewScores();
            }

            if (document.querySelector("article") !== null) {
                document.querySelector("article").setAttribute("style", "visibility: visible");
                setTimeout(function () { document.querySelector("article").setAttribute("style", "visibility: hidden"); }, 1000)
            }
            break;
        case 'restart':
            window.location.reload();
            break;
        case 'clear':
            localStorage.removeItem("scores");
            viewScores();
            break;
    }
})