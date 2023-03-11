const pool = require("../../config/database");

module.exports = {
  addCategory: (data, callBack) => {
    console.log(data.length)
    let sql = data.map(item => `(${item.srNo}, '${item.formNo}', '${item.plotSize}','${item.dealerName}')`)
 
    const finalQuery = "INSERT INTO maz_ecommerce.fileverification (sr_no, app_form_no, plot_size,dealer_name) VALUES " + sql

    pool.query(finalQuery,

        (error, results, fields) => {
          if (error) {
            return callBack(error,null);
          }
          return callBack(null,results);
        }
      );
  },
  
  addOwnerInfo: (data, callBack) => {

    let sql = data.map(item => `('${item.sNo}', '${item.oldRegNo}', '${item.newRegNo}','${item.appFormNo}',
    '${item.name}', '${item.mobile}', '${item.realtor}','${item.address}',
    '${item.dateOfPrint}', '${item.dateDlvHQ}','${item.block}', '${item.size}','${item.category}')`)
 
    const finalQuery = "INSERT INTO maz_ecommerce.file_owners_info (sNo,old_regNo,new_regNo,appFormNo,name,mobile,retailer_name,address,date_of_printing,date_of_dlv_hq,block,plot_size,category) VALUES " + sql

    pool.query(finalQuery,

        (error, results, fields) => {
          if (error) {
            return callBack(error,null);
          }
          return callBack(null,results);
        }
      );
  },

  
  getAllCategories: (callBack) => {
    pool.query(
      `select * from maz_ecommerce.fileverification`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
   getOwnersInfo: (callBack) => {
    pool.query(
      `select * from maz_ecommerce.file_owners_info`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  
  getAllCertificatesNo: (callBack) => {
    pool.query(
      `select * from maz_ecommerce.certificate_verification`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  
    CertificateVerification: (data, callBack) => {
  
    let sql = data.map(item => `('${item.crNo}')`)
 
    const finalQuery = "INSERT INTO maz_ecommerce.certificate_verification (cr_no) VALUES " + sql

    pool.query(finalQuery,

        (error, results, fields) => {
          if (error) {
            return callBack(error,null);
          }
          return callBack(null,results);
        }
      );
 
    
  }


  
  
};

