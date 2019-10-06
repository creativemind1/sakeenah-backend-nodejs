"use strict";
/**
 * @description This API is used to provide logic to MAPP
 * @author Ahmed
 * @since MAR-28-2019
 *
 */

let UserProfileModel = require("../model/UserProfileModel");
let UserPlayListModel = require("../model/UserPlayListModel");
let MediaModel = require("../model/MediaModel");
let PlayListModel = require("../model/PlayListModel");
let CategoryModel = require("../model/CategoryModel");
var randomstring = require("randomstring");
var async = require("async");
var bcrypt = require("bcrypt-nodejs");
var email = require("../helper/email");
var fs = require("fs");
var handlebars = require("handlebars");
var webService = require("../config/webservice");
var webUrl = webService.webUrl();
var jwt = require("jsonwebtoken");
var config = require("../config/config-" + process.env.NODE_ENV + ".js");
//var config = require("./config/config-" + process.env.NODE_ENV + ".js");

// This method is to resister new customer through APP.
exports.signUp = function(req, res) {
  var userProfileModel = new UserProfileModel();

  var firstName = req.body.firstName;

  userProfileModel.firstName = firstName;
  userProfileModel.emailId = req.body.emailId;
  userProfileModel.type = req.body.type;
  var userId = randomstring.generate(10);
  var content;

  let validateLoginData = nCallback => {
    if (req.body.emailId) {
      UserProfileModel.findOne(
        { emailId: req.body.emailId, type: req.body.type },
        function(err, doc) {
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
        }
      );
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
        return nCallback();
      } else {
        var template = handlebars.compile(data);
        var verfiyEmail = webUrl.verfiyEmail + userId;
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
  if (req.body.socialMedia) {
    // validate the social media use cases
    if (req.body.emailId) {
      UserProfileModel.findOneAndUpdate(
        { emailId: req.body.emailId, type: "B2C" },
        { socialMedia: true, active: true },
        { upsert: false },
        function(err, doc) {
          if (err) {
            res.json({
              status: "FAILED",
              message: err
            });
          } else {
            if (doc) {
              // This is the use case for logged in .
              //Generate Token
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
                doc.freeTrial = true;
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
                    message: "Expired 7 Day Free Trial"
                  });
                }
              }
            } else {
              // Continue to register
              userProfileModel.userId = userId;
              userProfileModel.create_date = new Date();
              userProfileModel.socialMedia = true;
              userProfileModel.active = true;
              userProfileModel.save(function(error, response) {
                if (error) {
                  res.json({
                    status: "FAILED",
                    message: error
                  });
                } else {
                  //Generate Token
                  const payload = { emailId: req.body.emailId };
                  var token = jwt.sign(payload, config.secret(), {
                    expiresIn: "24h" // expires in 24 hours
                  });

                  response.freeTrial = true;
                  res.json({
                    status: "SUCCESS",
                    message: response,
                    token: token
                  });
                }
              });
            }
          }

          // if (doc) {
          //   console.log("--- Test ---", doc);
          //   doc.socialMedia = true;
          //   doc.active = true;
          //   doc.save(function(error, response) {
          //     if (error) {
          //       res.json({
          //         status: "FAILED",
          //         message: error
          //       });
          //     } else {
          //       // This is the use case for logged in .
          //       //Generate Token
          //       const payload = { emailId: req.body.emailId };
          //       var token = jwt.sign(payload, config.secret(), {
          //         expiresIn: "24h" // expires in 24 hours
          //       });
          //       if (doc.premiumUser) {
          //         doc.freeTrial = true;
          //         res.json({
          //           status: "SUCCESS",
          //           message: doc,
          //           token: token
          //         });
          //       } else {
          //         //validating the free trial period
          //         var currentdate = new Date();
          //         var logindate = doc.create_date;
          //         // time difference
          //         var timeDiff = Math.abs(
          //           logindate.getTime() - currentdate.getTime()
          //         );
          //         // days difference
          //         var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          //         doc.freeTrial = true;
          //         if (diffDays < 8) {
          //           res.json({
          //             status: "SUCCESS",
          //             message: doc,
          //             token: token
          //           });
          //         } else {
          //           doc.freeTrial = false;
          //           res.json({
          //             status: "FAILED",
          //             message: "Expired 7 Day Free Trial"
          //           });
          //         }
          //       }
          //     }
          //   });
          // } else {
          //   // Continue to register
          //   userProfileModel.userId = userId;
          //   userProfileModel.create_date = new Date();
          //   userProfileModel.socialMedia = true;
          //   userProfileModel.active = true;
          //   userProfileModel.save(function(error, response) {
          //     if (error) {
          //       res.json({
          //         status: "FAILED",
          //         message: error
          //       });
          //     } else {
          //       //Generate Token
          //       const payload = { emailId: req.body.emailId };
          //       var token = jwt.sign(payload, config.secret(), {
          //         expiresIn: "24h" // expires in 24 hours
          //       });

          //       response.freeTrial = true;
          //       res.json({
          //         status: "SUCCESS",
          //         message: response,
          //         token: token
          //       });
          //     }
          //   });
          // }
        }
      );
    } else {
      res.json({
        status: "FAILED",
        message: "Request is not proper"
      });
    }
  } else {
    async.series(
      [validateLoginData.bind(), createHashPassword.bind(), readContent.bind()],
      function(err, response) {
        if (err) {
          res.json({
            status: "FAILED",
            message: err
          });
        } else {
          userProfileModel.userId = userId;
          userProfileModel.create_date = new Date();
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
  }
};

//This method is to validate the login successfully
exports.login = function(req, res) {
  if (req.body.emailId && req.body.password) {
    UserProfileModel.findOne(
      { emailId: req.body.emailId, type: req.body.type, active: true },
      function(err, doc) {
        if (doc && doc.password) {
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
              doc.freeTrial = true;
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
                  message: "Expired 7 Day Free Trial"
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
  var userId;
  var content;
  var firstName;
  UserProfileModel.findOne(
    { emailId: req.body.emailId, type: req.body.type },
    function(err, doc) {
      if (doc) {
        userId = doc.userId;
        firstName = doc.firstName;
        doc.password = bcrypt.hashSync(
          req.body.password,
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
            async.series([readContent.bind()], function(err, response) {
              if (err) {
                res.json({
                  status: "FAILED",
                  message: err
                });
              } else {
                // send email
                var emailObj = {
                  html: content,
                  recipientEmail: req.body.emailId,
                  subject: "Reset Password Verificaton Email",
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
                  message: "Successfully Updated Password"
                });
              }
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

  let readContent = nCallback => {
    fs.readFile("./server/template/verifyEmail.html", "utf8", function(
      err,
      data
    ) {
      if (err) {
        return nCallback();
      } else {
        var template = handlebars.compile(data);
        var verfiyEmail = webUrl.verfiyEmail + userId;
        var replacements = {
          firstName: firstName,
          userlink: verfiyEmail
        };
        var htmlToSend = template(replacements);
        content = htmlToSend;
        return nCallback();
      }
    });
  };
};
// This method is to get the media based on catergory ids
exports.getMedia = function(req, res) {
  if (req.body.categoryId && req.body.companyId && !req.body.subCategoryId) {
    let aggregatorData = [
      // Stage 1
      {
        $match: {
          categoryId: req.body.categoryId
        }
      }, // Stage 2
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategoryId",
          foreignField: "subCategoryId",
          as: "subcategories"
        }
      },
      // Stage 3
      {
        $project: {
          mediaId: 1,
          title: 1,
          thumbImageUrl: 1,
          narrator: 1,
          author: 1,
          description: 1,
          premium: 1,
          subcategories: { subCategoryId: 1, subCategoryName: 1 }
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
        res.json({
          status: "SUCCESS",
          message: data
        });
      }
    });
  } else if (
    req.body.categoryId &&
    req.body.companyId &&
    req.body.subCategoryId
  ) {
    let aggregatorData = [
      // Stage 1
      {
        $match: {
          categoryId: req.body.categoryId,
          subCategoryId: req.body.subCategoryId
        }
      }, // Stage 2
      {
        $project: {
          mediaId: 1,
          title: 1,
          thumbImageUrl: 1,
          author: 1,
          premium: 1
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
      // // Stage 3
      {
        $project: {
          _id: 0,
          categoryId: 1,
          categoryName: 1,
          description: 1,
          companyId: 1
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

exports.getUserProfile = function(req, res) {
  if (req.body.userId) {
    let aggregatorData = [
      // Stage 1
      {
        $match: {
          userId: req.body.userId
        }
      },

      // Stage 2
      {
        $project: {
          userId: 1,
          _id: 0,
          emailId: 1,
          type: 1,
          firstName: 1,
          age: 1,
          country: 1,
          profileUrl: 1
        }
      }
    ];

    UserProfileModel.aggregate(aggregatorData, function(err, data) {
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
      message: "User Id Not available in Request"
    });
  }
};

exports.saveUserProfile = function(req, res) {
  if (req.body.userId) {
    console.log(req.body.firstName, "-SSHSHSHSHS");
    // UserProfileModel.findOneAndUpdate(
    //   { userId: req.body.userId },
    //   {
    //     $set: {
    //       firstName: req.body.firstName,
    //       emailId: req.body.emailId,
    //       age: req.body.age,
    //       country: req.body.country,
    //       profileUrl: req.body.profileUrl
    //     }
    //   },
    //   { new: true, upsert: false },
    //   (err, doc) => {
    //     if (err) {
    //       res.json({
    //         status: "FAILED",
    //         message: err
    //       });
    //     }
    //     console.log(doc)
    //     res.json({
    //       status: "SUCCESS",
    //       message: doc
    //     });
    //   }
    // );
    UserProfileModel.findOneAndUpdate(
      { userId: req.body.userId },
      {
        $set: {
          firstName: req.body.firstName,
          emailId: req.body.emailId,
          age: req.body.age,
          country: req.body.country,
          profileUrl: req.body.profileUrl
        }
      }, 
      { new: true, upsert: false },
      function(err, data) {
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
      }
    );
  }
};

// This method is to the complete playlists of media
exports.getPlayList = function(req, res) {
  if (req.body.mediaId && req.body.userId) {
    let dayNo = 0;
    let finalRespose = {};
    let validateUserPlaylist = nCallback => {
      if (req.body.userId) {
        UserPlayListModel.findOne(
          { userId: req.body.userId },
          "dayNo",
          function(err, doc) {
            if (doc) {
              dayNo = doc.dayNo;
              //   finalRespose["dayNo"] = dayNo;
            } else {
              //  finalRespose["dayNo"] = dayNo;
            }
          }
        );
        return nCallback();
      } else {
        return nCallback();
      }
    };

    let loadPlaylist = nCallback => {
      if (req.body.mediaId) {
        let aggregatorData = [
          // Stage 1
          {
            $match: {
              mediaId: req.body.mediaId
            }
          },

          // Stage 2
          {
            $lookup: {
              from: "media",
              localField: "mediaId",
              foreignField: "mediaId",
              as: "media"
            }
          },

          // Stage 3
          {
            $project: {
              _id: 0,
              thumbImageUrl: 1,
              selectDay: 1,
              premium: 1,
              mediaId: 1,
              playListId: 1,
              name: 1,
              mediaTitle: { $arrayElemAt: ["$media.title", 0] },
              mediaDescription: { $arrayElemAt: ["$media.description", 0] }
            }
          }
        ];
        PlayListModel.aggregate(aggregatorData, function(err, doc) {
          if (doc) {
            doc.forEach(element => {
              console.log(
                "== element ===",
                element.selectDay,
                " day no ",
                dayNo,
                " cond ",
                element.selectDay <= dayNo
              );

              if (element.selectDay <= dayNo) {
                element["finish"] = true;
              } else {
                element["finish"] = false;
              }
            });
            finalRespose["data"] = doc;
            return nCallback();
          } else {
            return nCallback();
          }
        });
      } else {
        return nCallback();
      }
    };

    async.parallel([loadPlaylist.bind(), validateUserPlaylist.bind()], function(
      err,
      response
    ) {
      if (err) {
        res.json({
          status: "FAILED",
          message: err
        });
      } else {
        res.json({
          status: "SUCCESS",
          message: finalRespose
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

// Save User Play List
exports.saveUserPlayList = function(req, res) {
  if (req.body.userId && req.body.mediaId) {
    //Existing playlist

    UserPlayListModel.findOneAndUpdate(
      { userId: req.body.userId },
      { dayNo: req.body.dayNo },
      { upsert: false },
      function(err, doc) {
        if (err) {
          console.log("----err--- ", err);
        } else {
          console.log("---doc--- ", doc);
          if (doc) {
            res.json({
              status: "SUCCESS",
              message: "Successfully  Updated PlayList "
            });
          } else {
            var userPlayListModel = new UserPlayListModel();
            userPlayListModel.userId = req.body.userId;
            userPlayListModel.mediaId = req.body.mediaId;
            userPlayListModel.dayNo = req.body.dayNo;
            userPlayListModel.create_date = new Date();
            userPlayListModel.save(function(error) {
              if (error) {
                res.json({
                  status: "FAILED",
                  message: error
                });
              } else {
                res.json({
                  status: "SUCCESS",
                  message: "Successfully  saveUserPlayList "
                });
              }
            });
          }
        }
      }
    );
  } else {
  }
};
