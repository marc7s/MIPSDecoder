var numDec, numHex, numBin, numBin2k;

var bits, bitError, body;

document.addEventListener('DOMContentLoaded', () => {
    // Get elements once loaded
    numDec = document.getElementById("num_dec");
    numHex = document.getElementById("num_hex");
    numBin = document.getElementById("num_bin");
    numBin2k = document.getElementById("num_bin2k");
    bits = document.getElementById("bits");
    bitError = document.getElementById("bit_error");
    body = document.getElementById("body");

    numHex.addEventListener('keydown', (e) => {
        if(!((e.key >= "0" && e.key <= "9") || (e.key >= "a" && e.key <= "f") || e.key == "Backspace")) {
            e.preventDefault();
        }
    });
}, false);

function handleInput(el){
    if(el.value != ''){
        numHex.value = numHex.value.toUpperCase();
        switch(el.id){
            case 'num_hex':
                numDec.value = convertFromHex(el.value);
                break;
            case 'num_bin':
                numDec.value = convertFromBin(padBin(el.value));
                break;
            case 'num_bin2k':
                numDec.value = convertFromBin2k(padBin(el.value));
                break;
        }
        val = parseInt(numDec.value);
        
        if(isBitError(val, bits.value)){
            const inputs = [numDec, numHex, numBin, numBin2k];
            inputs.forEach(input => {
                if(input.id != el.id)
                    input.value = '';
            });
            showBitError();
        }else{
            hideBitError();
    
            numHex.value = val.toString(16).toUpperCase();
    
            if(val < 0){
                numBin.value = 'NaN';
                numBin2k.value = padBin((Math.pow(2, bits.value) + val).toString(2));
            }
            else{
                numBin.value = padBin(val.toString(2));
                if(val < Math.pow(2, bits.value - 1))
                    numBin2k.value = padBin(val.toString(2));
                else
                    numBin2k.value = 'NaN';
            }
        }
    }else{
        numDec.value = '';
        numHex.value = '';
        numBin.value = '';
        numBin2k.value = '';
    }
}
function convertFromHex(val){
    return parseInt(val, 16);
}
function convertFromBin(val){
    return parseInt(val, 2);
}
function convertFromBin2k(val){
    if(val[0])
        return -(Math.pow(2, bits.value) - parseInt(val.substring(1), 2));
    return parseInt(val, 2);
}
function updateValues(){
    if(isBitError(val, bits.value)){
        showBitError();
    }else{
        hideBitError();
        handleInput(numDec);
    }
}
function padBin(val){
    let pStr = new Array(parseInt(bits.value) + 1).join('0');
    return pStr.substring(val.length) + val;
}
function isBitError(val, bitNo){
    return val >= Math.pow(2, bitNo) || val <= -Math.pow(2, bitNo);
}
function toggleDarkMode(el){
    const dark = "dark";
    const light = "light";
    if(el.checked) {
        body.classList.add(dark);
        body.classList.remove(light);
    } 
    else {
        body.classList.add(light)
        body.classList.remove(dark);
    }
}

function showBitError() {
    bitError.style.opacity = '1';
}

function hideBitError() {
    bitError.style.opacity = '0';
}