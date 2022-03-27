var highScores = document.querySelector(".high-scores");
var scoreList = [];

if (JSON.parse(localStorage.getItem("High Scores"))) {
    scoreList = JSON.parse(localStorage.getItem("High Scores"));
}

for (let i = 0; i < scoreList.length; i++) {
    
    var li = document.createElement("li");
    li.innerText = scoreList[i].initials + ":" + scoreList[i].score;
    highScores.appendChild(li);

}