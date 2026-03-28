const classSelect = document.getElementById('class-select');
if (classSelect) {
    for (let i = 1; i <= 11; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}반`;
        classSelect.appendChild(option);
    }
}

async function updateTimetable() {
    const classNum = classSelect.value;
    const grid = document.getElementById('timetable-grid');

    grid.innerHTML = `<div class="empty-msg" style="grid-column: span 6;">데이터 로드 중...</div>`;

    try {
        // 학년은 무조건 1로 고정해서 전송
        const response = await fetch(`http://localhost:3000/timetable?grade=1&classNum=${classNum}`);
        const data = await response.json();

        let html = `<div class="cell header-cell"></div>`;
        ['월', '화', '수', '목', '금'].forEach(day => {
            html += `<div class="cell header-cell">${day}</div>`;
        });

        for (let p = 0; p < 7; p++) {
            html += `<div class="cell period-cell">${p + 1}</div>`;
            for (let d = 0; d < 5; d++) {
                const lesson = data[d] && data[d][p];
                const subject = lesson ? lesson.subject : "";
                const cellClass = subject ? "cell subject-cell" : "cell";
                html += `<div class="${cellClass}">${subject}</div>`;
            }
        }
        grid.innerHTML = html;
    } catch (e) {
        grid.innerHTML = `<div class="empty-msg" style="grid-column: span 6;">서버 연결 실패</div>`;
    }
}

document.getElementById('view-btn').addEventListener('click', updateTimetable);