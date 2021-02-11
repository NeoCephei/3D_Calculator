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
        console.log(sizes);
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