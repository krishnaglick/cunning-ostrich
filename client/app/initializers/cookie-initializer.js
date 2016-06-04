
export default {
  after: ['cookie'],
  name: 'cookie-initializer',
  initialize: (app) => {
    app.inject('component', 'cookie', 'cookie:main');
  }
};
