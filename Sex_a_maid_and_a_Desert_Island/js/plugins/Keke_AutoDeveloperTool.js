//=============================================================================
// Keke_AutoDeveloperTool - 自動でデベロッパーツール
// バージョン: 1.0.1
//=============================================================================
// Copyright (c) 2020 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 自動でデベロッパーツールを開く
 * @author ケケー
 * @url https://kekeelabo.com
 * 
 * 
 * 【ver.1.0.1】
 * 自動でデベロッパーツールを開く
 * 
 * ● 利用規約 ●
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 * 
 * 
 * 
 * [ver.1.0.1]
 * Automatically open developer tools
 *
 * ● Terms of Use ●
 * Feel free to use it under the MIT license.
 */

(() => {

    // 自動でデベロッパーツールを起動
    let _SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize = function() {
        if (Utils.isNwjs() && Utils.isOptionValid('test')) {
            require('nw.gui').Window.get().showDevTools();
        }
        _SceneManager_initialize.call(this);
    };
    
    // ゲーム画面を自動で前面にする
    let _Scene_Title_initialize = Scene_Title.prototype.initialize;
    Scene_Title.prototype.initialize = function() {
        _Scene_Title_initialize.call(this);
        if (Utils.isNwjs() && Utils.isOptionValid('test')) {
            require('nw.gui').Window.get().focus();
        }
    };

})();