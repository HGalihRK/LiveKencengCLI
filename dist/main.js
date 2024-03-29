"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var botController_1 = require("./botController");
var cookieController_1 = require("./cookieController");
var helper_1 = require("./helper");
var chalk = require('chalk');
var yellow = chalk.hex('#FFBF00');
var red = chalk.bold.red;
var green = chalk.bold.green;
var blue = chalk.bold.blue;
var appVer = "version3";
function checkUpdate() {
    return __awaiter(this, void 0, void 0, function () {
        var fs, path, x, x;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fs = require('fs');
                    path = require('path');
                    return [4 /*yield*/, (0, cookieController_1.checkUsername)(appVer)];
                case 1:
                    x = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(x == 'error')) return [3 /*break*/, 5];
                    console.log(red('Tidak dapat terhubung ke server...'));
                    return [4 /*yield*/, (0, cookieController_1.checkUsername)(appVer)];
                case 3:
                    x = _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 5:
                    if (!!x) return [3 /*break*/, 7];
                    console.log(red('Versi baru terdeteksi!'));
                    return [4 /*yield*/, downloadAndDelete()];
                case 6:
                    _a.sent();
                    process.exit(1);
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
var axios = require('axios');
var fs = require('fs');
var path = require('path');
function downloadAndDelete() {
    return __awaiter(this, void 0, void 0, function () {
        var downloadUrl, retryCount, maxRetries, fileStream, response, date, formattedDate, fileName, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    downloadUrl = 'https://livekenceng.xyz/download_exe';
                    retryCount = 0;
                    maxRetries = 3;
                    _a.label = 1;
                case 1:
                    if (!(retryCount < maxRetries)) return [3 /*break*/, 15];
                    retryCount++;
                    // Tampilkan pesan sedang mengunduh
                    console.log(chalk.green('Sedang mengunduh... Mohon tunggu.'));
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, 13, 14]);
                    return [4 /*yield*/, axios({
                            method: 'get',
                            url: downloadUrl,
                            responseType: 'stream',
                        })];
                case 3:
                    response = _a.sent();
                    date = new Date();
                    formattedDate = date.getDate() + "_" + date.toLocaleString('default', { month: 'short' }).toUpperCase() + "_" + date.getFullYear();
                    fileName = 'LiveKencengCLI_' + formattedDate + '.exe';
                    fileStream = fs.createWriteStream(fileName);
                    // Alirkan data respons ke stream file
                    response.data.pipe(fileStream);
                    // Tunggu hingga stream file selesai menulis
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            fileStream.on('finish', resolve);
                            fileStream.on('error', reject); // Tangani kesalahan saat menulis file
                        })];
                case 4:
                    // Tunggu hingga stream file selesai menulis
                    _a.sent();
                    console.log(chalk.green('Unduhan selesai.'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 3000); })];
                case 5:
                    _a.sent();
                    return [2 /*return*/]; // Keluar dari fungsi jika pengunduhan berhasil
                case 6:
                    error_1 = _a.sent();
                    if (!(axios.isAxiosError(error_1) && !error_1.response)) return [3 /*break*/, 8];
                    console.error('Koneksi internet terputus. Menunggu 10 detik sebelum mencoba lagi...');
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10000); })];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 8:
                    console.error('Kesalahan saat mengunduh:', error_1.message);
                    console.log(chalk.red("Tunjukkan pesan ini kepada admin"));
                    if (!(retryCount < maxRetries)) return [3 /*break*/, 10];
                    console.log("Mencoba lagi untuk ke-".concat(retryCount, " dalam 10 detik..."));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10000); })];
                case 9:
                    _a.sent(); // Tunggu sebelum mencoba lagi
                    return [3 /*break*/, 12];
                case 10:
                    console.error('Mencoba sebanyak 3 kali, tidak dapat melanjutkan...');
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    // Bersihkan: Tutup stream file jika masih terbuka
                    if (fileStream) {
                        fileStream.end(); // Pastikan stream ditutup
                    }
                    return [7 /*endfinally*/];
                case 14: return [3 /*break*/, 1];
                case 15: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var botVoucherController, botPinController, botChatHostController, botBomLike, botBomCommentController, botShare, botBomKeranjang, botAutoLelang, botAutoBanned, fs, userDetail, userSig, menu, voucherLog, asnwer, delay, pinLog, asnwer, delay, chatLog, asnwer, delay, comment, comment, pinComment, x, index, fixedIndex, randomURL, regex, _a, RTMP, KEY, bomLikeLog, asnwer, delay, bomShareLog, asnwer, delay, bomCommentLog, asnwer, delay, comment, lelangLog, asnwer, delay, title, price, bannedLog, asnwer, keywords, array_keywords, bomKeranjangLog, asnwer, delay, asnwer, fs_1, filePath, asnwer;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, checkUpdate()];
                case 1:
                    _b.sent();
                    botVoucherController = new botController_1.BotVoucherController();
                    botPinController = new botController_1.BotPinController();
                    botChatHostController = new botController_1.BotCommentHostController();
                    botBomLike = new botController_1.BotBomLike();
                    botBomCommentController = new botController_1.BotBomCommentController();
                    botShare = new botController_1.BotBomShare();
                    botBomKeranjang = new botController_1.BotBomKeranjangController();
                    botAutoLelang = new botController_1.BotLelangController();
                    botAutoBanned = new botController_1.AutoBannedController();
                    console.log(yellow('SHOPEE BOT LIVE KENCENG'));
                    console.log(yellow('Telegram: t.me/livekenceng'));
                    console.log(yellow('Whatsapp: 0881082331658'));
                    console.log(yellow('===================================='));
                    fs = require('fs');
                    _b.label = 2;
                case 2:
                    if (!((0, cookieController_1.readCookiesFromFile)() == null || (0, cookieController_1.readCookiesFromFile)() == undefined || (0, cookieController_1.readCookiesFromFile)() == '')) return [3 /*break*/, 4];
                    console.log(red('Cookie tidak terdeteksi!'));
                    return [4 /*yield*/, (0, cookieController_1.getCookie)()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 2];
                case 4: return [4 /*yield*/, (0, cookieController_1.getUserDetail)()];
                case 5:
                    userDetail = _b.sent();
                    userSig = userDetail.usersig;
                    if (!(userDetail.status == 'license_error')) return [3 /*break*/, 7];
                    console.log(red('Username: ' + userDetail.username));
                    console.log(red('Lisensi tidak valid, silahkan hubungi admin'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
                case 6:
                    _b.sent();
                    return [2 /*return*/, process.exit(1)];
                case 7:
                    if (!userSig || userSig == null) {
                        userSig = 'Error';
                    }
                    _b.label = 8;
                case 8:
                    if (!true) return [3 /*break*/, 178];
                    (0, helper_1.clearTerminal)();
                    console.log(yellow('SHOPEE BOT LIVE KENCENG'));
                    console.log(yellow('Telegram: https://t.me/livekenceng'));
                    console.log(yellow('Whatsapp: +62881082331658'));
                    console.log(red('===================================='));
                    _b.label = 9;
                case 9:
                    if (!(userDetail.username == undefined)) return [3 /*break*/, 12];
                    console.log(red('Pengguna belum memulai live...'));
                    console.log(red('Silahkan mulai live terlebih dahulu di aplikasi Shopee...'));
                    return [4 /*yield*/, (0, helper_1.askQuestion)(red("Tekan enter untuk mencoba lagi..."))];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, (0, cookieController_1.getUserDetail)()];
                case 11:
                    userDetail = _b.sent();
                    (0, helper_1.clearTerminal)();
                    return [3 /*break*/, 9];
                case 12:
                    console.log(green('Username: ' + userDetail.username));
                    console.log(green('Session ID: ' + userDetail.session_id));
                    console.log(green('Device ID: ' + userDetail.device_id));
                    if (userSig == 'Error') {
                        console.log(red('User Signature: ' + userSig));
                    }
                    else {
                        console.log(green('User Signature: ' + userSig));
                    }
                    console.log(green('Link Share Live: ' + "https://live.shopee.co.id/share?from=live&session=".concat(userDetail.session_id, "&in=1")));
                    console.log(green('Link Dashboard: ' + "https://creator.shopee.co.id/dashboard/live/".concat(userDetail.session_id)));
                    console.log(red('===================================='));
                    //debug
                    //userDetail.session_id = "58347575";
                    //debug
                    console.log("[1] ".concat(botVoucherController.possibleAction, " Auto Voucher") + red('(Maintenance)'));
                    console.log("[2] ".concat(botPinController.possibleAction, " Auto Pin Produk"));
                    console.log("[3] ".concat(botChatHostController.possibleAction, " Auto Chat Host ") + red('(Maintenance)'));
                    console.log("[4] Pin Chat Host " + red('(Maintenance)'));
                    console.log("[5] Lihat RTMP dan KEY Anti Banned");
                    console.log("[6] ".concat(botBomLike.possibleAction, " Bot Bom Like"));
                    console.log("[7] ".concat(botShare.possibleAction, " Bot Bom Share"));
                    console.log("[8] ".concat(botBomCommentController.possibleAction, " Bot Komentar Orang Lain"));
                    console.log("[9] ".concat(botAutoLelang.possibleAction, " Bot Auto Lelang"));
                    console.log("[10] ".concat(botAutoBanned.possibleAction, " Bot Banned + Blokir Komentar"));
                    console.log("[11] ".concat(botBomKeranjang.possibleAction, " Bot Bom Keranjang"));
                    console.log("[12] Keluar & Logout");
                    console.log("[13] Perbarui Device ID");
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Pilih Menu: ")];
                case 13:
                    menu = _b.sent();
                    (0, helper_1.clearTerminal)();
                    if (!(menu == '1')) return [3 /*break*/, 26];
                    console.log(blue('Auto Voucher'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    console.log(red('Fitur ini sedang maintenance...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 14:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 15:
                    asnwer = _b.sent();
                    if (!(asnwer == 'y')) return [3 /*break*/, 17];
                    botVoucherController.stopVoucherBot();
                    console.log(red('Bot voucher dimatikan'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 16:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 17:
                    console.log(red('Dibatalkan. Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 18:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 19:
                    console.log(yellow('Contoh delay: 10. Maka setiap voucher jeda (30 + 10) = 40 detik'));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan delay (detik): ")];
                case 20:
                    delay = _b.sent();
                    if (!(delay == '0')) return [3 /*break*/, 22];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 21:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 22:
                    if (!isNaN(parseInt(delay))) return [3 /*break*/, 24];
                    console.log(red('Delay harus berupa angka!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 23:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 24:
                    console.log(green('Bot Voucher dimulai...'));
                    botVoucherController.startVoucherBot(userDetail.cookies, userDetail.session_id, userDetail.device_id, parseInt(delay));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 25:
                    _b.sent();
                    return [3 /*break*/, 177];
                case 26:
                    if (!(menu == '2')) return [3 /*break*/, 38];
                    console.log(blue('Auto Pin Produk'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    if (!botPinController.isBotRunning) return [3 /*break*/, 31];
                    pinLog = botPinController.getLog(5);
                    console.log(green('Log:'));
                    pinLog.forEach(function (log) {
                        console.log(green(log));
                    });
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Yakin ingin mematikan bot pin produk? (y/n): ")];
                case 27:
                    asnwer = _b.sent();
                    if (!(asnwer == 'y')) return [3 /*break*/, 29];
                    botPinController.stopPinBot();
                    console.log(red('Bot Pin Produk dimatikan'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 28:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 29:
                    console.log(red('Dibatalkan. Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 30:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 31:
                    console.log(yellow('Contoh delay: 10. Maka setiap 10 detik akan pin produk'));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan delay (detik): ")];
                case 32:
                    delay = _b.sent();
                    if (!(delay == '0')) return [3 /*break*/, 34];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 33:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 34:
                    if (!isNaN(parseInt(delay))) return [3 /*break*/, 36];
                    console.log(red('Delay harus berupa angka!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 35:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 36:
                    botPinController.startPinBot(userDetail.cookies, userDetail.session_id, userDetail.device_id, parseInt(delay));
                    console.log(green('Bot Pin Produk dimulai...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 37:
                    _b.sent();
                    return [3 /*break*/, 177];
                case 38:
                    if (!(menu == '3')) return [3 /*break*/, 53];
                    console.log(blue('Auto Chat Host'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    console.log(red('Fitur ini sedang maintenance...'));
                    if (!botChatHostController.isBotRunning) return [3 /*break*/, 43];
                    chatLog = botChatHostController.getLog(5);
                    console.log(green('Log:'));
                    chatLog.forEach(function (log) {
                        console.log(green(log));
                    });
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Yakin ingin mematikan bot chat host? (y/n): ")];
                case 39:
                    asnwer = _b.sent();
                    if (!(asnwer == 'y')) return [3 /*break*/, 41];
                    botChatHostController.stopCommentHostBot();
                    console.log(red('Bot Chat Host dimatikan'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 40:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 41:
                    console.log(red('Dibatalkan. Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 42:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 43:
                    console.log(yellow('Contoh delay: 10. Maka setiap 10 detik akan chat host'));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan delay (detik): ")];
                case 44:
                    delay = _b.sent();
                    if (!(delay == '0')) return [3 /*break*/, 46];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 45:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 46:
                    if (!isNaN(parseInt(delay))) return [3 /*break*/, 48];
                    console.log(red('Delay harus berupa angka!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 47:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 48: return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan komentar (pisahkan dengan ';'): ")];
                case 49:
                    comment = _b.sent();
                    if (!(comment == '0')) return [3 /*break*/, 51];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 50:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 51:
                    botChatHostController.startCommentHostBot((0, cookieController_1.readCookiesFromFile)(), userDetail.session_id, userDetail.device_id, userSig, userDetail.device_id, comment, parseInt(delay));
                    console.log(green('Bot Chat Host dimulai...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 52:
                    _b.sent();
                    return [3 /*break*/, 177];
                case 53:
                    if (!(menu == '4')) return [3 /*break*/, 67];
                    console.log(blue('Pin Komentar'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    if (!(userSig == 'Error')) return [3 /*break*/, 55];
                    console.log(red('User Signature tidak ditemukan, fitur ini tidak dapat digunakan...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 54:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 55:
                    if (!(userDetail.device_id == "")) return [3 /*break*/, 57];
                    console.log(red('Device ID tidak ditemukan, fitur ini tidak dapat digunakan...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 56:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 57: return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan komentar: ")];
                case 58:
                    comment = _b.sent();
                    if (!(comment == '0')) return [3 /*break*/, 60];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 59:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 60:
                    console.log(green('Pin Komentar dimulai...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 61:
                    _b.sent();
                    return [4 /*yield*/, botChatHostController.makeComment(comment, userDetail.session_id, (0, cookieController_1.readCookiesFromFile)(), userDetail.device_id, userSig, true)];
                case 62:
                    pinComment = _b.sent();
                    if (!pinComment) return [3 /*break*/, 64];
                    console.log(green('Komentar berhasil di pin!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 63:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 64:
                    console.log(red('Komentar gagal di pin!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 65:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 66: return [3 /*break*/, 177];
                case 67:
                    if (!(menu == '5')) return [3 /*break*/, 82];
                    console.log(blue('RTMP dan KEY Anti Banned'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    return [4 /*yield*/, (0, helper_1.askQuestion)(red("TEKAN ENTER JIKA SUDAH LIVE!!!"))];
                case 68:
                    _b.sent();
                    return [4 /*yield*/, (0, cookieController_1.getUserDetail)()];
                case 69:
                    userDetail = _b.sent();
                    userSig = userDetail.usersig;
                    console.log(green('Session ID berhasil diperbarui!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 70:
                    _b.sent();
                    return [4 /*yield*/, (0, cookieController_1.getRMTP)(userDetail.cookies, userDetail.session_id)];
                case 71:
                    x = _b.sent();
                    if (!x) {
                        console.log(red('RTMP dan KEY tidak ditemukan, silahkan coba lagi...'));
                    }
                    if (!(x.length == 0)) return [3 /*break*/, 73];
                    console.log(red('RTMP dan KEY tidak ditemukan, silahkan coba lagi...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 72:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 73:
                    console.log(green('RTMP dan KEY. Tersedia: ' + x.length + ' RTMP'));
                    x.forEach(function (url, index) {
                        console.log(('[' + (index + 1) + '] ' + "RTMP Ke " + (index + 1)));
                    });
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Pilih : ")];
                case 74:
                    index = _b.sent();
                    if (!(index == '0')) return [3 /*break*/, 76];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 75:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 76:
                    if (!isNaN(parseInt(index))) return [3 /*break*/, 78];
                    console.log(red('Pilihan harus berupa angka!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 77:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 78:
                    if (!(parseInt(index) > x.length)) return [3 /*break*/, 80];
                    console.log(red('Pilihan tidak ditemukan!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 79:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 80:
                    fixedIndex = parseInt(index) - 1;
                    randomURL = x[fixedIndex];
                    regex = /(rtmp:\/\/[^\/]+\/[^\/]+\/)(.*)/;
                    _a = randomURL.match(regex), RTMP = _a[1], KEY = _a[2];
                    console.log(green('RTMP URL: ' + RTMP));
                    console.log(green('KEY: ' + KEY));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Tekan enter untuk kembali ke menu utama")];
                case 81:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 82:
                    if (!(menu == '6')) return [3 /*break*/, 94];
                    console.log(blue('Bom Like'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    if (!botBomLike.isBotRunning) return [3 /*break*/, 87];
                    bomLikeLog = botBomLike.getLog(5);
                    console.log(green('Log:'));
                    bomLikeLog.forEach(function (log) {
                        console.log(green(log));
                    });
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Yakin ingin mematikan bot bom like? (y/n): ")];
                case 83:
                    asnwer = _b.sent();
                    if (!(asnwer == 'y')) return [3 /*break*/, 85];
                    botBomLike.stopLikeBot();
                    console.log(red('Bot bom like dimatikan'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 84:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 85:
                    console.log(red('Dibatalkan. Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 86:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 87:
                    console.log(yellow('Contoh delay: 10. Maka setiap 10 detik akan bom like'));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan delay (detik): ")];
                case 88:
                    delay = _b.sent();
                    if (!(delay == '0')) return [3 /*break*/, 90];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 89:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 90:
                    if (!isNaN(parseInt(delay))) return [3 /*break*/, 92];
                    console.log(red('Delay harus berupa angka!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 91:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 92:
                    botBomLike.startLikeBot(userDetail.cookies, userDetail.session_id, userDetail.device_id, parseInt(delay));
                    console.log(green('Bot bom like dimulai...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 93:
                    _b.sent();
                    return [3 /*break*/, 177];
                case 94:
                    if (!(menu == '7')) return [3 /*break*/, 106];
                    console.log(blue('Bom Share'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    if (!botShare.isBotRunning) return [3 /*break*/, 99];
                    bomShareLog = botShare.getLog(5);
                    console.log(green('Log:'));
                    bomShareLog.forEach(function (log) {
                        console.log(green(log));
                    });
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Yakin ingin mematikan bot bom share? (y/n): ")];
                case 95:
                    asnwer = _b.sent();
                    if (!(asnwer == 'y')) return [3 /*break*/, 97];
                    botShare.stopShareBot();
                    console.log(red('Bot bom share dimatikan'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 96:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 97:
                    console.log(red('Dibatalkan. Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 98:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 99:
                    console.log(yellow('Contoh delay: 10. Maka setiap 10 detik akan 1 share'));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan delay (detik): ")];
                case 100:
                    delay = _b.sent();
                    if (!(delay == '0')) return [3 /*break*/, 102];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 101:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 102:
                    if (!isNaN(parseInt(delay))) return [3 /*break*/, 104];
                    console.log(red('Delay harus berupa angka!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 103:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 104:
                    botShare.startShareBot(userDetail.session_id, parseInt(delay));
                    console.log(green('Bot bom share dimulai...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 105:
                    _b.sent();
                    return [3 /*break*/, 177];
                case 106:
                    if (!(menu == '8')) return [3 /*break*/, 123];
                    console.log(blue('Bom Komentar Orang Lain'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    if (!botBomCommentController.isBotRunning) return [3 /*break*/, 111];
                    bomCommentLog = botBomCommentController.getLog(5);
                    console.log(green('Log:'));
                    bomCommentLog.forEach(function (log) {
                        console.log(green(log));
                    });
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Yakin ingin mematikan bot bom komentar orang lain? (y/n): ")];
                case 107:
                    asnwer = _b.sent();
                    if (!(asnwer == 'y')) return [3 /*break*/, 109];
                    botBomCommentController.stopCommentBot();
                    console.log(red('Bot bom komentar orang lain dimatikan'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 108:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 109:
                    console.log(red('Dibatalkan. Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 110:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 111:
                    console.log(yellow('Contoh delay: 10. Maka setiap 10 detik akan 1 komentar'));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan delay (detik): ")];
                case 112:
                    delay = _b.sent();
                    if (!(delay == '0')) return [3 /*break*/, 114];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 113:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 114:
                    if (!isNaN(parseInt(delay))) return [3 /*break*/, 116];
                    console.log(red('Delay harus berupa angka!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 115:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 116:
                    console.log(yellow('Komentar dapat dipisahkan dengan tanda ";"'));
                    console.log(yellow('Contoh komentar: "Mantap gan! Semangat terus!; Sudah checkout kakakkk"'));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan komentar: ")];
                case 117:
                    comment = _b.sent();
                    if (!(comment == '0')) return [3 /*break*/, 119];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 118:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 119:
                    if (!(comment == '')) return [3 /*break*/, 121];
                    console.log(red('Komentar tidak boleh kosong!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 120:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 121:
                    botBomCommentController.startCommentBot(userDetail.session_id, comment, parseInt(delay));
                    console.log(green('Bot bom komentar orang lain dimulai...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 122:
                    _b.sent();
                    return [3 /*break*/, 177];
                case 123:
                    if (!(menu == '9')) return [3 /*break*/, 141];
                    console.log(blue('Bot Auto Lelang'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    if (!botAutoLelang.isBotRunning) return [3 /*break*/, 128];
                    lelangLog = botAutoLelang.getLog(5);
                    console.log(green('Log:'));
                    lelangLog.forEach(function (log) {
                        console.log(green(log));
                    });
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Yakin ingin mematikan bot auto lelang? (y/n): ")];
                case 124:
                    asnwer = _b.sent();
                    if (!(asnwer == 'y')) return [3 /*break*/, 126];
                    botAutoLelang.stopLelangBot();
                    console.log(red('Bot auto lelang dimatikan'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 125:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 126:
                    console.log(red('Dibatalkan. Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 127:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 128:
                    console.log(yellow('Contoh delay: 10. Maka selisih 10 detik setelah lelang terakhir akan lelang'));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan delay (detik): ")];
                case 129:
                    delay = _b.sent();
                    if (!(delay == '0')) return [3 /*break*/, 131];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 130:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 131:
                    if (!isNaN(parseInt(delay))) return [3 /*break*/, 133];
                    console.log(red('Delay harus berupa angka!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 132:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 133: return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan judul lelang: ")];
                case 134:
                    title = _b.sent();
                    if (!(title == '0')) return [3 /*break*/, 136];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 135:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 136: return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan harga lelang: ")];
                case 137:
                    price = _b.sent();
                    if (!(price == '0')) return [3 /*break*/, 139];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 138:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 139:
                    botAutoLelang.startLelangBot((0, cookieController_1.readCookiesFromFile)(), userDetail.session_id, userDetail.device_id, title, price, 120, parseInt(delay));
                    console.log(green('Bot auto lelang dimulai...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 140:
                    _b.sent();
                    return [3 /*break*/, 177];
                case 141:
                    if (!(menu == '10')) return [3 /*break*/, 153];
                    console.log(blue('Ban Komentar'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    if (!botAutoBanned.isBotRunning) return [3 /*break*/, 146];
                    bannedLog = botAutoBanned.getLog(5);
                    console.log(green('Log:'));
                    bannedLog.forEach(function (log) {
                        console.log(green(log));
                    });
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Yakin ingin mematikan bot banned? (y/n): ")];
                case 142:
                    asnwer = _b.sent();
                    if (!(asnwer == 'y')) return [3 /*break*/, 144];
                    botAutoBanned.stopAutoBannedBot();
                    console.log(red('Bot banned dimatikan'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 143:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 144:
                    console.log(red('Dibatalkan. Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 145:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 146:
                    console.log(yellow('Contoh keyword: nipu;rekaman;report;parah;jelek'));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Keyword banned (pisahkan dengan ;): ")];
                case 147:
                    keywords = _b.sent();
                    if (!(keywords == '0')) return [3 /*break*/, 149];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 148:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 149:
                    if (!(keywords == '')) return [3 /*break*/, 151];
                    console.log(red('Keyword tidak boleh kosong!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 150:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 151:
                    array_keywords = keywords.split(';');
                    console.log(green('Bot banned dimulai...'));
                    botAutoBanned.startAutoBannedBot(userDetail.session_id, userDetail.chatroomId, array_keywords);
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 152:
                    _b.sent();
                    return [3 /*break*/, 177];
                case 153:
                    if (!(menu == '11')) return [3 /*break*/, 164];
                    console.log(blue('Bom Keranjang'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    if (!botBomKeranjang.isBotRunning) return [3 /*break*/, 158];
                    bomKeranjangLog = botBomKeranjang.getLog(5);
                    console.log(green('Log:'));
                    bomKeranjangLog.forEach(function (log) {
                        console.log(green(log));
                    });
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Yakin ingin mematikan bot bom keranjang? (y/n): ")];
                case 154:
                    asnwer = _b.sent();
                    if (!(asnwer == 'y')) return [3 /*break*/, 156];
                    botBomKeranjang.stopBomKeranjangBot();
                    console.log(red('Bot bom keranjang dimatikan'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 155:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 156:
                    console.log(red('Dibatalkan. Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 157:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 158:
                    console.log(yellow('Contoh delay: 10. Maka setiap 10 detik akan muncul 1 keranjang'));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Masukkan delay (detik): ")];
                case 159:
                    delay = _b.sent();
                    if (!(delay == '0')) return [3 /*break*/, 161];
                    console.log(red('Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 160:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 161:
                    if (!isNaN(parseInt(delay))) return [3 /*break*/, 163];
                    console.log(red('Delay harus berupa angka!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 162:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 163:
                    botBomKeranjang.startBomKeranjangBot(userDetail.session_id, parseInt(delay));
                    return [3 /*break*/, 177];
                case 164:
                    if (!(menu == '12')) return [3 /*break*/, 169];
                    console.log(red('Keluar & Logout'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Yakin ingin keluar? (y/n): ")];
                case 165:
                    asnwer = _b.sent();
                    if (!(asnwer == 'y')) return [3 /*break*/, 167];
                    console.log(green('Logout...'));
                    fs_1 = require('fs');
                    filePath = 'cookie.txt';
                    try {
                        fs_1.writeFileSync(filePath, '');
                    }
                    catch (err) {
                        console.log(err);
                    }
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 166:
                    _b.sent();
                    process.exit(1);
                    _b.label = 167;
                case 167:
                    console.log(red('Dibatalkan. Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 168:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 169:
                    if (!(menu == '13')) return [3 /*break*/, 175];
                    console.log(red('Perbarui Device ID'));
                    console.log(red('===================================='));
                    console.log("[0] Kembali ke menu utama");
                    console.log(red('===================================='));
                    return [4 /*yield*/, (0, helper_1.askQuestion)("Yakin ingin memperbarui Device ID? (y/n): ")];
                case 170:
                    asnwer = _b.sent();
                    if (!(asnwer == 'y')) return [3 /*break*/, 173];
                    return [4 /*yield*/, (0, cookieController_1.getUserDetail)()];
                case 171:
                    userDetail = _b.sent();
                    userSig = userDetail.usersig;
                    console.log(green('Device ID berhasil diperbarui!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 172:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 173:
                    console.log(red('Dibatalkan. Pergi ke menu utama...'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 174:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 175:
                    console.log(red('Menu tidak ditemukan!'));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 176:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 177: return [3 /*break*/, 8];
                case 178: return [2 /*return*/];
            }
        });
    });
}
main();
