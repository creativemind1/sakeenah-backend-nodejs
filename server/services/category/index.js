let CategoryModel = require("../../model/SubCategoryModel");
module.exports = {
  list: (req, callback) => {
    let responseObj = { status: "FAILED", message: null };
    const projection = {
      _id: 0,
      subCategoryId: 1,
      subCategoryName: 1,
      description: 1
    };
    CategoryModel.find({}, projection, (err, docs) => {
      if (docs && docs.length) {
        responseObj.status = "SUCCESS";
        responseObj.message = docs;
      }
      callback(responseObj);
    });
  }
};
