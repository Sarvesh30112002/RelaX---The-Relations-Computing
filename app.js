/* 
This is the elements object which contains properties 
consists of variable and method or function to perform 
operation related to elements data management
*/
const elements = {
    element: [],
    numArr: [],
    pairedElem: [],
    getElem: () => element,
    getNumArr: () => elements.numArr,
    getPairedElem: () => elements.pairedElem,
    resetVar: () => {
        elements.element = [];
        elements.numArr = [];
        elements.pairedElem = [];
    },
    // This function trim the input from the text field to take just a number
    // in an array
    trimInput: () => {
        let regex = /\w/g;
        element = document.getElementById("elements").value.match(regex);
    },
    // This function list all numbers that was the element of the set
    // without repetition
    identifyNumber: () => {
        for (let i = 0; i < element.length; i++) {
            if (elements.numArr.indexOf(element[i]) === -1) {
                elements.numArr.push(element[i]);
            }
            if (i % 2 === 0 && i !== (element.length - 1)) {
                elements.pairedElem.push([element[i], element[i + 1]]);
            }
        }
    },
    // This function parse the value in the array from string to integer
    parseElem: () => {
        for (let i = 0; i < elements.numArr.length; i++) {
            let temp = elements.numArr[i];
            elements.numArr[i] = parseInt(temp);
        }
        for (let j = 0; j < elements.pairedElem.length; j++) {
            let a = elements.pairedElem[j][0];
            let b = elements.pairedElem[j][1];
            elements.pairedElem[j] = [parseInt(a), parseInt(b)];
        }
    },
};

/* 
This section is an hash object which allow us to check
pair existence by checking property existence of the object
 */
let elemHash = {};

function createElemHash() {
    for (let i = 0; i < elements.getPairedElem().length; i++) {
        elemHash[elements.getPairedElem()[i]] = i;
    }
}

function resetHash() {
    elemHash = {};
}

/* 
This is the reflexive object which contains properties 
consists of variable and method or function to perform 
operation related to reflexive data management
 */
const reflexive = {
    status: "REFLEXIVE",
    closure: [],
    isTrue: false,
    getStatus: () => reflexive.status,
    getClosure: () => reflexive.closure,
    getIsTrue: () => reflexive.isTrue,
    resetRef: () => {
        reflexive.status = "REFLEXIVE";
        reflexive.closure = [];
        reflexive.isTrue = false;
    },
    // This function will determine the set properties based on reflexive definition
    determine: () => {
        for (let i = 0; i < elements.getNumArr().length; i++) {
            let pair = [elements.getNumArr()[i], elements.getNumArr()[i]];
            if (!elemHash.hasOwnProperty(pair)) {
                reflexive.status = "IRREFLEXIVE";
                reflexive.closure.push(pair);
            } else {
                reflexive.isTrue = true;
            }
        }
    },
    // This function will define the format of output to display the closure when necessary
    formatClosure: () => {
        let strClosure = "Reflexive Closure = ";
        if (reflexive.getClosure().length > 0 && reflexive.isTrue) {
            strClosure = strClosure + "{";
            for (let i = 0; i < (elements.getPairedElem().length + reflexive.getClosure().length); i++) {
                if (i >= elements.getPairedElem().length) {
                    if (i == (elements.getPairedElem().length + reflexive.getClosure().length - 1)) {
                        strClosure = strClosure + "(" + reflexive.getClosure()[i - elements.getPairedElem().length] + ")";
                    } else {
                        strClosure = strClosure + "(" + reflexive.getClosure()[i - elements.getPairedElem().length] + "),";
                    }
                } else {
                    strClosure = strClosure + "(" + elements.getPairedElem()[i] + "),"
                }
            }
            strClosure = strClosure + "}";
            return strClosure;
        } else {
            return "";
        }
    }
};

/* 
This is the symmetric object which contains properties 
consists of variable and method or function to perform 
operation related to symmetric data management
 */
const symmetric = {
    status: "SYMMETRIC",
    closure: [],
    isTrue: false,
    getStatus: () => symmetric.status,
    getClosure: () => symmetric.closure,
    getIsTrue: () => symmetric.isTrue,
    resetSym: () => {
        symmetric.status = "SYMMETRIC";
        symmetric.closure = [];
        symmetric.isTrue = false;
    },
    // This function will determine the set properties based on symmetric definition
    determine: () => {
        for (let i = 0; i < (elements.getNumArr().length - 1); i++) {
            for (let j = i + 1; j < elements.getNumArr().length; j++) {
                let pair1 = [elements.getNumArr()[i], elements.getNumArr()[j]];
                let pair2 = [elements.getNumArr()[j], elements.getNumArr()[i]];
                if (elemHash.hasOwnProperty(pair1)) {
                    if (!elemHash.hasOwnProperty(pair2)) {
                        symmetric.status = "NOT SYMMETRIC";
                        symmetric.isTrue = true;
                        symmetric.closure.push(pair1);
                        symmetric.closure.push(pair2);
                    } else {
                        symmetric.isTrue = true;
                        if (transitive.getNeedHave().indexOf(elements.getNumArr()[i]) === -1) {
                            transitive.needHave.push(elements.getNumArr()[i]);
                        }
                        if (transitive.getNeedHave().indexOf(elements.getNumArr()[j]) === -1) {
                            transitive.needHave.push(elements.getNumArr()[j]);
                        }
                    }
                } else if (elemHash.hasOwnProperty(pair2)) {
                    if (!elemHash.hasOwnProperty(pair1)) {
                        symmetric.status = "NOT SYMMETRIC";
                        symmetric.isTrue = true;
                        symmetric.closure.push(pair1);
                        symmetric.closure.push(pair2);
                    } else {
                        symmetric.isTrue = true;
                        if (transitive.getNeedHave().indexOf(elements.getNumArr()[i]) === -1) {
                            transitive.needHave.push(elements.getNumArr()[i]);
                        }
                        if (transitive.getNeedHave().indexOf(elements.getNumArr()[j]) === -1) {
                            transitive.needHave.push(elements.getNumArr()[j]);
                        }
                    }
                }
            }
        }
    },
    // This function will define the format of output to display the closure when necessary
    formatClosure: () => {
        let strClosure = "Symmetric Closure = ";
        if (symmetric.getClosure().length > 0) {
            strClosure = strClosure + "{";
            for (let i = 0; i < (elements.getPairedElem().length + symmetric.getClosure().length); i++) {
                if (i >= elements.getPairedElem().length) {
                    if (!elemHash.hasOwnProperty(symmetric.getClosure()[i - elements.getPairedElem().length])) {
                        if (i == (elements.getPairedElem().length + symmetric.getClosure().length - 1)) {
                            strClosure = strClosure + "(" + symmetric.getClosure()[i - elements.getPairedElem().length] + ")";
                        } else {
                            strClosure = strClosure + "(" + symmetric.getClosure()[i - elements.getPairedElem().length] + "),";
                        }
                    }
                } else {
                    strClosure = strClosure + "(" + elements.getPairedElem()[i] + "),"
                }
            }
            strClosure = strClosure + "}";
            return strClosure;
        } else {
            return "";
        }
    }
};

/* 
This is the transitive object which contains properties 
consists of variable and method or function to perform 
operation related to transitive data management
 */
const transitive = {
    status: "TRANSITIVE",
    isTrue: false,
    closure: [],
    needHave: [],
    getStatus: () => transitive.status,
    getClosure: () => transitive.closure,
    getNeedHave: () => transitive.needHave,
    getIsTrue: () => transitive.isTrue,
    resetTran: () => {
        transitive.status = "TRANSITIVE";
        transitive.closure = [];
        transitive.needHave = [];
        transitive.isTrue = false;
    },
    // This function will determine the set properties based on transitive definition
    determine: () => {
        if (transitive.getNeedHave().length > 0) {
            transitive.isTrue = true;
        }
        for (let i = 0; i < transitive.getNeedHave().length; i++) {
            let pair = [transitive.getNeedHave()[i], transitive.getNeedHave()[i]];
            if (!elemHash.hasOwnProperty(pair)) {
                transitive.status = "NOT TRANSITIVE";
                transitive.closure.push(pair);
            }
        }
    },
    // This function will define the format of output to display the closure when necessary
    formatClosure: () => {
        let strClosure = "Transitive Closure = ";
        if (transitive.getClosure().length > 0) {
            strClosure = strClosure + "{";
            for (let i = 0; i < (elements.getPairedElem().length + transitive.getClosure().length); i++) {
                if (i >= elements.getPairedElem().length) {
                    if (i == (elements.getPairedElem().length + transitive.getClosure().length - 1)) {
                        strClosure = strClosure + "(" + transitive.getClosure()[i - elements.getPairedElem().length] + ")";
                    } else {
                        strClosure = strClosure + "(" + transitive.getClosure()[i - elements.getPairedElem().length] + "),";
                    }
                } else {
                    strClosure = strClosure + "(" + elements.getPairedElem()[i] + "),"
                }
            }
            strClosure = strClosure + "}";
            return strClosure;
        } else {
            return "";
        }
    }
}

/* 
This is the result object which contains properties 
consists of variable and method or function to perform 
operation related to result data management
 */
const result = {
    conclusion: "The set properties is ",
    // This function will reset back all variable so that
    // the result won't be logic error
    start: () => {
        elements.resetVar();
        resetHash();
        reflexive.resetRef();
        symmetric.resetSym();
        transitive.resetTran();
        result.conclusion = "The set properties is ";
    },
    getConc: () => result.conclusion,
    // This function is to define the output format based on the final
    // result on the properties of the set.
    formatOutput: () => {
        if (reflexive.isTrue && symmetric.isTrue && transitive.isTrue) {
            result.conclusion = result.conclusion + reflexive.getStatus() + ", " + symmetric.getStatus() + " and " + transitive.getStatus();
        } else if (reflexive.isTrue && symmetric.isTrue) {
            result.conclusion = result.conclusion + reflexive.getStatus() + " and " + symmetric.getStatus();
        } else if (reflexive.isTrue && transitive.isTrue) {
            result.conclusion = result.conclusion + reflexive.getStatus() + " and " + transitive.getStatus();
        } else if (symmetric.isTrue && transitive.isTrue) {
            result.conclusion = result.conclusion + symmetric.getStatus() + " and " + transitive.getStatus();
        } else if (reflexive.isTrue) {
            result.conclusion = result.conclusion + reflexive.getStatus();
        } else if (symmetric.isTrue) {
            result.conclusion = result.conclusion + symmetric.getStatus();
        } else if (transitive.isTrue) {
            result.conclusion = result.conclusion + transitive.getStatus();
        }
    },
    // This funtion call all other functions needed to perform the whole
    // operation to determin the set properties
    displayResult: () => {
        result.start();
        elements.trimInput();
        elements.identifyNumber();
        elements.parseElem();
        createElemHash();
        reflexive.determine();
        symmetric.determine();
        transitive.determine();
        result.formatOutput();
        document.getElementById("properties").innerHTML = result.getConc();
        document.getElementById("ref-closure").innerHTML = reflexive.formatClosure();
        document.getElementById("sym-closure").innerHTML = symmetric.formatClosure();
        document.getElementById("tra-closure").innerHTML = transitive.formatClosure();
    }
};

// This section will set the text field back to blank after it is refreshed
window.onload = () => {
    document.getElementById("elements").value = "";
    document.getElementById("properties").innerHTML = "";
}

alert("Weclome to RelaX - The Relations Computing....Press 'Ok' to continue")