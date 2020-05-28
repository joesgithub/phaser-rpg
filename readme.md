# Phaser RPG
> A first go using templates and tutorials

![License](https://img.shields.io/badge/license-MIT-green)

## Tools, Templates, and Tuts

- [Phaser](https://phaser.io/)
- [Parcel](https://parceljs.org/)
- [Phaser + Parcel Project Boilerplate](https://github.com/ourcade/phaser3-parcel-template)
- [GameDev Academy - How to Create a Turn-Based RPG](https://gamedevacademy.org/how-to-create-a-turn-based-rpg-game-in-phaser-3-part-1/)

## Prereqs

You'll need [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and [Parcel](https://parceljs.org/) installed.

## Getting Started

Clone this repository to your local machine:

```bash
git clone https://github.com/joesgithub/phaser-rpg.git #my-folder-name
```

Go into your new project folder and install dependencies:

```bash
cd phaser-rpg # or 'my-folder-name'
npm install
```

Start development server:

```
npm run start
```

To create a production build:

```
npm run build
```

Production files will be placed in the `docs` folder. Then upload those files to a web server. 🎉

## Project Structure

```
    .
    ├── dist
    ├── docs
    ├── node_modules
    ├── public
    ├── src
    │   ├── scenes
    │   │   ├── Scene.js
    │   ├── index.html
    │   ├── main.js
    ├── .babelrc
    ├── package.json
```

## Static Assets

Any static assets like images or audio files should be placed in the `public` folder. It'll then be served at http://localhost:8000/images/my-image.png

Example `public` structure:

```
    public
    ├── images
    │   ├── my-image.png
    ├── music
    │   ├── ...
    ├── sfx
    │   ├── ...
```

They can then be loaded by Phaser with `this.image.load('my-image', 'images/my-image.png')`.

## Extruded Tilesets

Using [https://github.com/sporadic-labs/tile-extruder](https://github.com/sporadic-labs/tile-extruder) to manually update tile pngs. This solves tile bleed issue.

```
tile-extruder --tileWidth 8 --tileHeight 16 --input ./public/assets/map/spritesheet.png --output ./public/assets/map/spritesheet-extruded.png
```

## Class Properties Support

Modern ES6 class properties are included with the `.babelrc` file at the project root with the `@babel/plugin-proposal-class-properties` plugin.

```
{
	"presets": [
		"env"
	],
	"plugins": [
		"@babel/plugin-proposal-class-properties"
	]
}
```

Parcel should automatically install the necessary dependencies on first start or build.

If you run into an error about mismatched major versions then go into `package.json` to see what the major versions for `@babel/core` and `@babel/plugin-proposal-class-properties` are.

Reinstall one or the other manually to make the versions match 😉

## ESLint

This template uses a basic `eslint` set up for code linting to help you find and fix common problems in your JavaScript code.

It does not aim to be opinionated.

[See here for rules to turn on or off](https://eslint.org/docs/rules/).

## TypeScript

Check out the [phaser3-typescript-parcel-template](https://github.com/ourcade/phaser3-typescript-parcel-template) for a ready-to-use version of the [Phaser + Parcel template](https://github.com/ourcade/phaser3-parcel-template) in TypeScript! It can be extended to this project.

## Flow

It just works. (Thanks to Parcel)

Just put `// @flow` at the top of your `.js` files. Parcel will handle the rest.

[Go here for more information on how to use Flow](https://flow.org/).

## Dev Server Port

You can change the dev server's port number by modifying the `start` script in `package.json`. We use Parcel's `-p` option to specify the port number.

The script looks like this:

```
parcel src/index.html -p 8000
```

Change 8000 to whatever you want.

## Other Notes

[parcel-plugin-clean-easy](https://github.com/lifuzhao100/parcel-plugin-clean-easy) is used to ensure only the latest files are in the `docs` folder. You can modify this behavior by changing `parcelCleanPaths` in `package.json`.

[parcel-plugin-static-files](https://github.com/elwin013/parcel-plugin-static-files-copy#readme) is used to copy static files from `public` into the output directory and serve it. You can add additional paths by modifying `staticFiles` in `package.json`.

## License

[MIT License](https://github.com/joesgithub/phaser-rpg/blob/master/LICENSE)
