import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = `./dist`;
const srcFolder = `./src`;

const path = {
  build: {
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    svg: `${srcFolder}/img/**/*.svg`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
  },
  rootFolder,
  buildFolder,
  srcFolder
}

export default path;