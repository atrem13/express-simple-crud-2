var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM posts ORDER BY id DESC', function (err, rows) {
        if (err) {
            // req.flash('error', err);
            res.render('posts', {
                data: ''
            });
        } else {
            if(rows.length > 0) {
                //render ke view posts index
                res.render('posts/index', {
                    data: rows // <-- data posts
                });
            }else{
                res.render('posts', {
                    data: ''
                });
            }
        }
    });
});

module.exports = router;