const express = require('express');
const router = express.Router();
const {shorturl,getOriginalUrl,getAllUrls,} = require('../controllers/urlController');

router.post('/shorten', shorturl);
router.get('/:shortcode', getOriginalUrl);
router.get('/all/urls', getAllUrls);

module.exports = router;


