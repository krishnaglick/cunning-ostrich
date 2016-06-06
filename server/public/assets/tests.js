define('cunning-ostrich/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('cunning-ostrich/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _emberSimpleAuthAuthenticatorsTest) {
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _emberSimpleAuthAuthenticatorsTest['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  ;

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  ;

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }

  ;
});
define('cunning-ostrich/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'cunning-ostrich/tests/helpers/start-app', 'cunning-ostrich/tests/helpers/destroy-app'], function (exports, _qunit, _cunningOstrichTestsHelpersStartApp, _cunningOstrichTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _cunningOstrichTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _cunningOstrichTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('cunning-ostrich/tests/helpers/resolver', ['exports', 'cunning-ostrich/resolver', 'cunning-ostrich/config/environment'], function (exports, _cunningOstrichResolver, _cunningOstrichConfigEnvironment) {

  var resolver = _cunningOstrichResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _cunningOstrichConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _cunningOstrichConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('cunning-ostrich/tests/helpers/start-app', ['exports', 'ember', 'cunning-ostrich/app', 'cunning-ostrich/config/environment'], function (exports, _ember, _cunningOstrichApp, _cunningOstrichConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _cunningOstrichConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs);

    _ember['default'].run(function () {
      application = _cunningOstrichApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('cunning-ostrich/tests/test-helper', ['exports', 'cunning-ostrich/tests/helpers/resolver', 'ember-qunit'], function (exports, _cunningOstrichTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_cunningOstrichTestsHelpersResolver['default']);
});
define('cunning-ostrich/tests/unit/models/link-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('link', 'Unit | Model | link', {
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();

    assert.ok(!!model);
  });
});
define('cunning-ostrich/tests/unit/services/account-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:account', 'Unit | Service | account', {});

  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
/* jshint ignore:start */

require('cunning-ostrich/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map