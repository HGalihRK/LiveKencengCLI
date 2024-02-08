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
exports.getUserSig = exports.getRMTP = exports.checkUsername = exports.getUserDetail = exports.readCookiesFromFile = exports.getCookie = exports.changeXX = void 0;
var helper_1 = require("./helper");
var qr = require('qrcode-terminal');
var fs = require('fs');
var xx = "";
var key = "mau liat apa bos????";
function changeXX(x) {
    xx = x;
}
exports.changeXX = changeXX;
var apiURL = 'https://member.botkenceng.com';
var rtmp = [];
function generateQrCode() {
    return __awaiter(this, void 0, void 0, function () {
        var response, validQR, QrCodeId, data, statusResponse, statusData, currentStatus, qrcodeToken, postData, loginResponse, cookies, allCookies, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 16, , 18]);
                    return [4 /*yield*/, axios.get('https://shopee.co.id/api/v2/authentication/gen_qrcode')];
                case 1:
                    response = _a.sent();
                    validQR = false;
                    console.log('Loading QR Code...');
                    if (!(response.status === 200)) return [3 /*break*/, 14];
                    QrCodeId = response.data.data.qrcode_id;
                    data = "https://shopee.co.id/universal-link/qrcode-login?id=".concat(QrCodeId);
                    _a.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 13];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 10, , 12]);
                    return [4 /*yield*/, axios.get("https://shopee.co.id/api/v2/authentication/qrcode_status?qrcode_id=".concat(QrCodeId))];
                case 4:
                    statusResponse = _a.sent();
                    statusData = statusResponse.data.data;
                    currentStatus = statusResponse.data.data.status;
                    if (currentStatus === 'NEW' && !validQR) {
                        (0, helper_1.clearTerminal)();
                        console.log('Scan QR Code Menggunakan Aplikasi Shopee');
                        qr.generate(data, { small: true });
                        validQR = true;
                    }
                    if (!(currentStatus === 'CONFIRMED')) return [3 /*break*/, 6];
                    console.log('QR Code Dikonfirmasi');
                    qrcodeToken = statusData.qrcode_token;
                    postData = {
                        qrcode_token: qrcodeToken,
                        device_sz_fingerprint: 'OazXiPqlUgm158nr1h09yA==|0/eMoV7m/rlUHbgxsRgRC/n0vyOe6XzhDMa2PcnZPv3ecioRaJQg2W7ur5GfhoDDEeuMz2az7GGj/8Y=|Pu2hbrwoH+45rDNC|08|3',
                        client_identifier: {
                            security_device_fingerprint: 'OazXiPqlUgm158nr1h09yA==|0/eMoV7m/rlUHbgxsRgRC/n0vyOe6XzhDMa2PcnZPv3ecioRaJQg2W7ur5GfhoDDEeuMz2az7GGj/8Y=|Pu2hbrwoH+45rDNC|08|3',
                        },
                    };
                    return [4 /*yield*/, axios.post('https://shopee.co.id/api/v2/authentication/qrcode_login', postData)];
                case 5:
                    loginResponse = _a.sent();
                    if (loginResponse.headers['set-cookie']) {
                        cookies = loginResponse.headers['set-cookie'];
                        console.log();
                        allCookies = cookies.map(function (cookie) { return cookie.split(';')[0]; }).join('; ');
                        return [2 /*return*/, allCookies];
                    }
                    return [3 /*break*/, 13];
                case 6:
                    if (currentStatus === 'CANCELED') {
                        console.log('Proses Login Dibatalkan');
                        (0, helper_1.clearTerminal)();
                        return [2 /*return*/, 'cancelled'];
                    }
                    if (!(currentStatus === 'EXPIRED')) return [3 /*break*/, 8];
                    console.log('QR Code Kadaluarsa, Mereset QR Code...');
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                case 7:
                    _a.sent();
                    (0, helper_1.clearTerminal)();
                    return [2 /*return*/, 'expired'];
                case 8: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 10:
                    error_1 = _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                case 11:
                    _a.sent();
                    (0, helper_1.clearTerminal)();
                    return [2 /*return*/, 'error'];
                case 12: return [3 /*break*/, 2];
                case 13: return [3 /*break*/, 15];
                case 14:
                    console.error('Failed to get QR code data');
                    return [2 /*return*/, 'error'];
                case 15: return [3 /*break*/, 18];
                case 16:
                    error_2 = _a.sent();
                    console.error('Error fetching QR code:', error_2.message);
                    console.log('Server error. Internet tidak stabil.. Mencoba lagi dalam 3 detik...');
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 3000); })];
                case 17:
                    _a.sent();
                    return [2 /*return*/, 'error'];
                case 18: return [2 /*return*/, 'error'];
            }
        });
    });
}
function writeToCookieFile(content) {
    changeXX(content);
    //write to cookie.txt create if not exist
    fs.writeFile('cookie.txt', content, function (err) {
        if (err) {
            console.error(err);
            return false;
        }
    });
    return true;
}
function getCookie() {
    return __awaiter(this, void 0, void 0, function () {
        var cookies, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, generateQrCode()];
                case 1:
                    cookies = _a.sent();
                    if (cookies === 'cancelled') {
                        console.log('Login dibatalkan');
                        return [2 /*return*/, false];
                    }
                    if (cookies === 'expired') {
                        return [2 /*return*/, getCookie()];
                    }
                    if (cookies === 'error') {
                        return [2 /*return*/, getCookie()];
                    }
                    if (writeToCookieFile(cookies)) {
                        console.log('Cookies berhasil disimpan');
                        return [2 /*return*/, true];
                    }
                    else {
                        console.log('Cookies gagal disimpan');
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error menyimpan cookies:', error_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCookie = getCookie;
function readCookiesFromFile(filePath) {
    if (filePath === void 0) { filePath = 'cookie.txt'; }
    return xx;
}
exports.readCookiesFromFile = readCookiesFromFile;
function getData(key, cookies, ss) {
    if (key === void 0) { key = null; }
    if (ss === void 0) { ss = null; }
    return __awaiter(this, void 0, void 0, function () {
        var formdata, response, responseData, sessionStatus, sessionMessage, sessionData, basicInfo, detailInfo, sessionInfo, sessionId, deviceId, sellerId, timestamp, usernameId, chatroomId, usersig, shareurl, title, live, timestampInSeconds, tanggalMulai, jamMulai, statusLive, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 6]);
                    formdata = new FormData();
                    formdata.append("cookie", cookies);
                    return [4 /*yield*/, axios.post("".concat(apiURL, "/shopee/getBasicInfo"), formdata)];
                case 1:
                    response = _a.sent();
                    responseData = response.data;
                    sessionStatus = responseData.status;
                    sessionMessage = responseData.message;
                    if (!(sessionStatus !== 'success' || responseData == null)) return [3 /*break*/, 3];
                    console.log(sessionMessage);
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10000); })];
                case 2:
                    _a.sent();
                    process.exit(1);
                    _a.label = 3;
                case 3:
                    sessionData = responseData.data;
                    basicInfo = sessionData.basic_info;
                    detailInfo = sessionData.detail_info.data;
                    if (sessionData.session_info == null) {
                        console.log('User Belum Live! Start Live di Shopee terlebih dahulu!');
                        return [2 /*return*/, null];
                    }
                    sessionInfo = sessionData.session_info.data.data.session;
                    rtmp = sessionData.rtmp;
                    if (basicInfo && detailInfo) {
                        sessionId = sessionInfo.session_id || '-';
                        deviceId = sessionInfo.device_id || '-';
                        sellerId = sessionInfo.uid || '-';
                        timestamp = sessionInfo.start_time || 0;
                        usernameId = sessionInfo.username || '-';
                        chatroomId = sessionInfo.chatroom_id || '-';
                        usersig = sessionInfo.usersig || '-';
                        shareurl = sessionInfo.share_url || '-';
                        title = sessionInfo.title || '-';
                        live = sessionInfo.status || '-';
                        timestampInSeconds = timestamp / 1000;
                        tanggalMulai = new Date(timestampInSeconds).toLocaleString('en-US', { day: 'numeric', month: 'short' });
                        jamMulai = new Date(timestampInSeconds).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                        statusLive = (live == "1") ? "RUNNING" : "STOP";
                        return [2 /*return*/, {
                                sessionId: sessionId,
                                deviceId: deviceId,
                                chatroomId: chatroomId,
                                usersig: usersig,
                                shareurl: shareurl,
                                title: title,
                                live: live,
                                timestampInSeconds: timestampInSeconds,
                                tanggalMulai: tanggalMulai,
                                jamMulai: jamMulai,
                                statusLive: statusLive,
                                usernameId: usernameId,
                                sellerId: sellerId
                            }];
                    }
                    else {
                        console.log(response.data);
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_4 = _a.sent();
                    console.error(error_4.message);
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10000); })];
                case 5:
                    _a.sent();
                    process.exit(1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getUserDetail(ss) {
    if (ss === void 0) { ss = null; }
    return __awaiter(this, void 0, void 0, function () {
        var cookies, _a, sessionId, deviceId, chatroomId, usersig, shareurl, title, live, timestampInSeconds, tanggalMulai, jamMulai, statusLive, usernameId, sellerId, session_id, device_id, username, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cookies = readCookiesFromFile('cookie.txt');
                    if (!cookies) {
                        return [2 /*return*/, {
                                status: 'auth_error',
                                username: undefined,
                                session_id: undefined,
                                cookies: undefined,
                                device_id: undefined,
                                user_sig: undefined,
                                chatroomId: undefined,
                            }];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getData(key, readCookiesFromFile('cookie.txt'), ss)];
                case 2:
                    _a = _b.sent(), sessionId = _a.sessionId, deviceId = _a.deviceId, chatroomId = _a.chatroomId, usersig = _a.usersig, shareurl = _a.shareurl, title = _a.title, live = _a.live, timestampInSeconds = _a.timestampInSeconds, tanggalMulai = _a.tanggalMulai, jamMulai = _a.jamMulai, statusLive = _a.statusLive, usernameId = _a.usernameId, sellerId = _a.sellerId;
                    if (!sessionId) {
                        return [2 /*return*/, {
                                status: false,
                                response: "auth_error",
                                session_id: undefined,
                                cookies: undefined,
                                device_id: undefined,
                                user_sig: undefined,
                                chatroomId: undefined,
                            }];
                    }
                    session_id = sessionId;
                    device_id = deviceId;
                    username = usernameId;
                    return [2 /*return*/, {
                            status: 'success',
                            username: username,
                            session_id: session_id,
                            cookies: cookies,
                            device_id: device_id,
                            usersig: usersig,
                            chatroomId: chatroomId
                        }];
                case 3:
                    error_5 = _b.sent();
                    return [2 /*return*/, {
                            status: 'code_error',
                            username: undefined,
                            session_id: undefined,
                            cookies: undefined,
                            device_id: undefined,
                            user_sig: undefined,
                            chatroomId: undefined,
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getUserDetail = getUserDetail;
function checkUsername(usrname) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://livekenceng.xyz/check_username?username=".concat(usrname))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.exists) {
                        // Username exists
                        return [2 /*return*/, true];
                    }
                    else {
                        // Username does not exist
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    return [2 /*return*/, 'error']; // Handle errors gracefully
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.checkUsername = checkUsername;
var axios = require('axios');
function getRMTP(cookies, ss) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, rtmp];
        });
    });
}
exports.getRMTP = getRMTP;
// Call the function
function getUserSig(cookies, session_id, device_id) {
    return __awaiter(this, void 0, void 0, function () {
        var sigUrl, response, sigData, usersig, pushUrl, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    sigUrl = "https://live.shopee.co.id/webapi/v1/session/".concat(session_id, "/preview?uuid=").concat(device_id, "&ver=2");
                    return [4 /*yield*/, axios.get(sigUrl, {
                            headers: {
                                'Cookie': cookies,
                                'referer': "https://live.shopee.co.id/pc/preview?session=".concat(session_id),
                            }
                        })];
                case 1:
                    response = _a.sent();
                    sigData = response.data;
                    if (sigData && sigData.err_code === 0 && sigData.data && sigData.data.usersig) {
                        console.log(sigData.data);
                        usersig = sigData.data.usersig;
                        pushUrl = sigData.data.push_url;
                        return [2 /*return*/, { usersig: usersig, pushUrl: pushUrl }];
                    }
                    else {
                        console.error("Error:", sigData.err_msg || "Invalid response format");
                        if (sigData.err_code === 1005) {
                            //delete content inside cookie.txt
                            changeXX("");
                        }
                        return [2 /*return*/, { usersig: null, pushUrl: null }];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.error("Error:", error_7.message || error_7);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserSig = getUserSig;
module.exports = { getCookie: getCookie, getRandomCookie: helper_1.getRandomCookie, checkUsername: checkUsername, getUserDetail: getUserDetail, getUserSig: getUserSig, getRMTP: getRMTP, changeXX: changeXX, readCookiesFromFile: readCookiesFromFile };
