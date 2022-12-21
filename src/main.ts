/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// we want font-awesome to load as soon as possible to show the fa-spinner
import { Aurelia } from 'aurelia-framework'
import environment from './environment';
import { PLATFORM } from 'aurelia-pal';
import * as Bluebird from 'bluebird';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-bootstrap-datetimepicker'), config => {
      // extra attributes, with config.extra
      config.extra.iconBase = 'glyphicon';
      config.extra.withDateIcon = true;
      // or any picker options, with config.options
      config.options.allowInputToggle = true;
      // config.options.format = 'YYYY-MM-DD';
      config.options.showTodayButton = true;
      // if you use Bootstrap 4 Beta 3
      config.extra.bootstrapVersion = 4;
      // you can also change the Bootstrap 4 button class, default is shown below
      config.extra.buttonClass = 'btn btn-outline-secondary';
    })
  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
