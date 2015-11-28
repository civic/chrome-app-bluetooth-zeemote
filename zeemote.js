function Zeemote(onStick, onButton){
    this.onStick = onStick || (()=>{});
    this.onButton = onButton || (()=>{});

};
Zeemote.prototype = {
    getDevice: function() {
        return new Promise((resolve, reject)=>{
            chrome.bluetooth.getDevices(devices=>{
                var targets = devices.filter(d => {
                    return d.name.match(/^Zeemote /);
                });
                if (targets.length > 0){
                    resolve(targets[0]);
                } else {
                    reject("not found");
                }
            });
        });
    },
    connect: function(){
        return this.getDevice().then(device=>{
            console.log(device);

            return new Promise((resolve, reject)=>{
                chrome.bluetoothSocket.create((createInfo)=>{
                    this.socketId = createInfo.socketId;

                    if (chrome.runtime.lastError){
                        console.log(1, chrome.runtime.lastError);
                        reject(chrome.runtime.lastError);
                    } else {
                        chrome.bluetoothSocket.connect(createInfo.socketId, device.address, "1101", ()=>{
                            if (chrome.runtime.lastError){
                                console.log(2, chrome.runtime.lastError);
                                reject(chrome.runtime.lastError);
                            } else {
                                resolve();
                            }
                        });
                    }
                });
            });
        });
    },
    listen: function(){
        this.receive_handler = this.onReceive.bind(this);
        this.receive_error = this.onReceiveError.bind(this);

        chrome.bluetoothSocket.onReceive.addListener(this.receive_handler);
        chrome.bluetoothSocket.onReceiveError.addListener(this.receive_error);
    },
    disconnect: function(){
        chrome.bluetoothSocket.disconnect(this.socketId);
        chrome.bluetoothSocket.onReceive.removeistener(this.receive_handler);
        chrome.bluetoothSocket.onReceiveError.removeListener(this.receive_error);
    },
    onReceive: function(info){
        var data = new Int8Array(info.data);
        if (data[0] === 5){
            this.onStick(data.slice(4));
        } else if (data[0] === 8){
            var button = {a:false, b:false, c:false, d:false, e:false, f:false};
            for (var i = 3; i <=8; i++){
                if (data[i] === -2){
                    break;
                }
                var key = String.fromCharCode(97/* ascii code of 'a' */ +data[i]);
                button[key] = true;
            }
            this.onButton(button);
        }
    },
    onReceiveError: function(error){
        console.log(error);
    }

};

module.exports = Zeemote; 
