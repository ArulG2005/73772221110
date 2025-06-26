const UrlModel = require('../models/UrlModel');
const logger = require('../../logger/logger');

async function generateShortCode() {
    const code = Math.random().toString(36).substring(2, 8);
    const exists = await UrlModel.findOne({ shortcode: code });
    return exists ? generateShortCode() : code;
}

exports.shorturl = async (req, res) => {
    let { url, validate, shortcode } = req.body;
    if (!url) {
        logger.warn('Missing URL');
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        if (shortcode) {
            const existing = await UrlModel.findOne({ shortcode });
            if (existing) {
                logger.warn(`Shortcode already exists: ${shortcode}`);
                return res.status(400).json({ error: 'Shortcode already exists' });
            }
        } else {
            shortcode = await generateShortCode();
        }

        const validateMinutes = validate || 30;
        const validate = new Date(Date.now() + validateMinutes * 60 * 1000);

        const shortUrl = `${req.protocol}://${req.get('host')}/${shortcode}`;

        const newUrl = new UrlModel({
            originalUrl: url,
            shortcode,
            shortUrl,
            validate: validateDate,
        });

        await newUrl.save();
        logger.info(`Short URL created: ${shortUrl}`);
        res.status(201).json({ shortLink: shortUrl, expiry: validateDate });
    } catch (err) {
        logger.error(`Error in shorturl: ${err.message}`);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getOriginalUrl = async (req, res) => {
    const { shortcode } = req.params;

    try {
        const urlDoc = await UrlModel.findOne({ shortcode });

        if (!urlDoc) {
            logger.warn(`Shortcode not found: ${shortcode}`);
            return res.status(404).json({ error: 'Short URL not found' });
        }

        if (urlDoc.validate && new Date() > urlDoc.validate) {
            logger.warn(`Short URL expired: ${shortcode}`);
            return res.status(410).json({ error: 'Short URL expired' });
        }

        logger.info(`Redirecting to: ${urlDoc.originalUrl}`);
        res.redirect(urlDoc.originalUrl);
    } catch (err) {
        logger.error(`Error in getOriginalUrl: ${err.message}`);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllUrls = async (req, res) => {
    try {
        const urls = await UrlModel.find();
        res.status(200).json(urls);
    } catch (err) {
        logger.error(`Error fetching URLs: ${err.message}`);
        res.status(500).json({ error: 'Server error' });
    }
};
