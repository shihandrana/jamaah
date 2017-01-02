// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth': {
        'clientID': '1673216006306079', // your App ID
        'clientSecret': '0073a0f30b74187e8df7f75fb7237645', // your App Secret
        'callbackURL': 'http://localhost:8080/auth/facebook/callback'

    }
}