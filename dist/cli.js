#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var yargs = _interopDefault(require('yargs'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var chalk = _interopDefault(require('chalk'));
var cli = _interopDefault(require('cli-progress'));
var inquirer = _interopDefault(require('inquirer'));
var fs = _interopDefault(require('fs-extra'));
var path = _interopDefault(require('path'));
var os = _interopDefault(require('os'));
var keys = _interopDefault(require('lodash/keys'));
var update = _interopDefault(require('immutability-helper'));
var merge = _interopDefault(require('lodash/merge'));
var child_process = require('child_process');
var toStartCase = _interopDefault(require('lodash/startCase'));
var git = _interopDefault(require('simple-git'));
require('@politico/interactive-bin/dist/scripts/env');
var { Octokit } = require('@octokit/rest');
var interactiveTemplates = require('@politico/interactive-templates');
var slugify = _interopDefault(require('slugify'));
var semver = _interopDefault(require('semver'));
var NpmApi = _interopDefault(require('npm-api'));

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

var selectProject = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(selection, projects, logs) {
    var noneAvailable, question, doesNotExist, inquiry;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            noneAvailable = logs.noneAvailable, question = logs.question, doesNotExist = logs.doesNotExist;

            if (!(projects.length === 0)) {
              _context.next = 4;
              break;
            }

            log(noneAvailable, 'info');
            return _context.abrupt("return");

          case 4:
            if (selection) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return inquirer.prompt([{
              type: 'list',
              name: 'projectName',
              message: question,
              choices: projects.map(function (p) {
                return {
                  name: p,
                  value: p
                };
              })
            }]);

          case 7:
            inquiry = _context.sent;
            selection = inquiry.projectName;

          case 9:
            if (!(projects.indexOf(selection) === -1)) {
              _context.next = 12;
              break;
            }

            log(doesNotExist(selection), 'error');
            return _context.abrupt("return");

          case 12:
            return _context.abrupt("return", selection);

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

var INSTALL_DIRECTORY = path.resolve(__dirname, '../install');
var STATE_PATH = path.join(os.homedir(), ".artisan");
var CONFIG_PATH = path.join(STATE_PATH, "config.json");
var PROJECTS_PATH = path.join(STATE_PATH, 'projects');

var readConf = (function () {
  return fs.readJson(CONFIG_PATH);
});

var getActiveProject = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var conf, activeProject;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return readConf();

        case 2:
          conf = _context.sent;
          activeProject = conf.projects[conf.active];

          if (activeProject) {
            activeProject.name = conf.active;
          }

          if (!activeProject) {
            log('There is no active project. Please activate a project using the "activate" command.', 'error');
          }

          return _context.abrupt("return", activeProject);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

var getActiveDirectory = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var dir, activeProject;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getActiveProject();

        case 2:
          activeProject = _context.sent;

          if (!activeProject) {
            log('There is no active project. Please activate a project using the "activate" command.', 'error');
          } else {
            dir = activeProject.path;
          }

          return _context.abrupt("return", dir);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

var getActiveIllustrations = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var illustrations, activeProject;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getActiveProject();

        case 2:
          activeProject = _context.sent;

          if (!activeProject) {
            log('2 There is no active project. Please activate a project using the "activate" command.', 'error');
          } else {
            illustrations = activeProject.illustrations;
          }

          return _context.abrupt("return", illustrations);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

var getProjects = /*#__PURE__*/
_asyncToGenerator(
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

var isActiveProject = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var conf, activeProject;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return readConf();

        case 2:
          conf = _context.sent;
          activeProject = conf.projects[conf.active];

          if (!activeProject) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", true);

        case 8:
          return _context.abrupt("return", false);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

var isProjectDownloaded = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(value, key) {
    var conf, project, isIt;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readConf();

          case 2:
            conf = _context.sent;
            project = null;
            isIt = keys(conf.projects).some(function (name) {
              if (conf.projects[name][key] === value) {
                project = name;
                return true;
              } else {
                return false;
              }
            });

            if (!isIt) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", project);

          case 9:
            return _context.abrupt("return", false);

          case 10:
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

var removeIllustrationFromConf = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(project, illustration) {
    var conf, updateSignature;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readConf();

          case 2:
            conf = _context.sent;
            updateSignature = {};
            updateSignature.projects = {};
            updateSignature.projects[project] = {};
            updateSignature.projects[project].illustrations = {
              $unset: [illustration]
            };
            return _context.abrupt("return", fs.outputJson(CONFIG_PATH, update(conf, updateSignature), {
              spaces: 2
            }));

          case 8:
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

var removeProjectFromConf = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(project, illustration) {
    var conf, updateSignature;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readConf();

          case 2:
            conf = _context.sent;
            updateSignature = {};
            updateSignature.projects = {
              $unset: [project]
            };
            return _context.abrupt("return", fs.outputJson(CONFIG_PATH, update(conf, updateSignature), {
              spaces: 2
            }));

          case 6:
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

var updateConf = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(obj) {
    var conf, updateSignature, valueKeys, objKeys;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (obj) {
              _context.next = 3;
              break;
            }

            log('No update provided.', 'error');
            throw new Error('No update provided.');

          case 3:
            _context.next = 5;
            return readConf();

          case 5:
            conf = _context.sent;
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
                        return obj[k][item];
                      }
                    }
                  };
                };

                for (var item in obj[k]) {
                  _loop(item);
                }
              }
            });
            return _context.abrupt("return", fs.outputJson(CONFIG_PATH, update(conf, updateSignature), {
              spaces: 2
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();

var activate = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var opts,
      allProjects,
      isProject,
      activeProject,
      allProjectsNotActive,
      project,
      _args = arguments;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          opts = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          _context.next = 3;
          return getProjects();

        case 3:
          allProjects = _context.sent;
          _context.next = 6;
          return isActiveProject();

        case 6:
          isProject = _context.sent;

          if (!isProject) {
            _context.next = 11;
            break;
          }

          _context.next = 10;
          return getActiveProject();

        case 10:
          activeProject = _context.sent;

        case 11:
          allProjectsNotActive = allProjects.filter(function (p) {
            return activeProject ? activeProject.name !== p : true;
          });
          _context.next = 14;
          return selectProject(opts.project, allProjectsNotActive, {
            noneAvailable: 'No projects available to activate.',
            question: 'Which project would you like to activate?',
            doesNotExist: function doesNotExist(p) {
              return "Project \"".concat(p, "\" does not exist or is archived.");
            }
          });

        case 14:
          project = _context.sent;

          if (project) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return");

        case 17:
          _context.next = 19;
          return updateConf({
            active: project
          });

        case 19:
          log("\"".concat(project, "\" is now the active project."), 'success');

        case 20:
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
            activate(args);

          case 1:
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
      activeProject,
      allProjects,
      project,
      updateSignature,
      _args = arguments;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          opts = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          _context.next = 3;
          return getActiveProject();

        case 3:
          activeProject = _context.sent;
          _context.next = 6;
          return getProjects();

        case 6:
          allProjects = _context.sent;
          _context.next = 9;
          return selectProject(opts.project, allProjects, {
            noneAvailable: 'No projects available to archive.',
            question: 'Which project would you like to archive?',
            doesNotExist: function doesNotExist(p) {
              return "Project \"".concat(p, "\" does not exist or is archived.");
            }
          });

        case 9:
          project = _context.sent;

          if (project) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return");

        case 12:
          updateSignature = {
            projects: {}
          };

          if (activeProject && project === activeProject.name) {
            updateSignature.active = null;
          }

          updateSignature.projects[project] = {};
          updateSignature.projects[project].status = 'archived';
          _context.next = 18;
          return updateConf(updateSignature);

        case 18:
          log("\"".concat(project, "\" is now archived. Use \"unarchive\" to undo this."), 'success');

        case 19:
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
            archive(args);

          case 1:
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
            if (dir === 'root') {
              dir = STATE_PATH;
            }

            if (dir) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return getActiveDirectory();

          case 4:
            dir = _context.sent;

          case 5:
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

          case 6:
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
          return exec("atom \"".concat(dir, "\""), 'root');

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs.command('code', 'Opens the active project in Atom', function (yargs) {},
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(args) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            code(args);

          case 1:
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
          return exec("atom \"".concat(CONFIG_PATH, "\""), 'root');

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs.command('conf', 'Open the artisan conf file', function (yargs) {},
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(args) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            conf(args);

          case 1:
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

yargs.command('deactivate', 'Sets no project to be active', function (yargs) {},
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(args) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            deactivate(args);

          case 1:
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

var selectIllustration = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(selection, logs) {
    var illoConf, illos, noneAvailable, question, doesNotExist, inquiry;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getActiveIllustrations();

          case 2:
            illoConf = _context.sent;
            illos = keys(illoConf);
            noneAvailable = logs.noneAvailable, question = logs.question, doesNotExist = logs.doesNotExist;

            if (!(illos.length === 0)) {
              _context.next = 8;
              break;
            }

            log(noneAvailable, 'info');
            return _context.abrupt("return");

          case 8:
            if (selection) {
              _context.next = 13;
              break;
            }

            _context.next = 11;
            return inquirer.prompt([{
              type: 'list',
              name: 'illoName',
              message: question,
              choices: illos.map(function (i) {
                return {
                  name: i,
                  value: i
                };
              })
            }]);

          case 11:
            inquiry = _context.sent;
            selection = inquiry.illoName;

          case 13:
            if (!(illos.indexOf(selection) === -1)) {
              _context.next = 16;
              break;
            }

            log(doesNotExist(selection), 'error');
            return _context.abrupt("return");

          case 16:
            return _context.abrupt("return", selection);

          case 17:
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

var illo = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var selection, activeProject, projectPath, projectName, _ref3, confirm, illo, illustratorFilePath, pageFilePath;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            selection = _ref.selection;
            _context.next = 3;
            return getActiveProject();

          case 3:
            activeProject = _context.sent;

            if (activeProject) {
              _context.next = 7;
              break;
            }

            log('You can only delete illustrations in the active project, but no active project is set. Use the "activate" command to set an active project.', 'error');
            return _context.abrupt("return");

          case 7:
            projectPath = activeProject.path;
            projectName = activeProject.name;
            _context.next = 11;
            return inquirer.prompt([{
              type: 'confirm',
              name: 'confirm',
              message: selection ? "Are you sure you want to delete the illustration \"".concat(selection, "\" in \"").concat(projectName, "\"? THIS CANNOT BE UNDONE!") : "Are you sure you want to delete an illustration in \"".concat(projectName, "\"? THIS CANNOT BE UNDONE!"),
              defualt: true
            }]);

          case 11:
            _ref3 = _context.sent;
            confirm = _ref3.confirm;

            if (confirm) {
              _context.next = 16;
              break;
            }

            log('Nothing will be deleted', 'info');
            return _context.abrupt("return");

          case 16:
            _context.next = 18;
            return selectIllustration(selection, {
              noneAvailable: 'No illustrations found in active project.',
              question: 'Which illustration would you like to delete?',
              doesNotExist: function doesNotExist(i) {
                return "Illustration \"".concat(i, "\" does not exist in the active project.");
              }
            });

          case 18:
            illo = _context.sent;

            if (illo) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return");

          case 21:
            illustratorFilePath = path.join(projectPath, 'illustrations', illo);
            pageFilePath = path.join(projectPath, 'src', 'components', illo);
            _context.prev = 23;
            log('Deleting your illustration...', 'info');
            _context.next = 27;
            return fs.remove(illustratorFilePath);

          case 27:
            _context.next = 29;
            return fs.remove(pageFilePath);

          case 29:
            _context.next = 35;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](23);
            log(_context.t0, 'error');
            return _context.abrupt("return");

          case 35:
            log('Saving configuration...', 'info');
            _context.next = 38;
            return removeIllustrationFromConf(projectName, illo);

          case 38:
            log("The illustration \"".concat(illo, "\" in \"").concat(projectName, "\" has been deleted. Restart any active development servers to see the change take place."), 'success');

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[23, 31]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();

var project = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var selection, allProjects, projectName, _ref3, confirm, conf, projectPath;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            selection = _ref.selection;
            _context.next = 3;
            return getProjects();

          case 3:
            allProjects = _context.sent;
            _context.next = 6;
            return selectProject(selection, allProjects, {
              noneAvailable: 'No projects available to delete. Archived projects must be unarchived before they can be deleted.',
              question: 'Which project would you like to delete? Don\'t see something you\'re looking for? Try unarchiving the project first.',
              doesNotExist: function doesNotExist(p) {
                return "Project \"".concat(p, "\" does not exist or is archived.");
              }
            });

          case 6:
            projectName = _context.sent;

            if (projectName) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return");

          case 9:
            _context.next = 11;
            return inquirer.prompt([{
              type: 'confirm',
              name: 'confirm',
              message: "Are you sure you want to delete \"".concat(projectName, "\"? THIS CANNOT BE UNDONE!"),
              defualt: true
            }]);

          case 11:
            _ref3 = _context.sent;
            confirm = _ref3.confirm;

            if (confirm) {
              _context.next = 16;
              break;
            }

            log('Nothing will be deleted', 'info');
            return _context.abrupt("return");

          case 16:
            log('Deleting project...', 'info');
            _context.next = 19;
            return readConf();

          case 19:
            conf = _context.sent;
            projectPath = conf.projects[projectName].path;
            _context.next = 23;
            return fs.remove(projectPath);

          case 23:
            log('Saving configuration...', 'info');
            _context.next = 26;
            return removeProjectFromConf(projectName);

          case 26:
            log("The project \"".concat(projectName, "\" has been deleted."), 'success');

          case 27:
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

var deleteIndex = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var type, selection, _ref3, func;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _ref.type, selection = _ref.selection;

            if (type) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return inquirer.prompt([{
              type: 'list',
              name: 'func',
              message: 'What would you like to delete?',
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
            return project({
              selection: selection
            });

          case 12:
            return _context.abrupt("break", 16);

          case 13:
            _context.next = 15;
            return illo({
              selection: selection
            });

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

yargs.command('delete [type] [selection]', 'Delete something', function (yargs) {
  yargs.positional('type', {
    alias: 't',
    describe: 'What type of thing to delete',
    type: 'string'
  }).positional('selection', {
    alias: 's',
    describe: 'What to delete',
    type: 'string'
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
            deleteIndex(args);

          case 1:
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
          return exec("open ".concat(STATE_PATH), 'root');

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

yargs.command('dir', 'Open the artisan projects folder', function (yargs) {},
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(args) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dir(args);

          case 1:
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

var cloneRepo = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(repoName, projectName) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              try {
                git(PROJECTS_PATH).clone(repoName, projectName).exec(function () {
                  resolve();
                });
              } catch (e) {
                reject(e);
              }
            }));

          case 1:
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

var client = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

var gacm = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(dir, repoName, message) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              try {
                git(dir).init().add('./*').commit(message).push('origin', 'master').exec(function () {
                  resolve();
                });
              } catch (e) {
                reject(e);
              }
            }));

          case 1:
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

var getAllAvailableRepos = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var last100, conf, allDownloadedProjects;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return client.repos.listForAuthenticatedUser({
            affiliation: 'organization_member',
            per_page: 100,
            sort: 'updated'
          });

        case 2:
          last100 = _context.sent;
          _context.next = 5;
          return readConf();

        case 5:
          conf = _context.sent;
          allDownloadedProjects = keys(conf.projects).map(function (projectName) {
            return conf.projects[projectName].repo;
          });
          return _context.abrupt("return", last100.data.filter(function (d) {
            return d.name.startsWith('illustration_');
          }).filter(function (d) {
            return allDownloadedProjects.indexOf(d.name) === -1;
          }).map(function (i) {
            return {
              name: toStartCase(i.name.split('illustration_')[1]),
              value: i.full_name
            };
          }));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

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

/*
 * Parses an owner and repo from a GitHub string
 * example The-Politico/template_pit-test
 * example: https://github.com/The-Politico/template_pit-test
 * example: git@github.com:The-Politico/template_pit-test.git
 */
var parseRepoPath = (function (repoPath) {
  var str = repoPath;
  str = str.replace(/git@github\.com:/, '');
  str = str.replace(/https?:\/\/github.com\//, '');
  str = str.replace(/\.git/, '');
  var parts = str.split('/');

  if (parts.length !== 2) {
    throw new Error("Invalid repo path: ".concat(repoPath));
  }

  return {
    owner: parts[0],
    repo: parts[1]
  };
});

var installDeps = (function (dir) {
  return exec('npm install', dir);
});

var download = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var repoName, allRepos, inquiry, repo, owner, projectName, parsedRepo, projectDownloaded, projectPath, newProjectConf, illustrations;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            repoName = _ref.repo;

            if (repoName) {
              _context.next = 12;
              break;
            }

            _context.next = 4;
            return getAllAvailableRepos();

          case 4:
            allRepos = _context.sent;

            if (!(allRepos.length === 0)) {
              _context.next = 8;
              break;
            }

            log('There are no projects for you to download.', 'info');
            return _context.abrupt("return");

          case 8:
            _context.next = 10;
            return inquirer.prompt([{
              type: 'list',
              name: 'repo',
              message: 'Choose a project to download',
              choices: allRepos
            }]);

          case 10:
            inquiry = _context.sent;
            repoName = inquiry.repo;

          case 12:
            _context.prev = 12;
            parsedRepo = parseRepoPath(repoName);
            repo = parsedRepo.repo;
            owner = parsedRepo.owner;
            projectName = toStartCase(repo.split('illustration_')[1]);
            _context.next = 24;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](12);
            log("Invalid repo \"".concat(repoName, "\" provided"), 'error');
            log(_context.t0);
            return _context.abrupt("return");

          case 24:
            _context.next = 26;
            return isProjectDownloaded(repo, 'repo');

          case 26:
            projectDownloaded = _context.sent;

            if (!projectDownloaded) {
              _context.next = 30;
              break;
            }

            log("You already have this project downloaded as \"".concat(projectDownloaded, "\""), 'info');
            return _context.abrupt("return");

          case 30:
            projectPath = path.join(PROJECTS_PATH, projectName);
            _context.prev = 31;
            log('Downloading repo...', 'info');
            _context.next = 35;
            return cloneRepo("git@github.com:".concat(owner, "/").concat(repo, ".git"), projectName);

          case 35:
            _context.next = 42;
            break;

          case 37:
            _context.prev = 37;
            _context.t1 = _context["catch"](31);
            log('Something went wrong trying to clone this repo.', 'error');
            log(_context.t1);
            return _context.abrupt("return");

          case 42:
            _context.prev = 42;
            log('Installing dependencies...', 'info');
            _context.next = 46;
            return installDeps(projectPath);

          case 46:
            _context.next = 53;
            break;

          case 48:
            _context.prev = 48;
            _context.t2 = _context["catch"](42);
            log('Something went wrong installing this repos dependencies.', 'error');
            log(_context.t2);
            return _context.abrupt("return");

          case 53:
            log('Saving configuration...', 'info');
            newProjectConf = {
              projects: {}
            };
            newProjectConf.projects[projectName] = {
              status: 'alive',
              path: projectPath,
              repo: repo,
              lastModifiedTime: new Date().toISOString(),
              illustrations: {}
            };
            _context.next = 58;
            return fs.readdir(path.join(projectPath, 'illustrations'));

          case 58:
            illustrations = _context.sent;
            illustrations.forEach(function (i) {
              newProjectConf.projects[projectName].illustrations[i] = {};
            });
            _context.next = 62;
            return updateConf(newProjectConf);

          case 62:
            log('Activating new project...', 'info');
            process.env.VERBOSE_MODE = false;
            _context.next = 66;
            return activate({
              project: projectName
            });

          case 66:
            process.env.VERBOSE_MODE = true;
            log("New project \"".concat(projectName, "\" created and activated"), 'success');

          case 68:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[12, 19], [31, 37], [42, 48]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();

yargs.command('download [repo]', 'Downloads a project from GitHub', function (yargs) {
  yargs.positional('repo', {
    alias: 'r',
    describe: 'The name of the repo to download',
    type: 'string'
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
            download(args);

          case 1:
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
              log("Artisan was installed (or updated) on your computer.", 'success');
              log("Start a new project by running the \"new project\" command.", 'success');
            } else {
              log("An error occured installing ai2jsx, please check the logs above.", 'error');
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

yargs.command('install [illustrator]', 'Installs ai2jsx on your computer', function (yargs) {
  yargs.positional('illustrator', {
    alias: 'i',
    describe: 'Adobe Illustrator app location',
    type: 'string',
    "default": '/Applications/Adobe Illustrator 2020/Adobe Illustrator.app'
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
            install(args);

          case 1:
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

var illo$1 = /*#__PURE__*/
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

          if (activeProject) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return");

        case 5:
          projectPath = activeProject.path;
          projectName = activeProject.name;
          _context.next = 9;
          return inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: "Do you want to create a new illustration in \"".concat(projectName, "\"?"),
            defualt: true
          }]);

        case 9:
          _ref2 = _context.sent;
          confirm = _ref2.confirm;

          if (confirm) {
            _context.next = 15;
            break;
          }

          log('You can only create new illustrations in the active project.', 'info');
          log('Change the active project using "activate" to create a new illustration in it.', 'info');
          return _context.abrupt("return");

        case 15:
          _context.prev = 15;
          _context.next = 18;
          return fs.ensureDir(projectPath);

        case 18:
          log('Creating your new illustration...', 'info');
          _context.next = 21;
          return interactiveTemplates.newProject('Extra Graphic Illustration', projectPath);

        case 21:
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](15);
          log(_context.t0, 'error');
          return _context.abrupt("return");

        case 27:
          log('Saving configuration...', 'info');
          newProjectConf = {
            projects: {}
          };
          newProjectConf.projects[projectName] = {};
          newProjectConf.projects[projectName].illustrations = {};
          _context.next = 33;
          return fs.readdir(path.join(projectPath, 'illustrations'));

        case 33:
          illustrations = _context.sent;
          illustrations.forEach(function (i) {
            if (!(i in activeProject.illustrations)) {
              newProjectConf.projects[projectName].illustrations[i] = {};
            }
          });
          _context.next = 37;
          return updateConf(newProjectConf);

        case 37:
          log("New illustration in \"".concat(projectName, "\" created. Restart any active development servers to see the change take place."), 'success');

        case 38:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[15, 23]]);
}));

var project$1 = /*#__PURE__*/
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
          log('Saving configuration...', 'info');
          newProjectConf = {
            projects: {}
          };
          newProjectConf.projects[projectName] = {
            status: 'alive',
            path: projectPath,
            repo: "illustration_".concat(projectRepo),
            lastModifiedTime: new Date().toISOString(),
            illustrations: {}
          };
          _context.next = 34;
          return fs.readdir(path.join(projectPath, 'illustrations'));

        case 34:
          illustrations = _context.sent;
          illustrations.forEach(function (i) {
            newProjectConf.projects[projectName].illustrations[i] = {};
          });
          _context.next = 38;
          return updateConf(newProjectConf);

        case 38:
          log('Activating new project...', 'info');
          process.env.VERBOSE_MODE = false;
          _context.next = 42;
          return activate({
            project: projectName
          });

        case 42:
          process.env.VERBOSE_MODE = true;
          log("New project \"".concat(projectName, "\" created and activated"), 'success');

        case 44:
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
            return project$1();

          case 12:
            return _context.abrupt("break", 16);

          case 13:
            _context.next = 15;
            return illo$1();

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
    describe: 'What type of thing to create',
    type: 'string'
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
            newIndex(args);

          case 1:
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
    var illustration, illos, selection;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            illustration = _ref.illustration;
            _context.next = 3;
            return getActiveIllustrations();

          case 3:
            illos = _context.sent;
            selection = illustration;

            if (!(keys(illos).length === 1)) {
              _context.next = 9;
              break;
            }

            selection = keys(illos)[0];
            _context.next = 12;
            break;

          case 9:
            _context.next = 11;
            return selectIllustration(illustration, {
              noneAvailable: 'No illustrations found in active project.',
              question: 'Which illustration would you like to open? (Don\'t see what you\'re looking for? Try changing the active project.)',
              doesNotExist: function doesNotExist(i) {
                return "Illustration \"".concat(illustration, "\" does not exist in the active project.");
              }
            });

          case 11:
            selection = _context.sent;

          case 12:
            if (selection) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return");

          case 14:
            _context.next = 16;
            return exec("open \"illustrations/".concat(selection, "/").concat(selection, ".ai\""));

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

yargs.command('open [illustration]', 'Open an illustration', function (yargs) {
  yargs.positional('illustration', {
    alias: 'i',
    describe: 'The name of the illustration',
    type: 'string'
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
            open(args);

          case 1:
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
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var environment, staging, production, project, inquiry, _ref3, confirm;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            environment = _ref.environment, staging = _ref.staging, production = _ref.production;
            _context.next = 3;
            return getActiveProject();

          case 3:
            project = _context.sent;

            if (project) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            if (environment) {
              _context.next = 19;
              break;
            }

            if (!(production && !staging)) {
              _context.next = 11;
              break;
            }

            environment = 'production';
            _context.next = 19;
            break;

          case 11:
            if (!(staging && !production)) {
              _context.next = 15;
              break;
            }

            environment = 'staging';
            _context.next = 19;
            break;

          case 15:
            _context.next = 17;
            return inquirer.prompt([{
              type: 'list',
              name: 'env',
              message: "Where would you like to publish \"".concat(project.name, "\"?"),
              choices: [{
                name: 'Staging (POLITICO VPN/WiFi Access Only)',
                value: 'staging'
              }, {
                name: 'Production (Public Access)',
                value: 'production'
              }]
            }]);

          case 17:
            inquiry = _context.sent;
            environment = inquiry.env;

          case 19:
            if (!(environment === 'production')) {
              _context.next = 31;
              break;
            }

            _context.next = 22;
            return inquirer.prompt([{
              type: 'confirm',
              name: 'confirm',
              message: "Are you sure you want to publish \"".concat(project.name, "\"? This will make it live on the internet for anyone with the link to see."),
              defualt: true
            }]);

          case 22:
            _ref3 = _context.sent;
            confirm = _ref3.confirm;

            if (confirm) {
              _context.next = 27;
              break;
            }

            log('The project will not be published', 'info');
            return _context.abrupt("return");

          case 27:
            _context.next = 29;
            return exec('npm run pubProduction');

          case 29:
            _context.next = 37;
            break;

          case 31:
            if (!(environment === 'staging')) {
              _context.next = 36;
              break;
            }

            _context.next = 34;
            return exec('npm run pubStaging');

          case 34:
            _context.next = 37;
            break;

          case 36:
            log("\"".concat(environment, "\" is not a valid environment."), 'error');

          case 37:
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

yargs.command('pub [environment]', 'Publish the embed live', function (yargs) {
  yargs.positional('environment', {
    alias: 'e',
    describe: 'Staging or production',
    type: 'string'
  }).option('staging', {
    alias: 's',
    describe: 'Publish to staging',
    type: 'boolean'
  }).option('production', {
    alias: 'p',
    describe: 'Publish to production',
    type: 'boolean'
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
            publish(args);

          case 1:
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

var save = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var message, project;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            message = _ref.message;

            if (!message) {
              message = new Date().toISOString();
            }

            _context.next = 4;
            return getActiveProject();

          case 4:
            project = _context.sent;

            if (project) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            _context.prev = 7;
            _context.next = 10;
            return gacm(project.path, project.repo, message);

          case 10:
            _context.next = 17;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](7);
            log('Something went wrong saving your project to GitHub', 'error');
            log(_context.t0);
            return _context.abrupt("return");

          case 17:
            log('Your project has been saved on GitHub succesffully.', 'success');

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 12]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();

yargs.command('save [message]', 'Saves latest changes to GitHub', function (yargs) {
  yargs.positional('message', {
    alias: 'r',
    describe: 'The name of the repo to download',
    type: 'string'
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
            save(args);

          case 1:
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

yargs.command('start', 'Start a development server', function (yargs) {},
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(args) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            start(args);

          case 1:
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
      archivedProjects,
      project,
      updateSignature,
      _args = arguments;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          opts = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          _context.next = 3;
          return getProjects('archived');

        case 3:
          archivedProjects = _context.sent;
          _context.next = 6;
          return selectProject(opts.project, archivedProjects, {
            noneAvailable: 'No projects available to unarchive.',
            question: 'Which project would you like to make available?',
            doesNotExist: function doesNotExist(p) {
              return "Project \"".concat(project, "\" does not exist or is not archived.");
            }
          });

        case 6:
          project = _context.sent;

          if (project) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return");

        case 9:
          updateSignature = {
            projects: {}
          };
          updateSignature.projects[project] = {};
          updateSignature.projects[project].status = 'alive';
          _context.next = 14;
          return updateConf(updateSignature);

        case 14:
          log("\"".concat(project, "\" is now available. Use \"activate\" to set it as the active project."), 'success');

        case 15:
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
            unarchive(args);

          case 1:
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

yargs.command('which', 'Find out what the active project is', function (yargs) {},
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(args) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            which(args);

          case 1:
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

var name = "@politico/artisan";
var version = "0.0.7";
var description = "A suite of tools for creating & managing Adobe Illustrator based embeds.";
var main = "dist/index.js";
var module$1 = "dist/module.js";
var bin = {
	art: "dist/cli.js"
};
var directories = {
	example: "example"
};
var scripts$1 = {
	test: "echo \"Error: no test specified\" && exit 1",
	start: "nodemon --ignore dist --ignore example --exec npm run build",
	build: "rollup --config config/rollup.es.js",
	postbuild: "node ./bin/post-build.js",
	cli: "node ./dist/cli.js"
};
var author = "";
var license = "ISC";
var devDependencies = {
	"@babel/cli": "^7.1.0",
	"@babel/core": "^7.1.0",
	"@babel/plugin-proposal-class-properties": "^7.3.4",
	"@babel/plugin-transform-runtime": "^7.4.0",
	"@babel/preset-env": "^7.4.2",
	"@babel/preset-react": "^7.0.0",
	"@babel/register": "^7.0.0",
	"babel-core": "7.0.0-bridge.0",
	"babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",
	"babel-preset-es2015": "^6.24.1",
	"expect.js": "^0.3.1",
	mocha: "^5.2.0",
	nodemon: "^1.19.1",
	nyc: "^13.1.0",
	rollup: "^1.7.3",
	"rollup-plugin-alias": "^1.5.2",
	"rollup-plugin-babel": "^4.3.2",
	"rollup-plugin-json": "^4.0.0",
	"rollup-plugin-node-resolve": "^4.0.1",
	"rollup-plugin-preserve-shebang": "^0.1.6",
	yarn: "^1.9.4"
};
var dependencies = {
	"@babel/runtime": "^7.4.2",
	"@octokit/rest": "^17.1.2",
	"@politico/interactive-bin": "^1.0.0-beta.17",
	"@politico/interactive-templates": "^1.2.5",
	chalk: "^2.4.2",
	"cli-progress": "^2.1.1",
	"fs-extra": "^8.1.0",
	"immutability-helper": "^3.0.1",
	inquirer: "^7.1.0",
	lodash: "^4.17.14",
	"npm-api": "^1.0.0",
	semver: "^7.1.3",
	"simple-git": "^1.132.0",
	slugify: "^1.4.0",
	yargs: "^13.3.0"
};
var meta = {
	name: name,
	version: version,
	description: description,
	main: main,
	module: module$1,
	bin: bin,
	directories: directories,
	scripts: scripts$1,
	author: author,
	license: license,
	devDependencies: devDependencies,
	dependencies: dependencies
};

var healthCheck = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(argv) {
    var npm, packagejson, inGoodHealth;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            npm = new NpmApi();
            _context.next = 3;
            return npm.repo('@politico/artisan')["package"]();

          case 3:
            packagejson = _context.sent;
            inGoodHealth = true;

            if (semver.lt(meta.version, packagejson.version)) {
              console.log(chalk.yellow("\nIt looks like your version of Artisan is out of date.\nYou should run \"npm install -g @politico/artisan\" to update to version ".concat(chalk.bold(packagejson.version), ".\n")));
              inGoodHealth = false;
            }

            return _context.abrupt("return", {
              healthy: inGoodHealth
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();

var installationCheck = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(args) {
    var confExists;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(args._[0] === 'install')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.next = 4;
            return fs.pathExists(CONFIG_PATH);

          case 4:
            confExists = _context.sent;

            if (confExists) {
              _context.next = 7;
              break;
            }

            throw new Error('Artisan not installed. Please use "art install" before running any commands.');

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();

var setVerboseMode = (function (active) {
  if (active) {
    process.env.VERBOSE_MODE = true;
  } else {
    process.env.VERBOSE_MODE = false;
  }
});

var verbose = (function (args) {
  var verbose = typeof args.verbose === 'undefined' ? true : args.verbose;
  setVerboseMode(verbose);
  return {};
});

yargs // eslint-disable-line
.usage('Usage:\n  $0 <command> [options]').scriptName('art').middleware(installationCheck).middleware(healthCheck).middleware(verbose).option('verbose', {
  type: 'boolean',
  alias: 'v',
  describe: 'Log info & errors to the console',
  "default": true,
  global: true
}).recommendCommands().demandCommand().help('howto').argv;
