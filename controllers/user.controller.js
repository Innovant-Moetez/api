const mongoose = require('mongoose');
const User = mongoose.model('User'); // ona declarer User dons user.model.js ligne 17

module.exports.registrer = (req, res, next) => {
    var user = new User()
    user.FirstName = req.body.FirstName;
    user.LastName=req.body.LastName
    user.email = req.body.email;
    if(req.body.password==req.body.password2){
        user.password = req.body.password;

    }else{
        return res.status(400).send('Passwords do not match ')
    }
    

//if(password!=password2){ res.status(422).send(['Passwords do not match']);}

    user.save((err, doc) => {
        if (!err) {
            const token = user.generateAuthToken() // get token qui se trouve dans user model dans schema

            res.header('x-Moetez-Auth-token', token).send(doc) // send token in the header nomme x-Moetez-Auth-token et les donnes d'user (fullname,email,password)
               
         
        } else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    })
}