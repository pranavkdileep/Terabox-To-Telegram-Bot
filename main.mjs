import {Telegraf} from 'telegraf';
import fs from 'fs';
import {Downloader} from 'nodejs-file-downloader';
import {MessageHaveLink, GetDownloadableLink} from './utils.mjs';
import express from 'express';

const app = express();
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/dl", (req, res) => {
    const path = req.query.name;
    res.download("./Files/"+path);
});

const publicURL = "https://terabox-to-telegram-bot.onrender.com/dl?name=";

const BotToken = "6660892564:AAHk03a2AnZpszg-wRBYJ8iSeJd7mtz61-c";
const ChatID = "1196575861";
const bot = new Telegraf(BotToken);

const ReportError = (error) => {
    bot.telegram.sendMessage(ChatID, error);
}
const DownloadFile = async (filelink,msg) => {
    const downloader = new Downloader({
        url: filelink,
        directory: "./Files"
    });
    try{
        const filedata = await downloader.download();
        //console.log(filedata);
        if(filedata.downloadStatus === 'COMPLETE'){
            const filesize_inmb = fs.statSync(filedata.filePath).size / 1000000;
            if(filesize_inmb > 49){
                const name = filedata.filePath.split("/")[2];
                const link = publicURL + name;
                msg.reply("File size is more than 50MB. So, here is the download link: " + link);
            }else{
                const file = fs.readFileSync(filedata.filePath);
                const filename = filedata.filePath.split("/")[2];
                const filetype = filedata.filePath.split(".")[2];
                //console.log(filetype);
                if(filetype === "mp4"){
                    msg.replyWithVideo({source: file, filename: filename});
                    fs.unlinkSync(filedata.filePath);
                }else{
                    msg.replyWithDocument({source: file, filename: filename});
                }
                
            }
        }
    }catch(e){
        ReportError(e);
    }
}

bot.start((ctx) => ctx.reply("Welcome to Terabox to Telegram Bot!"));
bot.help((ctx) => ctx.reply("Send me a file to get a download link!"));

bot.on("message", async (msg) => {
    const message = msg.message.text;
    const userid = msg.message.from.id;
    if (MessageHaveLink(message)) {
        ReportError("User ID: " + userid + " sent a link: " + message);
        const res = await msg.reply("Getting download link...");
        const resmid = res.message_id;
        const data = await GetDownloadableLink(message);
        if(data === "Failed to get download link!"){
            bot.telegram.editMessageText(ChatID, resmid, null, "Failed to get download link!");
            return;
        }else{
            bot.telegram.editMessageText(ChatID, resmid, null, "Downloading  " + data.name + "...");
            const filelink = data.video;
            DownloadFile(filelink,msg);
        }
    }
    else{
        msg.reply("Please send a terabox file link. i will send it to your telegram chat!");
    }
});

app.listen(3000, () => {
    bot.launch();
    console.log("Server is running on port 3000");
}); 
export default ReportError;