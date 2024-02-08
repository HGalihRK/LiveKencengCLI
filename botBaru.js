const { randomBytes } = require('crypto');
const { v4: uuidv4 } = require('uuid');

function generateUUID() {
   return uuidv4()
  }
// Example usage
async function getRandomCookie(){

    const axios = require('axios');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://ez-bot.net/mmk/kuntul.php',
      headers: { }
    };
    let response = await axios(config);
    cookieValueArray = response.data

    //combine all cookie value
    let cookieValue = ''
    for (let i = 0; i < cookieValueArray.length; i++) {
        cookieValue += cookieValueArray[i].name + '=' + cookieValueArray[i].value + '; '
    }
    return cookieValue
}


async function makePurchase(session_id){
    var axios = require("axios").default;

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
        cookie: await getRandomCookie()
      }
    };
    try {
        const response = await axios.request(options)
        console.log(response.data)
    }catch (error) {
        console.error(error)
    }
}



async function joinV2(cookie, session_id){
    var axios = require("axios").default;
    var choosenUUID = await generateUUID()
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

    console.log({
        is_boost: false,
        recommendation_extra:  JSON.stringify({ "rrkpos": "", "from_source": "share", "scene": "", "ques": "" }),
        joinv2_watch_id: '5AF65F15-2479-4DAF-9A06-AB2CDA248B98',
        need_follow_session: true,
        uuid: choosenUUID,
    })
    try {
        const response = await axios.request(options)
        // console.log(response.data)
        console.log("USERSIG: "+response.data.data.usersig)
        console.log("UUID: "+choosenUUID)
        t=response.data.data.usersig
        return {usersig: response.data.data.usersig, uuid: choosenUUID}
    }catch (error) {
        console.error("Join Error:"+error)
        return false
    }
}

async function makeCommentOther(session_id, comment){
var axios = require("axios").default;

choosenCookie = await getRandomCookie()
    var join = await joinV2(choosenCookie, session_id)
    t = join.usersig
    x = join.uuid

    console.log("USERSIG: "+t)
    console.log("UUID: "+x)
    
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
        console.log(response.data)
    }catch(error){
        console.error(error)
    }
}


async function visit()




makeCommentOther(58053784, 'Jagat ganteng')


