// ===========================================
// 1. FITUR DARK MODE (LocalStorage & DOM)
// ===========================================
const btnTheme = document.getElementById('btn-theme');
const body = document.body;

// Cek apakah ada simpanan tema di browser
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    btnTheme.innerHTML = '<i class="bi bi-sun-fill"></i> Mode Terang';
}

btnTheme.addEventListener('click', function() {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        btnTheme.innerHTML = '<i class="bi bi-sun-fill"></i> Mode Terang';
    } else {
        localStorage.removeItem('theme');
        btnTheme.innerHTML = '<i class="bi bi-moon-stars-fill"></i> Mode Gelap';
    }
});

// ===========================================
// 2. FITUR WISHLIST (Array & LocalStorage)
// ===========================================
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function updateWishlistCount() {
    const countElement = document.getElementById('wishlist-count');
    if (countElement) {
        countElement.textContent = wishlist.length;
    }
}

function tambahKeWishlist(namaMotor, harga) {
    // Cek apakah motor sudah ada di wishlist
    const exists = wishlist.some(item => item.nama === namaMotor);
    
    if (!exists) {
        wishlist.push({ nama: namaMotor, harga: harga });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        alert(namaMotor + ' ditambahkan ke wishlist!');
        
        // Ubah warna tombol wishlist
        const buttons = document.querySelectorAll('.btn-wishlist');
        buttons.forEach(btn => {
            if (btn.closest('.card-body') && 
                btn.closest('.card-body').querySelector('.card-title').innerText === namaMotor) {
                btn.classList.add('btn-danger');
                btn.classList.remove('btn-outline-danger');
                btn.innerHTML = '<i class="bi bi-heart-fill"></i> Di Wishlist';
            }
        });
    } else {
        alert(namaMotor + ' sudah ada di wishlist!');
    }
}

function tampilkanWishlist() {
    const daftarWishlist = document.getElementById('daftar-wishlist');
    if (!daftarWishlist) return;

    daftarWishlist.innerHTML = '';

    if (wishlist.length === 0) {
        daftarWishlist.innerHTML = '<li class="list-group-item text-center text-muted">Belum ada motor di wishlist</li>';
    } else {
        wishlist.forEach((item, index) => {
            daftarWishlist.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${item.nama}</strong><br>
                        <small class="text-muted">${item.harga}</small>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" onclick="hapusDariWishlist(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </li>
            `;
        });
    }
}

function hapusDariWishlist(index) {
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    tampilkanWishlist();
    
    // Kembalikan tampilan tombol wishlist di halaman utama
    const motorDiWishlist = document.querySelectorAll('.btn-danger');
    motorDiWishlist.forEach(btn => {
        if (btn.classList.contains('btn-wishlist')) {
            btn.classList.remove('btn-danger');
            btn.classList.add('btn-outline-danger');
            btn.innerHTML = '<i class="bi bi-heart"></i> Wishlist';
        }
    });
}

function kosongkanWishlist() {
    wishlist = [];
    localStorage.removeItem('wishlist');
    updateWishlistCount();
    tampilkanWishlist();
    
    // Kembalikan semua tombol wishlist ke keadaan semula
    const tombolWishlist = document.querySelectorAll('.btn-wishlist');
    tombolWishlist.forEach(btn => {
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-outline-danger');
        btn.innerHTML = '<i class="bi bi-heart"></i> Wishlist';
    });
}

// ===========================================
// 3. FITUR BELI (Event Listener & Manipulasi DOM)
// ===========================================
function aktifkanTombolBeli() {
    const tombolBeli = document.querySelectorAll('.btn-beli');

    tombolBeli.forEach(function(button) {
        // Hapus event listener lama dengan clone
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });

    const tombolBaru = document.querySelectorAll('.btn-beli');
    
    tombolBaru.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const cardBody = e.target.closest('.card-body');
            if (!cardBody) return;
            
            const stokElement = cardBody.querySelector('.stok-text');
            if (!stokElement) return;
            
            let stokText = stokElement.innerText;
            let stok = parseInt(stokText.replace("Stok:", "").replace("Stok:", "").trim());

            if (stok > 0) {
                stok--;
                stokElement.innerHTML = "Stok: " + stok;
                
                const namaMotor = cardBody.querySelector('.card-title').innerText;
                alert("✅ Berhasil membeli " + namaMotor + "!");
                
                // Jika stok habis, disable tombol
                if (stok === 0) {
                    e.target.disabled = true;
                    e.target.innerHTML = '<i class="bi bi-x-circle"></i> Habis';
                }
            } else {
                alert("❌ Stok Habis!");
                e.target.disabled = true;
                e.target.innerHTML = '<i class="bi bi-x-circle"></i> Habis';
            }
        });
    });
}

// ===========================================
// 4. FITUR TAMBAH MOTOR BARU (Bonus)
// ===========================================
function tambahMotorBaru() {
    // Ambil nilai dari form
    const namaMotor = document.getElementById('namaMotor')?.value;
    const merkMotor = document.getElementById('merkMotor')?.value;
    const tahunMotor = document.getElementById('tahunMotor')?.value;
    const ccMotor = document.getElementById('ccMotor')?.value;
    const hargaMotor = document.getElementById('hargaMotor')?.value;
    const stokMotor = document.getElementById('stokMotor')?.value;

    // Validasi sederhana
    if (!namaMotor || !merkMotor || !tahunMotor || !ccMotor || !hargaMotor || !stokMotor) {
        alert('⚠️ Semua field harus diisi!');
        return;
    }

    if (parseInt(tahunMotor) < 2015 || parseInt(tahunMotor) > 2024) {
        alert('⚠️ Tahun harus antara 2015 - 2024!');
        return;
    }

    if (parseInt(hargaMotor) < 10000000) {
        alert('⚠️ Harga minimal Rp 10.000.000!');
        return;
    }

    // Format harga
    const hargaFormat = 'Rp ' + parseInt(hargaMotor).toLocaleString('id-ID');

    // Generate konten card baru
    const containerBarang = document.getElementById('container-barang');
    if (!containerBarang) return;
    
    const cardBaru = document.createElement('div');
    cardBaru.className = 'col-md-4 mb-4';
    cardBaru.innerHTML = `
        <div class="card h-100 motor-card">
            <img src="assets/default_motor.jpg" class="card-img-top" alt="${namaMotor}"/>
            <div class="card-body">
                <h5 class="card-title">${namaMotor}</h5>
                <p class="card-text harga-text">Harga: ${hargaFormat}</p>
                <p class="card-text stok-text">Stok: ${stokMotor}</p>
                <p class="card-text"><i class="bi bi-calendar"></i> Tahun: ${tahunMotor} | <i class="bi bi-cpu"></i> ${ccMotor}cc</p>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-primary btn-beli w-50 me-2">
                        <i class="bi bi-cart-check"></i> Beli
                    </button>
                    <button class="btn btn-outline-danger btn-wishlist w-50" onclick="tambahKeWishlist('${namaMotor}', '${hargaFormat}')">
                        <i class="bi bi-heart"></i> Wishlist
                    </button>
                </div>
            </div>
        </div>
    `;

    // Tambahkan card baru ke container
    containerBarang.appendChild(cardBaru);

    // Reset form
    const form = document.getElementById('formTambahMotor');
    if (form) form.reset();

    // Aktifkan kembali tombol beli untuk card baru
    aktifkanTombolBeli();

    alert('✅ Motor baru berhasil ditambahkan!');
}

// ===========================================
// 5. INISIALISASI SAAT HALAMAN DIMUAT
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    // Update jumlah wishlist
    updateWishlistCount();
    
    // Aktifkan tombol beli
    aktifkanTombolBeli();
    
    // Cek dan tandai motor yang sudah ada di wishlist
    if (wishlist.length > 0) {
        const tombolWishlist = document.querySelectorAll('.btn-wishlist');
        tombolWishlist.forEach(btn => {
            const cardBody = btn.closest('.card-body');
            if (cardBody) {
                const namaMotor = cardBody.querySelector('.card-title').innerText;
                const exists = wishlist.some(item => item.nama === namaMotor);
                if (exists) {
                    btn.classList.add('btn-danger');
                    btn.classList.remove('btn-outline-danger');
                    btn.innerHTML = '<i class="bi bi-heart-fill"></i> Di Wishlist';
                }
            }
        });
    }
});