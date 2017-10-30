export default {
  dev: () => {
    return {
      template: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>vue-ssr-demo</title>
        <meta charset="utf-8">
        <meta content="yes" name="apple-mobile-web-app-capable">
        <meta content="black" name="apple-mobile-web-app-status-bar-style">
        <meta content="telephone=no" name="format-detection">
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content="0">
        <meta name="layoutmode" content="standard">
        <meta name="wap-font-scale" content="no">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        {{{ assets.styles }}}
      </head>
      <body>
        <div id="app">
          <!--vue-ssr-outlet-->
        </div>
        {{{ assets.scripts }}}
      </body>
    </html>`,
      inject: false,
      runInNewContext: false
    }
  },

  prod: () => {
    return {
      template: `<!DOCTYPE html>
<html lang="en">
<head>
<title>vue-ssr-demo</title>
<meta charset="utf-8">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<meta name="layoutmode" content="standard">
<meta name="wap-font-scale" content="no">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body>
<div id="app">
<!--vue-ssr-outlet-->
</div>
</body>
</html>`,
      runInNewContext: false,
      clientManifest: require('./public/vue-ssr-client-manifest.json')
    }
  }
}
