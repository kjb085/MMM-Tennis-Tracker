/* Magic Mirror
 * Module: MMM-DailyDilbert
 *
 * By kjb085 https://github.com/kjb085/MMM-DailyDilbert
 */
const cheerio = require('cheerio');
const requestP = require('request-promise');
const NodeHelper = require('node_helper');
const fsp = require('fs').promises;
const htmlFile = './index.html';

module.exports = NodeHelper.create({

    /**
     * Base url for all requests
     *
     * @type {String}
     */
    baseUrl: 'https://www.google.com/',

    /**
     * Log the the helper has started
     *
     * @return {void}
     */
    start () {
        console.log(`Starting module helper: ${this.name}`);
    },

    /**
     * For valid requests, send response html
     *
     * @param  {String} notification
     * @param  {Object} payload
     * @return {void}
     */
    async socketNotificationReceived (notification, payload) {
        let html, data;

        if (notification === 'TENNIS_TRACKER_CONFIG') {
            html = await this.getTemplate();
            this.sendTemplate(html);

            scores = await this.getScores();

            if (scores.success) {
                this.sendData(scores.matches);
            } else {
                this.sendError('broken');
            }
        }
    },

    /**
     * Make request to reddit and get comic data
     *
     * @return {Promise}
     */
    getScores (config) {
        let options = {
                uri: this.getUrl(config),
                transform: (body) => {
                    return cheerio.load(body);
                },
            },
            scores = {};

        return requestP(options)
            .then(($) => {
                // @TODO Populate match data
                scores.matches = this.getMatchData($);
                scores.success = true;

                return scores;
            })
            .catch((error) => {
                scores.success = false;
                scores.error = error;

                return scores;
            });
    },

    /**
     * Get match data from scraper web page
     *
     * @param  {Object} $ Cheerio instance
     * @return {Object}
     */
    getMatchData ($) {
    },

    /**
     * Get data used to build html
     *
     * @return {String}
     */
    getTemplate () {
    },

    /**
     * Get Dilbert URL based on user configuration
     *
     * @param  {Object} config
     * @return {String}
     */
    getUrl (config) {
        return this.baseUrl + this.getQueryString(config.players);
    },

    getQueryString (players) {
    },

    /**
     * Send html to front end
     *
     * @param  {Object} message
     * @return {void}
     */
    sendTemplate (html) {
        this.sendSocketNotification('TENNIS_TRACKER_TEMPLATE', { html: html });
    },

    /**
     * Send data to front end
     * @param  {Object} data
     * @return {void}
     */
    sendData (data) {
        this.sendSocketNotification('TENNIS_TRACKER_DATA', { matches: data });
    },

    /**
     * Send an error to the frontend
     *
     * @param  {String} error
     * @return {void}
     */
    sendError (error) {
        this.sendSocketNotification('TENNIS_TRACKER_ERROR', { message: error });
    },
});
