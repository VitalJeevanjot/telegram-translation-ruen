// Dependencies
const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 80;
const url = 'https://api.telegram.org/bot';
const apiToken = // yandex api token
let key = // telegram bot key
var translate = require('yandex-translate')(key);
// Configurations
app.use(bodyParser.json());
// Endpoints
app.post('/tg/tr/message', (req, resaxi) => {
     // console.log(req.body);
     let isbot = req.body.message.from.is_bot;
     let chatId = req.body.message.chat.id;
     let message = req.body.message;
     let sentMessage = req.body.message.text;
     console.info(sentMessage)
     console.info('atRequest')
    translate.detect(sentMessage, (err, res) => {
        // res.lang -> 'ru'
        console.info(res)
        console.info(sentMessage)
        if (res.lang == 'en') {
            translate.translate(sentMessage, { to: 'ru' }, (err, res) => {
                console.log(res)
                axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    reply_to_message_id: message.message_id,
                    text: res.text[0]
                })
                .then((response) => {
                    resaxi.status(200).send(response);
                    console.log('hereen')
                    return 1;
                }).catch((error) => {
                    resaxi.send(error);
                    return;

                });
            });
        } else if (res.lang == 'be') {
            translate.translate(sentMessage, { to: 'en' }, (err, res) => {
                axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    reply_to_message_id: message.message_id,
                    text: res.text[0]
                })
                .then((response) => {
                    resaxi.status(200).send(response);
                    console.log('herebe')
                    return 1;
                }).catch((error) => {
                    resaxi.send(error);
                    return;

                });
            });
        } else if (res.lang == 'ru') {
            translate.translate(sentMessage, { to: 'en' }, (err, res) => {
                axios.post(`${url}${apiToken}/sendMessage`,
                {
                    chat_id: chatId,
                    reply_to_message_id: message.message_id,
                    text: res.text[0]
                })
                .then((response) => {
                    resaxi.status(200).send(response);
                    console.log('hereru')
                    return 1;
                }).catch((error) => {
                    resaxi.send(error);
                    return;

                });
            });
        } else {
//             axios.post(`${url}${apiToken}/sendMessage`,
//             {
//                 chat_id: chatId,
//                 text: 'null The language you are using is not from this list [Russian, Belarusian, English]'
//             })
//             .then((response) => {
//                     resaxi.status(200).send(response);
//                     console.log('herenull')
//                     return 1;
//             }).catch((error) => {
//                 resaxi.send(error);
//                 return;

//             });
          resaxi.status(200).send('ok');
          console.log('herenull')
          return 1;
        }
     });
    //  if (sentMessage.match(/hello/gi)) {
    //       axios.post(`${url}${apiToken}/sendMessage`,
    //            {
    //                 chat_id: chatId,
    //                 text: 'hello back 👋'
    //            })
    //            .then((response) => { 
    //                 res.status(200).send(response);
    //            }).catch((error) => {
    //                 res.send(error);
    //            });
    //  } else {
    //       // if no hello present, just respond with 200 
    //       res.status(200).send({});
    //  }
});
// Listening
app.listen(process.env.PORT, () => {
     console.log(`Listening on port ${process.env.PORT}`);
});