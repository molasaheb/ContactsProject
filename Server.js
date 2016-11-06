var express = require("express"),
    app = express(),
    path = require('path'),
    router = express.Router(),
    api = require('./api');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);
router
    .get('*', function (req, res) {
        var options = {
            root: __dirname + '/public/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        var fileName = "main.html";
        res.sendFile(fileName, options, function (err) {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            } else {
                console.log('Sent:', fileName);
            }
        });

    });
app.use(router)
    .listen(9000);