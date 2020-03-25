#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var yargs = _interopDefault(require('yargs'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var inquirer = _interopDefault(require('inquirer'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var chalk = _interopDefault(require('chalk'));
var cli = _interopDefault(require('cli-progress'));
var keys = _interopDefault(require('lodash/keys'));
var merge = _interopDefault(require('lodash/merge'));
var fs = _interopDefault(require('fs-extra'));
var update = _interopDefault(require('immutability-helper'));
var path = _interopDefault(require('path'));
var os = _interopDefault(require('os'));
var child_process = require('child_process');
var interactiveTemplates = require('@politico/interactive-templates');
var slugify = _interopDefault(require('slugify'));
require('@politico/interactive-bin/dist/scripts/env');
var rest = require('@octokit/rest');
var git = _interopDefault(require('simple-git'));

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
              if (aliveOnly === true) {
                return conf.projects[p].status === 'alive';
              } else if (aliveOnly === 'archived') {
                return conf.projects[p].status !== 'alive';
              } else {
                return true;
              }
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
    var conf, activeProject;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return readConf();

          case 2:
            conf = _context2.sent;
            activeProject = conf.projects[conf.active];

            if (activeProject) {
              activeProject.name = conf.active;
            }

            return _context2.abrupt("return", activeProject);

          case 6:
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
var getActiveDirectory =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3() {
    var dir, activeProject;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getActiveProject();

          case 2:
            activeProject = _context3.sent;

            if (!activeProject) {
              log('There is no active project. Please activate a project using the "activate" command.', 'error');
            } else {
              dir = activeProject.path;
            }

            return _context3.abrupt("return", dir);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getActiveDirectory() {
    return _ref3.apply(this, arguments);
  };
}();
var getActiveIllustrations =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee5() {
    var illustrations, activeProject;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getActiveProject();

          case 2:
            activeProject = _context5.sent;

            if (!activeProject) {
              log('There is no active project. Please activate a project using the "activate" command.', 'error');
            } else {
              illustrations = activeProject.illustrations;
            }

            return _context5.abrupt("return", illustrations);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getActiveIllustrations() {
    return _ref5.apply(this, arguments);
  };
}();
var updateConf =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee6(obj) {
    var conf, updateSignature, valueKeys, objKeys;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (obj) {
              _context6.next = 3;
              break;
            }

            log('No update provided.', 'error');
            throw new Error('No update provided.');

          case 3:
            _context6.next = 5;
            return readConf();

          case 5:
            conf = _context6.sent;
            updateSignature = {};
            valueKeys = ['active', 'illustratorLoc'];
            valueKeys.forEach(function (k) {
              if (k in obj) {
                updateSignature[k] = {
                  $set: obj[k]
                };
              }
            });
            objKeys = ['projects'];
            objKeys.forEach(function (k) {
              if (obj[k]) {
                updateSignature[k] = {};

                var _loop = function _loop(item) {
                  updateSignature[k][item] = {
                    $apply: function $apply(val) {
                      if (val) {
                        return merge(val, obj[k][item]);
                      } else {
                        return val;
                      }
                    }
                  };
                };

                for (var item in obj[k]) {
                  _loop(item);
                }
              }
            });
            return _context6.abrupt("return", fs.outputJson(CONFIG_PATH, update(conf, updateSignature), {
              spaces: 2
            }));

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateConf(_x) {
    return _ref6.apply(this, arguments);
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
      allProjectsNotActive,
      inquiry,
      _args = arguments;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          opts = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          project = opts.project;
          _context.next = 4;
          return getProjects();

        case 4:
          allProjects = _context.sent;
          _context.next = 7;
          return getActiveProject();

        case 7:
          activeProject = _context.sent;
          allProjectsNotActive = allProjects.filter(function (p) {
            return activeProject ? activeProject.name !== p : true;
          });

          if (!(allProjectsNotActive.length === 0)) {
            _context.next = 12;
            break;
          }

          log('No projects available to activate.', 'info');
          return _context.abrupt("return");

        case 12:
          if (project) {
            _context.next = 17;
            break;
          }

          _context.next = 15;
          return inquirer.prompt([{
            type: 'list',
            name: 'projectName',
            message: 'Which project would you like to activate?',
            choices: allProjectsNotActive.map(function (p) {
              return {
                name: p,
                value: p
              };
            })
          }]);

        case 15:
          inquiry = _context.sent;
          project = inquiry.projectName;

        case 17:
          if (!(allProjects.indexOf(project) === -1)) {
            _context.next = 20;
            break;
          }

          log("Project \"".concat(project, "\" does not exist or is archived."), 'error');
          return _context.abrupt("return");

        case 20:
          _context.next = 22;
          return updateConf({
            active: project
          });

        case 22:
          log("\"".concat(project, "\" is now the active project."), 'success');

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs.command('activate [project]', 'Sets a project to be active', function (yargs) {
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
            return activate(args);

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
}());

var archive = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var opts,
      project,
      activeProject,
      allProjects,
      inquiry,
      updateSignature,
      _args = arguments;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          opts = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          project = opts.project;
          _context.next = 4;
          return getActiveProject();

        case 4:
          activeProject = _context.sent;
          _context.next = 7;
          return getProjects();

        case 7:
          allProjects = _context.sent;

          if (!(allProjects.length === 0)) {
            _context.next = 11;
            break;
          }

          log('No projects available to archive.', 'info');
          return _context.abrupt("return");

        case 11:
          if (project) {
            _context.next = 16;
            break;
          }

          _context.next = 14;
          return inquirer.prompt([{
            type: 'list',
            name: 'projectName',
            message: 'Which project would you like to archive?',
            choices: allProjects.map(function (p) {
              return {
                name: p,
                value: p
              };
            })
          }]);

        case 14:
          inquiry = _context.sent;
          project = inquiry.projectName;

        case 16:
          if (!(allProjects.indexOf(project) === -1)) {
            _context.next = 19;
            break;
          }

          log("Project \"".concat(project, "\" does not exist or is archived."), 'error');
          return _context.abrupt("return");

        case 19:
          updateSignature = {
            projects: {}
          };

          if (project === activeProject.name) {
            updateSignature.active = null;
          }

          updateSignature.projects[project] = {};
          updateSignature.projects[project].status = 'archived';
          _context.next = 25;
          return updateConf(updateSignature);

        case 25:
          log("\"".concat(project, "\" is now archived. Use \"unarchive\" to undo this."), 'success');

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs.command('archive [project]', 'Archives a project', function (yargs) {
  yargs.positional('project', {
    alias: 'p',
    describe: 'The name of the project to archive',
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
            return archive(args);

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
}());

var exec = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(cmd, dir) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (dir) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return getActiveDirectory();

          case 3:
            dir = _context.sent;

          case 4:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var child = child_process.exec(cmd, {
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
            }));

          case 5:
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

var code = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var dir;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getActiveDirectory();

        case 2:
          dir = _context.sent;

          if (dir) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return");

        case 5:
          _context.next = 7;
          return exec("atom \"".concat(dir, "\""));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs.command('code', 'Opens the active project in Atom', function (yargs) {
  yargs.option('verbose', {
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
            return code(args);

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
}());

var conf = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return exec("atom \"".concat(CONFIG_PATH, "\""));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs.command('conf', 'Open the ai2jsx conf file', function (yargs) {
  yargs.option('verbose', {
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
            return conf(args);

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
}());

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

yargs.command('deactivate', 'Sets no project to be active', function (yargs) {
  yargs.option('verbose', {
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
            return deactivate(args);

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
}());

var dir = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return exec("open ".concat(STATE_PATH));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs.command('dir', 'Open the ai2jsx projects folder', function (yargs) {
  yargs.option('verbose', {
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
            return dir(args);

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
}());

var access = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(destination, step) {
    var hash, testFile;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            log("[".concat(step[0], "/").concat(step[1], "] Checking for write access..."));
            _context.prev = 1;

            hash = function hash() {
              return Math.random().toString(36).substring(7);
            };

            testFile = "".concat(hash() + hash() + hash() + hash(), ".txt");
            _context.next = 6;
            return fs.writeFile(path.join(destination, testFile), 'TEST', 'utf8');

          case 6:
            _context.next = 8;
            return fs.remove(path.join(destination, testFile));

          case 8:
            return _context.abrupt("return", true);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);

            if (!(_context.t0.code === 'EACCES')) {
              _context.next = 18;
              break;
            }

            log('You don\'t have access to the destination folder. Try running the command with "sudo" before it.', 'error');
            return _context.abrupt("return", false);

          case 18:
            throw _context.t0;

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var config = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(illustrator, destination, step) {
    var initialConf, confRaw;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            log("[".concat(step[0], "/").concat(step[1], "] Checking for config..."));
            _context.next = 3;
            return fs.ensureFile(CONFIG_PATH);

          case 3:
            initialConf = {
              active: null,
              projects: {},
              illustratorLoc: illustrator
            };
            _context.next = 6;
            return fs.readFile(CONFIG_PATH, 'utf8');

          case 6:
            confRaw = _context.sent;

            if (!(confRaw.length === 0)) {
              _context.next = 12;
              break;
            }

            _context.next = 10;
            return fs.outputJson(CONFIG_PATH, initialConf);

          case 10:
            _context.next = 13;
            break;

          case 12:
            updateConf(initialConf);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var scripts = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(destination, step) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            log("[".concat(step[0], "/").concat(step[1], "] Installing scripts..."));
            _context.next = 3;
            return fs.copy(path.join(INSTALL_DIRECTORY, 'ai2jsx.js'), path.join(destination, 'ai2jsx.js'));

          case 3:
            log('Installed ai2jsx.js', 'info');
            _context.next = 6;
            return fs.copy(path.join(INSTALL_DIRECTORY, 'ai2jsx-config.json'), path.join(destination, 'ai2jsx-config.json'));

          case 6:
            log('Installed ai2jsx-config.json', 'info');

          case 7:
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

var isTemplateInstalled =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(template) {
    var conf, confList;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return interactiveTemplates.getGlobalConfig();

          case 2:
            conf = _context.sent;
            confList = keys(conf.templates).map(function (t) {
              return conf.templates[t].repo;
            });
            return _context.abrupt("return", confList.filter(function (t) {
              return t === template;
            }).length > 0);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isTemplateInstalled(_x) {
    return _ref.apply(this, arguments);
  };
}();

var templates = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(destination, step) {
    var isGraphicsEmbedInstalled, isGraphicsIlloInstalled;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            log("[".concat(step[0], "/").concat(step[1], "] Checking for templates..."));
            _context2.next = 3;
            return isTemplateInstalled('template_graphic-embed');

          case 3:
            isGraphicsEmbedInstalled = _context2.sent;
            _context2.next = 6;
            return isTemplateInstalled('template_graphic-embed-illustration');

          case 6:
            isGraphicsIlloInstalled = _context2.sent;

            if (isGraphicsEmbedInstalled) {
              _context2.next = 11;
              break;
            }

            log('No embed template found. Installing "The-Politico/template_graphic-embed"...', 'info');
            _context2.next = 11;
            return interactiveTemplates.register('The-Politico/template_graphic-embed', false);

          case 11:
            if (isGraphicsIlloInstalled) {
              _context2.next = 15;
              break;
            }

            log('No illustration template found. Installing "The-Politico/template_graphic-embed-illustration"...', 'info');
            _context2.next = 15;
            return interactiveTemplates.register('The-Politico/template_graphic-embed-illustration', false);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
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
    var illustrator, destination, verbose, success, hasAccess;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            illustrator = _ref.illustrator, destination = _ref.destination, verbose = _ref.verbose;
            success = true;

            if (!destination) {
              destination = path.join(path.dirname(illustrator), 'Presets.localized/en_US/Scripts/');
            }

            log("Installing ai2jsx at ".concat(chalk.bold(destination), "."));
            _context.next = 6;
            return config(illustrator, destination, [1, STEPS_COUNT]);

          case 6:
            _context.next = 8;
            return templates(destination, [2, STEPS_COUNT]);

          case 8:
            _context.next = 10;
            return access(destination, [3, STEPS_COUNT]);

          case 10:
            hasAccess = _context.sent;

            if (!hasAccess) {
              _context.next = 16;
              break;
            }

            _context.next = 14;
            return scripts(destination, [4, STEPS_COUNT]);

          case 14:
            _context.next = 17;
            break;

          case 16:
            success = false;

          case 17:
            if (success) {
              log("Ai2jsx was installed (or updated) on your computer.", 'success');
              log("You can run it by going to ".concat(chalk.bold('File > Scripts > ai2jsx'), " inside an Adobe Illustrator file."), 'success');
            } else {
              log("An error occured installing Ai2jsx, please check the logs above.", 'error');
            }

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref2.apply(this, arguments);
}

yargs.command('install [illustrator]', 'Installs ai2jsx into your installation of Adobe Illustrator', function (yargs) {
  yargs.positional('illustrator', {
    alias: 'i',
    describe: 'Adobe Illustrator app location',
    type: 'string',
    "default": '/Applications/Adobe Illustrator 2020/Adobe Illustrator.app'
  }).option('destination', {
    alias: 'd',
    describe: 'Adobe Illustrator scripts location',
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
}());

var illo = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var activeProject, projectPath, projectName, _ref2, confirm, newProjectConf, illustrations;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getActiveProject();

        case 2:
          activeProject = _context.sent;
          projectPath = activeProject.path;
          projectName = activeProject.name;
          _context.next = 7;
          return inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: "Do you want to create a new illustration in \"".concat(projectName, "\"?"),
            defualt: true
          }]);

        case 7:
          _ref2 = _context.sent;
          confirm = _ref2.confirm;

          if (confirm) {
            _context.next = 13;
            break;
          }

          log('You can only create new illustrations in the active project.', 'info');
          log('Change the active project using "activate" to create a new illustration in it.', 'info');
          return _context.abrupt("return");

        case 13:
          _context.prev = 13;
          _context.next = 16;
          return fs.ensureDir(projectPath);

        case 16:
          log('Creating your new illustration...', 'info');
          _context.next = 19;
          return interactiveTemplates.newProject('Extra Graphic Illustration', projectPath);

        case 19:
          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](13);
          log(_context.t0, 'error');
          return _context.abrupt("return");

        case 25:
          log('Saving configuration...', 'info');
          newProjectConf = {
            projects: {}
          };
          newProjectConf.projects[projectName] = {};
          newProjectConf.projects[projectName].illustrations = {};
          _context.next = 31;
          return fs.readdir(path.join(projectPath, 'illustrations'));

        case 31:
          illustrations = _context.sent;
          illustrations.forEach(function (i) {
            if (!(i in activeProject.illustrations)) {
              newProjectConf.projects[projectName].illustrations[i] = {};
            }
          });
          _context.next = 35;
          return updateConf(newProjectConf);

        case 35:
          log("New illustration in \"".concat(projectName, "\" created. Restart any active development servers to see the change take place."), 'success');

        case 36:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[13, 21]]);
}));

var installDeps = (function (dir) {
  return exec('npm install', dir);
});

var client = new rest.Octokit({
  auth: process.env.GITHUB_TOKEN
});

var newRepo = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(dir, repoName) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (dir) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return getActiveDirectory();

          case 3:
            dir = _context.sent;

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return client.repos.createInOrg({
              org: 'The-Politico',
              name: repoName,
              "private": true
            });

          case 7:
            _context.next = 16;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](4);

            if (!(_context.t0.status === 422)) {
              _context.next = 15;
              break;
            }

            throw new Error('There already exists a repo with that name. Please try again with a new name.');

          case 15:
            throw _context.t0;

          case 16:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              try {
                git(dir).init().add('./*').commit('initial').addRemote('origin', "git@github.com:The-Politico/".concat(repoName, ".git")).push('origin', 'master').exec(function () {
                  resolve();
                });
              } catch (e) {
                reject(e);
              }
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var project = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var _ref2,
      _ref2$testing,
      testing,
      conf,
      _ref3,
      projectName,
      projectPath,
      projectRepo,
      newProjectConf,
      illustrations,
      _args = arguments;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref2$testing = _ref2.testing, testing = _ref2$testing === void 0 ? false : _ref2$testing;
          _context.next = 3;
          return readConf();

        case 3:
          conf = _context.sent;
          _context.next = 6;
          return inquirer.prompt([{
            type: 'input',
            name: 'projectName',
            message: 'What is this project called?',
            validate: function validate(val) {
              if (val in conf.projects) {
                return 'You already have a project with that name.';
              }

              if (!/^[A-Za-z0-9\s-_]+$/.test(val)) {
                return 'Only letters, numbers, spaces, hyphens, and underscores allowed.';
              }

              return true;
            }
          }]);

        case 6:
          _ref3 = _context.sent;
          projectName = _ref3.projectName;
          projectPath = path.join(PROJECTS_PATH, projectName);
          projectRepo = slugify(projectName, {
            lower: true
          }).replace(/_/g, '-');
          _context.prev = 10;
          _context.next = 13;
          return fs.ensureDir(projectPath);

        case 13:
          log('Creating your new project...', 'info');
          _context.next = 16;
          return interactiveTemplates.newProject('Graphic Embed', projectPath);

        case 16:
          log('Installing dependencies...', 'info');
          _context.next = 19;
          return installDeps(projectPath);

        case 19:
          if (testing) {
            _context.next = 23;
            break;
          }

          log('Creating GitHub repo...', 'info');
          _context.next = 23;
          return newRepo(projectPath, "illustration_".concat(projectRepo));

        case 23:
          _context.next = 29;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](10);
          log(_context.t0, 'error');
          return _context.abrupt("return");

        case 29:
          if (testing) {
            _context.next = 42;
            break;
          }

          log('Saving configuration...', 'info');
          newProjectConf = {
            projects: {}
          };
          newProjectConf.projects[projectName] = {
            status: 'alive',
            path: projectPath,
            lastModifiedTime: new Date().toISOString(),
            illustrations: {}
          };
          _context.next = 35;
          return fs.readdir(path.join(projectPath, 'illustrations'));

        case 35:
          illustrations = _context.sent;
          illustrations.forEach(function (i) {
            newProjectConf.projects[projectName][i] = {};
          });
          _context.next = 39;
          return updateConf(newProjectConf);

        case 39:
          log('Activating new project...', 'info');
          _context.next = 42;
          return activate({
            project: projectName
          });

        case 42:
          log("New project \"".concat(projectName, "\" created and activated"), 'success');

        case 43:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[10, 25]]);
}));

var newIndex = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var type, _ref3, func;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _ref.type;

            if (type) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return inquirer.prompt([{
              type: 'list',
              name: 'func',
              message: 'What would you like to create?',
              choices: [{
                name: 'Project',
                value: 'project'
              }, {
                name: 'Illustration in existing project',
                value: 'illo'
              }]
            }]);

          case 4:
            _ref3 = _context.sent;
            func = _ref3.func;
            type = func;

          case 7:
            _context.t0 = type;
            _context.next = _context.t0 === 'project' ? 10 : _context.t0 === 'illo' ? 13 : 16;
            break;

          case 10:
            _context.next = 12;
            return project();

          case 12:
            return _context.abrupt("break", 16);

          case 13:
            _context.next = 15;
            return illo();

          case 15:
            return _context.abrupt("break", 16);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();

yargs.command('new [type]', 'Creates something new', function (yargs) {
  yargs.positional('type', {
    alias: 't',
    describe: 'What to create',
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
            return newIndex(args);

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
}());

var open = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var illustration, illos, _ref3, illoName;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            illustration = _ref.illustration;
            _context.next = 3;
            return getActiveIllustrations();

          case 3:
            illos = _context.sent;

            if (illos) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            if (!(!illustration || !(illustration in illos))) {
              _context.next = 12;
              break;
            }

            _context.next = 9;
            return inquirer.prompt([{
              type: 'list',
              name: 'illoName',
              message: 'Which illustration would you like to open? (Don\'t see what you\'re looking for? Try changing the active project.)',
              choices: keys(illos).map(function (i) {
                return {
                  name: i,
                  value: i
                };
              })
            }]);

          case 9:
            _ref3 = _context.sent;
            illoName = _ref3.illoName;
            illustration = illoName;

          case 12:
            _context.next = 14;
            return exec("open \"illustrations/".concat(illustration, "/").concat(illustration, ".ai\""));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();

yargs.command('open [illustration]', 'Open an illustration', function (yargs) {
  yargs.positional('illustration', {
    alias: 'i',
    describe: 'The name of the illustration',
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
            return open(args);

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
}());

var preview = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return exec('npm run pubStaging');

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs.command('preview', 'Publish a preview to the web', function (yargs) {
  yargs.option('verbose', {
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
            return preview(args);

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
}());

var publish = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return exec('npm run pubProduction');

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs.command('publish', 'Publish the embed live', function (yargs) {
  yargs.option('verbose', {
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
            return publish(args);

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
}());

var start = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return exec('npm run start');

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs.command('start', 'Start a development server', function (yargs) {
  yargs.option('verbose', {
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
            return start(args);

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
}());

var unarchive = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var opts,
      project,
      archivedProjects,
      inquiry,
      updateSignature,
      _args = arguments;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          opts = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          project = opts.project;
          _context.next = 4;
          return getProjects('archived');

        case 4:
          archivedProjects = _context.sent;

          if (!(archivedProjects.length === 0)) {
            _context.next = 8;
            break;
          }

          log('No projects available to unarchive.', 'info');
          return _context.abrupt("return");

        case 8:
          if (project) {
            _context.next = 13;
            break;
          }

          _context.next = 11;
          return inquirer.prompt([{
            type: 'list',
            name: 'projectName',
            message: 'Which project would you like to make available?',
            choices: archivedProjects.map(function (p) {
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
          if (!(archivedProjects.indexOf(project) === -1)) {
            _context.next = 16;
            break;
          }

          log("Project \"".concat(project, "\" does not exist or is not archived."), 'error');
          return _context.abrupt("return");

        case 16:
          updateSignature = {
            projects: {}
          };
          updateSignature.projects[project] = {};
          updateSignature.projects[project].status = 'alive';
          _context.next = 21;
          return updateConf(updateSignature);

        case 21:
          log("\"".concat(project, "\" is now available. Use \"activate\" to set it as the active project."), 'success');

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs.command('unarchive [project]', 'Unarchives a project', function (yargs) {
  yargs.positional('project', {
    alias: 'p',
    describe: 'The name of the project to unarchive',
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
            return unarchive(args);

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
}());

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

yargs.command('which', 'Find out what the active project is', function (yargs) {
  yargs.option('verbose', {
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
            return which(args);

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
}());

yargs // eslint-disable-line
.help().scriptName('ai2jsx').argv;
