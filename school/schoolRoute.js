const express =require('express');
const schoolRouter = express.Router();
let    errorCode = require('../common/errorCode')
let    getCode = new errorCode()
const multer = require('multer')

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "school/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(files.originalname))
    console.log(file)
  }
});
let upload = multer({
  storage: storage,
//   ,
// //dest : "apis/uploads/"
    fileFilter: (req, file, cb) => {
      console.log(file)
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
        } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

//app.use(upload.any())

schoolRouter.use( '/getSchools',require('../authentication/validateToken'),require('./getSchools'))
schoolRouter.use( '/createSchool',upload.single('image'),require('../authentication/validateToken'),require('./createSchool'))
schoolRouter.use( '/getSchoolUserSettting',require('../authentication/validateToken'),require('./schoolUserSetting/getSchoolUserSetting'))
schoolRouter.use( '/getSchoolGradeCategory',require('../authentication/validateToken'),require('./schoolGradeCategory/getSchoolGradeCategory'))
schoolRouter.use( '/getSchool',require('../authentication/validateToken'),require('./getSchool'))
schoolRouter.use( '/updateSchool',upload.single('image'),require('../authentication/validateToken'),require('./updateSchool'))
schoolRouter.use( '/deleteSchool',require('../authentication/validateToken'),require('./deleteSchool'))
schoolRouter.use( '/changeStatus',require('../authentication/validateToken'),require('./changeStatus'))
schoolRouter.use( '/getGradeSections',require('../authentication/validateToken'),require('./gradeSection/getGradeSections'))
schoolRouter.use( '/createGradeSection',require('../authentication/validateToken'),require('./gradeSection/createGradeSection'))
schoolRouter.use( '/deleteGradeSection',require('../authentication/validateToken'),require('./gradeSection/deleteGradeSection'))
schoolRouter.use( '/getSchoolGradeCategories',require('../authentication/validateToken'),require('./getSchoolGradeCategories'))
schoolRouter.use( '/getSchoolGrades',require('../authentication/validateToken'),require('./getSchoolGrades'))
schoolRouter.use( '/getSections',require('../authentication/validateToken'),require('./gradeSection/getSections'))



schoolRouter.use('/',(req,res,next)=>{
    return res.status(400).json({
        "status_code" : 400,
        "message" : "Something went wrong",
        "status_name" : getCode.getStatus(400),
        "error"     : "Wrong method or api"
    }) 
})




module.exports = schoolRouter