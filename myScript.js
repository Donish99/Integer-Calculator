let result = 0;
let toDisplay = '0';
let previousOperator = null;
const screen = document.querySelector('.input-display');

document.querySelector('.calculator').addEventListener('click', function(event){
    console.log('here')
    buttonClick(event.target.innerText);
})

function buttonClick(value){
    if (isNaN(parseInt(value))){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value){
    if (toDisplay === '0'){
        toDisplay = value;
    }else if(toDisplay.length < 9){
        toDisplay += value
    }
}

function handleSymbol(value){
    switch(value){
        case 'C':
            result = 0;
            toDisplay = '0';
            previousOperator = null;
            break;
        case '←':
            if (toDisplay.length === 1){
                toDisplay = '0';
            }else{
                toDisplay = toDisplay.substr(0, toDisplay.length - 1);
            }
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(toDisplay))
            previousOperator = null;
            toDisplay = result + '';
            result = 0;
            break;
        default:
            handleMath(value)
            break;
    }
}

function handleMath(value){
    const intToDisplay = parseInt(toDisplay);
    if(result === 0){
        result = intToDisplay;
    }else {
        flushOperation(intToDisplay)
    }
    previousOperator = value;
    toDisplay = '0'
}

function flushOperation(intToDisplay){
    switch (previousOperator){
        case '+':
            result += intToDisplay;
            break;
        case '×':
            result *= intToDisplay;
            break;
        case '÷':
            result /= intToDisplay;
            break;
        default:
            result -= intToDisplay;
    }
}

function rerender(){
    screen.innerText = toDisplay;
}