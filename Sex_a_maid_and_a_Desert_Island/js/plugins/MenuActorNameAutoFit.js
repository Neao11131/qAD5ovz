/*:
 * @target MZ
 * @plugindesc Fits actor names and classes in status windows in 1px steps.
 * @author Translation Patch
 * @orderAfter PANDA_RubyText
 * @orderAfter LL_MenuScreenCustom
 *
 * @help
 * Place this plugin below other menu and actor-name/class drawing plugins.
 * Affects drawActorName and drawActorClass inherited from Window_StatusBase,
 * including menu, actor selection, status, equip, skill and custom windows.
 * Uses the supplied width (168px by default), bounded by the window contents,
 * with space reserved for the outline. Long text shrinks in 1px steps, down
 * to 1px; short text keeps its size. Pathological overflow is clipped locally.
 * Database names, portraits, colors, opacity and numbers are unchanged.
 * Supports the existing PANDA_RubyText character-by-character renderer.
 * No parameters or plugin commands.
 */

(() => {
    "use strict";

    for (const method of ["drawActorName", "drawActorClass"]) {
        const drawActorText = Window_StatusBase.prototype[method];
        Window_StatusBase.prototype[method] = function(actor, x, y, width) {
            width = width || 168;
            if (!actor || !Number.isFinite(width)) {
                return drawActorText.call(this, actor, x, y, width);
            }

            const fontSize = this.contents.fontSize;
            width = Math.max(0, Math.min(width, this.innerWidth - x, this.contents.width - x));
            const availableWidth = Math.max(0, width - this.contents.outlineWidth);
            const parts = [];
            let text = method === "drawActorName" ? actor.name() : actor.currentClass().name;
            if (this.isRuby && this.isRuby()) {
                // Match PANDA's advances: separate characters, but whole ruby bases.
                while (text !== "") {
                    const character = text.charAt(0);
                    text = text.substring(1);
                    if (character === "{") {
                        text = text.replace(/(.+?)\|(.+?)\}/, (_, base) => {
                            parts.push(base);
                            return "";
                        });
                    } else {
                        parts.push(character);
                    }
                }
            } else {
                parts.push(this.deleteRuby ? this.deleteRuby(text) : text);
            }

            const context = this.contents.context;
            context.save();
            try {
                // Guard even pathological text that cannot fit at the minimum size.
                context.beginPath();
                context.rect(x, 0, width, this.contents.height);
                context.clip();
                while (this.contents.fontSize > 1 &&
                    parts.reduce((total, part) => total + this.textWidth(part), 0) > availableWidth) {
                    this.contents.fontSize = Math.max(1, this.contents.fontSize - 1);
                }
                return drawActorText.call(this, actor, x, y, width);
            } finally {
                this.contents.fontSize = fontSize;
                context.restore();
            }
        };
    }
})();
