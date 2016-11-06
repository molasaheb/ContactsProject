var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    router = express.Router();

mongoose.connect('mongodb://localhost:27017/contacts');

// create a model for a contact
var Contact = mongoose.model('Contact', {userId: String, firstName: String, lastName: String});

// populate schema if no data found
Contact.find().then(function (data) {
    if (data.length === 0) {
        [{userId: 1, firstName: 'john', lastName: 'smith'},
            {userId: 2, firstName: 'joy', lastName: 'smith'},
            {userId: 3, firstName: 'kate', lastName: 'smith'}].map(function (person) {
            var contact = new Contact({userId: person.userId, firstName: person.firstName, lastName: person.lastName});
            contact.save();
            console.log(contact)
        });
    }
});

router
    .use(bodyParser.json())
    .route('/contact')
    .get(function (req, res) {
        Contact.find().then(function (data, err) {
            //console.log('contacts:', data);
            res.json(data);
        });
    })
    .post(function (req) {
        var contact = new Contact(req.body);
        contact.save(function (err) {
            if (err) console.log(err);
        });
    });

router
    .route('/contact/:userId')
    .get(function (req, res) {
        console.log(req.params);
        Contact.findOne({userId: req.params.userId}).then(function (data, err) {
            //console.log('contacts:', data);
            if (data) {
                res.json(data);
            } else {
                res.json([])
            }
        });
    });


module.exports = router;

