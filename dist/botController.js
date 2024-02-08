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
exports.BotBomLike = exports.BotBomShare = exports.BotBomCommentController = exports.BotLelangController = exports.BotCommentHostController = exports.BotBomKeranjangController = exports.BotPinController = exports.AutoBannedController = exports.BotVoucherController = void 0;
var cookieController_1 = require("./cookieController");
var helper_1 = require("./helper");
var axios = require('axios');
var BotVoucherController = /** @class */ (function () {
    function BotVoucherController() {
        this.log = [];
        this.voucher = [];
        this.botProcess = null;
        this.isBotRunning = false;
    }
    BotVoucherController.prototype.getRandomVoucher = function (session_id, cookie) {
        return __awaiter(this, void 0, void 0, function () {
            var axios, config, response, vouchers, randomVoucher, data, fs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        axios = require('axios');
                        config = {
                            method: 'get',
                            maxBodyLength: Infinity,
                            url: "https://live.shopee.co.id/api/v1/session/".concat(session_id, "/voucher?scene=0"),
                            headers: {
                                'cookie': cookie,
                            }
                        };
                        return [4 /*yield*/, axios(config)];
                    case 1:
                        response = _a.sent();
                        vouchers = response.data.data.shopee_vouchers;
                        randomVoucher = vouchers[Math.floor(Math.random() * vouchers.length)];
                        data = JSON.stringify({
                            "voucher": "{\"discount_cap\":\"".concat(randomVoucher.discount_cap, "\",\"coin_percentage_real\":").concat(randomVoucher.coin_percentage_real, ",\"reward_type\":").concat(randomVoucher.reward_type, ",\"min_spend\":\"").concat(randomVoucher.min_spend, "\",\"voucher_ui\":{\"customise_tag\":[],\"non_customise_tag\":[5]},\"stream_exclusive\":").concat(randomVoucher.stream_exclusive, ",\"has_use_rule\":").concat(randomVoucher.has_use_rule, ",\"promotion_id\":").concat(randomVoucher.promotion_id, ",\"shop_id\":").concat(randomVoucher.shop_id, ",\"discount_value\":\"").concat(randomVoucher.discount_value, "\",\"signature\":\"").concat(randomVoucher.signature, "\",\"voucher_code\":\"").concat(randomVoucher.voucher_code, "\",\"ls_exclusive\":").concat(randomVoucher.ls_exclusive, ",\"use_type\":").concat(randomVoucher.use_type, ",\"start_time\":").concat(randomVoucher.start_time, ",\"user_segment\":\"\",\"end_time\":").concat(randomVoucher.end_time, ",\"discount_percentage\":").concat(randomVoucher.discount_percentage, ",\"exclusive\":").concat(randomVoucher.exclusive, ",\"coin_cap\":\"").concat(randomVoucher.coin_cap, "\",\"is_claimed\":").concat(randomVoucher.is_claimed, "}"),
                            "identifier": {
                                "voucher_code": randomVoucher.voucher_code,
                                "promotion_id": randomVoucher.promotion_id,
                                "signature": randomVoucher.signature
                            }
                        });
                        //remove all line break
                        data = data.replace(/(\r\n|\n|\r)/gm, "");
                        //remove all space
                        data = data.replace(/\s/g, '');
                        fs = require('fs');
                        fs.writeFileSync('voucher.json', data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Object.defineProperty(BotVoucherController.prototype, "possibleAction", {
        get: function () {
            if (this.isBotRunning) {
                return "Nonaktifkan";
            }
            else {
                return "Aktifkan";
            }
        },
        enumerable: false,
        configurable: true
    });
    BotVoucherController.prototype.makeVoucher = function (cookie, sessionId, deviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, config, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRandomVoucher(sessionId, cookie)];
                    case 1:
                        data = _a.sent();
                        config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: "https://live.shopee.co.id/api/v1/session/".concat(sessionId, "/voucher/show"),
                            headers: {
                                'User-Agent': 'ShopeeID/3.15.24 (com.beeasy.shopee.id; build:3.15.24; iOS 17.2.1) Alamofire/5.0.5 language=id app_type=1 Cronet/102.0.5005.61',
                                'Accept-Encoding': 'gzip, deflate',
                                'Content-Type': 'application/json',
                                'client-request-id': 'ae523de2-e6fc-480f-9bb7-a98c1606c754.235',
                                'x-sap-access-f': '2.17.2.1|13|3.3.1_850|03F52A741C754EFD88B0BA2A316C1124BE1090DE05C643|1900|100',
                                'x-livestreaming-auth': 'ls_ios_v1_20001_1705908155_31C67DBA-FB68-4FE6-85B9-CA20BC89831C|g/C9vbypTBSPrco9rVPkfBdZ0s7nrKwDPCF9YKqygCw=',
                                'x-ls-sz-token': 'U/n7tUjSyxMoSDYy8wlH4A==|4dMUcI0/6v7+cJMHPN5kPqA1ngGQ/prFP5OepgxQ0OGS6CCgvnHkryPk1Qtc4ygvJ2oQQkt5WygNKix5NQB1lg==|XPgPG2iYCTRWIWCH|08|2',
                                'x-sap-access-s': 'cjOnqCFVuI3zP3XxZCBg8QCbqmJcQHUXQH_iaaAeipw=',
                                'x-livestreaming-source': 'shopee',
                                '318eac4f': 'JN5+64eeniH/YaxhgNnQVq87Ofj=',
                                'af-ac-enc-sz-token': 'U/n7tUjSyxMoSDYy8wlH4A==|4dMUcI0/6v7+cJMHPN5kPqA1ngGQ/prFP5OepgxQ0OGS6CCgvnHkryPk1Qtc4ygvJ2oQQkt5WygNKix5NQB1lg==|XPgPG2iYCTRWIWCH|08|2',
                                '67effeaa': 'bbN+x3iXXMTTzzXJGcxYlu5SzWcAVFQxAmfxawgSrAybx+s/pgcyayB41+rYt2X1EyXmv1qloN6Fqa3ttCSVuz2BJBaP7wCx7TFVvvK8zqXcAtsGlbjOp94xSL3EAnb6ijVXLXzEguR8YBui0v3eRzTw5ntt6Q37MYrTM43CEbEV6K6Qis4fOBC28Jgwn+TXI8Rp9INtXeWNLVps30E54nX7ymgyK+sx0R9jnBdUpl1eGKjje01M7+0RrZQ+0YluwEzlQUuOWuDpjStEbvmB0F4uCXcKAXZcEZME7ZUfe0H5maELXhDi6W/FWuEQkzempvvTVn60HpsjR2PzsKcUTL8wBDKvP22F3gvNNlB6bgTCk14FXeZf9YYAimZxV81A2RbQJZpQGosCXWeQPinlaWKeFwpcU6uyU3h9AClyS5IEujhpz1EHpU4mmK8slK2sbUwIVe7E//WnQ7938i/FX1gQZDAZK7vhM2j/9uKbJtbclnX0z7XKrCk9SHc5YJ8gllW26IRNVz8CHk6WgeDNAfmieDKyDlGUzZtbggzzSgT6wLxyrKCQMsuxYGoTgbye8DUQW6b0+tw9w375f4joe0RDcrM619koIGKON7HRwi2o4lZDYkoQwuZELRHicUZc',
                                'x-shopee-client-timezone': 'Asia/Jakarta',
                                'fcaf67fc': 'nIwaG8Ot2dXbde/51DBaFk4KsY4=',
                                'client-info': "device_id=".concat(deviceId, ";device_model=iPhone%2014;os=1;os_version=17.2.1;client_version=31524;network=1;platform=2;language=id;cpu_model=ARM64E"),
                                'x-sap-ri': 'bb17ae65f1d6c9c80cb4192201db7e1a358e21c00705f085b70b',
                                'e0db90d5': 'Ilt0NRlzqi3Ig4YTp2JY/P8v86B=',
                                'af-ac-enc-id': 's6xalO7mrF2pSX1ljSaiWoqiN3waArH/VlSyqDaCpjA6m0njscE+IrsOBduPELWOXT+1sw==',
                                'af-ac-enc-dat': 'YWNzCjAwNAAITaj9N4YMMI0BAAABAgEAoAAAAGhlHaQ5TjoEJqeEadQM45xFmggx+Mk02NjSXw1ILBS7XD1pqfDA8opgsOzg1QzuG0yY2W5RPrxg7bDsXI+aGrIzqCNOay/XLqzsF5s0OJ6Gr+NejERJmUblh1FYQlZE+YeVOQXrdd7DghVL7GSGybQKB1BbzyYW7x4XGBcjgWyMGOdox9vDl6eOVTS3lRJA2ERJBvzEYQv8WznX4fDAwSQ=',
                                'x-sap-access-t': '1705908155',
                                'accept-language': 'id-ID,id,en-US,en',
                                'Cookie': cookie,
                            },
                            data: data
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios.request(config)];
                    case 3:
                        response = _a.sent();
                        if (response.data.err_code != 0) {
                            this.logMessage("Error: " + response.data.err_msg);
                            return [2 /*return*/, false];
                        }
                        this.logMessage(JSON.stringify(response.data));
                        this.logMessage("Berhasil mengirim voucher");
                        return [2 /*return*/, true];
                    case 4:
                        error_1 = _a.sent();
                        this.logMessage("Error: " + error_1.message);
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BotVoucherController.prototype.startVoucherBot = function (cookie, sessionId, deviceId, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isBotRunning) {
                            this.logMessage("Error: Bot voucher sudah berjalan");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.makeVoucher(cookie, sessionId, deviceId)];
                    case 1:
                        _a.sent();
                        this.botProcess = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.makeVoucher(cookie, sessionId, deviceId)];
                                    case 1:
                                        result = _a.sent();
                                        if (result === false) {
                                            this.logMessage("Error: " + result);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, (31 + delay) * 1000);
                        this.isBotRunning = true;
                        this.logMessage("Bot voucher diaktifkan");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    BotVoucherController.prototype.stopVoucherBot = function () {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot voucher dinonaktifkan");
    };
    BotVoucherController.prototype.getLog = function (count) {
        //get last count log
        if (count > this.log.length) {
            count = this.log.length;
        }
        return this.log.slice(this.log.length - count, this.log.length);
    };
    BotVoucherController.prototype.logMessage = function (message) {
        var time = new Date();
        this.log.push(message + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    };
    return BotVoucherController;
}());
exports.BotVoucherController = BotVoucherController;
var AutoBannedController = /** @class */ (function () {
    function AutoBannedController() {
        this.log = [];
        this.botProcess = null;
        this.isBotRunning = false;
    }
    AutoBannedController.prototype.getComment = function (chatroomId) {
        return __awaiter(this, void 0, void 0, function () {
            var axios, options, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        axios = require("axios").default;
                        options = {
                            method: 'GET',
                            url: "https://chatroom-live.shopee.co.id/api/v1/fetch/chatroom/".concat(chatroomId, "/message"),
                            params: { uuid: '93e048a5-29ed-40e2-b6f6-43ab07d8ed50' },
                            headers: {
                                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                                'accept-encoding': 'gzip, deflate, br',
                                accept: 'application/json',
                                connection: 'keep-alive',
                                host: 'chatroom-live.shopee.co.id',
                                'sec-ch-ua': '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                                'sec-ch-ua-mobile': '?0',
                                'x-api-source': 'pc',
                                'content-type': 'application/json',
                                'x-shopee-language': 'id',
                                'x-requested-with': 'XMLHttpRequest',
                                'sec-ch-ua-platform': '"macOS"',
                                'sec-gpc': '1',
                                'accept-language': 'id-ID,id;q=0.6',
                                'sec-fetch-site': 'same-origin',
                                'sec-fetch-mode': 'cors',
                                'sec-fetch-dest': 'empty',
                                referer: 'https://shopee.co.id/?is_from_login=true&is_from_login=true',
                                cookie: (0, cookieController_1.readCookiesFromFile)(),
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.request(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_2 = _a.sent();
                        this.logMessage("Error: " + error_2.message);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AutoBannedController.prototype.bannedUser = function (sessionId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var axios, options, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        axios = require("axios").default;
                        options = {
                            method: 'POST',
                            url: "https://live.shopee.co.id/api/v1/session/".concat(sessionId, "/comment/ban"),
                            headers: {
                                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                                'accept-encoding': 'gzip, deflate, br',
                                accept: 'application/json',
                                connection: 'keep-alive',
                                host: 'live.shopee.co.id',
                                'sec-ch-ua': '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                                'sec-ch-ua-mobile': '?0',
                                'x-api-source': 'pc',
                                'content-type': 'application/json',
                                'x-shopee-language': 'id',
                                'x-requested-with': 'XMLHttpRequest',
                                'sec-ch-ua-platform': '"macOS"',
                                'sec-gpc': '1',
                                'accept-language': 'id-ID,id;q=0.6',
                                'sec-fetch-site': 'same-origin',
                                'sec-fetch-mode': 'cors',
                                'sec-fetch-dest': 'empty',
                                referer: 'https://shopee.co.id/?is_from_login=true&is_from_login=true',
                                cookie: (0, cookieController_1.readCookiesFromFile)(),
                            },
                            data: { is_ban: true, ban_uid: userId }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.request(options)];
                    case 2:
                        response = _a.sent();
                        this.logMessage("Berhasil banned user: " + userId);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AutoBannedController.prototype.blockUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var axios, options, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        axios = require("axios").default;
                        options = {
                            method: 'POST',
                            url: 'https://sv.shopee.co.id/api/v2/biz/user/block',
                            headers: {
                                'user-agent': 'python-requests/2.31.0',
                                'accept-encoding': 'gzip, deflate, br',
                                accept: 'application/json, text/plain, */*',
                                connection: 'keep-alive',
                                host: 'sv.shopee.co.id',
                                'sdk-version': '1.39.8',
                                'x-requested-from': 'rn',
                                model: 'iPhone 15 Pro Max',
                                'content-type': 'application/json',
                                'android-performance': '0',
                                language: 'id',
                                'accept-language': 'id-ID,id,en-US,en',
                                cookie: (0, cookieController_1.readCookiesFromFile)(),
                            },
                            data: { block_user_id: userId }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.request(options)];
                    case 2:
                        response = _a.sent();
                        this.logMessage("Berhasil block user: " + userId);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        this.logMessage(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AutoBannedController.prototype.checkForComment = function (sessionId, chatroomId, keywords) {
        return __awaiter(this, void 0, void 0, function () {
            var response, messages;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getComment(chatroomId)];
                    case 1:
                        response = _a.sent();
                        if (response == null) {
                            this.logMessage("Error: Gagal mengambil komentar");
                            return [2 /*return*/, false];
                        }
                        if (response.code !== 0) {
                            this.logMessage("Error: " + response.err_msg);
                            return [2 /*return*/, false];
                        }
                        messages = response.data.message;
                        if (messages.length === 0) {
                            this.logMessage("Belum ada pesan");
                            return [2 /*return*/, false];
                        }
                        messages.forEach(function (message) {
                            var msg = message.msgs[0];
                            var uid = msg.uid;
                            var nickname = msg.nickname;
                            var content = JSON.parse(msg.content).content;
                            _this.logMessage(nickname + ": " + content);
                            if (keywords.some(function (keyword) { return content.includes(keyword); })) {
                                _this.bannedUser(sessionId, uid);
                                _this.blockUser(uid);
                                _this.logMessage("User " + nickname + " dibanned");
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(AutoBannedController.prototype, "possibleAction", {
        get: function () {
            if (this.isBotRunning) {
                return "Nonaktifkan";
            }
            else {
                return "Aktifkan";
            }
        },
        enumerable: false,
        configurable: true
    });
    AutoBannedController.prototype.startAutoBannedBot = function (sessionId, chatroomId, keywords) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.isBotRunning) {
                    this.logMessage("Error: Bot Auto Banned sudah berjalan");
                    return [2 /*return*/, false];
                }
                this.botProcess = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.checkForComment(sessionId, chatroomId, keywords)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 1000);
                this.isBotRunning = true;
                this.logMessage("Bot Auto Banned diaktifkan");
                return [2 /*return*/, true];
            });
        });
    };
    AutoBannedController.prototype.stopAutoBannedBot = function () {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot Auto Banned dinonaktifkan");
    };
    AutoBannedController.prototype.getLog = function (count) {
        //get last count log
        if (count > this.log.length) {
            count = this.log.length;
        }
        return this.log.slice(this.log.length - count, this.log.length);
    };
    AutoBannedController.prototype.logMessage = function (message) {
        var time = new Date();
        this.log.push(message + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    };
    return AutoBannedController;
}());
exports.AutoBannedController = AutoBannedController;
var BotPinController = /** @class */ (function () {
    function BotPinController() {
        this.log = [];
        this.produk = [];
        this.botProcess = null;
        this.isBotRunning = false;
    }
    BotPinController.prototype.initProduk = function (cookie, sessionId, deviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var config, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            method: 'get',
                            maxBodyLength: Infinity,
                            url: "https://live.shopee.co.id/api/v1/session/".concat(sessionId, "/host/more_items?offset=0&limit=50"),
                            headers: {
                                '52078125': 'Tzpr0hAUjz8CuIsir9oYtByUabb=',
                                'User-Agent': 'ShopeeID/3.15.24 (com.beeasy.shopee.id; build:3.15.24; iOS 17.2.1) Alamofire/5.0.5 language=id app_type=1 Cronet/102.0.5005.61',
                                'Accept-Encoding': 'gzip, deflate',
                                'client-info': "device_id=".concat(deviceId, ";device_model=iPhone%2014;os=1;os_version=17.2.1;client_version=31524;network=1;platform=2;language=id;cpu_model=ARM64E"),
                                'af-ac-enc-sz-token': 'UDAjGm2O3XOOVR9esvteKw==|/dMUcI0/6v7+cJMHPN5kPqA1ngGQ/prFP5OepnsCoOCS6CCgvnHkryPk1Qtc4ygvJ2oQQkt5WygNKix5NQB1lg==|XPgPG2iYCTRWIWCH|08|2',
                                'x-sap-access-f': '2.17.2.1|13|3.3.1_17|1D5765A777EF431EA326DC956FDD629AC7AC6DD54EE548|1900|100',
                                'x-sap-access-t': '1705932310',
                                '3e1dc448': '4l26V31WQqXI5s58RgyFRbxoHoQ=',
                                'x-livestreaming-auth': 'ls_ios_v1_20001_1705932310_C3511518-E232-4EE6-AF7A-87ECDC687B2F|KXK9tY4a1MofYyOGjdzt9pOF0J/Xex+Q0t2NkCcTlqg=',
                                'x-ls-sz-token': 'UDAjGm2O3XOOVR9esvteKw==|/dMUcI0/6v7+cJMHPN5kPqA1ngGQ/prFP5OepnsCoOCS6CCgvnHkryPk1Qtc4ygvJ2oQQkt5WygNKix5NQB1lg==|XPgPG2iYCTRWIWCH|08|2',
                                'af-ac-enc-id': 'frvnZNzMYAL2Ea5+Py+FWnclC2QpXavsudXVW4GYAw9oqFSN/evY5brS0+qOi0OxNlGzqQ==',
                                'client-request-id': '9209ff2d-81af-4e60-9eb4-085bf2984503.280',
                                'e9a0c72c': 'ZEAE3zDXWZzExy0gJIRVdstBSFXl26uJC1aacDwbRyPl2WkN2/rNO876JAwMeWtL0XhXdytipKQgi56hBzLx9Jz2ssrUYdFKJX6evw1GTLrS2QgOaVtqxJjLlkOxdALqPDHfnhw6MGnM2qFsgkNyCLV2f0V+aZf8Z21XtAUG2TLPPp5hwaaywzRMdwqSpE7EBJG/FGQvbU9fKHVB1ax2RgkOK0ElUjxEqKqeQcenktPKPE+EaWmM8g9VssgDOo3GExucry3ebK92JJEA1OO99MsQXsED2VOyAFxunIEbVEjHmuKF7YmpKV3Xg6fuHnJQA4hhLYk2otO/1l9XztVj2q3QV3gMDz6YZdAUu2xrSUXyuj/Vt1d52CXOIeO5jA5OlbeuQRKE0hXJ8rbrP4DOxrKrjI1nI8uI8ohNn7jtj4n8o4JobAL7ljQb5qtf/Zq0saR+ltZbb+eBPWk5Feys6mMUo3/eFoep6KNhwtpWZRkU/o1uYxZMTxU+b+RG9MpGMvfoCTLtiSikp8a7/+uldm1dQy/o0NGzNOZDg7/+2pZPpjh0O+z2zQPEfgfHtle0nPhCyiww3lVaIqVCmiNuSYYz+q0OarGAPkyedv6UCvISjDxuMqbJd+3wUUdatzkw2xC9oV2BfvvAaliC7icVHg4SBTjWL3hnRLl1KotPSZ0hcXgjyOc8kjVUS7b=',
                                'x-livestreaming-source': 'shopee',
                                'af-ac-enc-dat': 'YWNzCjAwNAAEUL/po758MY0BAAABAgEAoAAAALx3hYVkFnrvR3rqe6+TSWG0seuxyLPa67MThzI6+3QPrG1BEGa/+E9nFljaDpCaTk0lVhr1vhmyZT6yRUY3U0ym9P0WVBZf9aFTA+Jt0iVvn3zEMwuUKkL5be60brladWylUzKdly9EfKs3T0HXxt0vYhhKtbRzorG5lZm66DbMJNsWM4ekrhipxqZCKtClfpLC0lxDmvWpZgLPU4y8Y9U=',
                                'x-shopee-client-timezone': 'Asia/Jakarta',
                                'x-sap-access-s': 'tHreA2ZLDqebbFP_jSy_2oK6j8HVOQsVTnrJq5nFDUs=',
                                'x-sap-ri': '1676ae65114948376a2bc128012dc57e7e53db851a4adbfacfa0',
                                'accept-language': 'id-ID,id,en-US,en',
                                'Cookie': cookie,
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.request(config)];
                    case 2:
                        response = _a.sent();
                        if (response.data.err_code !== 0) {
                            this.logMessage("Error: " + response.data.err_msg);
                            return [2 /*return*/, false];
                        }
                        this.logMessage("Berhasil mengambil produk");
                        this.produk = response.data.data.items;
                        this.logMessage("Jumlah produk: " + this.produk.length);
                        return [2 /*return*/, true];
                    case 3:
                        error_5 = _a.sent();
                        this.logMessage("Error mengambil produk: " + error_5.message);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(BotPinController.prototype, "possibleAction", {
        get: function () {
            if (this.isBotRunning) {
                return "Nonaktifkan";
            }
            else {
                return "Aktifkan";
            }
        },
        enumerable: false,
        configurable: true
    });
    BotPinController.prototype.makePin = function (cookie, sessionId, deviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var randomProduk, modifiedItem, resultJson, config, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //random produk
                        if (this.produk.length === 0) {
                            this.logMessage("Error: Produk kosong");
                            return [2 /*return*/, false];
                        }
                        randomProduk = this.produk[Math.floor(Math.random() * this.produk.length)];
                        modifiedItem = {
                            item: JSON.stringify(randomProduk),
                        };
                        resultJson = JSON.stringify(modifiedItem, null, 2);
                        config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: "https://live.shopee.co.id/api/v1/session/".concat(sessionId, "/show"),
                            headers: {
                                'User-Agent': 'language=id app_type=1 Cronet/102.0.5005.61',
                                'Accept-Encoding': 'gzip, deflate',
                                'Content-Type': 'application/json',
                                'client-request-id': '21bb6b08-9860-4068-9dea-a3364feeed4e.2469',
                                'x-sap-access-f': '2.17.2.1|13|3.3.1_4939|03CE02E3978E476A9F88BA3834163D95C6387CC6FEB144|1900|100',
                                'cb2043a2': 'Jt6QH0PHDcqtrVYcmYOOZ3t2vkNKKPdDjAuN2sh4lEUKruWSt28enHQegF4VU91pbrdUyd2fUG/mkuH+1azLo6ucX/uxvgBGrVDilnKeidwIxpda+h193DSlH61PdGiXFm8olKrj7xaBMnWO9dCgJWPFcq+aQiIyir84nmDwKFU//7QasYJZLa4sHr22/8hNhfeUbFah0EfeX7MdHGc+m3Byzx+A5G4q1qfS8Zqzg7/Y5rkXepYTiD6kEYRNE578YNoci+XO4/xrBVrgESS8VVcAo3oRCYbYT6mgqgd5tH9FvFsPHb9wN6Ybw+nuHCBb1GYVdAYMaNhsgpYynabvGxEGuFlDtRnxjdykDCHtEUSPaAil7GdjDEk/o71QTJ0EU9p/wlAXrhuERUimUc5ioAPFFBpZMEMZy7/Pd+hD0koAy3jvlxHvbU+nJX2xEzurUvZYLzKjB9HdEBaaHf5i5cFA8YEKuVfd2Z6T20Q2amTCbH1Ni67vrHOoyQe52Xh0dgfF9BhJlt0joBUGN3erzDJB1VY9RMnlSieifQ1+74xe2D+Pfk36jBd6y/Rv/3iTTX7XqDGyBt5emj62Teoo1GFfxYTDzeyVKAjoxTsGKGXzvmEN68CvWw++AkbVXQe+vQEIrUT1QeGsxYWeZC5J/pkpwaqrjt+LozdX1cnvP3++mRggoJPo4LEHW08=',
                                '23499b16': 'a/NOj34USuWK/lrDSoafMY1kLTj=',
                                'x-livestreaming-auth': 'ls_ios_v1_20001_1705909764_757C2D4FEB9442BB9ADE990D6D614DB3-1705909764275-783281|sTw2qMLLJpbuwVL7Xsy4RmjNHMtqZbdP/Uzl0U2sHZw=',
                                'x-ls-sz-token': 'U/n7tUjSyxMoSDYy8wlH4A==|4dMUcI0/6v7+cJMHPN5kPqA1ngGQ/prFP5OepgxQ0OGS6CCgvnHkryPk1Qtc4ygvJ2oQQkt5WygNKix5NQB1lg==|XPgPG2iYCTRWIWCH|08|2',
                                'x-sap-access-s': 'vVj-7KyYvTIOmC3syeGMkIjyvNkAxYjXiBedyC-9gHg=',
                                'x-livestreaming-source': 'shopee',
                                'fdc465cc': '5n0Pw8Lffr9mEbEEcYPSKoXHvNU=',
                                'af-ac-enc-sz-token': 'U/n7tUjSyxMoSDYy8wlH4A==|4dMUcI0/6v7+cJMHPN5kPqA1ngGQ/prFP5OepgxQ0OGS6CCgvnHkryPk1Qtc4ygvJ2oQQkt5WygNKix5NQB1lg==|XPgPG2iYCTRWIWCH|08|2',
                                'x-shopee-client-timezone': 'Asia/Jakarta',
                                'client-info': "device_id=".concat(deviceId, ";device_model=iPhone14%2C7;os=1;os_version=17.2.1;client_version=31524;platform=4;app_type=1;language=id"),
                                'x-sap-ri': '041eae65c9bc389f033f8926012120bee7316ede53938576d88d',
                                'af-ac-enc-id': 's6Mt5O6SrCipOX5liiaiXYehNwUVD7L/Ui6yqDKA1kM6mUWQx/AcAnq3SX2qJLcZtzulKg==',
                                '5d668c0a': '5BeF4ZYmn3HMXGfCwcx9s1URoh8=',
                                'af-ac-enc-dat': 'YWNzCjAwNAAITaj9N4YMMI0BAAABAgEAoAAAAGhlHaQ5TjoEJqeEadQM45xFmggx+Mk02NjSXw1ILBS7XD1pqfDA8opgsOzg1QzuG0yY2W5RPrxg7bDsXI+aGrIzqCNOay/XLqzsF5s0OJ6Gr+NejERJmUblh1FYQlZE+YeVOQXrdd7DghVL7GSGybQKB1BbzyYW7x4XGBcjgWyMGOdox9vDl6eOVTS3lRJA2ERJBvzEYQv8WznX4fDAwSQ=',
                                'x-sap-access-t': '1705909764',
                                'accept-language': 'id-ID,id,en-US,en',
                                'Cookie': cookie,
                            },
                            data: resultJson
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.request(config)];
                    case 2:
                        response = _a.sent();
                        if (response.data.err_code !== 0) {
                            this.logMessage("Error: " + response.data.err_msg);
                            return [2 /*return*/, false];
                        }
                        this.logMessage("Berhasil membuat PIN");
                        return [2 /*return*/, true];
                    case 3:
                        error_6 = _a.sent();
                        this.logMessage("Error: " + error_6.message);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BotPinController.prototype.startPinBot = function (cookie, sessionId, deviceId, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initProduk(cookie, sessionId, deviceId)];
                    case 1:
                        result = _a.sent();
                        if (result === false) {
                            this.logMessage("Error: " + result);
                            return [2 /*return*/, false];
                        }
                        if (this.isBotRunning) {
                            this.logMessage("Error: Bot PIN sudah berjalan");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.makePin(cookie, sessionId, deviceId)];
                    case 2:
                        _a.sent();
                        this.botProcess = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.makePin(cookie, sessionId, deviceId)];
                                    case 1:
                                        result = _a.sent();
                                        if (result === false) {
                                            this.logMessage("Error: " + result);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, (delay) * 1000);
                        this.isBotRunning = true;
                        this.logMessage("Bot PIN diaktifkan");
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    BotPinController.prototype.stopPinBot = function () {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot PIN dinonaktifkan");
    };
    BotPinController.prototype.getLog = function (count) {
        if (count > this.log.length) {
            count = this.log.length;
        }
        return this.log.slice(this.log.length - count, this.log.length);
    };
    BotPinController.prototype.logMessage = function (message) {
        var time = new Date();
        this.log.push(message + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    };
    return BotPinController;
}());
exports.BotPinController = BotPinController;
var BotBomKeranjangController = /** @class */ (function () {
    function BotBomKeranjangController() {
        this.log = [];
        this.botProcess = null;
        this.isBotRunning = false;
    }
    BotBomKeranjangController.prototype.makePurchase = function (session_id) {
        return __awaiter(this, void 0, void 0, function () {
            var axios, x, options, response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        axios = require("axios").default;
                        return [4 /*yield*/, (0, helper_1.getRandomCookie)()];
                    case 1:
                        x = _a.sent();
                        if (x == 'error') {
                            this.logMessage('Error: User Lain tidak ditemukan!');
                        }
                        options = {
                            method: 'POST',
                            url: "https://live.shopee.co.id/api/v1/session/".concat(session_id, "/msg/buy"),
                            headers: {
                                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                                'accept-encoding': 'gzip, deflate, br',
                                accept: 'application/json',
                                connection: 'keep-alive',
                                host: 'live.shopee.co.id',
                                'sec-ch-ua': '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                                'sec-ch-ua-mobile': '?0',
                                'x-api-source': 'pc',
                                'content-type': 'application/json',
                                'x-shopee-language': 'id',
                                'x-requested-with': 'XMLHttpRequest',
                                'sec-ch-ua-platform': '"macOS"',
                                'sec-gpc': '1',
                                'accept-language': 'id-ID,id;q=0.6',
                                'sec-fetch-site': 'same-origin',
                                'sec-fetch-mode': 'cors',
                                'sec-fetch-dest': 'empty',
                                referer: 'https://shopee.co.id/?is_from_login=true&is_from_login=true',
                                cookie: x
                            }
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios.request(options)];
                    case 3:
                        response = _a.sent();
                        if (response.data.err_code !== 0) {
                            this.logMessage("Error: " + response.data.err_msg);
                            return [2 /*return*/, false];
                        }
                        this.logMessage(response.data);
                        this.logMessage("Berhasil membeli produk");
                        return [2 /*return*/, true];
                    case 4:
                        error_7 = _a.sent();
                        this.logMessage("Error: " + error_7.message);
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(BotBomKeranjangController.prototype, "possibleAction", {
        get: function () {
            if (this.isBotRunning) {
                return "Nonaktifkan";
            }
            else {
                return "Aktifkan";
            }
        },
        enumerable: false,
        configurable: true
    });
    BotBomKeranjangController.prototype.startBomKeranjangBot = function (sessionId, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isBotRunning) {
                            this.logMessage("Error: Bot bom keranjang sudah berjalan");
                            return [2 /*return*/, false];
                        }
                        this.botProcess = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var x;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.makePurchase(sessionId)];
                                    case 1:
                                        x = _a.sent();
                                        if (x === false) {
                                            this.logMessage("Error: " + x);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, (delay) * 1000);
                        this.isBotRunning = true;
                        this.logMessage("Bot bom keranjang diaktifkan");
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    BotBomKeranjangController.prototype.logMessage = function (message) {
        var time = new Date();
        this.log.push(message + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    };
    BotBomKeranjangController.prototype.stopBomKeranjangBot = function () {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot bom keranjang dinonaktifkan");
    };
    BotBomKeranjangController.prototype.getLog = function (count) {
        //get last count log
        if (count > this.log.length) {
            count = this.log.length;
        }
        return this.log.slice(this.log.length - count, this.log.length);
    };
    return BotBomKeranjangController;
}());
exports.BotBomKeranjangController = BotBomKeranjangController;
var BotCommentHostController = /** @class */ (function () {
    function BotCommentHostController() {
        this.log = [];
        this.isBotRunning = false;
        this.botProcess = null;
    }
    Object.defineProperty(BotCommentHostController.prototype, "possibleAction", {
        get: function () {
            if (this.isBotRunning) {
                return "Nonaktifkan";
            }
            else {
                return "Aktifkan";
            }
        },
        enumerable: false,
        configurable: true
    });
    BotCommentHostController.prototype.generateUUID = function () {
        return uuidv4();
    };
    BotCommentHostController.prototype.joinV2 = function (cookie, session_id) {
        return __awaiter(this, void 0, void 0, function () {
            var axios, choosenUUID, options, response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        axios = require("axios").default;
                        return [4 /*yield*/, this.generateUUID()];
                    case 1:
                        choosenUUID = _a.sent();
                        options = {
                            method: 'POST',
                            url: "https://live.shopee.co.id/api/v1/session/".concat(session_id, "/joinv2"),
                            headers: {
                                host: 'live.shopee.co.id',
                                'user-agent': 'ShopeeID/3.15.24 (com.beeasy.shopee.id; build:3.15.24; iOS 16.6.1) Alamofire/5.0.5 language=id app_type=1 Cronet/102.0.5005.61',
                                'accept-encoding': 'gzip, deflate, zstd',
                                accept: '*/*',
                                connection: 'keep-alive',
                                'content-type': 'application/json',
                                cookie: cookie
                            },
                            data: {
                                is_boost: false,
                                recommendation_extra: '{"rrkpos":"","from_source":"share","scene":"","ques":""}',
                                joinv2_watch_id: '5AF65F15-2479-4DAF-9A06-AB2CDA248B98',
                                need_follow_session: true,
                                uuid: choosenUUID,
                            }
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios.request(options)
                            // console.log(response.data)
                        ];
                    case 3:
                        response = _a.sent();
                        // console.log(response.data)
                        return [2 /*return*/, { usersig: response.data.data.usersig, uuid: choosenUUID }];
                    case 4:
                        error_8 = _a.sent();
                        this.logMessage("Error: " + error_8.message);
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BotCommentHostController.prototype.getLog = function (count) {
        if (count > this.log.length) {
            count = this.log.length;
        }
        return this.log.slice(this.log.length - count, this.log.length);
    };
    BotCommentHostController.prototype.logMessage = function (message) {
        var time = new Date();
        this.log.push(message + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    };
    BotCommentHostController.prototype.startCommentHostBot = function (cookie, sessionId, deviceId, signature, uuid, message, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var listKomentar, pesan;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isBotRunning) {
                            this.logMessage("Error: Bot komentar sudah berjalan");
                            return [2 /*return*/, false];
                        }
                        listKomentar = message.split(";");
                        pesan = listKomentar[Math.floor(Math.random() * listKomentar.length)];
                        return [4 /*yield*/, this.makeComment(pesan, sessionId, cookie, deviceId, signature)];
                    case 1:
                        _a.sent();
                        this.botProcess = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var pesan, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        pesan = listKomentar[Math.floor(Math.random() * listKomentar.length)];
                                        return [4 /*yield*/, this.makeComment(pesan, sessionId, cookie, deviceId, signature)];
                                    case 1:
                                        result = _a.sent();
                                        if (result === false) {
                                            this.logMessage("Error: " + result);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, (delay) * 1000);
                        this.isBotRunning = true;
                        this.logMessage("Bot komentar host diaktifkan");
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    BotCommentHostController.prototype.stopCommentHostBot = function () {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot komentar host dinonaktifkan");
    };
    BotCommentHostController.prototype.makeComment = function (message, sessionId, cookies, deviceId, usersig, isPin) {
        if (isPin === void 0) { isPin = false; }
        return __awaiter(this, void 0, void 0, function () {
            var url, headers, data, response, responseData, errMsg, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://live.shopee.co.id/webapi/v1/session/".concat(sessionId, "/message");
                        headers = {
                            'authority': 'live.shopee.co.id',
                            'accept': 'application/json, text/plain, */*',
                            'accept-language': 'en-US,en;q=0.9,id;q=0.8',
                            'client-info': 'platform=9',
                            'content-type': 'application/json',
                            'cookie': cookies,
                            'origin': 'https://live.shopee.co.id',
                            'referer': "https://live.shopee.co.id/pc/live?session=".concat(sessionId),
                            'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'sec-fetch-dest': 'empty',
                            'sec-fetch-mode': 'cors',
                            'sec-fetch-site': 'same-origin',
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                        };
                        data = {
                            uuid: deviceId,
                            usersig: usersig,
                            content: "{\"type\":101,\"content\":\"".concat(message, "\"}"),
                            pin: isPin,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.post(url, data, { headers: headers })];
                    case 2:
                        response = _a.sent();
                        responseData = response.data;
                        // Check if err_msg exists
                        if (responseData.err_msg) {
                            errMsg = responseData.err_msg;
                            // Add your custom handling for err_msg
                            this.logMessage("Error: ".concat(errMsg));
                            return [2 /*return*/, false];
                        }
                        // Check if data.message_id exists
                        if (responseData.data && responseData.data.message_id) {
                            this.logMessage("Berhasil pin pesan: ".concat(message));
                            return [2 /*return*/, true];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _a.sent();
                        this.logMessage(error_9);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return BotCommentHostController;
}());
exports.BotCommentHostController = BotCommentHostController;
var uuidv4 = require('uuid').v4;
var BotLelangController = /** @class */ (function () {
    function BotLelangController() {
        this.botProcess = null;
        this.isBotRunning = false;
        this.log = [];
    }
    BotLelangController.prototype.cancelVoucher = function (cookie, sessionId, deviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, config, response, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = JSON.stringify({
                            "voucher": ""
                        });
                        config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: "https://live.shopee.co.id/api/v1/session/".concat(sessionId, "/voucher/show"),
                            headers: {
                                'User-Agent': 'ShopeeID/3.15.24 (com.beeasy.shopee.id; build:3.15.24; iOS 17.2.1) Alamofire/5.0.5 language=id app_type=1 Cronet/102.0.5005.61',
                                'Accept-Encoding': 'gzip, deflate',
                                'Content-Type': 'application/json',
                                'client-request-id': 'ae523de2-e6fc-480f-9bb7-a98c1606c754.235',
                                'x-sap-access-f': '2.17.2.1|13|3.3.1_850|03F52A741C754EFD88B0BA2A316C1124BE1090DE05C643|1900|100',
                                'x-livestreaming-auth': 'ls_ios_v1_20001_1705908155_31C67DBA-FB68-4FE6-85B9-CA20BC89831C|g/C9vbypTBSPrco9rVPkfBdZ0s7nrKwDPCF9YKqygCw=',
                                'x-ls-sz-token': 'U/n7tUjSyxMoSDYy8wlH4A==|4dMUcI0/6v7+cJMHPN5kPqA1ngGQ/prFP5OepgxQ0OGS6CCgvnHkryPk1Qtc4ygvJ2oQQkt5WygNKix5NQB1lg==|XPgPG2iYCTRWIWCH|08|2',
                                'x-sap-access-s': 'cjOnqCFVuI3zP3XxZCBg8QCbqmJcQHUXQH_iaaAeipw=',
                                'x-livestreaming-source': 'shopee',
                                '318eac4f': 'JN5+64eeniH/YaxhgNnQVq87Ofj=',
                                'af-ac-enc-sz-token': 'U/n7tUjSyxMoSDYy8wlH4A==|4dMUcI0/6v7+cJMHPN5kPqA1ngGQ/prFP5OepgxQ0OGS6CCgvnHkryPk1Qtc4ygvJ2oQQkt5WygNKix5NQB1lg==|XPgPG2iYCTRWIWCH|08|2',
                                '67effeaa': 'bbN+x3iXXMTTzzXJGcxYlu5SzWcAVFQxAmfxawgSrAybx+s/pgcyayB41+rYt2X1EyXmv1qloN6Fqa3ttCSVuz2BJBaP7wCx7TFVvvK8zqXcAtsGlbjOp94xSL3EAnb6ijVXLXzEguR8YBui0v3eRzTw5ntt6Q37MYrTM43CEbEV6K6Qis4fOBC28Jgwn+TXI8Rp9INtXeWNLVps30E54nX7ymgyK+sx0R9jnBdUpl1eGKjje01M7+0RrZQ+0YluwEzlQUuOWuDpjStEbvmB0F4uCXcKAXZcEZME7ZUfe0H5maELXhDi6W/FWuEQkzempvvTVn60HpsjR2PzsKcUTL8wBDKvP22F3gvNNlB6bgTCk14FXeZf9YYAimZxV81A2RbQJZpQGosCXWeQPinlaWKeFwpcU6uyU3h9AClyS5IEujhpz1EHpU4mmK8slK2sbUwIVe7E//WnQ7938i/FX1gQZDAZK7vhM2j/9uKbJtbclnX0z7XKrCk9SHc5YJ8gllW26IRNVz8CHk6WgeDNAfmieDKyDlGUzZtbggzzSgT6wLxyrKCQMsuxYGoTgbye8DUQW6b0+tw9w375f4joe0RDcrM619koIGKON7HRwi2o4lZDYkoQwuZELRHicUZc',
                                'x-shopee-client-timezone': 'Asia/Jakarta',
                                'fcaf67fc': 'nIwaG8Ot2dXbde/51DBaFk4KsY4=',
                                'client-info': "device_id=".concat(deviceId, ";device_model=iPhone%2014;os=1;os_version=17.2.1;client_version=31524;network=1;platform=2;language=id;cpu_model=ARM64E"),
                                'x-sap-ri': 'bb17ae65f1d6c9c80cb4192201db7e1a358e21c00705f085b70b',
                                'e0db90d5': 'Ilt0NRlzqi3Ig4YTp2JY/P8v86B=',
                                'af-ac-enc-id': 's6xalO7mrF2pSX1ljSaiWoqiN3waArH/VlSyqDaCpjA6m0njscE+IrsOBduPELWOXT+1sw==',
                                'af-ac-enc-dat': 'YWNzCjAwNAAITaj9N4YMMI0BAAABAgEAoAAAAGhlHaQ5TjoEJqeEadQM45xFmggx+Mk02NjSXw1ILBS7XD1pqfDA8opgsOzg1QzuG0yY2W5RPrxg7bDsXI+aGrIzqCNOay/XLqzsF5s0OJ6Gr+NejERJmUblh1FYQlZE+YeVOQXrdd7DghVL7GSGybQKB1BbzyYW7x4XGBcjgWyMGOdox9vDl6eOVTS3lRJA2ERJBvzEYQv8WznX4fDAwSQ=',
                                'x-sap-access-t': '1705908155',
                                'accept-language': 'id-ID,id,en-US,en',
                                'Cookie': cookie,
                            },
                            data: data
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.request(config)];
                    case 2:
                        response = _a.sent();
                        if (response.data.err_code != 0) {
                            this.logMessage("Error: " + response.data.err_msg);
                            return [2 /*return*/, false];
                        }
                        this.logMessage(JSON.stringify(response.data));
                        this.logMessage("Berhasil menghapus voucher");
                        return [2 /*return*/, true];
                    case 3:
                        error_10 = _a.sent();
                        this.logMessage("Error: " + error_10.message);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BotLelangController.prototype.makeLelang = function (cookie, session_id, deviceId, title, price, timer) {
        return __awaiter(this, void 0, void 0, function () {
            var axios, data, config, response, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        axios = require('axios');
                        data = JSON.stringify({
                            "rule": 1,
                            "participation": 0,
                            "title": title,
                            "price": price,
                            "timer": timer
                        });
                        config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: "https://live.shopee.co.id/api/v1/auction/session/".concat(session_id, "/start"),
                            headers: {
                                'User-Agent': 'ShopeeID/3.15.24 (com.beeasy.shopee.id; build:3.15.24; iOS 17.2.1) Alamofire/5.0.5 language=id app_type=1 Cronet/102.0.5005.61',
                                'Accept-Encoding': 'gzip, deflate',
                                'Content-Type': 'application/json',
                                'x-sap-access-t': '1706841346',
                                '9517e572': '+NvGsIzHg9HyraxrTV9Zmlk8EHeOSXejN9DecOuUajbCC8Q+K5Z70Lg7RB5oyTZVJDlctJC4iEcs5GlW1LhvCuTUA+E+3djjw5e8NLIZorPdlSqCfTwFy0mz087O/ddbo/FKh3JOxjyjPv9RJVFUk5sgbOgtR7Wsnk/iNgpYFwxBDfpkIW2N133UQhYQUHIL1iTjvim0/xtM/tYmO4flH482OV/iZY49MpHvwXKC9WfB5be1LeDp09MVeGe7AGynvhxvARe+DpWdsZmhTdQ7D9IWNhcgpP/ngDTS6Q2b93LSOKEqQcp0rwASNXjPqzciOCIFHZ54fyKFZpzpOXTOUNWfTWMAJ1KE71xv59j8BnpGJpL7zCu/x2WkSaOFQ+fSR2U5ch4FQNF04K9YZBH/eICM+uOTkbxw0kCfmOa+hK1gxcMvONNsPKJ7tJIseCg5EIz7QAdh14obO9teVWKQK6hTJa/SMweMp0yNo4GCtnguT06BrnwyuOynznt/sbqa2/5utE5Zy/liOFKD+IEhae5YExG6gWV2amy2W9LvtzalnN+MI3/kzw8OmD2+nugsSeE6F+aoQ504NwU1dRYBpifTBeBwwBPAgf6fh43lCCerCfVnmo9O8QDh0QyaCxGV6nPjL1jMjl1VEfJ8y3Tz57qcLFUeVDun31ByASFfnicAcSG4W6kANwKjN78=',
                                'client-request-id': 'b1b6c7dc-8d6b-4a0f-9b92-4eb9ab0fe6be.300',
                                '44a66237': 'EZNuquLX3BOK8Z6p7i1SE2wS4Jk=',
                                'x-sap-access-f': '2.17.2.1|13|3.3.1_69|1D846DCEF9504E678FC06EADE3BCE0CDDBD1E40CE04642|1900|100',
                                'x-livestreaming-auth': 'ls_ios_v1_20001_1706841346_2C0EE82A-EE18-41ED-A77B-F9A0F06ACBEF|K9G2PV+hcUYh7/B27zIqD5HSre7qnkbePws50yQ53yc=',
                                'x-ls-sz-token': '5CiGhetsqv/TMSa+nliSpw==|UtQUcI0/6v7+cJMHPN5kPqA1ngGQ/prFP5OeplO0d7aS6CCgvnHkryPk1Qtc4ygvJ2oQQkt5WygNKix5NQB1lg==|XPgPG2iYCTRWIWCH|08|2',
                                'x-sap-access-s': 'vBnO8KANDqivNPpjfgDSEqEhOeGgTz0DDvkPKHSMU-M=',
                                'x-livestreaming-source': 'shopee',
                                'af-ac-enc-sz-token': '5CiGhetsqv/TMSa+nliSpw==|UtQUcI0/6v7+cJMHPN5kPqA1ngGQ/prFP5OeplO0d7aS6CCgvnHkryPk1Qtc4ygvJ2oQQkt5WygNKix5NQB1lg==|XPgPG2iYCTRWIWCH|08|2',
                                'x-shopee-client-timezone': 'Asia/Jakarta',
                                'client-info': "device_id=".concat(deviceId, ";device_model=iPhone%2014;os=1;os_version=17.2.1;client_version=31524;network=5;platform=2;language=id;cpu_model=ARM64E"),
                                'x-sap-ri': '0255bc65028280e5f365e7260115d3a82909cc7f48d3abc4b8ca',
                                '5b643eac': 'aYSsQPAcDT1njZjcSX4yrVno/DQ=',
                                'af-ac-enc-id': '2VhbjlZkSvyO0eU7fxtzFXOJr1N01XhAh7ynwX6BCe6jE8fC0xkHf/HcAzNq6okOtNGtIQ==',
                                'af-ac-enc-dat': 'YWNzCjAwNADxSl1lomurZ40BAAABAgEAoAAAAD3q7pC0KHhz3odjHx3xOCe5FRUHdCtb5coZbnYDl8mpmyfLfgIAOmuIgYjYTqIK4PdOaT6ZZWanJnPwD8a8QjK4i1ej+NL8HoyStJShZtHTUPpTfxbAFxouUWgxZykF3Zsy1nEaJuG0yAtYTEjY7zQQaZtgOaieJdBki+P4ICtaGbZpSPWAXY82pqezB7FMPgZDWmGgdsk1xMQ0AvJZ4uU=',
                                '4e04b7bd': 'UYPk6OEVlQoGdwo/iBrAN3Xsh1O=',
                                'accept-language': 'id-ID,id,en-US,en',
                                'Cookie': cookie
                            },
                            data: data
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.request(config)];
                    case 2:
                        response = _a.sent();
                        this.logMessage("Berhasil membuat lelang");
                        return [2 /*return*/, true];
                    case 3:
                        error_11 = _a.sent();
                        this.logMessage("Error: " + error_11.message);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(BotLelangController.prototype, "possibleAction", {
        get: function () {
            if (this.isBotRunning) {
                return "Nonaktifkan";
            }
            else {
                return "Aktifkan";
            }
        },
        enumerable: false,
        configurable: true
    });
    BotLelangController.prototype.logMessage = function (message) {
        var time = new Date();
        this.log.push(message + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    };
    BotLelangController.prototype.startLelangBot = function (cookie, sessionId, deviceId, title, price, timer, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isBotRunning) {
                            this.logMessage("Error: Bot lelang sudah berjalan");
                            return [2 /*return*/, false];
                        }
                        this.cancelVoucher(cookie, sessionId, deviceId);
                        return [4 /*yield*/, this.makeLelang(cookie, sessionId, deviceId, title, price, timer)];
                    case 1:
                        _a.sent();
                        this.botProcess = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.cancelVoucher(cookie, sessionId, deviceId);
                                        return [4 /*yield*/, this.makeLelang(cookie, sessionId, deviceId, title, price, timer)];
                                    case 1:
                                        result = _a.sent();
                                        if (result === false) {
                                            this.logMessage("Error: " + result);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, (delay + timer) * 1000);
                        this.isBotRunning = true;
                        this.logMessage("Bot lelang diaktifkan");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    BotLelangController.prototype.stopLelangBot = function () {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot lelang dinonaktifkan");
    };
    BotLelangController.prototype.getLog = function (count) {
        if (count > this.log.length) {
            count = this.log.length;
        }
        return this.log.slice(this.log.length - count, this.log.length);
    };
    return BotLelangController;
}());
exports.BotLelangController = BotLelangController;
var BotBomCommentController = /** @class */ (function () {
    function BotBomCommentController() {
        this.botProcess = null;
        this.isBotRunning = false;
        this.log = [];
    }
    BotBomCommentController.prototype.generateUUID = function () {
        return uuidv4();
    };
    BotBomCommentController.prototype.joinV2 = function (cookie, session_id) {
        return __awaiter(this, void 0, void 0, function () {
            var axios, choosenUUID, options, response, t, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        axios = require("axios").default;
                        return [4 /*yield*/, this.generateUUID()];
                    case 1:
                        choosenUUID = _a.sent();
                        options = {
                            method: 'POST',
                            url: "https://live.shopee.co.id/api/v1/session/".concat(session_id, "/joinv2"),
                            headers: {
                                host: 'live.shopee.co.id',
                                'user-agent': 'ShopeeID/3.15.24 (com.beeasy.shopee.id; build:3.15.24; iOS 16.6.1) Alamofire/5.0.5 language=id app_type=1 Cronet/102.0.5005.61',
                                'accept-encoding': 'gzip, deflate, zstd',
                                accept: '*/*',
                                connection: 'keep-alive',
                                'content-type': 'application/json',
                                cookie: cookie
                            },
                            data: {
                                is_boost: false,
                                recommendation_extra: '{"rrkpos":"","from_source":"share","scene":"","ques":""}',
                                joinv2_watch_id: '5AF65F15-2479-4DAF-9A06-AB2CDA248B98',
                                need_follow_session: true,
                                uuid: choosenUUID,
                            }
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios.request(options)
                            // console.log(response.data)
                        ];
                    case 3:
                        response = _a.sent();
                        t = response.data.data.usersig;
                        return [2 /*return*/, { usersig: response.data.data.usersig, uuid: choosenUUID }];
                    case 4:
                        error_12 = _a.sent();
                        this.logMessage("Error: " + error_12.message);
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BotBomCommentController.prototype.makeCommentOther = function (session_id, comment) {
        return __awaiter(this, void 0, void 0, function () {
            var choosenCookie, join, t, x, options, response, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, helper_1.getRandomCookie)()];
                    case 1:
                        choosenCookie = _a.sent();
                        if (choosenCookie == 'error') {
                            this.logMessage("Error: Gagal mendapatkan userlain");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.joinV2(choosenCookie, session_id)];
                    case 2:
                        join = _a.sent();
                        if (!join) {
                            this.logMessage("Error: Gagal join session");
                            return [2 /*return*/, false];
                        }
                        t = join.usersig;
                        x = join.uuid;
                        options = {
                            method: 'POST',
                            url: "https://live.shopee.co.id/api/v1/session/".concat(session_id, "/message"),
                            headers: {
                                'user-agent': 'ShopeeID/3.15.24 (com.beeasy.shopee.id; build:3.15.24; iOS 17.1.2) Alamofire/5.0.5 language=id app_type=1 Cronet/102.0.5005.61',
                                'accept-encoding': 'gzip, deflate, br',
                                accept: '*/*',
                                connection: 'keep-alive',
                                host: 'live.shopee.co.id',
                                'content-type': 'application/json',
                                'accept-language': 'id-ID,id,en-US,en',
                                'x-sap-access-t': '1705797462',
                                cookie: choosenCookie
                            },
                            data: {
                                "usersig": t,
                                "content": "{\"itemId\":0,\"content\":\"".concat(comment, "\",\"shopId\":0,\"type\":100,\"image\":null}"),
                                "uuid": x
                            }
                        };
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, axios.request(options)];
                    case 4:
                        response = _a.sent();
                        this.logMessage("Berhasil mengirim komentar");
                        return [2 /*return*/, true];
                    case 5:
                        error_13 = _a.sent();
                        this.logMessage(error_13);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(BotBomCommentController.prototype, "possibleAction", {
        get: function () {
            if (this.isBotRunning) {
                return "Nonaktifkan";
            }
            else {
                return "Aktifkan";
            }
        },
        enumerable: false,
        configurable: true
    });
    BotBomCommentController.prototype.logMessage = function (message) {
        var time = new Date();
        this.log.push(message + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    };
    BotBomCommentController.prototype.startCommentBot = function (session_id, comment, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var commentArray, randomComment;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isBotRunning) {
                            this.logMessage("Error: Bot komentar sudah berjalan");
                            return [2 /*return*/, false];
                        }
                        commentArray = comment.split(";");
                        randomComment = commentArray[Math.floor(Math.random() * commentArray.length)];
                        return [4 /*yield*/, this.makeCommentOther(session_id, randomComment)];
                    case 1:
                        _a.sent();
                        this.botProcess = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        randomComment = commentArray[Math.floor(Math.random() * commentArray.length)];
                                        return [4 /*yield*/, this.makeCommentOther(session_id, randomComment)];
                                    case 1:
                                        result = _a.sent();
                                        if (result === false) {
                                            this.logMessage("Error: " + result);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, (delay) * 1000);
                        this.isBotRunning = true;
                        this.logMessage("Bot komentar diaktifkan");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    BotBomCommentController.prototype.stopCommentBot = function () {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot komentar dinonaktifkan");
    };
    BotBomCommentController.prototype.getLog = function (count) {
        if (count > this.log.length) {
            count = this.log.length;
        }
        return this.log.slice(this.log.length - count, this.log.length);
    };
    return BotBomCommentController;
}());
exports.BotBomCommentController = BotBomCommentController;
var BotBomShare = /** @class */ (function () {
    function BotBomShare() {
        this.botProcess = null;
        this.isBotRunning = false;
        this.log = [];
    }
    BotBomShare.prototype.makeShare = function (session_id) {
        return __awaiter(this, void 0, void 0, function () {
            var choosenCookie, options, response, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, helper_1.getRandomCookie)()];
                    case 1:
                        choosenCookie = _a.sent();
                        if (choosenCookie == 'error') {
                            this.logMessage("Error: Gagal mendapatkan userlain");
                            return [2 /*return*/, false];
                        }
                        options = {
                            method: 'POST',
                            url: "https://live.shopee.co.id/api/v1/session/".concat(session_id, "/msg/share"),
                            headers: {
                                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                                'accept-encoding': 'gzip, deflate, br',
                                accept: 'application/json',
                                connection: 'keep-alive',
                                host: 'live.shopee.co.id',
                                'sec-ch-ua': '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                                'sec-ch-ua-mobile': '?0',
                                'x-api-source': 'pc',
                                'content-type': 'application/json',
                                'x-shopee-language': 'id',
                                'x-requested-with': 'XMLHttpRequest',
                                'sec-ch-ua-platform': '"macOS"',
                                'sec-gpc': '1',
                                'accept-language': 'id-ID,id;q=0.6',
                                'sec-fetch-site': 'same-origin',
                                'sec-fetch-mode': 'cors',
                                'sec-fetch-dest': 'empty',
                                referer: 'https://shopee.co.id/?is_from_login=true&is_from_login=true',
                                cookie: choosenCookie,
                            },
                            data: { share_to: '' }
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios.request(options)];
                    case 3:
                        response = _a.sent();
                        if (response.data.err_code != 0) {
                            this.logMessage("Error: " + response.data.err_msg);
                            return [2 /*return*/, false];
                        }
                        this.logMessage("Berhasil mengirim share");
                        return [2 /*return*/, true];
                    case 4:
                        error_14 = _a.sent();
                        this.logMessage("Error: " + error_14.message);
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(BotBomShare.prototype, "possibleAction", {
        get: function () {
            if (this.isBotRunning) {
                return "Nonaktifkan";
            }
            else {
                return "Aktifkan";
            }
        },
        enumerable: false,
        configurable: true
    });
    BotBomShare.prototype.logMessage = function (message) {
        var time = new Date();
        this.log.push(message + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    };
    BotBomShare.prototype.startShareBot = function (session_id, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isBotRunning) {
                            this.logMessage("Error: Bot share sudah berjalan");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.makeShare(session_id)];
                    case 1:
                        _a.sent();
                        this.botProcess = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.makeShare(session_id)];
                                    case 1:
                                        result = _a.sent();
                                        if (result === false) {
                                            this.logMessage("Error: " + result);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, (delay) * 1000);
                        this.isBotRunning = true;
                        this.logMessage("Bot share diaktifkan");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    BotBomShare.prototype.stopShareBot = function () {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot share dinonaktifkan");
    };
    BotBomShare.prototype.getLog = function (count) {
        if (count > this.log.length) {
            count = this.log.length;
        }
        return this.log.slice(this.log.length - count, this.log.length);
    };
    return BotBomShare;
}());
exports.BotBomShare = BotBomShare;
var BotBomLike = /** @class */ (function () {
    function BotBomLike() {
        this.log = [];
        this.botProcess = null;
        this.isBotRunning = false;
    }
    BotBomLike.prototype.makeLike = function (cookie, sessionId, deviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var axios, data, x, config, response, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        axios = require('axios');
                        data = JSON.stringify({
                            "like_cnt": 1
                        });
                        return [4 /*yield*/, (0, helper_1.getRandomCookie)()];
                    case 1:
                        x = _a.sent();
                        if (x == 'error') {
                            this.logMessage('Gagal mendapatkan user cookie');
                            return [2 /*return*/, false];
                        }
                        config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: "https://live.shopee.co.id/api/v1/session/".concat(sessionId, "/like"),
                            headers: {
                                'User-Agent': 'ShopeeID/3.15.24 (com.beeasy.shopee.id; build:3.15.24; iOS 17.2.1) Alamofire/5.0.5 language=id app_type=1 Cronet/102.0.5005.61',
                                'Accept-Encoding': 'gzip, deflate',
                                'Content-Type': 'application/json',
                                'client-info': "device_id=".concat(deviceId, ";device_model=iPhone%2014;os=1;os_version=17.2.1;client_version=31524;network=1;platform=2;language=id;cpu_model=ARM64E"),
                                'af-ac-enc-sz-token': 'iwMRd0tqAbJyi2EZPwu68Q==|+9MUcI0/6v7+cJMHPN5kPqA1ngGQ/prFP5Oephik9eOS6CCgvnHkryPk1Qtc4ygvJ2oQQkt5WygNKix5NQB1lg==|XPgPG2iYCTRWIWCH|08|2',
                                'x-sap-ri': '3fa2ae65f72955979576d929013af04a43ff30428d457c7e30ce',
                                'x-sap-access-s': '3heAs0jgZd8YKwmRVVirgYcvfN-XEMmBM56sDeKhkMs=',
                                'x-sap-access-t': '1705943615',
                                'x-livestreaming-auth': 'ls_ios_v1_20001_1705943615_17789109-6F1A-4D8D-87FA-4953990F127A|aPuVfYb3pEQhGi3xW9n7bkFnIbyKAiH82+sfqL6p810=',
                                'x-ls-sz-token': 'iwMRd0tqAbJyi2EZPwu68Q==|+9MUcI0/6v7+cJMHPN5kPqA1ngGQ/prFP5Oephik9eOS6CCgvnHkryPk1Qtc4ygvJ2oQQkt5WygNKix5NQB1lg==|XPgPG2iYCTRWIWCH|08|2',
                                'a1cf8cba': 'pcxKvfgR/5wda2MwbRwe+UCYWYk=',
                                '55be291': '3E5KPXCrrrut8E4cUAc8VIDgaY/4G8nDUcmTTQ6uvwQ76mO7UHLXRr1BuhpSeH4lFXZRfD4+QAIynmooEHk3pbm2Gb7hBSce4qdRWliRib+9Z1q7r6Nov7XWGSd8mgz9ecSva9wvq9M/RMqK92RRFWcP/3ii2z6D2VYVADmh6wijrlbgH0caZyXeiDdaZNYKOZ5tjsKRkiksvQv/bUxO33UID7GBCk0lHU1Bc3j/Mf/jKwNJ12/OGLP0NtbshI6miU8U+Cu/OZNDcjfQpWKY6xw5wOpX1wx1aiGF3DHDKarC4qyKCSfMBgLBBIgZtTkm1f/qdzzh6p6tzJKaOlbOk6rE/7NcDw9zJc3NLlx+Eenpm8x4sD5vlIF634wpQBmK5i3DTbsLaE8Bxo0GT6DW1VWkoIfXs2KTMiMCCAOVJaL+7AFJhxBhgDWKNTVZ4VRp6CYd8l+3L9Cm92Y+3P9GpFEPs+6ein3/0oAr0bPu8Ia1zVTzsjeWmm7bis9Nirpe6LK6HFid6yjiR/YxaCdH8EMUeVaGnaYMKtG+nkAQV1nvZ2y/PJ8sIeEQ23pdFcrf/+gXiJLg5G3RaZVb3+ACb5N9eCX3woEph9dfMiVLeWyQaERx5zLiQEKW2Y+Vzt41',
                                'af-ac-enc-id': '9WGgAYDlpPEHDW1jebDD39R6p/q6Ne5+wF8ampZu1cqQvKrpRaCZwkSdYkr36jgwqqexdw==',
                                'client-request-id': 'ceb48054-b09b-400a-8dd6-a6e9543a3f14.287',
                                '698fba17': 'ybulZS0GutsbGdAYc+Ut+xcwWKU=',
                                'af-ac-enc-dat': 'YWNzCjAwNADGS6OyJ1opMo0BAAABAgEAoAAAALx3hYVkFnrvR3rqe6+TSWEewFSfFDXhBP2EbE/Vv9meHEpsQaq+fGkyb5iCybHxZ3d3mBNp6sVUejAX59UAno0K4TwdxD0gLGUecKH3DnByRRytE6qG7xiSL/fHDZx3gglAWUu01Cs8BDYPjC5BIZ4wLvtR7VUcmMWGMGTuiLFgjQ2poiLiS6C4tw2+JtiKi+e8rzfq6SYgqWCk3szGWg8=',
                                'x-sap-access-f': '2.17.2.1|13|3.3.1_14|B5331964178041F69BBEE8E36A258BA05E845BC0807744|1900|100',
                                'x-shopee-client-timezone': 'Asia/Jakarta',
                                '8da4e90b': '+709fGPNKG12q7EKfyVkT8LaHLU=',
                                'accept-language': 'id-ID,id,en-US,en',
                                'Cookie': x,
                            },
                            data: data
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios.request(config)];
                    case 3:
                        response = _a.sent();
                        if (response.data.err_code !== 0) {
                            this.logMessage("Error: " + response.data.err_msg);
                            return [2 /*return*/, false];
                        }
                        this.logMessage("Berhasil like");
                        return [2 /*return*/, true];
                    case 4:
                        error_15 = _a.sent();
                        this.logMessage("Error: " + error_15.message);
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BotBomLike.prototype.logMessage = function (message) {
        var time = new Date();
        this.log.push(message + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    };
    BotBomLike.prototype.getLog = function (count) {
        if (count > this.log.length) {
            count = this.log.length;
        }
        return this.log.slice(this.log.length - count, this.log.length);
    };
    Object.defineProperty(BotBomLike.prototype, "possibleAction", {
        get: function () {
            if (this.isBotRunning) {
                return "Nonaktifkan";
            }
            else {
                return "Aktifkan";
            }
        },
        enumerable: false,
        configurable: true
    });
    BotBomLike.prototype.startLikeBot = function (cookie, sessionId, deviceId, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isBotRunning) {
                            this.logMessage("Error: Bot like sudah berjalan");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.makeLike(cookie, sessionId, deviceId)];
                    case 1:
                        _a.sent();
                        this.botProcess = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.makeLike(cookie, sessionId, deviceId)];
                                    case 1:
                                        result = _a.sent();
                                        if (result === false) {
                                            this.logMessage("Error: " + result);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, (delay) * 1000);
                        this.isBotRunning = true;
                        this.logMessage("Bot like diaktifkan");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    BotBomLike.prototype.stopLikeBot = function () {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot like dinonaktifkan");
    };
    return BotBomLike;
}());
exports.BotBomLike = BotBomLike;
