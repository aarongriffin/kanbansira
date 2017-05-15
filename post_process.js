var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    fs = require('fs-extra'),
    path = require('path'),
    merge = require('merge-stream'),
    realFavicon = require ('gulp-real-favicon'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    package = require('./package.json');

var config = {
    "javascript": {
        "bootstrap": {
            "src":  "node_modules/bootstrap/dist/js/bootstrap.js",
            "dest": "src/js/vendors/bootstrap"
        },
        "dragula": {
            "src": "node_modules/dragula/dist/dragula.js",
            "dest": "src/js/vendors/dragula"
        },
        "jquery": {
            "src":  "node_modules/jquery/dist/jquery.js",
            "dest": "src/js/vendors/jquery"
        },
        "tether": {
            "src":  "node_modules/tether/dist/js/tether.js",
            "dest": "src/js/vendors/tether"
        }
    },
    "scss": {
        "bootstrap": {
            "src":  "node_modules/bootstrap/scss/**/*.scss",
            "dest": "src/scss/vendors/bootstrap"
        },
        "font-awesome": {
            "src":  "node_modules/font-awesome/scss/**/*.scss",
            "dest": "src/scss/vendors/font-awesome"
        }
    },
    "css": {
        "dragula": {
            "src":  "node_modules/dragula/dist/dragula.css",
            "dest": "src/css/vendors/dragula"
        },
        "tether": {
            "src":  "node_modules/tether/dist/css/tether.css",
            "dest": "src/css/vendors/tether"
        }
    },
    "fonts": {
        "font-awesome": {
            "src":  "node_modules/font-awesome/fonts/**/*",
            "dest": "src/fonts/vendors/font-awesome"
        }
    }
};




gulp.task('moveAssets', function (config) {
    objIterate(config);
});


function objIterate(config) {
    var components = Object.keys(config);
    components.forEach(function(component) {
        var items = Object.keys(config[component]);
        items.forEach(function(item) {
            var value = config[component][item];
            console.log(component+': '+item+' = '+value);
        });
    });
}
//function doStuff(cfg) {
//  return gulp.src(cfg.src)
//    .pipe(uglify())
//    .pipe(gulp.dest(cfg.dest));
//}

//gulp.task('dry', function() {
//  doStuff(config.desktop);
//  doStuff(config.mobile);
//});

//gulp.task('copy', function () {
//    gulp.src('./src/templates/index.html')
//        .pipe(gulp.dest('./public/'));
//});

//var scriptsPath = 'src/scripts';

//function getFolders(dir) {
//    return fs.readdirSync(dir)
//      .filter(function(file) {
//        return fs.statSync(path.join(dir, file)).isDirectory();
//      });
//}

//gulp.task('scripts', function() {
//   var folders = getFolders(scriptsPath);

//   var tasks = folders.map(function(folder) {
//      return gulp.src(path.join(scriptsPath, folder, '/**/*.js'))
        // concat into foldername.js
//        .pipe(concat(folder + '.js'))
        // write to output
//        .pipe(gulp.dest(scriptsPath))
        // minify
//        .pipe(uglify())
        // rename to folder.min.js
//        .pipe(rename(folder + '.min.js'))
        // write to output again
//        .pipe(gulp.dest(scriptsPath));
 //  });

   // process all remaining files in scriptsPath root into main.js and main.min.js files
//   var root = gulp.src(path.join(scriptsPath, '/*.js'))
//        .pipe(concat('main.js'))
//        .pipe(gulp.dest(scriptsPath))
//        .pipe(uglify())
//        .pipe(rename('main.min.js'))
//        .pipe(gulp.dest(scriptsPath));

//   return merge(tasks, root);
//});






var FAVICON_DATA_FILE = {
	"result": {
		"status": "success"
	},
	"favicon": {
		"package_url": "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/favicons.zip",
		"files_urls": ["https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/android-chrome-192x192.png", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/android-chrome-256x256.png", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/apple-touch-icon.png", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/browserconfig.xml", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/favicon-16x16.png", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/favicon-32x32.png", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/favicon.ico", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/manifest.json", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/mstile-144x144.png", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/mstile-150x150.png", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/mstile-310x150.png", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/mstile-310x310.png", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/mstile-70x70.png", "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/package_files/safari-pinned-tab.svg"],
		"html_code": "<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/favicon-32x32.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/favicon-16x16.png\">\n<link rel=\"manifest\" href=\"/manifest.json\">\n<link rel=\"mask-icon\" href=\"/safari-pinned-tab.svg\" color=\"#5bbad5\">\n<meta name=\"msapplication-TileColor\" content=\"#2b5797\">\n<meta name=\"msapplication-TileImage\" content=\"/mstile-144x144.png\">\n<meta name=\"theme-color\" content=\"#ffffff\">",
		"compression": "false",
		"overlapping_markups": ["link[rel=\"apple-touch-icon\"]", "link[rel=\"shortcut\"]", "link[rel=\"shortcut icon\"]", "link[rel=\"icon\",sizes=\"16x16\"]", "link[rel=\"icon\",sizes=\"32x32\"]", "meta[name=\"msapplication-TileColor\"]", "meta[name=\"msapplication-TileImage\"]", "link[rel=\"manifest\"]", "meta[name=\"theme-color\"]", "link[rel=\"mask-icon\"]"]
	},
	"files_location": {
		"type": "path",
		"path": "/"
	},
	"preview_picture_url": "https://realfavicongenerator.net/files/338a6cffd5fc1ae6a19b5f9199f32f0b14e22d63/favicon_preview.png",
	"version": "0.15"
}

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
    realFavicon.generateFavicon({
        masterPicture: "src/images/favicon.png",
        dest: "app",
        iconsPath: '/',
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: '#2b5797',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#ffffff',
                manifest: {
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'blackAndWhite',
                threshold: 66.40625,
                themeColor: '#5bbad5'
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
    });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
    return gulp.src([ "src/images/favicon.png" ])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(gulp.dest("app"));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
    });
});

