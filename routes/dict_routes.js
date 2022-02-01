const router = require('express').Router();
const wordController = require('../controller/word');

router.get('/',(req, res)=>{
    res.redirect('/index');
});

router.get('/index', (req, res)=>{
    res.render('dict.html');
})

router.get('/search', wordController.lookupWordFromDictionary);

module.exports = router;