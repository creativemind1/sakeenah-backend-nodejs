"use strict";
/**
 * @description This API is used to provide logic to MAPP
 * @author Ahmed
 * @since MAR-28-2019
 *
 */

let UserProfileModel = require("../model/UserProfileModel");
let MediaModel = require("../model/MediaModel");
let CategoryModel = require("../model/CategoryModel");
let SubCategoryModel = require("../model/SubCategoryModel");
var randomstring = require("randomstring");
var async = require("async");
var bcrypt = require("bcrypt-nodejs");
var email = require("../helper/email");
var fs = require("fs");
var express = require("express");
var path = require("path");
var handlebars = require("handlebars");
var webService = require("../config/webservice");
var webUrl = webService.webUrl();
var jwt = require("jsonwebtoken");
var config = require("../config/config-" + process.env.NODE_ENV + ".js");
//var config = require("./config/config-" + process.env.NODE_ENV + ".js");

// This method is to resister new customer through APP.
exports.signUp = function(req, res) {
  var userProfileModel = new UserProfileModel();
  var userId = randomstring.generate(10);
  var firstName = req.body.firstName;
  userProfileModel.userId = userId;
  userProfileModel.firstName = firstName;
  userProfileModel.emailId = req.body.emailId;
  userProfileModel.type = req.body.type;
  userProfileModel.create_date = new Date();
  var content;

  let validateLoginData = nCallback => {
    if (req.body.emailId) {
      UserProfileModel.findOne({ emailId: req.body.emailId }, function(
        err,
        doc
      ) {
        if (doc) {
          // Already same email id exists
          res.json({
            status: "FAILED",
            message: "Email Id exists"
          });
        } else {
          // Continue to register
          return nCallback();
        }
      });
    } else {
      return nCallback();
    }
  };

  let createHashPassword = nCallback => {
    if (req.body.pswd) {
      userProfileModel.password = bcrypt.hashSync(
        req.body.pswd,
        bcrypt.genSaltSync(8),
        null
      );
      return nCallback();
    } else {
      return nCallback();
    }
  };
  let readContent = nCallback => {
    fs.readFile("./server/template/verifyEmail.html", "utf8", function(
      err,
      data
    ) {
      if (err) {
        console.log("=== file path error===", err);
        return nCallback();
      } else {
        var template = handlebars.compile(data);
        var verfiyEmail = webUrl.verfiyEmail + userId;
        console.log("=== configuration variable =======", verfiyEmail);
        var replacements = {
          firstName: firstName,
          userlink: verfiyEmail
          //userlink: "http://localhost:8080/api/verifyEmail?userId=" + userId
        };
        var htmlToSend = template(replacements);
        content = htmlToSend;
        return nCallback();
      }
    });
  };
  async.series(
    [validateLoginData.bind(), createHashPassword.bind(), readContent.bind()],
    function(err, response) {
      if (err) {
        res.json({
          status: "FAILED",
          message: err
        });
      } else {
        userProfileModel.save(function(error) {
          if (error) {
            res.json({
              status: "FAILED",
              message: error
            });
          } else {
            // send email
            var emailObj = {
              html: content,
              recipientEmail: req.body.emailId,
              subject: "Verificaton Email",
              message: userId
            };
            email.sendmail(emailObj, function(err, data) {
              if (err) console.log("----mail not sent-----" + err);
              else {
                console.log("----mail sent-----" + data);
              }
            });
            res.json({
              status: "SUCCESS",
              message: "Successfully registered"
            });
          }
        });
      }
    }
  );
};

//This method is to validate the login successfully
exports.login = function(req, res) {
  console.log("==== Login ====", req.body);
  if (req.body.emailId && req.body.password) {
    UserProfileModel.findOne(
      { emailId: req.body.emailId, type: req.body.type },
      function(err, doc) {
        if (doc) {
          // Comparing the password
          if (bcrypt.compareSync(req.body.password, doc.password)) {
            // Payment is Done .Its a premium User
            const payload = { emailId: req.body.emailId };
            var token = jwt.sign(payload, config.secret(), {
              expiresIn: "24h" // expires in 24 hours
            });
            if (doc.premiumUser) {
              doc.freeTrial = true;
              res.json({
                status: "SUCCESS",
                message: doc,
                token: token
              });
            } else {
              //validating the free trial period
              var currentdate = new Date();
              var logindate = doc.create_date;
              // time difference
              var timeDiff = Math.abs(
                logindate.getTime() - currentdate.getTime()
              );
              // days difference
              var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

              if (diffDays < 8) {
                res.json({
                  status: "SUCCESS",
                  message: doc,
                  token: token
                });
              } else {
                doc.freeTrial = false;
                res.json({
                  status: "FAILED",
                  message: doc
                });
              }
            }
          } else {
            res.json({
              status: "FAILED",
              message: "PASSWORD NOT MATCHING"
            });
          }
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
      message: "Provide Valid Credentials"
    });
  }
};

// This method is to reset the pasword
exports.resetPswd = function(req, res) {
  var userProfileModel = new UserProfileModel();

  UserProfileModel.findOne(
    { emailId: req.body.emailId, type: req.body.type },
    function(err, doc) {
      if (doc) {
        doc.password = bcrypt.hashSync(
          req.body.pswd,
          bcrypt.genSaltSync(8),
          null
        );
        //Again the customer needs to activate the link from email
        doc.active = false;
        doc.save(function(error) {
          if (error) {
            res.json({
              status: "FAILED",
              message: error
            });
          } else {
            res.json({
              status: "SUCCESS",
              message: "Successfully Updated Password"
            });
          }
        });
      } else {
        res.json({
          status: "FAILED",
          message: "No Data Available"
        });
      }
    }
  );
};
// This method is to get the media based on catergory ids
exports.getMedia = function(req, res) {
  if (req.body.categoryId && req.body.companyId) {
    var consolidate = [];

    consolidate.push({ companyId: req.body.companyId });
    consolidate.push({ categoryId: req.body.categoryId });
    if (
      req.body.subCategoryId !== null &&
      req.body.subCategoryId !== "" &&
      req.body.subCategoryId !== undefined
    ) {
      consolidate.push({ subCategoryId: req.body.subCategoryId });
    }

    let aggregatorData = [
      // Stage 1
      {
        $match: {
          $and: consolidate
        }
      }, // Stage 2
      {
        $project: {
          mediaId: 1,
          videoUrl: 1,
          title: 1,
          thumbImageUrl: 1,
          mediaType: 1
        }
      }
    ];

    MediaModel.aggregate(aggregatorData, function(err, data) {
      if (err) {
        res.json({
          status: "FAILED",
          message: err
        });
      } else {
        console.log("=== response ===", data);
        res.json({
          status: "SUCCESS",
          message: data
        });
      }
    });
  } else {
    res.json({
      status: "FAILED",
      message: " Request is not proper"
    });
  }
};

// This method is to get the list of categories and subcategoires
exports.getCategories = function(req, res) {
  if (req.body.companyId) {
    let aggregatorData = [
      // Stage 1
      {
        $match: {
          companyId: req.body.companyId,
          active: true
        }
      },

      // Stage 2
      {
        $lookup: {
          from: "subcategories",
          localField: "categoryId",
          foreignField: "categoryId",
          as: "subcategories"
        }
      },

      // Stage 3
      {
        $project: {
          _id: 0,
          categoryId: 1,
          categoryName: 1,
          description: 1,
          subCategoryId: { $arrayElemAt: ["$subcategories.subCategoryId", 0] },
          subCategoryName: {
            $arrayElemAt: ["$subcategories.subCategoryName", 0]
          },
          active: { $arrayElemAt: ["$subcategories.active", 0] }
        }
      },

      // Stage 4
      {
        $match: {
          active: true
        }
      }
    ];

    CategoryModel.aggregate(aggregatorData, function(err, data) {
      if (err) {
        res.json({
          status: "FAILED",
          message: err
        });
      } else {
        res.json({
          status: "SUCCESS",
          message: data
        });
      }
    });
  } else {
    res.json({
      status: "FAILED",
      message: " Request is not proper"
    });
  }
};

//This method is to validate the Email from the activate link
exports.verifyEmail = function(req, res) {
  var reqParams = req.query;
  console;
  if (reqParams && reqParams.userId) {
    UserProfileModel.findOneAndUpdate(
      { userId: reqParams.userId },
      { active: true },
      { upsert: false },
      function(err, doc) {
        if (doc) {
          res.writeHead(200, {
            "Content-Type": "text/html"
          });
          fs.readFile("./server/template/thanks.html", null, function(
            error,
            data
          ) {
            if (error) {
              res.writeHead(404);
              res.write("Whoops! File not found!");
            } else {
              res.write(data);
            }
            res.end();
          });
        } else {
          res.writeHead(200, {
            "Content-Type": "text/html"
          });
          fs.readFile("./server/template/error.html", null, function(
            error,
            data
          ) {
            if (error) {
              res.writeHead(404);
              res.write("Whoops! File not found!");
            } else {
              res.write(data);
            }
            res.end();
          });
        }
      }
    );
  } else {
    res.json({
      status: "FAILED",
      message: "User Id Matching Failed"
    });
  }
};
