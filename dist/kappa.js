'use strict';

(function ($) {

  /**
   * Check for previous data in localStorage
   */
  var previousStorage = localStorage.getItem('kappa-js');

  /**
   * Initialize KappaJS
   * Check for Storage support & analyize previous data
   * @return {true} [Storage support & previous data]
   * @return {Promise} [No Storage support or no previous data]
   */
  function init() {
    if (typeof Storage !== 'undefined' && previousStorage !== null) return true;

    return new Promise(getTwitchEmotesPromise);
  }

  /**
   * Get global.json from TwitchEmotes API using a Promise
   * @param  {resolve} res Promise resolver
   * @param  {reject} rej Promise rejector
   */
  function getTwitchEmotesPromise(res, rej) {
    $.get('https://twitchemotes.com/api_cache/v2/global.json', function (data) {
      if (typeof Storage !== 'undefined') localStorage.setItem('kappa-js', JSON.stringify(data));

      res(data);
    });
  }

  /**
   * Grab TwitchEmotes API or use previous Storage
   * Attach KappaJS to browser window
   */
  if (previousStorage === null) {
    init().then(function (data) {
      window.KappaJS = data;
    });
  } else window.KappaJS = JSON.parse(localStorage.getItem('kappa-js'));

  /**
   * Cache Regex
   */
  var twitchEmotesRegExp = new RegExp("\\b(" + Object.keys(KappaJS.emotes).join("|") + ")\\b", "g");

  /**
   * Initialize jQuery Plugin
   * @return {this} DOM element
   */
  $.fn.kappa = function (settings) {

    /**
     * Hoist `this`
     * Needed if KappaJS is not ready
     */
    var self = this;

    /**
     * Define default plugin configuration
     * @param  {String} {customClass} Custom class to added to generatated <img> tags
     * @param  {String} {emoteSize} Template size for emotes
     */
    var config = $.extend({
      customClass: null,
      emoteSize: 'small'
    }, settings);

    /**
     * Generator <img> tag
     * @param  {String} {image_id} Emote Id
     * @return {String} Generated <img> tag
     */
    function generateImgTag(_ref, name) {
      var image_id = _ref.image_id;

      return ['<img src="', KappaJS.template[config.emoteSize].replace('{image_id}', image_id), '" ', config.customClass === null ? '' : 'class="' + config.customClass + '" ', 'alt="', name, '">'].join('');
    }

    /**
     * Wait for KappaJS to be attached to window
     * Replace text with emotes once attached
     */
    function waitKappaJS() {
      var watch = setInterval(function () {
        if (typeof window.KappaJS !== 'undefined') {
          replaceTextWithEmotes();
          clearInterval(watch);
        }
      }, 500);
    }

    /**
     * Loop through all emoteSize
     * Find known emotes using RegExp
     * Replace with generated <img> tag
     */
    function replaceTextWithEmotes() {
      $(self).each(function (i, el) {
        $(el).html($(el).html().replace(twitchEmotesRegExp, function (all, emote) {
          return generateImgTag(KappaJS.emotes[emote], emote);
        }));
      });
    }

    /**
     * Check for KappaJS
     * Start watcher if not ready
     * Replace if ready
     */
    if (typeof window.KappaJS === 'undefined') {
      waitKappaJS();
    } else replaceTextWithEmotes();
  };
})(jQuery);