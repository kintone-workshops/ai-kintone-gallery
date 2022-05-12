import path from 'path'

export default {
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: path.resolve(__dirname, './dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.ts')
      },
      output: {
        entryFileNames: `KintoneCustomization.js`,
        assetFileNames: `[name].[ext]`,
        dir: './dist',
      },
    }
  }
}