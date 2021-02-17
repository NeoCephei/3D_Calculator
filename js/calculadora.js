// Javascript code
let sizes = {
	item : [0,0,0],
	box : [0,0,0],

	itemVolume : 0,
	boxVolume : 0,

	solution_one : [],
	solution_two : [],
	solution_three : [],
	solution_four : [],
	solution_five : [],
	solution_six : []
}

$(() => {
	$("#calculate-btn").on("click", (ev) => {

		if (allInputAreNumbers()){
			assignInputValues();
			writeVolumes();
			showAnswers();
			calculateCapacities(getPermutations(sizes.item));

			pintaCubos();
		} else {
			alert("Todos los valores deben ser un numero positivo");
			clearInputs();
		}
	});

	$("#clear-btn").on("click", (ev) => {
		clearInputs();
	})
});

pintaCubos = () => {
	drawCanvasCube('item_canvas',sizes.item[0],sizes.item[1],sizes.item[2]);
	drawCanvasCube('box_canvas',sizes.box[0],sizes.box[1],sizes.box[2]);

	drawCanvasCube('canvasone',sizes.solution_one[0],sizes.solution_one[1],sizes.solution_one[2]);
	drawCanvasCube('canvastwo',sizes.solution_two[0],sizes.solution_two[1],sizes.solution_two[2]);
	drawCanvasCube('canvasthree',sizes.solution_three[0],sizes.solution_three[1],sizes.solution_three[2]);
	drawCanvasCube('canvasfour',sizes.solution_four[0],sizes.solution_four[1],sizes.solution_four[2]);
	drawCanvasCube('canvasfive',sizes.solution_five[0],sizes.solution_five[1],sizes.solution_five[2]);
	drawCanvasCube('canvassix',sizes.solution_six[0],sizes.solution_six[1],sizes.solution_six[2]);

}


calculateCapacities = (arr) => {
	resetSolutions();

	let i,j;
	let accArr = [];
	let nItems = 0;
	for (i = 0; i<arr.length; i++){
		for (j = 0; j<sizes.box.length; j++){
			accArr.push(sizes.box[j] / arr[i][j]);

			switch (i){
				case 0:
					sizes.solution_one.push(arr[i][j]);
					break;
				case 1:
					sizes.solution_two.push(arr[i][j]);
					break;
				case 2:
					sizes.solution_three.push(arr[i][j]);
					break;
				case 3:
					sizes.solution_four.push(arr[i][j]);
					break;
				case 4:
					sizes.solution_five.push(arr[i][j]);
					break;
				case 5:
					sizes.solution_six.push(arr[i][j]);
					break;
			}
		}

		accArr = accArr.map((el) => {
			return Number(Math.floor(el))
		});
		nItems = accArr.reduce( (a, b) => a * b );

		$('#p'+ doConvert(i+1)).text("Con esta orientación caben: " + nItems + " items.");

		accArr = [];
	}
}

resetSolutions = () => {
	sizes.solution_one.length = 0;
	sizes.solution_two.length = 0;
	sizes.solution_three.length = 0;
	sizes.solution_four.length = 0;
	sizes.solution_five.length = 0;
	sizes.solution_six.length = 0;
}

assignInputValues = () => {
	sizes.item[0] = Number($("#item_alto").val());
	sizes.item[1] = Number($("#item_ancho").val());
	sizes.item[2] = Number($("#item_profundidad").val());

	sizes.box[0] = Number($("#box_alto").val());
	sizes.box[1] = Number($("#box_ancho").val());
	sizes.box[2] = Number($("#box_profundidad").val());

	sizes.itemVolume = sizes.item.reduce( (a, b) => a * b );
	sizes.boxVolume = sizes.box.reduce( (a, b) => a * b );
}

allInputAreNumbers = () => {
	let item_inputs_array = [];
	let box_inputs_array = [];

	item_inputs_array.push(Number($("#item_alto").val()), Number($("#item_ancho").val()), Number($("#item_profundidad").val()));
	box_inputs_array.push(Number($("#box_alto").val()), Number($("#box_ancho").val()), Number($("#box_profundidad").val()));

	if (item_inputs_array.every(x => x > 0) && box_inputs_array.every(x => x > 0)){
		return true;
	} else {
		return false;
	}
}

clearInputs = () => {
	$("#item_alto").val('');
	$("#item_ancho").val('');
	$("#item_profundidad").val('');

	$("#box_alto").val('');
	$("#box_ancho").val('');
	$("#box_profundidad").val('');

	$("#pitem_volume").text("");
	$("#pbox_volume").text("");

	$("#pOne").text("");
	$("#pTwo").text("");
	$("#pThree").text("");
	$("#pFour").text("");
	$("#pfive").text("");
	$("#pSix").text("");

	hideAnswers();
}

hideAnswers = () => {
	$(".solution").addClass("ninja");
	$("#item_canvas").addClass("ninja");
	$("#box_canvas").addClass("ninja");
}

showAnswers = () => {
	$(".solution").removeClass("ninja");
	$("#item_canvas").removeClass("ninja");
	$("#box_canvas").removeClass("ninja");
}

writeVolumes = () => {
	let maxBoxes = sizes.boxVolume / sizes.itemVolume;

	$("#pitem_volume").text("El volumen del item es de: " + sizes.itemVolume + " cm3.");
	$("#pbox_volume").text("El volumen del box es de: " + sizes.boxVolume + " cm3.");
	$("#pGeneralAnswer").text("El número máximo de items colocables es de: " + Math.floor(maxBoxes) + ".");

}

getPermutations = (inputArr) => {
	var results = [];

	function permute(arr, memo) {
		var cur, memo = memo || [];

	    for (var i = 0; i < arr.length; i++) {
	      	cur = arr.splice(i, 1);
	      	if (arr.length === 0) {
	        	results.push(memo.concat(cur));
	      	}
	      	permute(arr.slice(), memo.concat(cur));
	      	arr.splice(i, 0, cur[0]);
	    }
	    return results;
	}
	return permute(inputArr);
}

function doConvert (numWords){
    let numberInput = numWords;

    let oneToTwenty = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
    'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    let tenth = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    if(numberInput.toString().length > 7) return'overlimit' ;
    // console.log(numberInput);
    //let num = ('0000000000'+ numberInput).slice(-10).match(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  	let num = ('0000000'+ numberInput).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
    // console.log(num);
    if(!num) return;

    let outputText = num[1] != 0 ? (oneToTwenty[Number(num[1])] || `${tenth[num[1][0]]} ${oneToTwenty[num[1][1]]}` )+' million ' : ''; 
  
    outputText +=num[2] != 0 ? (oneToTwenty[Number(num[2])] || `${tenth[num[2][0]]} ${oneToTwenty[num[2][1]]}` )+'hundred ' : ''; 
    outputText +=num[3] != 0 ? (oneToTwenty[Number(num[3])] || `${tenth[num[3][0]]} ${oneToTwenty[num[3][1]]}`)+' thousand ' : ''; 
    outputText +=num[4] != 0 ? (oneToTwenty[Number(num[4])] || `${tenth[num[4][0]]} ${oneToTwenty[num[4][1]]}`) +'hundred ': ''; 
    outputText +=num[5] != 0 ? (oneToTwenty[Number(num[5])] || `${tenth[num[5][0]]} ${oneToTwenty[num[5][1]]} `) : ''; 

    return outputText;
}

function drawCanvasCube(identifier,itemx,itemy,itemz){

	var canvas = $('#'+identifier).get(0);
	var ctx = canvas.getContext('2d');

	canvas.width = 300;
	canvas.height = 300;

	// Pick out the form elements for easy access later
	var x1 = itemz;
	var x2 = itemy;
	var y = itemx;
	var color = document.querySelector('#color');

	// ctx.scale(3,3);

	// Animation function
	function draw(){
	  // clear the canvas

	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  
	  // Wobble the cube using a sine wave
	  var wobble = Math.sin(Date.now()/250)*window.innerHeight/50;
	  // var wobble = 0;
	  
	  // draw the cube
	  drawCube(
	    canvas.width/2,
	    canvas.height/2 + wobble + y/2,
	    x1,
	    x2,
	    y,
	    color.value
	  );
	  
	  requestAnimationFrame(draw);
	}
	draw();

	// Colour adjustment function
	// Nicked from http://stackoverflow.com/questions/5560248
	function shadeColor(color, percent) {
		color = color.substr(1);
		var num = parseInt(color, 16),
		amt = Math.round(2.55 * percent),
		R = (num >> 16) + amt,
		G = (num >> 8 & 0x00FF) + amt,
		B = (num & 0x0000FF) + amt;
		return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
	}

	// Draw a cube to the specified specs
	function drawCube(x, y, wx, wy, h, color) {

	    ctx.beginPath();
	    ctx.moveTo(x, y);
	    ctx.lineTo(x - wx, y - wx * 0.5);
	    ctx.lineTo(x - wx, y - h - wx * 0.5);
	    ctx.lineTo(x, y - h * 1);
	    ctx.closePath();
	    ctx.fillStyle = shadeColor(color, -10);
	    ctx.strokeStyle = color;
	    ctx.stroke();
	    ctx.fill();

	    ctx.beginPath();
	    ctx.moveTo(x, y);
	    ctx.lineTo(x + wy, y - wy * 0.5);
	    ctx.lineTo(x + wy, y - h - wy * 0.5);
	    ctx.lineTo(x, y - h * 1);
	    ctx.closePath();
	    ctx.fillStyle = shadeColor(color, 10);
	    ctx.strokeStyle = shadeColor(color, 50);
	    ctx.stroke();
	    ctx.fill();

	    ctx.beginPath();
	    ctx.moveTo(x, y - h);
	    ctx.lineTo(x - wx, y - h - wx * 0.5);
	    ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
	    ctx.lineTo(x + wy, y - h - wy * 0.5);
	    ctx.closePath();
	    ctx.fillStyle = shadeColor(color, 20);
	    ctx.strokeStyle = shadeColor(color, 60);
	    ctx.stroke();
	    ctx.fill();
	}
}