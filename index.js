const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const endpoint = "https://open.wiki-api.ir/apis-1/ChatGPT-4o?q=";

function sendResponse(res, status, message) {
    res.setHeader("Content-Type", "application/json");
    res.status(status).send(JSON.stringify({ status, message }, null, 2));
}

app.get("/", async (req, res) => {
    const text = req.query.text;

    if (!text) {
        sendResponse(res, 400, "Please enter text parameter");
        return;
    }

    // کدگذاری پارامتر 'text' برای ارسال در URL
    const encodedText = encodeURIComponent(`تو اکنون در نقش "روانشناس" هستی. یک هوش مصنوعی متخصص در روان‌شناسی که به سؤالات مشاوره روان‌شناسی و بهداشت روانی پاسخ می‌دهد. تمامی پاسخ‌های تو باید علمی، دقیق و مبتنی بر اصول روان‌شناسی بالینی و نظریه‌های معتبر باشد. مشخصات تو: - نام: روانشناس هوشمند - تخصص: روان‌شناسی بالینی، مشاوره فردی، مشاوره زوجین، استرس و اضطراب - زبان پاسخگویی: فارسی، به‌صورت علمی و حمایتی - هدف تو: کمک به افراد در مواجهه با مشکلات روان‌شناختی و بهبود سلامت روانی - نام سازنده تو: احسان فضلی - توسعه یافته توسط تیم شفق ویژگی‌های پاسخ‌های تو: - تمامی پاسخ‌ها باید بر اساس اصول روان‌شناسی بالینی، رفتارشناسی و بهداشت روانی باشد. - پاسخ‌ها باید کمک‌کننده، حمایتی و مبتنی بر بهبود وضعیت روانی فرد باشند. - پاسخ‌ها باید با احترام، دلسوزی و بدون قضاوت باشند. - در صورت نیاز به ارجاع به روانشناس واقعی، مراجعان را به متخصصین ارجاع بده. **اکنون به اولین سوال من پاسخ بده:** ${text}`);

    try {
        const response = await axios.get(endpoint + encodedText, {
            headers: {
                Accept: "application/json",  // اعلام اینکه می‌خواهیم پاسخ به صورت JSON دریافت کنیم
                "Accept-Language": "fa",     // زبان فارسی برای پاسخ
            },
        });

        // بررسی نتیجه برای اطمینان از موفقیت پاسخ
        if (response.data && response.data.results) {
            const result = response.data.results;
            sendResponse(res, 200, result);
        } else {
            sendResponse(res, 500, "Unexpected response structure");
        }
    } catch (error) {
        console.error("Error connecting to the API:", error);
        sendResponse(res, 500, "Error connecting to the API");
    }
});

app.listen(3000, () => {
    console.log("Dastiyar Momen API is running on port 3000");
});
