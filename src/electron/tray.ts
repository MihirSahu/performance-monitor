import { BrowserWindow, Tray, Menu, app } from "electron";
import { getAssetPath } from "./pathResolver.js";
import path from 'path';

export const createTray = (mainWindow: BrowserWindow) => {
  const tray = new Tray(path.join(getAssetPath(), 'trayIconTemplate.png'));
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: "Show",
      click: () => {
        mainWindow.show();
        if (app.dock) {
          app.dock.show();
        }
      },
    },
    {
      label: "Quit",
      click: () => app.quit(),
    }
  ]))
}