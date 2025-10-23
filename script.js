const taskInput = document.getElementById('task');
const deadlineInput = document.getElementById('deadline');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const dailyCheckbox = document.getElementById('dailyTask');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

displayTasks();

// 🟢 Tambah tugas baru
addTaskBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  const deadline = deadlineInput.value;
  const isDaily = dailyCheckbox.checked;

  if (task === '' || deadline === '') {
    alert('Isi semua kolom terlebih dahulu!');
    return;
  }

  const newTask = {
    id: Date.now(),
    name: task,
    deadline,
    done: false,
    daily: isDaily,
    streak: 0,
    lastCompleted: null
  };

  tasks.push(newTask);
  saveTasks();
  displayTasks();

  taskInput.value = '';
  deadlineInput.value = '';
  dailyCheckbox.checked = false;
});

// 🟡 Tampilkan daftar tugas
function displayTasks(filter = 'all') {
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.done;
    if (filter === 'done') return task.done;
    return true;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<p class="empty">Tidak ada tugas<br>Tambahkan tugas baru untuk memulai</p>`;
    return;
  }

  filteredTasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task-item';
    if (task.done) div.classList.add('done');

    const dailyText = task.daily ? ' (Harian)' : '';
    const streakText = task.daily ? `🔥 ${task.streak}` : '';

    div.innerHTML = `
      <div class="info">
        <strong>${task.name}${dailyText}</strong>
        <span class="details">${new Date(task.deadline).toLocaleString('id-ID')} ${streakText}</span>
      </div>
      <div>
        <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${task.id})">
        <button class="delete-btn" onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;

    taskList.appendChild(div);
  });
}

// ✅ Tandai tugas selesai & update streak
function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.done = !task.done;

      if (task.done && task.daily) {
        const today = new Date().toDateString();
        if (task.lastCompleted !== today) {
          task.streak += 1;
          task.lastCompleted = today;
        }
      }
    }
    return task;
  });
  saveTasks();
  displayTasks();
}

// ❌ Hapus tugas
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  displayTasks();
}

// 💾 Simpan ke localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 🔁 Reset tugas harian setiap hari
function resetDailyTasks() {
  const today = new Date().toDateString();
  tasks = tasks.map(task => {
    if (task.daily && task.lastCompleted !== today) {
      task.done = false;
    }
    return task;
  });
  saveTasks();
}

resetDailyTasks();

// 🔘 Filter tombol
const filterButtons = document.querySelectorAll('.filter button');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    if (button.id === 'showAll') displayTasks('all');
    if (button.id === 'showActive') displayTasks('active');
    if (button.id === 'showDone') displayTasks('done');
  });
});

// 🧹 Hapus semua tugas yang selesai
document.getElementById('clearDone').addEventListener('click', () => {
  tasks = tasks.filter(task => !task.done);
  saveTasks();
  displayTasks();
});
