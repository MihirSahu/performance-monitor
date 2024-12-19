const electron = require("electron")

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => {
    ipcOn("statistics", (stats) => {
      callback(stats);
    })
  },
  getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window['electron'])

const ipcInvoke = <Key extends keyof EventPayloadMapping>(
  key: Key,
): Promise<EventPayloadMapping[Key]> => {
  return electron.ipcRenderer.invoke(key);
}

const ipcOn = <Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) => {
  electron.ipcRenderer.on(key, (_, payload) => callback(payload));
}