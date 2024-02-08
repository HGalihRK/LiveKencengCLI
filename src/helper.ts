import * as readline from 'readline';
import { stdin, stdout } from 'process';

function clearTerminal(): void {
    stdout.write('\x1bc');
}

function askQuestion(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: stdin,
        output: stdout,
        terminal: false  // Set terminal to false to enable raw mode
    });

    return new Promise<string>((resolve) => {
        rl.question(question, (answer) => {
            // TODO: Log the answer in a database

            rl.close();
            resolve(answer);
        });
    });
}

async function getRandomCookie(){
    var cookieValueArray = []
    const axios = require('axios');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://ez-bot.net/mmk/kuntul.php',
      headers: { }
    };
    try{
        let response = await axios(config);
        cookieValueArray = response.data
    
        //combine all cookie value
        let cookieValue = ''
        for (let i = 0; i < cookieValueArray.length; i++) {
            cookieValue += cookieValueArray[i].name + '=' + cookieValueArray[i].value + '; '
        }
        return cookieValue
    }catch{
        return 'error'
    }
   
}


export { clearTerminal, askQuestion, getRandomCookie };
