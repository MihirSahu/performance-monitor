import { BrowserWindow, Menu, app } from "electron"
import { ipcWebContentsSend, isDev } from "./util.js";

export const createMenu = (mainWindow: BrowserWindow) => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: process.platform === 'darwin' ? undefined : "App",
      type: "submenu",
      submenu: [
        {
          label: "Quit",
          click: app.quit,
        },
        {
          label: "DevTools",
          click: () => mainWindow.webContents.openDevTools(),
          visible: isDev(),
        },
      ]
    },
    {
      label: "View",
      type: "submenu",
      submenu: [
        {
          label: "Compute",
          click: () => ipcWebContentsSend('changeView', mainWindow.webContents, 'Compute'),
        },
        {
          label: "Memory",
          click: () => ipcWebContentsSend('changeView', mainWindow.webContents, 'Memory'),
        },
        {
          label: "Storage",
          click: () => ipcWebContentsSend('changeView', mainWindow.webContents, 'Storage'),
        }
      ]
    }
  ]));
}