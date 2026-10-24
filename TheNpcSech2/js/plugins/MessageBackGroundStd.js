//===================================================================
//MessageBackGroundStd.js
//メッセージウィンドウ背景デフォルト指定プラグイン
//===================================================================
//Copyright (c) 2018 蔦森くいな
//Released under the MIT license.
//http://opensource.org/licenses/mit-license.php
//-------------------------------------------------------------------
//blog   : http://paradre.com/
//Twitter: https://twitter.com/Kuina_T
//===================================================================
//＜更新情報＞
//　ver1.0.0 2018/06/02 初版
//===================================================================

/*:
 * @plugindesc メッセージウィンドウ背景のデフォルト値を指定するプラグイン
 * @author 蔦森くいな
 *
 * @help 「文章の表示」コマンドで表示されるメッセージウィンドウの背景は
 * デフォルトで「ウィンドウ」が指定されていますが、これを強制的に変更します。
 *
 * プラグイン管理画面のパラメータから新たなデフォルト値を指定して下さい。
 * すると、それ以降は「文章の表示」コマンドの背景が「ウィンドウ」のままでも
 * プラグインで指定した「暗くする」や「透明」の背景が優先して適用されます。
 *
 * もし、途中で通常の「ウィンドウ」タイプの背景を使う必要がある場合は、
 * その時だけ「文章の表示」コマンドの背景を、
 * プラグインで指定した背景と同じタイプにしてみて下さい。
 * 通常と同じメッセージウィンドウが表示されます。
 *
 * 
 * @param 背景タイプ
 * @type select
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 * @desc デフォルトで使用するメッセージウィンドウの背景タイプ
 * @default 0
 *
 * 利用規約：
 * このプラグインは商用・非商用を問わず無料でご利用いただけます。
 * どのようなゲームに使っても、どのように加工していただいても構いません。
 * MIT Licenseにつき著作権表示とライセンスURLは残しておいて下さい。
 */

(function() {
    'use strict';
    
    //メッセージウィンドウの背景を強制的に変更する
    var pd_MBGS_Game_Message_setBackground = Game_Message.prototype.setBackground;
    Game_Message.prototype.setBackground = function(background) {
        var parameters = Number(PluginManager.parameters('MessageBackGroundStd')['背景タイプ']);
        if(background === parameters) background = 0;
        else background = parameters;
        pd_MBGS_Game_Message_setBackground.call(this, background);
    };
    
})();