const inputTugas = document.getElementById("inputTugas");
const inputDeadline = document.getElementById("inputDeadline");
const btnTambah = document.getElementById("btnTambah");
const daftarTugas = document.getElementById("daftarTugas");
const filterButtons = document.querySelectorAll(".filter");
const tugasHarianCheckbox = document.getElementById("tugasHarian");
const hapusSelesaiBtn = document.getElementById("hapusSelesai");

let tugasList = JSON.parse(localStorage.getItem("tugasList")) || [];

// Tambah tugas
btnTambah.addEventListener("click", () => {
  const teks = inputTugas.value.trim();
  const deadline = inputDeadline.value;
  const isHarian = tugasHarianCheckbox.checked;

  if (!teks) return alert("Tuliskan nama tugas dulu!");

  const tugasBaru = {
    id: Date.now(),
    teks,
    deadline,
    selesai: false,
    harian: isHarian,
    streak: 0,
    terakhirSelesai: null,
  };

  tugasList.push(tugasBaru);
  simpanData();
  renderTugas();
  inputTugas.value = "";
  inputDeadline.value = "";
  tugasHarianCheckbox.checked = false;
});

// Render daftar tugas
function renderTugas(filter = "semua") {
  daftarTugas.innerHTML = "";

  const tampil = tugasList.filter(t => {
    if (filter === "aktif") return !t.selesai;
    if (filter === "selesai") return t.selesai;
    return true;
  });

  if (tampil.length === 0) {
    daftarTugas.innerHTML = `<p>Tidak ada tugas<br>Tambahkan tugas baru untuk memulai</p>`;
    return;
  }

  tampil.forEach(tugas => {
    const li = document.createElement("li");
    li.className = tugas.selesai ? "selesai" : "";

    li.innerHTML = `
      <span>${tugas.teks} ${tugas.deadline ? `📅 ${tugas.deadline}` : ""}</span>
      ${tugas.harian ? `<span>🔥 ${tugas.streak}</span>` : ""}
      <div>
        <button onclick="toggleSelesai(${tugas.id})">✔️</button>
        <button onclick="hapusTugas(${tugas.id})">🗑️</button>
      </div>
    `;

    daftarTugas.appendChild(li);
  });
}

// Toggle selesai
function toggleSelesai(id) {
  const tugas = tugasList.find(t => t.id === id);
  if (!tugas) return;

  tugas.selesai = !tugas.selesai;

  if (tugas.harian && tugas.selesai) {
    const hariIni = new Date().toDateString();
    if (tugas.terakhirSelesai !== hariIni) {
      tugas.streak++;
      tugas.terakhirSelesai = hariIni;
    }
  }

  simpanData();
  renderTugas();
}

// Hapus tugas
function hapusTugas(id) {
  tugasList = tugasList.filter(t => t.id !== id);
  simpanData();
  renderTugas();
}

// Hapus semua yang selesai
hapusSelesaiBtn.addEventListener("click", () => {
  tugasList = tugasList.filter(t => !t.selesai);
  simpanData();
  renderTugas();
});

function simpanData() {
  localStorage.setItem("tugasList", JSON.stringify(tugasList));
}

// Filter tombol
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    renderTugas(btn.dataset.filter);
  });
});

renderTugas();
