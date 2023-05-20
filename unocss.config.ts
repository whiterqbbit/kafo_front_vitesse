import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetThemeDefault } from '@anu-vue/preset-theme-default'

// @ts-expect-error failed to resolve types
import { presetAnu, presetIconExtraProperties } from 'anu-vue'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 w-fit rounded-xl inline-block place-content-center cursor-pointer transition duration-100 hover:btn-scale disabled:(cursor-default bg-gray-600 opacity-50)'],
    ['btn-scale', 'scale-103 -translate-y-0.3 duration-60'],
    ['btn-grass', 'btn bg-grass-500 text-cafe-50 hover:bg-grass-600'],
    ['btn-cafe', 'btn bg-cafe-600 text-cafe-50 hover:bg-cafe-700'],
    ['btn-cafe-light', 'btn text-cafe-600 bg-cafe-50 hover:shadow-sm border border-cafe-400 hover:border-cafe-500'],
    ['btn-grass-full', 'btn-grass w-full'],
    ['btn-light', 'px-4 cursor-pointer py-1 h-fit w-fit place-self-center rounded-xl font-normal text-base text-gray-400 transition hover:(rounded-xl text-cafe-700 bg-white)'],
    ['font-title', 'text-3xl font-bold text-center text-cafe-700'],
    ['container', 'bg-cafe-50 mx-auto px-9 py-4 md:py-8 max-w-7xl'],
    ['input-field', 'border border-cafe-400 rounded-lg p-2 placeholder-gray-400 focus:ring-1 focus:ring-cafe-400 focus:outline-none'],
    ['pastille', 'inline-block rounded-full px-2 py-0.5 text-sm'],
  ],
  theme: {
    height: {
      'screen--35px': 'calc(100vh - 35px)',
      'screen--45px': 'calc(100vh - 45px)',
      'screen--50px': 'calc(100vh - 50px)',
    },
    maxHeight: {
      'screen--50px': 'calc(100vh - 50px)',
    },
    colors: {
      cafe: {
        900: '#261b17',
        800: '#3b2a25',
        700: '#503b34',
        600: '#694b42',
        500: '#815a4f',
        400: '#b79282',
        300: '#f5dac8',
        200: '#fdeee2',
        100: '#fff7f2',
        50: '#fff9f9',
        25: '#faf7f7',
      },
      grass: {
        900: '#2e4744',
        700: '#2a725f',
        600: '#3b9f7f',
        500: '#4ccb9f',
        300: '#93e3b4',
        100: '#d2ffe4',
      },
      blood: {
        700: '#b32d5a',
        500: '#e23d71',
        300: '#ed6c8e',
      },
      eggplant: {
        700: '#7f34d2',
        500: '#a445ee',
        300: '#ba70f4',
      },
      roast: {
        600: '#ad4a33',
        500: '#cc5f3e',
        400: '#e37859',
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.4,
      warn: true,
      extraProperties: presetIconExtraProperties,
    }),
    presetWebFonts({
      fonts: {
        sans: 'Poppins',
      },
    }),
    presetAnu(),
    presetThemeDefault(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
  include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md'],
})
