var mainLayer = document.getElementById("layer1");
var tempLayer = document.getElementById("layer2");
var mainCtx = mainLayer.getContext("2d");
var tempCtx = tempLayer.getContext("2d");
var lineActive = false;
var color;
var tool = "pen";
var tmpLine;
var tmpCoord;


//init
$(function() {
    $(".palette>input[type='button']").each(function() {
        color = $(this).data("color");
        $(this).css("background-color", color);
    });
    color = 'black';
    $("#pen").addClass("button_active");
	setDraggable(".palette");
	setDraggable(".tools");
});


//listeners
document.onselectstart = function() {
    return false;
} //prevent cursor changing

$(mainLayer).mousedown(function(event) {
    x = event.offsetX;
    y = event.offsetY;
    mainCtx.moveTo(x, y);
    lineActive = true;
});

$(mainLayer).mouseup(function() {
    lineActive = false;
});

$(mainLayer).mousemove(function(event) {
    if (lineActive) {
        x = event.offsetX;
        y = event.offsetY;
        mainCtx.lineTo(x, y);
        mainCtx.strokeStyle = color;
        mainCtx.stroke();
    }
});

$(tempLayer).mousedown(function(event) {
    if (!lineActive) {
        line.startX = event.offsetX;
        line.startY = event.offsetY;
    } else {
        line.endX = event.offsetX;
        line.endY = event.offsetY;
        addLine(line);
        clearTemp();
    }
    lineActive = !lineActive;
});

$(tempLayer).mousemove(function(event) {
    if (lineActive) {
        clearTemp();
        line.endX = event.offsetX;
        line.endY = event.offsetY;
        tempCtx.moveTo(line.startX, line.startY);
        tempCtx.lineTo(line.endX, line.endY);
        tempCtx.strokeStyle = color;
        tempCtx.stroke();
    }
});

$("#clear").click(function() {
    clearMain();
});

$(".palette>input[type='button']").click(function() {
    mainCtx.beginPath();
    color = $(this).data("color");
    $("#selected_color").css("background-color", color);
});

$(".tools>input[type='button']").click(function() {
    tool = $(this).data("tool");
    if (tool === 'pen') {
        $('#layer2').hide();
    }
    if (tool === "line") {
        $('#layer2').show();
    }
    $(".tools>input[type='button']").removeClass("button_active");
    $(this).addClass("button_active");

});

$('#customcolor').change(function() {
    mainCtx.beginPath();
    color = $(this).val();
    $("#selected_color").css("background-color", color);
});

function addLine(_line) {
    mainCtx.moveTo(_line.startX, _line.startY);
    mainCtx.lineTo(_line.endX, _line.endY);
    mainCtx.strokeStyle = color;
    mainCtx.stroke();
}

function clearMain() {
    mainCtx.clearRect(0, 0, mainLayer.width, mainLayer.height);
    mainCtx.beginPath();
}

function clearTemp() {
    tempCtx.clearRect(0, 0, tempLayer.width, tempLayer.height);
    tempCtx.beginPath();
}

function setDraggable(element){
	$(element).on('dragstart',function(event){
		tmpCoord = new Object;
		tmpCoord.x = event.originalEvent.clientX;
		tmpCoord.y = event.originalEvent.clientY;
	});
	$(element).on('dragend',function(event){
		event.originalEvent.preventDefault();
		x = event.originalEvent.clientX;
		y = event.originalEvent.clientY;
		oldX = $(this).position().left;
		oldY = $(this).position().top;
		$(this).css("left", oldX + x - tmpCoord.x );
		$(this).css("top", oldY + y - tmpCoord.y);
	});
	$(element).attr("draggable",true);
}