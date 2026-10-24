/*:
 * @target MZ
 * @plugindesc Adds the translation credit to the OS window title.
 * @author Translation Patch
 *
 * @help
 * Appends the credit when the engine sets the window title at boot.
 * Does not change the database game title, title screen or save metadata.
 * No parameters or plugin commands.
 */

(() => {
    "use strict";

    const updateDocumentTitle = Scene_Boot.prototype.updateDocumentTitle;
    Scene_Boot.prototype.updateDocumentTitle = function() {
        updateDocumentTitle.call(this);
        const suffix = " | AI TL by lynxwall____";
        if (!document.title.endsWith(suffix)) {
            document.title += suffix;
        }
    };
})();
