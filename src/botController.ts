import { readCookiesFromFile } from "./cookieController";
import { getRandomCookie } from "./helper";

const axios = require('axios');




export class BotVoucherController{
    log = []
    voucher = []


    async getRandomVoucher(session_id, cookie) {
        const axios = require('axios');
      
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://live.shopee.co.id/api/v1/session/${session_id}/voucher?scene=0`,
          headers: {
            'cookie': cookie,
          }
        };
        
        let response = await axios(config);
        const vouchers = response.data.data.shopee_vouchers;
        const randomVoucher = vouchers[Math.floor(Math.random() * vouchers.length)];

        let data = JSON.stringify({
            "voucher":`{\"discount_cap\":\"${randomVoucher.discount_cap}\",\"coin_percentage_real\":${randomVoucher.coin_percentage_real},\"reward_type\":${randomVoucher.reward_type},\"min_spend\":\"${randomVoucher.min_spend}\",\"voucher_ui\":{\"customise_tag\":[],\"non_customise_tag\":[5]},\"stream_exclusive\":${randomVoucher.stream_exclusive},\"has_use_rule\":${randomVoucher.has_use_rule},\"promotion_id\":${randomVoucher.promotion_id},\"shop_id\":${randomVoucher.shop_id},\"discount_value\":\"${randomVoucher.discount_value}\",\"signature\":\"${randomVoucher.signature}\",\"voucher_code\":\"${randomVoucher.voucher_code}\",\"ls_exclusive\":${randomVoucher.ls_exclusive},\"use_type\":${randomVoucher.use_type},\"start_time\":${randomVoucher.start_time},\"user_segment\":\"\",\"end_time\":${randomVoucher.end_time},\"discount_percentage\":${randomVoucher.discount_percentage},\"exclusive\":${randomVoucher.exclusive},\"coin_cap\":\"${randomVoucher.coin_cap}\",\"is_claimed\":${randomVoucher.is_claimed}}`,
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
        //write data to file
        var fs = require('fs');
        fs.writeFileSync('voucher.json', data);
        return data
      }
      
    botProcess = null;
    
    isBotRunning = false;
    get possibleAction(){
        if(this.isBotRunning){
            return "Nonaktifkan";
        }else{
            return "Aktifkan";
        }
    }
    async makeVoucher(cookie:string,sessionId:string,deviceId:string): Promise<boolean>{
    let data = await this.getRandomVoucher(sessionId, cookie);
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://live.shopee.co.id/api/v1/session/${sessionId}/voucher/show`,
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
        'client-info': `device_id=${deviceId};device_model=iPhone%2014;os=1;os_version=17.2.1;client_version=31524;network=1;platform=2;language=id;cpu_model=ARM64E`, 
        'x-sap-ri': 'bb17ae65f1d6c9c80cb4192201db7e1a358e21c00705f085b70b', 
        'e0db90d5': 'Ilt0NRlzqi3Ig4YTp2JY/P8v86B=', 
        'af-ac-enc-id': 's6xalO7mrF2pSX1ljSaiWoqiN3waArH/VlSyqDaCpjA6m0njscE+IrsOBduPELWOXT+1sw==', 
        'af-ac-enc-dat': 'YWNzCjAwNAAITaj9N4YMMI0BAAABAgEAoAAAAGhlHaQ5TjoEJqeEadQM45xFmggx+Mk02NjSXw1ILBS7XD1pqfDA8opgsOzg1QzuG0yY2W5RPrxg7bDsXI+aGrIzqCNOay/XLqzsF5s0OJ6Gr+NejERJmUblh1FYQlZE+YeVOQXrdd7DghVL7GSGybQKB1BbzyYW7x4XGBcjgWyMGOdox9vDl6eOVTS3lRJA2ERJBvzEYQv8WznX4fDAwSQ=', 
        'x-sap-access-t': '1705908155', 
        'accept-language': 'id-ID,id,en-US,en', 
        'Cookie': cookie,
      },
      data : data
    };

    try{
        const response = await   axios.request(config)
        if(response.data.err_code != 0){
            this.logMessage("Error: "+response.data.err_msg);
            return false;
        }
        this.logMessage(JSON.stringify(response.data));
        this.logMessage("Berhasil mengirim voucher");
        return true;
    }catch(error){
        this.logMessage("Error: "+error.message);
        return false;
    }


    }
    
    
    async startVoucherBot(cookie, sessionId, deviceId, delay) {
        
        if(this.isBotRunning){
            this.logMessage("Error: Bot voucher sudah berjalan");
            return false;
        }
        await this.makeVoucher(cookie, sessionId, deviceId);
        this.botProcess = setInterval(async () => {
            const result = await this.makeVoucher(cookie, sessionId, deviceId);
            if (result === false) {
                this.logMessage("Error: "+result);
            }
        }, (31+delay) * 1000);
        this.isBotRunning = true;
        this.logMessage("Bot voucher diaktifkan");
        return true;
    }
    
    stopVoucherBot() {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot voucher dinonaktifkan");
    }

    getLog(count:number){
        //get last count log
        if(count > this.log.length){
            count = this.log.length;
        }
        return this.log.slice(this.log.length-count, this.log.length);
    }
    

    logMessage(message:string){
        const time = new Date();
        this.log.push(message+" - "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
    }
}

export class AutoBannedController {
    log = [];
    async getComment(chatroomId:string){
        var axios = require("axios").default;

            var options = {
            method: 'GET',
            url: `https://chatroom-live.shopee.co.id/api/v1/fetch/chatroom/${chatroomId}/message`,
            params: {uuid: '93e048a5-29ed-40e2-b6f6-43ab07d8ed50'},
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
                cookie: readCookiesFromFile(),
            }
            };
            try {
                const response = await axios.request(options);
                return response.data;
            }catch(error){
                this.logMessage("Error: "+error.message);
                return null;
            }
    }
    
    async bannedUser(sessionId:string,userId:string){
        var axios = require("axios").default;

        var options = {
        method: 'POST',
        url: `https://live.shopee.co.id/api/v1/session/${sessionId}/comment/ban`,
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
            cookie: readCookiesFromFile(),
        },
        data: {is_ban: true, ban_uid: userId}
        };

        try {
            const response = await axios.request(options);
            this.logMessage("Berhasil banned user: "+userId);
        } catch (error) {
            console.error(error);


            }
        
    }

    async blockUser(userId:string){
        var axios = require("axios").default;

        var options = {
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
            cookie: readCookiesFromFile(),
          },
          data: {block_user_id: userId}
        };
        
        try {
            const response = await axios.request(options);
            this.logMessage("Berhasil block user: "+userId);
        } catch (error) {
            this.logMessage(error);
        }
    }
    async checkForComment(sessionId:string,chatroomId:string, keywords:string[]){
        const response = await this.getComment(chatroomId);
        if(response == null){
            this.logMessage("Error: Gagal mengambil komentar");
            return false;
        }
        if(response.code !== 0){
            this.logMessage("Error: "+response.err_msg);
            return false;
        }

        const messages = response.data.message;
        if(messages.length === 0){
            this.logMessage("Belum ada pesan");
            return false;
        }

        messages.forEach(message => {
            const msg = message.msgs[0];
            const uid = msg.uid;
            const nickname = msg.nickname;
            const content = JSON.parse(msg.content).content;
          
            this.logMessage(nickname+": "+content);
            if(keywords.some(keyword => content.includes(keyword))){
                this.bannedUser(sessionId,uid);
                this.blockUser(uid);
                this.logMessage("User "+nickname+" dibanned");
            }

          });
    }
    botProcess = null;
    isBotRunning = false;
    get possibleAction(){
        if(this.isBotRunning){
            return "Nonaktifkan";
        }else{
            return "Aktifkan";
        }
    }
    async startAutoBannedBot(sessionId:string,chatroomId:string,keywords:string[]){
        if(this.isBotRunning){
            this.logMessage("Error: Bot Auto Banned sudah berjalan");
            return false;
        }
        this.botProcess = setInterval(async () => {
            await this.checkForComment(sessionId,chatroomId,keywords);
        }, 1000);
        this.isBotRunning = true;
        this.logMessage("Bot Auto Banned diaktifkan");
        return true;
    }

    stopAutoBannedBot(){
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot Auto Banned dinonaktifkan");
    }

    getLog(count:number){
        //get last count log
        if(count > this.log.length){
            count = this.log.length;
        }
        return this.log.slice(this.log.length-count, this.log.length);
    }

    logMessage(message:string){
        const time = new Date();
        this.log.push(message+" - "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
    }
}

export class BotPinController {
    log = [];
    produk = []
    async initProduk(cookie:string,sessionId:string,deviceId:string){

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://live.shopee.co.id/api/v1/session/${sessionId}/host/more_items?offset=0&limit=50`,
        headers: { 
            '52078125': 'Tzpr0hAUjz8CuIsir9oYtByUabb=', 
            'User-Agent': 'ShopeeID/3.15.24 (com.beeasy.shopee.id; build:3.15.24; iOS 17.2.1) Alamofire/5.0.5 language=id app_type=1 Cronet/102.0.5005.61', 
            'Accept-Encoding': 'gzip, deflate', 
            'client-info': `device_id=${deviceId};device_model=iPhone%2014;os=1;os_version=17.2.1;client_version=31524;network=1;platform=2;language=id;cpu_model=ARM64E`, 
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

        try {
            const response = await axios.request(config);
            if (response.data.err_code !== 0) {
                this.logMessage("Error: " + response.data.err_msg);
                return false;
            }
            this.logMessage("Berhasil mengambil produk");
            this.produk = response.data.data.items;
            this.logMessage("Jumlah produk: "+this.produk.length);
            return true;
        } catch (error) {
            this.logMessage("Error mengambil produk: " + error.message);
            return false;
        }


    }


    botProcess = null;
    isBotRunning = false;

    get possibleAction() {
        if (this.isBotRunning) {
            return "Nonaktifkan";
        } else {
            return "Aktifkan";
        }
    }

    async makePin(cookie:string,sessionId:string,deviceId:string): Promise<boolean> {
        //random produk
        if(this.produk.length === 0){
            this.logMessage("Error: Produk kosong");
            return false;
        }
        const randomProduk = this.produk[Math.floor(Math.random() * this.produk.length)];
        const modifiedItem = {
            item: JSON.stringify(randomProduk),
          };
        const resultJson = JSON.stringify(modifiedItem, null, 2);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://live.shopee.co.id/api/v1/session/${sessionId}/show`,
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
                'client-info': `device_id=${deviceId};device_model=iPhone14%2C7;os=1;os_version=17.2.1;client_version=31524;platform=4;app_type=1;language=id`, 
                'x-sap-ri': '041eae65c9bc389f033f8926012120bee7316ede53938576d88d', 
                'af-ac-enc-id': 's6Mt5O6SrCipOX5liiaiXYehNwUVD7L/Ui6yqDKA1kM6mUWQx/AcAnq3SX2qJLcZtzulKg==', 
                '5d668c0a': '5BeF4ZYmn3HMXGfCwcx9s1URoh8=', 
                'af-ac-enc-dat': 'YWNzCjAwNAAITaj9N4YMMI0BAAABAgEAoAAAAGhlHaQ5TjoEJqeEadQM45xFmggx+Mk02NjSXw1ILBS7XD1pqfDA8opgsOzg1QzuG0yY2W5RPrxg7bDsXI+aGrIzqCNOay/XLqzsF5s0OJ6Gr+NejERJmUblh1FYQlZE+YeVOQXrdd7DghVL7GSGybQKB1BbzyYW7x4XGBcjgWyMGOdox9vDl6eOVTS3lRJA2ERJBvzEYQv8WznX4fDAwSQ=', 
                'x-sap-access-t': '1705909764', 
                'accept-language': 'id-ID,id,en-US,en', 
                'Cookie': cookie,
              },
              data : resultJson
            
        };

        try {
            const response = await axios.request(config);
            if (response.data.err_code !== 0) {
                this.logMessage("Error: " + response.data.err_msg);
                return false;
            }
            this.logMessage("Berhasil membuat PIN");
            return true;
        } catch (error) {
            this.logMessage("Error: " + error.message);
            return false;
        }
    }

    async startPinBot(cookie, sessionId, deviceId, delay) {
        const result = await this.initProduk(cookie, sessionId, deviceId);
        if (result === false) {
            this.logMessage("Error: " + result);
            return false;
        }
        if (this.isBotRunning) {
            this.logMessage("Error: Bot PIN sudah berjalan");
            return false;
        }

        await this.makePin(cookie, sessionId, deviceId);
        this.botProcess = setInterval(async () => {
            const result = await this.makePin(cookie, sessionId, deviceId);
            if (result === false) {
                this.logMessage("Error: " + result);
            }
        }, (delay) * 1000);

        this.isBotRunning = true;
        this.logMessage("Bot PIN diaktifkan");
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    }

    stopPinBot() {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot PIN dinonaktifkan");
    }

    getLog(count: number) {
        if (count > this.log.length) {
            count = this.log.length;
        }
        return this.log.slice(this.log.length - count, this.log.length);
    }

    logMessage(message: string) {
        const time = new Date();
        this.log.push(message + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    }
}

export class BotBomKeranjangController {
    async makePurchase(session_id){
        var axios = require("axios").default;
        const x = await getRandomCookie()
        if(x == 'error'){
            this.logMessage('Error: User Lain tidak ditemukan!') 
        }
        var options = {
          method: 'POST',
          url: `https://live.shopee.co.id/api/v1/session/${session_id}/msg/buy`,
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
        try {
            const response = await axios.request(options)
            if(response.data.err_code !== 0){
                this.logMessage("Error: "+response.data.err_msg);
                return false;
            }
            this.logMessage(response.data)
            this.logMessage("Berhasil membeli produk");
            return true;
        }catch (error) {
            this.logMessage("Error: "+error.message);
            return false;
        }
    }
    log = [];
    botProcess = null;
    isBotRunning = false;
    get possibleAction(){
        if(this.isBotRunning){
            return "Nonaktifkan";
        }else{
            return "Aktifkan";
        }
    }
    async startBomKeranjangBot(sessionId, delay) {
        if(this.isBotRunning){
            this.logMessage("Error: Bot bom keranjang sudah berjalan");
            return false;
        }
        this.botProcess = setInterval(async () => {
            var x = await this.makePurchase(sessionId);
            if(x === false){
                this.logMessage("Error: "+x);
            }
        }, (delay) * 1000);
        this.isBotRunning = true;
        this.logMessage("Bot bom keranjang diaktifkan");
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    }
    logMessage(message:string){
        const time = new Date();
        this.log.push(message+" - "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
    }

    stopBomKeranjangBot() {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot bom keranjang dinonaktifkan");
    }
    getLog(count:number){
        //get last count log
        if(count > this.log.length){
            count = this.log.length;
        }
        return this.log.slice(this.log.length-count, this.log.length);
    }


}
export class BotCommentHostController {
    log = [];
    
    isBotRunning = false;
    get possibleAction() {
        if (this.isBotRunning) {
            return "Nonaktifkan";
        } else {
            return "Aktifkan";
        }
    }
    botProcess = null;
    generateUUID() {
        return uuidv4()
       }
    async  joinV2(cookie, session_id){
        var axios = require("axios").default;
        var choosenUUID = await this.generateUUID()
        var options = {
        method: 'POST',
        url: `https://live.shopee.co.id/api/v1/session/${session_id}/joinv2`,
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

        try {
            const response = await axios.request(options)
            // console.log(response.data)
            
            return {usersig: response.data.data.usersig, uuid: choosenUUID}
        }catch (error) {
            this.logMessage("Error: "+error.message);
            return false
        }
    }


    getLog(count: number) {
        if (count > this.log.length) {
            count = this.log.length;
        }
        return this.log.slice(this.log.length - count, this.log.length);
    }

    logMessage(message: string) {
        const time = new Date();
        this.log.push(message + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    }

    async startCommentHostBot(cookie:string, sessionId:string, deviceId:string,signature:string,uuid:string, message:string, delay) {
        if(this.isBotRunning){
            this.logMessage("Error: Bot komentar sudah berjalan");
            return false;
        }
        //Pisahkan produk dengan ";"
        let listKomentar = message.split(";");
        //get randomkomentar
        let pesan = listKomentar[Math.floor(Math.random() * listKomentar.length)];
        await this.makeComment(pesan, sessionId, cookie, deviceId, signature);
        this.botProcess = setInterval(async () => {
            let pesan = listKomentar[Math.floor(Math.random() * listKomentar.length)];
            const result = await this.makeComment(pesan, sessionId, cookie, deviceId, signature);
            if (result === false) {
                this.logMessage("Error: "+result);
            }
        }, (delay) * 1000);
        this.isBotRunning = true;
        this.logMessage("Bot komentar host diaktifkan")
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    }
    
    stopCommentHostBot() {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot komentar host dinonaktifkan");
    }

        

async  makeComment(message, sessionId, cookies, deviceId, usersig, isPin = false) {
    const url = `https://live.shopee.co.id/webapi/v1/session/${sessionId}/message`;

    const headers = {
        'authority': 'live.shopee.co.id',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,id;q=0.8',
        'client-info': 'platform=9',
        'content-type': 'application/json',
        'cookie': cookies,
        'origin': 'https://live.shopee.co.id',
        'referer': `https://live.shopee.co.id/pc/live?session=${sessionId}`,
        'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    };

    const data = {
        uuid: deviceId,
        usersig: usersig,
        content: `{"type":101,"content":"${message}"}`,
        pin: isPin,
    };

    try {
        const response = await axios.post(url, data, { headers });

        // Parse JSON response
        const responseData = response.data;

        // Check if err_msg exists
        if (responseData.err_msg) {
            const errMsg = responseData.err_msg;

            // Add your custom handling for err_msg
          
            this.logMessage(`Error: ${errMsg}`);
            return false;
            
        }

        // Check if data.message_id exists
        if (responseData.data && responseData.data.message_id) {
            this.logMessage(`Berhasil pin pesan: ${message}`);
            return true;
        }
    } catch (error) {
        this.logMessage(error);
        return false;
    }
}


    
}
const { v4: uuidv4 } = require('uuid');


export class BotLelangController{
    async cancelVoucher(cookie:string,sessionId:string,deviceId:string): Promise<boolean>{
        let data = JSON.stringify({
            "voucher": ""
          });
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `https://live.shopee.co.id/api/v1/session/${sessionId}/voucher/show`,
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
            'client-info': `device_id=${deviceId};device_model=iPhone%2014;os=1;os_version=17.2.1;client_version=31524;network=1;platform=2;language=id;cpu_model=ARM64E`, 
            'x-sap-ri': 'bb17ae65f1d6c9c80cb4192201db7e1a358e21c00705f085b70b', 
            'e0db90d5': 'Ilt0NRlzqi3Ig4YTp2JY/P8v86B=', 
            'af-ac-enc-id': 's6xalO7mrF2pSX1ljSaiWoqiN3waArH/VlSyqDaCpjA6m0njscE+IrsOBduPELWOXT+1sw==', 
            'af-ac-enc-dat': 'YWNzCjAwNAAITaj9N4YMMI0BAAABAgEAoAAAAGhlHaQ5TjoEJqeEadQM45xFmggx+Mk02NjSXw1ILBS7XD1pqfDA8opgsOzg1QzuG0yY2W5RPrxg7bDsXI+aGrIzqCNOay/XLqzsF5s0OJ6Gr+NejERJmUblh1FYQlZE+YeVOQXrdd7DghVL7GSGybQKB1BbzyYW7x4XGBcjgWyMGOdox9vDl6eOVTS3lRJA2ERJBvzEYQv8WznX4fDAwSQ=', 
            'x-sap-access-t': '1705908155', 
            'accept-language': 'id-ID,id,en-US,en', 
            'Cookie': cookie,
          },
          data : data
        };
    
        try{
            const response = await   axios.request(config)
            if(response.data.err_code != 0){
                this.logMessage("Error: "+response.data.err_msg);
                return false;
            }
            this.logMessage(JSON.stringify(response.data));
            this.logMessage("Berhasil menghapus voucher");
            return true;
        }catch(error){
            this.logMessage("Error: "+error.message);
            return false;
        }
    
        }

    async makeLelang(cookie, session_id, deviceId, title, price, timer){
        const axios = require('axios');
    let data = JSON.stringify({
    "rule": 1,
    "participation": 0,
    "title": title,
    "price": price,
    "timer": timer
    });

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://live.shopee.co.id/api/v1/auction/session/${session_id}/start`,
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
        'client-info': `device_id=${deviceId};device_model=iPhone%2014;os=1;os_version=17.2.1;client_version=31524;network=5;platform=2;language=id;cpu_model=ARM64E`, 
        'x-sap-ri': '0255bc65028280e5f365e7260115d3a82909cc7f48d3abc4b8ca', 
        '5b643eac': 'aYSsQPAcDT1njZjcSX4yrVno/DQ=', 
        'af-ac-enc-id': '2VhbjlZkSvyO0eU7fxtzFXOJr1N01XhAh7ynwX6BCe6jE8fC0xkHf/HcAzNq6okOtNGtIQ==', 
        'af-ac-enc-dat': 'YWNzCjAwNADxSl1lomurZ40BAAABAgEAoAAAAD3q7pC0KHhz3odjHx3xOCe5FRUHdCtb5coZbnYDl8mpmyfLfgIAOmuIgYjYTqIK4PdOaT6ZZWanJnPwD8a8QjK4i1ej+NL8HoyStJShZtHTUPpTfxbAFxouUWgxZykF3Zsy1nEaJuG0yAtYTEjY7zQQaZtgOaieJdBki+P4ICtaGbZpSPWAXY82pqezB7FMPgZDWmGgdsk1xMQ0AvJZ4uU=', 
        '4e04b7bd': 'UYPk6OEVlQoGdwo/iBrAN3Xsh1O=', 
        'accept-language': 'id-ID,id,en-US,en', 
        'Cookie': cookie
    },
    data : data
    };

    try {
    const response = await axios.request(config)
        this.logMessage("Berhasil membuat lelang");
        return true;
    } catch (error) {
        this.logMessage("Error: "+error.message);
        return false;
    }
}
    
        botProcess = null;
        isBotRunning = false;
        log = []
        get possibleAction() {
            if (this.isBotRunning) {
                return "Nonaktifkan";
            } else {
                return "Aktifkan";
            }
        }
    
        logMessage(message:string){
            const time = new Date();
            this.log.push(message+" - "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
        }
    
        async startLelangBot(cookie:string, sessionId:string, deviceId:string, title:string, price:string, timer:number, delay:number){
            if(this.isBotRunning){
                this.logMessage("Error: Bot lelang sudah berjalan");
                return false;
            }
            this.cancelVoucher(cookie, sessionId, deviceId);
            await this.makeLelang(cookie, sessionId, deviceId, title, price, timer);
            this.botProcess = setInterval(async () => {
                this.cancelVoucher(cookie, sessionId, deviceId);
                const result = await this.makeLelang(cookie, sessionId, deviceId, title, price, timer);
                if (result === false) {
                    this.logMessage("Error: "+result);
                }
            }, (delay + timer) * 1000);
            this.isBotRunning = true;
            this.logMessage("Bot lelang diaktifkan");
            return true;
        }
    
        stopLelangBot() {
            this.isBotRunning = false;
            clearInterval(this.botProcess);
            this.logMessage("Bot lelang dinonaktifkan");
        }
    
        getLog(count:number){
            if(count > this.log.length){
                count = this.log.length;
            }
            return this.log.slice(this.log.length-count, this.log.length);
        }




}


export class BotBomCommentController {
    generateUUID() {
        return uuidv4()
       }
    async  joinV2(cookie, session_id){
        var axios = require("axios").default;
        var choosenUUID = await this.generateUUID()
        var options = {
        method: 'POST',
        url: `https://live.shopee.co.id/api/v1/session/${session_id}/joinv2`,
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
    

        try {
            const response = await axios.request(options)
            // console.log(response.data)
            var t=response.data.data.usersig
            return {usersig: response.data.data.usersig, uuid: choosenUUID}
        }catch (error) {
            this.logMessage("Error: "+error.message);
            return false
        }
    }
    
    async  makeCommentOther(session_id, comment){
    
    var choosenCookie = await getRandomCookie()
    if(choosenCookie == 'error'){
        this.logMessage("Error: Gagal mendapatkan userlain")
        return false
        
    }
        var join = await this.joinV2(choosenCookie, session_id)
        if(!join){
            this.logMessage("Error: Gagal join session");
            return false;
        }

        var t = join.usersig
        var x = join.uuid

        
        var options = {
        method: 'POST',
        url: `https://live.shopee.co.id/api/v1/session/${session_id}/message`,
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
            "content": `{\"itemId\":0,\"content\":\"${comment}\",\"shopId\":0,\"type\":100,\"image\":null}`,
            "uuid": x
          }
        };
    
        try {
            const response = await axios.request(options)
           this.logMessage("Berhasil mengirim komentar");
            return true;
        }catch(error){
            this.logMessage(error)
            return false;
        }
    }

    botProcess = null;
    isBotRunning = false;
    log = []
    get possibleAction() {
        if (this.isBotRunning) {
            return "Nonaktifkan";
        } else {
            return "Aktifkan";
        }
    }

    logMessage(message:string){
        const time = new Date();
        this.log.push(message+" - "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
    }

    async startCommentBot(session_id:string, comment:string, delay:number){
        if(this.isBotRunning){
            this.logMessage("Error: Bot komentar sudah berjalan");
            return false;
        }
        var commentArray = comment.split(";");
        var randomComment = commentArray[Math.floor(Math.random() * commentArray.length)];

        await this.makeCommentOther(session_id, randomComment);
        this.botProcess = setInterval(async () => {
            randomComment = commentArray[Math.floor(Math.random() * commentArray.length)];
            const result = await this.makeCommentOther(session_id, randomComment);
            if (result === false) {
                this.logMessage("Error: "+result);
            }
        }, (delay) * 1000);
        this.isBotRunning = true;
        this.logMessage("Bot komentar diaktifkan");
        return true;
    }

    stopCommentBot() {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot komentar dinonaktifkan");
    }

    getLog(count:number){
        if(count > this.log.length){
            count = this.log.length;
        }
        return this.log.slice(this.log.length-count, this.log.length);
    }


    

}


export class BotBomShare{
    async makeShare(session_id: string){
        var choosenCookie = await getRandomCookie()
        if(choosenCookie == 'error'){
            this.logMessage("Error: Gagal mendapatkan userlain")
            return false
            
        }
        const options = {
        method: 'POST',
        url: `https://live.shopee.co.id/api/v1/session/${session_id}/msg/share`,
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
        data: {share_to: ''}
        };
        try{
            const response = await axios.request(options);
            if(response.data.err_code != 0){
                this.logMessage("Error: "+response.data.err_msg);
                return false;
            }
            this.logMessage("Berhasil mengirim share");
            return true;
        }catch(error){
            this.logMessage("Error: "+error.message);
            return false;
        }        

    }

    botProcess = null;
    isBotRunning = false;
    log = []
    get possibleAction() {
        if (this.isBotRunning) {
            return "Nonaktifkan";
        } else {
            return "Aktifkan";
        }
    }

    logMessage(message:string){
        const time = new Date();
        this.log.push(message+" - "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
    }

    async startShareBot(session_id:string, delay:number){
        if(this.isBotRunning){
            this.logMessage("Error: Bot share sudah berjalan");
            return false;
        }
        await this.makeShare(session_id);
        this.botProcess = setInterval(async () => {
            const result = await this.makeShare(session_id);
            if (result === false) {
                this.logMessage("Error: "+result);
            }
        }, (delay) * 1000);
        this.isBotRunning = true;
        this.logMessage("Bot share diaktifkan");
        return true;
    }

    stopShareBot() {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot share dinonaktifkan");
    }

    getLog(count:number){
        if(count > this.log.length){
            count = this.log.length;
        }
        return this.log.slice(this.log.length-count, this.log.length);
    }



}
export class BotBomLike{
    log = []

    async  makeLike(cookie:string,sessionId:string,deviceId:string){
    const axios = require('axios');
    let data = JSON.stringify({
    "like_cnt": 1
    });
    const x = await getRandomCookie()
    if(x == 'error'){
        this.logMessage('Gagal mendapatkan user cookie')
        return false
    }
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `https://live.shopee.co.id/api/v1/session/${sessionId}/like`,
  headers: { 
    'User-Agent': 'ShopeeID/3.15.24 (com.beeasy.shopee.id; build:3.15.24; iOS 17.2.1) Alamofire/5.0.5 language=id app_type=1 Cronet/102.0.5005.61', 
    'Accept-Encoding': 'gzip, deflate', 
    'Content-Type': 'application/json', 
    'client-info':`device_id=${deviceId};device_model=iPhone%2014;os=1;os_version=17.2.1;client_version=31524;network=1;platform=2;language=id;cpu_model=ARM64E`, 
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
  data : data
};


try {
    const response = await axios.request(config);
    if (response.data.err_code !== 0) {
        this.logMessage("Error: " + response.data.err_msg);
        return false;
    }
    this.logMessage("Berhasil like");
    return true;
} catch (error) {
    this.logMessage("Error: " + error.message);
    return false;
}



    }
    logMessage(message: string) {
        const time = new Date();
        this.log.push(message + " - " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
    }
    getLog(count: number) {
        if (count > this.log.length) {
            count = this.log.length;
        }
        return this.log.slice(this.log.length - count, this.log.length);
    }
    botProcess = null;
    isBotRunning = false;
    get possibleAction() {
        if (this.isBotRunning) {
            return "Nonaktifkan";
        } else {
            return "Aktifkan";
        }
    }
    async startLikeBot(cookie:string, sessionId:string, deviceId:string, delay) {
        if(this.isBotRunning){
            this.logMessage("Error: Bot like sudah berjalan");
            return false;
        }
        await this.makeLike(cookie, sessionId, deviceId);
        this.botProcess = setInterval(async () => {
            const result = await this.makeLike(cookie, sessionId, deviceId);
            if (result === false) {
                this.logMessage("Error: "+result);
            }
        }, (delay) * 1000);
        this.isBotRunning = true;
        this.logMessage("Bot like diaktifkan");
        return true;
    }

    stopLikeBot() {
        this.isBotRunning = false;
        clearInterval(this.botProcess);
        this.logMessage("Bot like dinonaktifkan");
    }


}