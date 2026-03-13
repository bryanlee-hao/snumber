import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const entry = resolve(__dirname, 'src/index.ts')

export default defineConfig(({ mode }) => {
  const isMin = mode === 'minify'

  return {
    plugins: isMin ? [] : [dts({ rollupTypes: true })],
    build: {
      lib: {
        entry,
        name: 'snumber',
        fileName: isMin ? 'snumber.min' : 'snumber',
        formats: isMin ? ['umd'] : ['es', 'cjs', 'umd'],
      },
      minify: isMin,
      emptyOutDir: !isMin,
    },
  }
})
