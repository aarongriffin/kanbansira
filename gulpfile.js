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
    return objIterate(config);
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
    return gulp.src([ "app/**/*.html" ])
        .pipe(realFavicon.injectFaviconMarkups(FAVICON_DATA_FILE.favicon.html_code))
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

var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package : package }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src('src/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("app/*.html", ['bs-reload']);
});
