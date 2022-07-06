window.onload = () => {
    var canvas = document.getElementById('my-canvas');
    var context = canvas.getContext('2d');
    var draw = false, coordX, coordY, color, width;

    document.getElementById('utilities').onclick = () => {
        if (document.forms[0].elements.utility.value == 'cursor') { checkClass(canvas, 'none'); }
        if (document.forms[0].elements.utility.value == 'pencil') { checkClass(canvas, 'pencil'); }
        if (document.forms[0].elements.utility.value == 'eraser') { checkClass(canvas, 'eraser'); }
        // if (document.forms[0].elements.utility.value == 'rectangle') { checkClass(canvas, 'rectangle'); }
        // if (document.forms[0].elements.utility.value == 'circle') { checkClass(canvas, 'circle'); }
        if (document.forms[0].elements.utility.value == 'clear') {
            checkClass(canvas, 'none'); 
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    document.forms[0].elements.width.onchange = ()=>{ width = document.forms[0].elements.width.value; }
    document.forms[0].elements.color.onchange = ()=>{ color = document.forms[0].elements.color.value; }

    canvas.onmousedown = function(event) {
        if (document.forms[0].elements.utility.value == 'pencil') {
            draw = true;
            coordX = event.pageX - this.offsetLeft;
            coordY = event.pageY - this.offsetTop;
            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = width;
            context.moveTo(coordX, coordY);
        }

        if (document.forms[0].elements.utility.value == 'eraser') {
            draw = true;
        }
    }

    canvas.onmousemove = function(event) {
        if (document.forms[0].elements.utility.value == 'pencil' && draw) {
            coordX = event.pageX - this.offsetLeft;
            coordY = event.pageY - this.offsetTop;
            context.lineTo(coordX, coordY);
            context.stroke();
        }

        if (document.forms[0].elements.utility.value == 'eraser' && draw) {
            coordX = event.pageX - this.offsetLeft;
            coordY = event.pageY - this.offsetTop;
            context.clearRect(coordX, coordY, 15, 15);
        }
    }

    canvas.onmouseup = function(event) {
        if (document.forms[0].elements.utility.value == 'pencil' && draw) {
            coordX = event.pageX - this.offsetLeft;
            coordY = event.pageY - this.offsetTop;
            context.lineTo(coordX, coordY);
            context.stroke();
        }

        if (document.forms[0].elements.utility.value == 'eraser' && draw) {
            coordX = event.pageX - this.offsetLeft;
            coordY = event.pageY - this.offsetTop;
            context.clearRect(coordX, coordY, 15, 15);
        }

        draw = false;
    }
}

function checkClass(canvas, new_class) {
    if (canvas.classList.contains("none")) { canvas.classList.remove("none"); }
    if (canvas.classList.contains("pencil")) { canvas.classList.remove("pencil"); }
    if (canvas.classList.contains("eraser")) { canvas.classList.remove("eraser"); }
    // if (canvas.classList.contains("rectangle")) { canvas.classList.remove("rectangle"); }
    // if (canvas.classList.contains("circle")) { canvas.classList.remove("circle"); }
    canvas.classList.add(new_class);
}