import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

const webpConvert = () => {
  return app.gulp.src(app.path.src.images, {
      sourcemaps: true
    })
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.images))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))

}

export default webpConvert;