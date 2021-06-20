module.exports = {
  devServer: {
    proxy: "http://localhost:9000",
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "Chuck Norris Search",
    },
  },
};
