# Artisan

A suite of tools for creating & managing Adobe Illustrator based embeds. Heavily inspired by [ai2html](http://ai2html.org/).

## Installation

1. Install the CLI.
```
$ npm install -g @politico/artisan
```

2. Find your Adobe Illustrator file. Go to your Adobe Illustrator folder in Applications. You should see an app called `Adobe Illustrator` inside of that.

3. Install the `ai2jsx` script by running the `art install` command and dragging the Adobe Illustrator app into the terminal. You'll probably need to `sudo` the command to have write access to that folder. See GIF below.

```
$ sudo art install PATH_TO_YOUR_ILLUSTATOR_SCRIPTS
```

![How To](docs/install.gif)

4. If that doesn't work, you can always copy the contents of the `install` directory of this repo into your `Scripts` folder directly.
