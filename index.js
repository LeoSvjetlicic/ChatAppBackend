import express, { response } from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin'; // Importing firebase-admin using default import
import dotenv from 'dotenv';
dotenv.config();
// Your web app's Firebase configuration
const firebaseConfig = {
  type:process.env.type,
  project_id:process.env.project_id,
  private_key_id:process.env.private_key_id,
  private_key:process.env.private_key,
  client_email:process.env.client_email,
  client_id:process.env.client_id,
  auth_uri:process.env.auth_uri,
  token_uri:process.env.token_uri,
  auth_provider_x509_cert_url:process.env.auth_provider_x509_cert_url,
  client_x509_cert_url:process.env.client_x509_cert_url,
  universe_domain:process.env.universe_domain,
};

// Initialize Firebase
admin.initializeApp({ // Using admin.initializeApp instead of initializeAdminApp
  credential: admin.credential.cert(firebaseConfig)
});

const app = express();
app.use(bodyParser.json());

const port = 8080;
const notificationOptions = {
  priority: 'high',
  timeToLive: 60 * 60 * 24
};

app.post('/firebase/notification', (req, res) => {
  const registrationToken = req.body.to;
  const message = req.body.notification;
  const options = notificationOptions;

  admin.messaging().sendToDevice(registrationToken, message, options)
    .then(response => {
      console.log('Notification sent successfully');
      res.status(200).send('Notification sent successfully');
    })
    .catch(error => {
      console.log(response);
      console.log(error);
      res.status(500).send('Error sending notification');
    });
});

app.listen(port, 'localhost', () => {
  console.log('Listening to port ' + port);
});
