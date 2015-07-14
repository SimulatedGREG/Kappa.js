(function($) {
	$.fn.kappa = function (options) {

		// Init global variables
		var target = $(this);
		var API, EMOTES;
		var TEMPLATE_SMALL, TEMPLATE_MEDIUM, TEMPLATE_LARGE;

		var settings = $.extend({
			emoteSize: 'small',
      customClass: null
		}, options);

		// Check for local storage support
		if(typeof(Storage) !== 'undefined') {
		   	if(sessionStorage.getItem('twitchEmotesAPI') === null) {
		   	// GET list of Global Emotes from Twitch Emotes API v2
				$.ajax({
					url: 'http://twitchemotes.com/api_cache/v2/global.json',
					success: function(data) {
						sessionStorage.setItem('twitchEmotesAPI', JSON.stringify(data));
						define(sessionStorage.getItem('twitchEmotesAPI'));
					},
					error: function() {
						console.log('Connection to Twitch Emotes API v2 has failed.');
					}
				});
		   	} else {
		   		define(sessionStorage.getItem('twitchEmotesAPI'));
		   	}
		} else {
		  // GET list of Global Emotes from Twitch Emotes API v2
			$.ajax({
				url: 'http://twitchemotes.com/api_cache/v2/global.json',
				success: function(data) {
					define(JSON.stringify(data));
				},
				error: function() {
					console.log('Connection to Twitch Emotes API v2 has failed.');
				}
			});
		}

		// Define global variables Urls
		function define(data) {
			API = JSON.parse(data);
			EMOTES = API.emotes;
      TEMPLATES = API.template;

			insertEmotes();
		}

		// Determine Template size from options
		function getSize() {
			switch(settings.emoteSize) {
				case 'small':
					return TEMPLATES.small;
				case 'medium':
					return 	TEMPLATES.medium;
				case 'large':
					return TEMPLATES.large;
			}
		}

    // Determine if custom class is preset
    function getCustomClass() {
      if(settings.customClass !== null) {
        return ' class="' + settings.customClass + '" ';
      } else {
        return '';
      }
    }

		// Insert Emotes
		function insertEmotes() {
			var currentEmoteID;
			var currentTemplate = getSize();
      var customClass = getCustomClass();
			$.each(EMOTES, function(i, val) {
				currentEmoteID = val.image_id;
				currentEmoteUrl = currentTemplate.replace('{image_id}', currentEmoteID);
				target.each(function(index, element){
					$(element).html(function(index, text) {
						var re = new RegExp('\\b'+i+'\\b', 'g');
						this.innerHTML = text.replace(re, '<img src="' + currentEmoteUrl + '" alt="' + i + ' Emote"' + customClass + '>');
					});
				});
			});
		}
	};
})(jQuery);
