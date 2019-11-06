const {app, Tray, nativeImage} = require('electron')
const path = require('path')
const {l} = require('./util')

const iconPath =
  process.platform === 'darwin'
    ? path.join(__dirname, '../assets/img/trayTemplate.png')
    : path.join(__dirname, '../assets/img/trayTemplateWhite.png')

const icon = nativeImage.createFromPath(iconPath)

const tray = (app._top.tray = new Tray(icon))

tray.setToolTip(app.getName())

tray.on('click', (event, trayBounds) => {
  const {main} = app._top
  if (!main || main.isDestroyed()) return

  const windowBounds = main.getBounds()
  const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2)

  let y
  if (process.platform === 'darwin') {
    y = trayBounds.y + trayBounds.height
  } else {
    y = trayBounds.y - windowBounds.height - 5
  }

  main.setPosition(x, y, false)

  if (main.isVisible()) {
    main.hide()
  } else {
    main.show()
  }
})
