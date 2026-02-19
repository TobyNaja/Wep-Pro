const students = [
    "สมชาย",
    "สมหญิง",
    "สมศรี",
    "สมปอง",
    "สมเกียรติ",
    "สมบัติ",
    "สมดี",
    "สมจิตร"
]

const scores = [];

function randomScore() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    for (let i = 0; i < students.length; i++) {
        const score = Math.floor(Math.random() * 61) + 40;
        scores[i] = score
    
        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${students[i]}</td>
                <td>${score}</td>
                <td></td>
            </tr>`;
    }
}

function calculateGrade(){
    const rows = document.querySelectorAll("#tableBody tr");
    rows.forEach((row, index) => {
        const score = scores[index];
        let grade = "";

        if (score >= 80) grade = "A";
        else if (score >= 70) grade = "B";
        else if (score >= 60) grade = "C";
        else if (score >= 50) grade = "D";
        else grade = "F";   

        row.cells[3].textContent = grade;
    })
}

randomScore();