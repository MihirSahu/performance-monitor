import osUtils from 'os-utils';
import fs from 'fs';
import os from 'os';
import { BrowserWindow } from 'electron';

const POLLING_INTERVAL = 500;

export const pollResources = (mainWindow: BrowserWindow) => {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();

    mainWindow.webContents.send("statistics", {cpuUsage, ramUsage, storageUsage: storageData.usage});
  }, POLLING_INTERVAL);
}

export const getStaticData = () => {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

  return {totalStorage, cpuModel, totalMemoryGB};
}

const getCpuUsage = async () => {
  return new Promise(resolve => {
    osUtils.cpuUsage(resolve);
  })
}

const getRamUsage = () => {
  return 1 - osUtils.freememPercentage();
}

const getStorageData = () => {
  const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free/total,
  }
}