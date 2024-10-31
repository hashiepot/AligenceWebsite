// Variables for modal elements
const studentModal = document.getElementById('studentModal');
const modalTitle = document.getElementById('modalTitle');
const studentForm = document.getElementById('studentForm');
const closeModal = document.querySelector('.close');

// Variables for form inputs
const lastNameInput = document.getElementById('lastName');
const firstNameInput = document.getElementById('firstName');
const middleNameInput = document.getElementById('middleName');
const sectionInput = document.getElementById('section');

let students = []; // Initialize an array to store student data
let editIndex = null;

// Open modal function
function openModal(isEdit = false, index = null) {
    if (isEdit) {
        modalTitle.textContent = "Edit Student";
        const student = students[index];
        lastNameInput.value = student.lastName;
        firstNameInput.value = student.firstName;
        middleNameInput.value = student.middleName;
        sectionInput.value = student.section;
        editIndex = index;
    } else {
        modalTitle.textContent = "Add Student";
        studentForm.reset();
        editIndex = null;
    }
    studentModal.style.display = "flex";
}

// Close modal function
function closeModalFn() {
    studentModal.style.display = "none";
}

// Save student function
function saveStudent(e) {
    e.preventDefault();
    const lastName = lastNameInput.value.trim();
    const firstName = firstNameInput.value.trim();
    const middleName = middleNameInput.value.trim();
    const section = sectionInput.value.trim();

    if (editIndex !== null) {
        // Edit student
        students[editIndex] = { lastName, firstName, middleName, section };
    } else {
        // Add new student
        students.push({ lastName, firstName, middleName, section });
    }

    renderTable();
    closeModalFn();
}

// Function to render the table
function renderTable() {
    const tableBody = document.querySelector('#studentsTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.lastName}</td>
            <td>${student.firstName}</td>
            <td>${student.middleName}</td>
            <td>${student.section}</td>
            <td>
                <span class="edit-icon" onclick="editStudent(${index})">✏️</span>
                <span class="delete-icon" onclick="deleteStudent(${index})">🗑️</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a student
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        renderTable();
    }
}

// Function to edit an existing student
function editStudent(index) {
    openModal(true, index);
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
