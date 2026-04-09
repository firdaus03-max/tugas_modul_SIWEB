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
- [Struktur Route (web.php)](#struktur-route-webphp)
- [AuthController](#authcontroller)
- [Halaman Index (index.blade.php)](#halaman-index-indexbladephp)
- [Halaman Login (login.blade.php)](#halaman-login-loginbladephp)

---

## Struktur Route (web.php)

File: `routes/web.php`

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

  Halaman Utama
Route::get('/', function () {
    return view('index');
})->name('home');

  Halaman Login
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');

  Proses Form Login & Logout
Route::post('/login', [AuthController::class, 'login'])->name('login.proses');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
```

### Penjelasan:
| Route | Method | Controller | Fungsi |
|-------|--------|------------|--------|
| `/` | GET | Closure | Menampilkan halaman utama (index) |
| `/login` | GET | AuthController@showLogin | Menampilkan form login |
| `/login` | POST | AuthController@login | Memproses data login |
| `/logout` | GET | AuthController@logout | Melakukan logout |

**Catatan Penting:**
- Laravel sudah menyediakan middleware session secara otomatis
- Tidak perlu menggunakan `session_start()` manual (PHP native)
- CSRF protection sudah aktif untuk route POST

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

