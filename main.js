var c = document.getElementById("layer1");
var ctx = c.getContext("2d");
var lineActive = false;
var color;

document.onselectstart = function() {
    return false;
} //prevent cursor changing

$(c).mousedown(function(event) {
    x = event.offsetX;
    y = event.offsetY;
    ctx.moveTo(x, y);
    lineActive = true;
});

$(c).mouseup(function() {
    lineActive = false;
});

$(c).mousemove(function(event) {
    if (lineActive) {
        x = event.offsetX;
        y = event.offsetY;
        ctx.lineTo(x, y);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
});

$("#clear").click(function() {
    ctx.clearRect(0, 0, 600, 500);
    ctx.beginPath();
});

$(".palette>input[type='button']").click(function() {
    ctx.beginPath();
    color = $(this).data("color");
    $("#selected_color").css("background-color", color);
});

$('#customcolor').change(function(){
    color = $(this).val();
    $("#selected_color").css("background-color", color);
});

$(function() {
    $(".palette>input[type='button']").each(function() {
        color = $(this).data("color");
        $(this).css("background-color", color);
    });
    color = 'black';
});


