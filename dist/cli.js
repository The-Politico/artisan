#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var yargs = _interopDefault(require('yargs'));
var inquirer = _interopDefault(require('inquirer'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var chalk = _interopDefault(require('chalk'));
var cli = _interopDefault(require('cli-progress'));
var keys = _interopDefault(require('lodash/keys'));
var fs = _interopDefault(require('fs-extra'));
var update = _interopDefault(require('immutability-helper'));
var path = _interopDefault(require('path'));
var os = _interopDefault(require('os'));
var interactiveTemplates = require('@politico/interactive-templates');
var child_process = require('child_process');

var healthChecks = (function () {});

var setVerboseMode = (function (active) {
  if (active) {
    process.env.VERBOSE_MODE = true;
  } else {
    process.env.VERBOSE_MODE = false;
  }
});

var Logger = function Logger() {
  var _this = this;

  _classCallCheck(this, Logger);

  _defineProperty(this, "verbose", function () {
    return process.env.VERBOSE_MODE === 'true';
  });

  _defineProperty(this, "progress", {
    start: function (totalValue, startValue) {
      if (this.verbose() === false) {
        return;
      }

      this.bar.start(totalValue, startValue);
    }.bind(this),
    update: function () {
      if (this.verbose() === false) {
        return;
      }

      this.bar.update(arguments);
    }.bind(this),
    increment: function (amount) {
      if (this.verbose() === false) {
        return;
      }

      this.bar.increment(amount);
    }.bind(this),
    stop: function () {
      if (this.verbose() === false) {
        return;
      }

      this.bar.stop();
    }.bind(this)
  });

  _defineProperty(this, "log", function (message, type) {
    if (_this.verbose() === false) {
      return;
    }

    var color = type === 'error' ? 'red' : type === 'success' ? 'green' : type === 'warning' ? 'yellow' : 'cyan';
    var logFunc = type === 'error' ? console.error : type === 'warning' ? console.warn : console.log;

    if (type) {
      logFunc(chalk[color](type), message);
    } else {
      logFunc(message);
    }
  });

  this.bar = new cli.Bar({
    clearOnComplete: true
  }, cli.Presets.shades_classic);
};

var defaultLogger = new Logger();
var log = defaultLogger.log;

var INSTALL_DIRECTORY = path.resolve(__dirname, '../install');
var STATE_PATH = path.join(os.homedir(), ".ai2jsx");
var CONFIG_PATH = path.join(STATE_PATH, "config.json");
var PROJECTS_PATH = path.join(STATE_PATH, 'projects');

var readConf = function readConf() {
  return fs.readJson(CONFIG_PATH);
};
var getProjects =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var aliveOnly,
        conf,
        _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            aliveOnly = _args.length > 0 && _args[0] !== undefined ? _args[0] : true;
            _context.next = 3;
            return readConf();

          case 3:
            conf = _context.sent;
            return _context.abrupt("return", keys(conf.projects).filter(function (p) {
              return aliveOnly ? conf.projects[p].status === 'alive' : true;
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getProjects() {
    return _ref.apply(this, arguments);
  };
}();
var getActiveProject =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2() {
    var conf,
        activeProject;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 3;
            return readConf();

          case 3:
            conf = _context2.sent;
            activeProject = conf.projects[conf.active];

            if (activeProject) {
              activeProject.name = conf.active;
            }

            return _context2.abrupt("return", activeProject);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getActiveProject() {
    return _ref2.apply(this, arguments);
  };
}();
var updateConf =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(obj) {
    var conf, updateSignature, keys;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return readConf();

          case 2:
            conf = _context3.sent;
            updateSignature = {};

            if ('active' in obj) {
              updateSignature.active = {
                $set: obj.active
              };
            }

            keys = ['projects'];
            keys.forEach(function (k) {
              if (obj[k]) {
                updateSignature[k] = {};

                for (var item in obj[k]) {
                  updateSignature[k][item] = {
                    $set: obj[k][item]
                  };
                }
              }
            });
            return _context3.abrupt("return", fs.outputJson(CONFIG_PATH, update(conf, updateSignature)));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateConf(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var activate = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var opts,
      project,
      allProjects,
      activeProject,
      inquiry,
      _args = arguments;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          opts = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          project = opts.project;

          if (project) {
            _context.next = 13;
            break;
          }

          _context.next = 5;
          return getProjects();

        case 5:
          allProjects = _context.sent;
          _context.next = 8;
          return getActiveProject();

        case 8:
          activeProject = _context.sent;
          _context.next = 11;
          return inquirer.prompt([{
            type: 'list',
            name: 'projectName',
            message: 'Which project would you like to activate?',
            choices: allProjects.filter(function (p) {
              return activeProject ? activeProject.name !== p : true;
            }).map(function (p) {
              return {
                name: p,
                value: p
              };
            })
          }]);

        case 11:
          inquiry = _context.sent;
          project = inquiry.projectName;

        case 13:
          _context.next = 15;
          return updateConf({
            active: project
          });

        case 15:
          log("\"".concat(project, "\" is now the active project."), 'success');

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

var deactivate = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var project, _ref2, confirm;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getActiveProject();

        case 2:
          project = _context.sent;

          if (project) {
            _context.next = 6;
            break;
          }

          log("There is no active project.");
          return _context.abrupt("return");

        case 6:
          _context.next = 8;
          return inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: "Are you sure you want to deactivate the current project: \"".concat(project.name, "\""),
            "default": true
          }]);

        case 8:
          _ref2 = _context.sent;
          confirm = _ref2.confirm;

          if (!confirm) {
            _context.next = 16;
            break;
          }

          _context.next = 13;
          return updateConf({
            active: null
          });

        case 13:
          log("No project is active.", 'success');
          _context.next = 17;
          break;

        case 16:
          log("\"".concat(project.name, "\" is still the active project."), 'success');

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

var initialConf = {
  active: {},
  projects: {}
};
var config = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(destination, step) {
    var confRaw;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            log("[".concat(step[0], "/").concat(step[1], "] Checking for config..."));
            _context.next = 3;
            return fs.ensureFile(CONFIG_PATH);

          case 3:
            _context.next = 5;
            return fs.readFile(CONFIG_PATH, 'utf8');

          case 5:
            confRaw = _context.sent;

            if (!(confRaw.length === 0)) {
              _context.next = 11;
              break;
            }

            _context.next = 9;
            return fs.outputJson(CONFIG_PATH, initialConf);

          case 9:
            _context.next = 12;
            break;

          case 11:
            updateConf(initialConf);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var STEPS_COUNT = 4;
function install (_x) {
  return _ref2.apply(this, arguments);
}

function _ref2() {
  _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var destination, verbose, success;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            destination = _ref.destination, verbose = _ref.verbose;
            success = true;
            log("Installing ai2jsx at ".concat(chalk.bold(destination), "."));
            _context.next = 5;
            return config(destination, [1, STEPS_COUNT]);

          case 5:
            // await templates(destination, [2, STEPS_COUNT]);
            //
            // const hasAccess = await access(destination, [3, STEPS_COUNT]);
            // if (hasAccess) {
            //   await scripts(destination, [4, STEPS_COUNT]);
            // } else {
            //   success = false;
            // }
            if (success) {
              log("Ai2jsx was installed (or updated) on your computer.", 'success');
              log("You can run it by going to ".concat(chalk.bold('File > Scripts > ai2jsx'), " inside an Adobe Illustrator file."), 'success');
            } else {
              log("An error occured installing Ai2jsx, please check the logs above.", 'error');
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref2.apply(this, arguments);
}

var installDeps = (function (dir) {
  return new Promise(function (resolve, reject) {
    var child = child_process.exec('npm install', {
      cwd: dir
    });
    child.stdout.on('data', function (data) {
      log(data);
    });
    child.on('close', function (error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
});

var newProject = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var conf, _ref2, projectName, projectPath, newProjectConf;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return readConf();

        case 2:
          conf = _context.sent;
          _context.next = 5;
          return inquirer.prompt([{
            type: 'input',
            name: 'projectName',
            message: 'What is this project called?',
            validate: function validate(val) {
              if (val in conf.projects) {
                return 'You already have a project with that name.';
              }

              return true;
            }
          }]);

        case 5:
          _ref2 = _context.sent;
          projectName = _ref2.projectName;
          projectPath = path.join(PROJECTS_PATH, projectName);
          _context.prev = 8;
          _context.next = 11;
          return fs.ensureDir(projectPath);

        case 11:
          log('Creating your new project...', 'info');
          _context.next = 14;
          return interactiveTemplates.newProject('Graphic Embed', projectPath);

        case 14:
          log('Installing dependencies...', 'info');
          _context.next = 17;
          return installDeps(projectPath);

        case 17:
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](8);
          log(_context.t0, 'error');
          return _context.abrupt("return");

        case 23:
          log('Saving configuration...', 'info');
          newProjectConf = {
            projects: {}
          };
          newProjectConf.projects[projectName] = {
            status: 'alive',
            path: projectPath
          };
          _context.next = 28;
          return updateConf(newProjectConf);

        case 28:
          log('Activate new project...', 'info');
          _context.next = 31;
          return activate({
            project: projectName
          });

        case 31:
          log("New project \"".concat(projectName, "\" created and activated"), 'success');

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[8, 19]]);
}));

var which = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var project;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getActiveProject();

        case 2:
          project = _context.sent;

          if (!project) {
            log("There is no active project.");
          } else {
            log("\"".concat(project.name, "\" is the active project."));
          }

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs // eslint-disable-line
.help().scriptName('ai2jsx') // Install
.command('install [destination]', 'Installs ai2jsx into your installation of Adobe Illustrator', function (yargs) {
  yargs.positional('destination', {
    alias: 'd',
    describe: 'Installation destination',
    type: 'string',
    "default": '/Applications/Adobe Illustrator CC 2018/Presets.localized/en_US/Scripts'
  }).option('verbose', {
    alias: 'v',
    describe: 'Log to the console',
    type: 'boolean',
    "default": true
  });
},
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(args) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setVerboseMode(args.verbose);
            _context.next = 3;
            return healthChecks();

          case 3:
            _context.next = 5;
            return install(args);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()) // New
.command('new project', 'Creates a new embed project', function (yargs) {
  yargs.option('verbose', {
    alias: 'v',
    describe: 'Log to the console',
    type: 'boolean',
    "default": true
  });
},
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(args) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            setVerboseMode(args.verbose);
            _context2.next = 3;
            return healthChecks();

          case 3:
            _context2.next = 5;
            return newProject(args);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}()) // Activate
.command('activate [project]', 'Sets a project to be active', function (yargs) {
  yargs.positional('project', {
    alias: 'p',
    describe: 'The name of the project to activate',
    type: 'string'
  }).option('verbose', {
    alias: 'v',
    describe: 'Log to the console',
    type: 'boolean',
    "default": true
  });
},
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(args) {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            setVerboseMode(args.verbose);
            _context3.next = 3;
            return healthChecks();

          case 3:
            _context3.next = 5;
            return activate(args);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}()) // Deactivate
.command('deactivate', 'Sets no project to be active', function (yargs) {
  yargs.option('verbose', {
    alias: 'v',
    describe: 'Log to the console',
    type: 'boolean',
    "default": true
  });
},
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee4(args) {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            setVerboseMode(args.verbose);
            _context4.next = 3;
            return healthChecks();

          case 3:
            _context4.next = 5;
            return deactivate(args);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}()) // Which
.command('which', 'Find out what the active project is', function (yargs) {
  yargs.option('verbose', {
    alias: 'v',
    describe: 'Log to the console',
    type: 'boolean',
    "default": true
  });
},
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee5(args) {
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            setVerboseMode(args.verbose);
            _context5.next = 3;
            return healthChecks();

          case 3:
            _context5.next = 5;
            return which(args);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}()).argv;
