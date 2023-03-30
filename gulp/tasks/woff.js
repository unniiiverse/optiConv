import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(fonter({
      formats: ['woff']
    }))
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontsStyle = () => {
  let fontsFile = `${app.path.buildFolder}/fonts/fonts.scss`;
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontData = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            let fontStyle = 'normal';
            let fontWeight = 400;
            let variableWght = fontFileName.toLowerCase().includes('variablefont');

            fontData = fontData.split(/(?=[A-Z])/).join(' ').toLowerCase();

            if (fontData.includes('italic') || fontData.includes('it')) {
              fontStyle = 'italic';
            }

            if (fontData.includes('thin')) {
              fontWeight = 100;
            }
            if ((fontData.includes('extra') && fontData.includes('ultra') || fontData.includes('light'))) {
              fontWeight = 200;
            }
            if (fontData.includes('light')) {
              fontWeight = 300;
            }
            if (fontData.includes('medium')) {
              fontWeight = 500;
            }
            if (fontData.includes('semibold')) {
              fontWeight = 600;
            }
            if (fontData.includes('bold')) {
              fontWeight = 700;
            }
            if ((fontData.includes('extra') && fontData.includes('bold') || fontData.includes('bld')) || fontData.includes('heavy')) {
              fontWeight = 800;
            }
            if (fontData.includes('black')) {
              fontWeight = 900;
            }

            fs.appendFile(fontsFile, `@font-face{\n\tfont-family: '${fontName}';\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");${(variableWght) ? '' : `\n\tfont-weight: ${fontWeight};`}\n\tfont-style: ${fontStyle};\n}\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.error("File scss/base/fonts.scss already exist. To update fonts you need delete it.");
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}

}