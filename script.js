var listOfNumbers = [];
var listOfMarks = [];
var expression = "";

function isMark(value){
    switch (value) {
        case '/':
        case '+':
        case '-':
        case '*':
        case '^':
        case '=':
            return true;
        default:
            return false;
    }
}

function addValue(value){
    if(expression || !isMark(value)){
        if(!isMark(value)){
            expression += value;
            $("#current-text").text(expression);
        }else{
            calculateEveryTwos();
            listOfMarks.push(value);
            var current = parseFloat($("#current-text").text());
            listOfNumbers.push(current);
            $("#previous-text").append(expression);
            $("#previous-text").append(value);
            expression = "";
        }
    }
}

function calculate(a, b, mark){
    let result = '';
    
    if (mark === '+') {
      result = parseFloat(a) + parseFloat(b);
    } else if (mark === '-') {
      result = parseFloat(a) - parseFloat(b);
    } else if (mark === '*') {
      result = parseFloat(a) * parseFloat(b);
    } else if (mark === '/') {
      result =  parseFloat(a) / parseFloat(b);
    } else if ( mark === '^') {
      result= parseFloat(a) ** parseFloat(b);
    }
    return result;
}

function calculateEveryTwos(){
    if(listOfMarks.length > 0) {
        var current = parseFloat($("#current-text").text());
        listOfNumbers.push(current);
        for(let i = 0; i < listOfMarks.length; i++){
            var result= calculate(listOfNumbers[i], listOfNumbers[i+1], listOfMarks[i]);
            $("#current-text").text(result);
            listOfNumbers.length = 0;
            listOfMarks.length = 0;
        }
    }
}

function showResult(){
    listOfNumbers.push(expression);
    $("#previous-text").append(expression);
    $("#previous-text").append("=");
    expression = "";
    for(let i = 0; i < listOfMarks.length; i++){
        var result= calculate(listOfNumbers[i], listOfNumbers[i+1], listOfMarks[i]);
        $("#current-text").text(result);
    }
    listOfNumbers.length = 0;
    listOfMarks.length = 0;
    expression = result;
}

function clearCurrent(){
    $("#current-text").empty();
}

function clearBoth(){
    $("#current-text").empty();
    $("#previous-text").empty();
    listOfNumbers = [];
    listOfMarks = [];
    expression = "";
}

function deleteLastChar(){
    var currentExpression = $("#current-text").text();
    var stringWithoutLastChar = currentExpression.slice(0, -1);
    $("#current-text").text(stringWithoutLastChar);
    expression= stringWithoutLastChar;
}
