import gulp from 'gulp';
import path from './gulp/config/path.js';

global.app = {
  gulp,
  path,
};

import { clearDist, clearPlaceholders } from './gulp/tasks/clear.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/woff.js';
import webpConvert from './gulp/tasks/webp.js';

export const webp = gulp.series(clearPlaceholders, clearDist, webpConvert);
export const woff = gulp.series(clearPlaceholders, clearDist, otfToTtf, ttfToWoff, fontsStyle);