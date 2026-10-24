/*:
 * @target MZ
 * @plugindesc Fits stock and status labels in 1px steps without resizing values.
 * @author Translation Patch
 * @orderAfter PANDA_RubyText
 * @orderAfter NAPI_LimitedOneShop
 * @orderAfter ItemNameAutoFit
 *
 * @help
 * Place below shop and status drawing plugins.
 * Fits Sold Out in the price column, the level/Affection label, and equipment
 * and status parameter labels. Numeric values, icons and dialogs are unchanged.
 * The level label also uses the empty gap before its numeric value.
 * Font size decreases in 1px steps only when necessary, down to 1px.
 * Uses PANDA_RubyText character advances when enabled. Very narrow cells are
 * clipped as a last resort. No parameters or plugin commands.
 */

(() => {
    "use strict";

    const targets = [
        [Window_ShopBuy, "drawItem", () => "Sold Out"],
        [Window_StatusBase, "drawActorLevel", () => TextManager.levelA],
        [Window_EquipStatus, "drawParamName", (x, y, id) => TextManager.param(id)],
        [Window_StatusParams, "drawItem", index => TextManager.param(index + 2)]
    ];

    for (const [windowClass, method, getLabel] of targets) {
        const draw = windowClass.prototype[method];
        windowClass.prototype[method] = function(...args) {
            const label = getLabel(...args);
            const drawText = this.drawText;
            const ownDrawText = Object.getOwnPropertyDescriptor(this, "drawText");
            // Intercept only this method's label, not its numbers or later draws.
            this.drawText = function(text, x, y, width, align, ...rest) {
                if (typeof text !== "string" || text !== label || !Number.isFinite(width)) {
                    return drawText.call(this, text, x, y, width, align, ...rest);
                }
                if (method === "drawActorLevel" && x === args[1] && width === 48) {
                    // The engine starts the value at x + 84; leave a 4px gap.
                    width = 80;
                }
                width = Math.max(0, Math.min(width, this.innerWidth - x, this.contents.width - x));
                const available = Math.max(0, width - this.contents.outlineWidth);
                const ruby = this.isRuby && this.isRuby();
                const parts = [];
                let remaining = text;
                if (ruby) {
                    while (remaining !== "") {
                        const character = remaining.charAt(0);
                        remaining = remaining.substring(1);
                        if (character === "{") {
                            remaining = remaining.replace(/(.+?)\|(.+?)\}/, (_, base) => {
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

                const size = this.contents.fontSize;
                const context = this.contents.context;
                context.save();
                try {
                    context.beginPath();
                    context.rect(x, 0, width, this.contents.height);
                    context.clip();
                    while (this.contents.fontSize > 1 &&
                        parts.reduce((total, part) => total + this.textWidth(part), 0) > available) {
                        this.contents.fontSize = Math.max(1, this.contents.fontSize - 1);
                    }
                    // PANDA aligns by whole-text width, but advances per character.
                    // Compensate kerning so centered/right labels stay inside the cell.
                    let drawWidth = width;
                    if (ruby && (align === "right" || align === "center")) {
                        drawWidth -= parts.reduce((total, part) => total + this.textWidth(part), 0) -
                            this.textWidth(this.deleteRuby(text));
                    }
                    return drawText.call(this, text, x, y, drawWidth, align, ...rest);
                } finally {
                    this.contents.fontSize = size;
                    context.restore();
                }
            };
            try {
                return draw.apply(this, args);
            } finally {
                if (ownDrawText) {
                    Object.defineProperty(this, "drawText", ownDrawText);
                } else {
                    delete this.drawText;
                }
            }
        };
    }
})();
