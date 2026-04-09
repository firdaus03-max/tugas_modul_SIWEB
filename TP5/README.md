## Penjelasan Kode Project

### app/Models/category.php

```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    protected $table = 'categories';
    protected $primaryKey = 'category_id';
    public $timestamps = false;
    protected $fillable = [
        'category_id',    
        'category_name'
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'category_id');
    }
}
```

1. Mendefinisikan file PHP.
2. Namespace App\Models.
3. Mengimpor Model dari Eloquent.
4. Mendefinisikan class category yang mewarisi Model.
5. Properti $table menentukan nama tabel di database: 'categories'.
6. Properti $primaryKey menentukan primary key: 'category_id'.
7. Properti $timestamps di-set false, artinya tidak menggunakan kolom created_at dan updated_at.
8. Properti $fillable berisi kolom yang bisa diisi secara massal: 'category_id', 'category_name'.
9. Fungsi products() mendefinisikan relasi one-to-many ke model Product, berdasarkan 'category_id'.

---

### app/Models/product.php

```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'product_id';
    public $timestamps = false;
    protected $fillable = [
        'product_id',
        'category_id',
        'product_name',
        'product_price',
        'product_stock'
    ];

    public function category()
    {
        return $this->belongsTo(category::class, 'category_id', 'category_id');
    }
}
```

1. Mendefinisikan file PHP.
2. Namespace App\Models.
3. Mengimpor Model dari Eloquent.
4. Mendefinisikan class product yang mewarisi Model.
5. Properti $table menentukan nama tabel: 'products'.
6. Properti $primaryKey: 'product_id'.
7. $timestamps di-set false.
8. $fillable berisi kolom yang bisa diisi: 'product_id', 'category_id', 'product_name', 'product_price', 'product_stock'.
9. Fungsi category() mendefinisikan relasi many-to-one ke model category.

---

### app/Models/User.php

```
<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
    * Atribut yang dapat diisi secara massal.
    *
    * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
    * Atribut yang harus disembunyikan saat serialisasi.
    *
    * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
    * Mendapatkan atribut yang harus di-casting.
    *
    * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
```

1. Mendefinisikan file PHP.
2. Namespace App\Models.
3. Mengimpor trait HasFactory dan Notifiable.
4. Class User mewarisi Authenticatable.
5. Menggunakan trait HasFactory dan Notifiable.
6. $fillable berisi atribut yang bisa diisi: 'name', 'email', 'password'.
7. $hidden berisi atribut yang disembunyikan saat serialisasi: 'password', 'remember_token'.
8. Fungsi casts() meng-cast 'email_verified_at' ke datetime dan 'password' ke hashed.

---

### app/Http/Controllers/AuthController.php

```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function showLogin()
    {
        // Cek jika sudah login, lempar ke index
        if (session()->has('user')) return redirect()->route('home');
        return view('login');
    }

    public function login(Request $request)
    {
        $valid_user = "admin";
        $valid_pass = "123";

        if ($request->username == $valid_user && $request->password == $valid_pass)
        {
            // Set Session Laravel
            session(['user' => $request->username]);
            return redirect()->route('home');
        }

        // Jika gagal, kembalikan ke login dengan pesan error
        return back()->with('error', 'Username atau Password salah!');
    }

    public function logout()
    {
        session()->forget('user'); // Hapus session
        return redirect()->route('home');
    }
}
```

1. Namespace App\Http\Controllers.
2. Mengimpor Request dari Illuminate\Http.
3. Class AuthController mewarisi Controller.
4. Fungsi showLogin() menampilkan halaman login, jika sudah login diarahkan ke home.
5. Fungsi login() memvalidasi username dan password, jika benar set session dan redirect ke home, jika salah kembali ke login dengan pesan error.
6. Fungsi logout() menghapus session user dan redirect ke home.

---

### app/Http/Controllers/ProductController.php

```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\product;
use App\Models\category;
use Illuminate\Support\Facades\Validator;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = category::all();
        $products = product::with('category')->get();
        return view('product', compact('products', 'category'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'product_name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,category_id',
            'product_price' => 'required|numeric',
            'product_stock' => 'required|integer'
        ]);

        product::create($validateData);
        return redirect()->route('products')->with('success', 'Produk berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
```

1. Namespace App\Http\Controllers.
2. Mengimpor Request, model product, model category, dan Validator.
3. Class ProductController mewarisi Controller.
4. Fungsi index() mengambil semua kategori dan produk, lalu mengirim ke view product.
5. Fungsi store() memvalidasi input produk, lalu menyimpan data produk baru.
6. Fungsi show(), edit(), update(), destroy() masih kosong.

---

### app/Http/Controllers/Controller.php

```
<?php

namespace App\Http\Controllers;

abstract class Controller
{
    //
}
```

1. Namespace App\Http\Controllers.
2. Mendefinisikan class Controller sebagai abstract, dasar untuk controller lain.

---

### routes/web.php

```
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

// Halaman Utama
Route::get('/', function () {
    return view('index');
})->name('home');

// Halaman Login
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');

// Proses Form Login & Logout
Route::post('/login', [AuthController::class, 'login'])->name('login.proses');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::post('/products', [ProductController::class, 'store'])->name('products.store');
?>
```

1. Mengimpor Route, AuthController, ProductController.
2. Route '/' menampilkan view index.
3. Route '/login' menampilkan form login.
4. Route POST '/login' memproses login.
5. Route '/logout' untuk logout.
6. Route '/products' menampilkan daftar produk.
7. Route POST '/products' menyimpan produk baru.

---

### resources/views/product.blade.php

Lihat file untuk kode lengkap, berikut ringkasan bagian penting:

1. Struktur HTML untuk halaman produk.
2. Navbar dengan menu login/logout, wishlist, dan mode gelap.
3. Bagian hero menampilkan judul dan deskripsi.
4. Dashboard menampilkan total produk, stok, dan kategori.
5. Daftar produk ditampilkan dalam bentuk kartu, menggunakan perulangan dari variabel $products.
6. Modal wishlist untuk menampilkan daftar wishlist.
7. Form tambah sepatu dan modal tambah produk, input nama, harga, stok, dan kategori.
8. Footer dan script JS.

---

### resources/views/login.blade.php

Lihat file untuk kode lengkap, berikut ringkasan bagian penting:

1. Struktur HTML untuk halaman login.
2. Form login dengan input username, password, dan remember me.
3. Menampilkan pesan error jika login gagal.
4. Tombol login dan tautan kembali ke beranda.

---

### resources/views/index.blade.php

Lihat file untuk kode lengkap, berikut ringkasan bagian penting:

1. Struktur HTML untuk halaman utama.
2. Navbar dengan menu login/logout, wishlist, dan mode gelap.
3. Bagian hero menampilkan judul dan deskripsi.
4. Dashboard menampilkan stok, kategori, dan total produk.
5. Daftar sepatu ditampilkan dalam bentuk kartu.
6. Modal wishlist.
7. Form tambah sepatu.
8. Footer dan script JS.

---

### resources/views/welcome.blade.php

Lihat file untuk kode lengkap, berikut ringkasan bagian penting:

1. Struktur HTML welcome bawaan Laravel.
2. Navbar dengan tautan login dan register.
3. Bagian utama berisi saran untuk mulai menggunakan Laravel.
4. Menggunakan Tailwind CSS dan Vite jika tersedia.
<p align="center"><a href="https: laravel.com" target="_blank"><img src="https: raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https: github.com/laravel/framework/actions"><img src="https: github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https: packagist.org/packages/laravel/framework"><img src="https: img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https: packagist.org/packages/laravel/framework"><img src="https: img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https: packagist.org/packages/laravel/framework"><img src="https: img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https: laravel.com/docs/routing).
- [Powerful dependency injection container](https: laravel.com/docs/container).
- Multiple back-ends for [session](https: laravel.com/docs/session) and [cache](https: laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https: laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https: laravel.com/docs/migrations).
- [Robust background job processing](https: laravel.com/docs/queues).
- [Real-time event broadcasting](https: laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https: laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https: laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https: laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https: partners.laravel.com).

### Premium Partners

- **[Vehikl](https: vehikl.com)**
- **[Tighten Co.](https: tighten.co)**
- **[Kirschbaum Development Group](https: kirschbaumdevelopment.com)**
- **[64 Robots](https: 64robots.com)**
- **[Curotec](https: www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https: devsquad.com/hire-laravel-developers)**
- **[Redberry](https: redberry.international/laravel-development)**
- **[Active Logic](https: activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https: laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https: laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https: opensource.org/licenses/MIT).


penjelasan
# Sistem Manajemen Sepatu - CIBADUYUT SHOES

Project Laravel sederhana untuk manajemen data sepatu dengan fitur login.

## Daftar Isi
- [Struktur Route Lengkap (web.php)](#struktur-route-lengkap-webphp)
- [AuthController](#authcontroller)
- [Halaman Index (index.blade.php)](#halaman-index-indexbladephp)
- [Halaman Login (login.blade.php)](#halaman-login-loginbladephp)
- [ProductController](#productcontroller)
- [Models Eloquent](#models-eloquent)
- [Halaman Product (product.blade.php)](#halaman-product-productbladephp)
- [Database Migrations](#database-migrations)
- [Database Seeder](#database-seeder)

---

## Struktur Route Lengkap (web.php)

File: `routes/web.php`

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

// Halaman Utama
Route::get('/', function () {
    return view('index');
})->name('home');

// Halaman Login
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');

// Proses Form Login & Logout
Route::post('/login', [AuthController::class, 'login'])->name('login.proses');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

// Route Produk (CRUD)
Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::post('/products', [ProductController::class, 'store'])->name('products.store');
```

### Penjelasan Lengkap:
| Route | Method | Controller | Fungsi |
|-------|--------|------------|--------|
| `/` | GET | Closure | Menampilkan halaman utama (index.blade.php) |
| `/login` | GET | `AuthController@showLogin` | Menampilkan form login |
| `/login` | POST | `AuthController@login` | Memproses autentikasi login |
| `/logout` | GET | `AuthController@logout` | Logout dan hapus session |
| `/products` | GET | `ProductController@index` | Daftar semua produk dengan kategori |
| `/products` | POST | `ProductController@store` | Tambah produk baru |

**Catatan:**
- Semua route menggunakan middleware CSRF otomatis untuk POST
- Route `/products` adalah resource route parsial (hanya index & store)
- Nama route menggunakan `->name()` untuk `route('nama')` di blade

---

## ProductController

File: `app/Http/Controllers/ProductController.php`

```php
<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\product;
use App\Models\category;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        $category = category::all();
        $products = product::with('category')->get();
        return view('product', compact('products', 'category'));
    }

    public function create() { /* kosong */ }
    public function store(Request $request) { /* implementasi validation & create */ }
    public function show(string $id) { /* kosong */ }
    public function edit(string $id) { /* kosong */ }
    public function update(Request $request, string $id) { /* kosong */ }
    public function destroy(string $id) { /* kosong */ }
}
```

### Penjelasan Method:

| Method | Deskripsi |
|--------|-----------|
| **index()** | Mengambil semua kategori (`category::all()`) dan produk dengan relasi kategori (`with('category')`). Mengirim data ke view `product.blade.php` menggunakan `compact()`. |
| **create()** | Stub kosong untuk form tambah produk. |
| **store(Request $request)** | **Diimplementasi**: Validasi input (`product_name`, `category_id exists`, `price numeric`, `stock integer`). Buat produk baru `product::create()`. Redirect dengan success message. |
| **show(string $id)** | Stub kosong untuk detail produk. |
| **edit(string $id)** | Stub kosong untuk form edit. |
| **update(Request $request, string $id)** | Stub kosong untuk update produk. |
| **destroy(string $id)** | Stub kosong untuk hapus produk. |

**Fitur Utama:**
- Eager loading `with('category')` untuk hindari N+1 query.
- Validasi Laravel: `required`, `exists:categories,category_id`, dll.
- Flash message: `with('success', 'pesan')` untuk notifikasi.

---

## Models Eloquent

### 1. Model Product (`app/Models/product.php`)

```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'product_id';
    public $timestamps = false;
    protected $fillable = [
        'product_id', 'category_id', 'product_name', 'product_price', 'product_stock'
    ];

    public function category()
    {
        return $this->belongsTo(category::class, 'category_id', 'category_id');
    }
}
```

**Penjelasan:**
- **Properties**:
  | Property | Fungsi |
  |----------|--------|
  | `$table = 'products'` | Tentukan nama tabel DB (default 'products' dari class name). |
  | `$primaryKey = 'product_id'` | PK custom (default 'id'). |
  | `$timestamps = false` | Nonaktifkan created_at/updated_at. |
  | `$fillable` | Mass assignment fields untuk `create()`/`fill()`. |
- **Relasi**: `belongsTo` ke model `category` via `category_id`.

### 2. Model Category (`app/Models/category.php`)

```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    protected $table = 'categories';
    protected $primaryKey = 'category_id';
    public $timestamps = false;
    protected $fillable = ['category_id', 'category_name'];

    public function products()
    {
        return $this->hasMany(product::class, 'category_id', 'category_id');
    }
}
```

**Penjelasan:**
- **Properties**: Sama seperti product model.
- **Relasi**: `hasMany` ke model `product` (satu kategori punya banyak produk).

**Catatan Relasi:**
- Di ProductController: `product::with('category')` → eager load nama kategori.
- Akses di Blade: `$item->category->category_name`.

---

## Halaman Product (product.blade.php)

File: `resources/views/product.blade.php`

Halaman utama manajemen produk dengan Bootstrap 5, navbar, hero section, dashboard cards, daftar produk cards, modal tambah produk, dan wishlist modal.

### Struktur Utama:
1. **Navbar**: Logo, status login/logout, tombol wishlist & theme toggle.
2. **Hero**: Judul "Sistem Manajemen Sepatu".
3. **Dashboard Cards**: Total produk/stok/kategori (hardcoded: 12/85/3).
4. **Daftar Produk**: `@foreach ($products as $item)` → card dengan nama, kategori badge, harga, stok, tombol Beli/Wishlist.
5. **Modal Tambah Produk**: Form POST ke `products.store` dengan `@foreach ($category as $cat)` dropdown.
6. **Modal Wishlist**: JS dynamic list.
7. **Footer**.

### Kode Penting:

**Loop Produk:**
```blade
@foreach ($products as $item)
<div class="col-md-4 mb-4">
  <div class="card">
    <h5>{{ $item->product_name }}</h5>
    <span class="badge bg-secondary">{{ $item->category->category_name }}</span>
    <p>Rp{{ number_format($item->product_price, 0, ',', '.') }}</p>
    <p>Stok: {{ $item->product_stock }}</p>
  </div>
</div>
@endforeach
```

**Form Tambah Modal:**
```blade
<form action="{{ route('products.store') }}" method="POST">
@csrf
<select name="category_id">
  @foreach ($category as $cat)
    <option value="{{ $cat->category_id }}">{{ $cat->category_name }}</option>
  @endforeach
</select>
<input name="product_name" />
<input name="product_price" type="number" />
<input name="product_stock" type="number" />
</form>
```

**Fitur JS (script.js):**
- Wishlist: Tambah/hapus item, count, modal list, kosongkan.
- Theme toggle: "Mode Gelap" button.
- Detail beli button.

**Variabel dari Controller:**
- `$products`: Koleksi produk dengan relasi category eager loaded.
- `$category`: Koleksi semua kategori untuk dropdown.

---

## Database Migrations

### 1. Kategori (`database/migrations/2026_04_01_074113_create_categories_table.php`)

```php
public function up(): void
{
    Schema::create('categories', function (Blueprint $table) {
        $table->id('category_id')->primarykey();  // TYPO: seharusnya ->primary()
        $table->string('category_name');
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('categories');
}
```

**Penjelasan:**
- **up()**: Buat tabel `categories` dengan PK `category_id` (auto-increment), `category_name`, timestamps.
- **down()**: Hapus tabel jika `php artisan migrate:rollback`.

### 2. Produk (`database/migrations/2026_04_01_074126_create_products_table.php`)

```php
public function up(): void
{
    Schema::create('products', function (Blueprint $table) {
        $table->id('product_id')->primarykey();  // TYPO: seharusnya ->primary()
        $table->unsignedBigInteger('category_id');
        $table->foreign('category_id')->references('category_id')->on('categories')->onDelete('cascade');
        $table->string('product_name');
        $table->integer('product_price');
        $table->integer('product_stock');
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('products');
}
```

**Penjelasan:**
- **up()**: Tabel `products` dengan PK `product_id`, FK `category_id` (cascade delete), fields nama/harga/stok, timestamps.
- **down()**: Hapus tabel.

**Perintah:**
```
php artisan migrate  # Jalankan migrations
php artisan migrate:rollback  # Rollback terakhir
php artisan migrate:fresh  # Hapus & jalankan ulang semua
```

---

## Database Seeder

File: `database/seeders/DatabaseSeeder.php`

```php
public function run(): void
{
    DB::table('categories')->insert([
        ['category_id' => 1, 'category_name' => 'Sneakers', ...timestamps],
        ['category_id' => 2, 'category_name' => 'Boots', ...],
    ]);

    DB::table('products')->insert([
        ['product_id' => 1, 'category_id' => 1, 'product_name' => 'Nike Air Force 1', 'product_price' => 1000000, 'product_stock' => 10, ...],
    ]);

    User::factory()->create(['name' => 'Test User', 'email' => 'test@example.com']);
}
```

**Penjelasan run():**
- Insert manual data kategori (Sneakers, Boots) menggunakan `DB::table()->insert()`.
- Insert produk sample (Nike Air Force 1).
- Buat user test dengan factory.
- Menggunakan `Carbon::now()` untuk timestamps.
- Jalankan: `php artisan db:seed`.

---

## AuthController

File: `app/Http/Controllers/AuthController.php`

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function showLogin()
    {
          Cek jika sudah login, lempar ke index
        if (session()->has('user')) return redirect()->route('home');
        return view('login');
    }

    public function login(Request $request)
    {
        $valid_user = "admin";
        $valid_pass = "123";

        if ($request->username == $valid_user && $request->password == $valid_pass)
        {
              Set Session Laravel
            session(['user' => $request->username]);
            return redirect()->route('home');
        }

          Jika gagal, kembalikan ke login dengan pesan error
        return back()->with('error', 'Username atau Password salah!');
    }

    public function logout()
    {
        session()->forget('user');   Hapus session
        return redirect()->route('home');
    }
}
```

### Penjelasan Method:

1. **showLogin()**
   - Menampilkan halaman login
   - Jika user sudah login (session 'user' ada), langsung redirect ke home
   - Menggunakan `session()->has('user')` untuk cek session Laravel

2. **login(Request $request)**
   - Menerima data dari form login via parameter `$request`
   - Validasi credentials: username `admin`, password `123`
   - Jika berhasil: simpan ke session Laravel dengan `session(['user' => ...])`
   - Jika gagal: kembali ke halaman login dengan pesan error menggunakan `back()->with('error', ...)`

3. **logout()**
   - Menghapus session user dengan `session()->forget('user')`
   - Redirect ke halaman utama

**Cara Akses Session di Laravel:**
```php
  Set session
session(['key' => 'value']);

  Cek session ada atau tidak
session()->has('key');

  Ambil nilai session
session('key');

Hapus session
session()->forget('key');
```

---

## Halaman Index (index.blade.php)

File: `resources/views/index.blade.php`

### Bagian Penting:

**1. Navigasi dengan Status Login:**
```blade
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
```
- Menampilkan nama user dan tombol logout jika sudah login
- Menampilkan tombol login jika belum login

**2. Template Blade:**
- Menggunakan sintaks Blade (`@if`, `@else`, `{{ }}`)
- `{{ }}` untuk menampilkan output (escaped)
- `{{ asset('path') }}` untuk generate URL assets

### ⚠️ PENTING - Kesalahan yang Harus Dihindari:

**SALAH (PHP Native):**
```php
<?php
session_start();   JANGAN DIGUNAKAN DI LARAVEL
?>
```

**BENAR (Laravel):**
```blade
<!DOCTYPE html>
<!-- Laravel会自动处理session -->
```

Laravel sudah menangani session secara otomatis melalui middleware. Menggunakan `session_start()` native PHP akan menyebabkan konflik!

---

## Halaman Login (login.blade.php)

File: `resources/views/login.blade.php`

### Form Login:
```blade
<form method="POST" action="{{ route('login.proses') }}">
    @csrf
    <div class="mb-3">
        <label class="form-label">Username</label>
        <input type="text" name="username" class="form-control" required>
    </div>
    <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" name="password" class="form-control" required />
    </div>
    <button type="submit" class="btn btn-warning">Login</button>
</form>
```

### Penjelasan:

1. **@csrf**
   - Wajib ada untuk form POST di Laravel
   - Menggenerate CSRF token secara otomatis
   - Melindungi aplikasi dari serangan CSRF (Cross-Site Request Forgery)
   - Tanpa `@csrf`, form tidak akan bisa disubmit

2. **Method POST**
   - Data form dikirim secara tersembunyi
   - Lebih aman daripada GET untuk data sensitif

3. **name="username" dan name="password"**
   - Nama field ini harus sesuai dengan yang ditangkap di controller (`$request->username`, `$request->password`)

4. **route('login.proses')**
   - Mengambil URL dari route name 'login.proses'

### Menampilkan Pesan Error:
```blade
{{session('error')}}
```
- Menampilkan pesan error yang dikirim dari controller dengan `back()->with('error', ' pesan ')`

---

## Cara Login

1. Buka halaman `/login`
2. Masukkan username: `admin`
3. Masukkan password: `123`
4. Klik tombol Login

---

## Troubleshooting

### Jika login tidak berfungsi:
1. Pastikan tidak ada `session_start()` di file Blade
2. Pastikan form memiliki `@csrf`
3. Cek nama field input sesuai dengan yang di controller
4. Clear cache: `php artisan cache:clear`
5. Clear config: `php artisan config:clear`

---

## Lisensi

MIT License

