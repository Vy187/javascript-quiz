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
    document.querySelector("#container-homepage").setAttribute("id", "container-question");
    document.querySelector("#title").setAttribute("id", "question");
    document.querySelector("#description").remove();
    document.querySelector("#start").setAttribute("id", "a")

    b = document.createElement("button");
    c = document.createElement("button");
    d = document.createElement("button");

    b.setAttribute("id", "b");
    c.setAttribute("id", "c");
    d.setAttribute("id", "d");

    document.querySelector("#container-question").appendChild(b);
    document.querySelector("#container-question").appendChild(c);
    document.querySelector("#container-question").appendChild(d);
}

document.querySelector("button").addEventListener("click", function (event) {
    switch (event.target.getAttribute("id")) {
        case 'start':
            renderQuestion();
            break;
    }
})