var index = require("../index.js");

/*
{"id":"01234567-89ab-cdef-0123-456789abcdef",
"config":{"COGNITO_USERNAME":"Heroku-Addon-User-01234567-89ab-cdef-0123-456789abcdef",
"COGNITO_PASSWORD":"C4$j1%f1#f4*S5&I1@b7$b1~Q6(C7%f3*G4`d1`C3&l4(j1[b3#",
"COGNITO_IDENTITY_POOL_ID":"us-east-1:07e91600-b6bc-41e9-a07e-1de3b9d2bdfd",
"COGNITO_USER_POOL_ID":"arn:aws:cognito-idp:us-east-1:507760724064:userpool/us-east-1_QY61qoJbZ",
"COGNITO_REGION":"us-east-1",
"COGNITO_CLIENT_ID":"6a2ae7i6mvd9u6bt9hvpa9c8i2",
"S3_BUCKET":"scrambled-binaries"},
*/

var params = {
    Username: 'Heroku-Addon-User-01234567-89ab-cdef-0123-456789abcdef',
    Password: 'C4$j1%f1#f4*S5&I1@b7$b1~Q6(C7%f3*G4`d1`C3&l4(j1[b3#',
    UserPoolId: 'us-east-1_QY61qoJbZ',
    ClientId: '6a2ae7i6mvd9u6bt9hvpa9c8i2',
    IdentityPoolId: 'us-east-1:07e91600-b6bc-41e9-a07e-1de3b9d2bdfd',
    AWSRegion: 'us-east-1'
}

function callback(err, creds) {
    console.log("Error: " + JSON.stringify(err) + " \n\nCreds: " + JSON.stringify(creds));
}

index.getAWSAccessCredentialsForCognitoUser(params, callback);