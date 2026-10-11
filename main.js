// Copyright (C) 2026 Samy
// Licence : GNU GPL-3.0 (voir le fichier LICENSE)

const { app, BrowserWindow, session } = require("electron");
const { ElectronBlocker } = require("@ghostery/adblocker-electron");
const path = require("path");

async function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "build", "icon.png"),
  });

  // Bloque les pubs et les traqueurs
  try {
    const blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch);
    blocker.enableBlockingInSession(session.defaultSession);
  } catch (e) {
    console.error("Bloqueur de pubs indisponible :", e);
  }

  // Bloque les fenêtres popup
  win.webContents.setWindowOpenHandler(() => ({ action: "deny" }));

  win.loadURL("https://zestflix-bay.vercel.app");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});