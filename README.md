# 📝 HaruList

HaruList (하루리스트) adalah aplikasi to-do list sederhana untuk mencatat kegiatan harian sekaligus melacak mood. Kamu bisa menambah task, menandai task sebagai **completed**, serta mengecek daftar to-do berdasarkan tanggal di kalender. [Live Demonya](https://harulist.vercel.app/)


## Fitur
- Tambah to-do list
- Update status (Pending → Completed)
- Kalender bulanan (dibuat manual/native, tanpa library kalender)
- Penyimpanan otomatis di **Local Storage**
- Klik tanggal di kalender untuk melihat detail task pada hari tersebut


## Tech Stack

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vue Router](https://router.vuejs.org/) untuk navigasi
- [TailwindCSS](https://tailwindcss.com/) untuk styling
- [VueUse](https://vueuse.org/) (utility hooks)
- [Lucide Vue](https://lucide.dev/) untuk ikon modern
- [Vite](https://vitejs.dev/) untuk build tools cepat



## 📂 Project Setup

Clone repository:
```
git clone https://github.com/username/todo-calendar-app.git
cd todo-calendar-app
```

Install dependencies:
```
npm install
```

Jalankan project di local dev server:
```
npm run dev
```

Build untuk production:
```
npm run build
```

## 🎯 Tujuan Project
Project ini dibuat untuk:
- Latihan fundamental Vue 3 + TypeScript. 
- Implementasi UI interaktif dengan TailwindCSS. 
- Eksperimen membuat komponen kalender custom native dari nol.
- Belajar menyimpan data menggunakan Local Storage.
 
