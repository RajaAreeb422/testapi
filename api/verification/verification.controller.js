const {
  addCategory,
  getAllCategories,
  CertificateVerification,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  deleteAllCategories,
  getParentCategories,
  uploadCategoryImage,
  getOwnersInfo,
  addOwnerInfo,
  addOwnerInfoM,
} = require("./verification.service");
const fs = require("fs");
const XLSX = require("xlsx");
module.exports = {
  addCategory: (req, res) => {
    var list = [];
    var f = req.file;
    var workbook = XLSX.readFile(`${req.file.path}`);
    var sheet_name_list = workbook.SheetNames;
    var json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log(json.length);
    json.map((item, i) => {
      let sr = item.SrNo;
      if (sr === null || sr === "") {
        sr = i + 1;
      }
      list.push({
        srNo: sr,
        formNo: item.AppFormNo.toString(),
        plotSize: item.PlotSize.toString(),
        dealerName: item.DealerName.toString(),
      });
    });

    addCategory(list, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
          error: err,
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Category Added Successfully ",
        data: results,
        //  InsertedId:results.insertId
      });
    });
  },

  addOwnerInfoG: (req, res) => {
    var list = [];
    var f = req.file;
    var workbook = XLSX.readFile(`${req.file.path}`);
    var sheet_name_list = workbook.SheetNames;
    var json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log("json", json);
    json.map((item, i) => {
      let sr = item.SNo;
      if (
        item.OldRegNo === null ||
        item.OldRegNo === "" ||
        item.OldRegNo === undefined ||
        item.OldRegNo==='xxxxxxxxxx' ||item.OldRegNo===xxxxxxxxxx
      )
        item.OldRegNo ="xxxxxxxxxxxxx";

      if (
        item.appFormNo === null ||
        item.appFormNo === "" ||
        item.appFormNo === undefined
      )
        item.appFormNo=" ";
      if (item.Name === null || item.Name === "" || item.Name === undefined)
        item.Name === "";
      if (
        item.MobileNo === null ||
        item.MobileNo === "" ||
        item.MobileNo === undefined
      )
        item.MobileNo = " ";
      if (
        item.Realtor === null ||
        item.Realtor === "" ||
        item.Realtor === undefined
      )
        item.Realtor =" ";
      if (
        item.Address === null ||
        item.Address === "" ||
        item.Address === undefined
      )
        item.Address =" ";
      if (
        item.DateOfPrinting === null ||
        item.DateOfPrinting === "" ||
        item.DateOfPrinting === undefined
      )
        item.DateOfPrinting = " ";
      if (
        item.DateOfDeliveryToHQ === null ||
        item.DateOfDeliveryToHQ === "" ||
        item.DateOfDeliveryToHQ === undefined
      )
        item.DateOfDeliveryToHQ = " ";

      if(item.Block === null ||
        item.Block === "" ||
        item.Block === undefined)  
        item.Block='General Range'


          if(item.Category === null ||
            item.Category  === "" ||
            item.Category  === undefined)  
            item.Category ='Residential' 

      list.push({
        sNo: sr,
        olgRegNo: item.OldRegNo,
        newRegNo: item.NewRegNo,
        appFormNo: item.AppFormNo,
        name: item.Name,
        realtor: item.Realtor,
        mobile: item.MobileNo,
        address: item.Address,
        dateOfPrint: item.DateOfPrinting,
        dateDlvHQ: item.DateOfDeliveryToHQ,
        block:item.Block,
        size:item.PlotSize,
        category:item.Category
      });
    });

    addOwnerInfo(list, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
          error: err,
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Owner Info Added Successfully ",
        data: results,
        //  InsertedId:results.insertId
      });
    });
  },


  addOwnerInfoM: (req, res) => {
    var list = [];
    var f = req.file;
    var workbook = XLSX.readFile(`${req.file.path}`);
    var sheet_name_list = workbook.SheetNames;
    var json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log("json", json);
    json.map((item, i) => {
      let sr = item.SNo;
      if (
        item.OldRegNo === null ||
        item.OldRegNo === "" ||
        item.OldRegNo === undefined ||
        item.OldRegNo==='xxxxxxxxxx' ||item.OldRegNo===xxxxxxxxxx
      )
        item.OldRegNo = "xxxxxxxxxxxxx";

      if (
        item.appFormNo === null ||
        item.appFormNo === "" ||
        item.appFormNo === undefined
      )
        item.appFormNo = " ";
      if (item.Name === null || item.Name === "" || item.Name === undefined)
        item.Name = "";
      if (
        item.MobileNo === null ||
        item.MobileNo === "" ||
        item.MobileNo === undefined
      )
        item.MobileNo = " ";
      if (
        item.Realtor === null ||
        item.Realtor === "" ||
        item.Realtor === undefined
      )
        item.Realtor =" ";
      if (
        item.Address === null ||
        item.Address === "" ||
        item.Address === undefined
      )
        item.Address =" ";
      if (
        item.DateOfPrinting === null ||
        item.DateOfPrinting === "" ||
        item.DateOfPrinting === undefined
      )
        item.DateOfPrinting = " ";
      if (
        item.DateOfDeliveryToHQ === null ||
        item.DateOfDeliveryToHQ === "" ||
        item.DateOfDeliveryToHQ === undefined
      )
        item.DateOfDeliveryToHQ = " ";

      if(item.Block === null ||
        item.Block === "" ||
        item.Block === undefined)  
        item.Block='Maple Range'

      if(item.Category === null ||
            item.Category  === "" ||
            item.Category  === undefined)  
            item.Category ='Residential' 

      list.push({
        sNo: sr,
        olgRegNo: item.OldRegNo,
        newRegNo: item.NewRegNo,
        appFormNo: item.AppFormNo,
        name: item.Name,
        realtor: item.Realtor,
        mobile: item.MobileNo,
        address: item.Address,
        dateOfPrint: item.DateOfPrinting,
        dateDlvHQ: item.DateOfDeliveryToHQ,
        block:item.Block,
        size:item.PlotSize,
        category:item.Category
      });
    });

    addOwnerInfo(list, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
          error: err,
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Owner Info Added Successfully ",
        data: results,
        //  InsertedId:results.insertId
      });
    });
  },
  
  getAllCategories: (req, res) => {
    getAllCategories((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
          error: err,
        });
      }
   
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
    getOwnersInfo: (req, res) => {
    getOwnersInfo((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
          error: err,
        });
      }
   
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  CertificateVerification: (req, res) => {
    let list = req.body;
    CertificateVerification(list, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database connection errror",
          error: err,
        });
      }

      return res.json({
        success: 1,
        message: "Records Added successfully",
        data: results,
      });
    });
  },
  
};
