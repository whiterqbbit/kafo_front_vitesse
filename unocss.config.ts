import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded-xl inline-block bg-grass-500 place-content-center text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['font-title', 'text-3xl font-bold text-center text-cafe-700'],
    ['trans-grass-700', 'opacity-90 transition duration-200 ease-in-out hover:opacity-100 hover:text-grass-900'],
    ['tag', 'px-2 rounded-full inline-block bg-cafe-500 text-cafe-100 text-xs font-bold tracking-wider'],
    ['container', 'bg-cafe-50 mx-auto px-9 py-4 md:py-8 max-w-7xl'],
    ['btn-press', 'hover:scale-102 shadow-md'],
    ['btn-light', 'px-4 cursor-pointer py-1 h-fit w-fit place-self-center rounded-xl font-normal text-base text-gray-400 transition hover:(rounded-xl text-cafe-700 bg-opacity-25 bg-stone-200)'],
  ],
  rules: [
    ['text-xs', { 'font-size': '0.75rem' }],
    ['text-sm', { 'font-size': '0.875rem' }],
    ['text-base', { 'font-size': '1rem' }],
    ['text-lg', { 'font-size': '1.125rem' }],
    ['text-xl', { 'font-size': '1.25rem' }],
    ['text-2xl', { 'font-size': '1.5rem' }],
    ['text-3xl', { 'font-size': '1.875rem' }],
    ['text-4xl', { 'font-size': '2.25rem' }],
    ['text-5xl', { 'font-size': '3.25rem' }],
  ],
  theme: {
    height: {
      'screen--35px': 'calc(100vh - 35px)',
      'screen--50px': 'calc(100vh - 50px)',
    },
    colors: {
      cafe: {
        900: '#261b17',
        800: '#3b2a25',
        700: '#503b34',
        600: '#694b42',
        500: '#815a4f',
        400: '#B79282',
        300: '#f5dac8',
        200: '#fdeee2',
        100: '#fff7f2',
        50: '#fff9f9',
      },
      grass: {
        900: '#2e4744',
        700: '#2a725f',
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
    }),
    presetWebFonts({
      fonts: {
        sans: 'Poppins',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
