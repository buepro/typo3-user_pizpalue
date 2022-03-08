module.exports = function (grunt) {

  /**
   * Project configuration.
   */
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      root: '../',
      node: 'node_modules/',
      resources: '<%= paths.root %>Resources/',
      icons: '<%= paths.resources %>Public/Icons/',
      fonts: '<%= paths.resources %>Public/Fonts/',
      js: '<%= paths.resources %>Public/JavaScript/',
      doc: '<%= paths.root %>Documentation/'
    },
    cssmin: {
      upicon: {
        src: '<%= paths.fonts %>upicon.css',
        dest: '<%= paths.fonts %>upicon.min.css'
      }
    },
    uglify: {
      options: {
        warnings: false,
        output: {
          comments: false
        }
      },
      general: {
        src: '<%= paths.js %>Src/general.js',
        dest: '<%= paths.js %>Dist/general.min.js'
      },
    },
    watch: {
      general: {
        files: '<%= paths.js %>Src/general.js',
        tasks: 'uglify:general'
      },
    },
    webfont: {
      upicon: {
        src: '<%= paths.icons %>Font/*.svg',
        dest: '<%= paths.fonts %>',
        options: {
          font: 'upicon',
          template: 'templates/font.css',
          fontFamilyName: 'UpIcon',
          engine: 'node',
          autoHint: false,
          htmlDemo: false,
          templateOptions: {
            baseClass: 'upicon',
            classPrefix: 'upicon-'
          }
        }
      }
    },
    /**
     * @see https://github.com/ericmatthys/grunt-changelog
     * @alternative https://github.com/rafinskipg/git-changelog
     */
    changelog: {
      sample: {
        options: {
          fileHeader: '# Changelog',
          after: '2018-12-01',
          before: '2030-01-01',
          dest: '<%= paths.doc %>Changelog.md',
          logArguments: [
            'master..',
            '--pretty=%ci %s (Commit %h by %an)',
            '--no-merges',
            '--abbrev-commit'
          ],
          template: '{{> features}}',
          featureRegex: /^(.*)$/gim,
          partials: {
            features: '{{#if features}}{{#each features}}{{> feature}}{{/each}}{{else}}{{> empty}}{{/if}}\n',
            feature: '- {{this}} {{this.date}}\n'
          }
        }
      }
    }
  });

  /**
   * Register tasks
   */
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webfonts');
  grunt.loadNpmTasks('grunt-changelog');

  /**
   * Grunt update task
   */
  grunt.registerTask('css', ['cssmin']);
  grunt.registerTask('js', ['uglify']);
  grunt.registerTask('doc', ['changelog']);
  grunt.registerTask('iconfont', ['webfont', 'css']);
  grunt.registerTask('build', ['webfont', 'css', 'js', 'doc']);
  grunt.registerTask('default', ['build']);

};
