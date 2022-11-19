// -- Services
const http = require("http");
const querystring = require("querystring");
const crypto = require("crypto");

// -- Variables from other .js files
const { helpers } = require("../helpers/helpers");
const { error_handler } = require("../helpers/error_handler");
const { router } = require("../js/router.js");

// -- Variables
const port = 3003;
const server = http.createServer();


// -- Route server requests
server.on("request", function(request, response) {
    console.log("Method: " + request.method);
    console.log("URL " + request.url);

    helpers.setupCORS(response);

    if (request.method === "OPTIONS") {
        response.end();
        return;
    }

    let body = {};
    let data = "";
    request.on("data", function(chunk) {
        data += chunk;
    });
    request.on("end", function() {
        if (data) {
            try {
                body = JSON.parse(data);
                console.log("body: " + data);
            }
            catch {
                console.log("failed to parse data");
                error_handler.errorResponse(response, "Failed to parse arguments", 400);
                return;
            }
        }

        router.routeRequest(request.method, request.url, body, response);
    });
});

server.listen(port, function() {
    console.log("Server starting on port " + port);
});