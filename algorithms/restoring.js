let ans = "";
const ansEle = document.getElementById("finalResult");
const givenDataEle = document.getElementById("givenData");
const inputContainer = document.getElementById("inputContainer");
const resultContainer = document.getElementById("resultContainer");
const explainationContainer = document.getElementById("explaination");
const explaination = document.getElementById("explaination");
const table = document.getElementById("results");
const tbody = document.getElementById("tbody");
let rowEle = [];
let x = 1;
let rows = 1;
let indexOfRow = 0;
let isSubtraction = false;

function restoringDivision() {
  let factor1 = $('input[name="factor1"]').val();
  let factor2 = $('input[name="factor2"]').val();

  if (factor1 == "" || factor2 == "") {
    alert("Please Enter the Numbers");
    return;
  }

  factor1 =parseInt(factor1) ;
  factor2 =parseInt(factor2) ;

  if(parseInt(factor1) < 0 || parseInt(factor2) < 0){
    alert("Enter Positive Integers only");
    return;
  }

  x = 1;
  isSubtraction = false;
  explaination.innerHTML = "";
  resultContainer.classList.remove("hide");
  explainationContainer.classList.remove("hide");
  givenDataEle.classList.remove("hide");
  document.getElementById("nextBtn").disabled = false;
  indexOfRow = 0;
  var results = $("#results tbody");
  // Clear previous results
  results.html("");
  ans = "";
  ansEle.innerHTML = "";

  writeDetails("", "", "", "", "");
  // Get the number of bits
  if (Math.abs(factor1) > Math.abs(factor2)) {
    var bitLength = Math.log(Math.abs(factor1)) / Math.log(2);
  } else {
    var bitLength = Math.log(Math.abs(factor2)) / Math.log(2);
  }
  bitLength++;
  if (bitLength < 4) {
    bitLength = 4;
  }

  // Setup columns
  var A = "0".repeat(bitLength);
  var Q = twosComplement(factor1, bitLength);
  var Qn = Q.charAt(Q.length - 1);
  var M = twosComplement(factor2, bitLength);
  var count = Math.ceil(bitLength);
  writeDetails(A, Q, M, count);
  writeRow(
    results,
    A,
    Q,
    Qn,
    M + " / " + findTwoscomplement(M),
    count,
    "Initials"
  );
  count = M.length;
  document.getElementById("nextBtn").classList.remove("hide");
  document.getElementById("prevBtn").classList.remove("hide");
  // startExplaination();
  // rowEle = tbody.querySelectorAll("tr");
  // rowEle[0].classList.add("active");
  while (count > 0) {
    // Shifting
    A = A.substring(1, A.length);
    A = A + Q[0];
    Q = Q.substring(1, Q.length);
    writeRow(
      results,
      A,
      Q + "_",
      "_",
      findTwoscomplement(M),
      count,
      "Left Shift"
    );

    // Subtraction
    comp_M = findTwoscomplement(M);
    var tempA = parseInt(A, 2);
    var tempM = parseInt(M, 2);

    tempA = tempA - tempM;
    A = twosComplement(tempA, bitLength);
    writeRow(
      results,
      A,
      Q + "_",
      "_",
      findTwoscomplement(M),
      count,
      "A = A - M"
    );

    //process.stdout.write('A' + A + ' Q' + Q[1]+'_')

    if (A[0] == "1") {
      Q = Q + "0";
      Qn = "0";
      var tempA = parseInt(A, 2);
      var tempM = parseInt(M, 2);
      tempA = tempA + tempM;
      A = twosComplement(tempA, bitLength);
      A = A.substring(A.length - bitLength);

      writeRow(results, A, Q, Qn, M, count, "A = A + M");

      // console.log("A", A, " Q", Q, " -Restoration");
    } else {
      Q = Q + "1";
      Qn = "1";
      writeRow(results, A, Q, Qn, M, count, "A[0] == 0 -> Qn = 1");
    }
    count -= 1;
  }

  //Enabling Explain button
  document.getElementById("nextBtn").classList.remove("hide");
  document.getElementById("prevBtn").classList.remove("hide");
  startExplaination();
  rowEle = tbody.querySelectorAll("tr");
  rowEle[0].classList.add("active");
  ansEle.innerHTML +=
    "Remainder = (" +
    A +
    ")<sub>2</sub>&ensp; = (" +
    binaryToDecimal(A) +
    ")<sub>10</sub><br/> " +
    "Quotient = (" +
    Q +
    ")<sub>2</sub>&ensp; = (" +
    binaryToDecimal(Q) +
    ")<sub>10</sub> ";
}

function writeDetails(a, q, m, c) {
  givenDataEle.innerHTML =
    "<div><h3>Data :</h3></div><div><b>A = </b>" +
    a +
    "<br/><b>M = </b>" +
    m +
    "&ensp;&ensp;<b>M' = </b>" +
    findOnesComplement(m) +
    "&ensp;&ensp;<b>(M' + 1) = </b>" +
    findTwoscomplement(m) +
    "<br/><b>Q = </b>" +
    q +
    "<br/><b> Count = </b>" +
    c +
    "</div>";
}

function twosComplement(number, bitLength) {
  if (number < 0) {
    // Negate
    var bin = number.toString(2);
    bin = pad(bin.substring(1, bin.length), bitLength);
    bin = bin.replace(/1/g, "x");
    bin = bin.replace(/0/g, "1");
    bin = bin.replace(/x/g, "0");

    // Add 1
    number = parseInt(bin, 2);
    number += 1;
    bin = number.toString(2);
    return pad(bin, bitLength);
  } else {
    return pad(number.toString(2), bitLength);
  }
}

function writeRow(table, a, q, q1, m, sc, log) {
  // class='hide
  let str = "";
  if (indexOfRow == 0) {
    str = `${
      "<tr class='active row' index=" +
      indexOfRow +
      "> <td> <div>" +
      a +
      "</div></td><td><div>" +
      q +
      "</div></td><td><div>" +
      q1 +
      "</div></td><td><div>" +
      m +
      "</div></td><td><div>" +
      sc +
      "</div></td><td><div>" +
      log +
      "</div></td></tr>"
    }`;
  } else {
    str = `${
      "<tr class='row' index=" +
      indexOfRow +
      "> <td> <div>" +
      a +
      "</div></td><td><div>" +
      q +
      "</div></td><td><div>" +
      q1 +
      "</div></td><td><div>" +
      m +
      "</div></td><td><div>" +
      sc +
      "</div></td><td><div>" +
      log +
      "</div></td></tr>"
    }`;
  }

  indexOfRow++;
  table.append(str);
}

function pad(number, length) {
  var str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }

  return str;
}

function binaryToDecimal(n) {
  let num = n;
  let dec_value = 0;
  let base = 1;

  let temp = num;
  while (temp) {
    let last_digit = temp % 10;
    temp = Math.floor(temp / 10);
    dec_value += last_digit * base;
    base = base * 2;
  }
  return dec_value;
}

function findOnesComplement(str) {
  var newStr = "";
  var n = str.length;
  var i;
  for (i = 0; i < n; i++) {
    if (str.charAt(i) == "1") {
      newStr += "0";
    } else {
      newStr += "1";
    }
  }
  return newStr;
}

function findTwoscomplement(str) {
  var n = str.length;
  var i;
  for (i = n - 1; i >= 0; i--) if (str.charAt(i) == "1") break;
  if (i == -1) return "1" + str;
  for (k = i - 1; k >= 0; k--) {
    if (str.charAt(k) == "1")
      str = str.substring(0, k) + "0" + str.substring(k + 1, str.length);
    else str = str.substring(0, k) + "1" + str.substring(k + 1, str.length);
  }
  return str.toString();
}

// Animation
function startExplaination() {
  let activeRows = document.querySelectorAll(".active");
  explaination.innerHTML = "";
  if (activeRows.length == 0) {
    document.getElementById("text").innerHTML +=
      "<br/>There are no steps included in the table. <br/> First go to next step.";
    return;
  }

  let ac1, qr1, qrn1, br1, sc1,log1;
  let ac2, qr2, qrn2, br2, sc2;

  //Declaring the Values of current row;
  let allData1 = activeRows[activeRows.length - 1].children;
  ac1 = allData1[0].children[0].innerHTML;
  qr1 = allData1[1].children[0].innerHTML;
  qrn1 = allData1[2].children[0].innerHTML;
  br1 = allData1[3].children[0].innerHTML;
  sc1 = allData1[4].children[0].innerHTML;
  log1 = allData1[5].children[0].innerHTML;

  //Declaring the Values of previous row
  let allData2 = null;
  if (activeRows.length >= 2) {
    allData2 = activeRows[activeRows.length - 2].children;
    ac2 = allData2[0].children[0].innerHTML;
    qr2 = allData2[1].children[0].innerHTML;
    qrn2 = allData2[2].children[0].innerHTML;
    br2 = allData2[3].children[0].innerHTML;
    sc2 = allData2[4].children[0].innerHTML;
  }

  // For First Step Only
  let instruction = "";
  if (allData2 == null) {
    instruction =
      "<div class='text' id='text'><br/>This is the first step of restoring division where we write the values of all the variables as it is in the table.<br/>The values are,<br/> <br/> A = " +
      ac1 +
      "<br/>M = " +
      br1 +
      "" +
      "<br/>Q = " +
      qr1 +
      "<br/>count = " +
      sc1;
    explaination.innerHTML = instruction;
    explaination.innerHTML +=
      "<br/><br/>After writing the values we perform shifting in the next step.";
    return;
  }

  //Steps to perform :
  if (ac2[0] == "0" && qrn1 == "_" && log1 == "A = A - M") {
    let str = `<br/>Now we have new A's MSB as <span class='red'>0</span><br/><br/>So now we will perform addition of <span class='red'>A</span> and <span class='red'>M'+1</span><br/><br/>`;
    explaination.innerHTML += str;
    let str1 = `<div class="test"> A &ensp;&ensp;&ensp;&ensp;=> ${ac2} <br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;    +   <br/>M'+1 &ensp;=> ${br2}  <br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;  ___________  <br/>AC<sub>new</sub>&ensp;&ensp;=> <span class='red'>${ac1}</span><br/><br/>
    After Subtraction, we check the MSB of A i.e A[0] = <span class='red'>${ac1.charAt(
      0
    )}</span><br/>Therefore the last bit of Q will become <span class='red'>${
      ac1.charAt(0) == "0" ? "1" : "0"
    }</span></div> `;
    explaination.innerHTML += str1;
    // isSubtraction = true;
  } else if (ac2[0] == "1" && qrn1 == "_" && log1 == "A = A - M") {
    let str = `<br/>Now we have new A's MSB as <span class='red'>0</span><br/><br/>So now we will perform addition of <span class='red'>A</span> and <span class='red'>M'+1</span><br/><br/>`;
    explaination.innerHTML += str;
    let str1 = `<div class="test"> A &ensp;&ensp;&ensp;&ensp;=> ${ac2} <br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;    +   <br/>M'+1 &ensp;=> ${br2}  <br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;  ___________  <br/>AC<sub>new</sub>&ensp;&ensp;=> <span class='red'>${ac1}</span><br/><br/>
      After Subtraction, we check the MSB of A i.e A[0] = <span class='red'>${ac1.charAt(
        0
      )}</span><br/>Therefore the last bit of Q will become <span class='red'>${
      ac1.charAt(0) == "0" ? "1" : "0"
    }</span></div> `;
    explaination.innerHTML += str1;
    // isSubtraction = true;
  } else if (ac2[0] == "1" && qrn1 != "_" && log1 == "A = A + M") {
    // explaination.classList.add("animate");
    let str = `<br/>Now we have new A's MSB as <span class='red'>1</span><br/><br/>So now we will perform addition of <span class='red'>A</span> and <span class='red'>M</span> to restore A<br/><br/>`;
    explaination.innerHTML += str;
    let str1 = `<div class="test"> 
    A &ensp;&ensp;&ensp;&ensp;=>     ${ac2} <br/>
    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;    +   <br/>
    M &ensp;&ensp;&ensp;&ensp;=>     ${findTwoscomplement(br2)}  <br/>
    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;  ___________  <br/>AC<sub>new</sub>&ensp;&ensp;=>               <span class='red'>${ac1}</span> <br/>
    <br/>Now we will shift the bits in the next step.
</div> `;
    explaination.innerHTML += str1;
    isSubtraction = false;
  } else {
    explaination.innerHTML = "";
    explaination.innerHTML +=
      "<br/> The shifting has been perfomed as follow : <br/><br/>";
    explainationContainer.innerHTML += `<div class="hide animate" id="animate"><p>AC &ensp; &ensp;&ensp;&ensp; QR &ensp;&ensp; </p><p>${ac2} &ensp; &ensp; ${qr2} &ensp; &ensp;</p><p>${ac1} &ensp; &ensp; ${qr1} &ensp; &ensp;</p></div>`;
    document.getElementById("animate").classList.remove("hide");
    explaination.innerHTML += `After Shifting We will perform Subtraction i.e<span class='red'> A = A - M</span>`;
    isSubtraction = true;
  }
}

function next() {
  document.getElementById("explaination").innerHTML = "";
  if (rowEle.length <= 0) return;
  if (rowEle.length > x) {
    rowEle[x].classList.add("active");
    ++x;
    document.getElementById("prevBtn").disabled = false;
  } else {
    document.getElementById("nextBtn").disabled = true;
    ansEle.style.display = "block";
  }
  startExplaination();
}

function previous() {
  document.getElementById("explaination").innerHTML = "";
  if (rowEle.length <= 0) return;

  if (x > 0) {
    --x;
    rowEle[x].classList.remove("active");
    document.getElementById("nextBtn").disabled = false;

    if (x < rowEle.length) {
      ansEle.style.display = "none";
    }
  } else {
    document.getElementById("prevBtn").disabled = true;
  }
  startExplaination();
}
