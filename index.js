
var AWSCognito = require('amazon-cognito-identity-js');
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var AWS = require('aws-sdk');

/*
    This function retrieves AWS access credentials for a given
    Cognito user credentials. The main purpose of this function is
    to have a compact way of obtaining AWS Access credentials (Access
    Key ID + Access Secret Key) that can then be used with the
    AWS SDK for immediate AWS access.

    This function enables quick consumption of Cognito User accounts
    in server-side apps, that can use the SRP_A method.

    Params:
        {
            Username: 'username',
            Password: 'password',
            UserPoolId: 'userPoolId',
            ClientId: 'userPoolClientId',
            IdentityPoolId: 'identityPoolId',
            AWSRegion: 'us-east-1'
        }

    Callback: function(err, creds) {

    }
*/
exports.getAWSAccessCredentialsForCognitoUser = function(params, callback) {
        global.window = MockBrowser.createWindow();;
        var authenticationData = {
            Username : params.Username,
            Password : params.Password,
        };
        var authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);
        var poolData = {
            UserPoolId : params.UserPoolId,
            ClientId : params.ClientId
        };
        var userPool = new AWSCognito.CognitoUserPool(poolData);
        var userData = {
            Username : params.Username,
            Pool : userPool
        };
        var cognitoUser = new AWSCognito.CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                //cognitoUserPoolLoginProvider = 'cognito-idp.' + params.AWSRegion +  '.amazonaws.com/' + params.UserPoolId;
                //var Logins = {};
                //Logins[cognitoUserPoolLoginProvider] = result.getIdToken().getJwtToken();
                                    }
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId : params.IdentityPoolId, // your identity pool id here
                    Logins: Logins
                });

                AWS.config.update({region: params.AWSRegion});

                AWS.config.credentials.get(function(err) {
                    console.log(err);
                    console.log(AWS.config.credentials);
                    var creds = {
                        AccessKeyId: AWS.config.credentials.accessKeyId,
                        SecretAccessKey: AWS.config.credentials.secretAccessKey,
                        SessionToken: AWS.config.credentials.sessionToken,
                    }

                    callback(null, creds);
                });
            },

            onFailure: function(err) {
                callback(err, null);
            },

        });
};
