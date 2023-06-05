const db = require("../utils/connectdb");
const jwt = require("jsonwebtoken");

//Get user with a specif ID
const getUser = (req, res) => {
  try {
    const id = req.params.id;
    db.query(
      "SELECT * FROM users where user_id = ?",
      [id],
      function (err, data) {
        //If there is an error with the query
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
            err,
          });
        }

        //No user was found
        if (data.length === 0) {
          return res.status(404).json({
            success: true,
            message: `No user foud with id: ${req.params.id}`,
          });
        }

        //User have been found
        return res.status(200).json({
          success: true,
          data,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Sever Error",
      err,
    });
  }
};

//Update a user profile
const updateUser = (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Please provide a token",
    });
  }
  const decoded = jwt.verify(req.body.token, "secerate_key");
  if (!decoded) {
    return res.status(401).json({
      success: true,
      message: "You are not authenticatd please login",
    });
  }

  const Email = req.params.email;

  if (Email === decoded.Email) {
    //Checking if the user exist
    db.query(
      "SELECT * FROM users where Email = ?",
      [Email],
      function (err, data) {
        //If there is a error in the query
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
            err,
          });
        }

        //Check if the user is found
        if (data.length === 0) {
          return res.status(404).json({
            success: true,
            message: `No user was found with Email: ${req.params.email}`,
          });
        }
      }
    );

    const info = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phoneNumber,
      req.body.profilePicture,
      Email,
    ];

    //Update the user information
    db.query(
      "UPDATE users SET first_name = ? , last_name = ?, email = ?, phone_number = ?, profile_picture = ? where Email = ?",
      info,
      function (err, data) {
        //If there is an error
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
            err,
          });
        }
      }
    );

    //First update the Crendiantls table
    db.query(
      "UPDATE credentials set Email = ? where Email = ?",
      [req.body.email, Email],
      (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        return res.status(200).json({
          success: true,
          message: "user profile have been updated",
        });
      }
    );
  } else {
    res.status(409).json({
      success: false,
      message: "You are not allowed to do the operation.",
    });
  }
};

//Delete a user profile
const deleteUser = (req, res) => {
  try {
    //Check authentication

    const token = req.body.token;
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Please provide a token",
      });
    }
    const decoded = jwt.verify(req.body.token, "secerate_key");
    if (!decoded) {
      return res.status(401).json({
        success: true,
        message: "You are not authenticatd please login",
      });
    }

    const email = req.params.email;

    if (email === decoded.Email) {
      //Checking if the user exist
      db.query(
        "SELECT * FROM credentials where Email = ?",
        [email],
        function (err, data) {
          //If there is a error in the query
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message,
              err,
            });
          }

          //Check if the user is found
          if (data.length === 0) {
            return res.status(404).json({
              success: true,
              message: `No user was found with email: ${req.params.email}`,
            });
          }
        }
      );

      //Delete the user information
      db.query(
        "DELETE FROM credentials WHERE Email = ?",
        req.params.email,
        function (err, data) {
          //If there is an error
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message,
              err,
            });
          }

          return res.status(200).json({
            success: true,
            message: "user profile have been Deleted",
          });
        }
      );
    } else {
      return res.status(403).json({
        success: false,
        message: "email dose not macth or login in again",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};
module.exports = { getUser, updateUser, deleteUser };
