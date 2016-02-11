'use strict';

(function ($) {

  var previousStorage = window.localStorage.getItem('kappa-js');

  function init() {
    if (typeof Storage !== 'undefined' && previousStorage !== null) return window.localStorage.getItem('kappa-js');

    return new Promise(getTwitchEmotesPromise);
  }

  function getTwitchEmotesPromise(res, rej) {
    $.get('https://twitchemotes.com/api_cache/v2/global.json', function (data) {
      if (previousStorage === null) window.localStorage.setItem('kappa-js', JSON.stringify(data));

      res(data);
    });
  }

  if (previousStorage === null) {
    init().then(function (data) {
      window.KappaJS = data;
    });
  } else window.KappaJS = window.localStorage.getItem('kappa-js');

  $.fn.kappa = function () {

    var config = $.extend({
      emoteSize: 'small',
      customClass: null
    });

    return undefined;
  };
})(jQuery);