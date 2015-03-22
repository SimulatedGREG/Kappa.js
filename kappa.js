(function($) {
	$.fn.kappa = function (options) {

		// Init global variables
		var target = $(this);
		var API, EMOTES;
		var TEMPLATE_SMALL, TEMPLATE_MEDIUM, TEMPLATE_LARGE;

		var settings = $.extend({
			emoteSize: 'small'
		}, options);
		
		// Check for local storage support
		if(!(typeof(Storage) !== "undefined")) {
		   	if(sessionStorage.twitchemotesAPI==null) {
		   		// GET list of Global Emotes from Twitch Emotes API v2
				$.ajax({
					url: 'http://twitchemotes.com/api_cache/v2/global.json',
					success: function(data) {
						sessionStorage.twitchemotesAPI = JSON.stringify(data);
						define(sessionStorage.twitchemotesAPI);
					},
					error: function() {
						alert('Connection to Twitch Emotes API v2 has failed.')
					}
				});
		   	} else {
		   		define(sessionStorage.twitchemotesAPI);
		   	}
		} else {
		    // GET list of Global Emotes from Twitch Emotes API v2
			$.ajax({
				url: 'http://twitchemotes.com/api_cache/v2/global.json',
				success: function(data) {
					data = JSON.stringify(data);
					define(data);
				},
				error: function() {
					alert('Connection to Twitch Emotes API v2 has failed.')
				}
			});
		}

		// Define global variables Urls
		function define(data) {
			API = JSON.parse(data);

			EMOTES = API.emotes;
			TEMPLATE_SMALL = API.template.small;
			TEMPLATE_MEDIUM = API.template.medium;
			TEMPLATE_LARGE = API.template.large;

			insertEmotes();
		}

		// Determine Template size from options
		function getSize() {
			switch(settings.emoteSize) {
				case 'small':
					return TEMPLATE_SMALL;
				case 'medium':
					return 	TEMPLATE_MEDIUM;
				case 'large':
					return TEMPLATE_LARGE;
			}
		}

		// Insert Emotes
		function insertEmotes() {
			var currentEmoteID;
			var currentTemplate = getSize();
			$.each(EMOTES, function(i, val) {
				currentEmoteID = val.image_id;
				currentEmoteUrl = currentTemplate.replace('{image_id}', currentEmoteID);
				target.each(function(index, element){
					$(element).html(function(index, text) {
						var re = new RegExp('\\b'+i+'\\b', 'g');
						this.innerHTML = text.replace(re, '<img src="' + currentEmoteUrl + '">');
					});
				});
			});
		}
	}
})(jQuery);