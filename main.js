var video = "";
var status = "";
var objects = [];

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function getResults(error,result){
if (error){
console.error(error);
}else{
    console.log(result);
    objects = result;
}
}

function draw(){
    image(video, 0, 0, 480, 380);

    if (status != ""){
        objectDetector.detect(video, getResults);
        for(var i = 0;i<objects.length;i++){
            document.getElementById("status_display").innerHTML = "Detecting Objects";
            document.getElementById("num_of_objects_display").innerHTML = objects.length;

            fill('red');
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15 );
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    }


function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    
}

function modelLoaded(){
    console.log("Model is loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}