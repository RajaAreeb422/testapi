const router = require("express").Router();
const multer = require('multer');
//const { checkToken, isAdmin } = require("../../auth/token_validation");
const {
getAllVehicles,
addVehicle,
deleteAllVehicles,
getVehicleById,
updateVehicleById,
deleteVehicleById,
getCategoryByProductId,
getParentCategories,
uploadVehicleImage

} = require("./vehicle.controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
  
    filename: (req, file, cb) => {
        console.log()
        cb(null, Date.now()+"-"+file.originalname)
    }
  });
  
  const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
  };
  const use = fn => (req,res,next)=>
{
    Promise.resolve(fn(req,res,next)).catch(next)
}
const upload = multer({ storage: storage, fileFilter: imageFileFilter});




router.get("/", use(getAllVehicles));
//router.get("/getParentCategories", use(getParentCategories));
router.get("/:id",use(getVehicleById));
//By giving product id will give you the category assign to that product 
//router.get("/getCategoryOfProduct",use(getCategoryByProductId));
router.post("/", use(addVehicle));
router.delete("/", use(deleteAllVehicles));
router.put("/:id",use(updateVehicleById));
router.delete("/:id",use(deleteVehicleById));
router.post("/uploadVehicleImage/:id", upload.array('imageFile',8),use(uploadVehicleImage));
module.exports = router;