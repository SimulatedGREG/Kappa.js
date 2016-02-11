(($) => {

  /**
   * Check for previous data in localStorage
   */
  let previousStorage = window.localStorage.getItem('kappa-js');

  /**
   * Initialize KappaJS
   * Check for Storage support & analyize previous data
   * @return {true} [Storage support & previous data]
   * @return {Promise} [No Storage support or no previous data]
   */
  function init() {
    if(typeof Storage !== 'undefined' && previousStorage !== null)
      return true;

    return new Promise(getTwitchEmotesPromise);
  }

  /**
   * Get global.json from TwitchEmotes API using a Promise
   * @param  {resolve} res Promise resolver
   * @param  {reject} rej Promise rejector
   */
  function getTwitchEmotesPromise(res, rej) {
    $.get('https://twitchemotes.com/api_cache/v2/global.json',
      (data) => {
        if(typeof Storage !== 'undefined')
          window.localStorage.setItem('kappa-js', JSON.stringify(data));

        res(data);
      });
  }

  /**
   * Grab TwitchEmotes API or use previous Storage
   * Attach KappaJS to browser window
   */
  if(previousStorage === null) {
    init().then((data) => {
      window.KappaJS = data;
    });
  } else window.KappaJS = JSON.parse(window.localStorage.getItem('kappa-js'));


  /**
   * Initialize jQuery Plugin
   * @return {this} DOM element
   */
  $.fn.kappa = function(settings) {

    /**
     * Define default plugin configuration
     * @param  {String} {customClass} Custom class to added to generatated <img> tags
     * @param  {String} {emoteSize} Template size for emotes
     */
    let config = $.extend({
      customClass: null,
      emoteSize: 'small'
    }, settings);

    /**
     * Generator <img> tag
     * @param  {String} {image_id} Emote Id
     * @return {String} Generated <img> tag
     */
    function generateImgTag({image_id}) {
      return [
        '<img src="',
        window.KappaJS.template[config.emoteSize].replace('{image_id}', image_id),
        '" ',
        (config.customClass === null) ? '' : `class="${config.customClass}" `,
        'alt="',
        emote,
        '">'
      ].join('');
    }

    /**
     * Loop through all emoteSize
     * Find known emotes using RegExp
     * Replace with generated <img> tag
     */
    for (var emote in window.KappaJS.emotes) {
      if (window.KappaJS.emotes.hasOwnProperty(emote)) {

        $(this).each(() => {
          $(this).html(
            $(this).html().replace(
              new RegExp('\\b' + emote + '\\b', 'g'),
              generateImgTag(window.KappaJS.emotes[emote])
            )
          );
        });

      }
    }

  };

})(jQuery);
