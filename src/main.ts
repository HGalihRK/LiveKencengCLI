
import { clear } from 'console';
import { AutoBannedController, BotBomCommentController, BotBomKeranjangController, BotBomLike, BotBomShare, BotCommentHostController, BotLelangController, BotPinController, BotVoucherController } from './botController';
import { changeXX,checkUsername, getCookie, getRMTP, getUserDetail, getUserSig, readCookiesFromFile } from './cookieController';
import { askQuestion, clearTerminal } from './helper';

const chalk = require('chalk');
    const yellow = chalk.hex('#FFBF00');
    const red = chalk.bold.red;
    const green = chalk.bold.green;
    const blue = chalk.bold.blue;
    const appVer = "version3"
    async function checkUpdate(){
    const fs = require('fs');
    const path = require('path');
    
    var x = await checkUsername(appVer);

    

    while(x == 'error'){
        console.log(red('Tidak dapat terhubung ke server...'));
        var x = await checkUsername(appVer);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if(!x){
        console.log(red('Versi baru terdeteksi!'));
        await downloadAndDelete();
        process.exit(1);
    }
}


var axios = require('axios');
var fs = require('fs');
var path = require('path');
async function downloadAndDelete() {
    // URL untuk mengunduh file
    const downloadUrl = 'https://livekenceng.xyz/download_exe';
    let retryCount = 0;
    const maxRetries = 3;
    let fileStream; // Deklarasi fileStream di luar blok try

    while (retryCount < maxRetries) {
        retryCount++;
        // Tampilkan pesan sedang mengunduh
        console.log(chalk.green('Sedang mengunduh... Mohon tunggu.'));

        try {
            // Lakukan pengunduhan
            const response = await axios({
                method: 'get',
                url: downloadUrl,
                responseType: 'stream',
            });

            // Buat stream untuk menyimpan file yang diunduh
            // Generate tanggal seperti 1_JAN_2021
            var date = new Date();
            // Format tanggal seperti 1_JAN_2021
            var formattedDate = date.getDate() + "_" + date.toLocaleString('default', { month: 'short' }).toUpperCase() + "_" + date.getFullYear();

            const fileName = 'LiveKencengCLI_' + formattedDate + '.exe';
            fileStream = fs.createWriteStream(fileName);

            // Alirkan data respons ke stream file
            response.data.pipe(fileStream);

            // Tunggu hingga stream file selesai menulis
            await new Promise((resolve, reject) => {
                fileStream.on('finish', resolve);
                fileStream.on('error', reject); // Tangani kesalahan saat menulis file
            });

            console.log(chalk.green('Unduhan selesai.'));
            await new Promise(resolve => setTimeout(resolve, 3000));
            return; // Keluar dari fungsi jika pengunduhan berhasil

        } catch (error) {
            if (axios.isAxiosError(error) && !error.response) {
                console.error('Koneksi internet terputus. Menunggu 10 detik sebelum mencoba lagi...');
                await new Promise(resolve => setTimeout(resolve, 10000));
            } else {
                console.error('Kesalahan saat mengunduh:', error.message);
                console.log(chalk.red(`Tunjukkan pesan ini kepada admin`));
                if (retryCount < maxRetries) {
                    console.log(`Mencoba lagi untuk ke-${retryCount} dalam 10 detik...`);
                    await new Promise(resolve => setTimeout(resolve, 10000)); // Tunggu sebelum mencoba lagi
                } else {
                    console.error('Mencoba sebanyak 3 kali, tidak dapat melanjutkan...');
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        } finally {
            // Bersihkan: Tutup stream file jika masih terbuka
            if (fileStream) {
                fileStream.end(); // Pastikan stream ditutup
            }
        }
    }
}




async function main(){
    await checkUpdate();
    // const fs = require('fs');
    // fs.writeFileSync('cookie.txt', '');
    const botVoucherController = new BotVoucherController();
    const botPinController = new BotPinController();
    const botChatHostController = new BotCommentHostController();
    const botBomLike = new BotBomLike();
    const botBomCommentController = new BotBomCommentController();
    const botShare = new BotBomShare();
    const botBomKeranjang = new BotBomKeranjangController();
    const botAutoLelang = new BotLelangController();
    const botAutoBanned = new AutoBannedController();
    console.log(yellow('SHOPEE BOT LIVE KENCENG'));
    console.log(yellow('Telegram: t.me/livekenceng'));
    console.log(yellow('Whatsapp: 0881082331658'));
    console.log(yellow('===================================='));
    var fs = require('fs');
    //create cookie.txt if not exist
    //DEBUG
    //DEBUG
    while(readCookiesFromFile() == null || readCookiesFromFile() == undefined || readCookiesFromFile() == ''){
         console.log(red('Cookie tidak terdeteksi!'));
         await getCookie();
    }
    

    

    let userDetail = await getUserDetail();

    let userSig = userDetail.usersig;
    
    if(userDetail.status == 'license_error'){
        console.log(red('Username: '+ userDetail.username));
        console.log(red('Lisensi tidak valid, silahkan hubungi admin'));
        await new Promise(resolve => setTimeout(resolve, 5000));
        return process.exit(1);
        
    }

   

    if(!userSig || userSig == null){
        userSig = 'Error';
    }
    

 
    while(true){
        clearTerminal();
        console.log(yellow('SHOPEE BOT LIVE KENCENG'));
        console.log(yellow('Telegram: https://t.me/livekenceng'));
        console.log(yellow('Whatsapp: +62881082331658'));
        console.log(red('===================================='));
        while(userDetail.username == undefined){
            console.log(red('Pengguna belum memulai live...'));
            console.log(red('Silahkan mulai live terlebih dahulu di aplikasi Shopee...'));
            await askQuestion(red("Tekan enter untuk mencoba lagi..."));
            userDetail = await getUserDetail();
            clearTerminal();
        }
        console.log(green('Username: ' + userDetail.username));
        console.log(green('Session ID: ' + userDetail.session_id));
        console.log(green('Device ID: ' + userDetail.device_id));
        if(userSig == 'Error'){
            console.log(red('User Signature: ' + userSig));
        }
        else{
            console.log(green('User Signature: ' + userSig));
        }
        console.log(green('Link Share Live: '+`https://live.shopee.co.id/share?from=live&session=${userDetail.session_id}&in=1`));
        console.log(green('Link Dashboard: '+`https://creator.shopee.co.id/dashboard/live/${userDetail.session_id}`));
        console.log(red('===================================='));
        //debug
        //userDetail.session_id = "58347575";
        //debug
        console.log(`[1] ${botVoucherController.possibleAction} Auto Voucher` + red('(Maintenance)'));
        console.log(`[2] ${botPinController.possibleAction} Auto Pin Produk`)
        console.log(`[3] ${botChatHostController.possibleAction} Auto Chat Host `+red('(Maintenance)'))
        console.log(`[4] Pin Chat Host `+red('(Maintenance)'))
        console.log(`[5] Lihat RTMP dan KEY Anti Banned`)
        console.log(`[6] ${botBomLike.possibleAction} Bot Bom Like`);
        console.log(`[7] ${botShare.possibleAction} Bot Bom Share`);
        console.log(`[8] ${botBomCommentController.possibleAction} Bot Komentar Orang Lain`);
        console.log(`[9] ${botAutoLelang.possibleAction} Bot Auto Lelang`);
        console.log(`[10] ${botAutoBanned.possibleAction} Bot Banned + Blokir Komentar`);
        console.log(`[11] ${botBomKeranjang.possibleAction} Bot Bom Keranjang`);


        console.log("[12] Keluar & Logout");
        console.log("[13] Perbarui Device ID");

        const menu = await askQuestion("Pilih Menu: ");
        clearTerminal();

        if(menu == '1'){
            console.log(blue('Auto Voucher'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));
            console.log(red('Fitur ini sedang maintenance...'));
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
            if(botVoucherController.isBotRunning){
                const voucherLog = botVoucherController.getLog(5);
                console.log(green('Log:'));
                voucherLog.forEach((log:string) => {
                    console.log(green(log));
                });
                const asnwer = await askQuestion("Yakin ingin mematikan bot voucher? (y/n): ");
                if(asnwer == 'y'){
                    botVoucherController.stopVoucherBot();
                    console.log(red('Bot voucher dimatikan'));
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                console.log(red('Dibatalkan. Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(yellow('Contoh delay: 10. Maka setiap voucher jeda (30 + 10) = 40 detik'));
            const delay = await askQuestion("Masukkan delay (detik): ");

            if(delay == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            if(isNaN(parseInt(delay))){
                console.log(red('Delay harus berupa angka!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(green('Bot Voucher dimulai...'));
            botVoucherController.startVoucherBot(userDetail.cookies, userDetail.session_id, userDetail.device_id, parseInt(delay));
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        else if(menu == '2'){
            console.log(blue('Auto Pin Produk'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));
            if(botPinController.isBotRunning){
                const pinLog = botPinController.getLog(5);
                console.log(green('Log:'));
                pinLog.forEach((log:string) => {
                    console.log(green(log));
                });
                const asnwer = await askQuestion("Yakin ingin mematikan bot pin produk? (y/n): ");
                if(asnwer == 'y'){
                    botPinController.stopPinBot();
                    console.log(red('Bot Pin Produk dimatikan'));
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                console.log(red('Dibatalkan. Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(yellow('Contoh delay: 10. Maka setiap 10 detik akan pin produk'));
            const delay = await askQuestion("Masukkan delay (detik): ");

            if(delay == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            if(isNaN(parseInt(delay))){
                console.log(red('Delay harus berupa angka!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
    
            botPinController.startPinBot(userDetail.cookies, userDetail.session_id, userDetail.device_id, parseInt(delay));
            console.log(green('Bot Pin Produk dimulai...'));
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        else if(menu == '3'){
            console.log(blue('Auto Chat Host'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));
            
            console.log(red('Fitur ini sedang maintenance...'));

            
            if(botChatHostController.isBotRunning){
                const chatLog = botChatHostController.getLog(5);
                console.log(green('Log:'));
                chatLog.forEach((log:string) => {
                    console.log(green(log));
                });
                const asnwer = await askQuestion("Yakin ingin mematikan bot chat host? (y/n): ");
                if(asnwer == 'y'){
                    botChatHostController.stopCommentHostBot();
                    console.log(red('Bot Chat Host dimatikan'));
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                console.log(red('Dibatalkan. Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(yellow('Contoh delay: 10. Maka setiap 10 detik akan chat host'));
            const delay = await askQuestion("Masukkan delay (detik): ");

            if(delay == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            if(isNaN(parseInt(delay))){
                console.log(red('Delay harus berupa angka!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            const comment = await askQuestion("Masukkan komentar (pisahkan dengan ';'): ");
            if(comment == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            botChatHostController.startCommentHostBot(readCookiesFromFile(), userDetail.session_id, userDetail.device_id, userSig, userDetail.device_id,comment, parseInt(delay));
            console.log(green('Bot Chat Host dimulai...'));
            await new Promise(resolve => setTimeout(resolve, 1500));
            
        }
        else if(menu == '4'){
            console.log(blue('Pin Komentar'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));

        
            if(userSig == 'Error'){
                console.log(red('User Signature tidak ditemukan, fitur ini tidak dapat digunakan...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            if(userDetail.device_id == ""){
                console.log(red('Device ID tidak ditemukan, fitur ini tidak dapat digunakan...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            const comment = await askQuestion("Masukkan komentar: ");
            if(comment == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            console.log(green('Pin Komentar dimulai...'));
            await new Promise(resolve => setTimeout(resolve, 1500));
            const pinComment = await botChatHostController.makeComment(comment, userDetail.session_id, readCookiesFromFile(), userDetail.device_id, userSig, true);
            if(pinComment){
                console.log(green('Komentar berhasil di pin!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }else{
                console.log(red('Komentar gagal di pin!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
        }

        else if(menu == '5'){
            console.log(blue('RTMP dan KEY Anti Banned'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));
            await askQuestion(red("TEKAN ENTER JIKA SUDAH LIVE!!!"));
            userDetail = await getUserDetail();
            userSig = userDetail.usersig;
            console.log(green('Session ID berhasil diperbarui!'));
            await new Promise(resolve => setTimeout(resolve, 1000));
            const x = await getRMTP(userDetail.cookies,userDetail.session_id);
            if(!x){
                console.log(red('RTMP dan KEY tidak ditemukan, silahkan coba lagi...'));
            }
            if(x.length == 0){
                console.log(red('RTMP dan KEY tidak ditemukan, silahkan coba lagi...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(green('RTMP dan KEY. Tersedia: ' + x.length + ' RTMP'));

            x.forEach((url:string, index:number) => {
                console.log(('['+(index+1)+'] ' + "RTMP Ke " + (index+1)))
            });

            const index = await askQuestion("Pilih : ");

            if(index == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            if(isNaN(parseInt(index))){
                console.log(red('Pilihan harus berupa angka!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            
            if(parseInt(index) > x.length){
                console.log(red('Pilihan tidak ditemukan!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }


            const fixedIndex = parseInt(index) - 1;
            const randomURL = x[fixedIndex];
            const regex = /(rtmp:\/\/[^\/]+\/[^\/]+\/)(.*)/;

            const [, RTMP, KEY] = randomURL.match(regex);
            console.log(green('RTMP URL: ' + RTMP));
            console.log(green('KEY: ' + KEY));
            await askQuestion("Tekan enter untuk kembali ke menu utama");
            continue;
        }
        else if(menu == '6'){
            console.log(blue('Bom Like'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));
            if(botBomLike.isBotRunning){
                const bomLikeLog = botBomLike.getLog(5);
                console.log(green('Log:'));
                bomLikeLog.forEach((log:string) => {
                    console.log(green(log));
                });
                const asnwer = await askQuestion("Yakin ingin mematikan bot bom like? (y/n): ");
                if(asnwer == 'y'){
                    botBomLike.stopLikeBot();
                    console.log(red('Bot bom like dimatikan'));
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                console.log(red('Dibatalkan. Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(yellow('Contoh delay: 10. Maka setiap 10 detik akan bom like'));
            const delay = await askQuestion("Masukkan delay (detik): ");

            if(delay == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            if(isNaN(parseInt(delay))){
                console.log(red('Delay harus berupa angka!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
    
            botBomLike.startLikeBot(userDetail.cookies, userDetail.session_id, userDetail.device_id, parseInt(delay));
            console.log(green('Bot bom like dimulai...'));
            await new Promise(resolve => setTimeout(resolve, 1500));
        }else if(menu == '7'){
            console.log(blue('Bom Share'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));
            if(botShare.isBotRunning){
                const bomShareLog = botShare.getLog(5);
                console.log(green('Log:'));
                bomShareLog.forEach((log:string) => {
                    console.log(green(log));
                });
                const asnwer = await askQuestion("Yakin ingin mematikan bot bom share? (y/n): ");
                if(asnwer == 'y'){
                    botShare.stopShareBot();
                    console.log(red('Bot bom share dimatikan'));
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                console.log(red('Dibatalkan. Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(yellow('Contoh delay: 10. Maka setiap 10 detik akan 1 share'));
            const delay = await askQuestion("Masukkan delay (detik): ");

            if(delay == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            if(isNaN(parseInt(delay))){
                console.log(red('Delay harus berupa angka!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
    
            botShare.startShareBot(userDetail.session_id,parseInt(delay));
            console.log(green('Bot bom share dimulai...'));
            await new Promise(resolve => setTimeout(resolve, 1500));
            
        }else if(menu == '8'){
            console.log(blue('Bom Komentar Orang Lain'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));
            if(botBomCommentController.isBotRunning){
                const bomCommentLog = botBomCommentController.getLog(5);
                console.log(green('Log:'));
                bomCommentLog.forEach((log:string) => {
                    console.log(green(log));
                });
                const asnwer = await askQuestion("Yakin ingin mematikan bot bom komentar orang lain? (y/n): ");
                if(asnwer == 'y'){
                    botBomCommentController.stopCommentBot();
                    console.log(red('Bot bom komentar orang lain dimatikan'));
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                console.log(red('Dibatalkan. Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(yellow('Contoh delay: 10. Maka setiap 10 detik akan 1 komentar'));
            const delay = await askQuestion("Masukkan delay (detik): ");

            if(delay == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            if(isNaN(parseInt(delay))){
                console.log(red('Delay harus berupa angka!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(yellow('Komentar dapat dipisahkan dengan tanda ";"'));
            console.log(yellow('Contoh komentar: "Mantap gan! Semangat terus!; Sudah checkout kakakkk"'));
            const comment = await askQuestion("Masukkan komentar: ");
            if(comment == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            if(comment == ''){
                console.log(red('Komentar tidak boleh kosong!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
    
            botBomCommentController.startCommentBot(userDetail.session_id,comment,parseInt(delay));
            console.log(green('Bot bom komentar orang lain dimulai...'));
            await new Promise(resolve => setTimeout(resolve, 1500));
        }else if(menu == '9'){
            console.log(blue('Bot Auto Lelang'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));
            if(botAutoLelang.isBotRunning){
                const lelangLog = botAutoLelang.getLog(5);
                console.log(green('Log:'));
                lelangLog.forEach((log:string) => {
                    console.log(green(log));
                });
                const asnwer = await askQuestion("Yakin ingin mematikan bot auto lelang? (y/n): ");
                if(asnwer == 'y'){
                    botAutoLelang.stopLelangBot();
                    console.log(red('Bot auto lelang dimatikan'));
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                console.log(red('Dibatalkan. Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(yellow('Contoh delay: 10. Maka selisih 10 detik setelah lelang terakhir akan lelang'));
            const delay = await askQuestion("Masukkan delay (detik): ");

            if(delay == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            if(isNaN(parseInt(delay))){
                console.log(red('Delay harus berupa angka!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            const title = await askQuestion("Masukkan judul lelang: ");
            if(title == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            const price = await askQuestion("Masukkan harga lelang: ");
            if(price == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            
    
            botAutoLelang.startLelangBot(readCookiesFromFile(), userDetail.session_id, userDetail.device_id, title, price, 120, parseInt(delay));
            console.log(green('Bot auto lelang dimulai...'));
            await new Promise(resolve => setTimeout(resolve, 1500));
      
        }else if(menu == '10'){
            console.log(blue('Ban Komentar'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));
            if(botAutoBanned.isBotRunning){
                const bannedLog = botAutoBanned.getLog(5);
                console.log(green('Log:'));
                bannedLog.forEach((log:string) => {
                    console.log(green(log));
                });
                const asnwer = await askQuestion("Yakin ingin mematikan bot banned? (y/n): ");
                if(asnwer == 'y'){
                    botAutoBanned.stopAutoBannedBot();
                    console.log(red('Bot banned dimatikan'));
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                console.log(red('Dibatalkan. Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(yellow('Contoh keyword: nipu;rekaman;report;parah;jelek'));
            var keywords = await askQuestion("Keyword banned (pisahkan dengan ;): ");
            if(keywords == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            if(keywords == ''){
                console.log(red('Keyword tidak boleh kosong!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            var array_keywords = keywords.split(';');
            console.log(green('Bot banned dimulai...'));
            botAutoBanned.startAutoBannedBot(userDetail.session_id, userDetail.chatroomId, array_keywords);
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
        
        else if(menu == '11'){
            console.log(blue('Bom Keranjang'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));
            if(botBomKeranjang.isBotRunning){
                const bomKeranjangLog = botBomKeranjang.getLog(5);
                console.log(green('Log:'));
                bomKeranjangLog.forEach((log:string) => {
                    console.log(green(log));
                });
                const asnwer = await askQuestion("Yakin ingin mematikan bot bom keranjang? (y/n): ");
                if(asnwer == 'y'){
                    botBomKeranjang.stopBomKeranjangBot();
                    console.log(red('Bot bom keranjang dimatikan'));
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                console.log(red('Dibatalkan. Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(yellow('Contoh delay: 10. Maka setiap 10 detik akan muncul 1 keranjang'));
            const delay = await askQuestion("Masukkan delay (detik): ");

            if(delay == '0'){
                console.log(red('Pergi ke menu utama...'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }

            if(isNaN(parseInt(delay))){
                console.log(red('Delay harus berupa angka!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
        

    
            botBomKeranjang.startBomKeranjangBot(userDetail.session_id,parseInt(delay));
        }

        else if(menu == '12'){
            console.log(red('Keluar & Logout'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));
            const asnwer = await askQuestion("Yakin ingin keluar? (y/n): ");
            if(asnwer == 'y'){
                console.log(green('Logout...'));
                //emtpy cookie.txt
                const fs = require('fs');
                const filePath = 'cookie.txt';
                try {
                    fs.writeFileSync(filePath, '');
                } catch (err) {
                    console.log(err);
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
                process.exit(1);
            }
            console.log(red('Dibatalkan. Pergi ke menu utama...'));
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
        
        }else if(menu == '13'){
            console.log(red('Perbarui Device ID'));
            console.log(red('===================================='));
            console.log("[0] Kembali ke menu utama")
            console.log(red('===================================='));
            const asnwer = await askQuestion("Yakin ingin memperbarui Device ID? (y/n): ");
            if(asnwer == 'y'){
                userDetail = await getUserDetail();
                
                userSig = userDetail.usersig;
                
                console.log(green('Device ID berhasil diperbarui!'));
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            console.log(red('Dibatalkan. Pergi ke menu utama...'));
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
        }

        else{
            console.log(red('Menu tidak ditemukan!'));
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
        }
        
    }
}

main();