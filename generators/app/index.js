'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('generator-hapi-server') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'please provide project name (all lowercase ) :', 
      default: this.appname
    },{
      type: 'input',
      name: 'projectDescription',
      message: 'please provide project description :'
    },{
      type: 'input',
      name: 'authorName',
      message: 'please provide author Name :'
    },{
      type: 'input',
      name: 'authorEmail',
      message: 'please provide author Email :'
    },{
      type: 'input',
      name: 'databaseName',
      message: 'please provide author Email :', 
      default: this.appname + 'Db'
    },{
      type: 'list',
      name: 'databaseSystem',
      choices:  [
        "Mongo",
        "MongoLab",
        "DynamoDB",
        "Talk to the hand!!!!"
      ],
      message: 'please choose database System :'
    },{
      type: 'input',
      name: 'appPort',
      message: 'please provide port at which server should be running :', 
      default: 4000
    },{
      type: 'confirm',
      name: 'addAuth',
      message: 'Would you like to enable token based Authentication?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        projectName        : this.props.projectName,
        authorName         : this.props.authorName,
        projectDescription : this.props.projectDescription,
      }
    );

    this.fs.copyTpl(
      this.templatePath('_index.js'),
      this.destinationPath('index.js'), {
        appPort : this.props.appPort,
        addAuth : this.props.addAuth
      }
    );
  },

  // install: function () {
  //   this.installDependencies();
  // },

  end: function () {
   this.log('\n\nDone scaffolding ' + chalk.red('Hapi Sever!!!') + ' \nPlease run ' + chalk.green('npm install'));
  }
});
