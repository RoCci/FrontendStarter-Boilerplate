'use strict';

import gulp from 'gulp';
import requireDir from 'require-dir';
import sequence from 'gulp-sequence';

requireDir( './tasks' );

gulp.task( 'prepare', sequence( 'clean', 'imagemin', 'eslint', 'jscs', 'modernizr', 'stylelint', 'svgstore', 'postcss', 'copy' ) );
gulp.task( 'build', sequence( 'prepare', 'browserify:prod', 'download' ) );

gulp.task( 'dev', sequence( 'prepare', 'browserify:dev', [ 'watch' ] ) );

gulp.task( 'default', [ 'dev' ] );
gulp.task( 'generate', sequence( 'download' ) );

gulp.task( 'prepare:test', sequence( 'eslint', 'jscs', 'modernizr' ) );
gulp.task( 'pretest', sequence( 'prepare:test', 'browserify:test' ) );
gulp.task( 'posttest', sequence( 'clean:test' ) );
