
export default {
  after: ['service:injector'],
  name: 'component:injector',
  initialize(app) {
    app.inject('component', 'store', 'service:store');
    app.inject('component', 'session', 'service:session');
    app.inject('component', 'router', 'router:main');
  }
};
