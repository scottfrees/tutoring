const identity = process.env.IDENTITY_URL ?
    require('identity-client') :
    require('./local-identity');

const authenticate = (username, password) => {
    let _username = username;
    if (username.indexOf("@") >= 0) {
        _username = username.split("@")[0];
    }
    if (process.env.IDENTITY_URL) {
        return new Promise((resolve, reject) => {
            identity.auth(_username, password, (result) => {
                if (result.success) {
                    resolve(true);
                } else {
                    console.error(`${username} - account credentials could not be verified.`);
                    console.error(result);
                    resolve(false);
                }
            });
        })
    } else {
        // local development
        console.warn("WARNING:  RUNNING IN DEVELOPMENT MODE - LOGIN NOT CHECKED");
        return true;
    }
}

exports.authenticate = authenticate;
