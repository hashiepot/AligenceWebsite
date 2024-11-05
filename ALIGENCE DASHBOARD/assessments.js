// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC197CiJGypDz6qJxD0xPrBhrN0u0tTqH4",
    authDomain: "aligence-4587c.firebaseapp.com",
    databaseURL: "https://aligence-4587c-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "aligence-4587c",
    storageBucket: "aligence-4587c.appspot.com",
    messagingSenderId: "483459083057",
    appId: "1:483459083057:android:9f97de59a19f3a8968de10"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let selectedRow = null;
let entryCount = 0;
let selectedQuarter = "Quarter 1";
let selectedLesson = "Lesson 1";

// Show alerts
function showAlert(message, type) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".header");
    container.insertBefore(div, document.querySelector(".main"));
    setTimeout(() => div.remove(), 3000);
}

// Clear fields
function clearFields() {
    document.querySelector("#q").value = "";
    document.querySelector("#choiceA").value = "";
    document.querySelector("#choiceB").value = "";
    document.querySelector("#choiceC").value = "";
    document.querySelector("#choiceD").value = "";
    document.querySelectorAll("[name='questionAnswer']").forEach(radio => radio.checked = false);
    selectedRow = null;
}

// Modal functionality
function openModal() {
    document.getElementById("myModal").style.display = "block";
}
function closeModal() {
    document.getElementById("myModal").style.display = "none";
    clearFields();
}
window.onclick = function (event) {
    if (event.target == document.getElementById("myModal")) closeModal();
}

// Handle form submission
document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.querySelector("#q").value;
    const choiceA = document.querySelector("#choiceA").value;
    const choiceB = document.querySelector("#choiceB").value;
    const choiceC = document.querySelector("#choiceC").value;
    const choiceD = document.querySelector("#choiceD").value;
    const ans = document.querySelector("[name='questionAnswer']:checked")?.value;

    if (!q || !choiceA || !choiceB || !choiceC || !choiceD || !ans) {
        showAlert("Please fill out all fields!", "warning");
        return;
    }

    if (entryCount >= 10 && selectedRow === null) {
        showAlert("Maximum number of entries reached (10).", "danger");
        return;
    }

    const questionData = {
        question: q,
        choices: { A: choiceA, B: choiceB, C: choiceC, D: choiceD },
        answer: ans
    };

    if (selectedRow === null) {
        addNewEntry(questionData);
    } else {
        updateEntry(questionData);
    }
    clearFields();
    closeModal();
});

// Add a new entry
function addNewEntry(data) {
    const newEntryRef = database.ref(`assessments/${selectedQuarter}/${selectedLesson}`).push();
    newEntryRef.set(data, (error) => {
        if (error) {
            showAlert("Error adding entry.", "danger");
        } else {
            showAlert("Entry added successfully!", "success");
            entryCount++;
            loadData();
        }
    });
}

// Update existing entry
function updateEntry(data) {
    const key = selectedRow.getAttribute("data-key");
    database.ref(`assessments/${selectedQuarter}/${selectedLesson}/${key}`).set(data, (error) => {
        if (error) {
            showAlert("Error updating entry.", "danger");
        } else {
            showAlert("Entry updated successfully!", "success");
            loadData();
        }
    });
}

// Load data from Firebase for selected quarter and lesson
function loadData() {
    database.ref(`assessments/${selectedQuarter}/${selectedLesson}`).once("value", (snapshot) => {
        const tableContents = document.querySelector("#table-contents");
        tableContents.innerHTML = "";
        entryCount = 0;

        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const row = document.createElement("tr");
            row.setAttribute("data-key", childSnapshot.key);
            row.innerHTML = `
                <td>${++entryCount}</td>
                <td>${data.question}</td>
                <td>A: ${data.choices.A}, B: ${data.choices.B}, C: ${data.choices.C}, D: ${data.choices.D}</td>
                <td>${data.answer}: ${data.choices[data.answer]}</td>
                <td>
                    <button class="btn-edit" onclick="editRow(this)">✏️</button>
                    <button class="btn-delete" onclick="deleteRow(this)">🗑️</button>
                </td>
            `;
            tableContents.appendChild(row);
        });
    });
}

// Edit an existing entry
function editRow(td) {
    selectedRow = td.parentElement.parentElement;
    const key = selectedRow.getAttribute("data-key");
    database.ref(`assessments/${selectedQuarter}/${selectedLesson}/${key}`).once("value", (snapshot) => {
        const data = snapshot.val();
        document.querySelector("#q").value = data.question;
        document.querySelector("#choiceA").value = data.choices.A;
        document.querySelector("#choiceB").value = data.choices.B;
        document.querySelector("#choiceC").value = data.choices.C;
        document.querySelector("#choiceD").value = data.choices.D;
        document.querySelector(`[name='questionAnswer'][value='${data.answer}']`).checked = true;
        openModal();
    });
}

// Delete an entry
function deleteRow(td) {
    if (confirm("Are you sure you want to delete this entry?")) {
        const key = td.parentElement.parentElement.getAttribute("data-key");
        database.ref(`assessments/${selectedQuarter}/${selectedLesson}/${key}`).remove()
            .then(() => {
                showAlert("Entry deleted successfully!", "danger");
                entryCount--;
                loadData();
            })
            .catch((error) => showAlert("Error deleting entry.", "danger"));
    }
}

// Functions to update dropdown labels and selection
function selectQuarter(quarter) {
    selectedQuarter = quarter;
    document.getElementById("quarter-btn").innerText = quarter;
    loadData(); // Reload data based on the new selection
}

function selectLesson(lesson) {
    selectedLesson = lesson;
    document.getElementById("lesson-btn").innerText = lesson;
    loadData(); // Reload data based on the new selection
}

// Event listeners for the quarter and lesson selection in dropdown
document.querySelectorAll(".dropdown-content a").forEach((link) => {
    link.addEventListener("click", function (event) {
        const text = event.target.textContent;
        if (text.includes("Quarter")) selectQuarter(text);
        else if (text.includes("Lesson")) selectLesson(text);
    });
});

// Initial data load for default selection
loadData();
