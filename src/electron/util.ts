import { ipcMain, WebContents, WebFrameMain } from "electron";
import { pathToFileURL } from "url";
import { getUIPath } from "./pathResolver.js";

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export const ipcMainHandle = <Key extends keyof EventPayloadMapping>(
  key: Key, 
  handler: () => EventPayloadMapping[Key]
) => {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame as WebFrameMain);
    return handler();
  });
}

export const ipcWebContentsSend = <Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) => {
  webContents.send(key, payload);
};

export const validateEventFrame = (frame: WebFrameMain) => {
  if (isDev() && new URL(frame.url).host === 'localhost:8080') {
    return;
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error('Malicious event');
  }
}