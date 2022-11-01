const wa = require('@open-wa/wa-automate');
var cron = require('node-cron'); 
var dayjs = require("dayjs");
const Controller = require("./controllers/controller.js"); 

// LIST TASK ======== 
var taskOto = true  
var taskOtoTagihan = true  
// ================================
wa.create({
    sessionId: "SBL",
    multiDevice: true, //required to enable multiDevice support
    authTimeout: 0, //wait only 60 seconds to get a connection with the host account device
    blockCrashLogs: true,
    disableSpins: true,
    headless: true,
    hostNotificationLang: 'PT_BR',
    logConsole: true,
    popup: true,
    qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
    restartOnCrash: start, 
    cacheEnabled: false, 
    useChrome: true, 
    killProcessOnBrowserClose: true, 
    throwErrorOnTosBlock: false, 
    chromiumArgs: [ '--no-sandbox', 
                    '--disable-setuid-sandbox', 
                    '--aggressive-cache-discard', 
                    '--disable-cache', '--disable-application-cache', 
                    '--disable-offline-load-stale-cache', 
                    '--disk-cache-size=0' 
    ]
}).then(client => start(client));

async function start(client) { 
     
    client.onMessage(async (message) => {
        try{
            console.log(message.from);
         
        } catch(error){
            console.log(`WARNIIIINGGGG!!!!!!!`);
            console.log(`--------------------------------------------------------`);
            console.log(error);
            console.log(`--------------------------------------------------------`);
        }
         
    }) 
      
    // Penjawabamn Otomatis 2 menit
    cron.schedule('*/2 * * * *', async() => {  
          if (taskOto) { 
            taskOto = false    
                try {  
                    console.log("[Start] Cek dan Kirim Pesan :: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )       
                    const data_pesan = await Controller.cekPesan()  
                    const concact = await Controller.getContact()
                    if(data_pesan !='None'){
                      const header = `📣 *Informasi*`
                      const respons = `${header}\n\n${data_pesan[0].pesan}\n\n_Last Update: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}_`
                      for(r of concact){  
                        if( r.phone !=""){         
                            await client.sendText(`${r.phone}@c.us`, respons);    
                        }
                      }
                      await Controller.updateFlag(data_pesan[0].id) 
                    }
                    console.log("[End] Cek dan Kirim Pesan :: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )       
                    taskOto = true

            } catch (err) {
                    console.log("[Error] Error Cek dan Kirim Pesan :: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )       
                    taskOto = true
                    console.log(err);
            }
          } 
    });

    cron.schedule('00 08 * * *', async() => {  
        if (taskOtoTagihan) { 
            taskOtoTagihan = false    
              try {  
                  console.log("[Start] Cek dan Kirim Pesan Tagihan:: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )       
                  const data_pesan = await Controller.cekPesanTagihan()
                  const concact = await Controller.getContact()
                  if(data_pesan !='None'){
                    for(r of concact){  
                      if( r.phone !=""){         
                          await client.sendText(`${r.phone}@c.us`, data_pesan);    
                      }
                    } 
                  }
                  console.log("[End] Cek dan Kirim Pesan Tagihan:: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )       
                  taskOtoTagihan = true

          } catch (err) {
                  console.log("[Error] Error Cek dan Kirim Pesan :: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )       
                  taskOtoTagihan = true
                  console.log(err);
          }
        } 
  });
   
     
}