//////////////////////////////////////////////////////////////FUN FACT//////////////////////////////////////////////////////////////
/*
Did you know that only doing crunches will not get rid of belly fat?|Unfortunately we can’t spot reduce.  The best way to target abdominal fat is to reduce your overall body fat, which means plenty of cardio, combined with strength training. Stick to it, because oftentimes the first place you gain weight is the last place you lose it.
Did you know that eating after 8 doesn’t necessarily mean you’ll gain weight?|The fact is: what you eat, how much you eat, and how much physical activity you do determines whether you gain or lose weight.  Morning noon or night, when you eat too much your body stores excess calories as fat.
Did you know that exercise could help reduce anxiety?|Exercise provides distraction, reduces muscle tension, improves resilience, builds brain resources, and sets you free from disabling thoughts and emotions.  Exercise frees your mind and helps you take action.
Did you know that effective goal setting is still one of the most proven methods for losing weight and breaking exercise plateaus?|Exercise alleviates the ambiguity of “doing your best” or “trying your hardest.”  Specific, challenging goals lead to better performance and more commitment.
Dieting dulls the mind.|Studies have shown there is a link between dieting and mental performance. The reduction in working memory capacity occurs because slimmers' brains are so preoccupied with dieting that other brain processes don't get a look in.
Did you know that if you’re trying to lose weight, the three most helpful sections of the food label are right at the top: Serving size, servings per container, and calories per serving?|Read the label and be careful. If there are two servings and you eat both, unfortunately you double the calories, double the fat, and double the trouble.
Did you know that we are all motivated to exercise and stay healthy for different reasons?|It’s also important to recognize that our motivations may change over time. Being clear about your motivations and embracing the types of exercise that you enjoy and make you feel successful are key factors toward adherence.
Breakfast is the most important meal and eating it can help lose weight.|The body's internal chemistry is at its most active first thing in the morning, so anything eaten then will be used to the maximum.
Drinking a litre of water everyday helps dieting.|Not only does water flush out and purify the system but drinking a glass of water 30 minutes before a meal helps weight loss. It fills up the stomach and makes you eat less.
*/

var funFact = [];
var seen = [];
var possibilityXY = ["Y", "X"];
var possibilityXDegree = ["-90deg", "90deg", "0deg"];
var possibilityYDegree = ["180deg", "90deg", "-90deg"];
var axis = "X";
var degree = "0deg";
var randomIndex;
var previousIndex;
var previous = "rotateX(0deg)";
var updateThis = "";

//Set fun facts details into a list
function setFunFacts(data){
    funFact = data;
    randomIndex = Math.floor(Math.random() * (funFact.length));
    previousIndex = randomIndex;
    var factDetail = allFunFacts[randomIndex].split("|");
    $("#X0deg").html("<b>"+factDetail[0]+"</b><hr/><p>"+factDetail[1]+"</p>");
    $("#fun1Max").text(funFact.length);
}

//Update data on first refresh (run once)
function setFactsSeen(data){
    for(i = 0; i < data.length; i++){//Check for any changes in the Facts, if yes, reset achievement.
        if(funFact.includes(data[i]) == false){
            data = [-1];
        }
    }
    if(data[0] == -1){
        seen = [];
    }else{
        seen = data;
        checkAchievement(0);
    }
    if(seen.includes(funFact[randomIndex]) != true){
        seen.push(funFact[randomIndex]);
        checkAchievement(1);
    }
    for(i = 0; i < seen.length; i++){
        updateThis = updateThis + "*";
        updateThis = updateThis + seen[i];
    }
    $.getJSON("/achievement4",{stringSeen: updateThis},function(data){
        if(data == false){
            $("#fun1BotText").text("Log in to get achievement!");
        }else{
            seen = data;
            $("#fun1Seen").text(seen.length);
        }
    });
}

//When clicked, change funfacts content, remove funfacts content from previous box, update data
var clickScene = true;
$(".scene").click(function(){
    if(clickScene){
        clickScene = false;
        setTimeout(function(){clickScene = true}, 3000);//set timeout to click cube 1 time every 3 sec
        $("#"+axis+degree).html("");
        while(true) {
            var flipSound = new Audio("/static/sound/flip.wav");
            flipSound.play();
            flipSound.currentTime=0;
            axis = possibilityXY[Math.floor(Math.random() * possibilityXY.length)];
            if (axis == "Y") {
                degree = possibilityYDegree[Math.floor(Math.random() * possibilityYDegree.length)];
            } else if (axis == "X") {
                degree = possibilityXDegree[Math.floor(Math.random() * possibilityXDegree.length)];
            }
            if (previous != "rotate"+axis+"("+degree+")"){
                break;
            }
        }

        while(true){
            randomIndex = Math.floor(Math.random() * (funFact.length));
            if(randomIndex != previousIndex){
                break;
            }
        }
        if(seen.includes(funFact[randomIndex]) != true){
            seen.push(funFact[randomIndex]);
            checkAchievement(1);
        }
        //Update to database
        updateThis = "";
        for(i = 0; i < seen.length; i++){
            updateThis = updateThis + "*";
            updateThis = updateThis + seen[i];
        }
        $.getJSON("/achievement4",{stringSeen: updateThis},function(data){
            if(data == false){
                $("#fun1BotText").text("Log in to get achievement!");
            }else{
                seen = data;
                $("#fun1Seen").text(seen.length);
            }
        });
        var factDetail = allFunFacts[randomIndex].split("|");
        $("#"+axis+degree).html("<b>"+factDetail[0]+"</b><hr/><p>"+factDetail[1]+"</p>");
        previousIndex = randomIndex;

        previous = "rotate"+axis+"("+degree+")";
        $(".cube").css("transform", "rotate"+axis+"("+degree+")");
    }
});

function checkAchievement(number){
    if(user != null){
        if(seen.length == funFact.length){
            $("#fun1Achievement").attr("src", "static/images/unAchievement4.png");
            if(number == 1){
                showAchievementAlert("static/images/unAchievement4.png", "FACTORIOUS FOOLERY");
            }
        }
    }
}

//////////////////////////////////////////////////////////////QUIZ//////////////////////////////////////////////////////////////
var question = [["Maximum carbohydrates are obtained from:", "A"],
                ["Vitamins, minerals and proteins in suitable amounts are given to body by:", "D"],
                ["According to food guide pyramid fats oils and sweets should be used:", "C"],
                ["Sources of proteins includes:", "D"],
                ["A diet containing right amount of energy, carbohydrates, proteins, fats, fiber, vitamins, minerals and water to fulfill requirement of body is called:", "B"]
                ];
var question_choice = [["Whole grain food", "Fatty fish", "Plant oil", "Nuts"],
                        ["Whole grain food", "Fatty fish", "Plant oil", "Nuts"],
                        ["2-3 servings", "Frequently", "Sparingly", "2-4 servings"],
                        ["Fish", "Poultry", "Eggs", "All of them"],
                        ["Nutrition", "Balanced diet", "Perfect diet", "Food pyramid"]
                        ];
var question2 = [["The following are good sources of protein:", "D"],
                ["Why do you need vitamin D:", "C"],
                ["Which is the best carbohydrate choice:", "B"],
                ["Fat is essential to a healthy diet, but not all fats are created equal. Which of the following is a monounsaturated fat, considered to be the healthiest kind of fat for cooking:", "A"],
                ["A protein is called a complete protein when it:", "D"]
                ];
var question_choice2 = [["Milk", "Beans", "Lean beef", "All of the above"],
                        ["To help with digestion", "To help your hair grow", "To help calcium build bones", "So vitamin C won't get lonely"],
                        ["White bread", "Whole-wheat bread", "White rice", "Fruit juice"],
                        ["Olive oil", "Butter", "Coconut oil", "Lard"],
                        ["Is low in fat and high in fiber", "Can be used in place of an egg in a recipe", "Includes white and dark meat", "Contains all essential amino acids, which the body cannot produce on its own"]
                        ];
var question3 = [["What are the Essential Nutrients:", "D"],
                ["Which is NOT one of Galen's 'Laws of Health':", "B"],
                ["What is metabolism determined by:", "D"],
                ["What are Dietary Standards based on:", "D"],
                ["What are the first three things to look for on a food label:", "C"]
                ];
var question_choice3 = [["Carbohydrates, Lipids (fats), and Proteins", "Vitamins and Minerals", "A & B and Water", "A & B, Water and Phytochemicals"],
                        ["Eat the right foods", "Drink 8 glasses of water daily", "Breathe fresh air", "Get enough sleep"],
                        ["Sleep", "Genetics", "Thyroid Gland", "All of the Above"],
                        ["Large groups of people", "Individual diets", "B & C only", "All of the above"],
                        ["1: Fat content, 2: Calorie content, 3: Serving size", "1: Serving size, 2: Servings per container, 3: Carbohydrate content", "1: Fat content, 2: Servings size, 3: Servings per container", "1: Serving size, 2: Fat content, 3: Servings per container"]
                        ];

var challengeScore1 = -1;
var challengeScore2 = -1;
var challengeScore3 = -1;

//Set value from database
function setCha1_2_3(cha1, cha2, cha3){
    challengeScore1 = cha1;
    if(challengeScore1 == 5){$("#OutsideAchieve1").attr("src", "static/images/unAchievement1.png")}
    challengeScore2 = cha2;
    if(challengeScore2 == 5){$("#OutsideAchieve2").attr("src", "static/images/unAchievement2.png")}
    challengeScore3 = cha3;
    if(challengeScore3 == 5){$("#OutsideAchieve3").attr("src", "static/images/unAchievement3.png")}
}


var questions = question;
var question_choices = question_choice;

//3 set of code that replace information in modal box based on different button clicked
//- Set question & multiple choice base on different button clicked
//- Set achievement image
//- Set score text
//- Refresh the question and multiple choice by calling restartFunc()
$("#challengeButton").click(function(){
    questions = question;
    question_choices = question_choice;
    $("#challengeNumber").text("1");
    $("#achievements").attr("src", "static/images/Achievement1.png");
    if(challengeScore1 == -1){
        $("#showScore").text("No previous records")
    }else if(challengeScore1 == -2) {
        $("#showScore").text("Login to store your score!")
    }else{
        $("#showScore").text("Your highest score: "+challengeScore1+"/5");
        if(challengeScore1 == 5){
            $("#achievements").attr("src", "static/images/unAchievement1.png");
        }
    }
    restartFunc();
});
$("#challengeButton2").click(function(){
    questions = question2;
    question_choices = question_choice2;
    $("#challengeNumber").text("2");
    $("#achievements").attr("src", "/static/images/Achievement2.png");
    if(challengeScore2 == -1){
        $("#showScore").text("No previous records")
    }else if(challengeScore2 == -2) {
        $("#showScore").text("Login to store your score!")
    }else{
        $("#showScore").text("Your highest score: "+challengeScore2+"/5");
        if(challengeScore2 == 5){
            $("#achievements").attr("src", "/static/images/unAchievement2.png");
        }
    }
    restartFunc();
});
$("#challengeButton3").click(function(){
    questions = question3;
    question_choices = question_choice3;
    $("#challengeNumber").text("3");
    $("#achievements").attr("src", "static/images/Achievement3.png");
    if(challengeScore3 == -1){
        $("#showScore").text("No previous records")
    }else if(challengeScore3 == -2) {
        $("#showScore").text("Login to store your score!")
    }else{
        $("#showScore").text("Your highest score: "+challengeScore3+"/5");
        if(challengeScore3 == 5){
            $("#achievements").attr("src", "static/images/unAchievement3.png");
        }
    }
    restartFunc();
});


//Restart question shown and multiple choices
var count = 0;
var score = 0;
function restartFunc(){
    score = 0;
    count = 0;
    $("#questionNumber").text(count + 1);
    $("#modalBodyQuestion").text(questions[count][0]);
    $("#C1").text(question_choices[count][0]);
    $("#C2").text(question_choices[count][1]);
    $("#C3").text(question_choices[count][2]);
    $("#C4").text(question_choices[count][3]);
    $("#modalProgress").css("width", "0%");
    $("#modalProgressNo").text(0);
    $("#modalProgress").attr("aria-valuenow", "0");
    $("#A").prop("checked", false);
    $("#B").prop("checked", false);
    $("#C").prop("checked", false);
    $("#D").prop("checked", false);
    $("#errorMessage").css("display", "none");
    $("#modalBodyNext").text("Next Question");
}

//Validate if user got tick radio button
//Alert text when finish, and accumulate score if correct
//Update score to database by .getJSON
function hi(){
    if($("#A").prop("checked") == false && $("#B").prop("checked") == false && $("#C").prop("checked") == false && $("#D").prop("checked") == false){
        $("#errorMessage").css("display", "block");
    }else{
        if ($("#" + questions[count][1]).prop("checked")) {
        score = score + 1;
    }
    $("#errorMessage").css("display", "none");
    $("#A").prop("checked", false);
    $("#B").prop("checked", false);
    $("#C").prop("checked", false);
    $("#D").prop("checked", false);
    var progress_no = Number($("#modalProgressNo").text()) + 25;
    $("#modalProgress").css("width", progress_no + "%");
    $("#modalProgressNo").text(progress_no);
    $("#modalProgress").attr("aria-valuenow", progress_no);

    if (count == 3) {
        $("#modalBodyNext").text("Finish");
    }
    if (count == 4) {
        alert("Congratulation! You have done the challenge, you got " + score + " question correct!!");
        $.getJSON("/userScoreProcess",
            {userScore: score, Qnum: $("#challengeNumber").text()},
            function(data){
            if($("#challengeNumber").text() == 1){
                if(data == 5){
                    $("#OutsideAchieve1").attr("src", "static/images/unAchievement1.png");
                    if(challengeScore1 != 5){showAchievementAlert("static/images/unAchievement1.png", "POWDER POWER");}
                    }
                challengeScore1 = data;
            }else if($("#challengeNumber").text() == 2){
                if(data == 5){
                    $("#OutsideAchieve2").attr("src", "static/images/unAchievement2.png");
                    if(challengeScore2 != 5){showAchievementAlert("static/images/unAchievement2.png", "DESERVING DINER");}
                    }
                challengeScore2 = data;
            }else{
                if(data == 5){
                    $("#OutsideAchieve3").attr("src", "static/images/unAchievement3.png");
                    if(challengeScore3 != 5){showAchievementAlert("static/images/unAchievement3.png", "BEAK BECKONING");}
                    }
                challengeScore3 = data;
            }});
        $('#challengeModal').modal("toggle");
    }

    count = count + 1;
    $("#questionNumber").text(count + 1);
    $("#modalBodyQuestion").text(questions[count][0]);
    $("#C1").text(question_choices[count][0]);
    $("#C2").text(question_choices[count][1]);
    $("#C3").text(question_choices[count][2]);
    $("#C4").text(question_choices[count][3]);
    }
}


function showAchievementAlert(url, text){
    var achievementSound = new Audio("/static/sound/achievement.wav");
    achievementSound.play();
    achievementSound.currentTime=0;
    $("#AlertAchievement").attr("src", url);
    $("#AlertText").text(text);
    $("#UnlockAlertBox").fadeIn("slow");
    setTimeout(function(){$("#UnlockAlertBox").fadeOut("slow");}, 3000);
}

//////////////////////////////////////////////////////////////ADMIN USES//////////////////////////////////////////////////////////////
function adminUses(allFunFacts){//Add table row of fun facts
    for(i = 0; i < allFunFacts.length; i++) {
        var data = allFunFacts[i].split("|");
        var row = document.createElement("tr");
        row.setAttribute("id", "row" + i);

        var col0 = document.createElement("th");
        col0.appendChild(document.createTextNode(i + 1));
        row.appendChild(col0);

        var col1 = document.createElement("td");
        col1.setAttribute("id", "colFact" + i);
        col1.appendChild(document.createTextNode(data[0]));
        row.appendChild(col1);

        var col2 = document.createElement("td");
        col2.setAttribute("id", "colDetail" + i);
        col2.appendChild(document.createTextNode(data[1]));
        row.appendChild(col2);

        var col3 = document.createElement("td");
        var editButton = document.createElement("a");
        editButton.setAttribute("id", "edit" + i);
        editButton.setAttribute("class", "editButtons");
        editButton.setAttribute("onclick", "editClick(this)");
        editButton.appendChild(document.createTextNode("Edit"));
        col3.appendChild(editButton);
        var deleteButton = document.createElement("a");
        deleteButton.setAttribute("id", "delete" + i);
        deleteButton.setAttribute("class", "deleteButtons");
        deleteButton.setAttribute("onclick", "deleteClick(this)");
        deleteButton.appendChild(document.createTextNode("Delete"));
        col3.appendChild(deleteButton);
        row.appendChild(col3);

        document.getElementById("tableBody").appendChild(row);
    }
}

//////////////////////////EDIT
function editClick(deEdit){
    if($(".saveButtons")[0] != null){
        var bool = confirm("This action will not save your current changes made, confirm?");
        if(bool == false){
            return;
        }
        cancelClick($(".saveButtons")[0]);
    }else if($(".noSaveButton")[0] != null){
        cancelClick($(".noSaveButton")[0]);
    }
    var Num = deEdit.getAttribute("id").match(/\d/g).join("");
    var Fact = $("#colFact"+Num).html();
    $("#colFact"+Num).html("<textarea id='inputFact"+Num+"' placeholder='Write facts here...' onkeyup='activateSave(this)' maxlength='200'/>");//Change the Fact to an Input
    $("#inputFact"+Num).val(Fact);
    var Detail = $("#colDetail"+Num).html();
    $("#colDetail"+Num).html("<textarea id='inputDetail"+Num+"' placeholder='Write details here...' onkeyup='activateSave(this)' maxlength='200'/>");//Change the Detail to an Input
    $("#inputDetail"+Num).val(Detail);

    $("#inputFact"+Num).focus();

    $("#edit"+Num).attr("class", "noSaveButton")//Change Edit button to Save button
        .attr("onclick", "saveClick(this)")
        .text("Save")
        .attr("id", "save"+Num);

    $("#delete"+Num).attr("class", "cancelButtons")//Change Delete button to Cancel button
        .attr("onclick", "cancelClick(this)")
        .text("Cancel")
        .attr("id", "cancel"+Num);
}

function activateSave(deInput){//Changing ONLY the aesthetics of the Save button
    var Num = deInput.getAttribute("id").match(/\d/g).join("");
    var Fact, Detail;
    if(Num >= allFunFacts.length){
    }else{
        var data = allFunFacts[Num].split("|");
        Fact = data[0];
        Detail = data[1];
    }
    var newFact = $("#inputFact"+Num).val();
    var newDetail = $("#inputDetail"+Num).val();
    if(newFact == "" || newDetail == "" || (Fact == newFact && Detail == newDetail)){
        $("#save"+Num).attr("class", "noSaveButton");
    }else{
        $("#save"+Num).attr("class", "saveButtons");
    }
}

//////////////////////////DELETE
function deleteClick(deDelete){
    var Num = deDelete.getAttribute("id").match(/\d/g).join("");
    var bool = confirm("Deleting row "+(parseInt(Num)+1)+", confirm?");
    if(bool == true){
        var newFunFacts = "";
        for(i = parseInt(Num)+1; i < allFunFacts.length; i++){
            newFunFacts = newFunFacts + "\\";
            var Fact = $("#colFact"+i).text();
            var Detail = $("#colDetail"+i).text();
            newFunFacts = newFunFacts + (Fact+"|"+Detail)
        }
        $.getJSON("/deleteFact", {newFunFacts: newFunFacts, num: Num}, function(bool){
            if(bool){
                location.reload();
            }
        })
    }
}

//////////////////////////SAVE
function saveClick(deSave){
    var Num = deSave.getAttribute("id").match(/\d/g).join("");
    var Fact, Detail;
    if(Num >= allFunFacts.length){
    }else{
        var data = allFunFacts[Num].split("|");
        Fact = data[0];
        Detail = data[1];
    }
    var newFact = $("#inputFact"+Num).val();
    var newDetail = $("#inputDetail"+Num).val();
    if(newFact == "" || newDetail == "" || (Fact == newFact && Detail == newDetail)){return;}
    $.getJSON("/updateFact", {fact: newFact, detail: newDetail, num: Num}, function(bool){
        if(bool){
            location.reload();
        }
    });
}

//////////////////////////CANCEL
function cancelClick(deCancel){
    var Num = deCancel.getAttribute("id").match(/\d/g).join("");
    var Fact, Detail;
    if(Num >= allFunFacts.length){
        document.getElementById("tableBody").deleteRow(Num);
    }else{
        var data = allFunFacts[Num].split("|");
        Fact = data[0];
        Detail = data[1];

        $("#colFact"+Num).html(Fact);
        $("#colDetail"+Num).html(Detail);

        $("#save"+Num).attr("class", "editButtons")
            .attr("onclick", "editClick(this)")
            .text("Edit")
            .attr("id", "edit"+Num);

        $("#cancel"+Num).attr("class", "deleteButtons")
            .attr("onclick", "deleteClick(this)")
            .text("Delete")
            .attr("id", "delete"+Num);
    }
}

//////////////////////////ADD ROW
function addRow(){
    if($(".saveButtons")[0] != null){
        var bool = confirm("This action will not save your current changes made, confirm?");
        if(bool == false){
            return;
        }
        cancelClick($(".saveButtons")[0]);
    }else if($(".noSaveButton")[0] != null){
        cancelClick($(".noSaveButton")[0]);
    }

    var row = document.createElement("tr");
    var newNumber = $("tbody > tr").length;
    var newNumberShown = newNumber + 1;
    row.setAttribute("id", "row"+newNumber);

    var col0 = document.createElement("th");
    col0.appendChild(document.createTextNode(newNumberShown));
    row.appendChild(col0);

    var col1 = document.createElement("td");
    col1.setAttribute("id", "colFact" + newNumber);
    col1.innerHTML = "<textarea id='inputFact"+newNumber+"' placeholder='Write facts here...' onkeyup='activateSave(this)' maxlength='200'/>";
    row.appendChild(col1);

    var col2 = document.createElement("td");
    col2.setAttribute("id", "colDetail" + newNumber);
    col2.innerHTML = "<textarea id='inputDetail"+newNumber+"' placeholder='Write details here...' onkeyup='activateSave(this)' maxlength='300'/>";
    row.appendChild(col2);

    var col3 = document.createElement("td");
    col3.innerHTML = "<a id='save"+newNumber+"' class='noSaveButton' onclick='saveClick(this)'>Save</a>" +
        "<a id='cancel"+newNumber+"' class='cancelButtons' onclick='cancelClick(this)'>Cancel</a>";
    row.appendChild(col3);

    document.getElementById("tableBody").appendChild(row);

    $("#inputFact"+newNumber).focus();
}