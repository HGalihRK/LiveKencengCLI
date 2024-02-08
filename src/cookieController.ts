import { clearTerminal, getRandomCookie } from './helper';


const qr = require('qrcode-terminal');
const fs  = require('fs');
var xx = "";
const key = "mau liat apa bos????"
export function changeXX(x){
  xx = x;
}
const apiURL = 'https://member.botkenceng.com';
var rtmp = [];


async function generateQrCode() : Promise<string> {
  try {
    const response = await axios.get('https://shopee.co.id/api/v2/authentication/gen_qrcode');
    let validQR = false;
    console.log('Loading QR Code...');
    
    if (response.status === 200) {
      const QrCodeId = response.data.data.qrcode_id;
      const data = `https://shopee.co.id/universal-link/qrcode-login?id=${QrCodeId}`;
      while (true) {
        try {
          const statusResponse = await axios.get(`https://shopee.co.id/api/v2/authentication/qrcode_status?qrcode_id=${QrCodeId}`);
          const statusData = statusResponse.data.data;
          const currentStatus = statusResponse.data.data.status;
          


          if(currentStatus === 'NEW' && !validQR){
            clearTerminal();
            console.log('Scan QR Code Menggunakan Aplikasi Shopee');
            qr.generate(data, { small: true });
            validQR = true;
          }
          if (currentStatus === 'CONFIRMED') {
            console.log('QR Code Dikonfirmasi');
            const qrcodeToken = statusData.qrcode_token;
            const postData = {
              qrcode_token: qrcodeToken,
              device_sz_fingerprint: 'OazXiPqlUgm158nr1h09yA==|0/eMoV7m/rlUHbgxsRgRC/n0vyOe6XzhDMa2PcnZPv3ecioRaJQg2W7ur5GfhoDDEeuMz2az7GGj/8Y=|Pu2hbrwoH+45rDNC|08|3',
              client_identifier: {
                security_device_fingerprint: 'OazXiPqlUgm158nr1h09yA==|0/eMoV7m/rlUHbgxsRgRC/n0vyOe6XzhDMa2PcnZPv3ecioRaJQg2W7ur5GfhoDDEeuMz2az7GGj/8Y=|Pu2hbrwoH+45rDNC|08|3',
              },
            };
            const loginResponse = await axios.post('https://shopee.co.id/api/v2/authentication/qrcode_login', postData);

            if (loginResponse.headers['set-cookie']) {
              const cookies = loginResponse.headers['set-cookie'];
              console.log();
              const allCookies = cookies.map(cookie => cookie.split(';')[0]).join('; ');
              return allCookies;
            }
            break;
          }

          if (currentStatus === 'CANCELED') {
            console.log('Proses Login Dibatalkan');
            clearTerminal();
            return 'cancelled';
          }

          if (currentStatus === 'EXPIRED') {
            console.log('QR Code Kadaluarsa, Mereset QR Code...');
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            clearTerminal();
            return 'expired';
          }

          await new Promise(resolve => setTimeout(resolve, 2000)); 
        } catch (error) {
          await new Promise(resolve => setTimeout(resolve, 2000)); 
          clearTerminal();
          return 'error'
        }
      }
    } else {
      console.error('Failed to get QR code data');
      return 'error';
    }
  } catch (error:any) {
    console.error('Error fetching QR code:', error.message);
    console.log('Server error. Internet tidak stabil.. Mencoba lagi dalam 3 detik...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    return 'error';
  }
  return 'error';

}


function writeToCookieFile(content:string) {
    changeXX(content);
    //write to cookie.txt create if not exist
    fs.writeFile('cookie.txt', content, (err) => {
        if (err) {
            console.error(err);
            return false;
        }
    });
    return true;
  }

  export async function getCookie() {
    try {
      const cookies = await generateQrCode();
        if (cookies === 'cancelled') {
            console.log('Login dibatalkan');
            return false;
        }
        if (cookies === 'expired') {
            return getCookie();
        }
        if (cookies === 'error') {
            return getCookie();
        }

       if(writeToCookieFile(cookies)){
           console.log('Cookies berhasil disimpan');
            return true;
       }else{
              console.log('Cookies gagal disimpan');
              return false;
      }
        
    } catch (error: any) {
      console.error('Error menyimpan cookies:', error.message);
    }
  }

  export function readCookiesFromFile(filePath: string = 'cookie.txt') {
    return xx;
  }
  

  async function getData(key=null, cookies, ss=null) {
    try {
        var formdata = new FormData();
        formdata.append("cookie", cookies);
        const response = await axios.post(`${apiURL}/shopee/getBasicInfo`, formdata)
        const responseData = response.data;
        const sessionStatus = responseData.status;
        
        const sessionMessage = responseData.message;
        if (sessionStatus !== 'success' || responseData == null) {
            console.log(sessionMessage);
            await new Promise(resolve => setTimeout(resolve, 10000));
            process.exit(1);
        }
        const sessionData = responseData.data;


  
        const basicInfo = sessionData.basic_info


        const detailInfo = sessionData.detail_info.data
  
              
        if(sessionData.session_info == null) {
          console.log('User Belum Live! Start Live di Shopee terlebih dahulu!');
          return null;
      }
        const sessionInfo = sessionData.session_info.data.data.session

  

        rtmp = sessionData.rtmp
  
  
        if (basicInfo && detailInfo) {
          const sessionId = sessionInfo.session_id || '-';
          const deviceId = sessionInfo.device_id || '-';
          const sellerId = sessionInfo.uid || '-';
          const timestamp = sessionInfo.start_time || 0;
          const usernameId = sessionInfo.username || '-';
          const chatroomId = sessionInfo.chatroom_id || '-';
          const usersig = sessionInfo.usersig || '-';
          const shareurl = sessionInfo.share_url || '-';
          const title = sessionInfo.title || '-';
          const live = sessionInfo.status || '-';
          const timestampInSeconds = timestamp / 1000;
          const tanggalMulai = new Date(timestampInSeconds).toLocaleString('en-US', { day: 'numeric', month: 'short' });
          const jamMulai = new Date(timestampInSeconds).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
          const statusLive = (live == "1") ? "RUNNING" : "STOP";


          return {
            sessionId,
            deviceId,
            chatroomId,
            usersig,
            shareurl,
            title,
            live,
            timestampInSeconds,
            tanggalMulai,
            jamMulai,
            statusLive,
            usernameId,
            sellerId
        };
        } else {
            console.log(response.data);
            return null;
            
        }
    } catch (error) {
        
        console.error(error.message);
        await new Promise(resolve => setTimeout(resolve, 10000));
        process.exit(1);
    }
  }
  

  export async function getUserDetail(ss = null) {
    const cookies = readCookiesFromFile('cookie.txt');

    
    if(!cookies){
        return {
          status: 'auth_error',
          username: undefined,
          session_id: undefined,
          cookies: undefined,
          device_id: undefined,
          user_sig: undefined,
          chatroomId: undefined,

        };
      }
    
    try {
        const {            sessionId,
      deviceId,
      chatroomId,
      usersig,
      shareurl,
      title,
      live,
      timestampInSeconds,
      tanggalMulai,
      jamMulai,
      statusLive,
      usernameId,
      sellerId } = await getData(key, readCookiesFromFile('cookie.txt'), ss);
      if (!sessionId) {
        return {
          status: false,
          response: "auth_error",
          session_id: undefined,
          cookies: undefined,
          device_id: undefined,
          user_sig: undefined,
          chatroomId: undefined,


        };
      }
  
      const session_id = sessionId;
      const device_id = deviceId;
      const username = usernameId;
      return {
        status: 'success',
        username: username,
        session_id,
        cookies,
        device_id,
        usersig,
        chatroomId
  }
    } catch (error) {
      return {
        status: 'code_error',
        username: undefined,
        session_id: undefined,
        cookies: undefined,
        device_id: undefined,
        user_sig: undefined,
        chatroomId: undefined,


      };
    }
  }

 export async function checkUsername(usrname: string) {
    try {
      
      
      const response = await fetch(`https://livekenceng.xyz/check_username?username=${usrname}`);
      const data = await response.json();
  
      if (data.exists) {
        // Username exists
        return true;
      } else {
        // Username does not exist
        return false;
      }
    } catch (error) {
      return 'error'; // Handle errors gracefully
    }
  }



  const axios = require('axios');

 export async function getRMTP(cookies,ss) {
  return rtmp;
  
  }
  
  // Call the function
  
  


export async function getUserSig(cookies, session_id,device_id) {

  try {
      const sigUrl = `https://live.shopee.co.id/webapi/v1/session/${session_id}/preview?uuid=${device_id}&ver=2`;

      const response = await axios.get(sigUrl, {
          headers: {
              'Cookie': cookies,
              'referer': `https://live.shopee.co.id/pc/preview?session=${session_id}`,
          }
      });

      const sigData = response.data;

      if (sigData && sigData.err_code === 0 && sigData.data && sigData.data.usersig) {
        console.log(sigData.data);
          const usersig = sigData.data.usersig;
          const pushUrl = sigData.data.push_url;
          return {usersig, pushUrl};
      } else {
          console.error("Error:", sigData.err_msg || "Invalid response format");
          if(sigData.err_code === 1005){
            //delete content inside cookie.txt
            changeXX("");
          }
          return {usersig: null, pushUrl: null};
      }
  } catch (error) {
      console.error("Error:", error.message || error);
      return null;
      
  }
}

module.exports = { getCookie,getRandomCookie, checkUsername, getUserDetail, getUserSig, getRMTP, changeXX, readCookiesFromFile};
