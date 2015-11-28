var $ = require("jquery");
var Zeemote = require("./zeemote");

var z = new Zeemote(onStick, onButton);
var Controller = require("./controller");

var controller = new Controller($("#controller").get(0));
controller.draw();

function onStick(stick){
    console.log(stick);
    controller.drawStick(stick);
}
function onButton(button){
    console.log(button);
    controller.drawButton(button);
}

$("#connect").on("click", function(){
    z.connect().then(()=>{
        console.log("success");
        z.listen();
    }, (error)=>{
        console.log(error);
    });
});
$("#disconnect").on("click", function(){
    z.disconnect();
});
