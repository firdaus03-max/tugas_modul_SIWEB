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