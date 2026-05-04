function nextScreen() {
  let name = document.getElementById("name").value;
  let type = document.getElementById("type").value;
  let goal = document.getElementById("goal").value;
  let mode = document.getElementById("mode").value;

  localStorage.setItem("username", name);

  let tasks = "";

  if (mode === "Customize") {
    tasks = `
      <li><input type="checkbox"> <input type="text" placeholder="Enter task"></li>
      <li><input type="checkbox"> <input type="text" placeholder="Enter task"></li>
      <li><input type="checkbox"> <input type="text" placeholder="Enter task"></li>
      <li><input type="checkbox"> <input type="text" placeholder="Enter task"></li>
      <li><input type="checkbox"> <input type="text" placeholder="Enter task"></li>
    `;
  } else {
    if (goal === "Study") {
      tasks = `
        <li><input type="checkbox"> Study Session 1</li>
        <li><input type="checkbox"> Study Session 2</li>
        <li><input type="checkbox"> Revision</li>
        <li><input type="checkbox"> Mock Test</li>
        <li><input type="checkbox"> Break</li>
      `;
    } else if (goal === "Fitness") {
      tasks = `
        <li><input type="checkbox"> Workout</li>
        <li><input type="checkbox"> Cardio</li>
        <li><input type="checkbox"> Diet Plan</li>
        <li><input type="checkbox"> Water Intake</li>
        <li><input type="checkbox"> Rest</li>
      `;
    } else if (goal === "Daily Schedule") {
      tasks = `
        <li><input type="checkbox"> Morning Routine</li>
        <li><input type="checkbox"> Main Work</li>
        <li><input type="checkbox"> Break</li>
        <li><input type="checkbox"> Evening Task</li>
        <li><input type="checkbox"> Night Review</li>
      `;
    } else {
      tasks = `
        <li><input type="checkbox"> Skill Practice</li>
        <li><input type="checkbox"> Learning</li>
        <li><input type="checkbox"> Project Work</li>
        <li><input type="checkbox"> Research</li>
        <li><input type="checkbox"> Review</li>
      `;
    }
  }

  document.body.innerHTML = `
    <div style="max-width:400px; margin:auto;">
      <h1>Hello ${name}</h1>

      <p id="streak"></p>

      <h2>Your Plan (${mode})</h2>

      <p><b>Type:</b> ${type}</p>
      <p><b>Goal:</b> ${goal}</p>

      <h3>Today's Tasks</h3>

      <p id="progress">Progress: 0%</p>
      <p id="status">Status: Not Completed ❌</p>

      <ul id="taskList">
        ${tasks}
      </ul>
    </div>
  `;

  setTimeout(() => {
    loadTasks();
    updateProgress();
    showStreak();
  }, 100);
}

// ---------- AUTO LOAD NAME ----------
window.onload = function () {
  let savedName = localStorage.getItem("username");
  if (savedName) {
    document.getElementById("name").value = savedName;
  }
};

// ---------- PROGRESS ----------
function updateProgress() {
  let allTasks = document.querySelectorAll("#taskList input[type='checkbox']");
  let total = allTasks.length;
  let done = 0;

  allTasks.forEach((task) => {
    if (task.checked) done++;
  });

  let percent = Math.round((done / total) * 100);
  document.getElementById("progress").innerText = "Progress: " + percent + "%";

  if (percent >= 80) {
    document.getElementById("status").innerText = "Status: Day Completed ✅";
    updateStreak(true);
  } else {
    document.getElementById("status").innerText = "Status: Not Completed ❌";
    updateStreak(false);
  }
}

// ---------- SAVE ----------
document.addEventListener("change", function (e) {
  if (e.target.type === "checkbox") {
    saveTasks();
    updateProgress();
  }
});

function saveTasks() {
  let allTasks = document.querySelectorAll("#taskList input[type='checkbox']");
  let data = [];

  allTasks.forEach((task) => {
    data.push(task.checked);
  });

  localStorage.setItem("tasks", JSON.stringify(data));
}

// ---------- LOAD ----------
function loadTasks() {
  let saved = JSON.parse(localStorage.getItem("tasks"));

  if (saved) {
    let allTasks = document.querySelectorAll("#taskList input[type='checkbox']");

    allTasks.forEach((task, index) => {
      task.checked = saved[index];
    });
  }
}

// ---------- STREAK ----------
function updateStreak(completed) {
  let today = new Date().toDateString();
  let last = localStorage.getItem("lastDate");
  let streak = parseInt(localStorage.getItem("streak")) || 0;

  if (last === today) return;

  if (completed) {
    streak++;
  } else {
    streak = 0;
  }

  localStorage.setItem("streak", streak);
  localStorage.setItem("lastDate", today);
}

function showStreak() {
  let streak = localStorage.getItem("streak") || 0;
  document.getElementById("streak").innerText = "🔥 Streak: " + streak + " days";
}
