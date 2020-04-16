var express = require('express');
var router = express.Router();
var User = require('../model/User')
var Package = require('../model/Package')
var jwt = require('jsonwebtoken');
var key = require('../config/key');
const bcryptjs = require('bcryptjs');
var veryfyToken = require('../config/jwt-werify');
router.post('/chkAuthariseUser',veryfyToken, function (req, res, next){
  res.status(200).json({ message: 'autharised'})
});


router.post('/login', function (req, res, next) {
  //  console.log(body);
user = User.findOne({ email: req.body.email })
  .then((user) => {
    if (!user) {
      res.status(201).json({ message: 'Email not found' ,token:'' ,type:'error'})
    }
    else {
      bcryptjs.compare(req.body.password, user.password, function (err, result) {
        if (err) { console.log(err) }
        if (result) {
          jwt.sign({id: user._id, firstName: user.firstName,lastName: user.lastName,phone: user.phone, email: user.email ,role: user.role}, key.secretkey,{ expiresIn: '24h' }, function (err, token) {
            res.status(201).json({ message: 'login successfully', token ,type:'success' });
          });
        } else {
          res.status(201).json({ message: 'Invalid Password',token:'',type:'error' })
        }
      });

    }
  }).catch(err => { res.json(err) })

});

router.post('/register', function (req, res, next) {
  const user = new User(req.body);
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      user.save()
        .then((user) => {
          if (user) {
            res.status(200).json({ message: 'Registred successfully' ,type:'success' ,userDetail:user})
          }
          else {
            res.status(201).json({ message: 'Unable to register',type:'error' })
          }
        }).catch(err => {
          res.json(err)
        })

    })
  });

});

router.post('/emailExist', function (req, res, next) {
  user = User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(201).json({ exist:true, message: 'Email already registerd' , detail:user})
      }
      else {
        res.status(200).json({exist:false, message: '', detail:''})
      }
    }).catch(err => {
      res.json(err)
    })
});
router.post('/forgot', function (req, res, next) {
  user = User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        console.log(user._id)
        var pass=  user.password =Math.floor(Math.random() * 100000000);
          bcryptjs.genSalt(10, (err, salt) => { 
            bcryptjs.hash(user.password, salt, function (err, hash) {
             user.password = hash;
              User.findByIdAndUpdate(user._id,user)
              .then(()=>{
                res.status(201).json({ message: pass })
              }).catch(err => {
                res.json(err)
              })
            });
           });
        
      }
      else {
        res.status(200).json({ message: 'Email not found'  ,type:'error'})
      }
    }).catch(err => {
      res.json(err)
    })

});



module.exports = router;