#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var yargs = _interopDefault(require('yargs'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var chalk = _interopDefault(require('chalk'));
var cli = _interopDefault(require('cli-progress'));
var path = _interopDefault(require('path'));
var fsExtra = require('fs-extra');

var Logger = function Logger() {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Logger);

  _defineProperty(this, "progress", {
    start: function (totalValue, startValue) {
      if (this.verbose === false) {
        return;
      }

      this.bar.start(totalValue, startValue);
    }.bind(this),
    update: function () {
      if (this.verbose === false) {
        return;
      }

      this.bar.update(arguments);
    }.bind(this),
    increment: function (amount) {
      if (this.verbose === false) {
        return;
      }

      this.bar.increment(amount);
    }.bind(this),
    stop: function () {
      if (this.verbose === false) {
        return;
      }

      this.bar.stop();
    }.bind(this)
  });

  _defineProperty(this, "log", function (message, type) {
    if (_this.verbose === false) {
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

  this.verbose = config.verbose;
  this.bar = new cli.Bar({
    clearOnComplete: true
  }, cli.Presets.shades_classic);
};

var defaultLogger = new Logger();

// import getPitConfig from '@politico/interactive-templates/dist/utils/getConfig.js';

var INSTALL_DIRECTORY = path.resolve(__dirname, '../install');
function install (_x) {
  return _ref2.apply(this, arguments);
}

function _ref2() {
  _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var destination, verbose, logger, hash, testFile;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            destination = _ref.destination, verbose = _ref.verbose;
            logger = new Logger({
              verbose: verbose
            });
            logger.log("Installing ai2jsx at ".concat(chalk.bold(destination), "."));
            logger.log('[1/3] Checking for write access...');
            _context.prev = 4;

            hash = function hash() {
              return Math.random().toString(36).substring(7);
            };

            testFile = "".concat(hash() + hash() + hash() + hash(), ".txt");
            _context.next = 9;
            return fsExtra.writeFile(path.join(destination, testFile), 'TEST', 'utf8');

          case 9:
            _context.next = 11;
            return fsExtra.remove(path.join(destination, testFile));

          case 11:
            _context.next = 22;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](4);

            if (!(_context.t0.code === 'EACCES')) {
              _context.next = 21;
              break;
            }

            process.exitCode = 1;
            logger.log('You don\'t have access to the destination folder. Try running the command with "sudo" before it.', 'error');
            return _context.abrupt("return");

          case 21:
            throw _context.t0;

          case 22:
            logger.log('[2/3] Checking for templates...'); // const conf = await getPitConfig();

            logger.log('[3/3] Installing scripts...');
            _context.next = 26;
            return fsExtra.copy(path.join(INSTALL_DIRECTORY, 'ai2jsx.js'), path.join(destination, 'ai2jsx.js'));

          case 26:
            logger.log('Installed ai2jsx.js', 'info');
            _context.next = 29;
            return fsExtra.copy(path.join(INSTALL_DIRECTORY, 'ai2jsx-config.json'), path.join(destination, 'ai2jsx-config.json'));

          case 29:
            logger.log('Installed ai2jsx-config.json', 'info');
            logger.log("Ai2jsx was installed (or updated) on your computer.", 'success');
            logger.log("You can run it by going to ".concat(chalk.bold('File > Scripts > ai2jsx'), " inside an Adobe Illustrator file."), 'success');

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 13]]);
  }));
  return _ref2.apply(this, arguments);
}

var healthChecks = (function () {});

yargs // eslint-disable-line
.help().scriptName('ai2jsx') // New
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
            if (!args.verbose) {
              _context.next = 3;
              break;
            }

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
}()).argv;
