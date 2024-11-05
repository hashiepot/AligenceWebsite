// Variables for modal elements
const studentModal = document.getElementById('studentModal');
const modalTitle = document.getElementById('modalTitle');
const studentForm = document.getElementById('studentForm');
const closeModal = document.querySelector('.close');

// Variables for form inputs
const LRNInput = document.getElementById('LRN');
const emailInput = document.getElementById('Email');
const lastNameInput = document.getElementById('lastName');
const firstNameInput = document.getElementById('firstName');
const middleNameInput = document.getElementById('middleName');
const sectionText = document.getElementById('sectionText'); // Main page dropdown text
const modalSectionText = document.getElementById('modalSectionText'); // Modal dropdown text

let editKey = null;
let selectedSection = "All"; // Default to show all students

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Open modal function
function openModal(isEdit = false, studentKey = null) {
    if (isEdit) {
        modalTitle.textContent = "Edit Student";
        database.ref('students/' + studentKey).once('value').then((snapshot) => {
            const student = snapshot.val();
            LRNInput.value = student.LRN;
            emailInput.value = student.email;
            lastNameInput.value = student.lastName;
            firstNameInput.value = student.firstName;
            middleNameInput.value = student.middleName;
            modalSectionText.textContent = student.section; // Set modal dropdown text to student's section
        });
        editKey = studentKey;
    } else {
        modalTitle.textContent = "Add Student";
        studentForm.reset();
        modalSectionText.textContent = "Select Section"; // Reset modal dropdown text
        editKey = null;
    }
    studentModal.style.display = "flex";
}

// Function to select a section in the main dropdown
function selectSection(section) {
    sectionText.textContent = section; // Update main dropdown button text
    selectedSection = section; // Update the selected section variable
    renderTable(); // Re-render the table based on the selected section
}

// Function to select a section in the modal dropdown
function selectModalSection(section) {
    modalSectionText.textContent = section; // Update modal dropdown button text
}

// Close modal function
function closeModalFn() {
    studentModal.style.display = "none";
}

// Save student function
function saveStudent(e) {
    e.preventDefault();
    const LRN = LRNInput.value.trim();
    const email = emailInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const firstName = firstNameInput.value.trim();
    const middleName = middleNameInput.value.trim();
    const section = modalSectionText.textContent.trim(); // Get section from modal dropdown

    if (section === "Select Section") {
        alert("Please select a section.");
        return;
    }

    const studentData = { LRN, email, lastName, firstName, middleName, section };

    if (editKey) {
        // Edit student in Firebase
        database.ref('students/' + editKey).set(studentData);
    } else {
        // Add new student in Firebase
        database.ref('students').push(studentData);
    }

    renderTable();
    closeModalFn();
}

// Event listener to restrict LRN input to numbers only
LRNInput.addEventListener('input', () => {
    LRNInput.value = LRNInput.value.replace(/\D/g, ''); // Remove any non-numeric characters
});


// Function to render the student table
function renderTable() {
    let i = 1;
    const tableBody = document.querySelector('#studentsTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    database.ref('students').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const student = childSnapshot.val();
            const studentKey = childSnapshot.key;

            // Check if the student belongs to the selected section
            if (selectedSection === "All" || student.section === selectedSection) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${i++}</td>
                    <td>${student.LRN}</td>
                    <td>${student.email}</td>
                    <td>${student.lastName}</td>
                    <td>${student.firstName}</td>
                    <td>${student.middleName}</td>
                    <td>${student.section}</td>
                    <td>
                        <span class="edit-icon" onclick="editStudent('${studentKey}')">✏️</span>
                        <span class="delete-icon" onclick="deleteStudent('${studentKey}')">🗑️</span>
                    </td>
                `;
                tableBody.appendChild(row);
            }
        });
    });
}

// Function to delete a student
function deleteStudent(studentKey) {
    if (confirm("Are you sure you want to delete this student?")) {
        database.ref('students/' + studentKey).remove();
        renderTable();
    }
}

// Function to edit an existing student
function editStudent(studentKey) {
    openModal(true, studentKey);
}

// Event Listeners
document.getElementById('addStudentBtn').addEventListener('click', () => openModal());
closeModal.addEventListener('click', closeModalFn);
window.addEventListener('click', (e) => {
    if (e.target == studentModal) closeModalFn();
});
studentForm.addEventListener('submit', saveStudent);

// Initial render
renderTable();
