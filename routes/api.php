<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function (){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout',[Controllers\AuthController::class,'logout'])->name('logout');
    Route::resource('/survey',Controllers\SurveyController::class);
});
Route::post('/register',[Controllers\AuthController::class,'register'])->name('register');
Route::post('/login',[Controllers\AuthController::class,'login'])->name('login');
