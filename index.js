
import express from 'express'
import bodyparser from 'body-parser'
import admin from "./config.js"
const app = express()
app.use(bodyparser.json())

const port = 8080
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  app.post('/firebase/notification', (req, res) => {
    const registrationToken = req.body.to;
    const message = req.body.notification;
    const options = notification_options;
    console.log("BODY", req.body)
      admin.messaging().sendToDevice(registrationToken, message, options)
      .then(response => {
        console.log("ebo sma  mu mamu");
        res.status(200).send("Notification sent successfully");
      })
      .catch(error => {
        console.log(req)
        console.log("ERROR",error);
        res.status(500).send("Error sending notification");
      });
  });
app.listen(port,"localhost", () =>{
console.log("listening to port"+port)
})