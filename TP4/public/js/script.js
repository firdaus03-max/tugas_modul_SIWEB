const btnTheme = document.getElementById('btn-theme');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  btnTheme.innerText = "Mode Terang";
}

btnTheme.addEventListener('click', function() {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    btnTheme.innerText = "Mode Terang";
  } else {
    localStorage.removeItem('theme');
    btnTheme.innerText = "Mode Gelap";
  }
});

function aktifkanTombolBeli() {
    const tombolBeli = document.querySelectorAll('.btn-detail');
    tombolBeli.forEach(function(button) {
        button.replaceWith(button.cloneNode(true));
    });

    const tombolBaru = document.querySelectorAll('.btn-detail');
    tombolBaru.forEach(function(button) {
        button.addEventListener('click', function(e) {
            const cardBody = e.target.closest('.card-body');
            const stokElement = cardBody.querySelector('.stok-text');
            let stok = parseInt(stokElement.innerText.replace("Stok: ", ""));

            if (stok > 0) {
                stok--;
                stokElement.innerText = "Stok: " + stok;
                const namaBarang = cardBody.querySelector('.card-title').innerText;
                alert("Berhasil membeli " + namaBarang);
            } else {
                alert("Stok Habis!");
                e.target.disabled = true;
                e.target.innerText = "Habis";
            }
        });
    });
}

aktifkanTombolBeli();

document.addEventListener('DOMContentLoaded', function() {
    let wishlist = [];

    function updateWishlistCount() {
        document.getElementById('wishlist-count').innerText = wishlist.length;
    }

    function tampilkanWishlist() {
        let daftar = document.getElementById('daftar-wishlist');
        daftar.innerHTML = "";

        wishlist.forEach(function (item) {
            daftar.innerHTML += `<li class="list-group-item">${item}</li>`;
        });
    }

    function hapusWishlist() {
        wishlist = [];
        updateWishlistCount();
        tampilkanWishlist();
    }

    document.querySelectorAll('.btn-wishlist').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            let nama = e.target.closest('.card-body')
             .querySelector('.card-title').innerText;

            wishlist.push(nama);
            updateWishlistCount();
            alert(nama + " ditambahkan ke Wishlist");
        });
    });

    window.tampilkanWishlist = tampilkanWishlist;
    window.hapusWishlist = hapusWishlist;
});