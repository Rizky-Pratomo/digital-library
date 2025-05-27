// Sidebar toggle
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Cegah klik ini ditangkap event listener body
    sidebar.classList.toggle('active');
});

// Klik di mana saja di luar sidebar untuk menutup sidebar
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// Dark/Light Mode toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
    document.body.classList.add("dark-mode");
} else if (currentTheme == "light") {
    document.body.classList.remove("dark-mode");
} else if (prefersDarkScheme.matches) {
    document.body.classList.add("dark-mode");
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    let theme = "light";
    if (document.body.classList.contains('dark-mode')) {
        theme = "dark";
        themeToggle.textContent = "🌙"; // Ganti icon ke bulan
    } else {
        theme = "light";
        themeToggle.textContent = "☀️"; // Ganti icon ke matahari
    }
    localStorage.setItem("theme", theme);
});

// Pastikan saat reload halaman, icon emoji juga langsung benar
if (document.body.classList.contains('dark-mode')) {
    themeToggle.textContent = "🌙";
} else {
    themeToggle.textContent = "☀️";
}

// Modal "Coming Soon" untuk tombol Pinjam Buku
function showComingSoon() {
    alert("Berhasil meminjam Buku! Buku Ini Telah Anda Pinjam.");
}

// Koleksi Buku
const koleksiBuku = [
    { title: "Romansa STOVIA", description: "Kadang-kadang kita jatuh cinta kepada milik orang. Dan yang ia hadapi adalah keduanya, komplet menjadi satu. Mengapa manusia selalu tergerak hatinya untuk meraih ketidakmungkinan? Batavia, 1918. Yansen, pemuda Minahasa, hendak mewujudkan mimpi menjadi dokter di tanah air sendiri. Bersama Hilman pemuda Sunda, Sudiro pemuda Jawa, dan Arsan pemuda Minang, Yansen menemukan ikatan persahabatan di STOVIA. Fiksi berlatar Hindia Belanda di awal abad ke-20 ini menceritakan bagaimana keempat sekawan itu saling mendukung kala mereka menghadapi masalah hidup masing-masing, dari soal cinta, keluarga, lingkungan di sekolah, hingga misteri pembunuhan seorang pengusaha Belanda.", img: "cover_buku4.jpg", author: "Sania Rasyid" },
    { title: "Strage si Pemimpi (Strange the Dreamer)", description: "Sejak usianya lima tahun Lazlo Strange terobsesi dengan kisah Weep, kota yang hilang. Ketika kesempatan untuk mencari kota itu muncul di hadapannya, Lazlo memutuskan langsung menyambarnya sebelum dia kehilangan mimpi itu selamanya. Apa sebenarnya yang menimpa kota Weep dua ratus tahun lalu hingga memutus kota tersebut dari dunia luar? Jawabannya ada di Weep, beserta banyak misteri lain--termasuk sosok dewi berkulit biru yang muncul dalam mimpi Lazlo. Bagaimana bisa Lazlo memimpikan wanita itu sebelum dia tahu wanita itu ada? Jika semua dewa sudah mati, kenapa wanita itu tampak sangat nyata? Selamat datang di Weep!", img: "cover_buku2.jpg", author: "Laini Taylor" },
    { title: "Cantik Itu Luka", description: "Di satu sore, seorang perempuan bangkit dari kuburannya setelah dua puluh satu tahun kematian. Kebangkitannya menguak kutukan dan tragedi keluarga, yang terentang sejak akhir masa kolonial perpaduan antara epik keluarga yang dibalut roman, kisah hantu, kekejaman politik, mitologi, dan petualangan. Dari kekasih yang lenyap ditelan kabut hingga seorang ibu yang menginginkan bayi buruk rupa.", img: "cover_buku3.jpg", author: "Eka Kurniawan" },
];

// Koleksi Digital
const koleksiDigital = [
    { title: "Harry Potter", description: "Harry Potter adalah seorang anak yatim piatu yang dibesarkan oleh keluarga Dursley yang kejam. Hidupnya berubah drastis saat ia menerima surat undangan untuk bersekolah di Hogwarts School of Witchcraft and Wizardry — sekolah sihir tersembunyi yang penuh keajaiban. Di sana, Harry menemukan sahabat sejati, menghadapi tantangan magis, dan perlahan mengungkap kebenaran tentang masa lalunya dan kematian orang tuanya. Buku pertama ini menjadi pengantar dunia sihir yang memikat dan penuh petualangan.", img: "cover_koleksidigital1.jpg", author: "J.K. Rowling" },
    { title: "Buku Ajar Patologi Robbins", description: "Buku Ajar Patologi Robbins menyajikan secara ringkas prinsip-prinsip patologi manusia yang mudah dibaca, dengan ilustrasi yang baik sehingga ideal bagi mahasiswa masa kini yang sibuk. Edisi yang sepenuhnya direvisi ini tetap menunjukkan penekanan-penekanan tentang patogenesis dan gambaran klinis penyakit, disertai karya seni baru dan diagram-diagram yang lebih rinci.", img: "cover_koleksidigital2.jpg", author: "Vinay Kumar, Abul K. Abbas, Jon C. Aster,  Maria Francisca Ham, Meilania Saraswati" },
    { title: "I Want to Die but I Want to Eat Tteokbokki", description: " Buku ini merupakan memoar seorang wanita muda yang menjalani terapi depresi, dituturkan melalui percakapan dengan psikiaternya. Gaya narasi yang jujur dan ringan menjadikannya refleksi kontemporer tentang kesehatan mental dalam kehidupan urban modern.", img: "cover_koleksidigital3.jpg", author: "Baek Se-hee" },
];

// Koleksi Jurnal, E-Book, Skripsi
const koleksiJurnal = [
    { title: "Jurnal Kesehatan Lingkungan ", description: "Penelitian ini mengevaluasi implementasi penggunaan insektisida dalam program pengendalian demam berdarah dengue (DBD) di Kota Banjarmasin. Hasil penelitian menunjukkan lemahnya perencanaan berbasis data resistensi insektisida, kekurangan tenaga entomologi, serta kurangnya koordinasi lintas sektor. Selain itu, pelaksanaan fogging oleh masyarakat sering tidak sesuai prosedur. Studi ini merekomendasikan penguatan kapasitas sumber daya manusia, perbaikan distribusi insektisida berbasis data resistensi, serta pendekatan berbasis masyarakat untuk efektivitas program yang berkelanjutan.", img: "cover_jurnal1.jpg", author: "Juhairiyah (1), Muhammad Rasyid Ridha (2), Liestiana Indriyati (3), Ririh Yudhastuti (4), Triwibowo Ambar Garjito (5), Muhammad Choirul Hidajat (6), Wahyu Pudji Nugraheni (7), Nurul Hidayah (8), Isnawati (9), Babucarr Jassey (10)" },
    { title: "How to Win Friends and Influence People", description: "Buku klasik pengembangan diri ini mengajarkan keterampilan komunikasi interpersonal yang efektif dan teknik membangun hubungan yang kuat, baik dalam konteks pribadi maupun profesional. Dale Carnegie menyajikan prinsip-prinsip praktis untuk memengaruhi orang lain secara positif, memenangkan kepercayaan, dan menciptakan kerja sama yang harmonis. Dikenal luas sebagai salah satu buku motivasi paling berpengaruh sepanjang masa, buku ini telah membantu jutaan orang meningkatkan kemampuan sosial dan kepemimpinan mereka.", img: "cover_ebook1.jpg", author: "Dale Carnegie" },
    { title: "ANALISIS PENGARUH KEMUDAHAN PEMBAYARAN NON TUNAI (E-WALLET), GAYA HIDUP SERTA PURCHASE INTENTION TERHADAP PERILAKU KONSUMTIF MAHASISWA PADA MASA PANDEMI COVID – 19 (Studi Kasus: Mahasiswa Fakultas Ekonomika dan Bisnis Universitas Diponegoro)", description: "Penelitian ini bertujuan untuk mengetahui pengaruh pada kemudahan transaksi non-tunai, gaya hidup, serta purchase intention.", img: "cover_koleksiskripsi.jpg", author: "Erina Widya Rachmawati" }, ];

// Fungsi untuk generate kartu koleksi
function generateCards(collection, containerId) {
    const container = document.getElementById(containerId);
    collection.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p class="penulis">${item.author}</p> <!-- tampilkan penulis saja -->
        `;
        card.addEventListener('click', () => openModal(item));
        container.appendChild(card);
    });
}

// Modal popup functions
const modal = document.getElementById('book-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');

function openModal(item) {
    modal.style.display = 'flex';
    modalImg.src = item.img;
    modalTitle.textContent = item.title;
    modalDesc.innerHTML = `
        <p>${item.description}</p>
        <p style="margin-top:10px;"><strong>Penulis:</strong> ${item.author}</p>
    `;

    // Event tombol pinjam
    const pinjamButton = document.querySelector('.pinjam-button');
    pinjamButton.onclick = function() {
        showComingSoon();
    }
}

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal if click outside
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

// Fungsi Pencarian Buku
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const keyword = this.value.toLowerCase();
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                if (title.includes(keyword)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
});

// Berita Terkini Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-image');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 3500); // Ganti gambar setiap 3,5 detik

// Generate semua kartu saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('koleksi-buku')) {
        generateCards(koleksiBuku, 'koleksi-buku');
        generateCards(koleksiDigital, 'koleksi-digital');
        generateCards(koleksiJurnal, 'koleksi-jurnal');
    }
});

// Smooth page transitions
const links = document.querySelectorAll('a[href]');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        const target = this.getAttribute('href');
        if (target && !target.startsWith('#')) {
            e.preventDefault();
            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = target;
            }, 300);
        }
    });
});

function cariBuku() {
  const judul = document.getElementById("input-judul").value.toLowerCase();
  const penulis = document.getElementById("input-penulis").value.toLowerCase();
  const hasilContainer = document.getElementById("hasil-opac");

  const hasil = koleksiOPAC.filter(buku =>
    buku.title.toLowerCase().includes(judul) &&
    buku.author.toLowerCase().includes(penulis)
  );

  hasilTerakhir = hasil;

  if (hasil.length > 0) {Az
    hasilContainer.innerHTML = hasil.map((buku, index) => `
    <div class="card search-result-card" onclick="openModalByIndex(${index})">
      <img src="${buku.img}" alt="${buku.title}">
      <h3>${buku.title}</h3>
      <p class="book-author">Penulis: ${buku.author}</p>
    </div>
  `).join('');  
  } else {
    hasilContainer.innerHTML = `<p style="text-align:center;">Buku tidak ditemukan.</p>`;
  }
}

function openModalByIndex(index) {
  const buku = hasilTerakhir[index];
  openModal(buku);
}

window.addEventListener('load', () => {
    document.body.style.opacity = 1;
});

function openModal(item) {
    const modal = document.getElementById('book-modal');
    document.getElementById('modal-img').src = item.img;
    document.getElementById('modal-title').textContent = item.title;
    const desc = document.getElementById('modal-description');
    desc.innerHTML = item.description + `<p style="margin-top:10px;">Penulis: ${item.author}</p>`;
    modal.style.display = 'flex';
  }  
  
  const layananData = [
  {
    title: "Peminjaman Digital",
    description: "Layanan ini memungkinkan pengguna meminjam e-book, jurnal, atau koleksi digital lainnya secara daring tanpa harus datang langsung ke perpustakaan."
  },
  {
    title: "Akses Jurnal dan E-Book",
    description: "Menyediakan akses ke berbagai jurnal ilmiah dan e-book dari database nasional maupun internasional."
  },
  {
    title: "Layanan Referensi",
    description: "Layanan bimbingan untuk membantu pengguna menemukan informasi atau referensi yang dibutuhkan secara cepat dan tepat."
  },
  {
    title: "Katalog Online (OPAC)",
    description: "Fasilitas pencarian katalog koleksi perpustakaan secara daring berdasarkan judul, penulis, atau subjek."
  },
  {
    title: "Panduan Literasi Informasi",
    description: "Memberikan pelatihan dan panduan kepada pengguna tentang cara mencari, menilai, dan menggunakan informasi digital dengan bijak."
  },
  {
    title: "Permintaan Koleksi Baru",
    description: "Pengguna dapat mengajukan usulan buku atau konten digital untuk menambah koleksi perpustakaan."
  }
];

function openLayananModal(index) {
  const modal = document.getElementById('layanan-modal');
  document.getElementById('layanan-modal-title').textContent = layananData[index].title;
  document.getElementById('layanan-modal-description').textContent = layananData[index].description;
  modal.style.display = 'flex';
}

function closeLayananModal() {
  document.getElementById('layanan-modal').style.display = 'none';
}

window.addEventListener('click', function(e) {
  const modal = document.getElementById('layanan-modal');
  if (e.target === modal) {
    closeLayananModal();
  }
});

const semuaKoleksi = [
    {
      title: "Romansa STOVIA",
      author: "Sania Rasyid",
      description: "Kadang-kadang kita jatuh cinta kepada milik orang. Dan yang ia hadapi adalah keduanya, komplet menjadi satu. Mengapa manusia selalu tergerak hatinya untuk meraih ketidakmungkinan? Batavia, 1918. Yansen, pemuda Minahasa, hendak mewujudkan mimpi menjadi dokter di tanah air sendiri. Bersama Hilman pemuda Sunda, Sudiro pemuda Jawa, dan Arsan pemuda Minang, Yansen menemukan ikatan persahabatan di STOVIA. Fiksi berlatar Hindia Belanda di awal abad ke-20 ini menceritakan bagaimana keempat sekawan itu saling mendukung kala mereka menghadapi masalah hidup masing-masing, dari soal cinta, keluarga, lingkungan di sekolah, hingga misteri pembunuhan seorang pengusaha Belanda.",
      img: "cover_buku4.jpg"
    },
    {
      title: "Strange si Pemimpi (Strange the Dreamer)",
      author: "Laini Taylor",
      description: "Sejak usianya lima tahun Lazlo Strange terobsesi dengan kisah Weep, kota yang hilang. Ketika kesempatan untuk mencari kota itu muncul di hadapannya, Lazlo memutuskan langsung menyambarnya sebelum dia kehilangan mimpi itu selamanya. Apa sebenarnya yang menimpa kota Weep dua ratus tahun lalu hingga memutus kota tersebut dari dunia luar? Jawabannya ada di Weep, beserta banyak misteri lain--termasuk sosok dewi berkulit biru yang muncul dalam mimpi Lazlo. Bagaimana bisa Lazlo memimpikan wanita itu sebelum dia tahu wanita itu ada? Jika semua dewa sudah mati, kenapa wanita itu tampak sangat nyata? Selamat datang di Weep!",
      img: "cover_buku2.jpg"
    },
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      description: "Harry Potter adalah seorang anak yatim piatu yang dibesarkan oleh keluarga Dursley yang kejam. Hidupnya berubah drastis saat ia menerima surat undangan untuk bersekolah di Hogwarts School of Witchcraft and Wizardry — sekolah sihir tersembunyi yang penuh keajaiban. Di sana, Harry menemukan sahabat sejati, menghadapi tantangan magis, dan perlahan mengungkap kebenaran tentang masa lalunya dan kematian orang tuanya. Buku pertama ini menjadi pengantar dunia sihir yang memikat dan penuh petualangan.",
      img: "cover_koleksidigital1.jpg"
    },
    {
      title: "Buku Ajar Patologi Robbins",
      author: "Vinay Kumar, Abul K. Abbas, Jon C. Aster,  Maria Francisca Ham, Meilania Saraswati",
      description: "Buku Ajar Patologi Robbins menyajikan secara ringkas prinsip-prinsip patologi manusia yang mudah dibaca, dengan ilustrasi yang baik sehingga ideal bagi mahasiswa masa kini yang sibuk. Edisi yang sepenuhnya direvisi ini tetap menunjukkan penekanan-penekanan tentang patogenesis dan gambaran klinis penyakit, disertai karya seni baru dan diagram-diagram yang lebih rinci.",
      img: "cover_koleksidigital2.jpg"
    },
    {
      title: "I Want to Die but I Want to Eat Tteokbokki",
      author: "Baek Se-hee",
      description: " Buku ini merupakan memoar seorang wanita muda yang menjalani terapi depresi, dituturkan melalui percakapan dengan psikiaternya. Gaya narasi yang jujur dan ringan menjadikannya refleksi kontemporer tentang kesehatan mental dalam kehidupan urban modern.",
      img: "cover_koleksidigital3.jpg"
    },
    {
      title: "Cantik Itu Luka",
      author: "Eka Kurniawan",
      description: "Di satu sore, seorang perempuan bangkit dari kuburannya setelah dua puluh satu tahun kematian. Kebangkitannya menguak kutukan dan tragedi keluarga, yang terentang sejak akhir masa kolonial perpaduan antara epik keluarga yang dibalut roman, kisah hantu, kekejaman politik, mitologi, dan petualangan. Dari kekasih yang lenyap ditelan kabut hingga seorang ibu yang menginginkan bayi buruk rupa.",
      img: "cover_buku3.jpg"
    },
    {
      title: "Jurnal Kesehatan Lingkungan",
      author: "Juhairiyah (1), Muhammad Rasyid Ridha (2), Liestiana Indriyati (3), Ririh Yudhastuti (4)",
      description: "Penelitian ini mengevaluasi implementasi penggunaan insektisida dalam program pengendalian demam berdarah dengue (DBD) di Kota Banjarmasin. Hasil penelitian menunjukkan lemahnya perencanaan berbasis data resistensi insektisida, kekurangan tenaga entomologi, serta kurangnya koordinasi lintas sektor. Selain itu, pelaksanaan fogging oleh masyarakat sering tidak sesuai prosedur. Studi ini merekomendasikan penguatan kapasitas sumber daya manusia, perbaikan distribusi insektisida berbasis data resistensi, serta pendekatan berbasis masyarakat untuk efektivitas program yang berkelanjutan.",
      img: "cover_jurnal1.jpg"
    },
    {
      title: "How to Win Friends and Influence People",
      author: "Dale Carnegie",
      description: "Buku klasik pengembangan diri ini mengajarkan keterampilan komunikasi interpersonal yang efektif dan teknik membangun hubungan yang kuat, baik dalam konteks pribadi maupun profesional. Dale Carnegie menyajikan prinsip-prinsip praktis untuk memengaruhi orang lain secara positif, memenangkan kepercayaan, dan menciptakan kerja sama yang harmonis. Dikenal luas sebagai salah satu buku motivasi paling berpengaruh sepanjang masa, buku ini telah membantu jutaan orang meningkatkan kemampuan sosial dan kepemimpinan mereka.",
      img: "cover_ebook1.jpg"
    },
    {
      title: "Skripsi",
      author: "Erina Widya Rachmawati",
      description: "ANALISIS PENGARUH KEMUDAHAN PEMBAYARAN NON TUNAI (E-WALLET), GAYA HIDUP SERTA PURCHASE INTENTION TERHADAP PERILAKU KONSUMTIF MAHASISWA PADA MASA PANDEMI COVID – 19 (Studi Kasus: Mahasiswa Fakultas Ekonomika dan Bisnis Universitas Diponegoro,Penelitian ini bertujuan untuk mengetahui pengaruh pada kemudahan transaksi non-tunai, gaya hidup, serta purchase intention.",
      img: "cover_koleksiskripsi.jpg"
    }
  ];
  
  
  function tampilkanKoleksiBuku() {
    const container = document.getElementById("koleksi-page");
    if (!container) return;
    semuaKoleksi.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card-koleksi";
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.author}</p>
      `;
      card.addEventListener("click", () => openModalKoleksi(index));
      container.appendChild(card);
    });
  }
  
  function openModalKoleksi(index) {
    const item = semuaKoleksi[index];
    document.getElementById("modal-img").src = item.img;
    document.getElementById("modal-title").textContent = item.title;
    document.getElementById("modal-description").innerHTML = `
      <p>${item.description}</p>
      <p><strong>Penulis:</strong> ${item.author}</p>
    `;
    document.getElementById("book-modal").style.display = "flex";
  }
  
  document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("book-modal").style.display = "none";
  });
  
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("book-modal");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  
  document.addEventListener("DOMContentLoaded", tampilkanKoleksiBuku);
  
  function toggleFAQ(item) {
    item.classList.toggle('active');
  }
  
  function toggleFAQ(item) {
    // Tutup semua item lain jika hanya satu yang boleh dibuka
    const semuaItem = document.querySelectorAll('.faq-item');
    semuaItem.forEach(i => {
      if (i !== item) i.classList.remove('active');
    });
  
    // Toggle item yang diklik
    item.classList.toggle('active');
  }