var selectedRow = null;

function showAlert(message, userInput){
    const div = document.createElement("div");
    div.userInput = `alert alert-${userInput}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".input");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//Delete Data
document.querySelector("#table-contents")