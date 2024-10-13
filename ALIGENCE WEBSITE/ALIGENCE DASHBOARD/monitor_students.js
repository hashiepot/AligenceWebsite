// Sample data for monitor students
const monitorStudentsData = [
    { id: 1, studentId: 'S001', name: 'John Doe', active: 'Yes' },
    { id: 2, studentId: 'S002', name: 'Jane Smith', active: 'Yes' },
    { id: 3, studentId: 'S003', name: 'Alice Johnson', active: 'No' },
    // Add more sample data as needed
];

// Function to load data into the monitor students table
function loadMonitorStudentsTable() {
    const monitorTableBody = document.querySelector('#monitorStudentsTable tbody');
    monitorTableBody.innerHTML = ''; // Clear existing rows

    monitorStudentsData.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.studentId}</td>
            <td>${student.name}</td>
            <td>${student.active}</td>
        `;
        monitorTableBody.appendChild(row);
    });
}

// Initial loading of the monitor students table
document.addEventListener('DOMContentLoaded', loadMonitorStudentsTable);
