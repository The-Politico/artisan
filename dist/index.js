'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

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
var open = _interopDefault(require('open'));
var interactiveTemplates = require('@politico/interactive-templates');
var slugify = _interopDefault(require('slugify'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
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

          if (activeProject) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", illustrations);

        case 5:
          if (!activeProject) {
            log('There is no active project. Please activate a project using the "activate" command.', 'error');
          } else {
            illustrations = activeProject.illustrations;
          }

          return _context.abrupt("return", illustrations);

        case 7:
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
                project = conf.projects[name];
                project.name = name;
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

var index = /*#__PURE__*/
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

var index$1 = /*#__PURE__*/
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

var index$2 = /*#__PURE__*/
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

var index$3 = /*#__PURE__*/
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
            _context.next = 5;
            break;
          }

          return _context.abrupt("return");

        case 5:
          _context.next = 7;
          return inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: "Are you sure you want to deactivate the current project: \"".concat(project.name, "\""),
            "default": false
          }]);

        case 7:
          _ref2 = _context.sent;
          confirm = _ref2.confirm;

          if (!confirm) {
            _context.next = 15;
            break;
          }

          _context.next = 12;
          return updateConf({
            active: null
          });

        case 12:
          log("No project is active.", 'success');
          _context.next = 16;
          break;

        case 15:
          log("\"".concat(project.name, "\" is still the active project."), 'success');

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

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
              defualt: false
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
              defualt: false
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

var index$4 = /*#__PURE__*/
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

var index$5 = /*#__PURE__*/
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
                git(dir).init().add('./*').commit(message).push('origin', 'master', {
                  '--force': true
                }).exec(function () {
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
          }).map(function (i) {
            if (allDownloadedProjects.indexOf(i.name) === -1) {
              return {
                name: toStartCase(i.name.split('illustration_')[1]),
                value: i.full_name
              };
            } else {
              return {
                name: toStartCase(i.name.split('illustration_')[1]) + ' (Already downloaded)',
                value: i.full_name
              };
            }
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

var syncWithMaster = /*#__PURE__*/
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
                git(dir).fetch({
                  '--all': true
                }).reset('hard').pull('origin', 'master').exec(function () {
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

var installDeps = (function (dir) {
  return exec('npm install', dir);
});

var index$6 = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var repoName, allRepos, inquiry, repo, owner, projectName, parsedRepo, projectDownloaded, _projectName, _projectPath, _ref3, confirmDownload, projectPath, newProjectConf, illustrations;

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
              _context.next = 41;
              break;
            }

            _projectName = projectDownloaded.name, _projectPath = projectDownloaded.path;
            _context.next = 31;
            return inquirer.prompt([{
              type: 'confirm',
              name: 'confirmDownload',
              message: "You already have this project downloaded as \"".concat(_projectName, "\". Would you like to sync it with the latest version saved to GitHub (this may result in losing unsaved progress)?"),
              "default": false
            }]);

          case 31:
            _ref3 = _context.sent;
            confirmDownload = _ref3.confirmDownload;

            if (!confirmDownload) {
              _context.next = 40;
              break;
            }

            _context.next = 36;
            return syncWithMaster(_projectPath);

          case 36:
            log('Project synced with latest changes on GitHub.', 'success');
            return _context.abrupt("return");

          case 40:
            return _context.abrupt("return");

          case 41:
            projectPath = path.join(PROJECTS_PATH, projectName);
            _context.prev = 42;
            log('Downloading repo...', 'info');
            _context.next = 46;
            return cloneRepo("git@github.com:".concat(owner, "/").concat(repo, ".git"), projectName);

          case 46:
            _context.next = 53;
            break;

          case 48:
            _context.prev = 48;
            _context.t1 = _context["catch"](42);
            log('Something went wrong trying to clone this repo.', 'error');
            log(_context.t1);
            return _context.abrupt("return");

          case 53:
            _context.prev = 53;
            log('Installing dependencies...', 'info');
            _context.next = 57;
            return installDeps(projectPath);

          case 57:
            _context.next = 64;
            break;

          case 59:
            _context.prev = 59;
            _context.t2 = _context["catch"](53);
            log('Something went wrong installing this repos dependencies.', 'error');
            log(_context.t2);
            return _context.abrupt("return");

          case 64:
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
            _context.next = 69;
            return fs.readdir(path.join(projectPath, 'illustrations'));

          case 69:
            illustrations = _context.sent;
            illustrations.forEach(function (i) {
              newProjectConf.projects[projectName].illustrations[i] = {};
            });
            _context.next = 73;
            return updateConf(newProjectConf);

          case 73:
            log('Activating new project...', 'info');
            process.env.VERBOSE_MODE = false;
            _context.next = 77;
            return activate({
              project: projectName
            });

          case 77:
            process.env.VERBOSE_MODE = true;
            log("New project \"".concat(projectName, "\" created and activated"), 'success');

          case 79:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[12, 19], [42, 48], [53, 59]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();

var index$7 = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var project,
      url;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
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
          url = "https://github.com/The-Politico/".concat(project.repo, "/");
          _context.next = 9;
          return open(url);

        case 9:
          log("GitHub page \"".concat(url, "\" opened."), 'success');

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

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
            _context.prev = 19;
            log('');
            return _context.finish(19);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11, 19, 22]]);
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
            log('');
            log("[".concat(step[0], "/").concat(step[1], "] Checking for config..."));
            log('');
            _context.next = 5;
            return fs.ensureFile(CONFIG_PATH);

          case 5:
            initialConf = {
              active: null,
              projects: {},
              illustratorLoc: illustrator
            };
            _context.next = 8;
            return fs.readFile(CONFIG_PATH, 'utf8');

          case 8:
            confRaw = _context.sent;

            if (!(confRaw.length === 0)) {
              _context.next = 14;
              break;
            }

            _context.next = 12;
            return fs.outputJson(CONFIG_PATH, initialConf);

          case 12:
            _context.next = 15;
            break;

          case 14:
            updateConf(initialConf);

          case 15:
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
  _regeneratorRuntime.mark(function _callee(destination, version, step) {
    var versions, versionExists;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fs.readdir(INSTALL_DIRECTORY);

          case 2:
            versions = _context.sent;
            versionExists = versions.indexOf(version) > -1;

            if (versionExists) {
              _context.next = 9;
              break;
            }

            log("Version \"".concat(version, "\" does not exist. Please choose one from the list:"), 'error');
            versions.forEach(function (v) {
              log("- ".concat(v));
            });
            log('');
            throw new Error('Version not found.');

          case 9:
            log("[".concat(step[0], "/").concat(step[1], "] Installing scripts (v").concat(version, ")..."));
            _context.next = 12;
            return fs.copy(path.join(INSTALL_DIRECTORY, version, 'ai2jsx.js'), path.join(destination, 'ai2jsx.js'));

          case 12:
            log('Installed ai2jsx.js', 'info');
            _context.next = 15;
            return fs.copy(path.join(INSTALL_DIRECTORY, version, 'ai2jsx-config.json'), path.join(destination, 'ai2jsx-config.json'));

          case 15:
            log('Installed ai2jsx-config.json', 'info');
            log('');

          case 17:
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
            log('');

          case 16:
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
var DEFAULT_INSTALLATION = '/Applications/Adobe Illustrator 2020/Adobe Illustrator.app';
function install () {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var _ref2,
        illustrator,
        destination,
        _ref2$installVersion,
        installVersion,
        success,
        confExists,
        conf,
        hasAccess,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, illustrator = _ref2.illustrator, destination = _ref2.destination, _ref2$installVersion = _ref2.installVersion, installVersion = _ref2$installVersion === void 0 ? '2.0.0' : _ref2$installVersion;
            success = true;

            if (destination) {
              _context.next = 21;
              break;
            }

            _context.next = 5;
            return fs.pathExists(CONFIG_PATH);

          case 5:
            confExists = _context.sent;

            if (!illustrator) {
              _context.next = 11;
              break;
            }

            destination = path.join(path.dirname(illustrator), 'Presets.localized/en_US/Scripts/');
            log('Using explicit destination.', 'info');
            _context.next = 21;
            break;

          case 11:
            if (!confExists) {
              _context.next = 18;
              break;
            }

            _context.next = 14;
            return readConf();

          case 14:
            conf = _context.sent;

            if (conf.illustratorLoc) {
              illustrator = conf.illustratorLoc;
              destination = path.join(path.dirname(conf.illustratorLoc), 'Presets.localized/en_US/Scripts/');
              log('Previous installation found.', 'info');
            } else {
              illustrator = DEFAULT_INSTALLATION;
              destination = path.join(path.dirname(DEFAULT_INSTALLATION), 'Presets.localized/en_US/Scripts/');
              log('No installation location provided. Using default location.', 'info');
            }

            _context.next = 21;
            break;

          case 18:
            illustrator = DEFAULT_INSTALLATION;
            destination = path.join(path.dirname(DEFAULT_INSTALLATION), 'Presets.localized/en_US/Scripts/');
            log('No installation location provided. Using default location.', 'info');

          case 21:
            log("Installing ai2jsx at ".concat(chalk.bold(destination), "."));
            _context.next = 24;
            return config(illustrator, destination, [1, STEPS_COUNT]);

          case 24:
            _context.next = 26;
            return templates(destination, [2, STEPS_COUNT]);

          case 26:
            _context.next = 28;
            return access(destination, [3, STEPS_COUNT]);

          case 28:
            hasAccess = _context.sent;

            if (!hasAccess) {
              _context.next = 40;
              break;
            }

            _context.prev = 30;
            _context.next = 33;
            return scripts(destination, installVersion, [4, STEPS_COUNT]);

          case 33:
            _context.next = 38;
            break;

          case 35:
            _context.prev = 35;
            _context.t0 = _context["catch"](30);
            success = false;

          case 38:
            _context.next = 41;
            break;

          case 40:
            success = false;

          case 41:
            if (success) {
              log("Artisan was installed (or updated) on your computer.", 'success');
              log("Start a new project by running the \"new project\" command.", 'success');
            } else {
              log("An error occured installing ai2jsx, please check the logs above.", 'error');
            }

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[30, 35]]);
  }));
  return _ref.apply(this, arguments);
}

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

var index$8 = /*#__PURE__*/
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

var index$9 = /*#__PURE__*/
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

            if (illos) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            selection = illustration;

            if (!(keys(illos).length === 1)) {
              _context.next = 11;
              break;
            }

            selection = keys(illos)[0];
            _context.next = 14;
            break;

          case 11:
            _context.next = 13;
            return selectIllustration(illustration, {
              noneAvailable: 'No illustrations found in active project.',
              question: 'Which illustration would you like to open? (Don\'t see what you\'re looking for? Try changing the active project.)',
              doesNotExist: function doesNotExist(i) {
                return "Illustration \"".concat(illustration, "\" does not exist in the active project.");
              }
            });

          case 13:
            selection = _context.sent;

          case 14:
            if (selection) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return");

          case 16:
            _context.next = 18;
            return exec("open \"illustrations/".concat(selection, "/").concat(selection, ".ai\""));

          case 18:
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

var index$a = /*#__PURE__*/
(function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var environment, staging, production, shouldSave, project, inquiry, _ref3, confirm, saveMsg;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            environment = _ref.environment, staging = _ref.staging, production = _ref.production, shouldSave = _ref.save;
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
              defualt: false
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
            if (shouldSave) {
              saveMsg = "Published - ".concat(environment.toUpperCase(), " - ").concat(new Date().toISOString());
              save({
                message: saveMsg
              });
            }

          case 38:
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

var index$b = /*#__PURE__*/
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

var index$c = /*#__PURE__*/
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

var name = "@politico/artisan";
var version = "2.0.0";
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
var license = "MIT";
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
	"@politico/interactive-bin": "0.2.3",
	"@politico/interactive-templates": "1.2.5",
	chalk: "^2.4.2",
	"cli-progress": "^2.1.1",
	"fs-extra": "^8.1.0",
	"immutability-helper": "^3.0.1",
	inquirer: "^7.1.0",
	lodash: "^4.17.14",
	"npm-api": "^1.0.0",
	open: "^7.0.3",
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

var isLatestVersion = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(argv) {
    var npm, packagejson;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            npm = new NpmApi();
            _context.next = 3;
            return npm.repo('@politico/artisan')["package"]();

          case 3:
            packagejson = _context.sent;
            return _context.abrupt("return", [!semver.lt(meta.version, packagejson.version), packagejson.version]);

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
})();

var index$d = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var _ref2,
      _ref3,
      isLatest,
      latestBuild;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          log('Checking for latest version...', 'info');
          _context.next = 4;
          return isLatestVersion();

        case 4:
          _ref2 = _context.sent;
          _ref3 = _slicedToArray(_ref2, 2);
          isLatest = _ref3[0];
          latestBuild = _ref3[1];

          if (!isLatest) {
            _context.next = 11;
            break;
          }

          log('Artisan is already up to date.', 'success');
          return _context.abrupt("return");

        case 11:
          log("A new version of Artisan is available (v".concat(latestBuild, "). Installing..."), 'info');
          _context.next = 14;
          return exec("npm install -g @politico/artisan@".concat(latestBuild), 'root');

        case 14:
          log("Updating ai2jsx scripts...", 'info');
          _context.next = 17;
          return install();

        case 17:
          log("Artisan has been updated to version ".concat(latestBuild, "."), 'success');

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

var index$e = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var isProject, project;
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return isActiveProject();

        case 2:
          isProject = _context.sent;

          if (isProject) {
            _context.next = 6;
            break;
          }

          log("There is no active project.", 'info');
          return _context.abrupt("return");

        case 6:
          _context.next = 8;
          return getActiveProject();

        case 8:
          project = _context.sent;
          log("\"".concat(project.name, "\" is the active project."), 'info');

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

exports.activate = activate;
exports.archive = index;
exports.code = index$1;
exports.conf = index$2;
exports.deactivate = index$3;
exports.deleteIllo = illo;
exports.deleteIndex = index$4;
exports.deleteProject = project;
exports.dir = index$5;
exports.download = index$6;
exports.github = index$7;
exports.install = install;
exports.newIllo = illo$1;
exports.newIndex = index$8;
exports.newProject = project$1;
exports.open = index$9;
exports.pub = index$a;
exports.save = save;
exports.start = index$b;
exports.unarchive = index$c;
exports.update = index$d;
exports.which = index$e;
