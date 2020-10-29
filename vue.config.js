module.exports = {
  "filenameHashing": false,
  "configureWebpack": {
    "plugins": [
      {
        "options": {
          "maxChunks": 1
        }
      }
    ]
  },
  "css": {
    "extract": false
  },
  "lintOnSave": false,
  "transpileDependencies": [
    "vuetify"
  ]
}