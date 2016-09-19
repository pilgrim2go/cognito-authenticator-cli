var index = require("../index.js");

var params = {
    Username: 'Heroku-Addon-User-01234567-89ab-cdef-0123-456789abcdef',
    Password: 'b5&f2$n5$C2&r4`G4@b1&d1#b1]E1)j4+b1)d2@W1&M1(b1|l6*',
    UserPoolId: 'us-east-1_QY61qoJbZ',
    ClientId: '6a2ae7i6mvd9u6bt9hvpa9c8i2',
    IdentityPoolId: 'us-east-1:07e91600-b6bc-41e9-a07e-1de3b9d2bdfd'
}

function callback(err, creds) {
    console.log("Error: " + JSON.stringify(err) + " \n\nCreds: " + JSON.stringify(creds));
}

index.getAWSAccessCredentialsForCognitoUser(params, callback);