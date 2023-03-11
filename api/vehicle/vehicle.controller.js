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
} = require("./vehicle.service");
module.exports = {
  addVehicle: (req, res) => {
    const body = req.body;
    addVehicle(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror",
              error:err
            });
          }
            return res.status(200).json({
              success: 1,
              message:
                "Vehicle Added Successfully ",
              data: results
            });
    });
  },
  getVehicleById: (req, res) => {
    const id = req.params.id;
    getVehicleById(id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror",
            error:err
          });
        }
        if (!results) {
          return res.status(404).json({
            success: 0,
            message: "Record not Found",
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results,
        });
      });
  },
  getAllVehicles: (req, res) => {
    getAllVehicles((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
          error:err
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getParentCategories: (req, res) => {
    getParentCategories((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
          error:err
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getCategoryByProductId: (req, res) => {
    const id = req.params.id;
    getCategoryByProductId(id,(err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
          error:err
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateVehicleById: (req, res) => {
    const body = req.body;
    const id = req.params.id;
    console.log("id of update"+id)
    updateVehicleById(id, body, (err, results) => {
        if (err) {
          console.log(err);
          return res.json({
            success: 0,
            message: "database connection error",
            error:err
          });
        }
        return res.json({
          success: 1,
          message: "Shipper updated successfully",
        });
      });
  },
  deleteVehicleById: (req, res) => {
    const id = req.params.id;
      deleteVehicleById(id, (err) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Database conection error",
            error:err
          });
        }
        return res.json({
          success: 1,
          message: "Shipper deleted successfully",
        });
      });
  },
  deleteAllVehicles: (req, res) => {
      deleteAllVehicles((err,result) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Database conection error",
            error:err
          });
        }
        return res.json({
          success: 1,
          message: "deleted all Shippers successfully",
        });
      });
  },
  uploadVehicleImage: (req, res) => {
    uploadVehicleImage(req.params.id, req.files)
    .then((result)=>
    {
      return res.status(200).json({
        success: 1,
        data: result,
      });
        

    }).catch((err)=>
    {
      return res.status(500).json({
        success: 0,
        message: "database connection error",
        error: err,
      });
    })
  },
};
