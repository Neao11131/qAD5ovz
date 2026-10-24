/*:
 * @target MZ
 * @plugindesc Fits item and skill descriptions to standard help windows in 1px steps.
 * @author Translation Patch
 * @orderAfter PANDA_RubyText
 *
 * @help
 * Place this plugin below other help-window drawing plugins.
 * Affects standard Help windows in Items (including Key Items), Shop, Equip,
 * Skill and Battle scenes. Custom Help subclasses and other scenes are unchanged.
 * Single line breaks in translated descriptions are reflowed to the actual
 * window width. Blank lines remain paragraph breaks. Database text is unchanged.
 * The font shrinks by 1px until both width and height fit, down to 1px.
 * Short descriptions retain the normal font size. Fitting runs on refresh,
 * not every frame, and the next description starts at the normal size again.
 * Plain text uses the existing renderer, including PANDA_RubyText metrics.
 * Descriptions with escape codes or ruby markup keep their original rendering.
 * No parameters or plugin commands.
 */

(() => {
    "use strict";

    const scenes = [Scene_Item, Scene_Shop, Scene_Equip, Scene_Skill, Scene_Battle];
    const refresh = Window_Help.prototype.refresh;
    Window_Help.prototype.refresh = function() {
        if (this.constructor !== Window_Help ||
            !scenes.some(scene => SceneManager._scene instanceof scene) ||
            /[\\\x1b\x1e]|\{[^{}]*\|[^{}]*\}/.test(this._text)) {
            return refresh.call(this);
        }

        this.contents.clear();
        this.resetFontSettings();
        const rect = this.baseTextRect();
        const width = Math.min(rect.width, this.contents.width - rect.x) -
            this.contents.outlineWidth;
        const height = Math.min(rect.height, this.contents.height - rect.y) -
            this.contents.outlineWidth;
        if (!this._text || width <= 0 || height <= 0) {
            return;
        }

        const paragraphs = this._text.replace(/\r\n?/g, "\n").split(/\n\s*\n/)
            .map(text => text.replace(/\s+/g, " ").trim());
        const ruby = this.isRuby && this.isRuby();
        // PANDA draws plain text one UTF-16 character at a time, without kerning.
        const measure = text => ruby
            ? text.split("").reduce((total, character) => total + this.textWidth(character), 0)
            : this.textWidth(text);

        try {
            let lines;
            for (;;) {
                lines = [];
                for (const paragraph of paragraphs) {
                    if (lines.length) {
                        lines.push("");
                    }
                    let line = "";
                    for (const word of paragraph.split(" ")) {
                        const next = line ? line + " " + word : word;
                        if (line && measure(next) > width) {
                            lines.push(line);
                            line = word;
                        } else {
                            line = next;
                        }
                    }
                    lines.push(line);
                }

                // Keep the engine's spacing, including PANDA's vertical offset.
                const lineHeight = this.calcTextHeight({ text: "", index: 0 });
                if ((lines.length * lineHeight <= height &&
                    lines.every(line => measure(line) <= width)) ||
                    this.contents.fontSize <= 1) {
                    break;
                }
                this.contents.fontSize = Math.max(1, this.contents.fontSize - 1);
            }

            // drawTextEx/textSizeEx would reset the fitted font size.
            const state = this.createTextState(lines.join("\n"), rect.x, rect.y, width);
            this.processAllText(state);
        } finally {
            this.resetFontSettings();
        }
    };
})();
