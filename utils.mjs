import ReportError from "./main.mjs"

export const MessageHaveLink =  (message) => {
    if (message.includes("http") || message.includes("https")) {
        return true
    } else {
        return false
    }
}

export const GetDownloadableLink = async (link) => {
    try{
        const response = await fetch("https://tera.instavideosave.com/?url="+link, {
            "headers": {
              "accept": "*/*",
              "accept-language": "en",
              "cache-control": "no-cache",
              "pragma": "no-cache",
              "priority": "u=1, i",
              "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Linux\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "cross-site"
            },
            "referrer": "https://reelsave.app/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
          });
        const data = await response.json();
        if(data.video){
            return data.video[0];
        }else{
            ReportError(data);
            return "Failed to get download link!";
        }
    }catch(e){
        ReportError(e);
        return e;
    }
}

export default MessageHaveLink;