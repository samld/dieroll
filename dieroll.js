var dieFormulas = ['', '', '', '', '', '', '','','',''];
var dieTotals = ['', '', '', '', '', '', '','','',''];

// Attach all the events listener to the DOM objects
function attachEvents() {

    for(let i=0; i<10; i++) {
        let dieboxDOM = document.getElementById('diebox['+i+']');
        dieboxDOM.addEventListener('keydown', function(event) {
            if(event.key == 'Enter') dieboxDOM.blur();
        });
        dieboxDOM.addEventListener('change', function() {updateFormula(i);});
        dieboxDOM.addEventListener('focus', function() {showFormula(i);});
        dieboxDOM.addEventListener('blur', function() {showTotal(i)});
    }
    
    // when the user presses 'Enter' anywhere, the die are rolled.
    document.addEventListener('keydown', function(event) {
        if(event.key == 'Enter') rollDie();
    });
} attachEvents();

function rollDie() {
    let i, j, formulaNumbers, dieQty, dieFaces, dieBonusMalus, dieSign, dieTotal, dieBefore;
    for(i = 0; i < 10; i++) {
        if(dieFormulas[i] != '') {
            formulaNumbers = dieFormulas[i].match(/[0-9]+/g);
            dieQty = Number(formulaNumbers[0]);
            dieFaces = Number(formulaNumbers[1]);
            
            dieTotal = 0;
            dieBefore = '';
            
            for(j = 0; j < dieQty; j++) dieTotal += Math.floor(Math.random() * dieFaces + 1);
            
            
            if(formulaNumbers.length == 3) {
                if(dieQty == 1 && dieFaces == 20) dieBefore = ' (' + dieTotal + ')';
                dieBonusMalus = Number(formulaNumbers[2]);
                if(dieFormulas[i].search(/\+/g) > 0) dieTotal += dieBonusMalus;
                if(dieFormulas[i].search("\-") > 0) dieTotal -= dieBonusMalus;
            }
            
            dieTotals[i] = dieTotal + dieBefore;
            showTotal(i);
        } 
        else dieTotals[i] = '';
    }
}

function showFormula(diebox) {
    let dieboxDOM = document.getElementById("diebox["+diebox+"]");
    dieboxDOM.value = dieFormulas[diebox];
}

function showTotal(diebox) {
    let dieboxDOM = document.getElementById("diebox["+diebox+"]");
    if(dieTotals[diebox] != '') dieboxDOM.value = "="+dieTotals[diebox];
}

function updateFormula(diebox) {
    let dieboxDOM = document.getElementById("diebox["+diebox+"]");
    let formulaPattern = /^([0-9]+)d([0-9]+)([\+-][0-9]+){0,1}$/gi;
    if(!formulaPattern.test(dieboxDOM.value)) {
        dieFormulas[diebox] = '';
        dieTotals[diebox] = '';
        dieboxDOM.value = '';
        return;
    }
    if(dieFormulas[diebox] != dieboxDOM.value) {
        dieFormulas[diebox] = dieboxDOM.value;
        dieTotals[diebox] = '';
    }
    return;
}