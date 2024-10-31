var selectedRow = null;
var entryCount = 0;

// Show Alerts
function showAlert(message, userInput) {
    const div = document.createElement("div");
    div.className = `alert alert-${userInput}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".header");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => div.remove(), 3000);
}

// Clear fields
function clearFields() {
    document.querySelector("#q").value = "";
    document.querySelector("#choiceA").value = "";
    document.querySelector("#choiceB").value = "";
    document.querySelector("#choiceC").value = "";
    document.querySelector("#choiceD").value = "";
    document.querySelector("#ans").value = "";
    selectedRow = null; // Reset row
}

// Modal functionality
function openModal() {
    document.getElementById("myModal").style.display = "block";
}
// Clear fields when closing modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
    clearFields(); 
}

window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        closeModal();
    }
}

// Handle form submission
document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();

    // GETTING VALUES
    const q = document.querySelector("#q").value;
    const choiceA = document.querySelector("#choiceA").value;
    const choiceB = document.querySelector("#choiceB").value;
    const choiceC = document.querySelector("#choiceC").value;
    const choiceD = document.querySelector("#choiceD").value;
    const ans = document.querySelector("#ans").value;

    // Validate form input
    if (!q || !choiceA || !choiceB || !choiceC || !choiceD || !ans) {
        confirm("Please fill out all fields!");
        return;
    }

    // 10 max entries
    if (entryCount >= 10 && selectedRow === null) {
        confirm("Maximum number of entries reached (10).");
        return;
    }

    if (selectedRow === null) {
        // ADDING NEW ENTRY
        const tableContents = document.querySelector("#table-contents");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entryCount + 1}</td>
            <td>${q}</td>
            <td>A: ${choiceA}, B: ${choiceB}, C: ${choiceC}, D: ${choiceD}</td>
            <td>${ans}</td>
            <td>
                <button class="btn-edit" onclick="editRow(this)">✏️</button>
                <button class="btn-delete" onclick="deleteRow(this)">🗑️</button>
            </td>
        `;
        tableContents.appendChild(row);
        entryCount++; // For monitoring of entries
        confirm("Entry added successfully!");
    } else {
        // EDITING EXISTING ENTRY
        selectedRow.cells[1].innerHTML = q;
        selectedRow.cells[2].innerHTML = `A: ${choiceA}, B: ${choiceB}, C: ${choiceC}, D: ${choiceD}`;
        selectedRow.cells[3].innerHTML = ans;
        confirm("Entry updated successfully!");
    }

    clearFields();
    closeModal(); 
});

// Edit Row
function editRow(td) {
    selectedRow = td.parentElement.parentElement; 
    document.querySelector("#q").value = selectedRow.cells[1].innerHTML;
    const choices = selectedRow.cells[2].innerHTML.split(', ');
    document.querySelector("#choiceA").value = choices[0].split(': ')[1];
    document.querySelector("#choiceB").value = choices[1].split(': ')[1];
    document.querySelector("#choiceC").value = choices[2].split(': ')[1];
    document.querySelector("#choiceD").value = choices[3].split(': ')[1];
    document.querySelector("#ans").value = selectedRow.cells[3].innerHTML;
    openModal(); // Open modal to edit
}

// Delete Row
function deleteRow(td) {
    if (confirm("Are you sure you want to delete this entry?")) {
        const row = td.parentElement.parentElement;
        document.querySelector("#table-contents").deleteRow(row.rowIndex - 1);
        entryCount--; 
        confirm("Entry deleted successfully!", "danger");
    }
}
