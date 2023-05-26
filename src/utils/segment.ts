declare global {
  interface Window {
    analytics: any
  }
}

const analytics = window.analytics || []
if (!analytics.initialize) {
  if (analytics.invoked) {
    if (window.console && console.error) {
      console.error('Segment snippet included twice.')
    }
  } else {
    analytics.invoked = true
    analytics.methods = [
      'trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify', 'reset',
      'group', 'track', 'ready', 'alias', 'debug', 'page', 'once', 'off', 'on', 'addSourceMiddleware',
      'addIntegrationMiddleware', 'setAnonymousId', 'addDestinationMiddleware',
    ]
    analytics.factory = function (method: string) {
      return function (...args: any[]) {
        args.unshift(method)
        analytics.push(args)
        return analytics
      }
    }
    for (let i = 0; i < analytics.methods.length; i++) {
      const key = analytics.methods[i]
      analytics[key] = analytics.factory(key)
    }
    analytics.load = function (key: string, options?: any) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://cdn.segment.com/analytics.js/v1/${key}/analytics.min.js`
      const firstScript = document.getElementsByTagName('script')[0]
      firstScript.parentNode!.insertBefore(script, firstScript)
      analytics._loadOptions = options
    }
    analytics._writeKey = 'YOUR_WRITE_KEY'
    analytics.SNIPPET_VERSION = '4.15.2'
  }
}

window.analytics = analytics
analytics.load(import.meta.env.VITE_SEGMENT_WRITE_KEY)
analytics.page()

export default analytics
