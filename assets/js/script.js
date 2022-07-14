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

currentQuestion = 0;
score = 75;

function timer() {
    var timerInterval = setInterval(function () {
        score--;
        document.querySelector("#timer").textContent = "Timer: " + score;

        if (score < 0) {
            score = 0;
            document.querySelector("#timer").textContent = "Timer: " + score;
            clearInterval(timerInterval);
        }
    }, 1000)
}

function setupQuestion() {
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
}

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
    finalScoreP.setAttribute("id", "final");
    intialPrompt.setAttribute("id", "prompt");
    intialText.setAttribute("style", "text", "id", "intialText");

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

document.querySelector("section").addEventListener("click", function (event) {
    switch (event.target.getAttribute("id")) {
        case 'start':
            setupQuestion();
            timer();
            break;
        case 'a':
        case 'b':
        case 'c':
        case 'd':
            if (event.target.id == questions[currentQuestion].correct) {
                document.querySelector("article").textContent = "Correct!";
                document.querySelector("article").setAttribute("style", "visibility: visible");
            } else {
                document.querySelector("article").textContent = "Wrong!";
                document.querySelector("article").setAttribute("style", "visibility: visible");
                score = score - 10;
            }
            setTimeout(function () { document.querySelector("article").setAttribute("style", "visibility: hidden"); }, 1000)
            if (currentQuestion < 4) {
                currentQuestion++;
                renderQuestion();
            } else {
                results();
            }

            break;
    }
})