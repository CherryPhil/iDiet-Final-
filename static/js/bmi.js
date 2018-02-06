// for graph
function setBMI(){
	var x = document.getElementById('#newdp');

}

function computeBMI() {
						// user inputs
						var height = Number(document.getElementById("height").value);
						var weight = Number(document.getElementById("weight").value);

						//validation
						if ((height == 0 && weight == 0) || (height == null && weight == null) || height == isNaN(height) && weight == isNaN(weight)){
                            alert("Please enter VALID HEIGHT & WEIGHT value !!!")
                        }
						else if (height == 0 || null || isNaN(height)){
                            alert("Please enter HEIGHT value !!!")
                        }
                        else if (weight == 0 || null || isNaN(weight)){
                            alert("Please enter WEIGHT value !!!")
                        }

                        //Perform calculation
						else{
						var BMI = Math.round(weight / Math.pow(height, 2) * 10000);

						//Display result of calculation
						document.getElementById("output").innerText = Math.round(BMI * 100) / 100;

						var output = Math.round(BMI * 100) / 100;

						if (output < 18.5)
							document.getElementById("comment").innerText = "Underweight";
						else if (output >= 18.5 && output <= 25)
							document.getElementById("comment").innerText = "Normal";
						else if (output > 25 && output <= 30)
							document.getElementById("comment").innerText = "Overweight";
						else if (output > 30 && output<= 50)
							document.getElementById("comment").innerText = "Obese";
					}}
