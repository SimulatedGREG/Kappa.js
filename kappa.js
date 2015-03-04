$(function () {

	// Init global variables
	var API, EMOTES;
	var TEMPLATE_SMALL, TEMPLATE_MEDIUM, TEMPLATE_LARGE;

	// GET list of Global Emotes from Twitch Emotes API v2
	$.ajax({
		url: 'http://twitchemotes.com/api_cache/v2/global.json',
		success: function(data) {
			console.log(data);
			define(data);
		},
		error: function() {
			alert('Connection to Twitch Emotes API v2 has failed.')
		}
	});

	// Define global variables Urls
	function define(data) {
		API = data;
		EMOTES = data.emotes;

		TEMPLATE_SMALL = API.template.small;
		TEMPLATE_MEDIUM = API.template.medium;
		TEMPLATE_LARGE = API.template.large;

		insertEmotes();
	}

	// Insert Emotes
	function insertEmotes() {
		var currentEmoteID;
		var currentTemplate = TEMPLATE_SMALL;
		$.each(EMOTES, function(i, val) {
			currentEmoteID = val.image_id;
			currentEmoteUrl = currentTemplate.replace('{image_id}', currentEmoteID);
			$('*').each(function(index, element){
				$(element).html(function(index, text) {
					var re = new RegExp(i, "g");
					this.innerHTML = text.replace(re, '<img src="' + currentEmoteUrl + '">');
				});
			});
		});
	}
});