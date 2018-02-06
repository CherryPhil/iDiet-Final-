var dps = [] ;
var userBMI;

function firstRun(){

    if(user["BMIgraph"] == null){var theList = []}
    else{var theList = JSON.parse(user["BMIgraph"])}
    dps = theList;

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Your BMI Progress"
        },
        axisX: {
            title: "Months",
            titleFontSize: 25
        },
        axisY: {
            title: "B M I",
            titleFontSize: 25,
            includeZero: false
        },
        data: [
            {
                type: "line",
                dataPoints: dps
            }
        ]
    });
    chart.render();

    //GRAPH
    $("#addDataPoint").click(function () {

        if ($("#newdp").val() == 0) {
            alert("No Input Detected")
        }
        else {
            //push bmi to graph
            dps.push({y: parseInt(document.getElementById("newdp").value)});
            localStorage.setItem("data", chart.options.data[0].dataPoints);
            chart.render();
            //update firebase data
            var smth = $("#newdp").val();
            $.getJSON("/updateToFirebase", {bmis: JSON.stringify(dps), lastbmi:smth}, function (value) {
                if (value == false) {
                    alert("please login to update to firebase")
                }else{
                    location.reload();
                }
            })
        }
    });

    for (var item in namer) {
        var bmi_range = (namer[item]["forBMI"]).split(",");
        var user_bmi = user["BMI"].toString();

        if (bmi_range.includes(user_bmi) === true) {
            // recommended diet
            var tr1 = document.createElement('tr');
            tr1.setAttribute('onclick','location.href="/recipe/'+namer[item]['id']+'"');
            var tdd1 = document.createElement('td');
            var tdd2 = document.createElement('td');
            var tdd3 = document.createElement('td');
            var img = document.createElement('img');
            img.setAttribute("src", namer[item]['photo']);
            img.style.width = '302px';
            img.style.height = '167px';
            var nd2 = document.createTextNode(namer[item]["name"]);
            var nd3 = document.createTextNode(namer[item]["cal"]);
            tdd1.appendChild(img);
            tdd2.appendChild(nd2);
            tdd3.appendChild(nd3);
            tr1.appendChild(tdd1);
            tr1.appendChild(tdd2);
            tr1.appendChild(tdd3);
            document.getElementById('Ddata').appendChild(tr1);
        }
    }

    for (var i in name1){
        //recommended workout
        var bmi_range1 = (name1[i]["forBMI"]).split(",");
        var user_bmi1 = user["BMI"].toString();

        if (bmi_range1.includes(user_bmi1) === true){
            // recommended workout
            var tr2 = document.createElement('tr');
            var tdw1 = document.createElement('td');
            var tdw2 = document.createElement('td');
            var tdw3 = document.createElement('td');
            var tdw4 = document.createElement('td');
            var img1 = document.createElement('img');
            img1.setAttribute("src", name1[i]['photo']);
            img1.style.width = '302px';
            img1.style.height = '167px';
            var nw2 = document.createTextNode(name1[i]["name"]);
            var nw3 = document.createTextNode(name1[i]["duration"]);
            var nw4 = document.createTextNode(name1[i]["kcal_burn"]);
            tdw1.appendChild(img1);
            tdw2.appendChild(nw2);
            tdw3.appendChild(nw3);
            tdw4.appendChild(nw4);
            tr2.appendChild(tdw1);
            tr2.appendChild(tdw2);
            tr2.appendChild(tdw3);
            tr2.appendChild(tdw4);
            document.getElementById('Wdata').appendChild(tr2);
        }
    }
    if(document.getElementById("Ddata").innerHTML === ""){
        $("#table1").css("display", "none");
    }
    if(document.getElementById("Wdata").innerHTML === ""){
        $("#table2").css("display", "none");
    }
}