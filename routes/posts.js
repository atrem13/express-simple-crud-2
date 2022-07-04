var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM post ORDER BY id DESC', function (err, rows) {
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

router.get('/create', function (req, res, next) {
    res.render('posts/create', {
        title: '',
        content: ''
    })
})

router.post('/store', function (req, res, next) {
    
    let title   = req.body.title;
    let content = req.body.content;
    let errors  = false;

    if(title.length === 0) {
        errors = true;
        res.render('posts/create', {
            title: title,
            content: content
        })
    }

    if(content.length === 0) {
        errors = true;
        res.render('posts/create', {
            title: title,
            content: content
        })
    }

    // if no error
    if(!errors) {

        let formData = {
            title: title,
            content: content
        }
        
        // insert query
        connection.query('INSERT INTO post SET ?', formData, function(err, result) {
            //if(err) throw err
            if (err) {
                // render to add.ejs
                res.render('posts/create', {
                    title: formData.title,
                    content: formData.content                    
                })
            } else {                
                res.redirect('/posts');
            }
        })
    }

})


module.exports = router;