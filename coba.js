var axios = require('axios');
var apiURL = 'http://127.0.0.1:8001';
async function getData(cookies) {
  try {
      var formdata = new FormData();
      formdata.append("cookie", cookies);
      const response = await axios.post(`${apiURL}/shopee/getBasicInfo`, formdata)
      const responseData = response.data;
      if(!response) {
          console.log('No response');
          return null;
      }
      const sessionStatus = responseData.status;
      const sessionMessage = responseData.message;
      const sessionData = responseData.data;
      if (sessionStatus !== 'success' || responseData == null) {
          console.log(sessionMessage);
      }

    

      const basicInfo = sessionData.basic_info
      const detailInfo = sessionData.detail_info.data
      const sessionInfo = sessionData.session_info.data.data.session

      if(sessionInfo == null) {
          console.log('User Belum Live! Start Live di Shopee terlebih dahulu!');
          return null;
      }


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
      return null;
  }
}


async function main() {
  var x = await getData('SPC_ST=.Z2NvSE5OcnlFVFNZQXduZzPipk7RUjCoJDhByETj+iJm5t27shg6wnnS52YZ/rmL6u1XdpcYNXYmXfyUOjZQVBFnGmbeNoXTn+QsfnKIxGCsVgvUQlWf2BC4iNg6tjXKIduDrSOyR++IHkIOjJJ3TzVFQ1ygX2MNuK484B6I8YumZo4HIAT2mTQMUa6Y/z2GvAdzTeicHFvI5VF2QzgKSQ==; SPC_SI=qPjBZQAAAAB3VEZURVJnRJGfAgAAAAAAaFN5cGxlZDI=; SPC_SEC_SI=v1-WUhGVm1YV2NpQUJFRFFEUkMloUSarUG8kluvnQHPufMvis+k+cSH6PvLcZWUKCv7srPX+J7LNq61jHnh8G9Ta2qcdTwuB4aIBG9hxe3tB+I=; REC_T_ID=563ffcb2-c4ed-11ee-9f63-de3ea680cbb6; SPC_R_T_IV=ZWt3NkJGRU8wS2RvZWo4OQ==; SPC_EC=.Z2NvSE5OcnlFVFNZQXduZzPipk7RUjCoJDhByETj+iJm5t27shg6wnnS52YZ/rmL6u1XdpcYNXYmXfyUOjZQVBFnGmbeNoXTn+QsfnKIxGCsVgvUQlWf2BC4iNg6tjXKIduDrSOyR++IHkIOjJJ3TzVFQ1ygX2MNuK484B6I8YumZo4HIAT2mTQMUa6Y/z2GvAdzTeicHFvI5VF2QzgKSQ==; SPC_F=DUQI2s8c3pNuLbkiss0z5RtmLOygZMbS; SPC_R_T_ID=I8x57y4VREPJ74glQcBvuLO+35gfIRwCe3GdamnhELF6DspljeHMzPDWz1zTuzc7RU69raiB7h+4WIaU80k0BTV/HX/cUeZZivoUh3c8FCLTIOAf+aI4JgoJlpnetMMut4dS4a0A9rzjnd/YNyXgVN/FX9XkDxXAqcCYr7GXbOA=; SPC_T_ID=I8x57y4VREPJ74glQcBvuLO+35gfIRwCe3GdamnhELF6DspljeHMzPDWz1zTuzc7RU69raiB7h+4WIaU80k0BTV/HX/cUeZZivoUh3c8FCLTIOAf+aI4JgoJlpnetMMut4dS4a0A9rzjnd/YNyXgVN/FX9XkDxXAqcCYr7GXbOA=; SPC_T_IV=ZWt3NkJGRU8wS2RvZWo4OQ==')
  console.log(x)
  console.log(x.sessionId)
  console.log(x.deviceId)
  console.log(x.chatroomId)
  console.log(x.usersig)
  console.log(x.shareurl)
  console.log(x.title)
  console.log(x.live)
  console.log(x.timestampInSeconds)
  console.log(x.tanggalMulai)
  console.log(x.jamMulai)
  console.log(x.statusLive)
  console.log(x.usernameId)
  console.log(x.sellerId)
}

main()
