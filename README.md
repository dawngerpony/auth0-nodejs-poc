# auth0-nodejs-poc

Auth0 NodeJS proof of concept

## What I did

1. Sign up for a free account at Auth0
1. Create a new server application (NodeJS/Express)
1. Callback URL: [http://localhost:3000](http://localhost:3000) (default)
1. Create a new local cert = `localhost-key.pem` with a key = `localhost.pem`:

    brew install mkcert nss
    mkcert -install
    mkcert localhost

1. Add dependencies

    yarn init
    yarn add express express-openid-connect@0.6.0

1. Added source code from Auth0 quickstart.
1. Added a script to run Node easily.
1. Created a test user in my Auth0 account and confirmed via email.

## How to run this yourself

Prerequisites: node, yarn, mkcert, nss, an Auth0 account.

1. Make certificates
1. Create an Auth0 account
1. Create a `.env` file:

        APP_SESSION_SECRET=<secret>
        CLIENT_ID=<client id>
        ISSUER_BASE_URL=<base url>

1. Run yarn:

        yarn install
        yarn start

## Testing

1. Visit [localhost:3000](http://localhost:3000)

        No cookies, displays "logged out"

1. Visit [/login](http://localhost:3000/login)

        Redirected to ISSUER_BASE_URL with URL parameters state, client, protocol, scope, response_type, redirect_uri, nonce, response_mode
        Cookies: _csrf, auth0_compat, auth0 (session cookie), did_compat, did (device ID)

1. Log in with valid credentials:

        Redirected back to `baseURL`
        Cookies: `identity`

## Local commands

- `yarn libyear`: run the [libyear](https://www.libyear.com/) command to determine dependency age
- `yarn lint`: run eslint to report on code issues
- `yarn start`: run the server
- `yarn start:dev`: run the server in dev mode under `nodemon` for hot reloads

## References

- [mkcert](https://mkcert.dev)
- [How to read environment variables from Node.js](https://nodejs.dev/how-to-read-environment-variables-from-nodejs)
- [Managing Environment Variables in Node.js with dotenv](https://stackabuse.com/managing-environment-variables-in-node-js-with-dotenv/)
- [sameSite Cookie Attribute Changes](https://auth0.com/docs/sessions/concepts/cookie-attributes)

### Auth0 docs

- [ID Token Structure](https://auth0.com/docs/tokens/references/id-token-structure)
- [GitHub Action for Yarn](https://github.com/marketplace/actions/github-action-for-yarn)
- [Express](https://auth0.com/docs/quickstart/webapp/express)
- [Node.js](https://auth0.com/docs/quickstart/webapp/nodejs/01-login)
