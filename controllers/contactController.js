const Contacts = require('../models/contactModel');
var mongoose = require('mongoose')

module.exports = function (app) {

    // get contacts paginated
    app.get('/contacts', function (req, res, next) {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const start = (page - 1) * limit;
        const end = page * limit
        const results = {};
        

        Contacts.find({})
            .then(contacts => {
                if (end  < contacts.length ) {

                    results.next = { 
                        page: page + 1,
                        limit: limit
                    }
                }
                if(start > 0){
                     results.previous = {
                         page: page - 1,
                         limit: limit
                     }
                }
                results.resultedContacts = contacts.slice(start, end)
                console.log(results);
                res.status(200).send(results);
            })
            .catch(next)
    });


    // find by id
    app.get('/contact/id/:id', function (req, res, next) {
        Contacts.findById({
                _id: req.params.id
            })
            .then(contact => res.status(200).send(contact))
            .catch(next)
    })

    
    //  add new contact
    app.post('/contact/add', function (req, res, next) {
        console.log(req.body);
        Contacts.create(req.body)
            .then(contact =>
                res.status(200).send(contact))
            .catch(next)
    })


    // edit contact
    app.put('/contact/:id', function (req, res, next) {
        const contactId = req.params.id;
        const contact = req.body;

        Contacts.findByIdAndUpdate({
                _id: contactId
            }, contact)
            .then(() => Contacts.findById({
                _id: contactId
            }))
            .then(contact => res.status(200).send(contact))
            .catch(next);
    })


    // find by id and delete
    app.delete("/contact/:id", function (req, res) {

        Contacts.findByIdAndRemove(req.params.id, function (err) {
            if (err) throw err;
            console.log("deleteddd");
            res.send("deleted");
        });
    });


    //   find by name 
    app.get('/contact/name/:contactName',function (req, res, next) {

        Contacts.find({
                name: req.params.contactName
            })
            .then(contact => res.status(200).send(contact))
            .catch(next)
    });

    //   find by phone number 
    app.get('/contact/phone/:phoneNum', function (req, res, next) {

        Contacts.find({
                phone: req.params.phoneNum
            })
            .then(contact => res.status(200).send(contact))
            .catch(next)
    });



}