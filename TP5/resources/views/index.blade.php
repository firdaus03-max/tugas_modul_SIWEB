<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Sistem Manajemen Sepatu</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>

<body>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">CIBADUYUT SHOES</a>

            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                @if(session()->has('user'))
                <span class="text-white me-3">
                    {{ session('user') }}
                </span>
                <a href="{{ route('logout') }}" class="btn btn-danger btn-sm">
                    Logout
                </a>
                @else
                <a href="{{ route('login') }}" class="btn btn-warning btn-sm">
                    Login
                </a>
                @endif
            </div>

            <div class="ms-auto">
                <button class="btn btn-outline-warning btn-sm me-2" data-bs-toggle="modal"
                    data-bs-target="#wishlistModal" onclick="tampilkanWishlist()">
                    Wishlist (<span id="wishlist-count">0</span>)
                </button>

                <button id="btn-theme" class="btn btn-outline-light btn-sm">
                    Mode Gelap
                </button>
            </div>
        </div>
    </nav>

    <div class="hero-section text-center">
        <div>
            <h1 class="display-4">Sistem Manajemen Sepatu</h1>
            <p class="lead">Kelola stok, kategori, dan data sepatu dengan mudah.</p>
        </div>
    </div>

    <div class="container mt-5">
        <div class="row text-center">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5>Stok tersedia</h5>
                        <h2>85</h2>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5>Kategori</h5>
                        <h2>3</h2>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5>Total Produk</h5>
                        <h2>12</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container mt-5">
        <div class="d-flex justify-content-between mb-3">
            <h3 class="mb-4">Daftar Sepatu</h3>
            <a href="{{ route('products') }}" class="text-decoration-none text-dark">
                Lihat semua produk >>>
            </a>
        </div>

        <div class="row">

            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="{{ asset('assets/NIKE_P_6000.jpg') }}" class="card-img-top" alt="Sepatu" />
                    <div class="card-body">
                        <h5 class="card-title">Nike P-6000</h5>
                        <p class="card-text harga-text">Harga: Rp 1.429.000</p>
                        <p class="card-text stok-text">Stok: 10</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-primary w-50 me-2">Beli</button>
                            <button class="btn btn-outline-danger w-50">Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="{{ asset('assets/AIR_FORCE_1.jpg') }}" class="card-img-top" alt="Sepatu" />
                    <div class="card-body">
                        <h5 class="card-title">Nike Air Force 1</h5>
                        <p class="card-text harga-text">Harga: Rp 1.529.000</p>
                        <p class="card-text stok-text">Stok: 7</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-primary w-50 me-2">Beli</button>
                            <button class="btn btn-outline-danger w-50">Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="{{ asset('assets/AIR_JORDAN_1_LOW.JPG') }}" class="card-img-top" alt="Sepatu" />
                    <div class="card-body">
                        <h5 class="card-title">Nike Air Jordan 1 Low</h5>
                        <p class="card-text harga-text">Harga: Rp 1.729.000</p>
                        <p class="card-text stok-text">Stok: 10</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-primary w-50 me-2">Beli</button>
                            <button class="btn btn-outline-danger w-50">Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="modal fade" id="wishlistModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">Daftar Wishlist Saya</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <ul class="list-group" id="daftar-wishlist"></ul>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                    <button type="button" class="btn btn-danger" onclick="hapusWishlist()">Kosongkan</button>
                </div>

            </div>
        </div>
    </div>

    <div class="container mt-5 mb-5">
        <h3 class="mb-4">Tambah Sepatu</h3>

        <div class="card p-4">
            <form method="POST">
                @csrf
                <div class="mb-3">
                    <label class="form-label">Nama Sepatu</label>
                    <input type="text" class="form-control" name="nama" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Harga</label>
                    <input type="number" class="form-control" name="harga" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Stok</label>
                    <input type="number" class="form-control" name="stok" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Kategori</label>
                    <select class="form-select" name="kategori">
                        <option>Running</option>
                        <option>Basket</option>
                        <option>Casual</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary">Simpan</button>
            </form>
        </div>
    </div>

    <footer class="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; Sistem Manajemen Sepatu</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('js/script.js') }}"></script>

</body>

</html>