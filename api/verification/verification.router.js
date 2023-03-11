const router = require("express").Router();
const multer = require('multer');
//const { checkToken, isAdmin } = require("../../auth/token_validation");
const {
getAllCategories,
addCategory,
deleteAllCategories,
getCategoryById,
updateCategoryById,
deleteCategoryById,
getCategoryByProductId,
getParentCategories,
uploadCategoryImage,
CertificateVerification,
getAllCertificatesNo,
addOwnerInfoG,
addOwnerInfoM,
getOwnersInfo

} = require("./verification.controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './files');
    },
  
    filename: (req, file, cb) => {
       
        cb(null, Date.now()+"-"+file.originalname)
    }
  });
  
  const excelFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(csv|xlsx|)$/)) {
        return cb(new Error('You can upload only excel files!'), false);
    }
    cb(null, true);
  };

const upload = multer({ storage: storage, fileFilter: excelFileFilter,limits:{fileSize:1000000}});



const use = fn => (req,res,next)=>
{
    Promise.resolve(fn(req,res,next)).catch(next)
}
router.get("/", use(getAllCategories));
router.get("/certificates", use(getAllCertificatesNo));
router.get("/ownersInfo", use(getOwnersInfo));
router.post("/",upload.single('file'),use(addCategory));
router.post("/certificateVerification",use(CertificateVerification));
router.post("/filesOwnersInfo/general",upload.single('file'),use(addOwnerInfoG));
router.post("/filesOwnersInfo/maple",upload.single('file'),use(addOwnerInfoM));


module.exports = router;