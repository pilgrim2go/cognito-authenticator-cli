# cognito-authenticator-cli

Retrieves AWS Access Key from Cognito Username/Password as a CLI-capable javascript tool.

## Node.js Usage:
'''
var cognito = require('cognito-authenticator-cli');
var params = {
    Username: 'Heroku-Addon-User-01234567-89ab-cdef-0123-456789abcdef',
    Password: 'C4$j1%f1#f4*S5&I1@b7$b1~Q6(C7%f3*G4`d1`C3&l4(j1[b3#',
    UserPoolId: 'us-east-1_QY61qoJbZ',
    ClientId: '6a2ae7i6mvd9u6bt9hvpa9c8i2',
    IdentityPoolId: 'us-east-1:95219c8a-4ad1-41ca-80fe-669764b389cf',
    AWSRegion: 'us-east-1'
}

function callback(err, creds) {
    if (err) {
      console.log(err);
    } else {
      console.log(creds.AccessKeyId);
      console.log(creds.SecretAccessKey);
      console.log(creds.SessionToken);
    }
}
'''

## CLI USage:
This feature is coming soon. The CLI usage is intended to allow non-Node apps to call this 
package over the shell and acquire credentials to AWS.

cognito.getAWSAccessCredentialsForCognitoUser(params, callback);



## What problem does this solve?
Amazon Cognito provides a web-based package to authenticate a cognito-user (mainly in a Cognito User Pool, 
but also federated through a Cognito Identity.) https://github.com/aws/amazon-cognito-identity-js

The challenge is, this package doesn't easily work on server-side code. There are some changes/hacks to make 
it work, but they don't work by npm install'ing the package.

We wanted to provide a way to take any username/password pair, and retrieve AWS Access credentials on a 
server (or any environment that is not necessarily a browser.)

