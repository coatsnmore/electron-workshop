// menus
const menus = require( "./menus" );

//basic stuff
const electron = require( "electron" );

// basic + inter process communication
const { app, BrowserWindow, ipcMain, dialog } = electron;

// live reload
const path = require( "path" );
const reload = require( "electron-reload" );
const isDev = require( "electron-is-dev" );
let mainWindow = null;


// live reload
if ( isDev ) {
    const electronPath = path.join( __dirname, "node_modules", ".bin", "electron" );
    reload( __dirname, { electron: electronPath } );
}

// if evertthing is closed, shut down the process
app.on( "window-all-closed", () => {
    if ( process.platform !== "darwin" ) {
        app.quit();
    }
} );

app.on( "ready", () => {
    mainWindow = new BrowserWindow( { width: 800, height:600, show: false } );
    // mainWindow.loadURL( `file://${ __dirname }/index.html` );
    mainWindow.loadURL( `file://${ __dirname }/dadjokes.html` );

    // dev tools
    // if ( isDev ) {
    //     mainWindow.webContents.openDevTools();
    // }

    // menus
    menus.buildMenu();

    // ready to show is like dom ready 
    mainWindow.once( "ready-to-show", () => {
        mainWindow.show();
    } );

    mainWindow.on( "closed", () => {
        mainWindow = null;
    } );
} );

// inter process communication
ipcMain.on( "show-dialog", ( e, arg ) => {
    const msgInfo = {
        title: "My App Alert",
        message: arg.message,
        buttons: [ "OK" ]
    };
    dialog.showMessageBox( msgInfo );
} );
