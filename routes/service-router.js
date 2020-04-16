var express = require('express');
var router = express.Router();
var Service = require('../model/Service');
var Calendar = require('../model/Calendar');
var Avilablity = require('../model/Avilablity');
var Booking = require('../model/Booking');
var Package = require('../model/Package');
var PackageFeature = require('../model/Packagefeature');
var PackageHistory= require('../model/Packagehistory');
var User = require('../model/User');
const bcryptjs = require('bcryptjs');


/* ======================================================= */
/*                       SERVICE                           */
/* ======================================================= */

router.post('/addService', (req, res, next) => {

  const service = new Service(req.body);
  service.save()
    .then((service) => {
      if (service) {
        res.status(200).json({ message: 'Added successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});
router.post('/dupService', (req, res, next) => {

  const service = new Service(req.body);
  service.save()
    .then((service) => {
      if (service) {
        res.status(200).json({ message: 'Duplicated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});
router.post('/updateService', (req, res, next) => {
  var id = req.body._id;
  delete req.body['_id'];
  Service.findByIdAndUpdate({ _id: id }, req.body)
    .then((service) => {
      if (service) {
        res.status(200).json({ message: 'Updated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Update', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});
router.post('/updateTimeSlotService', (req, res, next) => {
  var id = req.body._id;
  delete req.body['_id'];
  Service.findByIdAndUpdate({ _id: id }, req.body)
    .then((service) => {
      if (service) {
        res.status(200).json({ message: 'Updated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Update', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});

router.post('/allServiceOfUser', (req, res, next) => {
  console.log(req.body)
  Service.find(req.body)
    .then((service) => {
      if (service) {
        res.status(200).json(service)
      }
      else {
        res.status(201).json({ message: 'No data found' })
      }
    }).catch(err => {
      res.json(err)
    })
});
router.get('/:id', (req, res, next) => {

    Service.find({_id:req.params.id})
    .then((service) => {
      if (service) {
        res.status(200).json(service[0])
      }
      else {
        res.status(201).json({ message: 'No data found' })
      }
    }).catch(err => {
      res.json(err)
    })
});

router.post('/deleteService', (req, res, next) => {
  
  Booking.find({ serviceId: req.body.id })
    .then((booking) => {
      if (booking.length>0) {
         res.status(201).json({ message: 'This Service have been used for booking. So  it can not be deleted !', con: 'Failed!', type: 'error' })
      }
      else {
        Service.findByIdAndRemove({ _id: req.body.id })
          .then((service) => {
            if (service) {
              res.status(200).json({ message: 'Deleted successfully', con: 'Deleted!', type: 'success' })
            }
            else {
              res.status(201).json({ message: 'Unable to delete', con: 'Failed!', type: 'error' })
            }
          }).catch(err => {
            res.json(err)
          })
      }
    }).catch(err => {
      res.json(err)
    })

});



/* ======================================================= */
/*                       CALENDAR                          */
/* ======================================================= */
router.post('/addCalendar', (req, res, next) => {

  const calendar = new Calendar(req.body);
  calendar.save()
    .then((calendar) => {
      if (calendar) {
        res.status(200).json({ message: 'Added successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});
router.post('/dupCalendar', (req, res, next) => {

  const calendar = new Calendar(req.body);
  calendar.save()
    .then((calendar) => {
      if (calendar) {
        res.status(200).json({ message: 'Duplicated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});
router.post('/updateCalendar', (req, res, next) => {

  var id = req.body._id;
  //  delete req.body['_id'];

  Calendar.findByIdAndUpdate({ _id: id }, req.body)
    .then((calendar) => {
      if (calendar) {
        res.status(200).json({ message: 'Updated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Update', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});

router.post('/allCalendarOfUser', (req, res, next) => {
  Calendar.find(req.body)
    .populate('service', 'name')
    .then((calendar) => {
      if (calendar) {

        res.status(200).json(calendar)
      }
      else {
        res.status(201).json({ message: 'No data found' })
      }
    }).catch(err => {
      res.json(err)
    })
});
router.post('/deleteCalendar', (req, res, next) => {
  Calendar.findByIdAndRemove({ _id: req.body.id })
    .then((calendar) => {
      if (calendar) {
        res.status(200).json({ message: 'Deleted successfully', con: 'Deleted!', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'Unable to delete', con: 'Failed!', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});

router.get('/calendar/:id', (req, res, next) => {
  Calendar.find({_id:req.params.id}).populate('service','name duration price started').exec()
  .then((calendar) => {
    if (calendar) {     
      res.status(200).json(calendar[0]);      
    }
    else {
      res.status(201).json({ message: 'No data found' })
    }
  }).catch(err => {
    res.json(err)
  })
});

/* ======================================================= */
/*                       AVILABLITY                       */
/* ======================================================= */

router.post('/updateAvilablity', (req, res, next) => {
  Booking.find({date:req.body.date,serviceId:req.body.serviceId})
  .then((booking)=>{
    if(booking.length>0){
      res.status(200).json( { message:'This Timeslot has been booked. So any change can not updated', type: 'error' })
    }else{
      Avilablity.findOne({date:req.body.date}) 
      .then((avl) => {
        if (avl) {
          Avilablity.findByIdAndUpdate({ _id: avl._id },req.body)
          .then((av) => {
            if (av) {
              res.status(200).json( { message:'updated successfully', type: 'success' })
            }
          }).catch(err => {
            res.json(err)
          })
        }
        else {
       const newAvilablity =  new Avilablity(req.body)
       newAvilablity.save()
          .then((avl) => {
            if (avl) {
              res.status(200).json( { message:'Added successfully', type: 'success' })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      }) 
    }
 
  })
  .catch(err => {
    res.json(err)
  }) 


});


router.post('/allAvilablity', (req, res, next) => {

  Avilablity.find(req.body)
    .then((avl) => {
      if (avl) {
        res.status(200).json(avl)
      }
      else {
        res.status(201).json({ message: 'No data found' })
      }
    }).catch(err => {
      res.json(err)
    })
});

router.post('/allAvilablityforBooking', (req, res, next) => {

  Avilablity.find(req.body ,{date:1, title:1, bookingSlot:1, orgin:1, _id:0})
    .then((avl) => {
      if (avl) {
        res.status(200).json(avl)
      }
      else {
        res.status(201).json({ message: 'No data found' })
      }
    }).catch(err => {
      res.json(err)
    })
});
                            /* ======================================================= */
                            /*                       Booking                          */
                            /* ======================================================= */
 router.post('/addBooking', (req, res, next) => {
   console.log( req.body  )
  const booking = new Booking(req.body);
  booking.save()
    .then((booking) => {
      if (booking) {
        res.status(200).json({ message: 'Booked successfully', type: 'success',bookingId:booking._id })
      }
      else {
        res.status(201).json({ message: 'unable to book', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});

router.post('/countUniqueBookedgSlot', function (req, res, next) {
  booking =  Booking.count(req.body)
    .then((booking) => {
      if (booking) {
        res.status(201).json({ count:booking})
      }
      else {
        res.status(200).json({count:0})
      }
    }).catch(err => {
      res.json(err)
    })
});
router.post('/updateBooking', (req, res, next) => {
  var id = req.body._id;
  delete req.body['_id'];
  Booking.findByIdAndUpdate({ _id: id }, req.body)
    .then((booking) => {
      if (booking) {
        res.status(200).json({ message: 'Updated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Update', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});
                            /* ======================================================= */
                            /*                         Appointment                     */
                            /* ======================================================= */
router.post('/appointmentOfDay', function (req, res, next) {
  booking =  Booking.find(req.body).populate('userId','firstName lastName email phone')
    .then((booking) => {
      if (booking) {
        res.status(201).json({ appointments:booking})
      }
      else {
        res.status(200).json({appointments:[]})
      }
    }).catch(err => {
      res.json(err)
    })
});
router.post('/allAppointmentOfService', function (req, res, next) {
  booking =  Booking.find(req.body,{date:1,time:1})
    .then((booking) => {
      if (booking) {
        res.status(201).json(booking)
      }
      else {
        res.status(200).json([])
      }
    }).catch(err => {
      res.json(err)
    })
});

router.post('/timeSlotOfDay', function (req, res, next) {
  console.log(req.body)
  avilablity= Avilablity.findOne(req.body)
    .then((avilablity) => {
      if (avilablity) {
        res.status(201).json({ appointments:avilablity.bookingSlot})
      }
      else {
        res.status(200).json({appointments:''})
      }
    }).catch(err => {
      res.json(err)
    })
});

router.get('/myAppointments/:id', (req, res, next) => {
     
  Booking.find({userId:req.params.id},{userId:0,updatedAt:0}).populate('serviceId', 'name -_id').populate('onerId','firstName lastName email phone -_id')
  .then((booking) => {
    if (booking) {
      res.status(200).json(booking)
    }
    else {
      res.status(201).json({ message: 'No data found' })
    }
  }).catch(err => {
    res.json(err)
  })
});

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'dhiraj.siswa.mishra@gmail.com',
//     pass: 'dhikrish12345'
//   }
// });

// var mailOptions = {
//   from: 'abc@gmail.com',
//   to: 'xyz@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };


// router.post('/sendemail', function (req, res, next) {
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// });


/* ======================================================= */
/*                       package                          */
/* ======================================================= */
router.post('/addPackage', (req, res, next) => {

  const package = new Package(req.body);
  package.save()
    .then((package) => {
      if (package) {
        res.status(200).json({ message: 'Added successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});
router.post('/dupPackage', (req, res, next) => {  
  console.log()
  const package = new Package(req.body);
  package.save()
    .then((package) => {
      if (package) {
        res.status(200).json({ message: 'Duplicated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })  
});

router.post('/updatePackage', (req, res, next) => {  
  var id = req.body._id;
  Package.findByIdAndUpdate({ _id: id }, req.body)
    .then((package) => {
      if (package) {
        res.status(200).json({ message: 'Updated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Update', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});

router.post('/allPackage', (req, res, next) => {
  Package.find({})
    .populate('packageFeature', 'name')
    .then((package) => {
      if (package) {

        res.status(200).json(package)
      }
      else {
        res.status(201).json({ message: 'No data found' })
      }
    }).catch(err => {
      res.json(err)
    })
});
router.post('/deletePackage', (req, res, next) => {
  Package.findByIdAndRemove({ _id: req.body.id })
    .then((package) => {
      if (package) {
        res.status(200).json({ message: 'Deleted successfully', con: 'Deleted!', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'Unable to delete', con: 'Failed!', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});

router.get('/package/:id', (req, res, next) => {
  Package.find({_id:req.params.id}).populate('service','name duration price').exec()
  .then((package) => {
    if (package) {     
      res.status(200).json(package[0]);      
    }
    else {
      res.status(201).json({ message: 'No data found' })
    }
  }).catch(err => {
    res.json(err)
  })
});

/* ======================================================= */
/*                       packageFeature                    */
/* ======================================================= */
router.post('/addPackageFeature', (req, res, next) => {

  const packageFeature = new PackageFeature(req.body);
  packageFeature.save()
    .then((packageFeature) => {
      if (packageFeature) {
        res.status(200).json({ message: 'Added successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});
router.post('/dupPackageFeature', (req, res, next) => {  
  console.log()
  const packageFeature = new PackageFeature(req.body);
  packageFeature.save()
    .then((packageFeature) => {
      if (packageFeature) {
        res.status(200).json({ message: 'Duplicated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })  
});

router.post('/updatePackageFeature', (req, res, next) => {  
  var id = req.body._id;
  PackageFeature.findByIdAndUpdate({ _id: id }, req.body)
    .then((packageFeature) => {
      if (packageFeature) {
        res.status(200).json({ message: 'Updated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Update', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});

router.post('/allPackageFeature', (req, res, next) => {
  PackageFeature.find({})
    .then((packageFeature) => {
      if (packageFeature) {        
        res.status(200).json(packageFeature)
      }
      else {
        res.status(201).json([])
      }
    }).catch(err => {
      res.json(err)
    })
});
router.post('/deletePackageFeature', (req, res, next) => {
  PackageFeature.findByIdAndRemove({ _id: req.body.id })
    .then((packageFeature) => {
      if (packageFeature) {
        res.status(200).json({ message: 'Deleted successfully', con: 'Deleted!', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'Unable to delete', con: 'Failed!', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});

router.get('/packageFeature/:id', (req, res, next) => {
  PackageFeature.find({_id:req.params.id})
  .then((packageFeature) => {
    if (packageFeature) {     
      res.status(200).json(packageFeature[0]);      
    }
    else {
      res.status(201).json({})
    }
  }).catch(err => {
    res.json(err)
  })
});

/* ======================================================= */
/*                       Users                          */
/* ======================================================= */
router.post('/allUsers', (req, res, next) => {
  User.find({},{password:0})
    .populate('packageFeature', 'name')
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      }
      else {
        res.status(201).json([])
      }
    }).catch(err => {
      res.json(err)
    })
});
router.get('/user/:id', (req, res, next) => {
  User.find({_id:req.params.id},{password:0}).populate('package')
  .then((user) => {
    if (user) {     
      res.status(200).json(user[0]);      
    }
    else {
      res.status(201).json({  })
    }
  }).catch(err => {
    res.json(err)
  })
});
router.post('/adminPGCredential', (req, res, next) => {
  User.find({role:'admin' },{password:0})
  .then((user) => {
    if (user) {     
      res.status(200).json({paypalId: user[0].paypalId,stripeId: user[0].stripeId});      
    }
    else {
      res.status(201).json({  })
    }
  }).catch(err => {
    res.json(err)
  })
});
router.post('/updateProfile', (req, res, next) => {  
  var id = req.body._id;
  User.findByIdAndUpdate({ _id: id }, req.body)
    .then((User) => {
      if (User) {
        res.status(200).json({ message: 'Updated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Update', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});
router.post('/updatePassword', (req, res, next) => {
  var id = req.body._id;
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(req.body.password, salt, function (err, hash) {
      User.findByIdAndUpdate({ _id: id }, { password: hash })
        .then((User) => {
          if (User) {
            res.status(200).json({ message: 'Password Updated successfully', type: 'success' })
          }
          else {
            res.status(201).json({ message: 'unable to Update', type: 'error' })
          }
        }).catch(err => {
          res.json(err)
        })
    })
  })
});
router.post('/updateProfileImage', (req, res, next) => {  
  var id = req.body._id;
  console.log(req.files);

  if (req.files && Object.keys(req.files).length != 0) {

    var image = req.files.image.name;
    image = new Date().getTime()+'_'+image
    var dir = "./public/images/"+image;
    sampleFile = req.files.image;
    sampleFile.mv(dir, function(err) {
        if (err) return res.status(500).send(err);
    });
   User.findByIdAndUpdate({ _id: id },{image:image})
    .then((User) => {
      if (User) {
        res.status(200).json({ message: 'Profile Image Updated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Update', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
  }
});
/* ======================================================= */
/*                       packageFeature                    */
/* ======================================================= */
router.post('/addPackageHistory', (req, res, next) => {
  const packageHistory = new PackageHistory(req.body);
  packageHistory.save()
    .then((packageHistory) => {
      if (packageHistory) {
        res.status(200).json({ message: 'Added successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});

router.post('/updatePackageHistory', (req, res, next) => {  
  var id = req.body._id;
  PackageHistory.findByIdAndUpdate({ _id: id }, req.body)
    .then((packageHistory) => {
      if (packageHistory) {
        res.status(200).json({ message: 'Updated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Update', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});

router.post('/allPackageHistory', (req, res, next) => {
  PackageHistory.find({userId:req.body.id},{userId:0}).populate('packageId','name')
    .then((packageHistory) => {
      if (packageHistory) {        
        res.status(200).json(packageHistory)
      }
      else {
        res.status(201).json([])
      }
    }).catch(err => {
      res.json(err)
    })
});
router.post('/deletePackageHistory', (req, res, next) => {
  PackageHistory.findByIdAndRemove({ _id: req.body.id })
    .then((packageHistory) => {
      if (packageHistory) {
        res.status(200).json({ message: 'Deleted successfully', con: 'Deleted!', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'Unable to delete', con: 'Failed!', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});

router.get('/packageHistory/:id', (req, res, next) => {
  PackageHistory.find({_id:req.params.id})
  .then((packageHistory) => {
    if (packageHistory) {     
      res.status(200).json(packageHistory[0]);      
    }
    else {
      res.status(201).json({})
    }
  }).catch(err => {
    res.json(err)
  })
});

router.post('/activePackageHistory', (req, res, next) => {
  PackageHistory.find({status:'active',userId:req.body.id}).populate('packageId','noOfCalendar noOfService')
  .then((packageHistory) => {
    if (packageHistory) {     
      res.status(200).json(packageHistory[0]);      
    }
    else {
      res.status(201).json({})
    }
  }).catch(err => {
    res.json(err)
  })
});

router.post('/addFreePackageHistory', function (req, res, next) {
  Package.find({ price: 0 }, { _id: 1 })
    .then((package) => {
      if (package) { 
      //-------------------------------------- 
      const packageHistory = new PackageHistory({userId:req.body.id,packageId:package[0]._id});
      packageHistory.save()
        .then((packageHistory) => {
          if (packageHistory) {
            res.status(200).json({ message: 'Added successfully', type: 'success' })
          }
          else {
            res.status(201).json({ message: 'unable to Add', type: 'error' })
          }
        }).catch(err => {
          res.json(err)
        })
      // ------------------------------------
        }      
    }).catch(err => {
      res.status(200).json('' )
    })
});

module.exports = router;
