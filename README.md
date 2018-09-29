# rock-paper-scissors
This is rock-paper-scissors built using node.js.

It deploys an http server which serves the static files to
the client using a get request. Then the communication
between client and server continues through a web-socket.

The game can be extended to be like ultimate
rock-paper-scissors, but consider using third-party
frameworks for any further development.

The unit tests only cover server side operations.

You can fork and clone the project and run npm install to
install the external dependencies. This project has been
tested with node v8.12.0 and npm 6.4.1.

## Commands

- `npm run start` Runs the project with `node` and serves it on http://localhost:9000

- `npm run test`: Runs unit tests with `node`