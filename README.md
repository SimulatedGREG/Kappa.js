[Kappa]: http://static-cdn.jtvnw.net/emoticons/v1/25/1.0

# ![Kappa Emote][Kappa] Kappa.js
Kappa.js is a simple jQuery Plugin that can easily find text Twitch emotes and replace them with their respective emoticons.  

## How does this work?
Kappa.js is made possible with the use of [Twitch Emotes API v2](http://twitchemotes.com/apidocs). Kappa.js will pull a fresh list of **global emotes** on each browser session. Please note this API is currently in *development*, so features and structure may change without warning.

## How can I use this?
To get started include the `kappa.js` file just before the end of your closing `</body>` tag.

```html
        ...
        <script src="bower_components/jquery/dist/jquery.min.js"></script>
        <script src="kappa.js"></script>
    </body>
</html>
```
Once included use jQuery to select which elements your want `kappa.js` to apply to.
```html
        ...
        <script>
            $(function () {
                $('*').kappa();
            });
        </script>
    </body>
</html>
```

And that's it! There's nothing else to do. All text emotes will be replaced with their respective Twitch emoticons.

## What's next?
In the near future I hope to make specific options to support different emoticon sizes and as well support subscriber emoticons.

#### Credits
[Twitch Emotes API v2](http://twitchemotes.com/apidocs)  
*Emote and badge images are property of [Twitch Interactive](http://www.twitch.tv/) and their respective owners.*