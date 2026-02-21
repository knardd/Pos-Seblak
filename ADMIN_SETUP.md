# Setup Admin Middleware dengan Breeze

## 📋 Ringkasan Perbaikan

Kode Anda sudah **diperbaiki** dengan poin-poin berikut:

### 1. ✅ AdminMiddleware (Logika Diperbaiki)

**File**: `app/Http/Middleware/AdminMiddleware.php`

**Perubahan**:

- Kondisi sebelumnya: `Auth::user()->role === 'admin'` ❌
- Kondisi sekarang: `Auth::user()->role !== 'admin'` ✅

**Penjelasan**: Middleware akan melanjutkan request hanya jika user sudah login DAN role-nya adalah 'admin'. Jika bukan, redirect ke '/cashier'.

---

### 2. ✅ Routes Admin (Duplikat Dihapus)

**File**: `routes/web.php`

**Perubahan**:

- Dihapus: Route `/admin` yang menampilkan Welcome page
- Dipertahankan: Route `/admin` dengan middleware `['auth', 'verified', 'role']`

**Middleware yang digunakan**:

```php
Route::get('/admin', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'role'])->name('dashboard');
```

---

### 3. ✅ User Model

**File**: `app/Models/User.php`

Field 'role' sudah ada di `$fillable`:

```php
protected $fillable = [
    'name',
    'email',
    'password',
    'role',  // ✅ Sudah ada
];
```

---

### 4. ✅ Database Structure

**File**: `database/migrations/0001_01_01_000000_create_users_table.php`

Field 'role' sudah ada:

```php
$table->string('role')->default('cashier');
```

---

## 🚀 Langkah Setup

### 1. Jalankan Migration (jika belum)

```bash
php artisan migrate
```

### 2. Buat User Admin

Gunakan Tinker atau seeding:

```bash
php artisan tinker
```

Kemudian di Tinker:

```php
App\Models\User::create([
    'name' => 'Admin User',
    'email' => 'admin@example.com',
    'password' => Hash::make('password123'),
    'role' => 'admin',  // ← PENTING: Set role ke 'admin'
]);
```

Atau gunakan Seeder:

**File**: `database/seeders/DatabaseSeeder.php`

```php
public function run(): void
{
    User::create([
        'name' => 'Admin User',
        'email' => 'admin@pos.test',
        'password' => Hash::make('password'),
        'role' => 'admin',
    ]);

    User::create([
        'name' => 'Cashier User',
        'email' => 'cashier@pos.test',
        'password' => Hash::make('password'),
        'role' => 'cashier',
    ]);
}
```

Jalankan seeder:

```bash
php artisan db:seed
```

---

## 🔐 Cara Kerja Flow

### User Login dengan Breeze

1. User masuk ke `/login` (dari auth.php)
2. Input email & password
3. Breeze validate dan create session

### Akses Admin Dashboard

1. Admin login → session dibuat
2. Akses `/admin` → middleware `'auth'` check (login?)
3. Middleware `'verified'` check (email verified?)
4. **Middleware `'role'`** check:
    - Jika `Auth::user()->role !== 'admin'` → redirect `/cashier` dengan error
    - Jika role adalah 'admin' → lanjut ke Dashboard

### Akses POS/Cashier

1. Kasir login → session dibuat
2. Akses `/cashier` → tidak ada middleware admin
3. Bisa akses lansung karena tidak ada proteksi

---

## 📝 Saran Tambahan

### 1. Buat Middleware untuk Cashier (Opsional)

Jika ingin membatasi akses POS hanya untuk cashier:

**File**: `app/Http/Middleware/CashierMiddleware.php`

```php
public function handle(Request $request, Closure $next): Response
{
    if (!Auth::check() || Auth::user()->role !== 'cashier') {
        return redirect('/admin')->with('error', 'Akses kasir saja.');
    }
    return $next($request);
}
```

Gunakan di route:

```php
Route::post('/cashier', [PosController::class, 'store'])
    ->middleware(['auth', 'cashier'])
    ->name('pos.store');
```

### 2. Tambah Helper untuk Check Role (Opsional)

Di `app/Models/User.php`:

```php
public function isAdmin(): bool
{
    return $this->role === 'admin';
}

public function isCashier(): bool
{
    return $this->role === 'cashier';
}
```

Gunakan di Blade:

```blade
@if(auth()->user()->isAdmin())
    <a href="/admin">Admin Dashboard</a>
@else
    <a href="/cashier">Kasir</a>
@endif
```

### 3. Protect Middleware di bootstrap/app.php

Sudah benar di file Anda:

```php
$middleware->web(append: [
    \App\Http\Middleware\HandleInertiaRequests::class,
    \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
    'role' => \App\Http\Middleware\AdminMiddleware::class,  // ✅
]);
```

---

## ✨ Kesimpulan

**Kode Anda sudah benar sekarang!** Tinggal:

1. Jalankan `php artisan migrate` (jika belum)
2. Buat user dengan role 'admin'
3. Test login dengan admin account
4. Akses `/admin` → harus berhasil
5. Akses `/admin` dengan user 'cashier' → harus redirect

Semua sudah siap! 🎉
