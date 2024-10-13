// manage_students.js

// Initialize an array to store student data
let students = [];

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

// Function to add a new student
function addStudent() {
    const lastName = prompt("Enter Last Name:");
    const firstName = prompt("Enter First Name:");
    const middleName = prompt("Enter Middle Name:");
    const section = prompt("Enter Section:");

    if (lastName && firstName && middleName && section) {
        students.push({ lastName, firstName, middleName, section });
        renderTable();
    }
}

// Function to edit an existing student
function editStudent(index) {
    const student = students[index];
    const lastName = prompt("Edit Last Name:", student.lastName);
    const firstName = prompt("Edit First Name:", student.firstName);
    const middleName = prompt("Edit Middle Name:", student.middleName);
    const section = prompt("Edit Section:", student.section);

    if (lastName && firstName && middleName && section) {
        students[index] = { lastName, firstName, middleName, section };
        renderTable();
    }
}

// Function to delete a student
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        renderTable();
    }
}

// Add event listener to the add button
document.getElementById('addStudentBtn').addEventListener('click', addStudent);

// Initial render
renderTable();
