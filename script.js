document.addEventListener("DOMContentLoaded", function () {
    initializeCalendar();
    initializeCharts();
    setPainLevelDisplay();
    setupReminderButton();
    setupChartSwitching();
});

// Calendar Initialization
function initializeCalendar() {
    const currentDate = new Date();
    renderCalendar(currentDate);

    window.changeMonth = function (change) {
        currentDate.setMonth(currentDate.getMonth() + change);
        renderCalendar(currentDate);
    };

    function renderCalendar(date) {
        const daysElement = document.getElementById("days");
        const monthYearElement = document.getElementById("month-year");
        daysElement.innerHTML = "";
        const month = date.getMonth();
        const year = date.getFullYear();
        monthYearElement.textContent = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

        // First day of the month
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        // Adding previous month's empty spaces
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("empty");
            daysElement.appendChild(emptyCell);
        }

        // Adding current month's days
        for (let day = 1; day <= lastDay; day++) {
            const dayCell = document.createElement("div");
            dayCell.classList.add("day");
            dayCell.textContent = day;
            daysElement.appendChild(dayCell);
        }
    }
}

// Chart Initialization
function initializeCharts() {
    initializeProgressChart("bar");

    // Radar chart for Mood Tracking
    const moodCtx = document.getElementById("moodCanvas").getContext("2d");
    new Chart(moodCtx, {
        type: "radar",
        data: {
            labels: ["Happy", "Sad", "Stressed", "Calm", "Energetic"],
            datasets: [
                {
                    label: "Mood Levels",
                    data: [3, 2, 4, 5, 3],
                    backgroundColor: "rgba(22, 17, 68, 0.2)",
                    borderColor: "rgba(22, 17, 68, 1)",
                    pointBackgroundColor: "rgba(22, 17, 68, 1)",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(200, 200, 200, 0.2)",
                    },
                    pointLabels: {
                        color: "#333",
                    },
                },
            },
        },
    });

    // Line chart for Pain Level Tracking
    const painCtx = document.getElementById("painChart").getContext("2d");
    new Chart(painCtx, {
        type: "line",
        data: {
            labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
            datasets: [
                {
                    label: "Pain Level",
                    data: [3, 4, 2, 5, 4],
                    borderColor: "rgba(22, 17, 68, 0.7)",
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });

    // Bar chart for Mobility Tracking
    const mobilityCtx = document.getElementById("mobilityCanvas").getContext("2d");
    new Chart(mobilityCtx, {
        type: "bar",
        data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
                {
                    label: "Mobility",
                    data: [5, 6, 7, 8],
                    backgroundColor: "rgba(22, 17, 68, 0.7)",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
}

// Initialize Progress Chart with Different Chart Types
function initializeProgressChart(type) {
    const progressCtx = document.getElementById("myChart").getContext("2d");
    if (window.progressChart) {
        window.progressChart.destroy();
    }
    window.progressChart = new Chart(progressCtx, {
        type: type,
        data: {
            labels: ["Metric 1", "Metric 2", "Metric 3", "Metric 4"],
            datasets: [
                {
                    label: "Progress Metrics",
                    data: [10, 20, 30, 40],
                    backgroundColor: [
                        "rgba(22, 17, 68, 0.7)",
                        "rgba(54, 162, 235, 0.7)",
                        "rgba(255, 206, 86, 0.7)",
                        "rgba(75, 192, 192, 0.7)"
                    ],
                    borderColor: "rgba(22, 17, 68, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
}

// Setup Chart Switching Functionality
function setupChartSwitching() {
    const chartButtons = document.querySelectorAll(".chart-container button");
    chartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const chartType = this.id;
            initializeProgressChart(chartType);
        });
    });
}

// Pain Level Slider Value Display
function setPainLevelDisplay() {
    const painLevelInput = document.getElementById("pain-level");
    const painLevelValue = document.getElementById("pain-level-value");
    painLevelInput.addEventListener("input", function () {
        painLevelValue.textContent = painLevelInput.value;
    });
}

// Add Reminder Button Setup
function setupReminderButton() {
    window.addReminder = function () {
        const reminderInput = document.getElementById("reminder-input");
        const remindersContainer = document.querySelector(".reminders");
        if (reminderInput.value) {
            const newReminder = document.createElement("div");
            newReminder.classList.add("reminder");
            newReminder.textContent = `Reminder set for: ${new Date(reminderInput.value).toLocaleString()}`;
            remindersContainer.appendChild(newReminder);
            reminderInput.value = "";
        }
    };
}
