/*:
 * @target MZ
 * @plugindesc Wraps dialogue to the message window width, including portraits.
 * @author Translation Patch
 * @orderAfter PANDA_RubyText
 * @orderAfter MPP_ChoiceEX
 *
 * @help
 * Place below other message and text-rendering plugins.
 * Applies only to active Window_Message dialogue, not menus or choices.
 * Keeps the current font size and explicit line breaks. Adds line breaks at
 * spaces when necessary, or between characters in an overlong unbroken word.
 * Uses the actual contents width, portrait offset and an outline safety margin.
 * Additional lines use the engine's normal page breaks and input pauses.
 *
 * Colors, waits, icons, font-size controls and PANDA ruby groups are preserved.
 * Variables and names are measured after the engine substitutes their values.
 * Ruby groups and icons are indivisible. An individual glyph/icon/ruby group
 * wider than the entire text area cannot be fitted without changing its size.
 * Right-to-left and explicitly positioned text (PX/PY) retain original layout.
 * Lines using unrecognized escape codes also retain their original layout.
 * Database text and $gameMessage are not modified. No parameters or commands.
 */

(() => {
    "use strict";

    const calcTextHeight = Window_Message.prototype.calcTextHeight;
    Window_Message.prototype.calcTextHeight = function(state) {
        if (state === this._textState && state.drawing && !state.rtl &&
            !/\x1bP[XY]\[/i.test(state.text)) {
            wrapLine.call(this, state);
        }
        return calcTextHeight.call(this, state);
    };

    function wrapLine(state) {
        const width = Math.min(this.innerWidth, this.contents.width) -
            state.startX - this.contents.outlineWidth - 1;
        if (width <= 0) return;

        const line = state.text.slice(state.index).split(/[\n\f]/, 1)[0];
        // Keep escape sequences, Unicode code points and ruby bases atomic.
        const tokens = [...line.matchAll(
            /\x1b(?:[a-z]+|[$.|^!><{}\\])(?:\[\d+\])?|\x1e\{[^{}\n]+?\|[^{}\n]+?\}|[\s\S]/giu
        )];
        const codes = new Set(["C", "I", "FS", "{", "}", "$", ".", "|", "!", ">", "<", "^", "\\"]);
        if (tokens.some(token => token[0][0] === "\x1b" &&
            !codes.has(token[0].slice(1).replace(/\[\d+\]$/, "").toUpperCase()))) {
            return;
        }

        const fontSize = this.contents.fontSize;
        const ruby = this.isRuby && this.isRuby();
        let used = 0;
        let spaceStart = -1;
        let spaceEnd = -1;
        let hasText = false;
        try {
            for (const token of tokens) {
                const text = token[0];
                const index = token.index;
                let advance = 0;
                if (text[0] === "\x1b") {
                    const code = text.slice(1).replace(/\[\d+\]$/, "").toUpperCase();
                    if (code === "{") this.makeFontBigger();
                    if (code === "}") this.makeFontSmaller();
                    if (code === "FS") this.contents.fontSize = Number(text.match(/\d+/)?.[0] || 0);
                    if (code === "I") advance = ImageManager.iconWidth + 4;
                } else if (text[0] === "\x1e") {
                    advance = this.textWidth(text.slice(2, text.indexOf("|")));
                } else {
                    // PANDA draws UTF-16 characters separately, even in fast mode.
                    advance = ruby
                        ? text.split("").reduce((sum, c) => sum + this.textWidth(c), 0)
                        : this.textWidth(text);
                }

                if (/^[ \t]$/.test(text)) {
                    if (hasText) {
                        if (spaceEnd !== index) spaceStart = index;
                        spaceEnd = index + text.length;
                    }
                    if (!line.slice(index).trim()) break;
                }
                if (used + advance > width && hasText) {
                    const start = spaceStart >= 0 ? spaceStart : index;
                    const end = spaceStart >= 0 ? spaceEnd : index;
                    state.text = state.text.slice(0, state.index + start) + "\n" +
                        state.text.slice(state.index + end);
                    break;
                }
                used += advance;
                if (advance > 0 && !/^[ \t]$/.test(text)) hasText = true;
            }
        } finally {
            this.contents.fontSize = fontSize;
        }
    }
})();
