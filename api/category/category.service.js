const pool = require("../../config/database");

module.exports = {
  addCategory: (data, callBack) => {
  
    pool.query(
      `insert into maz_ecommerce.category set name=? , parent=?,supplier_id=?`,
        [
        data.name,
        data.parent,
        data.supplier_id,       
        ],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null,results);
      }
    );
  },
  uploadCategoryImage: (id, files, callBack) => {
    console.log('our files',files,id)
    return new Promise((resolve,reject)=>
    {
      let sql = "UPDATE maz_ecommerce.category set path=? where id=?";
      
        files.path = files.path.replace("\\", "/");
        //sql += '("' + id + '","' + files.path + '"),';
     // sql = sql.slice(0, -1);
      pool.query(sql, [files.path,id], 
        (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        console.log("image uploaded",results)
        return resolve(results);
      });
    })
    
 
  },
  getAllCategories: (callBack) => {
    pool.query(
      `select * from maz_ecommerce.category`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  getParentCategories: (callBack) => {
    pool.query(
      `select * from maz_ecommerce.category where maz_ecommerce.category.parent is null`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  getCategoryById: (id, callBack) => {
    pool.query(
      `select * from maz_ecommerce.category where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getCategoryByProductId: (id, callBack) => {
    pool.query(
      `select * from maz_ecommerce.category inner join maz_ecommerce.product on maz_ecommerce.category.id = maz_ecommerce.product.category_id where maz_ecommerce.product.id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  getCategoryByCollectionId: (id, callBack) => {
    pool.query(
      `  select * from maz_ecommerce.category c where c.id=(select col.category_id from maz_ecommerce.collections col inner join maz_ecommerce.product p on col.id = p.collection_id where p.id = ?)`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getCategoriesBySupplierId: (id, callBack) => {
    pool.query(
      `  select * from maz_ecommerce.category  where maz_ecommerce.category.supplier_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          console.log(error)
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },


  updateCategoryById: (id,data, callBack) => {
    pool.query(
      `update maz_ecommerce.category set `+Object.keys(data).map(key => `${key} = ?`).join(", ") +" where id =?",
        [
          ...Object.values(data),
          id
      ],
      (error, result, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, result);
      }
    );
  },
  deleteCategoryById: (id, callBack) => {
    pool.query(
      `delete from maz_ecommerce.category where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("error occured "+error)
          return callBack(error,null);
        }
        console.log("results are "+results[0])
        return callBack(null,results);
      }
    );
  },
  deleteAllCategories: (callBack) => {
    pool.query(
      `delete from maz_ecommerce.category`,
      [],
      (error, results, fields) => {
        if (error) {
          console.log("error occured "+err)
          return callBack(error,null);
        }
        console.log("results are "+results[0])
        return callBack(null,results);
      }
    );
  },

};