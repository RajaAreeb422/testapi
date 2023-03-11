const router = require("express").Router();
const multer = require('multer');
const { checkToken, isAdmin } = require("../../auth/token_validation");
const {
getAllRoles,
addRole,
deleteAllRoles,
getRoleById,
updateRoleById,
deleteRoleById,
getSuppliersByProductId,
getProductsProvidedBySupplierUsingSupplierId,
uploadCollectionImage,
uploadHeadImage,

} = require("./role.controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Brandimages');
    },
  
    filename: (req, file, cb) => {
        console.log('file',file)
        cb(null, Date.now()+"-"+file.originalname)
    }
  });
  
  const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
  };

const upload = multer({ storage: storage, fileFilter: imageFileFilter,limits:{fileSize:1000000}});

const use = fn => (req,res,next)=>
{
    Promise.resolve(fn(req,res,next)).catch(next)
}
router.get("/", use(getAllRoles));
//router.get("/getProductProvidedBySupplier/:id",use(getProductsProvidedBySupplierUsingSupplierId));

//router.get("/getSuppliersOfProduct/:id",use(getSuppliersByProductId));
router.get("/:id",use(getRoleById));
//By giving product id will give you the Supplier assign to that product 

router.post("/", use(addRole));
router.delete("/", use(deleteAllRoles));
router.put("/:id",use(updateRoleById));
router.delete("/:id",use(deleteRoleById));
//router.post("/uploadBrandLogo/:id",  upload.single('imageFile'),use(uploadCollectionImage));
//router.post("/uploadBrandHead/:id",  upload.single('imageFile'),use(uploadHeadImage));
module.exports = router;