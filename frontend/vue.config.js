const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")

module.exports = {
  configureWebpack: {
    plugins: [
      new GoogleFontsPlugin({
        fonts: [
          { family: "Lato", variants: ["100", "300", "400", "700", "900"] }
        ]
      })
    ]
  }
}