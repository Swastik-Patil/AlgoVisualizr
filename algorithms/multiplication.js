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
let isAddition = true;

function writeDetails(ac, qr, br, sc) {
  givenDataEle.innerHTML =
    "<div><h3>Data :</h3></div><div><b>AC = </b>" +
    ac +
    "<br/><b>BR = </b>" +
    br +
    "&ensp;&ensp;<b>BR' = </b>" +
    findOnesComplement(br) +
    "&ensp;&ensp;<b>(BR' + 1) = </b>" +
    findTwoscomplement(br) +
    "<br/><b>QR = </b>" +
    qr +
    "<br/><b> SC = </b>" +
    sc +
    "</div>";
}

function multiply() {
  // Get Numbers
  let factor1 = $('input[name="factor1"]').val();
  let factor2 = $('input[name="factor2"]').val();

  if (factor1 == "" || factor2 == "") {
    alert("Please Enter the Numbers");
    return ; 
  }

  factor1 = parseInt(factor1);
  factor2 = parseInt(factor2);

  x = 1;
  isAddition = true;
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

  if(bitLength < 4){
    bitLength = 4;
  }

  // Setup columns
  var a = pad(0, bitLength);
  var q = twosComplement(factor2, bitLength);
  var q1 = "0";
  var m = twosComplement(factor1, bitLength);
  var sc = Math.ceil(bitLength);
  writeDetails(a, q, m, sc);
  writeRow(results, a, q, q1, m, sc, "Initials");

  for (var i = 0; i < bitLength; i++) {
    if (q1 == "0" && q.substring(q.length - 1) == "1") {
      var tempA = parseInt(a, 2);
      var tempM = parseInt(m, 2);

      tempA = tempA - tempM;
      a = twosComplement(tempA, bitLength);
      writeRow(
        results,
        a,
        q,
        q1,
        findTwoscomplement(m),
        "",
        "AC = AC + (BR' + 1)"
      );
    } else if (q1 == "1" && q.substring(q.length - 1) == "0") {
      var tempA = parseInt(a, 2);
      var tempM = parseInt(m, 2);

      tempA = tempA + tempM;
      a = twosComplement(tempA, bitLength);
      a = a.substring(a.length - bitLength);

      writeRow(results, a, q, q1, m, "", "AC = AC + BR");
    }

    q1 = q.substring(q.length - 1);
    q = a.charAt(a.length - 1) + q.substring(0, q.length - 1);
    a = a.charAt(0) + a.substring(0, a.length - 1);

    writeRow(results, a, q, q1, m, --sc, "Shift Right");
    rows++;
  }

  ans += a;
  ans += q;
  ansEle.style.display = "none";

  //Enabling Explain button
  document.getElementById("nextBtn").classList.remove("hide");
  document.getElementById("prevBtn").classList.remove("hide");
  startExplaination();
  rowEle = tbody.querySelectorAll("tr");
  rowEle[0].classList.add("active");

  if ((factor1 < 0 || factor2 < 0) && !(factor1 < 0 && factor2 < 0)) {
    ansEle.innerHTML += "Answer = (" + ans + ")&ensp;";
    // ansEle.innerHTML += "<sub>2</sub>";
    ans = findTwoscomplement(ans);
    ansEle.innerHTML +=
      "<br/>Since the one number is negative so we have to take 2's complement of result.";
    ansEle.innerHTML += "<br/> There fore 2's complement is : <br/> ";
    ansEle.innerHTML +=
      "(" +
      ans +
      ")<sub>2</sub>" +
      " = -(" +
      binaryToDecimal(ans) +
      ")<sub>2</sub>";
    return;
  }
  ansEle.innerHTML +=
    "Answer = (" +
    ans +
    ")<sub>2</sub>&ensp; = (" +
    binaryToDecimal(ans) +
    ")<sub>10</sub>";
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

  let ac1, qr1, qrn1, br1, sc1;
  let ac2, qr2, qrn2, br2, sc2;

  //Declaring the Values of current row;
  let allData1 = activeRows[activeRows.length - 1].children;
  ac1 = allData1[0].children[0].innerHTML;
  qr1 = allData1[1].children[0].innerHTML;
  qrn1 = allData1[2].children[0].innerHTML;
  br1 = allData1[3].children[0].innerHTML;
  sc1 = allData1[4].children[0].innerHTML;

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
      "<div class='text' id='text'><br/>This is the first step of booths algorithm where we write the values of all the variables as it is in the table.<br/>The values are,<br/> <br/> AC = " +
      ac1 +
      "<br/>BR = " +
      br1 +
      "" +
      "<br/>QR = " +
      qr1 +
      "<br/>QR<sub>n+1</sub> = " +
      qrn1 +
      "<br/>SC = " +
      sc1;

    explaination.innerHTML = instruction;

    explaination.innerHTML +=
      "<br/><br/>Here we have QR's LSB as " +
      "<span class='red'>" +
      qr1[qr1.length - 1] +
      "</span>" +
      " And QR<sub>n+1</sub> as " +
      "<span class='red'>" +
      qrn1 +
      "</span>";

    if (qr1[qr1.length - 1] == "1" && qrn1 == "0") {
      //10
      explaination.innerHTML +=
        "<br/><br/> So we will Perform Addition of <span class='red'> AC </span> and <span class='red'> BR'+1 </span>in the next step. <br/> </div>";
    } else {
      //00 && 11
      explaination.innerHTML +=
        "<br/><br/> So in the next step we will Shifts the bits of <span class='red'> AC </span> and <span class='red'> QR </span> to the right.<br/><br/></div>";
    }
    return;
  }

  //Steps to perform :
  if (qr2[qr2.length - 1] == "0" && qrn2 == "1" && isAddition) {
    let str = `<br/>Now we have new QR's LSB as <span class='red'>0</span> and QR<sub>n+1</sub> as <span class='red'>1</span><br/><br/>So now we will perform addition of <span class='red'>AC</span> and <span class='red'>BR</span><br/><br/>`;
    explaination.innerHTML += str;
    let str1 = `<div class="test"> AC &ensp;&ensp;&ensp;&ensp;=> ${ac2} <br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;    +   <br/>BR &ensp;&ensp;&ensp;&ensp;=> ${br2}  <br/>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;  ___________  <br/>AC<sub>new</sub>&ensp;&ensp;=> <span class='red'>${ac1}</span><br/><br/>Now we will shift the bits in the next step.</div> `;
    explaination.innerHTML += str1;
    isAddition = false;
  } else if (qr2[qr2.length - 1] == "1" && qrn2 == "0" && isAddition) {
    // explaination.classList.add("animate");
    let str = `<br/>Now we have new QR's LSB as <span class='red'>1</span> and QR<sub>n+1</sub> as <span class='red'>0</span><br/><br/>So now we will perform addition of <span class='red'>AC</span> and <span class='red'>BR'+1</span><br/><br/>`;
    explaination.innerHTML += str;
    let str1 = `<div class="test"> 
    AC &ensp;&ensp;&ensp;&ensp;=>     ${ac2} <br/>
    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;    +   <br/>
    BR'+1 &ensp;=>     ${findTwoscomplement(br2)}  <br/>
    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;  ___________  <br/>AC<sub>new</sub>&ensp;&ensp;=>               <span class='red'>${ac1}</span> <br/>
                <br/>Now we will shift the bits in the next step.
</div> `;
    explaination.innerHTML += str1;
    isAddition = false;
  } else {
    explaination.innerHTML = "";
    explaination.innerHTML +=
      "<br/> The shifting has been perfomed as follow : <br/><br/>";
    explainationContainer.innerHTML += `<div class="hide animate" id="animate"><p>AC &ensp; &ensp;&ensp;&ensp; QR &ensp;&ensp; QR<sub>n+1</sub></p><p>${ac2} &ensp; &ensp; ${qr2} &ensp; &ensp; ${qrn2}</p><p>${ac1} &ensp; &ensp; ${qr1} &ensp; &ensp; ${qrn1}</p></div>`;
    document.getElementById("animate").classList.remove("hide");
    explaination.innerHTML += `After Shifting the SC counter will be decreased by 1.<br/> i.e. SC = ${sc1}`;
    isAddition = true;
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

