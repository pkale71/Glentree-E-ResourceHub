const multer = require('multer')
const path = require('path');
let formidable = require('formidable');
let    createFolder = require('../DOC_FOLDER_PATH/createDocFolder')

// // let storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     let fileName = createFolder('school')
// //     cb(null, `${fileName}`);
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname))
    
// //   }
// // });

// let upload = multer({
//     // storage: storage,
//     // fileFilter: (req, file, cb) => {
//     //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//     //     cb(null, true);
//     //     } else {
//     //     cb(null, false);
//     //     return cb('Only .png, .jpg and .jpeg format allowed!');
//     //     }
//     // }
// });


// let form = new formidable.IncomingForm();

//   //Process the file upload in Node
//   form.parse(req, function (error, fields, file) {
//     let filepath = file.fileupload.filepath;
//     let newpath = 'uploads/school';
//     newpath += file.fileupload.originalFilename;

//     //Copy the uploaded file to a custom folder
//     fs.rename(filepath, newpath, function () {
//       //Send a NodeJS file upload confirmation message
//       res.write('NodeJS File Upload Success!');
//       res.end();
//     });
//   });
let upload = ''

module.exports = upload

