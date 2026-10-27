// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        // The project keeps the first attribute on the tag line
        'vue/first-attribute-linebreak': 'off'
    }
})
