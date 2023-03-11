const {
    addRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById,
    deleteAllRoles,
   
  } = require("./role.service");
  module.exports = {
    addRole: (req, res) => {
      const body = req.body;
        addRole(body).then((results)=>
        {
          return res.status(200).json({
            success: 1,
            data:results
          });
        })
       .catch((err)=>
        {
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
            error:err
          });
        }
       )
    },
  
  
    getRoleById: (req, res) => {
      const id = req.params.id;
        getRoleById(id, (err, results) => {
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

    getAllRoles: (req, res) => {
      getAllRoles((err, results) => {
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
    
    updateRoleById: (req, res) => {
      const body = req.body;
      const id = req.params.id;
      console.log("id of update"+id)
      updateRoleById(id, body, (err, results) => {
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
            message: "Supplier updated successfully",
          });
        });
    },
    deleteRoleById: (req, res) => {
      const id = req.params.id;
        deleteRoleById(id, (err) => {
          if (err) {
            return res.json({
              success: 0,
              message: "Database conection error",
              error:err
            });
          }
          return res.json({
            success: 1,
            message: "Supplier deleted successfully",
          });
        });
    },
    deleteAllRoles: (req, res) => {
        deleteAllRoles((err,result) => {
          if (err) {
            return res.json({
              success: 0,
              message: "Database conection error",
              error:err
            });
          }
          return res.json({
            success: 1,
            message: "deleted all Suppliers successfully",
          });
        });
    },
  };
  