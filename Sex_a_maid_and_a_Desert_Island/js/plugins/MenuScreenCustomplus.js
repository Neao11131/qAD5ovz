/*:
 * @target MZ
 * @plugindesc v1.0 〈LL_MenuScreenCustom Addon〉
 *            変数をメニューのステータス欄に追加表示
 * @author ChatGPT
 * @url https://example.com
 * @base LL_MenuScreenCustom        // 依存宣言
 * @orderAfter LL_MenuScreenCustom
 *
 * @param VarParams
 * @text 追加パラメータ
 * @type struct<VarParam>[]
 * @default []
 * @desc メニューに追加したいゲーム変数を定義します。
 *
 * @param startLine
 * @text 描画開始行
 * @type number
 * @min 0
 * @default 8
 * @desc 何行目（上から何行分下）から描画するか。
 *       LL_MenuScreenCustom の既定レイアウトでは 8 付近が空き領域。
 *
 * @param leftX
 * @text X座標
 * @type number
 * @default 48
 * @desc ラベル描画の開始 X 座標
 *
 * @param labelWidth
 * @text ラベル幅
 * @type number
 * @default 120
 *
 * @param valueWidth
 * @text 値幅
 * @type number
 * @default 96
 *
 * @help
 * ■概要
 *   LL_MenuScreenCustom のステータスウィンドウに、任意のゲーム変数を
 *   「ラベル＋値（＋アイコン）」形式でリアルタイム表示します。
 *
 * ■導入手順
 *   1) 本ファイルを js/plugins フォルダへ配置
 *   2) プラグイン管理で LL_MenuScreenCustom の “下” に追加・有効化
 *   3) プラグインパラメータ「追加パラメータ」で
 *      ・VariableId 変数ID
 *      ・Label      表示名
 *      ・IconIndex  アイコン番号（-1 で非表示）
 *      ・Formatter  値を文字列に変換する JS 1行式（省略可, 例: v+'％'）
 *
 * ■動作仕様
 *   Window_MenuStatus を LL_MenuScreenCustom が改造／使用しているため、
 *   その drawItemStatus をラップして末尾に追記する方式で
 *   レイアウト崩れを最小限にしています。
 *   変数値は毎フレーム取得し直すため、イベントで値を変えれば即反映。
 *
 * ■ライセンス
 *   MIT  (LL_MenuScreenCustom の利用規約に準拠し再配布は禁止)
 */

/*~struct~VarParam:
 * @param VariableId
 * @type variable
 * @text 変数ID
 *
 * @param Label
 * @type text
 * @text ラベル
 *
 * @param IconIndex
 * @type number
 * @min -1
 * @default -1
 * @text アイコン番号
 *
 * @param Formatter
 * @type string
 * @default
 * @text フォーマッタ
 * @desc v に変数値が入っています。例: v + "％"
 */

(() => {
  'use strict';
  const PLUGIN_NAME = 'LLMSC_VarStatusAddon';

  // ---------------- プラグインパラメータ ----------------
  const params = PluginManager.parameters(PLUGIN_NAME);
  /** @type {{variableId:number,label:string,icon:number,fmt:string}[]} */
  const LIST = JSON.parse(params.VarParams || '[]').map(str => {
    const p = JSON.parse(str);
    return {
      variableId: Number(p.VariableId || 0),
      label: String(p.Label || ''),
      icon: Number(p.IconIndex || -1),
      fmt: String(p.Formatter || '').trim()
    };
  });

  const START_LINE   = Number(params.startLine  || 8);
  const BASE_X       = Number(params.leftX      || 48);
  const LABEL_W      = Number(params.labelWidth || 120);
  const VALUE_W      = Number(params.valueWidth || 96);

  // ---------------- Window 拡張 ----------------
  const _drawItemStatus = Window_MenuStatus.prototype.drawItemStatus;
  Window_MenuStatus.prototype.drawItemStatus = function(index) {
    // 元描画
    _drawItemStatus.call(this, index);
    // 追記描画
    this.drawVariableParams(index);
  };

  /**
   * 追加パラメータを描画
   * @param {number} index
   */
  Window_MenuStatus.prototype.drawVariableParams = function(index) {
    const actor = $gameParty.members()[index];
    if (!actor) return;

    const x0 = this.itemRect(index).x + BASE_X;
    const lineH = this.lineHeight();
    const y0 = this.itemRect(index).y + lineH * START_LINE;

    LIST.forEach((cfg, i) => {
      if (!cfg.variableId) return;
      let x = x0;
      const y = y0 + lineH * i;

      // アイコン
      if (cfg.icon >= 0) {
        this.drawIcon(cfg.icon, x, y + 2);
        x += Window_Base._iconWidth + 4;
      }

      // ラベル
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(cfg.label, x, y, LABEL_W, 'left');

      // 値
      this.resetTextColor();
      const raw = $gameVariables.value(cfg.variableId);
      const v   = raw; // フォーマッタ用
      const out = cfg.fmt ? Function('v','return ' + cfg.fmt)(v) : String(raw);
      this.drawText(out, x + LABEL_W, y, VALUE_W, 'right');
    });
  };
})();
