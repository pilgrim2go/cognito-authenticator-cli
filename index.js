
var pathToProject = "./";
var AWSCognito = require(pathToProject + 'amazon-cognito-identity-js/index');

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
            IdentityPoolId: 'identityPoolId'
        }

    Callback: function(err, creds) {

    }
*/
exports.getAWSAccessCredentialsForCognitoUser = function(params, callback) {

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
                console.log('access token + ' + result.getAccessToken().getJwtToken());

                cognitoUserPoolLoginProvider = 'cognito-idp.us-east-1.amazonaws.com/' + params.UserPoolId;
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId : params.IdentityPoolId, // your identity pool id here
                    Logins : {
                        // Change the key below according to the specific region your user pool is in.
                        cognitoUserPoolLoginProvider : result.getIdToken().getJwtToken()
                    }
                });

                console.log(AWS.config.credentials);
            },

            onFailure: function(err) {
                callback(err, null);
            },

        });
};
