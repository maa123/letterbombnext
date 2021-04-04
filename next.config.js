module.exports = {
  future: {
    webpack5: true,
  },
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
    }
  }
}