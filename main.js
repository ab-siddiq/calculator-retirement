const user = (getID, setID) =>{
    document.getElementById(setID).innerHTML = document.getElementById(getID).value;
    document.getElementById(setID).style.color = '#EF4B27';
    document.getElementById(setID).style.textTransform = 'uppercase';
}

const displayHide = (displayID = '', hideID = '', inputValueID = '', outputValueID = '') => {

    document.getElementById(displayID).style.display = 'block';
    document.getElementById(hideID).style.display = 'none';


    if (inputValueID != '' && outputValueID != '') {
        document.getElementById(outputValueID).innerHTML = document.getElementById(inputValueID).value;
        document.getElementById(outputValueID).style.fontWeight = 'bold';
        // document.querySelectorAll('li#'+outputValueID).style.color = 'red';

    }

}
const getSetRadioButtonValue = (inputID, outputID) => {
    let inputValue = document.getElementById(inputID).value;

    if (inputValue == 1) {
        document.getElementById(outputID).innerHTML = "Safe";
        document.getElementById(outputID).style.fontWeight = 'bold';
    } else if (inputValue == 2) {
        document.getElementById(outputID).innerHTML = "Moderate";
        document.getElementById(outputID).style.fontWeight = 'bold';
    }
    else if (inputValue == 3) {
        document.getElementById(outputID).innerHTML = "Aggressive";
        document.getElementById(outputID).style.fontWeight = 'bold';
    } else {
        console.log('errror');
    }
}
const getInputValue = () => {
    // let name = callInputID('name-display');
    // let age = parseFloat(callInputID('age-display'));
    // let retirementAge = parseFloat(callInputID('retirement-age-display'));
    // let needSupportAge = parseFloat(callInputID('need-support-age-display'));
    // let monthlyExpense = parseFloat(callInputID('monthly-expense-display'));
    // let risk = callInputID('risk-display');
    // console.log(risk);
    const getInputValues = Array.from(document.getElementsByClassName('display-output'));
    let storeInputValues = [];
    getInputValues.forEach(getValue => storeInputValues.push(getValue.innerText));
    [yourName, age,retirementAge, atAge, presentCost,risk] = storeInputValues;
         
    const inputValues = {
        name: yourName,
        age: parseFloat(age),
        retirementAge: parseFloat(retirementAge),
        ageGoal: parseFloat(atAge),
        goalCost: parseFloat(presentCost),
        risk: risk,
    }
  
    console.log(inputValues);
    calculationInvestorInput(inputValues);
}

const setOutputValue = (inputValues) => {

}

const callInputID = (id) => document.getElementById(id).innerHTML;

const calculationInvestorInput = (inputValues) => {
    let sipReturn;
    if (inputValues.risk === "Safe") {
        sipReturn = 6;
    }
    else if (inputValues.risk === "Moderate") {
        sipReturn = 11;
    }
    else if (inputValues.risk === "Aggressive") {
        sipReturn = 10;
    }
    const currentRateInflation = 6;
    const fixedReturn = 10;
    let ageDifference1 = inputValues.retirementAge - inputValues.age;
    let ageDifference2 = inputValues.ageGoal - inputValues.retirementAge;
    let r = (sipReturn / 100) / 12;
    let npr = (ageDifference1 * 12);
   
    let i = (((1 + fixedReturn / 100) / (1 + currentRateInflation / 100)) - 1);

    let cfv = (inputValues.goalCost * 12) * Math.pow((1 + (currentRateInflation / 100)), ageDifference1);
   
    // let cpmt = (cfv * r) / (Math.pow((1 + r), npr));
    // let cpv = ((1-1/Math.pow((1+i),ageDifference2))/i)*cfv;
    
    let cpv = (cfv / i) * (1 - ((Math.pow(1/(1 + i), ageDifference2))));
    let cpmt = (cpv* r) / (Math.pow((1+r), npr)-1);
   
    let fixedPMT = cpmt.toFixed(2);
    let ceilPMT = Math.floor(fixedPMT);
   
    // let fixedFV = cfv.toFixed(2);
    let fixedFV = Math.floor(cfv);
  
    // let ceilFV = Math.ceil(fixedFV);
    // let fixedPV = cpv.toFixed(2);
    let fixedPV = Math.floor(cpv);
    
    // let p3 = p2.toFixed(2)
    
    


    // console.log(1-1/Math.pow((1+i),ageDifference2),'pow')
    fv = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 15 }).format(fixedFV);
    pv1 = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 15 }).format(fixedPV);
    pv2 = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 15 }).format(cpv);
    pmt = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 15 }).format(ceilPMT);

    
    const outputValues = {
        name: inputValues.name,
        retirementAge: inputValues.retirementAge,
        needSupportAge: inputValues.ageGoal,
        fv: fv,
        pmt: pmt,
        pv1: pv1,
        pv2: pv2,
        possibleInvest: inputValues.possibleInvestment,
    }
    showOutput(outputValues);
}

const showOutput = (outputValues) => {
    // console.log(outputValues);
    document.querySelector('.output-top').innerHTML = `
        <p class="text-justify"> 
            Dear Mr/ Mrs. <strong> ${outputValues.name} </strong>From the Age of  <strong> ${outputValues.retirementAge+1}</strong> You Need <strong>${outputValues.fv} Taka </strong>per year to maintain your current life style.
        </p>
        `
    document.querySelector('.output-middle').innerHTML = `
        <p class="text-justify">
            Alternatively, you need total <strong>${outputValues.pv1} Taka</strong> ,after retirement to maintain your current life style up to <strong>${outputValues.needSupportAge}</strong> th year of your life.
        </p>
        `
        document.querySelector('.output-bottom').innerHTML = `
        <p class = "text-justify">   
            Your monthly SIP investment is <strong> ${outputValues.pmt} Taka </strong> "will help you to acheive your retirement goal i.e.<strong>${outputValues.pv2} Taka</strong> at the age of 66 years. "
        </p>
    `
}


// ===========================================Need Help Questions==================================

function needHelpQuestionButtonEvent(displayID, hideID, condition) {
    let itemDisplay;
    let itemHide;
    let questionWeight;
    if (condition == true) {
        itemDisplay = document.getElementById("wealth-question-" + displayID);
        itemHide = document.getElementById("wealth-question-" + hideID);

    }
    if (condition == false) {
        itemDisplay = document.getElementById(displayID);
        itemHide = document.getElementById(hideID);
    }

    itemDisplay.style.display = "block";
    itemHide.style.display = "none";
    riskCalculation();
}
// get question value
function getNeedHelpQuestionValue(optionID, optionScoreID, questionOptionID, questionWeight) {
    let getInputValue = parseFloat(document.getElementById(optionID).value);

    let calculateQuestionWeight = getInputValue * questionWeight;
    document.getElementById(optionScoreID).innerHTML = questionWeight;
    document.getElementById(questionOptionID).innerHTML = getInputValue;
    console.log(getInputValue * questionWeight + " pressed ", typeof (getInputValue));
}
function riskCalculation() {

    const demoWeight = .24;
    const w1 = .15;
    const w2 = .18;
    const w3 = .15;
    const w4 = .18;
    const w5 = .1;
    const highestScore = w1 * 4 + w2 * 4 + w3 * 4 + w4 * 4 + w5 * 4 + demoWeight * 24;
    const lowestScore = w1 + w2 + w3 + w4 + w5 + demoWeight * 12;
    let questionOneOption = getQuestionWeight('question-one-option');
    let questionTwoOption = getQuestionWeight('question-two-option');
    let questionThreeOption = getQuestionWeight('question-three-option');
    let questionFourOption = getQuestionWeight('question-four-option');
    let questionFiveOption = getQuestionWeight('question-five-option');
    let questionOneWeight = (questionOneOption * w1);
    let questionTwoWeight = (questionTwoOption * w2);
    let questionThreeWeight = (questionThreeOption * w3);
    let questionFourWeight = (questionFourOption * w4);
    let questionFiveWeight = (questionFiveOption * w5);
    const demographicScore = (18 * demoWeight);
    let sumRiskValue = questionOneWeight + questionTwoWeight + questionThreeWeight + questionFiveWeight + questionFiveWeight + demographicScore;
    console.log(sumRiskValue, '=>risk', highestScore, '=>high', lowestScore, '=>low', demographicScore, 'demo');
    if (sumRiskValue >= 3.64 && sumRiskValue <= 6) {
        document.getElementById('risk-id').innerHTML = 'Safe Risk';
        setRisk('risk1');
    } else if (sumRiskValue > 6 && sumRiskValue <= 7.5) {
        setRisk('risk2');
        document.getElementById('risk-id').innerHTML = 'Moderate Risk';
    } else if (sumRiskValue > 7.5 && sumRiskValue <= 8.8) {
        setRisk('risk3');
        document.getElementById('risk-id').innerHTML = 'Aggressive Risk';
    } else { console.log('false'); }
}

function getQuestionWeight(id) {
    let questionWeight = parseFloat(document.getElementById(id).innerHTML);

    console.log(questionWeight, typeof (questionWeight));
    return questionWeight;
}
function setRisk(id) {
    document.getElementById(id).click();
}
