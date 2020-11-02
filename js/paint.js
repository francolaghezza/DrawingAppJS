// Zona de variables globales
var x = 0;
var y = 0;
var dibujar = false;
var borrar = false;
var borra = false;
var barra = document.getElementById("barra");

// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas_X = canvas.offsetLeft;
const canvas_Y = canvas.offsetTop;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Grosor de los instrumentos de pintura
var grosor = document.getElementById("grosor");

grosor.addEventListener("change",(e)=>{
    
    ctx.lineWidth = grosor.value;
});

// Pintar con el mouse
canvas.addEventListener("mousedown",(e)=>{
    
    x = e.clientX - canvas_X;
    y = (e.clientY - canvas_Y) + 19;
    dibujar = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    if (borra){
        dibujar = false;
        borrar = true;
        ctx.moveTo(x, y);
    }
});

canvas.addEventListener("mousemove",(e)=>{

    x = e.clientX-canvas_X;
    y = (e.clientY-canvas_Y) + 19;
    ctx.lineCap = "round";

    // Pintar
    if(dibujar){
        barra.style.marginLeft = "-100px";
        ctx.lineWidth = grosor.value;
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    // Borrar
    if (borrar){
        ctx.clearRect(x,y,15,15);
        barra.style.marginLeft = "-100px";

        if (grosor.value > 1){
            ctx.clearRect(x,y,grosor.value,grosor.value);
        }
    }
});

canvas.addEventListener("mouseup",(e)=>{

    x = e.clientX-canvas_X;
    y = e.clientY-canvas_Y;
    ctx.closePath();
    borrar = false;
    dibujar = false;
    barra.style.marginLeft = 0;
});

// Pintar con eventos de touch (smartphone)
canvas.addEventListener("touchstart", function(e) {

    x = e.targetTouches[0].clientX-canvas_X;
    y = e.targetTouches[0].clientY-canvas_Y;
    dibujar = true;
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (borra){
        dibujar = false;
        borrar = true;
        ctx.moveTo(x, y);
    }
});

canvas.addEventListener("touchmove", function(e) {

    e.preventDefault();
    x = e.targetTouches[0].clientX-canvas_X;
    y = e.targetTouches[0].clientY-canvas_Y;
    ctx.lineCap = "round";

    // Pintar
    if(dibujar){
        barra.style.marginLeft = "-100px";
        ctx.lineWidth = grosor.value;
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    
    // Borrar
    if (borrar){
        ctx.clearRect(x,y,15,15);
        barra.style.marginLeft = "-100px";
        if (grosor.value > 1){
            ctx.clearRect(x,y,grosor.value,grosor.value);
        }
    }
});

canvas.addEventListener("touchend", function(e) {
    e.preventDefault();
    ctx.closePath();
    borrar = false;
    dibujar = false;
    barra.style.marginLeft = 0;
});

// Modificar color de fondo del canvas
var bg_color = document.getElementById("bg_color");

bg_color.addEventListener("change",(e)=>{

    canvas.style.backgroundColor = bg_color.value;
    document.body.style.backgroundColor = bg_color.value;
});

// Modificar color de fondo del canvas
var color = document.getElementById("color");

color.addEventListener("change",(e)=>{

    ctx.strokeStyle = color.value;
});


// Pincel
var pincel = document.getElementById("pincel");

pincel.addEventListener("click",(e)=>{
    
    borra = false;
    circulo = true;
    
});

// Borrar
var goma = document.getElementById("goma");

goma.addEventListener("click",(e)=>{
   borra = true;
});

// Borrar todo
 var clear = document.getElementById("clear");

 clear.addEventListener("click",(e)=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 });
 