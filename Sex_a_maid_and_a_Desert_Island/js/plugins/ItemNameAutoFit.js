/*:
 * @target MZ
 * @plugindesc Fits item and skill names in lists, shops and equipment in 1px steps.
 * @author Translation Patch
 * @orderAfter PANDA_RubyText
 * @orderAfter DarkPlasma_HighlightNewItem
 *
 * @help
 * Place this plugin below other item-name drawing plugins.
 * Affects item/skill lists (including battle), shops and equipment windows.
 * Names use the current window/column width, excluding icons, prices,
 * quantities, skill costs and equipment slot labels reserved by the window.
 * Long names shrink in 1px steps, down to 1px; short names keep their size.
 * Icons, prices, quantities, item colors and database names are unchanged.
 * Cells too narrow even at 1px are clipped as a last resort.
 * Supports the existing PANDA_RubyText character-by-character renderer.
 * No parameters or plugin commands.
 */

(() => {
    "use strict";

    const windows = [Window_ItemList, Window_SkillList, Window_ShopBuy, Window_ShopNumber,
        Window_ShopStatus, Window_EquipSlot, Window_StatusEquip];

    for (const windowClass of windows) {
        const drawItemName = windowClass.prototype.drawItemName;
        windowClass.prototype.drawItemName = function(item, x, y, width) {
            if (!item || !Number.isFinite(width)) {
                return drawItemName.call(this, item, x, y, width);
            }

            const fontSize = this.contents.fontSize;
            // Callers already reserve prices/quantities. Do not subtract them twice.
            width = Math.max(0, Math.min(width, this.innerWidth - x, this.contents.width - x));
            const availableWidth = Math.max(0,
                width - ImageManager.iconWidth - 4 - this.contents.outlineWidth);
            const parts = [];
            let text = item.name;
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
                // Guard even pathological names that cannot fit at the minimum size.
                context.beginPath();
                context.rect(x, 0, width, this.contents.height);
                context.clip();
                while (this.contents.fontSize > 1 &&
                    parts.reduce((total, part) => total + this.textWidth(part), 0) > availableWidth) {
                    this.contents.fontSize = Math.max(1, this.contents.fontSize - 1);
                }
                return drawItemName.call(this, item, x, y, width);
            } finally {
                // Prices, quantities and subsequent rows retain their normal size.
                this.contents.fontSize = fontSize;
                context.restore();
            }
        };
    }
})();
