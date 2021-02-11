var sizes = {
    itemMeasures: [0,0,0],
    itemVolume: 0,

    boxMeasures: [0,0,0],
    boxVolume: 0,

    boxDeadSpace: 0,
}

$(() => {
    $('#calculate').on('click', (ev) => {
        full_Operation();
    });

    $("#reset").on('click', (ev) =>{
        reset_Values();
    });
});

function full_Operation(){
    if (check_Values()){
        console.log(sizes.itemMeasures);
    } else {
        alert('Invalid input');
        reset_Values();
    }
}

function check_Values(){
    sizes.itemMeasures[0] = Number($("#item_lenght").val());
    sizes.itemMeasures[1] = Number($("#item_height").val());
    sizes.itemMeasures[2] = Number($("#item_depth").val());
    
    sizes.boxMeasures[0] = Number($("#box_lenght").val());
    sizes.boxMeasures[1] = Number($("#box_height").val());
    sizes.boxMeasures[2] = Number($("#box_depth").val());

    if (!sizes.itemMeasures.some(isNaN) && !sizes.boxMeasures.some(isNaN)){
        sizes.itemVolume = sizes.itemMeasures.reduce((acc, current) => acc * current);
        sizes.boxVolume = sizes.boxMeasures.reduce((acc, current) => acc * current);

        return true;
    } else {
        return false;
    }
}

function reset_Values(){
    $("#item_lenght").val('') 
    $("#item_height").val('') 
    $("#item_depth").val('') 
    $("#box_lenght").val('') 
    $("#box_height").val('') 
    $("#box_depth").val('') 
}

var canvas = document.createElement("canvas");
var ctx    = canvas.getContext('2d');

canvas.width  = 800;
canvas.height = 800;

document.body.appendChild(canvas);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // var sizeX = sizes.itemMeasures[0];
    // var sizeY = sizes.itemMeasures[1];
    // var sizeZ = sizes.itemMeasures[2]; 

    var sizeX = 15;
    var sizeY = 4;
    var sizeZ = 23; 
    
    ctx.scale(5, 5);
    
    drawCube(50, 50, sizeX, sizeY, sizeZ);
}

requestAnimationFrame(draw);


function drawCube(x, y, wx, wy, h, color) {

    // LINE MODE
    ctx.lineJoin = "round";
    
    // left face
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - wx, y - wx * 0.5);
    ctx.lineTo(x - wx, y - h - wx * 0.5);
    ctx.lineTo(x, y - h * 1);
    ctx.closePath();
    ctx.fillStyle = "#838357"
    ctx.strokeStyle = "#7a7a51";
    ctx.stroke();
    ctx.fill();

    // right face
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + wy, y - wy * 0.5);
    ctx.lineTo(x + wy, y - h - wy * 0.5);
    ctx.lineTo(x, y - h * 1);
    ctx.closePath();
    ctx.fillStyle = "#6f6f49";
    ctx.strokeStyle = "#676744";
    ctx.stroke();
    ctx.fill();

    // center face
    ctx.beginPath();
    ctx.moveTo(x, y - h);
    ctx.lineTo(x - wx, y - h - wx * 0.5);
    ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
    ctx.lineTo(x + wy, y - h - wy * 0.5);
    ctx.closePath();
    ctx.fillStyle = "#989865";
    ctx.strokeStyle = "#8e8e5e";
    ctx.stroke();
    ctx.fill();
}

function perm(xs) {
    let ret = [];

    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

        if(!rest.length) {
        ret.push([xs[i]])
        } else {
        for(let j = 0; j < rest.length; j = j + 1) {
            ret.push([xs[i]].concat(rest[j]))
        }
        }
    }
    return ret;
}

console.log(perm([1,2,3]).join("\n"));