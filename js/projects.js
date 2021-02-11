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
    check_Values();
}

function check_Values(){
    sizes.itemMeasures[0] = $("#item_lenght").val();
    sizes.itemMeasures[1] = $("#item_height").val();
    sizes.itemMeasures[2] = $("#item_depth").val();
    
    sizes.boxMeasures[0] = $("#item_lenght").val();
    sizes.boxMeasures[1] = $("#item_height").val();
    sizes.boxMeasures[2] = $("#item_depth").val();
}

function reset_Values(){
    $("#item_lenght").val('') 
    $("#item_height").val('') 
    $("#item_depth").val('') 
    $("#box_lenght").val('') 
    $("#box_height").val('') 
    $("#box_depth").val('') 
}