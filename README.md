[Kappa]: http://static-cdn.jtvnw.net/emoticons/v1/25/1.0

# ![Kappa Emote][Kappa] Kappa.js v1.0.7
Kappa.js is a simple jQuery Plugin that can easily find text Twitch emotes and replace them with their respective emoticons.  

## How does this work?
Kappa.js is made possible with the use of [Twitch Emotes API v2](http://twitchemotes.com/apidocs). Kappa.js will pull a fresh list of **global emotes** on each browser session. Please note this API is currently in *development*, so features and structure may change without warning.

## How do I get this?
Kappa.js can be quickly installed from the public bower registry. Just run...
```
bower install kappa.js
```
Alternatively, you can simply clone down this repository with...
```
git clone https://github.com/SimulatedGREG/Kappa.js.git
```

## How do I use this?
To get started include the `kappa.js` file just before the end of your closing `</body>` tag.

```html
        ...
        <script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
        <script src="kappa.js"></script>
    </body>
</html>
```
Once included use jQuery to select which elements your want `kappa.js` to apply in this manner... `$([selector]).kappa([options]);`

In this example `kappa.js` will apply to all elements in the DOM once the page is loaded.
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
And that's it! There's nothing else to do. All text emotes will be replaced with their respective Twitch emoticons. But wait, there's more!

### Options
As of now, options are limited to only emoticon size. More to come!

| option    | type   | default | description                                                                  |
|:-----------|:--------|:-------|:------------------------------------------------------------------------------|
| emoteSize | string | `'small'` | Sets emoticon image size. Can be `'small'`, `'medium'`, or `'large'`. |
| customClass | string | `null` | Adds a custom class to each injected `<img>` emoticon. |

## What's next?
In the near future I plan to add support for subscriber emotes.

#### Credits
[Twitch Emotes API v2](http://twitchemotes.com/apidocs)  
*Emote and badge images are property of [Twitch Interactive](http://www.twitch.tv/) and their respective owners.*
