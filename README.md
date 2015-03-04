[Kappa]: http://static-cdn.jtvnw.net/emoticons/v1/25/1.0

# ![Kappa Emote][Kappa] Kappa.js
Kappa.js is a simple JS library to easily find text Twitch emotes and replace them with their respective emoticons.  

## How does this work?
Kappa.js is made possible with the use of [Twitch Emotes API v2](http://twitchemotes.com/apidocs). Kappa.js will pull a fresh list of **global emotes** on each run. Please note this API is currently in *development*, so features and structure may change without warning.

## How can I use this?
To get started include the `Kappa.js` file just before the end of your closing `</body>` tag.

```html
        ...
        <script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
        <script src="Kappa.js"></script>
    </body>
</html>
```

### Dependencies
Just some good ol' jQuery, like almost any other JS library. You can easily use the jQuery CDN to include it into your document, as shown above.

And that's it! There's nothing else to do. All text emotes will be replaced with their respective Twitch emoticons.

## What's next?
In the near future I plan on making Kappa.js into a jQuery plugin with options that will include different emoticons sizes and possibly including subscriber emotes.

#### Credits
[Twitch Emotes API v2](http://twitchemotes.com/apidocs)  
*Emote and badge images are property of [Twitch Interactive](http://www.twitch.tv/) and their respective owners.*