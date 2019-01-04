var admin = require("firebase-admin");

//configuration to connect to database
module.exports = {
    registerApplication: function() {
        return admin.initializeApp({
            credential: admin.credential.cert({
                projectId: '',
                clientEmail: '',
                privateKey: "-----BEGIN PRIVATE KEY----------END PRIVATE KEY-----\n",
              }),
            databaseURL: ""
        });
    }
}
