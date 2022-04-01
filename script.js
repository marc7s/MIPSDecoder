var numDec, numHex, numBin;

var bits, bitError, body;

const mipsBits = 32;
const formatDivs = new Map;

document.addEventListener('DOMContentLoaded', () => {
    // Get elements once loaded
    numDec = document.getElementById("num_dec");
    numHex = document.getElementById("num_hex");
    numBin = document.getElementById("num_bin");
    bitError = document.getElementById("bit_error");
    body = document.getElementById("body");

    formatDivs.set(formats.R, document.getElementById("format_r"));
    formatDivs.set(formats.I, document.getElementById("format_i"));
    formatDivs.set(formats.J, document.getElementById("format_j"));

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
        }
        val = parseInt(numDec.value);
        
        if(isBitError(val, mipsBits)){
            const inputs = [numDec, numHex, numBin];
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
            }
            else{
                numBin.value = padBin(val.toString(2));
            }
            parseInstruction(val);
        }
    }else{
        numDec.value = '';
        numHex.value = '';
        numBin.value = '';
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
        return -(Math.pow(2, mipsBits) - parseInt(val.substring(1), 2));
    return parseInt(val, 2);
}
function updateValues(){
    if(isBitError(val, mipsBits)){
        showBitError();
    }else{
        hideBitError();
        handleInput(numDec);
    }
}
function padBin(val){
    let pStr = new Array(parseInt(mipsBits) + 1).join('0');
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

function parseInstruction(val){
    const opms = val >>> 26; // Most significant 6 bits
    const isFormatR = opms == 0;
    const opcode = isFormatR ? val & 0b111111 : opms; // If opcode is 0, it is stored in the funct field instead
    document.getElementById("opcode").innerHTML = `${opms} / 0x${d2h(opms)}`;
        
    const instruction = getInstruction(opcode, isFormatR); // All R format instructions have opcode 0
    document.getElementById("instruction_name").innerHTML = instruction.name;
    document.getElementById("instruction_mnemonic").innerHTML = instruction.mnemonic;
    
    const format = getFormat(opcode, isFormatR);
    setFormat(format);
    switch(format) {
        case formats.R:
            document.getElementById("r_reg1").innerHTML = (val >>> 21) & 0b11111;
            document.getElementById("r_reg2").innerHTML = (val >>> 16) & 0b11111;
            document.getElementById("r_regD").innerHTML = (val >>> 11) & 0b11111;
            document.getElementById("r_shamt").innerHTML = (val >>> 6) & 0b11111;
            document.getElementById("r_funct").innerHTML = (val >>> 0) & 0b111111;
            break;
        case formats.I:
            document.getElementById("i_reg1").innerHTML = (val >>> 21) & 0b11111;
            document.getElementById("i_reg2").innerHTML = (val >>> 16) & 0b11111;
            document.getElementById("i_immediate").innerHTML = (val >>> 0) & 0x7FFF;
            break;
        case formats.J:
            document.getElementById("j_address").innerHTML = (val >>> 0) & 0x1FFFFFF;
            break;
    }
}

function getInstruction(opcode, formatIsR = false){
    const i = formatIsR ? instructions.find(i => i.funct == opcode) : instructions.find(i => i.opcode == opcode);
    return i ?? {name: '', mnemonic: ''};
}

function getFormat(opcode, formatIsR = false){
    const i = getInstruction(opcode, formatIsR); // All R format instructions have opcode 0
    return i ? i.format : null;
}

function setFormat(format){
    document.getElementById("instruction_format").innerHTML = format ?? '';
    const selected = formatDivs.get(format);
    formatDivs.forEach(div => {
        div.style.display = "none"
    });
    if(selected) selected.style.display = "block";
}

function d2h(value){
    return value.toString(16).toUpperCase();
}