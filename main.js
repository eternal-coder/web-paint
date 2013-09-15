var c = document.getElementById("layer1");
var c2 = document.getElementById("layer2");
var ctx = c.getContext("2d");
var ctx2 = c2.getContext("2d");
var lineActive = false;
var color;
var tool = "pen";
var tmpLine;


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

$(c2).mousedown(function(event) {
    if (!lineActive) {
        line.startX = event.offsetX;
        line.startY = event.offsetY;
    } else {
        line.endX = event.offsetX;
        line.endY = event.offsetY;
        addLine(line);
    }
    lineActive = !lineActive;
});

$(c2).mousemove(function(event) {
    if (lineActive) {
        ctx2.clearRect(0, 0, c2.width, c2.height);
        ctx2.beginPath();
        line.endX = event.offsetX;
        line.endY = event.offsetY;
        ctx2.moveTo(line.startX, line.startY);
        ctx2.lineTo(line.endX, line.endY);
        ctx2.strokeStyle = color;
        ctx2.stroke();
    }
});


$("#clear").click(function() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
});

function addLine(_line) {
    ctx.moveTo(_line.startX, _line.startY);
    ctx.lineTo(_line.endX, _line.endY);
    ctx.strokeStyle = color;
    ctx.stroke();
}

$(".palette>input[type='button']").click(function() {
    ctx.beginPath();
    color = $(this).data("color");
    $("#selected_color").css("background-color", color);
});

$(".tools_panel>input[type='button']").click(function() {
    tool = $(this).data("tool");
    if (tool === 'pen') {
        $('#layer2').hide();
    }
    if (tool === "line") {
        $('#layer2').show();
    }
});


$('#customcolor').change(function() {
    ctx.beginPath();
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


