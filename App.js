//------------------------HTML Code-----------------------------------

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Base Converter</title>
//     <link rel="stylesheet" href="style.css">
//     <script src="App.js" defer></script>
// </head>
// <body>
//     <main>
//         <h1>Base Converter</h1>
//         <div id="select-container">
//             <select id="from-select">
//             <option value="from-binary">Binary</option>
//             <option value="from-decimal">Decimal</option>
//             <option value="from-hexadecimal">Hexadecimal</option>
//             <option value="from-octal">Octal</option>
//          </select>
//             <span>to</span>
//             <select id="to-select">
//             <option value="to-binary">Binary</option>
//             <option value="to-decimal">Decimal</option>
//             <option value="to-hexadecimal">Hexadecimal</option>
//             <option value="to-octal">Octal</option>
//          </select>
//         </div>
//         <div id="input-container">
//             <input type="text" id="from-input" placeholder="Binary Number">
//             <span id="error"></span>
//             <button id="convert-button">Convert</button>
//             <input type="text" id="to-input" placeholder="Binary Number" readonly>
//         </div>
//     </main>
// </body>
// </html>

//------------------------CSS Code-----------------------------------

// @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
// * {
//     font-family: "Poppins", sans-serif;
//     margin: 0;
//     padding: 0;
// }

// body,
// main {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// }

// body {
//     background-color: rgb(245, 105, 253);
//     min-height: 100vh;
// }

// main {
//     background-image: linear-gradient( 90deg, #28e8c8 10%, #64bdfd, rgb(110, 110, 110));
//     padding: 100px 60px;
//     border-radius: 10px;
// }

// #select-container {
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
// }

// select {
//     margin: 10px 20px;
//     padding: 7px 50px;
//     outline: none;
// }

// input {
//     background-color: #fff;
//     min-width: 350px;
//     margin: 15px;
//     padding: 30px;
//     border: none;
//     border-radius: 8px;
//     outline: none;
//     transition: 0.5s;
// }

// input:focus {
//     box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.5);
// }

// #convert-button {
//     padding: 7px 50px;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: 0.3s transform;
// }

// #convert-button:active {
//     transform: scale(0.9);
// }

// #input-container {
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
// }

// #error {
//     display: none;
//     color: #f00;
//     font-size: small;
//     margin: 0 0 10px 30px;
//     text-align: start;
// }

// #written-by-container {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     border: 2px solid #000;
//     border-radius: 10px;
//     padding: 1rem;
//     margin-top: 5px;
// }

// #written-by-container a {
//     color: #000;
// }

//------------------------JS Code-----------------------------------
const fromSelected = document.getElementById("from-select");
const toSelected = document.getElementById("to-select");
const from = document.getElementById("from-input");
const to = document.getElementById("to-input");
const error = document.getElementById("error");

let initialBase = "Binary",
    lastBase = "Binary";

fromSelected.addEventListener("change", function() {
    initialBase = fromSelected.options[fromSelected.selectedIndex].text;
    from.placeholder = initialBase + " Number";
});

toSelected.addEventListener("change", function() {
    lastBase = toSelected.options[toSelected.selectedIndex].text;
    to.placeholder = lastBase + " Number";
});

from.addEventListener("input", function() {
    error.style.display = "none";
});

let fromValue;
document.getElementById("convert-button").addEventListener("click", function() {
    switch (initialBase) {
        case "Binary":
            fromValue = from.value;
            if (/^[01]*$/.test(fromValue)) {
                switch (lastBase) {
                    case "Decimal":
                        to.value = parseInt(fromValue, 2);
                        break;
                    case "Hexadecimal":
                        to.value = parseInt(fromValue, 2).toString(16).toUpperCase();
                        break;
                    case "Octal":
                        to.value = parseInt(fromValue, 2).toString(8);
                        break;
                    default:
                        to.value = fromValue;
                }
            } else {
                error.style.display = "inherit";
                error.innerText = "Invalid " + initialBase + " Number";
                to.value = "";
            }
            break;

        case "Decimal":
            fromValue = from.value;
            if (/^[0-9]*$/.test(fromValue)) {
                switch (lastBase) {
                    case "Binary":
                        to.value = Math.abs(fromValue).toString(2);
                        break;
                    case "Hexadecimal":
                        to.value = Math.abs(fromValue).toString(16).toUpperCase();
                        break;
                    case "Octal":
                        to.value = Math.abs(fromValue).toString(8);
                        break;
                    default:
                        to.value = fromValue;
                }
            } else {
                error.style.display = "inherit";
                error.innerText = "Invalid " + initialBase +
                    " Number";
                to.value = "";
            }
            break;

        case "Hexadecimal":
            fromValue = from.value;
            if (/^[0-9a-fA-F]*$/.test(fromValue)) {
                switch (lastBase) {
                    case "Binary":
                        to.value = parseInt(fromValue, 16).toString(2);
                        break;
                    case "Decimal":
                        to.value = parseInt(fromValue, 16);
                        break;
                    case "Octal":
                        to.value = parseInt(fromValue, 16).toString(8);
                        break;
                    default:
                        to.value = fromValue;
                }
            } else {
                error.style.display = "inherit";
                error.innerText = "Invalid " + initialBase + " Number";
                to.value = "";
            }
            break;

        case "Octal":
            fromValue = from.value;
            if (/^[0-7]*$/.test(fromValue)) {
                switch (lastBase) {
                    case "Binary":
                        to.value = parseInt(fromValue, 8).toString(2);
                        break;
                    case "Decimal":
                        to.value = parseInt(fromValue, 8);
                        break;
                    case "Hexadecimal":
                        to.value = parseInt(fromValue, 8).toString(16).toUpperCase();
                        break;
                    default:
                        to.value = fromValue;
                }
            } else {
                error.style.display = "inherit";
                error.innerText = "Invalid " + initialBase + " Number";
                to.value = "";
            }
            break;
    }
});