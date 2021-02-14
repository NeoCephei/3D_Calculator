let sizes = {
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

    $("#reset").on('click', (ev) => {
        reset_Values();
    });
});

function full_Operation(){
    if (check_Values()){
        drawSamples();
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

function drawSamples(){
    //Crear una clase para cada canvas (Le paso el .get(0) para pasarle el js) y de ahí que dibuje.

    let item_Canvas = $("#item_canvas").get(0);
    let item_ctx = item_Canvas.getContext("2d");
    let box_Canvas = $("#box_canvas").get(0);
    let box_ctx = box_Canvas.getContext("2d");

    item_Canvas.width = 400;
    item_Canvas.height = 400;
    box_Canvas.width = 400;
    box_Canvas.height = 400;

    let itemX = sizes.itemMeasures[0];
    let itemY = sizes.itemMeasures[1];
    let itemZ = sizes.itemMeasures[2];

    let boxX = sizes.boxMeasures[0];
    let boxY = sizes.boxMeasures[1];
    let boxZ = sizes.boxMeasures[2];

    item_ctx.clearRect(0, 0, item_Canvas.width, item_Canvas.height);
    box_ctx.clearRect(0, 0, box_Canvas.width, box_Canvas.height);

    drawCube(item_Canvas.width/2, item_Canvas.height, itemX, itemY,itemZ, item_ctx);
    drawCube(box_Canvas.width/2, box_Canvas.height, boxX, boxY,boxZ, box_ctx);
}

function drawCube(x, y, wx, wy, h, ctx) {

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

// function perm(xs) {
//     let ret = [];

//     for (let i = 0; i < xs.length; i = i + 1) {
//         let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

//         if(!rest.length) {
//         ret.push([xs[i]])
//         } else {
//         for(let j = 0; j < rest.length; j = j + 1) {
//             ret.push([xs[i]].concat(rest[j]))
//         }
//         }
//     }
//     return ret;
// }

// console.log(perm([1,2,3]).join("\n"));