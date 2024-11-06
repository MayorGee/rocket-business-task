import gulp from'gulp';
import dartSass from 'gulp-dart-sass';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';

const { task, src, dest, watch, parallel } = gulp;
const server = browserSync.create();

task('html', function() {
    return src('src/**/*.html')
        .pipe(dest('dist'))
        .pipe(server.stream());
});

task('styles', () => {
    return src('src/styles/*.scss')
      .pipe(dartSass().on('error', dartSass.logError))
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(concat('styles.cumm.css'))
      .pipe(dest('dist/css'))
      .pipe(server.stream());
});

task('icons', function() {
    return src('src/icons/*.+(png|svg|jpg|webp|jpeg)')
        .pipe(dest('dist/icons'))
        .pipe(server.stream());
});

task('images', function() {
    return src('src/images/*.+(png|svg|jpg|webp|jpeg)')
        .pipe(dest('dist/images'))
        .pipe(server.stream());
});

task('watch', function() {
    watch('src/index.html', parallel('html'));
    watch('src/styles/*.scss', parallel('styles'));
    watch('src/icons/*.+(png|svg)', parallel('icons'));
    watch('src/images/*.+(png|svg)', parallel('images'));
});
task('serve', () => {
    server.init({
        server: 'dist'
    });
    server.watch('dist/**/*.*').on('change', server.reload);
})

task('default', parallel('serve', 'watch'));