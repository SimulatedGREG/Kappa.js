'use strict';

(function ($) {

  /**
   * Check for previous data in localStorage
   */
  var previousStorage = window.localStorage.getItem('kappa-js');

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
      if (previousStorage === null) window.localStorage.setItem('kappa-js', JSON.stringify(data));

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
  } else window.KappaJS = JSON.parse(window.localStorage.getItem('kappa-js'));

  /**
   * Initialize jQuery Plugin
   * @return {this} DOM element
   */
  $.fn.kappa = function () {

    var config = $.extend({
      emoteSize: 'small',
      customClass: null
    });

    return undefined;
  };
})(jQuery);