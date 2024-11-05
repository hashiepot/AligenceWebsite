// Variables for modal elements
const teachersModal = document.getElementById('teachersModal');
const modalTitle = document.getElementById('modalTitle');
const teacherForm = document.getElementById('teacherForm');
const closeModal = document.querySelector('.close');

// Variables for form inputs
const teacherIDInput = document.getElementById('teacherID');
const lastNameInput = document.getElementById('lastName');
const firstNameInput = document.getElementById('firstName');
const middleNameInput = document.getElementById('middleName');

let teachers = []; // Initialize an array to store teacher data
let editIndex = null;

// Open modal function
function openModal(isEdit = false, index = null) {
    if (isEdit) {
        modalTitle.textContent = "Edit Teacher";
        const teacher = teachers[index];
        teacherIDInput.value = teacher.teacherid;
        lastNameInput.value = teacher.lastName;
        firstNameInput.value = teacher.firstName;
        middleNameInput.value = teacher.middleName;
        editIndex = index;
    } else {
        modalTitle.textContent = "Add Teacher";
        teacherForm.reset();
        editIndex = null;
    }
    teachersModal.style.display = "flex";
}

// Close modal function
function closeModalFn() {
    teachersModal.style.display = "none";
}

// Save teacher function
function saveTeacher(e) {
    e.preventDefault();
    const teacherid = teacherIDInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const firstName = firstNameInput.value.trim();
    const middleName = middleNameInput.value.trim();
    

    if (editIndex !== null) {
        // Edit Teacher
        teachers[editIndex] = { teacherid, lastName, firstName, middleName };
    } else {
        // Add new Teacher
        teachers.push({ teacherid, lastName, firstName, middleName});
    }

    renderTable();
    closeModalFn();
}

// Function to render the table
function renderTable() {
    const tableBody = document.querySelector('#teachersTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    teachers.forEach((teacher, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${teacher.teacherid}</td>
            <td>${teacher.lastName}</td>
            <td>${teacher.firstName}</td>
            <td>${teacher.middleName}</td>
            
            <td>
                <span class="edit-icon" onclick="editTeacher(${index})">✏️</span>
                <span class="delete-icon" onclick="deleteTeacher(${index})">🗑️</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a Teacher
function deleteTeacher(index) {
    if (confirm("Are you sure you want to delete this teachers?")) {
        teachers.splice(index, 1);
        renderTable();
    }
}

// Function to edit an existing Teacher
function editTeacher(index) {
    openModal(true, index);
}

// Event Listeners
document.getElementById('addTeacherBtn').addEventListener('click', () => openModal());
closeModal.addEventListener('click', closeModalFn);
window.addEventListener('click', (e) => {
    if (e.target == teachersModal) closeModalFn();
});
teacherForm.addEventListener('submit', saveTeacher);

// Initial render
renderTable();

