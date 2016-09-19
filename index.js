
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
        // creds = {
        //    "AccessKeyId":"ASIAI4WFZ7AIAXOCQ2CA",
        //    "SecretAccessKey":"oLLf8+CnXa2o2DMkQq0R6KgTvP2Fly6Ovc9Pt8No",
        //    "SessionToken":"AgoGb3JpZ2luEID//////////wEaCXVzLWVhc3QtMSKAAo1TipDwvn0h961jprRELIYsbmM2jVegpfdRT0uruHJRFUnr0TYX9X1p56c3UhUwflm4UoKZPjSh45RwnvLuw+ByGFV8AloB/R9z7DD5m4rjhnQk/nF8JZnzhoHELkzmu0HsJxWGj2gYB2PVwMeqPalskiNEZxQYq8bfPybq++CRyTRGkU21RhfdPiBohW175tnmoazjoIbca82XiU9jp+IZRGCUKRujp2ke6u8zhfe4e7I8H3RSN/uFV3n0UqsgVJ5lIGp/zoRAjBFcX/W4jFLGA94OwA2PHBc03+mX41mgZI2N2PgNwZrwxyWv3qwiKZrA4o0j4MIdY/LWeaD/nwQqpgUIJRAAGgw1MDc3NjA3MjQwNjQiDPYPdeamtOT88jpF8iqDBSaf9MLr7rxAbi3bO8y1wzHEZZfDeMvleCekIxg3+AurH2YanM6tKg4b1LinFynv4SGDxm2rW2R1Fx0Z8YpJl5ig1L5YpBPoVGZ9jE3S2y0WjYqCd+vQ2oPS6kiJvxDFZd3rVM2lMaKeYYUzOiWXX8gC51MsmDcUW587ETtnGlSSw+8wnTPgDUGTDBr27CCkDlzalq2+F3nNaoh9dsh9N8AjaKNPT3ZQ/629I77Ifj+JAEgFd0lwKZPfNVJjm0CzMIi0ZVF+Lm2MYc36lXu4upnnocyrSiipV0t0zAXpysSOYigNl/qMZkd4Eq0wMCkfDyae3dMNPj/S2Gae+3KcrfLXhF9+RTXpYdPETyjw7HXvBhPbFN3GbPUfC/eVYZW41tx1wNWCccNZgdYK2cpSStS+slcdTkesJy5qxA6kfW+t3c40x2BZr3n02PsxAswcS/nCyuo69wGoti8zR553qS+V/mXzRlyhmg+q/wJPFWB8D6PeSeeZkcYDFCXYmM1sVrya4E+k026YgsRUg4pOlky4yvWhmyuzx9yMqneSR1KueuzG7SlD5yFku/n7jgNA9rSPWj81L+Xo0e+7hsX9H5g9EmdxhULSG2GyEOMLL7Wr0qgOEOhRcfSVuns1moIRw6x01Fndxv1oD++3hc0VQfLeNLMG+xFI0fwjntHsenk60scC0lzJRSJTT9sH5Qji0MGA92Q9Oe/t1yvNACLiIyE36dtjjFD1pELKFDVtJtEwvwNASOoyG0OEaZfIJeRaQfODpl8vf8ebipeJgAnRKtBBApMr9oR5qGZXC2luNeX2kXiK1HJfQV4lAgTg1B+i5ldj2DlVv2uDTKa9yV9Gjb39plUw0r/9vgU="
        //   }
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
                cognitoUserPoolLoginProvider = 'cognito-idp.' + params.AWSRegion +  '.amazonaws.com/' + params.UserPoolId;
                var logins = {};
                logins[cognitoUserPoolLoginProvider] = result.getIdToken().getJwtToken();

                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId : params.IdentityPoolId, // your identity pool id here
                    Logins : logins
                });

                AWS.config.update({region: params.AWSRegion});

                AWS.config.credentials.get(function(err) {
                    if (err) {
                        callback(err, null);
                        console.log(AWS.config.credentials);
                    } else {
                        var creds = {
                            AccessKeyId: AWS.config.credentials.accessKeyId,
                            SecretAccessKey: AWS.config.credentials.secretAccessKey,
                            SessionToken: AWS.config.credentials.sessionToken,
                        }

                        callback(null, creds);
                    }
                });
            },

            onFailure: function(err) {
                callback(err, null);
            },

        });
};
