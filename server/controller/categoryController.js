"use strict";
/**
 * @description This API is used to provide services to CMS
 * @author Ahmed
 * @since MAR-28-2019
 *
 */

let CategoryModel = require("../model/CategoryModel");
let SubCategoryModel = require("../model/SubCategoryModel");
let MediaModel = require("../model/MediaModel");
let PlayListModel = require("../model/PlayListModel");
var randomstring = require("randomstring");
var Default_Category_Id = 'zTdpUn9H0h';

// This method is to perform operations for categories.

exports.category = function(req, res) {
  var type = req.body.type;
  switch (type) {
    case "SAVE":
      {
        if (Default_Category_Id) {
          var modify_date = new Date();
          CategoryModel.findOneAndUpdate(
            { categoryId: Default_Category_Id },
            {
              categoryName: req.body.categoryName,
              modifiedBy: req.body.userId,
              description: req.body.description,
              modify_date: modify_date,
              active: req.body.active
            },
            { upsert: false },
            function(err, doc) {
              if (doc) {
                res.json({
                  status: "SUCCESS",
                  message: "Successfully Updated Category"
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: err
                });
              }
            }
          );
        } else {
          var categoryModel = new CategoryModel();
          categoryModel.categoryId = randomstring.generate(10);
          categoryModel.createdBy = req.body.userId;
          categoryModel.active = req.body.active;
          categoryModel.categoryName = req.body.categoryName;
          categoryModel.companyId = req.body.companyId;
          categoryModel.description = req.body.description;
          categoryModel.create_date = new Date();
          categoryModel.save(function(error) {
            if (error) {
              res.json({
                status: "FAILED",
                message: error
              });
            } else {
              res.json({
                status: "SUCCESS",
                message: "Successfully Category Saved"
              });
            }
          });
        }
      }
      break;
    case "DELETE":
      {
        if (Default_Category_Id) {
          CategoryModel.deleteOne({ categoryId: Default_Category_Id }, function(
            err,
            doc
          ) {
            if (doc && doc.deletedCount == 1) {
              res.json({
                status: "SUCCESS",
                message: "Successfully Deleted Category"
              });
            } else {
              res.json({
                status: "FAILED",
                message: "No Data Available"
              });
            }
          });
        } else {
          res.json({
            status: "FAILED",
            message: "Category Id Missing in Request "
          });
        }
      }
      break;
    case "LOAD":
      {
        if (req.body.companyId) {
          CategoryModel.find({ companyId: req.body.companyId }, function(
            err,
            doc
          ) {
            if (doc) {
              res.json({
                status: "SUCCESS",
                message: doc
              });
            } else {
              res.json({
                status: "FAILED",
                message: "No Data Available"
              });
            }
          });
        } else {
          res.json({
            status: "FAILED",
            message: "Company Id Missing in Request "
          });
        }
      }
      break;
    case "CATEGORY_NAMES":
      {
        if (req.body.companyId) {
          CategoryModel.find(
            { companyId: req.body.companyId },
            "categoryName categoryId",
            function(err, doc) {
              if (doc) {
                res.json({
                  status: "SUCCESS",
                  message: doc
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "No Data Available"
                });
              }
            }
          );
        } else {
          res.json({
            status: "FAILED",
            message: "Company Id Missing in Request "
          });
        }
      }
      break;

    default:
      break;
  }
};

// This method is to perform operations for subCategories.
exports.subCategory = function(req, res) {
  var type = req.body.type;
  switch (type) {
    case "SAVE":
      {
        if (req.body.subCategoryId) {
          var modify_date = new Date();
          SubCategoryModel.findOneAndUpdate(
            { subCategoryId: req.body.subCategoryId },
            {
              subCategoryName: req.body.subCategoryName,
              modifiedBy: req.body.userId,
              modify_date: modify_date,
              description: req.body.description,
              categoryId: Default_Category_Id,
              active: req.body.active
            },
            { upsert: false },
            function(err, doc) {
              if (doc) {
                res.json({
                  status: "SUCCESS",
                  message: "Successfully Updated Category"
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: err
                });
              }
            }
          );
        } else {
          var subCategoryModel = new SubCategoryModel();
          subCategoryModel.categoryId = Default_Category_Id;
          subCategoryModel.subCategoryId = randomstring.generate(10);
          subCategoryModel.createdBy = req.body.userId;
          subCategoryModel.subCategoryName = req.body.subCategoryName;
          subCategoryModel.companyId = req.body.companyId;
          subCategoryModel.create_date = new Date();
          subCategoryModel.description = req.body.description;
          subCategoryModel.active = req.body.active;
          subCategoryModel.save(function(error) {
            if (error) {
              res.json({
                status: "FAILED",
                message: error
              });
            } else {
              res.json({
                status: "SUCCESS",
                message: "Successfully Sub Category Saved"
              });
            }
          });
        }
      }
      break;
    case "DELETE":
      {
        if (req.body.subCategoryId) {
          SubCategoryModel.deleteOne(
            { subCategoryId: req.body.subCategoryId },
            function(err, doc) {
              if (doc && doc.deletedCount == 1) {
                res.json({
                  status: "SUCCESS",
                  message: "Successfully Deleted Sub Category"
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "No Data Available"
                });
              }
            }
          );
        } else {
          res.json({
            status: "FAILED",
            message: "SubCategory Id Missing in Request "
          });
        }
      }
      break;
    case "LOAD":
      {
        if (req.body.companyId) {
          SubCategoryModel.find({ companyId: req.body.companyId }, function(
            err,
            doc
          ) {
            if (doc) {
              res.json({
                status: "SUCCESS",
                message: doc
              });
            } else {
              res.json({
                status: "FAILED",
                message: "No Data Available"
              });
            }
          });
        } else {
          res.json({
            status: "FAILED",
            message: "Company Id Missing in Request "
          });
        }
      }
      break;
    case "GET_SUB_CATEGORY":
      {
        if (req.body.companyId && Default_Category_Id) {
          SubCategoryModel.find(
            {
              companyId: req.body.companyId,
              active: true,
              categoryId: { $in: Default_Category_Id }
            },
            function(err, doc) {
              if (doc) {
                res.json({
                  status: "SUCCESS",
                  message: doc
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "No Data Available"
                });
              }
            }
          );
        } else {
          res.json({
            status: "FAILED",
            message: "Company Id Missing in Request "
          });
        }
      }
      break;
    default:
      break;
  }
};

// This method is to perform operations for Media

exports.media = function(req, res) {
  var type = req.body.type;
  console.log(req.body, '=----ReqBody====')
  switch (type) {
    case "SAVE":
      {
        if (req.body.mediaId) {
          var modify_date = new Date();
          
          MediaModel.findOneAndUpdate(
            { mediaId: req.body.mediaId },
            {
              title: req.body.title,
              modifiedBy: req.body.userId,
              modify_date: modify_date,
              categoryId: Default_Category_Id,
              subCategoryId: req.body.subCategoryId,
              description: req.body.description,
              thumbImageUrl: req.body.thumbImageUrl,
              authorImageUrl: req.body.authorImageUrl,
              narrator: req.body.narrator,
              author: req.body.author,
              videoUrl: req.body.videoUrl,
              premium: req.body.premium,
              active: req.body.active,
              duration: req.body.duration
            },
            { upsert: false },
            function(err, doc) {
              if (doc) {
                res.json({
                  status: "SUCCESS",
                  message: "Successfully Updated Media"
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: err
                });
              }
            }
          );
        } else {
          var mediaModel = new MediaModel();
          mediaModel.categoryId = Default_Category_Id;
          mediaModel.subCategoryId = req.body.subCategoryId;
          mediaModel.mediaId = randomstring.generate(10);
          mediaModel.createdBy = req.body.userId;
          mediaModel.companyId = req.body.companyId;
          mediaModel.videoUrl = req.body.videoUrl;
          mediaModel.title = req.body.title;
          mediaModel.description = req.body.description;
          mediaModel.thumbImageUrl = req.body.thumbImageUrl;
          mediaModel.authorImageUrl = req.body.authorImageUrl;
          mediaModel.mediaType = req.body.mediaType;
          mediaModel.narrator = req.body.narrator;
          mediaModel.author = req.body.author;
          mediaModel.create_date = new Date();
          mediaModel.premium = req.body.premium;
          mediaModel.active = req.body.active;
          mediaModel.duration = req.body.duration;
          mediaModel.save(function(error) {
            if (error) {
              res.json({
                status: "FAILED",
                message: error
              });
            } else {
              res.json({
                status: "SUCCESS",
                message: "Successfully Saved Media"
              });
            }
          });
        }
      }
      break;
    case "DELETE":
      {
        if (req.body.mediaId) {
          MediaModel.deleteOne({ mediaId: req.body.mediaId }, function(
            err,
            doc
          ) {
            if (doc && doc.deletedCount == 1) {
              res.json({
                status: "SUCCESS",
                message: "Successfully Deleted Media"
              });
            } else {
              res.json({
                status: "FAILED",
                message: "No Data Available"
              });
            }
          });
        } else {
          res.json({
            status: "FAILED",
            message: "mediaId Id Missing in Request "
          });
        }
      }
      break;
    case "LOAD":
      {
        if (req.body.companyId) {
          MediaModel.find({ companyId: req.body.companyId }, function(
            err,
            doc
          ) {
            if (doc) {
              res.json({
                status: "SUCCESS",
                message: doc
              });
            } else {
              res.json({
                status: "FAILED",
                message: "No Data Available"
              });
            }
          });
        } else {
          res.json({
            status: "FAILED",
            message: "Company Id Missing in Request "
          });
        }
      }
      break;

    default:
      break;
  }
};

// This method is to perform operations for PlayLists.

exports.playlist = function(req, res) {
  var type = req.body.type;
  switch (type) {
    case "SAVE":
      {
        if (req.body.audioID) {
          var modify_date = new Date();
          PlayListModel.findOneAndUpdate(
            { audioID: req.body.audioID },
            {
              name: req.body.name,
              modifiedBy: req.body.userId,
              modify_date: modify_date,
              description: req.body.description,
              mediaId: req.body.mediaId,
              premium: req.body.premium,
              day: req.body.day,
              selectDay: req.body.selectDay,
              thumbImageUrl: req.body.thumbImageUrl
            },
            { upsert: false },
            function(err, doc) {
              if (doc) {
                res.json({
                  status: "SUCCESS",
                  message: "Successfully Updated PlayList"
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: err
                });
              }
            }
          );
        } else {
          var playListModel = new PlayListModel();
          playListModel.mediaId = req.body.mediaId;
          playListModel.audioID = randomstring.generate(10);
          playListModel.createdBy = req.body.userId;
          playListModel.premium = req.body.premium;
          playListModel.name = req.body.name;
          playListModel.authorBy = req.body.authorBy;
          playListModel.create_date = new Date();
          playListModel.description = req.body.description;
          playListModel.companyId = req.body.companyId;
          playListModel.selectDay = req.body.selectDay;
          playListModel.thumbImageUrl = req.body.thumbImageUrl;
          playListModel.save(function(error) {
            if (error) {
              res.json({
                status: "FAILED",
                message: error
              });
            } else {
              res.json({
                status: "SUCCESS",
                message: "Successfully Saved PlayList "
              });
            }
          });
        }
      }
      break;
    case "DELETE":
      {
        if (req.body.audioID) {
          PlayListModel.deleteOne({ audioID: req.body.audioID }, function(
            err,
            doc
          ) {
            if (doc && doc.deletedCount == 1) {
              res.json({
                status: "SUCCESS",
                message: "Successfully Deleted PlayList"
              });
            } else {
              res.json({
                status: "FAILED",
                message: "No Data Available"
              });
            }
          });
        } else {
          res.json({
            status: "FAILED",
            message: "playList Id Missing in Request "
          });
        }
      }
      break;
    case "LOAD":
      {
        if (req.body.companyId) {
          PlayListModel.find({ companyId: req.body.companyId }, function(
            err,
            doc
          ) {
            if (doc) {
              res.json({
                status: "SUCCESS",
                message: doc
              });
            } else {
              res.json({
                status: "FAILED",
                message: "No Data Available"
              });
            }
          });
        } else {
          res.json({
            status: "FAILED",
            message: "Company Id Missing in Request "
          });
        }
      }
      break;
    case "GET_SUB_CATEGORY":
      {
        if (req.body.companyId && Default_Category_Id) {
          SubCategoryModel.find(
            {
              companyId: req.body.companyId,
              categoryId: { $in: Default_Category_Id }
            },
            function(err, doc) {
              if (doc) {
                res.json({
                  status: "SUCCESS",
                  message: doc
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "No Data Available"
                });
              }
            }
          );
        } else {
          res.json({
            status: "FAILED",
            message: "Company Id Missing in Request "
          });
        }
      }
      break;
    default:
      break;
  }
};
