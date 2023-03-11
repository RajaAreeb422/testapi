const pool = require("../../config/database");

module.exports = {
  addCollection: (data, callBack) => {
  
    pool.query(
      `insert into maz_ecommerce.collections set name=? , brand_id=?, tag_id=? , category_id=? `,
        [
        data.name,
        data.brand_id,
        data.tag_id,
        data.category_id,
       
       
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null,results);
      }
    );
  },
  uploadCollectionImage: (id, files, callBack) => {
    console.log('our files',files,id)
    return new Promise((resolve,reject)=>
    {
      let sql = "UPDATE maz_ecommerce.collections set path=? where id=?";
      
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
  getAllCollections: (callBack) => {
    pool.query(
      `select * from maz_ecommerce.collections`,
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
  getCollectionById: (id, callBack) => {
    pool.query(
      `select * from maz_ecommerce.collections where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getCollectionByCategoryId: (id, callBack) => {
    pool.query(
      `select * from maz_ecommerce.collections where maz_ecommerce.collections.category_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
    getCollectionByBrandId: (id, callBack) => {
    pool.query(
      `select * from maz_ecommerce.collections where maz_ecommerce.collections.brand_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
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

  updateCollectionById: (id,data, callBack) => {
    pool.query(
      `update maz_ecommerce.collections set `+Object.keys(data).map(key => `${key} = ?`).join(", ") +" where id =?",
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
  deleteCollectionById: (id, callBack) => {
    pool.query(
      `delete from maz_ecommerce.collections where id = ?`,
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