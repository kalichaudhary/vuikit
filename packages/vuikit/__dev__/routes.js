// https://webpack.js.org/guides/dependency-management/#require-context
const requireModule = require.context(
  // Search for files in
  '../src',
  // Search for files in subdirectories
  true,
  // Include any .js files that are not unit tests
  /__dev__\/[a-z\\-]*\.vue$/
)

export default [
  {
    path: '/',
    component: require('.').default
  },

  ...requireModule.keys().map(fileName => {
    // Get the module path as an array
    const path = fileName
      // Remove the "." from the beginning
      .replace(/^\.\//, '/')
      // Remove the file extension from the end
      .replace(/__dev__\/index\.vue$/, '')

    return {
      path,
      component: requireModule(fileName).default
    }
  }).filter(m => m),

  {
    path: '*',
    redirect: '/'
  }
]
