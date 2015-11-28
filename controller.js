module.exports = function(canvas){
    this.ctx = canvas.getContext("2d");

    this.draw = function(){
        this.drawStick();
        this.drawButton({});
    };
    this.drawStick = function(stick){
        var ctx = this.ctx;
        ctx.fillStyle = '#aaa'; 
        ctx.fillRect(64, 20, 30, 64);
        ctx.fillRect(0, 84, 64, 30);
        ctx.fillRect(64, 114, 30, 64);
        ctx.fillRect(94, 84, 64, 30);

        if (!stick){
            return
        }
        ctx.fillStyle = '#f55'; 
        if (stick[0] < 0){
            // left
            var w = -stick[0]/2;
            var x = 64-w;
            ctx.fillRect(x, 84, w, 30);

        } else if (0 < stick[0]){
            // right
            var w = stick[0]/2;
            ctx.fillRect(94, 84, w, 30);
        }
        if (stick[1] < 0){
            // up
            var h = -stick[1]/2;
            var y = 20+(64-h);
            ctx.fillRect(64, y, 30, h);

        } else if (0 < stick[1]){
            // down
            var h = stick[1]/2;
            var y = 114;
            ctx.fillRect(64, y, 30, h);
        }

    }
    this.drawButton = function(button){
        var ctx = this.ctx;

        ctx.fillStyle = button.a ? '#f55' : '#aaa';
        ctx.fillRect(200, 50, 50, 50);
        ctx.fillStyle = button.b ? '#f55' : '#aaa';
        ctx.fillRect(260, 50, 50, 50);
        ctx.fillStyle = button.c ? '#f55' : '#aaa';
        ctx.fillRect(200, 110, 50, 50);
        ctx.fillStyle = button.d ? '#f55' : '#aaa';
        ctx.fillRect(260, 110, 50, 50);

        ctx.fillStyle = '#000'; 
        ctx.font="30px 'Arial'";
        ctx.fillText("A", 215, 85);
        ctx.fillText("B", 275, 85);
        ctx.fillText("C", 215, 145);
        ctx.fillText("D", 275, 145);

    }

};
