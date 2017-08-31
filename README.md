# Gulp Workflow for React with working ES6 import/export.
![Gulp Workflow](gulp.jpg)

This is a Gulp workflow created for working easier with ReactJs and Sass. It use Babelify and browserify for covering imports and JSX and converting them to one js file. Aslo, it cover converting scss to css. BrowserSync is integrated so we have live server and live preview with browser reload on file changes. it can be started with `gulp watch` command.

We've also built a second task, build, that creates a **dist** folder for the production ready application. We compiled Sass into CSS, compile js from react files, optimized all our assets, and copied the necessary folders into the dist folder. To run this task, we just have to type `gulp build` into the command line.

* Spins up a web server
* Compiles Sass to CSS
* Using Autoprefixer to write vendor-free CSS code
* Convert react js and jsx to regular js (working ES6 import/export)
* Refreshes the browser automatically whenever you save a file
* Optimizes all assets (CSS, JS, fonts, and images) for production


##Instructions

Clone this repository into your local machine using the terminal (mac) or Gitbash (PC)   
`git clone https://github.com/dush88gs/gulp-react-import-export.git`

CD to the project folder

`cd gulp-react-import-export`

Run > `npm install` to install the project dependencies

Run the Gulp command > `gulp watch` to start a server

Run the > `gulp build` to create a production ready code in dist folder