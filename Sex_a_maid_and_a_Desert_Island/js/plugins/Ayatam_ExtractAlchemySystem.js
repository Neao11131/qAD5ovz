//=============================================================================
// plugin name Ayatam_ExtractAlchemySystem.js
// ■ MMO式採集合成システムMVMZ
//                         MV 対応コアver 1.6.3
//                         MZ 対応コアver 1.5.0
//                         MZ 対応コアver 1.6.0
//
// (C)2021 - 2300 ayatam
//=============================================================================
//  【更新内容】
//  2023/5/17 v1.04 合成レシピの素材に武器・防具を指定際、
//                  選択データベースに不具合があったのを修正しました。
//  2023/5/8 v1.03 セーブデータロード時に一部保存情報の読み込み不具合の修正を行いました。
//  2023/3/12 v1.02 カスタマイズ設定を充実化に伴う不具合の修正を行いました。
//  2023/3/12 v1.01 カスタマイズ設定を充実化しました。
//  2023/3/1 v1.00 正規版を行いました。
//                 プラグインヘルプ内の説明を調整しました。
//                 レベル概念を無効にした際、
//                 レベル10差の概念の計算に不具合が発生していたのを修正しました。
//                 採集獲得素材名を表示するモードを追加しました。
//  2023/2/25 v0.08 合成可能数が0時の場合に、
//                  合成が行えていた不具合を修正しました。
//  2023/2/22 v0.07 タッチUIをオフにした際、
//                  発生していたメニュー展開不具合を修正しました。
//  2023/2/10 v0.06 採集スクリプトコマンドに新機能ディレイタイマーを追加しました。
//  2023/2/7 v0.05 一部他プラグイン作者さまとの競合対策を行いました。
//  2023/2/4 v0.04 誤字の修正を行いました。
//                 [記載漏れ] プラグインヘルプに情報系のスクリプトコマンドを記載。
//                 [記載漏れ][基本設定>採集情報の設定>入手確率ラベルアイコン]の項目を追加
//                 [記載漏れ][基本設定>レベル情報の設定>新レシピ習得時のラベルアイコン]の項目を追加
//                 一部アイコン座標の調整を行いました。
//  2023/2/1 v0.03 RPGツクールMZとの併用調整が完了しました。
//  2023/2/1 v0.02 デフォルトの一部設定を正常に読み込めていなかったのを修正しました。
//  2023/1/22 v0.01 試作完成。
//=============================================================================

var Imported = Imported || {};
Imported.ExtractAlchemySystem = true;

var Ayatam = Ayatam || {};
Ayatam.EXTRACTALCHEMYSYSTEM = Ayatam.EXTRACTALCHEMYSYSTEM || {};

//=============================================================================
//
// - 日本語ここから -
//
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc MMO式採集合成システムMVMZ v1.04
 * MMO式採集や合成機能を追加します。
 * @author Ayatam (Another Young Animations)
 * 
 * @help ■ MMO式採集合成システムMVMZ
 * 本プラグインは、MV Core ver 1.6.3 に対応。
 *                 MZ Core ver 1.5.0 に対応。
 *                             1.6.0 に対応。
 * 
 * 【利用規約】
 * ・改造はご自由に行ってください。
 * ・他サイト様の素材との競合によるエラーには基本、対応しません。
 * ・素材単体でのエラーには対応します。ただし、その責任は負いません。
 * ・アダルト・商業可。
 * 
 * 【素材を使用したゲーム等について】
 * ・作者名、サイト名、URLなどをread_meなどに分かりやすい形で記載してください。
 * 
 *   作者名:ayatam
 *   サイト名:Another Young Animations 公式サイト
 *   URL:https://ayatam.wixsite.com/index
 * 
 * =============================================================================
 *  【プラグイン使用方法】
 *  ・プラグインパラメータの基本設定やカスタマイズ設定をお好みの設定にし、
 *    採集/合成カテゴリー データベースで合成カテゴリーを作成し、
 *    各採集/合成カテゴリー用の各レシピを
 *    合成/解体レシピ データベースに作成することで準備が整います。
 *  ・下記を参考の上、スクリプトコマンドを使用し、
 *    ゲーム内でMMO式採集合成システムを実装してください。
 *  ・本プラグインにはプラグインコマンドはありません。
 *    スクリプトコマンドのみです。
 * 
 *  【本プラグイン専用画像フォルダパス】
 *    img/extAlchemy/
 *    本プラグインで使用する画像はすべて、
 *    このフォルダにインポートしてください。
 * 
 *  【Mzの皆さまへ】
 *    [Effekseerでのアニメーション作成について]
 *      Mzは、フリーソフトのEffekseerでアニメーションを作成する仕様です。
 *      ですが、Effekseerで作成したアニメーションは、
 *      Effekseer公式が配布しておりますMz専用のプラグインが
 *      必要になりますので、作業中のプロジェクトで
 *      Effekseerで作成したアニメーションを採用する際は、
 *      お持ちのEffekseerのバージョンに合わせて
 *      下記の導入手順を参考に導入してください。
 * 
 *      EffekseerForRPGMakerMZ_Ex プラグイン
 *      URL:https://github.com/effekseer/EffekseerForRPGMakerMZ_Ex
 * 
 *      プラグインを導入してもアニメーションが上手く表示できない場合は、
 *      要ユーザー登録ですが、こちらも参照してみてください。
 *      URL:https://forum.tkool.jp/index.php?threads/%E3%80%90rpg%E3%83%84%E3%82%AF%E3%83%BC%E3%83%ABmz%E3%80%91%E3%81%8A%E5%BD%B9%E7%AB%8B%E3%81%A1%E6%83%85%E5%A0%B1%E3%83%BB%E3%82%A2%E3%83%8B%E3%83%A1%E2%80%95%E3%82%B7%E3%83%A7%E3%83%B3-effekseer%E7%B7%A8.4294/
 * 
 *      ※Mzの使い方プロジェクトには導入済みです。
 * 
 *    [採集アニメーションのご利用について]
 *      使い方プロジェクト用に作成しました
 *      effects > Extracter01.efkefc と
 *      effects > Extracter02.efkefc について
 *      ご自由にお使いください。
 * 
 *      [ご自身のプロジェクトに導入する4手順]
 * 
 *      ① 上記、effekseer公式プラグインの導入。
 *        採集アニメはどちらもeffekseer ver 170bで作成されていますので、
 *        上記プラグインを導入される際は、170b以上のものを
 *        導入してください。
 *        プラグインに同封されているlibsフォルダが重要です。
 *        ご自身のプロジェクトの js > libs に
 *        プラグインのlibsの中身と同じものが入っておりますので、
 *        こちらを上書きすることで導入完了です。
 *        EffekseerForRPGMakerMZ_Ex.jsについては、
 *        必要なら導入してください。無くても動作します。
 *      
 *      ② Extracter01と02.efkefcのテクスチャーデータの導入。
 *        Mz使い方プロジェクトの
 *        effects > Texture > Extracter01.png と、
 *        effects > Texture > Extracter02.png を
 *        Mz使い方プロジェクトと同じ場所になるように
 *        ご自身のプロジェクトに導入します。
 *      
 *      ③ Extracter01と02.efkefcそのものの導入。
 *        Mz使い方プロジェクトの
 *        effects > Extracter01.efkefc と、
 *        effects > Extracter02.efkefc を
 *        Mz使い方プロジェクトと同じ場所になるように
 *        ご自身のプロジェクトに導入します。
 *      
 *      ④ 最後に使い方プロジェクトのアニメーションデータベースから
 *        ID:121 [プラグイン用]採集可能エフェクト と、
 *        ID:122 [プラグイン用]採集中エフェクト をコピペすることで、
 *        導入完了です。
 *      
 *      上記手順通りに正しい場所に導入できていれば、
 *      データベースのアニメプレビューで
 *      Extracter01.efkefcとExtracter02.efkefcの
 *      アニメーションが再生されます。
 * 
 *      アニメーションが表示されない場合は、
 *      上記手順を再度ご確認ください。
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  スクリプトコマンド - 画面系 -
 * 
 * =============================================================================
 * 
 *  ●合成/解体専用画面を開く (指定された採集/合成カテゴリーのみ)
 *   $gameAlchemy.callExclusiveScene(カテゴリー名);
 *   ※""(ダブルクォートで囲んで)カテゴリー名を指定すると、
 *     専用画面を開くことができます。
 * 
 *   ※直接メニューを開く (合成/解体メインメニュー)
 *     SceneManager.push(Scene_AlchemyCrafter)
 *   ※採集/合成カテゴリー データベース にて
 *     合成メニューへの追加が有効の採集/合成カテゴリーのみ
 *     まとめてリストアップされます。
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  スクリプトコマンド - メモ欄設定 -
 * 
 * =============================================================================
 * 
 *  ●アイテムレシピ習得スクリプト [アイテムのメモ欄]
 *   <aeAlchemy learn recipes>
 *   recipe: alchemyId, recipeId
 *   </aeAlchemy learn recipes>
 *   alchemyId : 習得させたい「採集/合成カテゴリー データベース」の
 *               採集/合成IDを指定し、
 *   recipeId  : alchemyIdで指定した採集/合成カテゴリー由来の習得させたい
 *               レシピIDを「合成/解体レシピ データベース」のレシピIDから
 *               指定します。
 *   ※複製指定できますが、対象採集/合成カテゴリーにて
 *     レベル概念が有効の場合、習得レベル条件を満たさないレシピが
 *     一つでも存在するとレシピアイテムを使用することができません。
 *     レベル概念が無効の場合は、そのまま習得します。
 *     ※仕様
 * 
 * 【例:1】対象のアイテムID:1のメモ欄に
 * 
 *         <aeAlchemy learn recipes>
 *         recipe: cook, humberger
 *         recipe: cook, tomatoJuice
 *         recipe: smith, greatSword
 *         </aeAlchemy learn recipes>
 * 
 *         と指定すると、
 *         指定されたレシピがすべて習得可能状態になり次第、
 *         アイテムID:1を使用することで、
 *         cook(料理) カテゴリーの humberger(ハンバーガー) と
 *         tomatoJuice(トマトジュース) のレシピを習得し、
 *         smith(鍛冶) カテゴリーの greatSword(グレートソード) の
 *         レシピを習得します。
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  スクリプトコマンド - 情報系 -
 * 
 * =============================================================================
 * 
 *  ●合成メニューリストへの表示切替「対象合成カテゴリー」
 *   $gameAlchemy.setMenuShow(alchemyId,boolean)
 *   alchemyId : 「採集/合成カテゴリー データベース」の採集/合成ID。
 *                指定する時は、''(シングルクォート)で囲みます。
 *   boolean   :  true: 表示する false:表示しない
 * 
 *   ※大本のフラグなだけで、スイッチや変数の状態による表示設定も
 *     されていれば、それらも考慮されます。
 * 
 *  【例:1】料理カテゴリーに合成メニューに表示する
 *          $gameAlchemy.setMenuShow('cook',true)
 * 
 *  【例:2】料理カテゴリーに合成メニューに表示しない
 *          $gameAlchemy.setMenuShow('cook',false)
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●採集時抽選情報の表示切替
 *   $gameAlchemy.setExtractInfo(boolean)
 *   boolean : true: 表示する false:表示しない
 * 
 *   採集時抽選情報にどのようなアイテムがどのような確率で、
 *   抽選されるかを可視化します。
 * 
 *  【例:1】採集時抽選情報の表示する
 *          $gameAlchemy.setExtractInfo(true)
 * 
 *  【例:2】採集時抽選情報の表示しない
 *          $gameAlchemy.setExtractInfo(false)
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  スクリプトコマンド - レベル概念有効時系 -
 * 
 * =============================================================================
 * 
 *  ●経験値の取得「対象合成カテゴリー」[レベル概念有効時]
 *   $gameAlchemy.gainExp(alchemyId,exp)
 *   alchemyId : 「採集/合成カテゴリー データベース」の採集/合成ID。
 *                指定する時は、''(シングルクォート)で囲みます。
 *   exp       :  獲得する経験値量を指定します。
 * 
 *  【例:1】料理カテゴリーに150経験を取得する
 *          $gameAlchemy.gainExp('cook',150)
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●現在のレベルを取得「対象合成カテゴリー」[レベル概念有効時]
 *   $gameAlchemy.getLvl(alchemyId)
 *   alchemyId : 「採集/合成カテゴリー データベース」の採集/合成ID。
 *                指定する時は、''(シングルクォート)で囲みます。
 * 
 *  【例:1】料理カテゴリーの現在レベルを変数ID:1番に代入する
 *          $gameVariables.setValue(1,$gameAlchemy.getLvl('cook'))
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●最大のレベルを取得「対象合成カテゴリー」[レベル概念有効時]
 *   $gameAlchemy.getMaxLvl(alchemyId)
 *   alchemyId : 「採集/合成カテゴリー データベース」の採集/合成ID。
 *                指定する時は、''(シングルクォート)で囲みます。
 * 
 *  【例:1】料理カテゴリーの最大レベルを変数ID:1番に代入する
 *          $gameVariables.setValue(1,$gameAlchemy.getMaxLvl('cook'))
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●最大のレベル時の称号を取得「対象合成カテゴリー」[レベル概念有効時]
 *   $gameAlchemy.getMaxName(alchemyId)
 *   alchemyId : 「採集/合成カテゴリー データベース」の採集/合成ID。
 *                指定する時は、''(シングルクォート)で囲みます。
 * 
 *  【例:1】料理カテゴリーの最大レベル時の称号を変数ID:1番に代入する
 *          $gameVariables.setValue(1,$gameAlchemy.getMaxName('cook'))
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●次のレベルアップに必要な経験値を取得「対象合成カテゴリー」[レベル概念有効時]
 *   $gameAlchemy.getNextExp(alchemyId)
 *   alchemyId : 「採集/合成カテゴリー データベース」の採集/合成ID。
 *                指定する時は、''(シングルクォート)で囲みます。
 * 
 *  【例:1】料理カテゴリーの次のレベルアップに必要な経験値を変数ID:1番に代入する
 *          $gameVariables.setValue(1,$gameAlchemy.getNextExp('cook'))
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●採集/合成名を取得「対象合成カテゴリー」[レベル概念有効時]
 *   $gameAlchemy.getName(alchemyId)
 *   alchemyId : 「採集/合成カテゴリー データベース」の採集/合成ID。
 *                指定する時は、''(シングルクォート)で囲みます。
 * 
 *  【例:1】料理カテゴリー名を変数ID:1番に代入する
 *          $gameVariables.setValue(1,$gameAlchemy.getName('cook'))
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●採集/合成データをすべて初期化する
 *   $gameAlchemy.resetAllAlchemy()
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  スクリプトコマンド - 状態系 - 「条件分岐」
 *  ※イベントコマンド・フロー制御「条件分岐」のスクリプトコマンドで使用します。
 * 
 * =============================================================================
 * 
 *  ●対象のレシピは習得レベル条件を満たしているか？
 *   $gameAlchemy.canLearnRecipe(alchemyId,recipeId)
 *   alchemyId : 「採集/合成カテゴリー データベース」の採集/合成ID。
 *                指定する時は、''(シングルクォート)で囲みます。
 *   recipeId  : 「合成/解体レシピ データベース」のレシピID。
 *                指定する時は、''(シングルクォート)で囲みます。
 * 
 *        満たしていれば、true / 満たしていなければ、false を返します。
 * 
 *  【例】料理カテゴリーのハンバーガーの習得レベル条件を満たしているか
 *       $gameAlchemy.canLearnRecipe('cook','humberger')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●対象のレシピはすでに習得済みか？
 *   $gameAlchemy.recipeLearned(alchemyId,recipeId)
 *   alchemyId : 「採集/合成カテゴリー データベース」の採集/合成ID。
 *                指定する時は、''(シングルクォート)で囲みます。
 *   recipeId  : 「合成/解体レシピ データベース」のレシピID。
 *                指定する時は、''(シングルクォート)で囲みます。
 * 
 *        満たしていれば、true / 満たしていなければ、false を返します。
 * 
 *  【例】料理カテゴリーのハンバーガーのすでに習得済みか
 *       $gameAlchemy.recipeLearned('cook','humberger')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●対象の合成カテゴリーのレベル概念は有効か？
 *   $gameAlchemy.canLvl(alchemyId)
 *   alchemyId : 「採集/合成カテゴリー データベース」の採集/合成ID。
 *                指定する時は、''(シングルクォート)で囲みます。
 * 
 *        満たしていれば、true / 満たしていなければ、false を返します。
 * 
 *  【例】料理カテゴリーのレベル概念は有効か？
 *       $gameAlchemy.canLvl('cook')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●対象の合成カテゴリーのレベルは最大か？ [レベル概念は有効時]
 *   $gameAlchemy.isMaxLvl(alchemyId)
 *   alchemyId : 「採集/合成カテゴリー データベース」の採集/合成ID。
 *                指定する時は、''(シングルクォート)で囲みます。
 * 
 *        満たしていれば、true / 満たしていなければ、false を返します。
 * 
 *  【例】料理カテゴリーのレベルは最大か？
 *       $gameAlchemy.isMaxLvl('cook')
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  スクリプトコマンド - 採集系 -
 * 
 * =============================================================================
 * 
 *  ●採集イベントの設定 「注釈」
 *  「イベントページの上の行に集約して指定してください。」
 *   ♦ 採集の種類
 *   <extractType: alchemyType>
 *   alchemyType :「採集/合成カテゴリー データベース」の採集/合成IDを
 *                 指定します。
 * 
 *   ♦ 採集可能レベル
 *   <extractLvl: lvl>
 *   lvl : 採集の種類で指定した採集/合成カテゴリーにて、
 *         レベル概念が有効の場合、指定レベル以上から採集可能になります。
 * 
 *   ♦ 育成採集モード [種植えて、育つ野菜の用途用モード]
 *   <extractGrower: itemType, itemId, amount, canGrow, noGrow>
 *   itemType : 種として扱う I:アイテム W:武器 A:防具 の中から一つ指定します。
 *   itemId   : itemTypeを元に対象アイテムのIdを指定します。
 *   amount   : 消費数を指定します。
 *              消費数所持している場合は、自動で使用し、
 *              リポップタイマーを元に採集オブジェクトが出現します。
 *              ※仕様
 *   canGrow  : 消費数分種を所持していて、
 *              自動使用する際の文章を指定します。
 *                例: 種を植えました！
 *   noGrow   : 消費数分種が無い場合に、
 *              もっていないことを表す文章を指定します。
 *                例: 種を植えることができます！
 *   ※育成採集モードは、未指定で通常モードになります。
 * 
 *   ♦ 採集回数
 *   <extractTimes: amount>
 *   amount : 指定可数分、採集することができ、終るとイベントが消失します。
 * 
 *   ♦ 再出現(リポップ)タイマー [採集後、採集イベントが消えます]
 *   <extractRespawn: wait>
 *   wait : 指定フレーム数後に、再出現します。
 *   ※採集回数分取得後に消失したイベントを再出現且つ、再採集可能にします。
 *     育成採集モード時は、種を植えてからの出現時間として扱われます。
 * 
 *   ♦ ディレイタイマー　[採集後、採集イベントは消えません]
 *   <extractDelay: wait>
 *   wait : 指定フレーム数後に、再採集可能にします。
 *   ※採集回数分取得後に一時的に使用不可になり、指定タイマー後、再採集可能にします。
 *     育成採集モード時は、最初の一回だけ種を植えてから以降の種植えを省略します。
 * 
 *   [注意] リポップタイマーまたはディレイタイマーのどちらかを指定してください。
 *          両方の使用はできません。※仕様
 * 
 *   ♦ 採集時獲得経験値
 *   <extractExp: exp>
 *   exp : 採集の種類で指定した採集/合成カテゴリーにて、
 *         レベル概念が有効の場合、指定量の経験値を獲得し、
 *         採集可能レベルと採集レベルを元に10差以上で
 *         経験値が取得できなくなります。無効時は、獲得しません。
 *         また採集失敗時の獲得経験値は、指定の半分になります。
 * 
 *   ♦ 採集速度
 *   <extractSpeed: speed>
 *   speed : 採集の種類で指定した採集/合成カテゴリーにて、
 *           レベル概念が有効の場合、採集可能レベルと採集レベルを元に
 *           10差以上で採集速度が10倍早まり、無効時は、変化しません。
 *           指定する値が小さいほど早く、大きいほど遅いです。
 *   ※小数点指定可。
 * 
 *   ♦ 採集成功率[採集そのものの成功率です]
 *   <extractChance: chance>
 *   chance : 採集の種類で指定した採集/合成カテゴリーにて、
 *            レベル概念が有効の場合、採集可能レベルと採集レベルを元に
 *            10差以上で成功率が100%化し、無効時は、変化しません。
 * 
 *   ♦ 採集アイテムの設定
 *   <extractItems: [itemType,itemId,amount,chance]>
 *   itemType : I:アイテム W:武器 A:防具 の中から一つ指定します。
 *   itemId   : itemTypeを元に対象アイテムのIdを指定します。
 *   amount   : 獲得数を指定します。
 *              Rand(1:3) と指定すると1～3の間でランダム数入手し、
 *              さらに RandMax(1:3:5) とすると成功率100%時に5個入手します。
 *                ※Rand()またはRandMax()を使用する際は、
 *                  大文字小文字に注意してください。
 *   chance   : 採集成功時に、指定アイテムの入手率を指定します。
 *   ※コンマで区切ることで複数指定可能。
 *     採集成功時に何も採集できないを避けるため、
 *     必ず、一つは100にするのを推奨します。
 *     例 [I,1,2,80],[A,4,Rand(1:4),100],[W,3,RandMax(4:6:10),24]
 * 
 *   ♦ 採集待機アニメーションの設定
 *   <extractStandbyAnimation: animId, beginDelay, loopDelay>
 *   animId     : データベースのアニメーションIDを指定します。
 *   beginDelay : 最初の再生までの待機時間を指定します。
 *   loopDelay  : ループまでの待機時間を指定します。
 *   ※待機アニメーション中は、無音を推奨しますが、
 *     お好みで設定してください。
 * 
 *   ♦ 採集中アニメーションの設定
 *   <extractGainingAnimation: animId, beginDelay, loopDelay>
 *   animId     : データベースのアニメーションIDを指定します。
 *   beginDelay : 最初の再生までの待機時間を指定します。
 *   loopDelay  : ループまでの待機時間を指定します。
 *   ※採集中の効果音は、アニメーションに設定する仕様です。
 *     理由は、木を切る音や岩をハンマーで砕く音を個別に指定できるため。
 * 
 *   ♦ マップ移動しても状態を保存するか
 *   <extractSaveOnMapChange: boolean>
 *   boolean : true:保存 false:保存しない
 *   ※マップ移動してもイベントの状態を保存します。
 * 
 *  【使用例:1】通常採集モード [リポップタイマー編]
 *    <extractType: lumberjack>
 *    <extractLvl: 5>
 *    <extractTimes: 3>
 *    <extractSpeed: 1.4>
 *    <extractRespawn: 240>
 *    <extractItems: [I,1,5,80],[W,1,Rand(1:3),100],[A,1,RandMax(1:3:5),80]>
 *    <extractChance: 85>
 *    <extractExp: 2>
 *    <extractStandbyAnimation: 121, 50, 150>
 *    extractGainingAnimation: 122, 0, 40>
 * 
 *    この場合、 lumberjack(木こり) 対象の採集ポイントになり、
 *    木こりレベルが5以上で採集でき、3回採集可能で、
 *    採集速度は、採集レベルと木こりレベルが同等時で、
 *    1.4速度で採集し、3回採集後、イベントが消え、
 *    240フレームで再出現(リポップ)。
 *             
 *    採集可能アイテムは採集成功時に、
 *    80%の確立でアイテムID:1を5個、
 *    100%の確立で武器ID:1を1~3個の間でランダム入手、
 *    80%の確立で防具ID:1を通常成功率時、1~3個の間でランダム入手し、
 *    成功率100%時は、5個確定入手します。
 * 
 *    待機アニメーションは、アニメーションID:121で、
 *    採集中のアニメーションは、アニメーションID:122が再生されます。
 * 
 *  【使用例:2】育成採集モード [リポップタイマー編]
 *    <extractType: extracter>
 *    <extractGrower: I, 26, 1, 種を植えました！, 種を植えることができます！>
 *    <extractLvl: 1>
 *    <extractTimes: 1>
 *    <extractSpeed: 1.4>
 *    <extractRespawn: 240>
 *    <extractItems: [I,1,5,80],[W,1,Rand(1:3),100],[A,1,RandMax(1:3:5),80]>
 *    <extractChance: 85>
 *    <extractExp: 2>
 *    <extractStandbyAnimation: 121, 50, 150>
 *    <extractGainingAnimation: 122, 0, 40>
 *    <extractSaveOnMapChange: true>
 * 
 *    この場合、 extracter(採集師) 対象の採集ポイントになり、
 *    採集レベルが1以上で種を植えることができ、
 *    種を上てから、extractRespawnの240フレーム後に出現(育成完了)し
 *    採集できるようになり、1回採集可能で、
 *    採集速度は、採集レベルと採集師レベルが同等時で、
 *    1.4速度で採集し、1回採集後、対象イベントが消失し、
 *    再度、種を植えることで再育成を行うことができます。
 *    またマップ移動しても状態を保持します。
 *             
 *    採集可能アイテムは採集成功時に、
 *    80%の確立でアイテムID:1を5個、
 *    100%の確立で武器ID:1を1~3個の間でランダム入手、
 *    80%の確立で防具ID:1を通常成功率時、1~3個の間でランダム入手し、
 *    成功率100%時は、5個確定入手します。
 * 
 *    待機アニメーションは、アニメーションID:121で、
 *    採集中のアニメーションは、アニメーションID:122が再生されます。
 * 
 *  【使用例:3】通常採集モード [ディレイタイマー編]
 *    <extractType: lumberjack>
 *    <extractLvl: 5>
 *    <extractTimes: 3>
 *    <extractSpeed: 1.4>
 *    <extractDelay: 240>
 *    <extractItems: [I,1,5,80],[W,1,Rand(1:3),100],[A,1,RandMax(1:3:5),80]>
 *    <extractChance: 85>
 *    <extractExp: 2>
 *    <extractStandbyAnimation: 121, 50, 150>
 *    extractGainingAnimation: 122, 0, 40>
 * 
 *    この場合、 lumberjack(木こり) 対象の採集ポイントになり、
 *    木こりレベルが5以上で採集でき、3回採集可能で、
 *    採集速度は、採集レベルと木こりレベルが同等時で、
 *    1.4速度で採集し、3回採集後、イベントが消えずに採取できなくなり、
 *    240フレーム(ディレイ)で再採取可能になります。
 *             
 *    採集可能アイテムは採集成功時に、
 *    80%の確立でアイテムID:1を5個、
 *    100%の確立で武器ID:1を1~3個の間でランダム入手、
 *    80%の確立で防具ID:1を通常成功率時、1~3個の間でランダム入手し、
 *    成功率100%時は、5個確定入手します。
 * 
 *    待機アニメーションは、アニメーションID:121で、
 *    採集中のアニメーションは、アニメーションID:122が再生されます。
 * 
 *  【使用例:4】育成採集モード [ディレイタイマー編]
 *    <extractType: extracter>
 *    <extractGrower: I, 26, 1, 種を植えました！, 種を植えることができます！>
 *    <extractLvl: 1>
 *    <extractTimes: 1>
 *    <extractSpeed: 1.4>
 *    <extractDelay: 240>
 *    <extractItems: [I,1,5,80],[W,1,Rand(1:3),100],[A,1,RandMax(1:3:5),80]>
 *    <extractChance: 85>
 *    <extractExp: 2>
 *    <extractStandbyAnimation: 121, 50, 150>
 *    <extractGainingAnimation: 122, 0, 40>
 *    <extractSaveOnMapChange: true>
 * 
 *    この場合、 extracter(採集師) 対象の採集ポイントになり、
 *    採集レベルが1以上で種を植えることができ、
 *    種を上てから、extractDelayの240フレーム後に出現(育成完了)し
 *    採集できるようになり、1回採集可能で、
 *    採集速度は、採集レベルと採集師レベルが同等時で、
 *    1.4速度で採集し、1回採集後、以降の種植えは省略され、
 *    extractDelayの240フレーム後に再採取可能になります。
 *    またマップ移動しても状態を保持します。
 *             
 *    採集可能アイテムは採集成功時に、
 *    80%の確立でアイテムID:1を5個、
 *    100%の確立で武器ID:1を1~3個の間でランダム入手、
 *    80%の確立で防具ID:1を通常成功率時、1~3個の間でランダム入手し、
 *    成功率100%時は、5個確定入手します。
 * 
 *    待機アニメーションは、アニメーションID:121で、
 *    採集中のアニメーションは、アニメーションID:122が再生されます。
 * 
 * =============================================================================
 *
 * @param GlobalSettings
 * @text 基本設定
 * @type struct<ExtAlcGlobalSettings>
 * @default {"Setup":"","MenuCommandInformation":"{\"AddToMenuCommand\":\"true\",\"AlchemyMenuCommandName\":\"合成/解体\"}","FontName":"","MapExtracterSetup":"","ExtracterTitleLabels":"[\"必要Lv.\",\"Lv.\",\"/\",\"Exp:\"]","ExtracterHasNotLabel":"[\"[所持済み]\",\"[未所持]\"]","ExtracterNotReadyLabel":"[不足]","ExtracterAmountLabel":"個","ExtracterLvlNotOKLabel":"レベルが足りません。","ExtracterNoExtractLabel":"条件を満たしておりません。","useExtractInfo":"false","ExtracterShowLotteryLabel":"[\"素材情報\",\"抽選確率\",\"%\"]","ExtracterEarnLabelIcons":"208","ExtracterEarnLabels":"[\"獲得素材\",\"x\"]","ExtracterEarnMode":"false","ExtracterResultLabelIcons":"210","ExtracterResultLabels":"[\"成功率\",\"%\",\"Exp\",\"成功!\",\"失敗…\"]","MapLvlerSetup":"","LvlerTitleLabels":"[\"Lv.\",\"→\",\"レベルアップ！\"]","LvlerMaxLvlNameLabels":"の称号を獲得しました！","LvlerNewRecipeLabelIcons":"193","LvlerNewRecipeLabels":"[\"新レシピ情報\",\"新レシピを習得しました！\"]","MenuCatergoryTitleSetup":"","MenuCategoryTitleLabels":"[\"Lv.\",\"Exp.\",\"/\",\"Max\"]","MenuRecipeDataSetup":"","MenuRecipeDataLabels":"[\"レシピ Lv.\",\"入手 Exp.\",\"所持数:\"]","MenuRecipeDataPageLabels":"[\"レシピ情報\",\"レシピはありません。\",\"解体情報\",\"解体\",\"解体不可\",\"解体素材がありません。\"]","MenuRecipeDataPageKey":"{\"PageUpKey\":\"pageup\",\"PageDownKey\":\"pagedown\",\"PageChangeSound\":\"Book2\"}","MenuRecipeDataPageUpLabel":"{\"PageUpIcon\":\"187\",\"PageUpKeyLabel\":\":Q(LB)\"}","MenuRecipePageDownLabel":"{\"PageDownIcon\":\"189\",\"PageDownKeyLabel\":\"W(RB):\"}","MenuCreaterNumberSetup":"","MenuCreaterNumberLabels":"[\"何個作りますか？\",\"成功時\",\"失敗時\",\"素材を失います。\"]","MenuDisassemblyNumberLabels":"[\"何個解体しますか？\",\"失敗時\",\"獲得数が半減し、素材を失います。\"]","MenuItemCreateSetup":"","MenuItemCreateInfoIcons":"208","MenuItemCreateInfoLabels":"[\"完成品\",\"解体品\",\"素材を失いました…。\"]","MenuItemCreateGaugeLabels":"[\"成功率\",\"%\",\"成功!\",\"失敗…\",\"Exp\"]","MenuItemCreateNoCreaterMenu":"※このメニューからはnameを行うことができません。","alchemyOtherSounds":"","LvlUpSound":"Up3","ExtractUseItemSound":"Item3","ExtractSuccessSound":"Item3","ExtractFailedSound":"Down1"}
 * @desc MMO式採集合成システムの基本設定を行います。
 * 
 * @param CustamizeSettings
 * @text カスタマイズ設定
 * @type struct<AlchemyCustamizeSettings>
 * @default {"DefaultDesigns":"","WindowSets":"{\"UseAll\":\"true\",\"UseExtracter\":\"true\",\"UseLvler\":\"true\",\"UseData\":\"true\",\"UseCreaterNumber\":\"true\"}","ExtracterWindowSetup":"","ExtracterWindow":"{\"MainX\":\"0\",\"MainY\":\"0\",\"MapX\":\"0\",\"MapY\":\"0\",\"MainOpacity\":\"255\",\"MainBackOpacity\":\"192\",\"BackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","LvlerWindowSetup":"","LvlerWindow":"{\"MainX\":\"0\",\"MainY\":\"0\",\"MapX\":\"0\",\"MapY\":\"0\",\"MainOpacity\":\"255\",\"MainBackOpacity\":\"192\",\"BackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","MenuWindowSetup":"","MenuCatergoryTitleWindow":"{\"MainX\":\"0\",\"MainY\":\"0\",\"MainW\":\"0\",\"MainH\":\"0\",\"ExclusiveH\":\"0\",\"MainOpacity\":\"255\",\"MainBackOpacity\":\"192\"}","MenuCatergoryCommandWindow":"{\"MainX\":\"0\",\"MainY\":\"0\",\"MainW\":\"0\",\"MainH\":\"0\",\"MainOpacity\":\"0\",\"MainBackOpacity\":\"0\"}","MenuRecipeListCommandWindow":"{\"MainX\":\"0\",\"MainY\":\"0\",\"ExclusiveY\":\"0\",\"MainW\":\"0\",\"MainH\":\"0\",\"ExclusiveH\":\"0\",\"MainOpacity\":\"255\",\"MainBackOpacity\":\"192\"}","MenuRecipeDataWindow":"{\"MainX\":\"0\",\"MainY\":\"0\",\"ExclusiveY\":\"0\",\"MainW\":\"0\",\"MainH\":\"0\",\"ExclusiveH\":\"0\",\"MainOpacity\":\"255\",\"MainBackOpacity\":\"192\"}","MenuItemCreaterWindow":"{\"MainX\":\"0\",\"MainY\":\"0\",\"MainW\":\"0\",\"MainH\":\"0\",\"MainOpacity\":\"255\",\"MainBackOpacity\":\"192\"}","MenuCreaterNumberWindow":"{\"MainX\":\"0\",\"MainY\":\"0\",\"MainW\":\"0\",\"MainH\":\"0\",\"MainOpacity\":\"255\",\"MainBackOpacity\":\"192\",\"BackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","MenuBgSetting":"{\"UsePicture\":\"false\",\"PictureFile\":\"\",\"PictureX\":\"0\",\"PictureY\":\"0\",\"PictureOpacity\":\"255\",\"PictureAnchor\":\"false\"}"}
 * @desc MMO式採集合成システムのウィンドウや背景画像導入など様々なカスタマイズ設定を行います。
 * 
 * @param CategoryDatabase
 * @text 採集/合成カテゴリー データベース
 * @type struct<AlchemyTypeSetups>[]
 * @default ["{\"AlchemyID\":\"extracter\",\"AlchemyIcon\":\"{\\\"AlchemyIconID\\\":\\\"135\\\"}\",\"AlchemyName\":\"採集\",\"CanLvl\":\"true\",\"MaxLvl\":\"255\",\"MaxLvlName\":\"国家採集師\",\"ExpMethod\":\"Math.floor(((lvl * 5) * 0.5) + 10)\",\"AlchemyMenuSetup\":\"{\\\"CanShowInAlchemyMenu\\\":\\\"true\\\",\\\"ShowAlchemySw\\\":\\\"\\\",\\\"ShowAlchemyVar\\\":\\\"\\\"}\",\"AlchemyOnlyInExclusiveScene\":\"false\",\"AlchemySE\":\"{\\\"ActiveSE\\\":\\\"Sword3\\\",\\\"ActivePlayDelay\\\":\\\"120\\\",\\\"CompleteSE\\\":\\\"Decision5\\\",\\\"FailedSE\\\":\\\"Sword7\\\"}\",\"NeedItemToAlchemy\":\"\",\"BackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","{\"AlchemyID\":\"processor\",\"AlchemyIcon\":\"{\\\"AlchemyIconID\\\":\\\"143\\\"}\",\"AlchemyName\":\"加工\",\"CanLvl\":\"true\",\"MaxLvl\":\"255\",\"MaxLvlName\":\"国家加工師\",\"ExpMethod\":\"Math.floor(((lvl * 5) * 0.5) + 10)\",\"AlchemyMenuSetup\":\"{\\\"CanShowInAlchemyMenu\\\":\\\"true\\\",\\\"ShowAlchemySw\\\":\\\"\\\",\\\"ShowAlchemyVar\\\":\\\"\\\"}\",\"AlchemyOnlyInExclusiveScene\":\"false\",\"AlchemySE\":\"{\\\"ActiveSE\\\":\\\"Equip3\\\",\\\"ActivePlayDelay\\\":\\\"60\\\",\\\"CompleteSE\\\":\\\"Absorb2\\\",\\\"FailedSE\\\":\\\"Break\\\"}\",\"NeedItemToAlchemy\":\"\",\"BackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","{\"AlchemyID\":\"cook\",\"AlchemyIcon\":\"{\\\"AlchemyIconID\\\":\\\"64\\\"}\",\"AlchemyName\":\"料理\",\"CanLvl\":\"true\",\"MaxLvl\":\"255\",\"MaxLvlName\":\"国家料理人\",\"ExpMethod\":\"Math.floor(((lvl * 5) * 0.5) + 10)\",\"AlchemyMenuSetup\":\"{\\\"CanShowInAlchemyMenu\\\":\\\"true\\\",\\\"ShowAlchemySw\\\":\\\"\\\",\\\"ShowAlchemyVar\\\":\\\"\\\"}\",\"AlchemyOnlyInExclusiveScene\":\"true\",\"AlchemySE\":\"{\\\"ActiveSE\\\":\\\"Fire2\\\",\\\"ActivePlayDelay\\\":\\\"120\\\",\\\"CompleteSE\\\":\\\"Item1\\\",\\\"FailedSE\\\":\\\"Fire9\\\"}\",\"NeedItemToAlchemy\":\"{\\\"NeedItem\\\":\\\"[\\\\\\\"30\\\\\\\"]\\\",\\\"NeedWeapon\\\":\\\"\\\",\\\"NeedArmor\\\":\\\"\\\"}\",\"BackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","{\"AlchemyID\":\"alchemy\",\"AlchemyIcon\":\"{\\\"AlchemyIconID\\\":\\\"176\\\"}\",\"AlchemyName\":\"錬金\",\"CanLvl\":\"true\",\"MaxLvl\":\"255\",\"MaxLvlName\":\"国家錬金術師\",\"ExpMethod\":\"Math.floor(((lvl * 5) * 0.5) + 10)\",\"AlchemyMenuSetup\":\"{\\\"CanShowInAlchemyMenu\\\":\\\"true\\\",\\\"ShowAlchemySw\\\":\\\"\\\",\\\"ShowAlchemyVar\\\":\\\"\\\"}\",\"AlchemyOnlyInExclusiveScene\":\"true\",\"AlchemySE\":\"{\\\"ActiveSE\\\":\\\"Water2\\\",\\\"ActivePlayDelay\\\":\\\"120\\\",\\\"CompleteSE\\\":\\\"Barrier\\\",\\\"FailedSE\\\":\\\"Break\\\"}\",\"NeedItemToAlchemy\":\"{\\\"NeedItem\\\":\\\"[\\\\\\\"46\\\\\\\"]\\\",\\\"NeedWeapon\\\":\\\"\\\",\\\"NeedArmor\\\":\\\"\\\"}\",\"BackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","{\"AlchemyID\":\"smith\",\"AlchemyIcon\":\"{\\\"AlchemyIconID\\\":\\\"223\\\"}\",\"AlchemyName\":\"鍛冶\",\"CanLvl\":\"true\",\"MaxLvl\":\"255\",\"MaxLvlName\":\"国家鍛冶師\",\"ExpMethod\":\"Math.floor(((lvl * 5) * 0.5) + 10)\",\"AlchemyMenuSetup\":\"{\\\"CanShowInAlchemyMenu\\\":\\\"true\\\",\\\"ShowAlchemySw\\\":\\\"\\\",\\\"ShowAlchemyVar\\\":\\\"\\\"}\",\"AlchemyOnlyInExclusiveScene\":\"true\",\"AlchemySE\":\"{\\\"ActiveSE\\\":\\\"Bell2\\\",\\\"ActivePlayDelay\\\":\\\"120\\\",\\\"CompleteSE\\\":\\\"Absorb2\\\",\\\"FailedSE\\\":\\\"Break\\\"}\",\"NeedItemToAlchemy\":\"{\\\"NeedItem\\\":\\\"[\\\\\\\"61\\\\\\\"]\\\",\\\"NeedWeapon\\\":\\\"\\\",\\\"NeedArmor\\\":\\\"\\\"}\",\"BackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","{\"AlchemyID\":\"sewing\",\"AlchemyIcon\":\"{\\\"AlchemyIconID\\\":\\\"135\\\"}\",\"AlchemyName\":\"裁縫\",\"CanLvl\":\"true\",\"MaxLvl\":\"255\",\"MaxLvlName\":\"国家裁縫師\",\"ExpMethod\":\"Math.floor(((lvl * 5) * 0.5) + 10)\",\"AlchemyMenuSetup\":\"{\\\"CanShowInAlchemyMenu\\\":\\\"true\\\",\\\"ShowAlchemySw\\\":\\\"\\\",\\\"ShowAlchemyVar\\\":\\\"\\\"}\",\"AlchemyOnlyInExclusiveScene\":\"true\",\"AlchemySE\":\"{\\\"ActiveSE\\\":\\\"Sand\\\",\\\"ActivePlayDelay\\\":\\\"120\\\",\\\"CompleteSE\\\":\\\"Item3\\\",\\\"FailedSE\\\":\\\"Break\\\"}\",\"NeedItemToAlchemy\":\"{\\\"NeedItem\\\":\\\"[\\\\\\\"71\\\\\\\"]\\\",\\\"NeedWeapon\\\":\\\"\\\",\\\"NeedArmor\\\":\\\"\\\"}\",\"BackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","{\"AlchemyID\":\"fishing\",\"AlchemyIcon\":\"{\\\"AlchemyIconID\\\":\\\"260\\\"}\",\"AlchemyName\":\"漁\",\"CanLvl\":\"true\",\"MaxLvl\":\"255\",\"MaxLvlName\":\"国家漁師\",\"ExpMethod\":\"Math.floor(((lvl * 5) * 0.5) + 10)\",\"AlchemyMenuSetup\":\"{\\\"CanShowInAlchemyMenu\\\":\\\"true\\\",\\\"ShowAlchemySw\\\":\\\"\\\",\\\"ShowAlchemyVar\\\":\\\"\\\"}\",\"AlchemyOnlyInExclusiveScene\":\"false\",\"AlchemySE\":\"{\\\"ActiveSE\\\":\\\"Equip2\\\",\\\"ActivePlayDelay\\\":\\\"120\\\",\\\"CompleteSE\\\":\\\"Absorb2\\\",\\\"FailedSE\\\":\\\"Break\\\"}\",\"NeedItemToAlchemy\":\"{\\\"NeedItem\\\":\\\"[\\\\\\\"53\\\\\\\"]\\\",\\\"NeedWeapon\\\":\\\"\\\",\\\"NeedArmor\\\":\\\"\\\"}\",\"BackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}"]
 * @desc 採集/合成カテゴリーの新規作成・編集・削除を行います。
 * 
 * @param RecipeDatabase
 * @text 合成/解体レシピ データベース
 * @type struct<RecipeTableDatabase>[]
 * @default ["{\"TargetAlchemyID\":\"cook\",\"RecipeID\":\"bread01\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"60\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"33\\\",\\\"FailedItem\\\":\\\"34\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"5\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"4\"}","{\"TargetAlchemyID\":\"cook\",\"RecipeID\":\"soup01\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"5\",\"CreateSpeed\":\"1.5\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"31\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"Rand(1:3)\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"13\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"3\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"34\"}","{\"TargetAlchemyID\":\"cook\",\"RecipeID\":\"spagette01\",\"LearnType\":\"fromItem\",\"LearnLvl\":\"8\",\"CreateSpeed\":\"1.5\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"32\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"Rand(1:3)\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"13\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"3\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"34\"}","{\"TargetAlchemyID\":\"processor\",\"RecipeID\":\"cookPod\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"30\\\",\\\"FailedItem\\\":\\\"12\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"25\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"10\"}","{\"TargetAlchemyID\":\"processor\",\"RecipeID\":\"mortar\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"46\\\",\\\"FailedItem\\\":\\\"12\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"25\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"10\"}","{\"TargetAlchemyID\":\"processor\",\"RecipeID\":\"smithHummer\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"61\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"15\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"43\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"10\"}","{\"TargetAlchemyID\":\"processor\",\"RecipeID\":\"iceAxe\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"42\\\",\\\"FailedItem\\\":\\\"12\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"15\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"43\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"10\"}","{\"TargetAlchemyID\":\"processor\",\"RecipeID\":\"fishRod\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"53\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"15\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"43\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"10\"}","{\"TargetAlchemyID\":\"extracter\",\"RecipeID\":\"logBreaker\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"43\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"10\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"15\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"6\"}","{\"TargetAlchemyID\":\"extracter\",\"RecipeID\":\"logBreaker2\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"19\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"20\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"15\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"6\"}","{\"TargetAlchemyID\":\"extracter\",\"RecipeID\":\"sewingThread\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"71\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"19\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"30\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"6\"}","{\"TargetAlchemyID\":\"extracter\",\"RecipeID\":\"cloth\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"72\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"10\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"19\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"30\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"6\"}","{\"TargetAlchemyID\":\"extracter\",\"RecipeID\":\"onionSeed\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"5\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"26\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"10\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"9\"}","{\"TargetAlchemyID\":\"extracter\",\"RecipeID\":\"cabbageSeed\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"5\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"27\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"10\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"6\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"9\"}","{\"TargetAlchemyID\":\"extracter\",\"RecipeID\":\"grapeSeed\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"5\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"25\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"10\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"11\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"9\"}","{\"TargetAlchemyID\":\"extracter\",\"RecipeID\":\"carrotSeed\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"5\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"24\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"10\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"9\"}","{\"TargetAlchemyID\":\"alchemy\",\"RecipeID\":\"postion\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"47\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"RandMax(1:3:5)\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"14\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"3\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"4\"}","{\"TargetAlchemyID\":\"alchemy\",\"RecipeID\":\"magicWater\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"3\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"48\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"RandMax(1:3:5)\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"13\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"3\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"8\"}","{\"TargetAlchemyID\":\"alchemy\",\"RecipeID\":\"dispellHerbs\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"5\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"49\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"RandMax(1:3:5)\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"14\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"3\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"12\"}","{\"TargetAlchemyID\":\"alchemy\",\"RecipeID\":\"soseiItem\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"8\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Item\",\"TargetItem\":\"{\\\"EarnItem\\\":\\\"50\\\",\\\"FailedItem\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"RandMax(1:3:5)\\\"}\",\"TargetWeapon\":\"\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"17\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"3\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"9\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"17\"}","{\"TargetAlchemyID\":\"smith\",\"RecipeID\":\"sword\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Weapon\",\"TargetItem\":\"\",\"TargetWeapon\":\"{\\\"EarnWeapon\\\":\\\"1\\\",\\\"FailedWeapon\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"30\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"{\\\"CreateCostType\\\":\\\"gainMoney\\\",\\\"CostIcon\\\":\\\"{\\\\\\\"AlchemyIconID\\\\\\\":\\\\\\\"554\\\\\\\",\\\\\\\"AlchemyIconX\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"AlchemyIconY\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"CostVariable\\\":\\\"0\\\",\\\"CostAmount\\\":\\\"120\\\",\\\"CostUnit\\\":\\\"G\\\"}\",\"EarnExp\":\"4\"}","{\"TargetAlchemyID\":\"smith\",\"RecipeID\":\"axe\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Weapon\",\"TargetItem\":\"\",\"TargetWeapon\":\"{\\\"EarnWeapon\\\":\\\"2\\\",\\\"FailedWeapon\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"30\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"{\\\"CreateCostType\\\":\\\"gainMoney\\\",\\\"CostIcon\\\":\\\"{\\\\\\\"AlchemyIconID\\\\\\\":\\\\\\\"554\\\\\\\",\\\\\\\"AlchemyIconX\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"AlchemyIconY\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"CostVariable\\\":\\\"0\\\",\\\"CostAmount\\\":\\\"120\\\",\\\"CostUnit\\\":\\\"G\\\"}\",\"EarnExp\":\"4\"}","{\"TargetAlchemyID\":\"smith\",\"RecipeID\":\"wand\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Weapon\",\"TargetItem\":\"\",\"TargetWeapon\":\"{\\\"EarnWeapon\\\":\\\"3\\\",\\\"FailedWeapon\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"15\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"8\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"{\\\"CreateCostType\\\":\\\"gainMoney\\\",\\\"CostIcon\\\":\\\"{\\\\\\\"AlchemyIconID\\\\\\\":\\\\\\\"554\\\\\\\",\\\\\\\"AlchemyIconX\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"AlchemyIconY\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"CostVariable\\\":\\\"0\\\",\\\"CostAmount\\\":\\\"120\\\",\\\"CostUnit\\\":\\\"G\\\"}\",\"EarnExp\":\"4\"}","{\"TargetAlchemyID\":\"smith\",\"RecipeID\":\"bow\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Weapon\",\"TargetItem\":\"\",\"TargetWeapon\":\"{\\\"EarnWeapon\\\":\\\"4\\\",\\\"FailedWeapon\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"TargetArmor\":\"\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"15\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"8\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"{\\\"CreateCostType\\\":\\\"gainMoney\\\",\\\"CostIcon\\\":\\\"{\\\\\\\"AlchemyIconID\\\\\\\":\\\\\\\"554\\\\\\\",\\\\\\\"AlchemyIconX\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"AlchemyIconY\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"CostVariable\\\":\\\"0\\\",\\\"CostAmount\\\":\\\"120\\\",\\\"CostUnit\\\":\\\"G\\\"}\",\"EarnExp\":\"4\"}","{\"TargetAlchemyID\":\"smith\",\"RecipeID\":\"shield\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Armor\",\"TargetItem\":\"\",\"TargetWeapon\":\"\",\"TargetArmor\":\"{\\\"EarnArmor\\\":\\\"1\\\",\\\"FailedArmor\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"35\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"{\\\"CreateCostType\\\":\\\"gainMoney\\\",\\\"CostIcon\\\":\\\"{\\\\\\\"AlchemyIconID\\\\\\\":\\\\\\\"554\\\\\\\",\\\\\\\"AlchemyIconX\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"AlchemyIconY\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"CostVariable\\\":\\\"0\\\",\\\"CostAmount\\\":\\\"120\\\",\\\"CostUnit\\\":\\\"G\\\"}\",\"EarnExp\":\"4\"}","{\"TargetAlchemyID\":\"smith\",\"RecipeID\":\"ring\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Armor\",\"TargetItem\":\"\",\"TargetWeapon\":\"\",\"TargetArmor\":\"{\\\"EarnArmor\\\":\\\"4\\\",\\\"FailedArmor\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"35\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"{\\\"CreateCostType\\\":\\\"gainMoney\\\",\\\"CostIcon\\\":\\\"{\\\\\\\"AlchemyIconID\\\\\\\":\\\\\\\"554\\\\\\\",\\\\\\\"AlchemyIconX\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"AlchemyIconY\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"CostVariable\\\":\\\"0\\\",\\\"CostAmount\\\":\\\"120\\\",\\\"CostUnit\\\":\\\"G\\\"}\",\"EarnExp\":\"4\"}","{\"TargetAlchemyID\":\"sewing\",\"RecipeID\":\"hat\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Armor\",\"TargetItem\":\"\",\"TargetWeapon\":\"\",\"TargetArmor\":\"{\\\"EarnArmor\\\":\\\"2\\\",\\\"FailedArmor\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"10\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"72\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"10\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"4\"}","{\"TargetAlchemyID\":\"sewing\",\"RecipeID\":\"clothe\",\"LearnType\":\"fromLvl\",\"LearnLvl\":\"1\",\"CreateSpeed\":\"1.0\",\"SuccessChance\":\"80\",\"TargetWitchItem\":\"Armor\",\"TargetItem\":\"\",\"TargetWeapon\":\"\",\"TargetArmor\":\"{\\\"EarnArmor\\\":\\\"3\\\",\\\"FailedArmor\\\":\\\"\\\",\\\"EarnAmount\\\":\\\"1\\\"}\",\"CreateRecipes\":\"[\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"10\\\\\\\"}\\\",\\\"{\\\\\\\"RecipeWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"RecipeItem\\\\\\\":\\\\\\\"72\\\\\\\",\\\\\\\"RecipeWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RecipeArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"NeedAmount\\\\\\\":\\\\\\\"10\\\\\\\"}\\\"]\",\"DisassemblyRecipes\":\"\",\"CreateCostType\":\"\",\"DisassemblyCostType\":\"\",\"EarnExp\":\"4\"}"]
 * @desc 合成/解体レシピの新規作成・編集・削除を行います。作成/解体対象は、アイテム/武器/防具の一つを指定し、他をなしに指定。
 */

//=============================================================================
//  【ExtAlcGlobalSettings】
//=============================================================================

/*~struct~ExtAlcGlobalSettings:
 * @param Setup
 * @text 初期設定
 * 
 * @param MapExtracterSetup
 * @text 採集情報の設定
 * 
 * @param MapLvlerSetup
 * @text レベル情報の設定
 * 
 * @param MenuCatergoryTitleSetup
 * @text [合成メニュー] タイトルの設定
 * 
 * @param MenuRecipeDataSetup
 * @text [合成メニュー] レシピデータの設定
 * 
 * @param MenuCreaterNumberSetup
 * @text [合成メニュー] 合成数の設定
 * 
 * @param MenuItemCreateSetup
 * @text [合成メニュー] 合成状況の設定
 * 
 * @param alchemyOtherSounds
 * @text 各効果音の設定
 * 
 * @param MenuCommandInformation
 * @text メニューに追加
 * @parent Setup
 * @type struct<AlchemyMenuCommandInfomation>
 * @default {"AddToMenuCommand":"true","AlchemyMenuCommandName":"合成/解体"}
 * @desc メニューに「合成/解体」コマンドを追加する。
 * 
 * @param FontName
 * @text 採集/合成関係全般のフォント書式名
 * @parent Setup
 * @type string
 * @desc 採集/合成全体で使用する書式名を記入します。未設定で使用しない。
 * 
 * @param ExtracterTitleLabels
 * @text タイトル時のレベル情報ラベル
 * @parent MapExtracterSetup
 * @type string[]
 * @default ["必要Lv.","Lv.","/","Exp:"]
 * @desc 採集ウィンドウのレベル情報ラベルを指定。1番 必要レベル、2番 現在のレベル単位、3番 現在値/最大値用、4番 現在の経験値単位
 * 
 * @param ExtracterHasNotLabel
 * @text 所持済み未所持のラベル
 * @parent MapExtracterSetup
 * @type string[]
 * @default ["[所持済み]","[未所持]"]
 * @desc 採集ウィンドウの必要アイテムを所持済みか未所持かを表すラベルを指定します。1番 所持中時、2番 未所持時
 * 
 * @param ExtracterNotReadyLabel
 * @text 必要なアイテム数が不足時のラベル
 * @parent MapExtracterSetup
 * @type string
 * @default [不足] 
 * @desc 採集ウィンドウの表示される必要なアイテム数が不足時のラベルを指定します。
 * 
 * @param ExtracterAmountLabel
 * @text 個数を表すラベル
 * @parent MapExtracterSetup
 * @type string
 * @default 個
 * @desc 採集ウィンドウの表示される個数を表すラベルを指定します。
 * 
 * @param ExtracterLvlNotOKLabel
 * @text 採集レベルが不足している時のラベル
 * @parent MapExtracterSetup
 * @type string
 * @default レベルが足りません。
 * @desc 採集ウィンドウの採集レベルが不足している時のラベルを指定します。
 * 
 * @param ExtracterNoExtractLabel
 * @text 採集条件を満たしていないラベル
 * @parent MapExtracterSetup
 * @type string
 * @default 条件を満たしておりません。
 * @desc 採集ウィンドウの採集条件を満たしていない時のラベルを指定します。
 * 
 * @param useExtractInfo
 * @text 採集獲得素材情報の表示
 * @parent MapExtracterSetup
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default false
 * @desc 採集対象の獲得素材情報を表示する/しないを指定します。※ゲーム内で切り替え可能。
 * 
 * @param ExtracterShowLotteryLabel
 * @text 抽選確率表示時のラベル
 * @parent MapExtracterSetup
 * @type string[]
 * @default ["素材情報","抽選確率","%"]
 * @desc 採集ウィンドウの抽選確率表示時のラベルを指定します。1番 素材情報、2番 抽選確率名、3番 確率単位
 * 
 * @param ExtracterEarnLabelIcons
 * @text 獲得素材ラベルアイコン
 * @parent MapExtracterSetup
 * @type number
 * @default 208
 * @desc 獲得素材のラベル用アイコンを指定。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param ExtracterEarnLabels
 * @text 獲得素材表示時のラベル
 * @parent MapExtracterSetup
 * @type string[]
 * @default ["獲得素材","x"]
 * @desc 採集ウィンドウの獲得素材表示時のラベルを指定します。1番 獲得素材、2番 獲得数単位
 * 
 * @param ExtracterEarnMode
 * @text 獲得素材名表示モード
 * @parent MapExtracterSetup
 * @type boolean
 * @on 獲得素材名を表示する
 * @off 獲得素材名を表示しない
 * @default false
 * @desc 採集獲得時、アイコン+素材名を表示する場合は縦方向にリストします。表示しない場合は通常アイコンリストモードになります。
 * 
 * @param ExtracterResultLabelIcons
 * @text 入手確率ラベルアイコン
 * @parent MapExtracterSetup
 * @type number
 * @default 210
 * @desc 採集ウィンドウの入手確率のラベル用アイコンを指定。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param ExtracterResultLabels
 * @text 入手確率表示時のラベル
 * @parent MapExtracterSetup
 * @type string[]
 * @default ["成功率","%","Exp","成功!","失敗…"]
 * @desc 採集ウィンドウの入手確率表示時のラベルを指定。1番 成功率、2番 成功率単位、3番 経験値単位、4番 成功時、5番 失敗時
 * 
 * @param LvlerTitleLabels
 * @text レベルアップ情報のラベル
 * @parent MapLvlerSetup
 * @type string[]
 * @default ["Lv.","→","レベルアップ！"]
 * @desc レベラーウィンドウのレベルアップ情報ラベルを指定。1番 レベル単位、2番 変化記号、3番 レベルアップ
 * 
 * @param LvlerMaxLvlNameLabels
 * @text 最大レベル時の称号獲得ラベル
 * @parent MapLvlerSetup
 * @type string
 * @default の称号を獲得しました！
 * @desc レベラーウィンドウの最大レベル時の称号獲得ラベルを指定。
 * 
 * @param LvlerNewRecipeLabelIcons
 * @text 新レシピ習得時のラベルアイコン
 * @parent MapLvlerSetup
 * @type number
 * @default 193
 * @desc 獲得素材のラベル用アイコンを指定。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param LvlerNewRecipeLabels
 * @text 新レシピ習得時のラベル
 * @parent MapLvlerSetup
 * @type string[]
 * @default ["新レシピ情報","新レシピを習得しました！"]
 * @desc レベラーウィンドウの新レシピ習得時のラベルを指定。1番 新レシピ情報、2番 獲得文章
 * 
 * @param MenuCategoryTitleLabels
 * @text 合成メニュータイトルのラベル
 * @parent MenuCatergoryTitleSetup
 * @type string[]
 * @default ["Lv.","Exp.","/","Max"]
 * @desc 合成メニュータイトルのラベルを指定。1番 レベル単位、2番 経験値単位、3番 現在値/最大値用、4番 経験値最大時
 * 
 * @param MenuRecipeDataLabels
 * @text レシピデータのラベル
 * @parent MenuRecipeDataSetup
 * @type string[]
 * @default ["レシピ Lv.","入手 Exp.","所持数:"]
 * @desc レシピデータのラベルを指定。1番 レシピレベル単位、2番 経験値単位、3番 所持数
 * 
 * @param MenuRecipeDataPageLabels
 * @text レシピページのラベル
 * @parent MenuRecipeDataSetup
 * @type string[]
 * @default ["レシピ情報","レシピはありません。","解体情報","解体","解体不可","解体素材がありません。"]
 * @desc 1番 レシピ情報、2番 レシピ未設定時、3番 解体情報、4番 解体Pへ、5番 解体データ無し時、6番 解体コインのみある場合
 * 
 * @param MenuRecipeDataPageKey
 * @text ページめくりキーの設定
 * @parent MenuRecipeDataSetup
 * @type struct<RecipeDataPageKeySettings>
 * @default {"PageUpKey":"pageup","PageDownKey":"pagedown","PageChangeSound":"Book2"}
 * @desc レシピ詳細内容のページをめくるキーと音の設定
 * 
 * @param MenuRecipeDataPageUpLabel
 * @text ページ前送りキーのラベル設定
 * @parent MenuRecipeDataSetup
 * @type struct<RecipeDataPageUpLabelSetup>
 * @default {"PageUpIcon":"187","PageUpKeyLabel":":Q(LB)"}
 * @desc レシピ詳細画面のページ前送りキーの表示設定。
 * 
 * @param MenuRecipePageDownLabel
 * @text ページ先送りキーのラベル設定
 * @parent MenuRecipeDataSetup
 * @type struct<RecipeDataPageDownLabelSetup>
 * @default {"PageDownIcon":"189","PageDownKeyLabel":"W(RB):"}
 * @desc レシピ詳細画面のページ先送りキーの表示設定。
 * 
 * @param MenuCreaterNumberLabels
 * @text 合成メニュー合成時のラベル
 * @parent MenuCreaterNumberSetup
 * @type string[]
 * @default ["何個作りますか？","成功時","失敗時","素材を失います。"]
 * @desc 1番 個数尋ねる用、2番 成功時、3番 失敗時、4番 失敗時の状況
 * 
 * @param MenuDisassemblyNumberLabels
 * @text 合成メニュー解体時のラベル
 * @parent MenuCreaterNumberSetup
 * @type string[]
 * @default ["何個解体しますか？","失敗時","獲得数が半減し、素材を失います。"]
 * @desc 1番 個数尋ねる用、2番 失敗時、3番 失敗時の状況
 * 
 * @param MenuItemCreateInfoIcons
 * @text 獲得素材ラベルアイコン
 * @parent MenuItemCreateSetup
 * @type number
 * @default 208
 * @desc 獲得素材のラベル用アイコンを指定。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param MenuItemCreateInfoLabels
 * @text 合成メニュー合成結果系のラベル
 * @parent MenuItemCreateSetup
 * @type string[]
 * @default ["完成品","解体品","素材を失いました…。"]
 * @desc 1番 完成品、2番 解体品、3番 失敗時の状況
 * 
 * @param MenuItemCreateGaugeLabels
 * @text 合成メニュー合成ゲージ系のラベル
 * @parent MenuItemCreateSetup
 * @type string[]
 * @default ["成功率","%","成功!","失敗…","Exp"]
 * @desc 1番 成功率、2番 率単位、3番 成功時の結果、4番 失敗時の結果、5番 経験値単位
 * 
 * @param MenuItemCreateNoCreaterMenu
 * @text 専用画面限定の合成対象時文章
 * @parent MenuItemCreateSetup
 * @type string
 * @default ※このメニューからはnameを行うことができません。
 * @desc 合成メニュー時に専用画面限定の合成対象時に表示する文章。name:合成カテゴリー名
 * 
 * @param LvlUpSound
 * @text レベルアップ効果音
 * @parent alchemyOtherSounds
 * @type file
 * @dir audio/se
 * @default Up3
 * @desc 再生する効果音を指定します。
 * 
 * @param ExtractUseItemSound
 * @text 採集種植え完了効果音
 * @parent alchemyOtherSounds
 * @type file
 * @dir audio/se
 * @default Item3
 * @desc 再生する効果音を指定します。
 * 
 * @param ExtractSuccessSound
 * @text 採集成功効果音
 * @parent alchemyOtherSounds
 * @type file
 * @dir audio/se
 * @default Item3
 * @desc 再生する効果音を指定します。
 * 
 * @param ExtractFailedSound
 * @text 採集失敗効果音
 * @parent alchemyOtherSounds
 * @type file
 * @dir audio/se
 * @default Down1
 * @desc 再生する効果音を指定します。
 */

/*~struct~AlchemyTypeSetups:
 * @param AlchemyID
 * @text 採集/合成ID
 * @type string
 * @desc 半角英数字で合成IDを指定します。例:料理なら cook、鍛冶なら smith、錬金なら alchemyなど。専用画面時のコール名にも使用。
 * 
 * @param AlchemyIcon
 * @text 採集/合成アイコン
 * @type struct<AlcCategoryIcon>
 * @desc この採集/合成のアイコンを指定します。
 * 
 * @param AlchemyName
 * @text 採集/合成名
 * @type string
 * @desc 合成/解体メニューなどで表示する採集/合成カテゴリー名を指定します。例:料理・鍛冶・錬金・釣り・伐採・採集など。
 * 
 * @param CanLvl
 * @text レベル概念の有無
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @desc この採集/合成カテゴリーにレベル概念の有効/無効を指定します。
 * 
 * @param MaxLvl
 * @text 最大レベル
 * @type number
 * @min 1
 * @default 255
 * @desc この採集/合成カテゴリーの最大レベルを指定します。
 * 
 * @param MaxLvlName
 * @text レベル最大時の称号名
 * @type string
 * @default マスター合成師
 * @desc この採集/合成カテゴリーのレベル最大時に獲得する称号名を指定します。
 * 
 * @param ExpMethod
 * @text 次の経験値計算式
 * @type string
 * @default Math.floor(((lvl * 5) * 0.5) + 10)
 * @desc 次に必要な経験値の計算式を指定。現在レベル:lvl 四捨五入:Math.round() 切り上げ:Math.ceil() 切り捨て:Math.floor()
 * 
 * @param AlchemyMenuSetup
 * @text 合成メニューへの追加
 * @type struct<AlcMenuAddSetup>
 * @default {"CanShowInAlchemyMenu":"true","ShowAlchemySw":"","ShowAlchemyVar":"","EnableAlchemySw":"","EnableAlchemyVar":""}
 * @desc この採集/合成カテゴリーを合成/解体メニューリストに追加するか指定。※メインメニューではありません。
 * 
 * @param AlchemyOnlyInExclusiveScene
 * @text 専用画面時合成モード
 * @type boolean
 * @on 専用画面時のみ合成可能
 * @off どこでも合成可能
 * @default false
 * @desc true時は、合成/解体メニュー内では該当レシピを見るだけになり、専用画面中にのみ合成可能になります。
 * 
 * @param AlchemySE
 * @text 合成メニューでの合成SE
 * @type struct<AlcActiveSeSetup>
 * @desc 合成/解体メニューまたは専用画面中に再生するSEを指定します。
 * 
 * @param NeedItemToAlchemy
 * @text ライセンス設定
 * @type struct<AlcNeedsSetup>
 * @desc この採集/合成カテゴリーを使用するのに必要な条件設定。装備中も判定。合成資格の用途で用意しました。未指定で使用しない。
 * 
 * @param BackImg
 * @text 専用画面時のレイアウト画像
 * @type struct<ImgSetup>
 * @default {"UsePicture":"false","PictureFile":"","PictureX":"0","PictureY":"0","PictureOpacity":"255","PictureAnchor":"false"}
 * @desc 専用画面時の画像を追加します。
 */

/*~struct~AlcCategoryIcon:
 * @param AlchemyIconID
 * @text アイコン
 * @type number
 * @min -1
 * @default -1
 * @desc アイコンindex番号を指定。-1で非表示。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 */

/*~struct~AlcNeedsSetup:
 * @param NeedItem
 * @text ライセンスアイテム
 * @type item[]
 * @desc 合成に必要な消費しないアイテムを指定します。※このプラグインから消費しないだけです。
 * 
 * @param NeedWeapon
 * @text ライセンス武器
 * @type weapon[]
 * @desc 合成に必要な消費しない武器を指定します。※このプラグインから消費しないだけです。
 * 
 * @param NeedArmor
 * @text ライセンス防具
 * @type armor[]
 * @desc 合成に必要な消費しない防具を指定します。※このプラグインから消費しないだけです。
 */

/*~struct~AlcSwSetup:
 * @param SwID
 * @text スイッチID
 * @type switch
 * @desc スイッチ操作を行うスイッチID。
 * 
 * @param SwBoolean
 * @text スイッチ状態
 * @type boolean
 * @desc true/falseを指定します。
 */

/*~struct~AlcValSetup:
 * @param Val
 * @text 変数
 * @type variable
 * @desc 変数状態を比較する変数ID。
 * 
 * @param ValCondition
 * @text 条件
 * @type select
 * @option より上、超
 * @value mt
 * @option 以上
 * @value imt
 * @option より下、未満
 * @value lt
 * @option 以下
 * @value ilt
 * @option 丁度
 * @value just
 * @option 文字列比較
 * @value stringcheck
 * @default stringcheck
 * @desc 変数をどのような条件で判定するか指定。文字列を扱う場合、必ず文字列比較にしてください。
 * 
 * @param ValValue
 * @text 値の状態
 * @type string
 * @desc 比較する変数の値。文字を扱う場合、''(シングルクォート)で囲ってください。
 */

/*~struct~AlcActiveSeSetup:
 * @param ActiveSE
 * @text 合成SE
 * @type file
 * @dir audio/se
 * @default Bell2
 * @desc 合成中に再生するSEを指定します。
 * 
 * @param ActivePlayDelay
 * @text 合成SEの再生ループ間隔
 * @type number
 * @min 0
 * @default 120
 * @desc 一度再生後、何フレーム後に再度再生するか指定します。
 * 
 * @param CompleteSE
 * @text 成功時SE
 * @type file
 * @dir audio/se
 * @default Absorb2
 * @desc 合成成功時に再生するSEを指定します。
 * 
 * @param FailedSE
 * @text 失敗時SE
 * @type file
 * @dir audio/se
 * @default Break
 * @desc 合成失敗時に再生するSEを指定します。
 */

/*~struct~AlcMenuAddSetup:
 * @param CanShowInAlchemyMenu
 * @text 合成/解体メニューへの追加
 * @type boolean
 * @on 追加する
 * @off 追加しない
 * @default true
 * @desc この採集/合成カテゴリーを合成/解体リストに追加するか、専用画面として呼び出すかを指定します。
 * 
 * @param ShowAlchemySw
 * @text リスト表示判定スイッチ
 * @type struct<AlcSwSetup>
 * @desc この採集/合成カテゴリーが合成/解体リストに表示されるかの有無を指定するスイッチを指定します。常時表示はなしを指定。
 * 
 * @param ShowAlchemyVar
 * @text リスト表示判定変数
 * @type struct<AlcValSetup>
 * @desc この採集/合成カテゴリーが合成/解体リストに表示されるかの有無を変数の状態から指定します。常時表示はなしを指定。
 */

/*~struct~RecipeTableDatabase:
 * @param TargetAlchemyID
 * @text 対象採集/合成ID
 * @type string
 * @desc このレシピが紐付けされる採集/合成IDを指定します。紐づけ先は、採集/合成カテゴリー データベース > 採集/合成ID です。
 * 
 * @param RecipeID
 * @text レシピID
 * @type string
 * @default Recipe001
 * @desc 半角英数字で他のレシピIDと被らないレシピIDを指定します。例:cookNote1、finalSwordなど。
 * 
 * @param LearnType
 * @text レシピ習得タイプ
 * @type select
 * @option アイテムから習得(レベル概念有効時、習得レベル以上でアイテム使用可)
 * @value fromItem
 * @option レベル達成時
 * @value fromLvl
 * @default fromItem
 * @desc レシピ習得タイプを指定します。対象採集/合成カテゴリーのレベル概念が無効の場合は、アイテムから習得が強制指定されます。
 * 
 * @param LearnLvl
 * @text 習得レベル
 * @type number
 * @min 1
 * @default 1
 * @desc 習得可能レベルを指定。※レベル概念有効時、習得タイプ[アイテムから習得]時は、アイテム使用も考慮。
 * 
 * @param CreateSpeed
 * @text 合成/解体速度
 * @type string
 * @min 1.0
 * @default 1.0
 * @desc 合成/解体速度を指定。※レベル概念有効時、習得レベルと採集/合成レベルを元に10差以上で速度が10倍早まり、無効時は変化無し。
 * 
 * @param SuccessChance
 * @text 合成/解体成功率
 * @type number
 * @min 0
 * @max 100
 * @default 80
 * @desc 合成/解体率を指定。※レベル概念有効時、習得レベルと採集/合成レベルを元に10差以上で成功率が100%化し、無効時は変化無し。
 * 
 * @param TargetWitchItem
 * @text 作成/解体対象の種類
 * @type select
 * @option アイテム
 * @value Item
 * @option 武器
 * @value Weapon
 * @option 防具
 * @value Armor
 * @default Item
 * @desc 作成/解体対象のアイテムの種類を選択します。
 * 
 * @param TargetItem
 * @text 作成/解体対象のアイテム
 * @type struct<EarnItem>
 * @desc 作成/解体対象アイテムの種類に基づいてアイテムを指定します。
 * 
 * @param TargetWeapon
 * @text 作成/解体対象の武器
 * @type struct<EarnWeapon>
 * @desc 作成/解体対象アイテムの種類に基づいて武器を指定します。
 * 
 * @param TargetArmor
 * @text 作成/解体対象の防具
 * @type struct<EarnArmor>
 * @desc 作成/解体対象アイテムの種類に基づいて防具を指定します。
 * 
 * @param CreateRecipes
 * @text 合成レシピ
 * @type struct<CreateRecipe>[]
 * @desc アイテム/武器/防具の中から一つだけ指定し、他はなしに指定してください。未指定で合成不可。
 * 
 * @param DisassemblyRecipes
 * @text 解体レシピ
 * @type struct<CreateRecipe>[]
 * @desc アイテム/武器/防具の中から一つだけ指定し、他はなしに指定してください。未指定で解体不可。
 * 
 * @param CreateCostType
 * @text 合成時コストタイプ
 * @type struct<CostSetup>
 * @desc 合成時コストタイプを指定します。未指定で使用しない。
 * 
 * @param DisassemblyCostType
 * @text 解体時コストタイプ
 * @type struct<CostSetup>
 * @desc 解体時コストタイプを指定します。未指定で使用しない。
 * 
 * @param EarnExp
 * @text 合成時獲得経験値
 * @type number
 * @min 0
 * @default 0
 * @desc 獲得経験値を指定。※習得レベルから合成レベル10差を上限に差分値で獲得量が減少。10指定時で10差あると以降の獲得量が0化。
 */

/*~struct~EarnItem:
 * @param EarnItem
 * @text 成功時アイテム
 * @type item
 * @desc 成功時の合成アイテムを指定します。
 * 
 * @param FailedItem
 * @text 失敗時アイテム
 * @type item
 * @desc 失敗時の合成アイテムを指定します。未指定でなにも獲得しない。
 * 
 * @param EarnAmount
 * @text 獲得数
 * @type string
 * @default 1
 * @desc 獲得数を指定。Rand(1:3)と指定すると、1～3の間でランダム入手し、さらにRandMax(1:3:5)とすると成功率100%時に5入手します。
 */

/*~struct~EarnWeapon:
 * @param EarnWeapon
 * @text 成功時武器
 * @type weapon
 * @desc 成功時の合成武器を指定します。
 * 
 * @param FailedWeapon
 * @text 失敗時武器
 * @type weapon
 * @desc 失敗時の合成武器を指定します。未指定でなにも獲得しない。
 * 
 * @param EarnAmount
 * @text 獲得数
 * @type string
 * @default 1
 * @desc 獲得数を指定。Rand(1:3)と指定すると、1～3の間でランダム入手し、さらにRandMax(1:3:5)とすると成功率100%時に5入手します。
 */

/*~struct~EarnArmor:
 * @param EarnArmor
 * @text 成功時防具
 * @type Armor
 * @desc 合成防具を指定します。
 * 
 * @param FailedArmor
 * @text 失敗時防具
 * @type Armor
 * @desc 合成防具を指定します。未指定でなにも獲得しない。
 * 
 * @param EarnAmount
 * @text 獲得数
 * @type string
 * @default 1
 * @desc 獲得数を指定。Rand(1:3)と指定すると、1～3の間でランダム入手し、さらにRandMax(1:3:5)とすると成功率100%時に5入手します。
 */

/*~struct~CostSetup:
 * @param CreateCostType
 * @text コストタイプ
 * @type select
 * @option お金獲得
 * @value gainMoney
 * @option お金消費
 * @value loseMoney
 * @option 変数加算
 * @value addVariable
 * @option 変数減算(0より下にはならず、足りなければ合成/解体不可になります)
 * @value subVariable
 * @default loseMoney
 * @desc コストタイプを指定します。
 * 
 * @param CostIcon
 * @text コストアイコン
 * @type struct<AlcCategoryIcon>
 * @desc コストのアイコンを指定します。
 * 
 * @param CostVariable
 * @text 変数ID
 * @type variable
 * @default 0
 * @desc コストタイプに基づく変数の加算/減算量の場合に対象変数IDを指定します。
 * 
 * @param CostAmount
 * @text コスト量
 * @type number
 * @min 1
 * @default 1
 * @desc コストタイプに基づくお金の獲得/消費、変数の加算/減算量を指定します。
 * 
 * @param CostUnit
 * @text コストの単位
 * @type string
 * @default G
 * @desc コストの単位を指定します。
 */

/*~struct~CreateRecipe:
 * @param RecipeWitchItem
 * @text 素材アイテムの種類
 * @type select
 * @option アイテム
 * @value Item
 * @option 武器
 * @value Weapon
 * @option 防具
 * @value Armor
 * @default Item
 * @desc 素材となるアイテムの種類を選択します。
 * 
 * @param RecipeItem
 * @text アイテム素材
 * @type item
 * @desc 素材アイテムの種類に基づいて素材となるアイテムを指定します。
 * 
 * @param RecipeWeapon
 * @text 武器素材
 * @type weapon
 * @desc 素材アイテムの種類に基づいて素材となる武器を指定します。
 * 
 * @param RecipeArmor
 * @text 防具素材
 * @type armor
 * @desc 素材アイテムの種類に基づいて素材となる防具を指定します。
 * 
 * @param NeedAmount
 * @text 必要/獲得数
 * @type number
 * @min 1
 * @default 1
 * @desc 対象素材の合成に必要な数を解体時は獲得数を指定します。
 */

/*~struct~RecipeDataPageUpLabelSetup:
 * @param PageUpIcon
 * @text 前送りアイコン
 * @type number
 * @min 0
 * @default 187
 * @desc 前送りアイコンを指定します。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param PageUpKeyLabel
 * @text 前送りキーのラベル設定
 * @type string
 * @default :Q(LB)
 * @desc 前送りキーの表示文になります。
 */

/*~struct~RecipeDataPageDownLabelSetup:
 * @param PageDownIcon
 * @text 先送りアイコン
 * @type number
 * @min 0
 * @default 189
 * @desc 先送りアイコンを指定します。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param PageDownKeyLabel
 * @text 先送りキーのラベル設定
 * @type string
 * @default W(RB):
 * @desc 先送りキーの表示文になります。
 */

/*~struct~RecipeDataPageKeySettings:
 * @param PageUpKey
 * @text 前送りキーの設定
 * @type select
 * @option Aキー
 * @value A
 * @option Bキー
 * @value B
 * @option Cキー
 * @value C
 * @option Dキー
 * @value D
 * @option Eキー
 * @value E
 * @option Fキー
 * @value F
 * @option Gキー
 * @value G
 * @option Hキー
 * @value H
 * @option Iキー
 * @value I
 * @option Jキー
 * @value J
 * @option Kキー
 * @value K
 * @option Lキー
 * @value L
 * @option Mキー
 * @value M
 * @option Nキー
 * @value N
 * @option Oキー
 * @value O
 * @option Pキー
 * @value P
 * @option Qキー
 * @value pageup
 * @option Rキー
 * @value R
 * @option Sキー
 * @value S
 * @option Tキー
 * @value T
 * @option Uキー
 * @value U
 * @option Vキー
 * @value V
 * @option Wキー
 * @value pagedown
 * @option Yキー
 * @value Y
 * @default pageup
 * @desc 合成/解体ページめくりの前送りのキーを指定します。
 * 
 * @param PageDownKey
 * @text 先送りキーの設定
 * @type select
 * @option Aキー
 * @value A
 * @option Bキー
 * @value B
 * @option Cキー
 * @value C
 * @option Dキー
 * @value D
 * @option Eキー
 * @value E
 * @option Fキー
 * @value F
 * @option Gキー
 * @value G
 * @option Hキー
 * @value H
 * @option Iキー
 * @value I
 * @option Jキー
 * @value J
 * @option Kキー
 * @value K
 * @option Lキー
 * @value L
 * @option Mキー
 * @value M
 * @option Nキー
 * @value N
 * @option Oキー
 * @value O
 * @option Pキー
 * @value P
 * @option Qキー
 * @value pageup
 * @option Rキー
 * @value R
 * @option Sキー
 * @value S
 * @option Tキー
 * @value T
 * @option Uキー
 * @value U
 * @option Vキー
 * @value V
 * @option Wキー
 * @value pagedown
 * @option Yキー
 * @value Y
 * @default pagedown
 * @desc 合成/解体ページめくりの先送りのキーを指定します。
 * 
 * @param PageChangeSound
 * @text ページめくり効果音の設定
 * @type file
 * @dir audio/se
 * @default Book2
 */

/*~struct~AlchemyMenuCommandInfomation:
 * @param AddToMenuCommand
 * @text メニューに追加
 * @type boolean
 * @on コマンドを追加する
 * @off コマンドを追加しない
 * @default true
 * @desc メニューに「合成/解体」コマンドを追加する。
 * 
 * @param AlchemyMenuCommandName
 * @text 合成/解体コマンド名
 * @type string
 * @default 合成/解体
 * @desc メニュー画面のコマンド追加時の名前になります。
 */

//=============================================================================
//  【AlchemyCustamizeSettings】
//=============================================================================

/*~struct~AlchemyCustamizeSettings:
 * @param DefaultDesigns
 * @text 簡易デザイン設定
 * 
 * @param ExtracterWindowSetup
 * @text 採集情報ウィンドウの設定
 * 
 * @param LvlerWindowSetup
 * @text レベル情報ウィンドウの設定
 * 
 * @param MenuWindowSetup
 * @text 合成メニューの設定
 * 
 * @param WindowSets
 * @text 使用ウィンドウ設定
 * @parent DefaultDesigns
 * @type struct<WinDesignSet>
 * @default {"DefaultDesigns":"","WindowSets":"{\"UseAll\":\"true\",\"UseExtracter\":\"true\",\"UseLvler\":\"true\",\"UseData\":\"true\",\"UseCreaterNumber\":\"true\"}","ExtracterWindowSetup":"","ExtracterWindow":"{\"MainOpacity\":\"255\",\"MainBackOpacity\":\"192\",\"BackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","LvlerWindowSetup":"","LvlerWindow":"{\"MainOpacity\":\"255\",\"MainBackOpacity\":\"192\",\"BackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}"}
 * @desc 簡易デザインを使用するウィンドウを指定します。
 * 
 * @param ExtracterWindow
 * @text 採集情報ウィンドウの設定
 * @parent ExtracterWindowSetup
 * @type struct<WindowSettings>
 * @default {"MainX":"0","MainY":"0","MapX":"0","MapY":"0","MainOpacity":"255","MainBackOpacity":"192","BackImg":"{\"UsePicture\":\"false\",\"PictureFile\":\"\",\"PictureX\":\"0\",\"PictureY\":\"0\",\"PictureOpacity\":\"255\",\"PictureAnchor\":\"false\"}"}
 * @desc 採集情報ウィンドウの設定を行います。
 * 
 * @param LvlerWindow
 * @text レベル情報ウィンドウの設定
 * @parent LvlerWindowSetup
 * @type struct<WindowSettings>
 * @default {"MainX":"0","MainY":"0","MapX":"0","MapY":"0","MainOpacity":"255","MainBackOpacity":"192","BackImg":"{\"UsePicture\":\"false\",\"PictureFile\":\"\",\"PictureX\":\"0\",\"PictureY\":\"0\",\"PictureOpacity\":\"255\",\"PictureAnchor\":\"false\"}"}
 * @desc 採集情報ウィンドウの設定を行います。
 * 
 * @param MenuCatergoryTitleWindow
 * @text 合成カテゴリータイトルウィンドウの設定
 * @parent MenuWindowSetup
 * @type struct<TitleSceneSettings>
 * @default {"MainX":"0","MainY":"0","MainW":"0","MainH":"0","ExclusiveH":"0","MainOpacity":"255","MainBackOpacity":"192"}
 * @desc 合成メニューの合成カテゴリータイトルウィンドウの設定を行います。※専用画面にも適応されます。
 * 
 * @param MenuCatergoryCommandWindow
 * @text 合成カテゴリーコマンドウィンドウの設定
 * @parent MenuWindowSetup
 * @type struct<SceneSettings>
 * @default {"MainX":"0","MainY":"0","MainW":"0","MainH":"0","MainOpacity":"0","MainBackOpacity":"0"}
 * @desc 合成メニューの合成カテゴリーコマンドウィンドウの設定を行います。※専用画面にはカテゴリーコマンドはありません。
 * 
 * @param MenuRecipeListCommandWindow
 * @text レシピリストコマンドウィンドウの設定
 * @parent MenuWindowSetup
 * @type struct<ChangeAbleSceneSettings>
 * @default {"MainX":"0","MainY":"0","ExclusiveY":"0","MainW":"0","MainH":"0","ExclusiveH":"0","MainOpacity":"255","MainBackOpacity":"192"}
 * @desc 合成メニューのレシピリストコマンドウィンドウの設定を行います。※専用画面にも適応されます。
 * 
 * @param MenuRecipeDataWindow
 * @text レシピ情報ウィンドウの設定
 * @parent MenuWindowSetup
 * @type struct<ChangeAbleSceneSettings>
 * @default {"MainX":"0","MainY":"0","ExclusiveY":"0","MainW":"0","MainH":"0","ExclusiveH":"0","MainOpacity":"255","MainBackOpacity":"192"}
 * @desc 合成メニューのレシピ情報ウィンドウの設定を行います。※専用画面にも適応されます。
 * 
 * @param MenuItemCreaterWindow
 * @text 合成情報ウィンドウの設定
 * @parent MenuWindowSetup
 * @type struct<SceneSettings>
 * @default {"MainX":"0","MainY":"0","MainW":"0","MainH":"0","MainOpacity":"255","MainBackOpacity":"192"}
 * @desc 合成メニューの合成情報ウィンドウの設定を行います。※専用画面にも適応されます。
 * 
 * @param MenuCreaterNumberWindow
 * @text 合成個数入力ウィンドウの設定
 * @parent MenuWindowSetup
 * @type struct<NumberWindowSettings>
 * @default {"MainX":"0","MainY":"0","MainW":"0","MainH":"0","MainOpacity":"255","MainBackOpacity":"192","BackImg":"{\"UsePicture\":\"false\",\"PictureFile\":\"\",\"PictureX\":\"0\",\"PictureY\":\"0\",\"PictureOpacity\":\"255\",\"PictureAnchor\":\"false\"}"}
 * @desc 合成メニューの合成個数入力ウィンドウの設定を行います。※専用画面にも適応されます。
 * 
 * @param MenuBgSetting
 * @text 合成メニュー用の背景
 * @parent MenuWindowSetup
 * @type struct<ImgSetup>
 * @default {"UsePicture":"false","PictureFile":"","PictureX":"0","PictureY":"0","PictureOpacity":"255","PictureAnchor":"false"}
 * @desc 合成メニューの背景画像の設定を行います。※専用画面には適応されません。
 */

/*~struct~SceneSettings:
 * @param MainX
 * @text ウィンドウのx座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在x座標からの調整値 (マイナス可)
 * 
 * @param MainY
 * @text ウィンドウのy座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在y座標からの調整値 (マイナス可)
 * 
 * @param MainW
 * @text ウィンドウの横幅
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在横幅からの調整値 (マイナス可)
 * 
 * @param MainH
 * @text ウィンドウの縦幅
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在縦幅からの調整値 (マイナス可)
 * 
 * @param MainOpacity
 * @text ウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc ウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param MainBackOpacity
 * @text ウィンドウの内背景の不透明度
 * @type string
 * @default 192
 * @desc ウィンドウ内背景の不透明度を指定します。0:192
 */

/*~struct~TitleSceneSettings:
 * @param MainX
 * @text ウィンドウのx座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在x座標からの調整値 (マイナス可)
 * 
 * @param MainY
 * @text ウィンドウのy座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在y座標からの調整値 (マイナス可)
 * 
 * @param MainW
 * @text ウィンドウの横幅
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在横幅からの調整値 (マイナス可)
 * 
 * @param MainH
 * @text [統合メニュー時]ウィンドウの縦幅
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在縦幅からの調整値 (マイナス可)
 * 
 * @param ExclusiveH
 * @text [専用画面時]ウィンドウの縦幅
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在縦幅からの調整値 (マイナス可)
 * 
 * @param MainOpacity
 * @text ウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc ウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param MainBackOpacity
 * @text ウィンドウの内背景の不透明度
 * @type string
 * @default 192
 * @desc ウィンドウ内背景の不透明度を指定します。0:192
 */

/*~struct~ChangeAbleSceneSettings:
 * @param MainX
 * @text ウィンドウのx座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在x座標からの調整値 (マイナス可)
 * 
 * @param MainY
 * @text [統合メニュー時]ウィンドウのy座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在y座標からの調整値 (マイナス可)
 * 
 * @param ExclusiveY
 * @text [専用画面時]ウィンドウのy座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在y座標からの調整値 (マイナス可)
 * 
 * @param MainW
 * @text ウィンドウの横幅
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在横幅からの調整値 (マイナス可)
 * 
 * @param MainH
 * @text [統合メニュー時]ウィンドウの縦幅
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在縦幅からの調整値 (マイナス可)
 * 
 * @param ExclusiveH
 * @text [専用画面時]ウィンドウの縦幅
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在縦幅からの調整値 (マイナス可)
 * 
 * @param MainOpacity
 * @text ウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc ウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param MainBackOpacity
 * @text ウィンドウの内背景の不透明度
 * @type string
 * @default 192
 * @desc ウィンドウ内背景の不透明度を指定します。0:192
 */

/*~struct~WindowSettings:
 * @param MainX
 * @text [合成画面時]ウィンドウのx座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在x座標からの調整値 (マイナス可)
 * 
 * @param MainY
 * @text [合成画面時]ウィンドウのy座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在y座標からの調整値 (マイナス可)
 * 
 * @param MapX
 * @text [マップ時]ウィンドウのx座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在x座標からの調整値 (マイナス可)
 * 
 * @param MapY
 * @text [マップ時]ウィンドウのy座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在y座標からの調整値 (マイナス可)
 * 
 * @param MainOpacity
 * @text ウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc ウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param MainBackOpacity
 * @text ウィンドウの内背景の不透明度
 * @type string
 * @default 192
 * @desc ウィンドウ内背景の不透明度を指定します。0:192
 * 
 * @param BackImg
 * @text 背景レイアウト画像
 * @type struct<ImgSetup>
 * @default {"UsePicture":"false","PictureFile":"","PictureX":"0","PictureY":"0","PictureOpacity":"255","PictureAnchor":"false"}
 * @desc 背景レイアウト画像を追加します。
 */

/*~struct~NumberWindowSettings:
 * @param MainX
 * @text ウィンドウのx座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在x座標からの調整値 (マイナス可)
 * 
 * @param MainY
 * @text ウィンドウのy座標
 * @type number
 * @min -999999999999999999999999
 * @default 0
 * @desc 現在y座標からの調整値 (マイナス可)
 * 
 * @param MainW
 * @text ウィンドウの横幅
 * @type number
 * @min 0
 * @default 0
 * @desc 現在横幅からの調整値 (マイナス不可)
 * 
 * @param MainH
 * @text ウィンドウの縦幅
 * @type number
 * @min 0
 * @default 0
 * @desc 現在縦幅からの調整値 (マイナス不可)
 * 
 * @param MainOpacity
 * @text ウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc ウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param MainBackOpacity
 * @text ウィンドウの内背景の不透明度
 * @type string
 * @default 192
 * @desc ウィンドウ内背景の不透明度を指定します。0:192
 * 
 * @param BackImg
 * @text 背景レイアウト画像
 * @type struct<ImgSetup>
 * @default {"UsePicture":"false","PictureFile":"","PictureX":"0","PictureY":"0","PictureOpacity":"255","PictureAnchor":"false"}
 * @desc 背景レイアウト画像を追加します。
 */

/*~struct~ImgSetup:
 * @param UsePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param PictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/extAlchemy
 * @desc ピクチャーファイルを設定します。
 * 
 * @param PictureX
 * @text ピクチャーのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのX座標を指定します。
 * 
 * @param PictureY
 * @text ピクチャーのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのY座標を指定します。
 * 
 * @param PictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param PictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */

/*~struct~WinDesignSet:
 * @param UseAll
 * @text デザインを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc 全体のデザイン使用フラグです。
 * 
 * @param UseExtracter
 * @text 採集情報ウィンドウで使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc 採集情報ウィンドウ個別使用フラグです。全体が使用中に限り、設定を反映します。
 * 
 * @param UseLvler
 * @text レベル情報ウィンドウで使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc レベル情報ウィンドウ個別使用フラグです。全体が使用中に限り、設定を反映します。
 * 
 * @param UseData
 * @text レシピ情報ウィンドウで使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc レシピ情報ウィンドウ個別使用フラグです。全体が使用中に限り、設定を反映します。
 * 
 * @param UseCreaterNumber
 * @text 合成個数指定ウィンドウで使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc 合成個数指定ウィンドウ個別使用フラグです。全体が使用中に限り、設定を反映します。
 */

//=============================================================================
//
// - プラグイン本体 - ここから下は変更禁止 -
//
//=============================================================================

//=============================================================================
// プラグイン 初期化
//=============================================================================

//プラグイン名の登録
var AyatamExtractAlchemyName = document.currentScript.src.match(/^.*\/(.+)\.js$/)[1];

//プラグインパラメータを登録
Ayatam.EXTRACTALCHEMYSYSTEM.Parameters = PluginManager.parameters(AyatamExtractAlchemyName);
//プラグインパラメータの文字列を配列に変換
Ayatam.EXTRACTALCHEMYSYSTEM.Parameters = JSON.parse(JSON.stringify(Ayatam.EXTRACTALCHEMYSYSTEM.Parameters,(key,value)=>{
    try{return JSON.parse(value);} catch (e) {}
    return value;
    }
));
//基本設定のショートカット
Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings = Ayatam.EXTRACTALCHEMYSYSTEM.Parameters.GlobalSettings;
// //カスタマイズ設定のショートカット
Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings = Ayatam.EXTRACTALCHEMYSYSTEM.Parameters.CustamizeSettings;
//採集/合成カテゴリーデータベースのショートカット
Ayatam.EXTRACTALCHEMYSYSTEM.CategoryDatabase = Ayatam.EXTRACTALCHEMYSYSTEM.Parameters.CategoryDatabase;
//合成/解体データベースのショートカット
Ayatam.EXTRACTALCHEMYSYSTEM.RecipeDatabase = Ayatam.EXTRACTALCHEMYSYSTEM.Parameters.RecipeDatabase;

//Game_Alchemyの定義
var $gameAlchemy = null;

//キーマッピングにキーを登録
//Input.keyMapper[CodeId] = 'CallKey';
//CodeId : キー番号
//CallKey : 呼び出し名 ''(シングルクォートで指定)
//【例】Aのキーコードは65なので、Input.keyMapper[65] = 'A'
//【例】Input.isTriggered('A') でAを判定させることが可能になります。
//※追加する際の注意、js/rpg_core.js の Input.keyMapper に予め登録されているキーがあるので、
//  登録されていないキーのみ登録します。コアverごとで変更がある可能性があるので追加前に確認推奨。
//=============================================================================
//キーリスト「アルファベット」      [数字]                [テンキー数字]
//  A => 65   K => 75   U => 85  |  0 => 48   6 => 54  |  T0 => 96   T6 => 102
//  B => 66   L => 76   V => 86  |  1 => 49   7 => 55  |  T1 => 97   T7 => 103
//  C => 67   M => 77   W => 87  |  2 => 50   8 => 56  |  T2 => 98   T8 => 104
//  D => 68   N => 78   X => 88  |  3 => 51   9 => 57  |  T3 => 99   T9 => 105
//  E => 69   O => 79   Y => 89  |  4 => 52            |  T4 => 100  
//  F => 70   P => 80   Z => 90  |  5 => 53            |  T5 => 101  
//  G => 71   Q => 81            |                     |
//  H => 72   R => 82            |                     |
//  I => 73   S => 83            |                     |
//  J => 74   T => 84            |                     |
//-----------------------------------------------------------------------------
//キーリスト「記号」                 [テンキー記号]   [ファンクションキー]
//  :* => 186   ^~ => 222   U => 85  |  T* => 106  |  F1 => 112   F7 => 118
//  ;+ => 187   ¥_ => 226   V => 86  |  T+ => 107  |  F2 => 113   F8 => 119
//  ,< => 188                        |  T- => 109  |  F3 => 114   F9 => 120
//  -= => 189                        |  T. => 110  |  F4 => 115   F10 => 121
//  .> => 190                        |  T/ => 111  |  F5 => 116   F11 => 122
//  /? => 191                        |             |  F6 => 117   F12 => 123
//  @` => 192                        |             |
//  [{ => 219                        |             |
//  ¥| => 220                        |             |
//  ]} => 221                        |             |
//-----------------------------------------------------------------------------
//キーリスト「制御キー」
//  BackSpace      => 8    PageUp   => 33   Win               => 91
//  NumLockOFFのT5 => 12   PageDown => 34   Apps              => 93
//  Enter/TEnter   => 13   End      => 35   NumLock           => 144
//  Shift          => 16   Home     => 36   ScrollLock        => 145
//  Ctrl           => 17   ←        => 37   英数              => 240
//  Alt            => 18   ↑        => 38   カタカナ/ひらがな => 242
//  Pause          => 19   →        => 39   Esc               => 243
//  変換           => 28   ↓        => 40   半角/全角         => 244
//  無変換         => 29   Insert   => 45   Tab               => 9
//  スペース       => 32   Delete   => 46
//=============================================================================

//ゲームパッドキーマッピングにキーを登録
//Input.gamepadMapper[CodeId] = 'CallKey';
//CodeId : キー番号
//CallKey : 呼び出し名 ''(シングルクォートで指定)
//【例】LBのキーコードは4なので、Input.gamepadMapper[4] = 'pageup'
//【例】Input.isTriggered('pageup') でLBを判定させることが可能になります。
//※追加する際の注意、js/rpg_core.js の Input.gamepadMapper に予め登録されているキーがあるので、
//  登録されていないキーのみ登録します。コアverごとで変更がある可能性があるので追加前に確認推奨。
//=============================================================================
//キーリスト「ゲームパッドキー」
//  A     => 0    L3 => 10
//  B     => 1    R3 => 11
//  X     => 2    ←  => 12
//  Y     => 3    ↑  => 13
//  LB    => 4    →  => 14
//  RB    => 5    ↓  => 15
//  LT    => 6   
//  RT    => 7   
//  back  => 8   
//  start => 9   
//=============================================================================

//=============================================================================
// ImageManager - MMO式採集合成システム専用画像フォルダ
//=============================================================================
ImageManager.loadExtAlchemy = function(filename, hue) {
    return this.loadBitmap('img/extAlchemy/', filename, hue, true);
};

//=============================================================================
// Game_Alchemy - 合成/解体オブジェクト
//=============================================================================

class Game_Alchemy {
    constructor() {
        this.initialize.apply(this, arguments);
    }
    //--------------------------------------------------------------------------
    // ● オブジェクト初期化
    //--------------------------------------------------------------------------
    initialize() {
        this._fiberYield = false;
        this._showExtractInfo = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.useExtractInfo;
        this._isExclusiveScene = "";
        this.setupKeyMappings();
        this.initializeRecipeCategory();
    }
    //--------------------------------------------------------------------------
    // ● 合成カテゴライズデータの初期化
    //--------------------------------------------------------------------------
    initializeRecipeCategory() {
        this._Data = [];
        var alchemyData = Ayatam.EXTRACTALCHEMYSYSTEM.CategoryDatabase;
        alchemyData.forEach(alchemyList => {
            if(alchemyList) {
                if(this._Data[alchemyList.AlchemyID] === undefined) {
                    var cMaxExp = 0;
                    if(alchemyList.CanLvl) { var lvl = 1; cMaxExp = eval(alchemyList.ExpMethod); };
                    var alchemy = { alchemyId: alchemyList.AlchemyID , name: alchemyList.AlchemyName , currentLvl: 1 , canLvl: alchemyList.CanLvl , maxLvl: alchemyList.MaxLvl , maxLvlName: alchemyList.MaxLvlName , currentExp: 0 , maxExp: cMaxExp, expMethod: alchemyList.ExpMethod , alchemyInExclusiveScene: alchemyList.AlchemyOnlyInExclusiveScene };
                    alchemy.alchemyIcon = { icon: alchemyList.AlchemyIcon.AlchemyIconID , x: alchemyList.AlchemyIcon.AlchemyIconX , y: alchemyList.AlchemyIcon.AlchemyIconY };
                    alchemy.alchemyMenu = { enableMenu: alchemyList.AlchemyMenuSetup.CanShowInAlchemyMenu , showSw: alchemyList.AlchemyMenuSetup.ShowAlchemySw , showVar: alchemyList.AlchemyMenuSetup.ShowAlchemyVar };
                    alchemy.se = { activeSE: alchemyList.AlchemySE.ActiveSE , activePlayDelay: alchemyList.AlchemySE.ActivePlayDelay , completeSE: alchemyList.AlchemySE.CompleteSE , failedSE: alchemyList.AlchemySE.FailedSE };
                    alchemy.needs = { items: alchemyList.NeedItemToAlchemy.NeedItem , weapons: alchemyList.NeedItemToAlchemy.NeedWeapon , armors: alchemyList.NeedItemToAlchemy.NeedArmor };
                    alchemy.backImg = alchemyList.BackImg;
                    alchemy.recipes = [];
                    Ayatam.EXTRACTALCHEMYSYSTEM.RecipeDatabase.forEach(recipeList => {
                        if(recipeList) {
                            if(alchemyList.AlchemyID === recipeList.TargetAlchemyID) {
                                recipeList.Learned = recipeList.LearnType === "fromItem" ? false : alchemyList.CanLvl ? alchemy.currentLvl >= recipeList.LearnLvl : false;
                                alchemy.recipes.push(recipeList);
                            };
                        };
                    });
                    this._Data[alchemyList.AlchemyID] = alchemy;
                };
            };
        });
    }
    //--------------------------------------------------------------------------
    // ● 合成カテゴライズデータのリロードと新データの作成 [変更データの適応]
    //--------------------------------------------------------------------------
    reloadRecipeCategory() {
        var alchemyData = Ayatam.EXTRACTALCHEMYSYSTEM.CategoryDatabase;
        var recipesData = Ayatam.EXTRACTALCHEMYSYSTEM.RecipeDatabase;
        alchemyData.forEach(alchemyList => {
            if(alchemyList) {
                if(this._Data[alchemyList.AlchemyID] === undefined) {//新規データの作成
                    var cMaxExp = 0;
                    if(alchemyList.CanLvl) { var lvl = 1; cMaxExp = eval(alchemyList.ExpMethod); };
                    var alchemy = { alchemyId: alchemyList.AlchemyID , name: alchemyList.AlchemyName , currentLvl: 1 , canLvl: alchemyList.CanLvl , maxLvl: alchemyList.MaxLvl , maxLvlName: alchemyList.MaxLvlName , currentExp: 0 , maxExp: cMaxExp, expMethod: alchemyList.ExpMethod , alchemyInExclusiveScene: alchemyList.AlchemyOnlyInExclusiveScene };
                    alchemy.alchemyIcon = { icon: alchemyList.AlchemyIcon.AlchemyIconID };
                    alchemy.alchemyMenu = { enableMenu: alchemyList.AlchemyMenuSetup.CanShowInAlchemyMenu , showSw: alchemyList.AlchemyMenuSetup.ShowAlchemySw , showVar: alchemyList.AlchemyMenuSetup.ShowAlchemyVar };
                    alchemy.se = { activeSE: alchemyList.AlchemySE.ActiveSE , activePlayDelay: alchemyList.AlchemySE.ActivePlayDelay , completeSE: alchemyList.AlchemySE.CompleteSE , failedSE: alchemyList.AlchemySE.FailedSE };
                    alchemy.needs = { items: alchemyList.NeedItemToAlchemy.NeedItem , weapons: alchemyList.NeedItemToAlchemy.NeedWeapon , armors: alchemyList.NeedItemToAlchemy.NeedArmor };
                    alchemy.backImg = alchemyList.BackImg;
                    alchemy.recipes = [];
                    recipesData.forEach(recipeList => {
                        if(recipeList) {
                            if(alchemyList.AlchemyID === recipeList.TargetAlchemyID) {
                                recipeList.Learned = recipeList.LearnType === "fromItem" ? false : alchemyList.CanLvl ? alchemy.currentLvl >= recipeList.LearnLvl : false;
                                alchemy.recipes.push(recipeList);
                            };
                        };
                    });
                    this._Data[alchemyList.AlchemyID] = alchemy;
                }else{//既存データへの変更データ適応
                    if(this._Data[alchemyList.AlchemyID].alchemyId !== alchemyList.AlchemyID) {
                        this._Data[alchemyList.AlchemyID].alchemyId = alchemyList.AlchemyID;
                    };
                    if(this._Data[alchemyList.AlchemyID].alchemyInExclusiveScene !== alchemyList.AlchemyOnlyInExclusiveScene) {
                        this._Data[alchemyList.AlchemyID].alchemyInExclusiveScene = alchemyList.AlchemyOnlyInExclusiveScene;
                    };
                    if(this._Data[alchemyList.AlchemyID].alchemyInExclusiveScene !== alchemyList.AlchemyOnlyInExclusiveScene) {
                        this._Data[alchemyList.AlchemyID].alchemyInExclusiveScene = alchemyList.AlchemyOnlyInExclusiveScene;
                    };
                    if(this._Data[alchemyList.AlchemyID].expMethod !== alchemyList.ExpMethod) {
                        var lvl = this._Data[alchemyList.AlchemyID].currentLvl;
                        this._Data[alchemyList.AlchemyID].expMethod = alchemyList.ExpMethod;
                        this._Data[alchemyList.AlchemyID].maxExp = eval(alchemyList.ExpMethod);
                    };
                    if(this._Data[alchemyList.AlchemyID].maxLvl !== alchemyList.MaxLvl) {
                        this._Data[alchemyList.AlchemyID].maxLvl = alchemyList.MaxLvl;
                    };
                    if(this._Data[alchemyList.AlchemyID].name !== alchemyList.AlchemyName) {
                        this._Data[alchemyList.AlchemyID].name = alchemyList.AlchemyName;
                    };
                    if(this._Data[alchemyList.AlchemyID].maxLvlName !== alchemyList.MaxLvlName) {
                        this._Data[alchemyList.AlchemyID].maxLvlName !== alchemyList.MaxLvlName;
                    };
                    this._Data[alchemyList.AlchemyID].backImg = alchemyList.BackImg;
                    this._Data[alchemyList.AlchemyID].se = { activeSE: alchemyList.AlchemySE.ActiveSE , activePlayDelay: alchemyList.AlchemySE.ActivePlayDelay , completeSE: alchemyList.AlchemySE.CompleteSE , failedSE: alchemyList.AlchemySE.FailedSE };
                    this._Data[alchemyList.AlchemyID].needs = { items: alchemyList.NeedItemToAlchemy.NeedItem , weapons: alchemyList.NeedItemToAlchemy.NeedWeapon , armors: alchemyList.NeedItemToAlchemy.NeedArmor };
                    this._Data[alchemyList.AlchemyID].canLvl = alchemyList.CanLvl;
                    this._Data[alchemyList.AlchemyID].alchemyIcon = { icon: alchemyList.AlchemyIcon.AlchemyIconID };
                    this._Data[alchemyList.AlchemyID].alchemyMenu = { enableMenu: alchemyList.AlchemyMenuSetup.CanShowInAlchemyMenu , showSw: alchemyList.AlchemyMenuSetup.ShowAlchemySw , showVar: alchemyList.AlchemyMenuSetup.ShowAlchemyVar };
                    var savedRecipes = this._Data[alchemyList.AlchemyID].recipes.concat();
                    this._Data[alchemyList.AlchemyID].recipes = [];
                    recipesData.forEach(recipeList => {
                        if(recipeList) {
                            if(alchemyList.AlchemyID === recipeList.TargetAlchemyID) {
                                var loadRecipe = false;
                                savedRecipes.forEach(savedRecipe => {
                                    if(savedRecipe) {
                                        if(savedRecipe.RecipeID === recipeList.RecipeID) {
                                            loadRecipe = true;
                                            this._Data[alchemyList.AlchemyID].recipes.push(savedRecipe);
                                        };
                                    };
                                });
                                if(!loadRecipe) {
                                    recipeList.Learned = recipeList.LearnType === "fromItem" ? false : this._Data[alchemyList.AlchemyID].canLvl ? this._Data[alchemyList.AlchemyID].currentLvl >= recipeList.LearnLvl : false;
                                    this._Data[alchemyList.AlchemyID].recipes.push(recipeList);
                                };
                            };
                        };
                    });
                };
            };
        });
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成データベースの初期化
    //--------------------------------------------------------------------------
    resetAllAlchemy() {
        this.initializeRecipeCategory();
    };
    //--------------------------------------------------------------------------
    // ● キーマッピングへ登録
    //--------------------------------------------------------------------------
    setupKeyMappings() {
        this.setupKeyBoardKeyMappings();
    }
    //--------------------------------------------------------------------------
    // ● キーボードキーマッピングへ登録
    //--------------------------------------------------------------------------
    setupKeyBoardKeyMappings() {
        var recipeDataPageUpKey = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageKey.PageUpKey;
        var keyResult = this.isReservedBoardKey(recipeDataPageUpKey);
        if(keyResult !== undefined) Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageKey.PageUpKey = keyResult;
        var recipeDataPageDownKey = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageKey.PageDownKey;
        keyResult = this.isReservedBoardKey(recipeDataPageDownKey);
        if(keyResult !== undefined) Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageKey.PageDownKey = keyResult;
    }
    //--------------------------------------------------------------------------
    // ● [キーボード]キーバインドが存在する場合、コードを読み込む
    //--------------------------------------------------------------------------
    isReservedBoardKey(key) {
        var result = undefined;
        switch (key){
            case 'A':
                if(Input.keyMapper[65] === undefined) {
                    Input.keyMapper[65] = key;
                }else{
                    result = Input.keyMapper[65];
                };
                break;
            case 'B':
                if(Input.keyMapper[66] === undefined) {
                    Input.keyMapper[66] = key;
                }else{
                    result = Input.keyMapper[66];
                };
                break;
            case 'C':
                if(Input.keyMapper[67] === undefined) {
                    Input.keyMapper[67] = key;
                }else{
                    result = Input.keyMapper[67];
                };
                break;
            case 'D':
                if(Input.keyMapper[68] === undefined) {
                    Input.keyMapper[68] = key;
                }else{
                    result = Input.keyMapper[68];
                };
                break;
            case 'E':
                if(Input.keyMapper[69] === undefined) {
                    Input.keyMapper[69] = key;
                }else{
                    result = Input.keyMapper[69];
                };
                break;
            case 'F':
                if(Input.keyMapper[70] === undefined) {
                    Input.keyMapper[70] = key;
                }else{
                    result = Input.keyMapper[70];
                };
                break;
            case 'G':
                if(Input.keyMapper[71] === undefined) {
                    Input.keyMapper[71] = key;
                }else{
                    result = Input.keyMapper[71];
                };
                break;
            case 'H':
                if(Input.keyMapper[72] === undefined) {
                    Input.keyMapper[72] = key;
                }else{
                    result = Input.keyMapper[72];
                };
                break;
            case 'I':
                if(Input.keyMapper[73] === undefined) {
                    Input.keyMapper[73] = key;
                }else{
                    result = Input.keyMapper[73];
                };
                break;
            case 'J':
                if(Input.keyMapper[74] === undefined) {
                    Input.keyMapper[74] = key;
                }else{
                    result = Input.keyMapper[74];
                };
                break;
            case 'K':
                if(Input.keyMapper[75] === undefined) {
                    Input.keyMapper[75] = key;
                }else{
                    result = Input.keyMapper[75];
                };
                break;
            case 'L':
                if(Input.keyMapper[76] === undefined) {
                    Input.keyMapper[76] = key;
                }else{
                    result = Input.keyMapper[76];
                };
                break;
            case 'M':
                if(Input.keyMapper[77] === undefined) {
                    Input.keyMapper[77] = key;
                }else{
                    result = Input.keyMapper[77];
                };
                break;
            case 'N':
                if(Input.keyMapper[78] === undefined) {
                    Input.keyMapper[78] = key;
                }else{
                    result = Input.keyMapper[78];
                };
                break;
            case 'O':
                if(Input.keyMapper[79] === undefined) {
                    Input.keyMapper[79] = key;
                }else{
                    result = Input.keyMapper[79];
                };
                break;
            case 'P':
                if(Input.keyMapper[80] === undefined) {
                    Input.keyMapper[80] = key;
                }else{
                    result = Input.keyMapper[80];
                };
                break;
            case 'pageup'://Q
                if(Input.keyMapper[81] === undefined) {
                    Input.keyMapper[81] = key;
                }else{
                    result = Input.keyMapper[81];
                };
                break;
            case 'R':
                if(Input.keyMapper[82] === undefined) {
                    Input.keyMapper[82] = key;
                }else{
                    result = Input.keyMapper[82];
                };
                break;
            case 'S':
                if(Input.keyMapper[83] === undefined) {
                    Input.keyMapper[83] = key;
                }else{
                    result = Input.keyMapper[83];
                };
                break;
            case 'T':
                if(Input.keyMapper[84] === undefined) {
                    Input.keyMapper[84] = key;
                }else{
                    result = Input.keyMapper[84];
                };
                break;
            case 'U':
                if(Input.keyMapper[85] === undefined) {
                    Input.keyMapper[85] = key;
                }else{
                    result = Input.keyMapper[85];
                };
                break;
            case 'V':
                if(Input.keyMapper[86] === undefined) {
                    Input.keyMapper[86] = key;
                }else{
                    result = Input.keyMapper[86];
                };
                break;
            case 'pagedown'://W
                if(Input.keyMapper[87] === undefined) {
                    Input.keyMapper[87] = key;
                }else{
                    result = Input.keyMapper[87];
                };
                break;
            case 'Y':
                if(Input.keyMapper[89] === undefined) {
                    Input.keyMapper[89] = key;
                }else{
                    result = Input.keyMapper[89];
                };
                break;
        }
        return result;
    }
    //--------------------------------------------------------------------------
    // ● Ruby の Fiber.yield の状態設定
    //--------------------------------------------------------------------------
    setFiberYield(boolean) {
        this._fiberYield = boolean;
    }
    //--------------------------------------------------------------------------
    // ● Ruby の Fiber.yield の参照
    //--------------------------------------------------------------------------
    fiberYield() {
        return this._fiberYield;
    }
    //--------------------------------------------------------------------------
    // ● 合成/解体メニュー時での表示設定
    //--------------------------------------------------------------------------
    setMenuShow(alchemyId,boolean) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        this.alchemyList(alchemyList.AlchemyID).alchemyMenu.enableMenu = boolean;
    }
    //--------------------------------------------------------------------------
    // ● 採集抽選情報表示の設定
    //--------------------------------------------------------------------------
    setExtractInfo(boolean) {
        this._showExtractInfo = boolean;
    }
    //--------------------------------------------------------------------------
    // ● 採集抽選情報表示の参照
    //--------------------------------------------------------------------------
    extractInfo() {
        return this._showExtractInfo;
    }
    //--------------------------------------------------------------------------
    // ● 専用画面の設定
    //--------------------------------------------------------------------------
    setExclusiveScene(alchemyId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        this._isExclusiveScene = alchemyId;
    }
    //--------------------------------------------------------------------------
    // ● 専用画面か
    //--------------------------------------------------------------------------
    isExclusiveScene() {
        return this._isExclusiveScene;
    }
    //--------------------------------------------------------------------------
    // ● 専用画面か
    //--------------------------------------------------------------------------
    resetExclusiveScene() {
        this._isExclusiveScene = "";
    }
    //--------------------------------------------------------------------------
    // ● 専用画面の呼び出し
    //--------------------------------------------------------------------------
    callExclusiveScene(alchemyId) {
        this.setExclusiveScene(alchemyId);
        SceneManager.push(Scene_AlchemyCrafter);
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成カテゴリーのデータベース検索
    //--------------------------------------------------------------------------
    findAlchemy(alchemyId) {
        if(this._Data[alchemyId] === undefined) {
            console.error('MMO式採集合成システムMVMZ : Error :\n「' + alchemyId + '」は採集/合成カテゴリーデータベースに存在しません。\n「' + alchemyId + '」can not find in gather/Alchemy category database.');
            require('nw.gui').Window.get().showDevTools();
            AudioManager.playSe({ "name": "Computer", "volume": 70, "pitch": 100, "pan": 0 });
            return undefined;
        }else{
            return this._Data[alchemyId];
        };
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成カテゴリーデータの参照
    //--------------------------------------------------------------------------
    alchemyList(alchemyId) {
        return this.findAlchemy(alchemyId);
    }
    //--------------------------------------------------------------------------
    // ● メニュー用合成リストを取得
    //--------------------------------------------------------------------------
    findAllAlchemyForMenu() {
        var menuLists = [];
        Ayatam.EXTRACTALCHEMYSYSTEM.CategoryDatabase.forEach(alchemyList => {
            if(alchemyList) {
                if(this.alchemyList(alchemyList.AlchemyID).alchemyMenu.enableMenu) {
                    var result = true;
                    if(this.alchemyList(alchemyList.AlchemyID).alchemyMenu.showSw) {
                        var sw = this.alchemyList(alchemyList.AlchemyID).alchemyMenu.showSw;
                        if($gameSwitches.value(sw.SwID) !== sw.SwBoolean) result = false;
                    };
                    if(this.alchemyList(alchemyList.AlchemyID).alchemyMenu.showVar) {
                        var val = this.alchemyList(alchemyList.AlchemyID).alchemyMenu.showVar;
                        if (val.ValCondition === "mt") {
                            result = $gameVariables.value(val.Val) > Number(val.ValValue);
                        } else if (val.ValCondition === "imt") {
                            result = $gameVariables.value(val.Val) >= Number(val.ValValue);
                        } else if (val.ValCondition === "lt") {
                            result = $gameVariables.value(val.Val) < Number(val.ValValue);
                        } else if (val.ValCondition === "ilt") {
                            result = $gameVariables.value(val.Val) <= Number(val.ValValue);
                        } else if (val.ValCondition === "just") {
                            result = $gameVariables.value(val.Val) === Number(val.ValValue);
                        } else if (val.ValCondition === "stringcheck") {
                            result = $gameVariables.value(val.Val) === String(val.ValValue);
                        };
                        if($gameVariables.value(val.Val) !== sw.SwBoolean) result = false;
                    };
                    if(result) menuLists.push(this.alchemyList(alchemyList.AlchemyID).alchemyId);
                };
            };
        });
        return menuLists;
    }
    //--------------------------------------------------------------------------
    // ● 合成/解体レシピのデータベース検索
    //--------------------------------------------------------------------------
    findRecipe(alchemyId,recipeId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return undefined;
        var findRecipe = undefined;
        if(this.alchemyList(alchemyId)) {
            for(var i = 0; i < this.alchemyList(alchemyId).recipes.length; ++i) {
                if(this.alchemyList(alchemyId).recipes[i].RecipeID === recipeId) {
                    findRecipe = this.alchemyList(alchemyId).recipes[i];
                    break;
                };
            };
        };
        if(findRecipe === undefined) {
            console.error('MMO式採集合成システムMVMZ : Error :\n「' + recipeId + '」は合成/解体レシピ データベースに存在しません。\n「' + recipeId + '」can not find in Alchemy/Disassembly recipe database.');
            require('nw.gui').Window.get().showDevTools();
            AudioManager.playSe({ "name": "Computer", "volume": 70, "pitch": 100, "pan": 0 });
            return undefined;
        }else{
            return findRecipe;
        };
    }
    //--------------------------------------------------------------------------
    // ● 合成/解体レシピの合成アイテム情報を検索
    //--------------------------------------------------------------------------
    getRecipeName(alchemyId,recipeId) {
        var findRecipe = this.findRecipe(alchemyId,recipeId);
        var iconIndex = 0;
        var name = "";
        var itemId = 0;
        if(findRecipe.TargetWitchItem === "Item") {
            itemId = findRecipe.TargetItem.EarnItem;
            iconIndex = $dataItems[itemId].iconIndex;
            name = $dataItems[itemId].name;
        }else if(findRecipe.TargetWitchItem === "Weapon") {
            itemId = findRecipe.TargetWeapon.EarnWeapon;
            iconIndex = $dataWeapons[itemId].iconIndex;
            name = $dataWeapons[itemId].name;
        }else if(findRecipe.TargetWitchItem === "Armor") {
            itemId = findRecipe.TargetArmor.EarnArmor;
            iconIndex = $dataArmors[itemId].iconIndex;
            name = $dataArmors[itemId].name;
        };
        return [itemId,iconIndex,name];
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成レシピデータは習得済みか？ true/false
    //--------------------------------------------------------------------------
    recipeLearned(alchemyId,recipeId) {
        return this.findRecipe(alchemyId,recipeId).Learned;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成レシピデータは習得可能か？ true/false
    //--------------------------------------------------------------------------
    canLearnRecipe(alchemyId,recipeId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return false;
        var canLearnRecipe = false;
        if(this.alchemyList(alchemyId)) {
            if(this.alchemyList(alchemyId).canLvl) {
                canLearnRecipe = this.alchemyList(alchemyId).currentLvl >= this.findRecipe(alchemyId,recipeId).LearnLvl;
            }else{
                canLearnRecipe = true;
            };
        };
        return canLearnRecipe;
    }
    //--------------------------------------------------------------------------
    // ● 合成レシピデータを習得
    //--------------------------------------------------------------------------
    learnRecipe(alchemyId,recipeId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        if(!this.recipeLearned(alchemyId,recipeId)) this.findRecipe(alchemyId,recipeId).Learned = true;
    }
    //--------------------------------------------------------------------------
    // ● 合成レシピデータを忘却
    //--------------------------------------------------------------------------
    forgetRecipe(alchemyId,recipeId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        if(this.recipeLearned(alchemyId,recipeId)) this.findRecipe(alchemyId,recipeId).Learned = false;
    }
    //--------------------------------------------------------------------------
    // ● 習得済み採集/合成レシピデータをすべて取得
    //--------------------------------------------------------------------------
    getAllLearnedRecipe(alchemyId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return [];
        var learnedRecipe = [];
        if(this.alchemyList(alchemyId)) {
            this.alchemyList(alchemyId).recipes.forEach(recipe => {
                if(recipe) {
                    if(recipe.Learned) {
                        learnedRecipe.push(recipe);
                    };
                };
            });
        };
        if(learnedRecipe.length === 0) return [];
        return learnedRecipe;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成レシピデータの合成レシピ参照
    //--------------------------------------------------------------------------
    getAllIngredients(alchemyId,recipeId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return undefined;
        var findIngredients = this.findRecipe(alchemyId,recipeId).CreateRecipes;
        return findIngredients;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成レシピデータの解体時獲得レシピ参照
    //--------------------------------------------------------------------------
    getAllDisassembleItems(alchemyId,recipeId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return undefined;
        var findDisassembleItems = this.findRecipe(alchemyId,recipeId).DisassemblyRecipes;
        return findDisassembleItems;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成レシピデータの合成経験値獲得
    //--------------------------------------------------------------------------
    gainExp(alchemyId,exp) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        if(!this.alchemyList(alchemyId).canLvl) return;
        if(exp <= 0) return;
        if(this.alchemyList(alchemyId).currentLvl >= this.alchemyList(alchemyId).maxLvl) return;
        var currentExp = this.alchemyList(alchemyId).currentExp;
        var addedExp = currentExp + exp;
        var lvl = this.alchemyList(alchemyId).currentLvl;
        var oldLvl = lvl;
        for(var i = 0; i < 999999999; ++i) {
            if(this.alchemyList(alchemyId).currentLvl >= this.alchemyList(alchemyId).maxLvl) {
                this.alchemyList(alchemyId).currentExp = this.alchemyList(alchemyId).maxExp;
                this.alchemyList(alchemyId).currentLvl = this.alchemyList(alchemyId).maxLvl;
                break;
            }else{
                if(addedExp >= this.alchemyList(alchemyId).maxExp) {
                    addedExp = Math.abs(addedExp - this.alchemyList(alchemyId).maxExp);
                    lvl++;
                    this.alchemyList(alchemyId).currentLvl = lvl;
                    this.alchemyList(alchemyId).currentExp = addedExp;
                    this.alchemyList(alchemyId).maxExp = eval(this.alchemyList(alchemyId).expMethod);
                }else{
                    this.alchemyList(alchemyId).currentExp = addedExp;
                    break;
                };
            };
        };
        if(oldLvl !== lvl) {
            var sound = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.LvlUpSound;
            AudioManager.playSe({"name": sound ,"volume":90,"pitch":100,"pan":0});
            var newRecipes = this.learnRecipeByLvling(alchemyId);
            SceneManager._scene._lvlInformationWindow.createrMode(findCategory,oldLvl,lvl,newRecipes);
        };
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成レシピデータのレベル習得合成レシピ参照
    //--------------------------------------------------------------------------
    learnRecipeByLvling(alchemyId) {
        var newRecipes = [];
        if(this.alchemyList(alchemyId)) {
            this.alchemyList(alchemyId).recipes.forEach(recipe => {
                if(recipe) {
                    if(!recipe.Learned) {
                        recipe.Learned = recipe.LearnType === "fromItem" ? false : this.alchemyList(alchemyId).canLvl ? this.alchemyList(alchemyId).currentLvl >= recipe.LearnLvl : false;
                        if(recipe.Learned) {
                            var newRecipeId = [];
                            if(recipe.TargetWitchItem === "Item") {
                                newRecipeId = ["I",recipe.TargetItem.EarnItem];
                            }else if(recipe.TargetWitchItem === "Weapon") {
                                newRecipeId = ["W",recipe.TargetWeapon.EarnWeapon];
                            }else if(recipe.TargetWitchItem === "Armor") {
                                newRecipeId = ["A",recipe.TargetArmor.EarnArmor];
                            };
                            newRecipes.push(newRecipeId);
                        };
                    };
                };
            });
        };
        return newRecipes;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成カテゴリーの現在レベルを取得
    //--------------------------------------------------------------------------
    getLvl(alchemyId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        return this.alchemyList(alchemyId).currentLvl;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成カテゴリーの最大レベルを取得
    //--------------------------------------------------------------------------
    getMaxLvl(alchemyId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        return this.alchemyList(alchemyId).maxLvl;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成カテゴリーは最大レベルか
    //--------------------------------------------------------------------------
    isMaxLvl(alchemyId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        return this.getLvl(alchemyId) >= this.getMaxLvl(alchemyId);
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成カテゴリーの最大レベルの称号を取得
    //--------------------------------------------------------------------------
    getMaxName(alchemyId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        return this.alchemyList(alchemyId).maxLvlName;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成カテゴリーの現在の経験値を取得
    //--------------------------------------------------------------------------
    getExp(alchemyId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        return this.alchemyList(alchemyId).currentExp;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成カテゴリーの次の経験値を取得
    //--------------------------------------------------------------------------
    getNextExp(alchemyId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        return this.alchemyList(alchemyId).maxExp;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成カテゴリーのレベル概念を取得
    //--------------------------------------------------------------------------
    canLvl(alchemyId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        return this.alchemyList(alchemyId).canLvl;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成カテゴリーのアイコンを取得
    //--------------------------------------------------------------------------
    getIconId(alchemyId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        return this.alchemyList(alchemyId).alchemyIcon.icon;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成カテゴリーのアイコン調整x座標を取得
    //--------------------------------------------------------------------------
    getName(alchemyId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return;
        return this.alchemyList(alchemyId).name;
    }
    //--------------------------------------------------------------------------
    // ● 採集/合成カテゴリーの使用資格状態を取得
    //--------------------------------------------------------------------------
    hasLicense(alchemyId) {
        var findCategory = this.findAlchemy(alchemyId);
        if(findCategory === undefined) return [true,[]];
        var result = true;
        var licenseInfo = [];
        if(this.alchemyList(alchemyId).needs.items !== undefined) {
            if(this.alchemyList(alchemyId).needs.items !== "") {
                if(this.alchemyList(alchemyId).needs.items.length > 0) {
                    this.alchemyList(alchemyId).needs.items.forEach(item => {
                        if(item) {
                            licenseInfo.push(["I",item,$gameParty.hasItem($dataItems[item])]);
                            if(result) result = $gameParty.hasItem($dataItems[item]);
                        };
                    });
                };
            };
        }
        if(this.alchemyList(alchemyId).needs.weapons !== undefined) {
            if(this.alchemyList(alchemyId).needs.weapons !== "") {
                if(this.alchemyList(alchemyId).needs.weapons.length > 0) {
                    this.alchemyList(alchemyId).needs.weapons.forEach(weapon => {
                        if(weapon) {
                            licenseInfo.push(["W",weapon,$gameParty.hasItem($dataWeapons[weapon],true)]);
                            if(result) result = $gameParty.hasItem($dataWeapons[weapon],true);
                        };
                    });
                };
            };
        }
        if(this.alchemyList(alchemyId).needs.armors !== undefined) {
            if(this.alchemyList(alchemyId).needs.armors !== "") {
                if(this.alchemyList(alchemyId).needs.armors.length > 0) {
                    this.alchemyList(alchemyId).needs.armors.forEach(armor => {
                        if(armor) {
                            licenseInfo.push(["A",armor,$gameParty.hasItem($dataArmors[armor],true)]);
                            if(result) result = $gameParty.hasItem($dataArmors[armor],true);
                        };
                    });
                };
            };
        };
        return [result,licenseInfo];
    }
    //--------------------------------------------------------------------------
    // ● 合成可能か？
    //--------------------------------------------------------------------------
    canCreater(info) {
        var result = true;
        var license = this.hasLicense(info.TargetAlchemyID);
        var mode = "";
        if(!license[0]) {
            mode = "licenseFailed";
            if(result) result = false;
        };
        if(!result) {
            SceneManager._scene._extractionWindow.createrMode(info,mode,license[1]);
            SoundManager.playBuzzer();
        };
        return result;
    }
    //--------------------------------------------------------------------------
    // ● 採集可能か？
    //--------------------------------------------------------------------------
    canExtract(extractInfo) {
        var result = true;
        var license = this.hasLicense(extractInfo.extractType);
        var mode = "";
        if(!license[0]) {
            mode = "licenseFailed";
            if(result) result = false;
        }else if(this.canLvl(extractInfo.extractType)) {
            if(this.getLvl(extractInfo.extractType) < extractInfo.extractLvl) {
                mode = "lvlFailed";
                if(result) result = false;
            };
        };
        if(!result) {
            if(SceneManager._scene.constructor === Scene_Map) {
                SceneManager._scene._extractionWindow.extracterMode(extractInfo,mode,license[1]);
            };
            SoundManager.playBuzzer();
        };
        return result;
    }
    //--------------------------------------------------------------------------
    // ● 合成/解体抽選計算
    //--------------------------------------------------------------------------
    createrLottery(info,successChance,chance,isCreateMode = true) {
        var lotterItems = [];
        var itemQuality = 0;
        var itemType = "";
        var earnedItemId = 0;
        var successItemId = 0;
        var failedItemId = 0;
        var earnAmount = 0;
        if(isCreateMode) {
            if(info.TargetWitchItem === "Item") {
                itemType = "I";
                successItemId = info.TargetItem.EarnItem;
                failedItemId = info.TargetItem.FailedItem;
                earnAmount = info.TargetItem.EarnAmount;
            }else if(info.TargetWitchItem === "Weapon") {
                itemType = "W";
                successItemId = info.TargetWeapon.EarnWeapon;
                failedItemId = info.TargetWeapon.FailedWeapon;
                earnAmount = info.TargetWeapon.EarnAmount;
            }else if(info.TargetWitchItem === "Armor") {
                itemType = "A";
                successItemId = info.TargetArmor.EarnArmor;
                failedItemId = info.TargetArmor.FailedArmor;
                earnAmount = info.TargetArmor.EarnAmount;
            };
            if(typeof earnAmount === "string") {
                if(earnAmount.includes("RandMax")) {//RandMax()
                    var renewRandMax = [];
                    var extractRandMax = earnAmount.replace("RandMax(","");
                    extractRandMax = extractRandMax.replace(")","");
                    extractRandMax = extractRandMax.split(":");
                    if(extractRandMax.length > 0) {
                        extractRandMax.forEach(num => {
                            if(num) {
                                renewRandMax.push(Number(num));
                            };
                        });
                    };
                    if(chance < 100) {
                        itemQuality = this.getRandomIntInclusive(renewRandMax[0],renewRandMax[1]);
                    }else{
                        itemQuality = renewRandMax[2];
                    };
                }else{//Rand()
                    var renewRand = [];
                    var extractRand = earnAmount.replace("Rand(","");
                    extractRand = extractRand.replace(")","");
                    extractRand = extractRand.split(":");
                    if(extractRand.length > 0) {
                        extractRand.forEach(num => {
                            if(num) {
                                renewRand.push(Number(num));
                            };
                        });
                    };
                    itemQuality = this.getRandomIntInclusive(renewRand[0],renewRand[1]);
                };
            }else{
                itemQuality = earnAmount;
            };            
            if(successChance >= chance) {//成功時
                earnedItemId = successItemId;
            }else{//失敗時
                earnedItemId = failedItemId;
            };
            if(earnedItemId > 0) {
                lotterItems.push([itemType,earnedItemId,itemQuality]);
            };
        }else{
            if(info.DisassemblyRecipes) {
                if(info.DisassemblyRecipes.length > 0) {
                    info.DisassemblyRecipes.forEach(item => {
                        if(item) {
                            if(item.RecipeWitchItem === "Item") {
                                itemType = "I";
                                earnedItemId = item.RecipeItem;
                                earnAmount = item.NeedAmount;
                            }else if(item.RecipeWitchItem === "Weapon") {
                                itemType = "W";
                                earnedItemId = item.RecipeWeapon;
                                earnAmount = item.NeedAmount;
                            }else if(item.RecipeWitchItem === "Armor") {
                                itemType = "A";
                                earnedItemId = item.RecipeArmor;
                                earnAmount = item.NeedAmount;
                            };
                            if(successChance >= chance) {//成功時
                                lotterItems.push([itemType,earnedItemId,earnAmount]);
                            }else{//失敗時
                                earnAmount = Math.ceil(earnAmount/2);
                                if(earnAmount > 0) {
                                    lotterItems.push([itemType,earnedItemId,earnAmount]);
                                };
                            };
                        };
                    });
                };
            };
        };
        return lotterItems;
    }
    //--------------------------------------------------------------------------
    // ● 採集抽選計算
    //--------------------------------------------------------------------------
    startLottery(info) {
        var lotterItems = [];
        var itemQuality = 0;
        var chance = this.getChanceOf(info,10);
        if(info.extractItems.length > 0) {
            var lottery = this.getRandomIntInclusive(1,100);
            info.extractItems.forEach(item => {
                if(item) {
                    if(item[3] >= lottery) {//抽選を当選したアイテム
                        if(typeof item[2] === "string") {//文字列の場合
                            if(item[2].includes("RandMax")) {//RandMax()
                                var renewRandMax = [];
                                var extractRandMax = item[2].replace("RandMax(","");
                                extractRandMax = extractRandMax.replace(")","");
                                extractRandMax = extractRandMax.split(":");
                                if(extractRandMax.length > 0) {
                                    extractRandMax.forEach(num => {
                                        if(num) {
                                            renewRandMax.push(Number(num));
                                        };
                                    });
                                };
                                if(chance < 100) {
                                    itemQuality = this.getRandomIntInclusive(renewRandMax[0],renewRandMax[1]);
                                }else{
                                    itemQuality = renewRandMax[2];
                                };
                            }else{//Rand()
                                var renewRand = [];
                                var extractRand = item[2].replace("Rand(","");
                                extractRand = extractRand.replace(")","");
                                extractRand = extractRand.split(":");
                                if(extractRand.length > 0) {
                                    extractRand.forEach(num => {
                                        if(num) {
                                            renewRand.push(Number(num));
                                        };
                                    });
                                };
                                itemQuality = this.getRandomIntInclusive(renewRand[0],renewRand[1]);
                            };
                        }else{
                            itemQuality = item[2];
                        };
                        lotterItems.push([item[0],item[1],itemQuality]);
                    };
                };
            });
        };
        return lotterItems;
    }
    //--------------------------------------------------------------------------
    // ● レベル差を元に採集/合成成功倍率を計算
    //--------------------------------------------------------------------------
    getChanceOf(info,lvlOf,isExtract = true) {
        if(isExtract) {
            var extChance = info.extractChance;
            var from = info.extractLvl;
            var target = this.getLvl(info.extractType);
            var canChangeChance = this.canLvl(info.extractType);
        }else{
            var extChance = info.SuccessChance;
            var from = info.LearnLvl;
            var target = this.getLvl(info.TargetAlchemyID);
            var canChangeChance = this.canLvl(info.TargetAlchemyID);
        };
        var checkOverLvlOf = Math.abs(from - target);
        if(checkOverLvlOf >= lvlOf) checkOverLvlOf = lvlOf;
        var rate = checkOverLvlOf * 0.1;
        var calc = Math.floor((100 - extChance) * rate);
        return canChangeChance ? extChance + calc : extChance;
    }
    //--------------------------------------------------------------------------
    // ● レベル差を元に採集/合成速度倍率を計算
    //--------------------------------------------------------------------------
    getSpeedOf(info,lvlOf,isExtract = true) {
        if(isExtract) {
            var extSpeed = info.extractSpeed;
            var from = info.extractLvl;
            var target = this.getLvl(info.extractType);
            var canChangeSpeed = this.canLvl(info.extractType);
        }else{
            var extSpeed = info.CreateSpeed;
            var from = info.LearnLvl;
            var target = this.getLvl(info.TargetAlchemyID);
            var canChangeSpeed = this.canLvl(info.TargetAlchemyID);
        };
        var speedOf = 0.2;
        var checkOverLvlOf = Math.abs(from - target);
        if(checkOverLvlOf >= lvlOf) checkOverLvlOf = lvlOf;
        var rate = checkOverLvlOf * 0.1;
        var calc = Math.abs(speedOf - extSpeed) * rate;
        return canChangeSpeed ? extSpeed - calc : extSpeed;
    }
    //--------------------------------------------------------------------------
    // ● レベル差を元に経験値取得倍率を計算[10差で経験値無効化]
    //--------------------------------------------------------------------------
    getExpOf(info,lvlOf,isExtract = true) {
        if(isExtract) {
            var exp = info.extractExp;
            var from = info.extractLvl;
            var target = this.getLvl(info.extractType);
            var canChangeExp = this.canLvl(info.extractType);
        }else{
            var exp = info.EarnExp;
            var from = info.LearnLvl;
            var target = this.getLvl(info.TargetAlchemyID);
            var canChangeExp = this.canLvl(info.TargetAlchemyID);
        };
        var checkOverLvlOf = Math.abs(from - target);
        if(checkOverLvlOf >= lvlOf) checkOverLvlOf = lvlOf;
        if(checkOverLvlOf === 10) exp = 0;
        return canChangeExp ? Math.floor(exp) : 0;
    }
    //--------------------------------------------------------------------------
    // ● 採集抽選計算
    //--------------------------------------------------------------------------
    getRandomIntInclusive(min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    //--------------------------------------------------------------------------
    // ● 採集報酬の獲得
    //--------------------------------------------------------------------------
    earnExtCreateItems(items = []) {
        if(items.length > 0) {
            items.forEach(item => {
                if(item) {
                    if(item[0] === "I") {
                        $gameParty.gainItem($dataItems[item[1]],item[2]);
                    }else if(item[0] === "W") {
                        $gameParty.gainItem($dataWeapons[item[1]],item[2]);
                    }else if(item[0] === "A") {
                        $gameParty.gainItem($dataArmors[item[1]],item[2]);
                    };
                };
            });
        };
    }
}

//=============================================================================
// Window_AlchemyBackGround - 合成メニュー背景用ウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● 合成メニュー背景用ウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_AlchemyBackGround() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
}

Window_AlchemyBackGround.prototype = Object.create(Window_Base.prototype);
Window_AlchemyBackGround.prototype.constructor = Window_AlchemyBackGround;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_AlchemyBackGround.prototype.initialize = function(numLines) {
        var x = 0;
        var y = 0;
        var width = Graphics.width;
        var height = Graphics.height;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._isWindow = false;
        this.opacity = 0;
        this.backOpacity = 0;
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_AlchemyBackGround.prototype.initialize = function(rect) {
        rect.x = 0;
        rect.y = 0;
        rect.width = Graphics.width;
        rect.height = Graphics.height;
        Window_Base.prototype.initialize.call(this, rect);
        this._isWindow = false;
        this.opacity = 0;
        this.backOpacity = 0;
    };
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_AlchemyBackGround.prototype.winSkin = function() {
    if(this._spriteBg) {
        this.removeChild(this._spriteBg);
    };
    if($gameAlchemy.isExclusiveScene() === "") {//合成メニュー時
        if(!Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuBgSetting.UsePicture) return;
        this._spriteBg = new Sprite();
        var pictureDir = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuBgSetting.PictureFile;
        this._spriteBg.bitmap = ImageManager.loadExtAlchemy(pictureDir);
        this._spriteBg.x = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuBgSetting.PictureX;
        this._spriteBg.y = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuBgSetting.PictureY;
        if(Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuBgSetting.Anchor) {
            this._spriteBg.anchor.x = 0.5;
            this._spriteBg.anchor.y = 0.5;
        };
        this._spriteBg.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuBgSetting.PictureOpacity;
        this.addChildToBack(this._spriteBg);
    }else{//専用画面時
        var targetInfo = $gameAlchemy.alchemyList(this._alchemy);
        if(!targetInfo.backImg.UsePicture) return;
        this._spriteBg = new Sprite();
        var pictureDir = targetInfo.backImg.PictureFile;
        this._spriteBg.bitmap = ImageManager.loadExtAlchemy(pictureDir);
        this._spriteBg.x = targetInfo.backImg.PictureX;
        this._spriteBg.y = targetInfo.backImg.PictureY;
        if(targetInfo.backImg.Anchor) {
            this._spriteBg.anchor.x = 0.5;
            this._spriteBg.anchor.y = 0.5;
        };
        this._spriteBg.opacity = targetInfo.backImg.PictureOpacity;
        this.addChildToBack(this._spriteBg);
    };
};
//--------------------------------------------------------------------------
// ● 採集/合成情報の設定
//--------------------------------------------------------------------------
Window_AlchemyBackGround.prototype.setAlchemyInfo = function(alchemy) {
    if (this._alchemy !== alchemy) {
        this._alchemy = alchemy;
        this.winSkin();
    }
};

//=============================================================================
// Window_CategoryTitleWindow - 合成カテゴリータイトルウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● カテゴリータイトルウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_CategoryTitleWindow() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
}

Window_CategoryTitleWindow.prototype = Object.create(Window_Base.prototype);
Window_CategoryTitleWindow.prototype.constructor = Window_CategoryTitleWindow;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_CategoryTitleWindow.prototype.initialize = function(numLines) {
        var x = 0 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryTitleWindow.MainX;
        var y = 0 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryTitleWindow.MainY;
        var width = Graphics.width + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryTitleWindow.MainW;
        var height = (this.lineHeight()*2);
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._isWindow = false;
        this.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryTitleWindow.MainOpacity;
        this.backOpacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryTitleWindow.MainBackOpacity;
        this._text = '';
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_CategoryTitleWindow.prototype.initialize = function(rect) {
        rect.x = 0 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryTitleWindow.MainX;
        rect.y = 0 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryTitleWindow.MainY;
        rect.width = Graphics.width + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryTitleWindow.MainW;
        rect.height = (this.lineHeight()*2);
        Window_Base.prototype.initialize.call(this, rect);
        this._isWindow = false;
        this.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryTitleWindow.MainOpacity;
        this.backOpacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryTitleWindow.MainBackOpacity;
        this._text = '';
    };
};
//--------------------------------------------------------------------------
// ● 採集/合成情報の設定
//--------------------------------------------------------------------------
Window_CategoryTitleWindow.prototype.setAlchemyInfo = function(alchemy) {
    if (this._alchemy !== alchemy) {
        this._alchemy = alchemy;
        this.refresh();
    }
};
//--------------------------------------------------------------------------
// ● リフレッシュ
//--------------------------------------------------------------------------
Window_CategoryTitleWindow.prototype.refresh = function() {
    this.contents.clear();
    if(this._alchemy === undefined) {
        this.drawEmptyDesign();
        return;
    };
    this._addY = 0;
    this.drawCategoryName();
    this.drawCategoryLvlInfo();
};
//--------------------------------------------------------------------------
// ● データ無し用のデザインの描画
//--------------------------------------------------------------------------
Window_CategoryTitleWindow.prototype.drawEmptyDesign = function() {
    var colour = '#000000';
    this.contents.paintOpacity = 167;
    this.contents.fillRect(0,0,this.contents.width,this.contents.height,colour);
    this.contents.paintOpacity = 255;
};
//--------------------------------------------------------------------------
// ● 採集/合成名の描画
//--------------------------------------------------------------------------
Window_CategoryTitleWindow.prototype.drawCategoryName = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 26;
    this.contents.outlineWidth = 5;
    this.changeTextColor("#99ccff");//見出し
    var iconX = 0;
    if($gameAlchemy.alchemyList(this._alchemy).alchemyIcon.icon !== undefined) {
        this.drawIcon($gameAlchemy.alchemyList(this._alchemy).alchemyIcon.icon,5,this._addY + 2);
        iconX = 36 + 5;
    };
    if($gameAlchemy.alchemyList(this._alchemy).name !== "") this.drawText($gameAlchemy.alchemyList(this._alchemy).name,5 + iconX,this._addY,this.contents.width);
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 採集/合成のレベル情報描画
//--------------------------------------------------------------------------
Window_CategoryTitleWindow.prototype.drawCategoryLvlInfo = function() {
    if(!$gameAlchemy.alchemyList(this._alchemy).canLvl) return;
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 16;
    this.contents.outlineWidth = 5;
    this._addY += 23;
    var infoX = this.contents.width - 352 - 5;
    this.contents.fillRect(infoX,this._addY,352,12,"#191919");
    this.contents.gradientFillRect(infoX + 1, this._addY+1, 350 * ($gameAlchemy.alchemyList(this._alchemy).currentExp / $gameAlchemy.alchemyList(this._alchemy).maxExp), 10, "#43D122", "#11990F");
    this._addY -= 23;
    this.contents.fontSize = 24;
    var lvlTxt = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuCategoryTitleLabels[0] + $gameAlchemy.alchemyList(this._alchemy).currentLvl;
    if($gameAlchemy.alchemyList(this._alchemy).currentLvl === $gameAlchemy.alchemyList(this._alchemy).maxLvl) lvlTxt = $gameAlchemy.alchemyList(this._alchemy).maxLvlName;
    this.drawText(lvlTxt,infoX,this._addY,this.contents.width);
    this.contents.fontSize = 16;
    var expTxt = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuCategoryTitleLabels[1];
    var expTxtWidth = this.textWidth(expTxt);
    var exp = $gameAlchemy.alchemyList(this._alchemy).currentExp + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuCategoryTitleLabels[2] + $gameAlchemy.alchemyList(this._alchemy).maxExp;
    if($gameAlchemy.alchemyList(this._alchemy).currentLvl === $gameAlchemy.alchemyList(this._alchemy).maxLvl) exp = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuCategoryTitleLabels[3];
    var expWidth = this.textWidth(exp);
    this.changeTextColor("#84a9ff");
    this.drawText(expTxt,-5 - expTxtWidth - 5 - expWidth ,this._addY,this.contents.width,"right");
    this.resetTextColor();
    this.drawText(exp,-5 - expTxtWidth + 5 ,this._addY,this.contents.width,"right");
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};

//=============================================================================
// Window_AlchemyCategoryHorzCommand - 採集/合成カテゴリーコマンドウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● 合成カテゴリーコマンドウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_AlchemyCategoryHorzCommand() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_AlchemyCategoryHorzCommand.prototype = Object.create(Window_Selectable.prototype);
Window_AlchemyCategoryHorzCommand.prototype.constructor = Window_AlchemyCategoryHorzCommand;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_AlchemyCategoryHorzCommand.prototype.initialize = function(x,y,width,height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.select(0);
        this._isWindow = false;
        this.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryCommandWindow.MainOpacity;
        this.backOpacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryCommandWindow.MainBackOpacity;
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_AlchemyCategoryHorzCommand.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.select(0);
        this._isWindow = false;
        this.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryCommandWindow.MainOpacity;
        this.backOpacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryCommandWindow.MainBackOpacity;
    };
};
//--------------------------------------------------------------------------
// ● 左右矢印の作成
//--------------------------------------------------------------------------
Window_AlchemyCategoryHorzCommand.prototype.createNewArrows = function() {
    if(this._leftArrowSprite) return;
    this.leftArrowVisible = false;
    this.rightArrowVisible = false;
    var w = this.width;
    var h = this.height;
    var q = 24;
    var p = q/2;
    var sx = 96+(96/2);
    var sy = 96-(96/2);
    this._leftArrowSprite = new Sprite();
    this._leftArrowSprite.bitmap = this.windowskin;
    this._leftArrowSprite.anchor.x = 0.5;
    this._leftArrowSprite.anchor.y = 0.5;
    this._leftArrowSprite.setFrame(sx-q, sy-p, p, q);
    this._leftArrowSprite.move(p, h/2);
    this._leftArrowSprite.visible = false;
    this._rightArrowSprite = new Sprite();
    this._rightArrowSprite.bitmap = this.windowskin;
    this._rightArrowSprite.anchor.x = 0.5;
    this._rightArrowSprite.anchor.y = 0.5;
    this._rightArrowSprite.setFrame((sx-p)+q, sy-p, p, q);
    this._rightArrowSprite.move(w-p, h/2);
    this._rightArrowSprite.visible = false;
    this.addChild(this._leftArrowSprite);
    this.addChild(this._rightArrowSprite);
};

Window_AlchemyCategoryHorzCommand.prototype.maxItems = function() {
    if(this._list === undefined) return 1;
    return this._list.length;
};

Window_AlchemyCategoryHorzCommand.prototype.clearCommandList = function() {
    this._list = [];
};
//--------------------------------------------------------------------------
// ● 採集/合成情報の設定
//--------------------------------------------------------------------------
Window_AlchemyCategoryHorzCommand.prototype.setAlchemyInfo = function(alchemyList) {
    if (this._alchemyList !== alchemyList) {
        this._alchemyList = alchemyList;
        this.createNewArrows();
        this.refresh();
    }
};

Window_AlchemyCategoryHorzCommand.prototype.cursorDown = function(wrap) {
    return;//カテゴリーの下カーソルキー無効化
};

Window_AlchemyCategoryHorzCommand.prototype.cursorUp = function(wrap) {
    return;//カテゴリーの上カーソルキー無効化
};

Window_AlchemyCategoryHorzCommand.prototype.cursorPagedown = function() {
    return;//カテゴリーのPageDownキー無効化
};

Window_AlchemyCategoryHorzCommand.prototype.cursorPageup = function() {
    return;//カテゴリーのPageUpキー無効化
};

Window_AlchemyCategoryHorzCommand.prototype.makeCommandList = function() {
    if(this._alchemyList === undefined) return;
    if(this._alchemyList.length === 0) return;
    this._list = this._alchemyList;
};

Window_AlchemyCategoryHorzCommand.prototype.currentData = function() {
    return this.index() >= 0 ? this._list[this.index()] : null;
};

Window_AlchemyCategoryHorzCommand.prototype.numVisibleRows = function() {
    return 1;
};

Window_AlchemyCategoryHorzCommand.prototype.maxCols = function() {
    return 4;
};

Window_AlchemyCategoryHorzCommand.prototype.itemTextAlign = function() {
    return 'left';
};

Window_AlchemyCategoryHorzCommand.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
};
//--------------------------------------------------------------------------
// ● 有効状態を取得
//--------------------------------------------------------------------------
Window_AlchemyCategoryHorzCommand.prototype.indexEnabled = function(index) {
    return this._index === index;
};
//--------------------------------------------------------------------------
// ● 項目の描画
//--------------------------------------------------------------------------
Window_AlchemyCategoryHorzCommand.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    var align = this.itemTextAlign();
    this.contents.clearRect(rect);
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 16;
    this.resetTextColor();
    if(Utils.RPGMAKER_NAME === "MV") {
        var adjustY = 0; 
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var adjustY = 2;
    };
    this.indexEnabled(index) ? this.changePaintOpacity(true) : this.changePaintOpacity(false);
    this.drawIcon($gameAlchemy.alchemyList(this._list[index]).alchemyIcon.icon, rect.x, rect.y + 2 + adjustY);
    this.drawText($gameAlchemy.alchemyList(this._list[index]).name, rect.x + 36, rect.y + adjustY, rect.width, align)
};
//--------------------------------------------------------------------------
// ● 更新
//--------------------------------------------------------------------------
Window_AlchemyCategoryHorzCommand.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.updateUserIndex();
};
//--------------------------------------------------------------------------
// ● カーソル移動に合わせて、状態の更新
//--------------------------------------------------------------------------
Window_AlchemyCategoryHorzCommand.prototype.updateUserIndex = function() {
    if(this._oldIndex !== this._index) {
        this.refresh();
        this._oldIndex = this._index;
    };
};
//--------------------------------------------------------------------------
// ● updateArrows - 合成カテゴリーコマンドウィンドウ専用化
//--------------------------------------------------------------------------
Window_AlchemyCategoryHorzCommand.prototype.updateArrows = function() {
    this.downArrowVisible = false;
    this.upArrowVisible = false;
    this.leftArrowVisible = this.topRow() > 0;
    this.rightArrowVisible = this.topRow() + 1 < this.maxRows();
    if(this._leftArrowSprite !== undefined) this._leftArrowSprite.visible = this.isOpen() && this.leftArrowVisible;
    if(this._rightArrowSprite !== undefined) this._rightArrowSprite.visible = this.isOpen() && this.rightArrowVisible;
};

//=============================================================================
// Window_AlchemyRecipeListCommand - 合成/解体レシピコマンドウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● 合成/解体レシピコマンドウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_AlchemyRecipeListCommand() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_AlchemyRecipeListCommand.prototype = Object.create(Window_Selectable.prototype);
Window_AlchemyRecipeListCommand.prototype.constructor = Window_AlchemyRecipeListCommand;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_AlchemyRecipeListCommand.prototype.initialize = function(x,y,width,height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.select(0);
        this._isWindow = false;
        this._createMode = true;//true:合成 false:解体
        this.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeListCommandWindow.MainOpacity;
        this.backOpacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeListCommandWindow.MainBackOpacity;
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_AlchemyRecipeListCommand.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.select(0);
        this._isWindow = false;
        this._createMode = true;//true:合成 false:解体
        this.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeListCommandWindow.MainOpacity;
        this.backOpacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeListCommandWindow.MainBackOpacity;
    };
};

Window_AlchemyRecipeListCommand.prototype.maxItems = function() {
    if(this._list === undefined) return 1;
    return this._list.length;
};

Window_AlchemyRecipeListCommand.prototype.clearCommandList = function() {
    this._list = [];
};
//--------------------------------------------------------------------------
// ● 採集/合成情報の設定
//--------------------------------------------------------------------------
Window_AlchemyRecipeListCommand.prototype.setAlchemyInfo = function(alchemy) {
    if (this._alchemy !== alchemy) {
        this._alchemy = alchemy;
        this.select(0);
        this.refresh();
    }
};

Window_AlchemyRecipeListCommand.prototype.makeCommandList = function() {
    if(this._alchemy === undefined) {
        this.drawEmptyDesign();
        return;
    };
    this._list = $gameAlchemy.getAllLearnedRecipe(this._alchemy);
};

Window_AlchemyRecipeListCommand.prototype.currentData = function() {
    return this.index() >= 0 ? this._list[this.index()] : null;
};

Window_AlchemyRecipeListCommand.prototype.numVisibleRows = function() {
    return Math.ceil(this.maxItems() / this.maxCols());
};

Window_AlchemyRecipeListCommand.prototype.maxCols = function() {
    return 1;
};

Window_AlchemyRecipeListCommand.prototype.itemTextAlign = function() {
    return 'left';
};

Window_AlchemyRecipeListCommand.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
};
//--------------------------------------------------------------------------
// ● 有効状態を取得
//--------------------------------------------------------------------------
Window_AlchemyRecipeListCommand.prototype.indexEnabled = function(index) {
    return this._index === index;
};
//--------------------------------------------------------------------------
// ● 合成/解体モードの取得
//--------------------------------------------------------------------------
Window_AlchemyRecipeListCommand.prototype.createMode = function(mode) {
    if(this._createMode === mode) return;
    this._createMode = mode;
    this.refresh();
};
//--------------------------------------------------------------------------
// ● 項目の描画
//--------------------------------------------------------------------------
Window_AlchemyRecipeListCommand.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    var align = this.itemTextAlign();
    this.contents.clearRect(rect);
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 16;
    this.resetTextColor();
    var recipe = $gameAlchemy.getRecipeName(this._list[index].TargetAlchemyID,this._list[index].RecipeID);
    var iconIndex = recipe[1];
    var name = recipe[2];
    this.canCreateRecipe(this._list[index]) ? this.changePaintOpacity(true) : this.changePaintOpacity(false);
    if(!SceneManager._scene._isExclusiveScene) {
        if($gameAlchemy.alchemyList(this._list[index].TargetAlchemyID).alchemyInExclusiveScene) {
            this.changePaintOpacity(true);
        };
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        var adjustY = 0; 
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var adjustY = 2;
    };
    this.drawIcon(iconIndex, rect.x, rect.y + 2 + adjustY);
    this.drawText(name, rect.x + 36, rect.y + adjustY, rect.width, align)
};
//--------------------------------------------------------------------------
// ● 対象レシピを作成するための最低1つ作成するのに必要な材料を持っているか
//--------------------------------------------------------------------------
Window_AlchemyRecipeListCommand.prototype.canCreateRecipe = function(recipe) {
    var result = [];
    if(this._createMode) {//合成
        if(recipe.CreateRecipes) {
            if(recipe.CreateRecipes.length > 0) {
                recipe.CreateRecipes.forEach(item => {
                    if(item) {
                        if(item.RecipeWitchItem === "Item") {
                            result.push($gameParty.numItems($dataItems[item.RecipeItem]) >= item.NeedAmount);
                        }else if(item.RecipeWitchItem === "Weapon") {
                            result.push($gameParty.numItems($dataWeapons[item.RecipeWeapon]) >= item.NeedAmount);
                        }else if(item.RecipeWitchItem === "Armor") {
                            result.push($gameParty.numItems($dataArmors[item.RecipeArmor]) >= item.NeedAmount);
                        };
                    };
                });
            };
        };

        if(recipe.CreateCostType) {
            var costType = recipe.CreateCostType.CreateCostType;
            var variableId = recipe.CreateCostType.CostVariable;
            var costAmount = recipe.CreateCostType.CostAmount;
            var maxValue = 0;
    
            if(costType !== undefined) {
                if(costType === "loseMoney") {
                    maxValue = $gameParty.gold();
                    result.push(costAmount <= maxValue);
                }else if(costType === "subVariable") {
                    maxValue = $gameVariables.value(variableId);
                    result.push(costAmount <= maxValue);
                }else{
                    result.push(true);
                };
            };
        };
    }else{//解体
        if(recipe.TargetWitchItem === "Item") {
            result.push($gameParty.hasItem($dataItems[recipe.TargetItem.EarnItem]));
        }else if(recipe.TargetWitchItem === "Weapon") {
            result.push($gameParty.hasItem($dataWeapons[recipe.TargetWeapon.EarnWeapon]));
        }else if(recipe.TargetWitchItem === "Armor") {
            result.push($gameParty.hasItem($dataArmors[recipe.TargetArmor.EarnArmor]));
        };

        if(recipe.DisassemblyCostType) {
            var costType = recipe.DisassemblyCostType.CreateCostType;
            var variableId = recipe.DisassemblyCostType.CostVariable;
            var costAmount = recipe.DisassemblyCostType.CostAmount;
            var maxValue = 0;
    
            if(costType !== undefined) {
                if(costType === "loseMoney") {
                    maxValue = $gameParty.gold();
                    result.push(costAmount <= maxValue);
                }else if(costType === "subVariable") {
                    maxValue = $gameVariables.value(variableId);
                    result.push(costAmount <= maxValue);
                }else{
                    result.push(true);
                };
            };
        };
    };
    if(!SceneManager._scene._isExclusiveScene) {
        if($gameAlchemy.alchemyList(recipe.TargetAlchemyID).alchemyInExclusiveScene) {
            result = [];
        };
    };
    if(result.length === 0) return false;
    return !result.includes(false);
};

Window_AlchemyRecipeListCommand.prototype.isCommandEnabled = function(index) {
    return this.canCreateRecipe(this._list[index]);
};

Window_AlchemyRecipeListCommand.prototype.isCurrentItemEnabled = function() {
    return this.currentData() ? this.canCreateRecipe(this.currentData()) : false;
};
//--------------------------------------------------------------------------
// ● updateArrows - レシピアイコンコマンドウィンドウ専用化
//--------------------------------------------------------------------------
Window_AlchemyRecipeListCommand.prototype.updateArrows = function() {
    this.downArrowVisible = false;
    this.upArrowVisible = false;
};

//=============================================================================
// Window_RecipeData - レシピの内容表示ウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● レシピデータウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_RecipeData() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_RecipeData.prototype = Object.create(Window_Selectable.prototype);
Window_RecipeData.prototype.constructor = Window_RecipeData;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_RecipeData.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        if(Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseAll) {
            this._useDesign = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseData;
        }else{
            this._useDesign = false;
        };
        this._isWindow = false;
        this.setupRecipeData();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_RecipeData.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        if(Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseAll) {
            this._useDesign = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseData;
        }else{
            this._useDesign = false;
        };
        this._isWindow = false;
        this.setupRecipeData();
    };
};
//--------------------------------------------------------------------------
// ● レシピデータ用のセットアップ
//--------------------------------------------------------------------------
Window_RecipeData.prototype.setupRecipeData = function() {
    this.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeDataWindow.MainOpacity;
    this.backOpacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeDataWindow.MainBackOpacity;
    this._pageSound = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageKey.PageChangeSound;
    this._pageUpKey = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageKey.PageUpKey;
    this._pageDownKey = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageKey.PageDownKey;
    this._number = 1;
    this._targetAmountInBag = 0;
    this._disasemblyRecipeExist = 0;
    this._addX = 0;
    this._addY = 0;
    this._page = 1;
};
//--------------------------------------------------------------------------
// ● 作成予定個数の設定
//--------------------------------------------------------------------------
Window_RecipeData.prototype.setNumber = function(number) {
    if (this._number !== number) {
        this._number = number;
        this.refresh();
    }
};
//--------------------------------------------------------------------------
// ● 採集/合成情報の設定
//--------------------------------------------------------------------------
Window_RecipeData.prototype.setAlchemyInfo = function(alchemy) {
    if (this._alchemy !== alchemy) {
        this._alchemy = alchemy;
        this._page = 1;
        this.refresh();
    }
};
//--------------------------------------------------------------------------
// ● レシピデータの参照
//--------------------------------------------------------------------------
Window_RecipeData.prototype.currentData = function() {
    return this._alchemy;
};
//--------------------------------------------------------------------------
// ● 合成モードの参照
//--------------------------------------------------------------------------
Window_RecipeData.prototype.createMode = function() {
    return this._page === 1;//true:合成 false:解体
};
//--------------------------------------------------------------------------
// ● レシピデータウィンドウの refresh を変更
//--------------------------------------------------------------------------
Window_RecipeData.prototype.getTargetAmount = function() {
    var itemName = "";
    var amountInBag = 0;
    if(this._alchemy.TargetWitchItem === "Item") {
        itemName = $dataItems[this._alchemy.TargetItem.EarnItem].name;
        amountInBag = $gameParty.numItems($dataItems[this._alchemy.TargetItem.EarnItem]);
    }else if(this._alchemy.TargetWitchItem === "Weapon") {
        itemName = $dataWeapons[this._alchemy.TargetWeapon.EarnWeapon].name;
        amountInBag = $gameParty.numItems($dataWeapons[this._alchemy.TargetWeapon.EarnWeapon]);
    }else if(this._alchemy.TargetWitchItem === "Armor") {
        itemName = $dataArmors[this._alchemy.TargetArmor.EarnArmor].name;
        amountInBag = $gameParty.numItems($dataArmors[this._alchemy.TargetArmor.EarnArmor]);
    };
    return [itemName,amountInBag];
};
//--------------------------------------------------------------------------
// ● レシピデータウィンドウの refresh を変更
//--------------------------------------------------------------------------
Window_RecipeData.prototype.refresh = function() {
    this.createContents();
    this.contents.clear();
    if(this._alchemy === undefined) {
        this.drawEmptyDesign();
        return;
    };
    this._addX = 0;
    this._addY = 0;
    this._targetItemName = this.getTargetAmount()[0];
    this._targetItemAmountInBag = this.getTargetAmount()[1];
    if(this._alchemy.DisassemblyRecipes) {
        this._disasemblyRecipeExist = this._alchemy.DisassemblyRecipes.length;
    }else{
        this._disasemblyRecipeExist = false;
    };
    if(this._alchemy.DisassemblyCostType) {
        if(!this._disasemblyRecipeExist) this._disasemblyRecipeExist = true;
    }else{
        this._disasemblyRecipeExist = false;
    };
    this.drawTargetIcon();
    this.drawTargetInfo();
    this.drawTargetDiscription();
    if(this._page === 1) this.drawCreateRecipes();
    if(this._page === 2) this.drawDisassemblyRecipes();
};
//--------------------------------------------------------------------------
// ● データ無し用のデザインの描画
//--------------------------------------------------------------------------
Window_RecipeData.prototype.drawEmptyDesign = function() {
    var colour = '#000000';
    this.contents.paintOpacity = 167;
    this.contents.fillRect(0,0,this.contents.width,this.contents.height,colour);
    this.contents.paintOpacity = 255;
};
//--------------------------------------------------------------------------
// ● 合成アイテムのアイコンの描画
//--------------------------------------------------------------------------
Window_RecipeData.prototype.drawTargetIcon = function() {
    var colour = '#000000';
    var iconIndex = 0;
    if(this._alchemy.TargetWitchItem === "Item") {
        iconIndex = $dataItems[this._alchemy.TargetItem.EarnItem].iconIndex;
    }else if(this._alchemy.TargetWitchItem === "Weapon") {
        iconIndex = $dataWeapons[this._alchemy.TargetWeapon.EarnWeapon].iconIndex;
    }else if(this._alchemy.TargetWitchItem === "Armor") {
        iconIndex = $dataArmors[this._alchemy.TargetArmor.EarnArmor].iconIndex;
    };
    var bitmap = ImageManager.loadSystem('IconSet');
    if(Utils.RPGMAKER_NAME === "MV") {
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
    }else if(Utils.RPGMAKER_NAME === "MZ") {
        var pw = ImageManager.iconWidth;
        var ph = ImageManager.iconHeight;
    };
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var dw = 128;//横幅拡大率
    var dh = 128;//縦幅拡大率
    if(Utils.RPGMAKER_NAME === "MV") {
        var dx = this._addX + (Window_Base._faceWidth - dw) / 2;
        var dy = this._addY + (Window_Base._faceHeight - dh) / 2;
    }else if(Utils.RPGMAKER_NAME === "MZ") {
        var dx = this._addX + (ImageManager.faceWidth - dw) / 2;
        var dy = this._addY + (ImageManager.faceHeight - dh) / 2;
    };
    
    if(this._useDesign) {
        this.contents.paintOpacity = 127;
        this.contents.fillRect(dx,dy,dw,dh,colour);
        this.contents.paintOpacity = 255;
    };

    this.contents._context.imageSmoothingEnabled = false;
    this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);
    this.contents._context.imageSmoothingEnabled = true;

    this._addX = dx + dw + 5;
    this._addY = dy;

    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 合成レシピの情報の描画
//--------------------------------------------------------------------------
Window_RecipeData.prototype.drawTargetInfo = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    this.contents.outlineWidth = 5;
    this.contents.fontSize = 20;
    this.changeTextColor("#FFC800");//アイテム名色
    this.drawText(this._targetItemName,this._addX,this._addY,this.contents.width);
    this.resetTextColor();
    this.contents.outlineWidth = 4;

    if($gameAlchemy.canLvl(this._alchemy.TargetAlchemyID)) {
        this.contents.fontSize = 16;
        var lvlTxt = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataLabels[0];
        var lvl = this._alchemy.LearnLvl;
        if(this._alchemy.LearnLvl < 1) lvl = 1;
        var lvlWidth = this.textWidth(lvl);
        if(this._alchemy.LearnLvl > 0) lvlWidth = this.textWidth(lvl);
        this.changeTextColor("#99ccff");//見出し
        this.drawText(lvlTxt,-10-lvlWidth,this._addY,this.contents.width,'right');
        this.resetTextColor();
        this.drawText(lvl,-10,this._addY,this.contents.width,'right');
    
        this._addY += this.lineHeight() - 10;
        
        var expTxt = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataLabels[1];
        var exp = $gameAlchemy.getExpOf(this._alchemy,10,false);
        if(exp > 0) exp = exp * this._number;
        var expWidth = this.textWidth(exp);
        this.changeTextColor("#00BF00");//緑
        this.drawText(expTxt,-15-expWidth,this._addY,this.contents.width,'right');
        this.resetTextColor();
        this.drawText(exp,-10,this._addY,this.contents.width,'right');
    
        this._addY -= this.lineHeight() - 10;
    };

    this._addY += this.lineHeight() - 10;

    this.contents.fontSize = 16;
    var hasTxt = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataLabels[2];
    var hasTxtWidth = this.textWidth(hasTxt);
    this.changeTextColor("#99ccff");//見出し
    this.drawText(hasTxt,this._addX,this._addY,this.contents.width);
    this.resetTextColor();
    this.drawText(this._targetItemAmountInBag,this._addX + hasTxtWidth + 5,this._addY,this.contents.width);

    this._addY += this.lineHeight();

    if(this._useDesign) {
        this.contents.fillRect(this._addX,this._addY,this.contents.width - this._addX,2,designColor);
    };

    this._addY += 5;

    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 合成アイテムの説明の描画
//--------------------------------------------------------------------------
Window_RecipeData.prototype.drawTargetDiscription = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    var description = "";
    if(this._alchemy.TargetWitchItem === "Item") {
        description = $dataItems[this._alchemy.TargetItem.EarnItem].description;
    }else if(this._alchemy.TargetWitchItem === "Weapon") {
        description = $dataWeapons[this._alchemy.TargetWeapon.EarnWeapon].description;
    }else if(this._alchemy.TargetWitchItem === "Armor") {
        description = $dataArmors[this._alchemy.TargetArmor.EarnArmor].description;
    };
    this.contents.fontSize = 15;
    this.drawTextEx(description,this._addX,this._addY);

    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● アイテム合成のレシピの描画
//--------------------------------------------------------------------------
Window_RecipeData.prototype.drawCreateRecipes = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };

    var colour = '#000000';
    
    this._addX = 5;

    this._addY = 128 + 15//アイコンの高さ+15
    if(this._useDesign) {
        this.contents.paintOpacity = 107;
        this.contents.fillRect(this._addX,this._addY,this.contents.width,36,colour);
        this.contents.paintOpacity = 255;
    
        this.contents.fillRect(this._addX,this._addY,this.contents.width - this._addX,1,designColor);
    };
    
    if(this._alchemy.CreateRecipes.length > 0) {

        this.contents.fontSize = 16;
        //右ボタン
        if(this._disasemblyRecipeExist > 0) {
            var rightCommandLabel = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageLabels[3];
            var rightCommandLabelWidth = this.textWidth(rightCommandLabel);
            var rightCommandName = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipePageDownLabel.PageDownKeyLabel;
            var rightCommandNameWidth = this.textWidth(rightCommandName);
            this._targetItemAmountInBag > 0 ? this.changeTextColor("#00BF00") : this.changePaintOpacity(false);
            this.drawText(rightCommandLabel,this.contents.width - 36 - 5 - rightCommandNameWidth - rightCommandLabelWidth - 5,this._addY,this.contents.width);
            this.resetTextColor();
            this.contents.paintOpacity = 255;
            this.drawText(rightCommandName,this.contents.width - 36 - 5 - rightCommandNameWidth,this._addY,this.contents.width);
            this.drawIcon(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipePageDownLabel.PageDownIcon,this.contents.width - 36 - 5,this._addY+3);
        }else{
            var rightCommandName = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageLabels[4];
            var rightCommandNameWidth = this.textWidth(rightCommandName);
            this.changeTextColor("#ff2020");
            this.drawText(rightCommandName,this.contents.width - 36 - 5 - rightCommandNameWidth,this._addY,this.contents.width);
            this.resetTextColor();
        };
        //中央
        this.contents.outlineWidth = 5;
        this.changeTextColor("#99ccff");//見出し
        this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageLabels[0],0,this._addY,this.contents.width,'center');
        this.resetTextColor();
        this.contents.outlineWidth = 4;
    
        this._addY += this.lineHeight();
        
        if(this._useDesign) {
            this.contents.fillRect(this._addX,this._addY,this.contents.width - this._addX,1,designColor);
        };
    
        this.contents.fontSize = 16;

        var itemIcon = 0;
        var itemName = "";
        var inBag = 0;
        var rightCounter = 0;
        var colNum = this._alchemy.CreateRecipes.length;

        this._addX = 80;
        this._addY += this.lineHeight()/2;
        
        this._alchemy.CreateRecipes.forEach(recipe => {
            if(recipe) {
                if(this._useDesign) {
                    if(rightCounter === 0) {
                        this.contents.paintOpacity = 107;
                        this.contents.fillRect(5,this._addY,this.contents.width,36,colour);
                        this.contents.paintOpacity = 255;
                    };
                };
                if(recipe.RecipeWitchItem === "Item") {
                    inBag = $gameParty.numItems($dataItems[recipe.RecipeItem]);
                    itemIcon = $dataItems[recipe.RecipeItem].iconIndex;
                    itemName = $dataItems[recipe.RecipeItem].name;
                }else if(recipe.RecipeWitchItem === "Weapon") {
                    inBag = $gameParty.numItems($dataWeapons[recipe.RecipeWeapon]);
                    itemIcon = $dataWeapons[recipe.RecipeWeapon].iconIndex;
                    itemName = $dataWeapons[recipe.RecipeWeapon].name;
                }else if(recipe.RecipeWitchItem === "Armor") {
                    inBag = $gameParty.numItems($dataArmors[recipe.RecipeArmor]);
                    itemIcon = $dataArmors[recipe.RecipeArmor].iconIndex;
                    itemName = $dataArmors[recipe.RecipeArmor].name;
                };
                var itemInfo = itemName + " x" + (recipe.NeedAmount * this._number);
                var inBagWidth = this.textWidth(inBag);
                inBag >= recipe.NeedAmount ? this.changePaintOpacity(true) : this.changePaintOpacity(false);
                this.drawIcon(itemIcon,this._addX,this._addY + 2);
                this.drawText(inBag,this._addX + (36/2 - 4) - (inBagWidth/2),this._addY + 10,this.contents.width);
                this.drawText(itemInfo,this._addX + 36,this._addY,this.contents.width);
                if(rightCounter >= 1) {
                    rightCounter = 0;
                    this._addX = 80;
                    this._addY += this.lineHeight();
                }else{
                    this._addX += 200;
                    rightCounter++;
                };
                this.contents.paintOpacity = 255;
            };
        });

        this._addX = 5;
        if(colNum % 2 === 0) {
            this._addY += this.lineHeight()/2;
        }else{
            this._addY += this.lineHeight() + this.lineHeight()/2;
        };
        
        if(this._useDesign) {
            this.contents.fillRect(this._addX,this._addY,this.contents.width - this._addX,1,designColor);
        };

        if(this._alchemy.CreateCostType) {
            var costType = this._alchemy.CreateCostType.CreateCostType;
            var costIconId = this._alchemy.CreateCostType.CostIcon.AlchemyIconID;
            var costIconX = this._alchemy.CreateCostType.CostIcon.AlchemyIconX;
            var costIconY = this._alchemy.CreateCostType.CostIcon.AlchemyIconY;
            var variableId = this._alchemy.CreateCostType.CostVariable;
            var costUnit = this._alchemy.CreateCostType.CostUnit;
            var costAmount = this._alchemy.CreateCostType.CostAmount;
            var addGainSub = "";
    
            if(costAmount > 0) costAmount = costAmount * this._number;
    
            var maxValue = 0;
    
            if(costType !== undefined) {
                if(costType === "gainMoney") {
                    addGainSub = "+";
                    maxValue = $gameParty.gold();
                }else if(costType === "loseMoney") {
                    addGainSub = "-";
                    maxValue = $gameParty.gold();
                }else if(costType === "addVariable") {
                    addGainSub = "+";
                    maxValue = $gameVariables.value(variableId);
                }else if(costType === "subVariable") {
                    addGainSub = "-";
                    maxValue = $gameVariables.value(variableId);
                };
                var costUnitWidth = this.textWidth(costUnit);
                var costAmountFinal = addGainSub + costAmount;
                var maxValueFinal = "/" + maxValue;
                var costAmountFinalWidth = this.textWidth(costAmountFinal);
                var maxValueFinalWidth = this.textWidth(maxValueFinal);
                if(costIconId !== -1) this.drawIcon(costIconId,this.contents.width - 36 - costAmountFinalWidth - costUnitWidth - maxValueFinalWidth - 10 + costIconX,this._addY + costIconY + 2);
                addGainSub === "-" ? this.changeTextColor("#ff2020") : this.changeTextColor("#00e060");
                this.drawText(costAmountFinal,-10 - maxValueFinalWidth - costUnitWidth,this._addY,this.contents.width,'right');
                this.resetTextColor();
                this.drawText(maxValueFinal,-10 - costUnitWidth,this._addY,this.contents.width,'right');
                this.changeTextColor("#99ccff");//見出し
                this.drawText(costUnit,-5,this._addY,this.contents.width,'right');
                this.resetTextColor();
            };
        };

    }else{//素材が未設定時

        this.contents.fontSize = 16;
        //右ボタン
        if(this._disasemblyRecipeExist > 0) {
            var rightCommandLabel = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageLabels[3];
            var rightCommandLabelWidth = this.textWidth(rightCommandLabel);
            var rightCommandName = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipePageDownLabel.PageDownKeyLabel;
            var rightCommandNameWidth = this.textWidth(rightCommandName);
            this._targetItemAmountInBag > 0 ? this.changeTextColor("#00BF00") : this.changePaintOpacity(false);
            this.drawText(rightCommandLabel,this.contents.width - 36 - 5 - rightCommandNameWidth - rightCommandLabelWidth - 5,this._addY,this.contents.width);
            this.resetTextColor();
            this.contents.paintOpacity = 255;
            this.drawText(rightCommandName,this.contents.width - 36 - 5 - rightCommandNameWidth,this._addY,this.contents.width);
            this.drawIcon(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipePageDownLabel.PageDownIcon,this.contents.width - 36 - 5,this._addY+3);
        }else{
            var rightCommandName = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageLabels[4];
            var rightCommandNameWidth = this.textWidth(rightCommandName);
            this.changeTextColor("#ff2020");
            this.drawText(rightCommandName,this.contents.width - 36 - 5 - rightCommandNameWidth,this._addY,this.contents.width);
            this.resetTextColor();
        };
        //中央
        this.contents.outlineWidth = 5;
        this.changeTextColor("#99ccff");//見出し
        this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageLabels[1],0,this._addY,this.contents.width,'center');
        this.resetTextColor();
        this.contents.outlineWidth = 4;
    
        this._addY += this.lineHeight();
        
        if(this._useDesign) {
            this.contents.fillRect(this._addX,this._addY,this.contents.width - this._addX,1,designColor);
        };

        if(this._alchemy.CreateCostType) {
            var costType = this._alchemy.CreateCostType.CreateCostType;
            var costIconId = this._alchemy.CreateCostType.CostIcon.AlchemyIconID;
            var costIconX = this._alchemy.CreateCostType.CostIcon.AlchemyIconX;
            var costIconY = this._alchemy.CreateCostType.CostIcon.AlchemyIconY;
            var variableId = this._alchemy.CreateCostType.CostVariable;
            var costUnit = this._alchemy.CreateCostType.CostUnit;
            var costAmount = this._alchemy.CreateCostType.CostAmount;
            var addGainSub = "";
    
            if(costAmount > 0) costAmount = costAmount * this._number;
    
            var maxValue = 0;
    
            if(costType !== undefined) {
                if(costType === "gainMoney") {
                    addGainSub = "+";
                    maxValue = $gameParty.gold();
                }else if(costType === "loseMoney") {
                    addGainSub = "-";
                    maxValue = $gameParty.gold();
                }else if(costType === "addVariable") {
                    addGainSub = "+";
                    maxValue = $gameVariables.value(variableId);
                }else if(costType === "subVariable") {
                    addGainSub = "-";
                    maxValue = $gameVariables.value(variableId);
                };
                var costUnitWidth = this.textWidth(costUnit);
                var costAmountFinal = addGainSub + costAmount;
                var maxValueFinal = "/" + maxValue;
                var costAmountFinalWidth = this.textWidth(costAmountFinal);
                var maxValueFinalWidth = this.textWidth(maxValueFinal);
                if(costIconId !== -1) this.drawIcon(costIconId,this.contents.width - 36 - costAmountFinalWidth - costUnitWidth - maxValueFinalWidth - 10 + costIconX,this._addY + costIconY + 2);
                addGainSub === "-" ? this.changeTextColor("#ff2020") : this.changeTextColor("#00e060");
                this.drawText(costAmountFinal,-10 - maxValueFinalWidth - costUnitWidth,this._addY,this.contents.width,'right');
                this.resetTextColor();
                this.drawText(maxValueFinal,-10 - costUnitWidth,this._addY,this.contents.width,'right');
                this.changeTextColor("#99ccff");//見出し
                this.drawText(costUnit,-5,this._addY,this.contents.width,'right');
                this.resetTextColor();
            };
        };

    };

    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● アイテム解体のレシピの描画
//--------------------------------------------------------------------------
Window_RecipeData.prototype.drawDisassemblyRecipes = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };

    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    
    this._addX = 5;

    this._addY = 128 + 15//アイコンの高さ+15
    
    var colour = '#000000';
    if(this._useDesign) {
        this.contents.paintOpacity = 107;
        this.contents.fillRect(this._addX,this._addY,this.contents.width,36,colour);
        this.contents.paintOpacity = 255;
            
        this.contents.fillRect(this._addX,this._addY,this.contents.width - this._addX,1,designColor);
    };
    
    if(this._alchemy.DisassemblyRecipes.length > 0) {
        this.contents.fontSize = 16;
        //左ボタン
        var leftCommandName = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageUpLabel.PageUpKeyLabel;
        var leftCommandNameWidth = this.textWidth(leftCommandName);
        this.drawIcon(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageUpLabel.PageUpIcon,this.contents.width - this.contents.width + 10,this._addY+3);
        this.drawText(leftCommandName,this.contents.width - this.contents.width + 10 + 36,this._addY,this.contents.width);
        this.changeTextColor("#00BF00");//緑
        this.drawText($gameAlchemy.getName(this._alchemy.TargetAlchemyID),this.contents.width - this.contents.width + 10 + 36 + leftCommandNameWidth + 5,this._addY,this.contents.width);
        this.resetTextColor();
        //中央
        this.contents.outlineWidth = 5;
        this.changeTextColor("#99ccff");//見出し
        this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageLabels[2],0,this._addY,this.contents.width,'center');
        this.resetTextColor();
        this.contents.outlineWidth = 4;
    
        this._addY += this.lineHeight();
        
        if(this._useDesign) {
            this.contents.fillRect(this._addX,this._addY,this.contents.width - this._addX,1,designColor);
        };
    
        this.contents.fontSize = 16;

        var itemIcon = 0;
        var itemName = "";
        var rightCounter = 0;
        var colNum = this._alchemy.DisassemblyRecipes.length;

        this._addX = 80;
        this._addY += this.lineHeight()/2;
        
        this._alchemy.DisassemblyRecipes.forEach(recipe => {
            if(recipe) {
                if(rightCounter === 0) {
                    this.contents.paintOpacity = 107;
                    this.contents.fillRect(5,this._addY,this.contents.width,36,colour);
                    this.contents.paintOpacity = 255;
                };
                if(recipe.RecipeWitchItem === "Item") {
                    itemIcon = $dataItems[recipe.RecipeItem].iconIndex;
                    itemName = $dataItems[recipe.RecipeItem].name;
                }else if(recipe.RecipeWitchItem === "Weapon") {
                    itemIcon = $dataWeapons[recipe.RecipeWeapon].iconIndex;
                    itemName = $dataWeapons[recipe.RecipeWeapon].name;
                }else if(recipe.RecipeWitchItem === "Armor") {
                    itemIcon = $dataArmors[recipe.RecipeArmor].iconIndex;
                    itemName = $dataArmors[recipe.RecipeArmor].name;
                };
                var itemInfo = itemName + " x" + (recipe.NeedAmount * this._number);
                this.drawIcon(itemIcon,this._addX,this._addY + 2);
                this.drawText(itemInfo,this._addX + 36,this._addY,this.contents.width);
                if(rightCounter >= 1) {
                    rightCounter = 0;
                    this._addX = 80;
                    this._addY += this.lineHeight();
                }else{
                    this._addX += 200;
                    rightCounter++;
                };
                this.contents.paintOpacity = 255;
            };
        });

        this._addX = 5;
        if(colNum % 2 === 0) {
            this._addY += this.lineHeight()/2;
        }else{
            this._addY += this.lineHeight() + this.lineHeight()/2;
        };

        if(this._useDesign) {
            this.contents.fillRect(this._addX,this._addY,this.contents.width - this._addX,1,designColor);
        };

        if(this._alchemy.DisassemblyCostType) {
            var costType = this._alchemy.DisassemblyCostType.CreateCostType;
            var costIconId = this._alchemy.DisassemblyCostType.CostIcon.AlchemyIconID;
            var costIconX = this._alchemy.DisassemblyCostType.CostIcon.AlchemyIconX;
            var costIconY = this._alchemy.DisassemblyCostType.CostIcon.AlchemyIconY;
            var variableId = this._alchemy.DisassemblyCostType.CostVariable;
            var costUnit = this._alchemy.DisassemblyCostType.CostUnit;
            var costAmount = this._alchemy.DisassemblyCostType.CostAmount;
            var addGainSub = "";
    
            if(costAmount > 0) costAmount = costAmount * this._number;
    
            var maxValue = 0;
    
            if(costType !== undefined) {
                if(costType === "gainMoney") {
                    addGainSub = "+";
                    maxValue = $gameParty.gold();
                }else if(costType === "loseMoney") {
                    addGainSub = "-";
                    maxValue = $gameParty.gold();
                }else if(costType === "addVariable") {
                    addGainSub = "+";
                    maxValue = $gameVariables.value(variableId);
                }else if(costType === "subVariable") {
                    addGainSub = "-";
                    maxValue = $gameVariables.value(variableId);
                };
                var costUnitWidth = this.textWidth(costUnit);
                var costAmountFinal = addGainSub + costAmount;
                var maxValueFinal = "/" + maxValue;
                var costAmountFinalWidth = this.textWidth(costAmountFinal);
                var maxValueFinalWidth = this.textWidth(maxValueFinal);
                if(costIconId !== -1) this.drawIcon(costIconId,this.contents.width - 36 - costAmountFinalWidth - costUnitWidth - maxValueFinalWidth - 10 + costIconX,this._addY + costIconY + 2);
                addGainSub === "-" ? this.changeTextColor("#ff2020") : this.changeTextColor("#00e060");
                this.drawText(costAmountFinal,-10 - maxValueFinalWidth - costUnitWidth,this._addY,this.contents.width,'right');
                this.resetTextColor();
                this.drawText(maxValueFinal,-10 - costUnitWidth,this._addY,this.contents.width,'right');
                this.changeTextColor("#99ccff");//見出し
                this.drawText(costUnit,-5,this._addY,this.contents.width,'right');
                this.resetTextColor();
            };
        };

    }else{//素材が未設定時

        this.contents.fontSize = 16;
        //左ボタン
        var pageUpLabel = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageUpLabel.PageUpKeyLabel;
        var pageUpLabelWidth = this.textWidth(pageUpLabel);
        var alchemyName = $gameAlchemy.getName(this._alchemy.TargetAlchemyID);
        this.drawIcon(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageUpLabel.PageUpIcon,this.contents.width - this.contents.width + 10,this._addY+3);
        this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageUpLabel.PageUpKeyLabel,this.contents.width - this.contents.width + 10 + 36,this._addY,this.contents.width);
        this.changeTextColor("#00BF00");//緑
        this.drawText(alchemyName,this.contents.width - this.contents.width + 10 + 36 + pageUpLabelWidth + 5,this._addY,this.contents.width);
        this.resetTextColor();
        //中央
        this.contents.outlineWidth = 5;
        this.changeTextColor("#99ccff");//見出し
        this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuRecipeDataPageLabels[5],0,this._addY,this.contents.width,'center');
        this.resetTextColor();
        this.contents.outlineWidth = 4;
    
        this._addY += this.lineHeight();

        if(this._useDesign) {
            this.contents.fillRect(this._addX,this._addY,this.contents.width - this._addX,1,designColor);
        };

        if(this._alchemy.DisassemblyCostType) {
            var costType = this._alchemy.DisassemblyCostType.CreateCostType;
            var costIconId = this._alchemy.DisassemblyCostType.CostIcon.AlchemyIconID;
            var costIconX = this._alchemy.DisassemblyCostType.CostIcon.AlchemyIconX;
            var costIconY = this._alchemy.DisassemblyCostType.CostIcon.AlchemyIconY;
            var variableId = this._alchemy.DisassemblyCostType.CostVariable;
            var costUnit = this._alchemy.DisassemblyCostType.CostUnit;
            var costAmount = this._alchemy.DisassemblyCostType.CostAmount;
            var addGainSub = "";
    
            if(costAmount > 0) costAmount = costAmount * this._number;
    
            var maxValue = 0;
    
            if(costType !== undefined) {
                if(costType === "gainMoney") {
                    addGainSub = "+";
                    maxValue = $gameParty.gold();
                }else if(costType === "loseMoney") {
                    addGainSub = "-";
                    maxValue = $gameParty.gold();
                }else if(costType === "addVariable") {
                    addGainSub = "+";
                    maxValue = $gameVariables.value(variableId);
                }else if(costType === "subVariable") {
                    addGainSub = "-";
                    maxValue = $gameVariables.value(variableId);
                };
                var costUnitWidth = this.textWidth(costUnit);
                var costAmountFinal = addGainSub + costAmount;
                var maxValueFinal = "/" + maxValue;
                var costAmountFinalWidth = this.textWidth(costAmountFinal);
                var maxValueFinalWidth = this.textWidth(maxValueFinal);
                if(costIconId !== -1) this.drawIcon(costIconId,this.contents.width - 36 - costAmountFinalWidth - costUnitWidth - maxValueFinalWidth - 10 + costIconX,this._addY + costIconY + 2);
                addGainSub === "-" ? this.changeTextColor("#ff2020") : this.changeTextColor("#00e060");
                this.drawText(costAmountFinal,-10 - maxValueFinalWidth - costUnitWidth,this._addY,this.contents.width,'right');
                this.resetTextColor();
                this.drawText(maxValueFinal,-10 - costUnitWidth,this._addY,this.contents.width,'right');
                this.changeTextColor("#99ccff");//見出し
                this.drawText(costUnit,-5,this._addY,this.contents.width,'right');
                this.resetTextColor();
            };
        };

    };

    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● レシピデータウィンドウの更新
//--------------------------------------------------------------------------
Window_RecipeData.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if(!this.active && !this._opening) return;
    if(this._disasemblyRecipeExist <= 0) return;
    if(Input.isTriggered(this._pageUpKey)) this.changePage();
    if(Input.isTriggered(this._pageDownKey)) this.changePage();
};
//--------------------------------------------------------------------------
// ● ページの変更
//--------------------------------------------------------------------------
Window_RecipeData.prototype.changePage = function() {
    if(this._alchemy === undefined) return;
    if(this._page === 1) {
        this._page = 2;
        AudioManager.playSe({"name": this._pageSound ,"volume":90,"pitch":100,"pan":0});
    }else if(this._page === 2){
        this._page = 1;
        AudioManager.playSe({"name": this._pageSound ,"volume":90,"pitch":100,"pan":0});
    };
    this.refresh();
};
// --------------------------------------------------------------------------
// ● drawTextEx - Window_RecipeData専用化
// --------------------------------------------------------------------------
if(Utils.RPGMAKER_NAME === "MV") {
    Window_RecipeData.prototype.drawTextEx = function(text, x, y) {
        if (text) {
            var textState = { index: 0, x: x, y: y, left: x };
            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.calcTextHeight(textState, false);
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        } else {
            return 0;
        }
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_RecipeData.prototype.drawTextEx = function(text, x, y, width) {
        const textState = this.createTextState(text, x, y, width);
        this.processAllText(textState);
        return textState.outputWidth;
    };
};

//=============================================================================
// Window_ItemCreateStatus - 合成状況ウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● 合成状況ウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_ItemCreateStatus() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_ItemCreateStatus.prototype = Object.create(Window_Selectable.prototype);
Window_ItemCreateStatus.prototype.constructor = Window_ItemCreateStatus;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_ItemCreateStatus.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._isWindow = false;
        this.setupCreateData();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_ItemCreateStatus.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._isWindow = false;
        this.setupCreateData();
    };
};
//--------------------------------------------------------------------------
// ● レシピデータ用のセットアップ
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.setupCreateData = function() {
    this._createMode = true;//true:合成 false:解体
    this._createAmount = 0;
    this._currentGauge = 0;
    this._updateGauge = false;
    this._createChance = 0;
    this._createSpeed = 0;
    this._createExp = 0;
    this._other = undefined;
    this._gaugeTimer = 0;
    this._currentNextTimer = 0;
    this._maxNextTimer = 0;
    this._updateNextCreateTimer = false;
    this._gaugeWidth = 0;
    this._meterWidth = 0;
    this._isSuccess = 0;
    this.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuItemCreaterWindow.MainOpacity;
    this.backOpacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuItemCreaterWindow.MainBackOpacity;

    this._activeSE = undefined;
    this._currentActivePlayDelay = 0;
    this._activePlayDelay = 0;
    this._createSuccessSE = undefined;
    this._createFailedSe = undefined;
};
//--------------------------------------------------------------------------
// ● フレームの更新
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if(this._updateGauge) this.updateGauge();
    if(this._updateNextCreateTimer) this.updateNextCreateTimer();
};
//--------------------------------------------------------------------------
// ● ゲージの更新
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.updateGauge = function() {
    if(this._gaugeTimer > 0) {
        this._gaugeTimer--;
    };
    if(this._gaugeTimer === 0) {
        this.refresh();
        this._currentGauge++;
    };
    if(this._currentActivePlayDelay >= this._activePlayDelay) {
        this._currentActivePlayDelay = 0;
    };
    if(this._currentActivePlayDelay === 0) {
        AudioManager.playSe({"name": this._activeSE ,"volume":100,"pitch":100,"pan":0});
        this._currentActivePlayDelay++;
    };
    if(this._currentGauge >= this._createSpeed) {
        this._gaugeTimer = 60;
        this.refresh();
        this._updateGauge = false;
        if(this._createAmount > 0) {
            this._updateNextCreateTimer = true;
        };
    };
};
//--------------------------------------------------------------------------
// ● 次の作成までのdelayタイマーの更新
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.updateNextCreateTimer = function() {
    if(this._currentNextTimer <= this._maxNextTimer) {
        this._currentNextTimer++;
    };
    if(this._currentNextTimer === this._maxNextTimer) {
        this._updateNextCreateTimer = false;
        this._currentNextTimer = 0;
        if(this._createAmount > 1) {
            this._gaugeTimer = 0;
            this._createAmount--;
            this.continueCreater();
        }else{
            this.resetCreater();
            SceneManager._scene.alchemyNumberCancel();
            this.refresh();
        };
    };
};
//--------------------------------------------------------------------------
// ● 採集/合成情報の設定
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.setAlchemyInfo = function(alchemy) {
    if (this._alchemy !== alchemy) {
        this._alchemy = alchemy;
        if(this._alchemy) this.makeCreaterInfo();
        this.refresh();
    }
};
//--------------------------------------------------------------------------
// ● レシピデータの参照
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.currentData = function() {
    return this._alchemy;
};
//--------------------------------------------------------------------------
// ● 合成/解体の開始の参照this._mode
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.createMode = function(boolean) {
    if(this._createMode === boolean) return;
    this._createMode = boolean;
};
//--------------------------------------------------------------------------
// ● 合成/解体データーセットアップ
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.makeCreaterInfo = function() {
    if($gameAlchemy.alchemyList(this._alchemy.TargetAlchemyID).se) {
        this._activeSE = $gameAlchemy.alchemyList(this._alchemy.TargetAlchemyID).se.activeSE;
        this._currentActivePlayDelay = 0;
        this._activePlayDelay = $gameAlchemy.alchemyList(this._alchemy.TargetAlchemyID).se.activePlayDelay;
        this._createSuccessSE = $gameAlchemy.alchemyList(this._alchemy.TargetAlchemyID).se.completeSE;
        this._createFailedSe = $gameAlchemy.alchemyList(this._alchemy.TargetAlchemyID).se.failedSE;
    };

    this._currentGauge = 0;
    this._gaugeTimer = 0;
    this._gaugeWidth = 142;
    this._updateGauge = false;
    this._meterWidth = this._gaugeWidth - 2;
    
    this._createChance = $gameAlchemy.getChanceOf(this._alchemy,10,false);
    this._createSpeed = Math.floor($gameAlchemy.getSpeedOf(this._alchemy,10,false) * 60);
    this._createExp = $gameAlchemy.getExpOf(this._alchemy,10,false);
    
    this._isSuccess = 0;
    this._other = undefined;

    this._currentNextTimer = 0;
    this._maxNextTimer = 0;
    this._updateNextCreateTimer = false;
};
//--------------------------------------------------------------------------
// ● 合成/解体開始フラグ
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.startCreater = function(createAmount) {
    this._updateNextCreateTimer = false;
    this._createAmount = createAmount;
    this._currentNextTimer = 0;
    this._createChance = $gameAlchemy.getChanceOf(this._alchemy,10,false);
    this._createSpeed = Math.floor($gameAlchemy.getSpeedOf(this._alchemy,10,false) * 60);
    this._createExp = $gameAlchemy.getExpOf(this._alchemy,10,false);
    this._maxNextTimer = 50;//合成/解体完了後の次の合成/解体までのdelay
    this._isSuccess = $gameAlchemy.getRandomIntInclusive(1,100);
    this._other = $gameAlchemy.createrLottery(this._alchemy,this._createChance,this._isSuccess,this._createMode);
    this._updateGauge = true;
};
//--------------------------------------------------------------------------
// ● 合成/解体継続フラグ
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.continueCreater = function() {
    this._currentNextTimer = 0;
    this._currentGauge = 0;
    this._currentActivePlayDelay = 0;
    this._createChance = $gameAlchemy.getChanceOf(this._alchemy,10,false);
    this._createSpeed = Math.floor($gameAlchemy.getSpeedOf(this._alchemy,10,false) * 60);
    this._createExp = $gameAlchemy.getExpOf(this._alchemy,10,false);
    this._isSuccess = $gameAlchemy.getRandomIntInclusive(1,100);
    this._other = $gameAlchemy.createrLottery(this._alchemy,this._createChance,this._isSuccess,this._createMode);
    this._updateGauge = true;
};
//--------------------------------------------------------------------------
// ● 合成/解体リセット
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.resetCreater = function() {
    this._currentNextTimer = 0;
    this._currentGauge = 0;
    this._gaugeTimer = 0;
    this._currentActivePlayDelay = 0;
    this._createChance = $gameAlchemy.getChanceOf(this._alchemy,10,false);
    this._createSpeed = Math.floor($gameAlchemy.getSpeedOf(this._alchemy,10,false) * 60);
    this._createExp = $gameAlchemy.getExpOf(this._alchemy,10,false);
    this._isSuccess = $gameAlchemy.getRandomIntInclusive(1,100);
    this._other = undefined;
    this._updateGauge = false;
};
//--------------------------------------------------------------------------
// ● 合成/解体による素材消費と獲得
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.executeRecipes = function() {
    var targetItem = undefined;
    if(this._createMode) {//合成
        if(this._alchemy.CreateRecipes) {
            if(this._alchemy.CreateRecipes.length > 0) {
                this._alchemy.CreateRecipes.forEach(item => {
                    if(item) {
                        if(item.RecipeWitchItem === "Item") {
                            targetItem = $dataItems[item.RecipeItem]
                            amount = item.NeedAmount;
                            $gameParty.loseItem(targetItem,amount);
                        }else if(item.RecipeWitchItem === "Weapon") {
                            targetItem = $dataWeapons[item.RecipeWeapon]
                            amount = item.NeedAmount;
                            $gameParty.loseItem(targetItem,amount,true);
                        }else if(item.RecipeWitchItem === "Armor") {
                            targetItem = $dataArmors[item.RecipeArmor]
                            amount = item.NeedAmount;
                            $gameParty.loseItem(targetItem,amount,true);
                        };
                    };
                });

            }; 
        };

        if(this._alchemy.CreateCostType) {
            var costType = this._alchemy.CreateCostType.CreateCostType;
            var variableId = this._alchemy.CreateCostType.CostVariable;
            var costAmount = this._alchemy.CreateCostType.CostAmount;
    
            if(costType !== undefined) {
                if(costType === "gainMoney") {
                    $gameParty.gainGold(costAmount);
                }else if(costType === "loseMoney") {
                    $gameParty.loseGold(costAmount);
                }else if(costType === "addVariable") {
                    $gameMap._interpreter.operateVariable(variableId,1,costAmount);
                }else if(costType === "subVariable") {
                    $gameMap._interpreter.operateVariable(variableId,2,costAmount);
                };
            };
        };
    }else{//解体
        if(this._alchemy.TargetWitchItem === "Item") {
            targetItem = $dataItems[this._alchemy.TargetItem.EarnItem];
            $gameParty.loseItem(targetItem,1);
        }else if(this._alchemy.TargetWitchItem === "Weapon") {
            targetItem = $dataWeapons[this._alchemy.TargetWeapon.EarnWeapon];
            $gameParty.loseItem(targetItem,1,true);
        }else if(this._alchemy.TargetWitchItem === "Armor") {
            targetItem = $dataArmors[this._alchemy.TargetArmor.EarnArmor];
            $gameParty.loseItem(targetItem,1,true);
        };

        if(this._alchemy.DisassemblyCostType) {
            var costType = this._alchemy.DisassemblyCostType.CreateCostType;
            var variableId = this._alchemy.DisassemblyCostType.CostVariable;
            var costAmount = this._alchemy.DisassemblyCostType.CostAmount;
    
            if(costType !== undefined) {
                if(costType === "gainMoney") {
                    $gameParty.gainGold(costAmount);
                }else if(costType === "loseMoney") {
                    $gameParty.loseGold(costAmount);
                }else if(costType === "addVariable") {
                    $gameMap._interpreter.operateVariable(variableId,1,costAmount);
                }else if(costType === "subVariable") {
                    $gameMap._interpreter.operateVariable(variableId,2,costAmount);
                };
            };
        };
    };
};
//--------------------------------------------------------------------------
// ● 合成/解体ウィンドウの refresh を変更
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.refresh = function() {
    this.createContents();
    this.contents.clear();
    if(this._alchemy === undefined) {
        this.drawEmptyDesign();
        return;
    };
    this._addX = 0;
    this._addY = 0;
    if(this._gaugeTimer === 60) {
        if(this._other !== undefined) {
            this.drawCreateSuccessContents();
        }else{
            this._addY += this.lineHeight();
        };
    }else{
        this._addY += this.lineHeight();
    };
    if(!SceneManager._scene._isExclusiveScene) {
        if($gameAlchemy.alchemyList(this._alchemy.TargetAlchemyID).alchemyInExclusiveScene) {
            this.drawUseOnlyExclusive();
        }else{
            this.drawCreateGauge();
        };
    }else{
        this.drawCreateGauge();
    };
};
//--------------------------------------------------------------------------
// ● データ無し用のデザインの描画
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.drawEmptyDesign = function() {
    var colour = '#000000';
    this.contents.paintOpacity = 167;
    this.contents.fillRect(0,0,this.contents.width,this.contents.height,colour);
    this.contents.paintOpacity = 255;
};
//--------------------------------------------------------------------------
// ● 合成/解体専用画面への案内
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.drawUseOnlyExclusive = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.paintOpacity = 255;
    this.contents.fontSize = 16;
    var name = $gameAlchemy.getName(this._alchemy.TargetAlchemyID);
    var sentence = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuItemCreateNoCreaterMenu;
    var warnTxt = sentence.replace("name",name);
    this.changeTextColor("#ff2020");//赤
    this.drawText(warnTxt,(this.contents.width - this.contents.width) + 5,this._addY-3,this.contents.width);
    this.resetTextColor();
    this._addY += this.lineHeight();
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 合成/解体情報の描画
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.drawCreateSuccessContents = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 14;
    var earnName = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuItemCreateInfoLabels[0];
    if(!this._createMode) earnName = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuItemCreateInfoLabels[1];
    var earnNameWidth = this.textWidth(earnName);
    this.changeTextColor("#84a9ff");
    this.drawIcon(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuItemCreateInfoIcons,this.contents.width - this.contents.width + 5,this._addY + 2);
    this.drawText(earnName,(this.contents.width - this.contents.width) + 5 + 36,this._addY,this.contents.width);
    this.resetTextColor();
    this._bgY += this.lineHeight();
    var moveX = (this.contents.width - this.contents.width) + 5 + 36 + earnNameWidth + 10;
    if(this._other.length > 0) {
        this.contents.fontSize = 12;
        this._other.forEach(item => {
            if(item) {
                if(item[0] === "I") {
                    this.drawIcon($dataItems[item[1]].iconIndex,moveX,this._addY + 2);
                    this.drawText($dataItems[item[1]].name,moveX+36,this._addY,this.contents.width);
                    var earnAmount = "x" + item[2];
                    var earnAmountWidth = this.textWidth(earnAmount);
                    if(earnAmountWidth <= 12) {//1桁
                        var earnX = (36/2) + moveX;
                    }else{
                        if(earnAmountWidth <= 18) {//2桁
                            var earnX = (36/2) - (earnAmountWidth/4) + moveX;
                        }else{
                            if(earnAmountWidth <= 24) {//3桁
                                var earnX = (36/2) - (earnAmountWidth/3) + moveX;
                            }else{//4桁
                                var earnX = (36/2) - (earnAmountWidth/2) + moveX;
                            };
                        };
                    };
                    this.drawText(earnAmount,earnX,this._addY + 9,this.contents.width);
                    moveX += 36;
                }else if(item[0] === "W") {
                    this.drawIcon($dataWeapons[item[1]].iconIndex,moveX,this._addY + 2);
                    this.drawText($dataWeapons[item[1]].name,moveX+36,this._addY,this.contents.width);
                    var earnAmount = "x" + item[2];
                    var earnAmountWidth = this.textWidth(earnAmount);
                    if(earnAmountWidth <= 12) {//1桁
                        var earnX = (36/2) + moveX;
                    }else{
                        if(earnAmountWidth <= 18) {//2桁
                            var earnX = (36/2) - (earnAmountWidth/4) + moveX;
                        }else{
                            if(earnAmountWidth <= 24) {//3桁
                                var earnX = (36/2) - (earnAmountWidth/3) + moveX;
                            }else{//4桁
                                var earnX = (36/2) - (earnAmountWidth/2) + moveX;
                            };
                        };
                    };
                    this.drawText(earnAmount,earnX,this._addY + 9,this.contents.width);
                    moveX += 36;
                }else if(item[0] === "A") {
                    this.drawIcon($dataArmors[item[1]].iconIndex,moveX,this._addY + 2);
                    this.drawText($dataArmors[item[1]].name,moveX+36,this._addY,this.contents.width);
                    var earnAmount = "x" + item[2];
                    var earnAmountWidth = this.textWidth(earnAmount);
                    if(earnAmountWidth <= 12) {//1桁
                        var earnX = (36/2) + moveX;
                    }else{
                        if(earnAmountWidth <= 18) {//2桁
                            var earnX = (36/2) - (earnAmountWidth/4) + moveX;
                        }else{
                            if(earnAmountWidth <= 24) {//3桁
                                var earnX = (36/2) - (earnAmountWidth/3) + moveX;
                            }else{//4桁
                                var earnX = (36/2) - (earnAmountWidth/2) + moveX;
                            };
                        };
                    };
                    this.drawText(earnAmount,earnX,this._addY + 9,this.contents.width);
                    moveX += 36;
                };
                if(moveX >= this.contents.width) {
                    moveX = (this.contents.width - this.contents.width) + 5 + 36 + earnNameWidth + 10;
                    this._addY += this.lineHeight();
                    this._bgY += this.lineHeight();
                };
            };
        });
    }else{
        this.contents.fontSize = 14;
        this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuItemCreateInfoLabels[2],moveX,this._addY,this.contents.width);
    };
    this._addY += this.lineHeight();
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 採取情報の描画
//--------------------------------------------------------------------------
Window_ItemCreateStatus.prototype.drawCreateGauge = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 14;
    var successName = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuItemCreateGaugeLabels[0] + this._createChance + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuItemCreateGaugeLabels[1];
    var successNameWidth = this.textWidth(successName);
    this.drawIcon($gameAlchemy.getIconId(this._alchemy.TargetAlchemyID),this.contents.width - this.contents.width + 5,this._addY + 2);
    this.drawText(successName,(this.contents.width - this.contents.width) + 5 + 36,this._addY,this.contents.width);
    this.resetTextColor();
    this._addY += 9;
    this._bgY += this.lineHeight();
    var moveX = (this.contents.width - this.contents.width) + 5 + 36 + successNameWidth + 10;
    this.contents.fillRect(moveX,this._addY,this._gaugeWidth,18,"#191919");
    this.contents.fillRect(moveX+1,this._addY+1,this._meterWidth * this._currentGauge / this._createSpeed,8,"#B4E1F5");
    this.contents.fillRect(moveX+1,this._addY+9,this._meterWidth * this._currentGauge / this._createSpeed,8,"#14A0E1");
    if(this._gaugeTimer === 60) {
        if(this._createChance >= this._isSuccess) {
            this.changeTextColor("#00e060");
            var successCondition = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuItemCreateGaugeLabels[2];
            AudioManager.playSe({"name": this._createSuccessSE ,"volume":90,"pitch":100,"pan":0});
            if(this._createExp > 0) {
                successCondition += " " + this._createExp + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuItemCreateGaugeLabels[4];
                $gameAlchemy.gainExp(this._alchemy.TargetAlchemyID,this._createExp);
            };
            this.executeRecipes();
            $gameAlchemy.earnExtCreateItems(this._other);
        }else{
            this.changeTextColor("#ff2020");
            var successCondition = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuItemCreateGaugeLabels[3];
            AudioManager.playSe({"name": this._createFailedSe ,"volume":90,"pitch":100,"pan":0});
            if(this._createExp > 0) {
                var loseExp = Math.floor(this._createExp/2);
                if(loseExp <= 1) loseExp = 1; 
                successCondition += " " + loseExp + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuItemCreateGaugeLabels[4];
                $gameAlchemy.gainExp(this._alchemy.TargetAlchemyID,loseExp);
            };
            this.executeRecipes();
            $gameAlchemy.earnExtCreateItems(this._other);
        };
        this._addY -= 9;
        this.drawText(successCondition,moveX + this._gaugeWidth + 10,this._addY,this.contents.width);
        SceneManager._scene.refreshAllWindows();
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
// --------------------------------------------------------------------------
// ● drawTextEx - Window_ItemCreateStatus専用化
// --------------------------------------------------------------------------
if(Utils.RPGMAKER_NAME === "MV") {
    Window_ItemCreateStatus.prototype.drawTextEx = function(text, x, y) {
        if (text) {
            var textState = { index: 0, x: x, y: y, left: x };
            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.calcTextHeight(textState, false);
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        } else {
            return 0;
        }
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_ItemCreateStatus.prototype.drawTextEx = function(text, x, y, width) {
        const textState = this.createTextState(text, x, y, width);
        this.processAllText(textState);
        return textState.outputWidth;
    };
};

//=============================================================================
// Window_AlchemyNumber - 合成数を指定するウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● 合成数を指定するウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_AlchemyNumber() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_AlchemyNumber.prototype = Object.create(Window_Selectable.prototype);
Window_AlchemyNumber.prototype.constructor = Window_AlchemyNumber;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_AlchemyNumber.prototype.initialize = function(x = 0, y = 0, width = 0, height = 0) {
        var x = 0;
        var y = (Graphics.height/2) - (this.sceneWindowHeight()/2);
        var width = this.sceneWindowWidth();
        var height = this.sceneWindowHeight();
        Window_Selectable.prototype.initialize.call(this,x,y,width,height);
        if(Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseAll) {
            this._useDesign = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseCreaterNumber;
        }else{
            this._useDesign = false;
        };
        this._isWindow = false;
        this._recipe = null;
        this._max = 1;
        this._number = 1;
        this._addY = 0;
        this._createMode = true;//true:合成 false:解体
        this.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.MainOpacity;
        this.backOpacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.MainBackOpacity;
        this.visible = false;
        this.createButtons();
        this.winSkin();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_AlchemyNumber.prototype.initialize = function(rect) {
        rect.x = 0;
        rect.y = (Graphics.height/2) - (this.sceneWindowHeight()/2);
        rect.width = this.sceneWindowWidth();
        rect.height = this.sceneWindowHeight();
        Window_Selectable.prototype.initialize.call(this,rect);
        if(Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseAll) {
            this._useDesign = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseCreaterNumber;
        }else{
            this._useDesign = false;
        };
        this._isWindow = false;
        this._recipe = null;
        this._max = 1;
        this._number = 1;
        this._addY = 0;
        this._createMode = true;//true:合成 false:解体
        this.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.MainOpacity;
        this.backOpacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.MainBackOpacity;
        this.visible = false;
        this.createButtons();
        this.winSkin();
    };
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_AlchemyNumber.prototype.winSkin = function() {
    if(!Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.BackImg.UsePicture) return;
    this._spriteBg = new Sprite();
    var pictureDir = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.BackImg.PictureFile;
    this._spriteBg.bitmap = ImageManager.loadExtAlchemy(pictureDir);
    this._spriteBg.x = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.BackImg.PictureX;
    this._spriteBg.y = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.BackImg.PictureY;
    if(Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.BackImg.Anchor) {
        this._spriteBg.anchor.x = 0.5;
        this._spriteBg.anchor.y = 0.5;
    };
    this._spriteBg.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.BackImg.PictureOpacity;
    this.addChildToBack(this._spriteBg);
};

Window_AlchemyNumber.prototype.sceneWindowWidth = function() {
    return 400;
};

Window_AlchemyNumber.prototype.sceneWindowHeight = function() {
    return 400;
};

Window_AlchemyNumber.prototype.windowWidth = function() {
    return this._width;
};

Window_AlchemyNumber.prototype.number = function() {
    return this._number;
};

Window_AlchemyNumber.prototype.setup = function(recipe, mode) {
    this._recipe = recipe;
    this._createMode = mode;
    this._max = Math.floor(this.calcMaxAmount());
    this._number = this._max > 0 ? 1 : 0;
    this.height = 170;
    this.placeButtons();
    if(Utils.RPGMAKER_NAME === "MV") this.updateButtonsVisiblity();
    this.refresh();
};

Window_AlchemyNumber.prototype.calcMaxAmount = function() {
    var max = 0;
    var originalMax = 0;
    if(this._createMode) {//合成
        //合成対象アイテムの作成可能最大数
        if(this._recipe.TargetWitchItem === "Item") {
            max = $gameParty.maxItems($dataItems[this._recipe.TargetItem.EarnItem]) - $gameParty.numItems($dataItems[this._recipe.TargetItem.EarnItem]);
        }else if(this._recipe.TargetWitchItem === "Weapon") {
            max = $gameParty.maxItems($dataWeapons[this._recipe.TargetWeapon.EarnWeapon]) - $gameParty.numItems($dataWeapons[this._recipe.TargetWeapon.EarnWeapon]);
        }else if(this._recipe.TargetWitchItem === "Armor") {
            max = $gameParty.maxItems($dataArmors[this._recipe.TargetArmor.EarnArmor]) - $gameParty.numItems($dataArmors[this._recipe.TargetArmor.EarnArmor]);
        };
        originalMax = max;
        //コストタイプの比較
        if(this._recipe.CreateCostType) {
            var costType = this._recipe.CreateCostType.CreateCostType;
            var variableId = this._recipe.CreateCostType.CostVariable;
            var costAmount = this._recipe.CreateCostType.CostAmount;
            var maxValue = 0;
            if(costType !== undefined) {
                if(costType === "loseMoney") {
                    maxValue = $gameParty.gold();
                }else if(costType === "subVariable") {
                    maxValue = $gameVariables.value(variableId);
                };
                max = Math.min(max, maxValue / costAmount);
                if(max <= 0) {
                    if(costType === "gainMoney") {
                        max = Math.min(originalMax, 9999999 / costAmount);
                    }else if(costType === "addVariable") {
                        max = Math.min(originalMax, 9999999 / costAmount);
                    }
                };
            };
        };
        //素材各種作成個数比較
        if(this._recipe.CreateRecipes) {
            if(this._recipe.CreateRecipes.length > 0) {
                for(var i = 0; i < this._recipe.CreateRecipes.length; ++i) {
                    if(this._recipe.CreateRecipes[i]) {
                        if(this._recipe.CreateRecipes[i].RecipeWitchItem === "Item") {
                            var recipeItem = $dataItems[this._recipe.CreateRecipes[i].RecipeItem];
                            var amount = this._recipe.CreateRecipes[i].NeedAmount;
                        }else if(this._recipe.CreateRecipes[i].RecipeWitchItem === "Weapon") {
                            var recipeItem = $dataWeapons[this._recipe.CreateRecipes[i].RecipeWeapon];
                            var amount = this._recipe.CreateRecipes[i].NeedAmount;
                        }else if(this._recipe.CreateRecipes[i].RecipeWitchItem === "Armor") {
                            var recipeItem = $dataArmors[this._recipe.CreateRecipes[i].RecipeArmor];
                            var amount = this._recipe.CreateRecipes[i].NeedAmount;
                        };
                    };
                    max = Math.min(max, $gameParty.numItems(recipeItem) / amount);
                };
            };
        };
    }else{//解体
        //解体対象アイテムの解体可能最大数
        if(this._recipe.TargetWitchItem === "Item") {
            max = $gameParty.numItems($dataItems[this._recipe.TargetItem.EarnItem]);
        }else if(this._recipe.TargetWitchItem === "Weapon") {
            max = $gameParty.numItems($dataWeapons[this._recipe.TargetWeapon.EarnWeapon]);
        }else if(this._recipe.TargetWitchItem === "Armor") {
            max = $gameParty.numItems($dataArmors[this._recipe.TargetArmor.EarnArmor]);
        };
        originalMax = max;
        //コストタイプの比較
        if(this._recipe.DisassemblyCostType) {
            var costType = this._recipe.DisassemblyCostType.CreateCostType;
            var variableId = this._recipe.DisassemblyCostType.CostVariable;
            var costAmount = this._recipe.DisassemblyCostType.CostAmount;
            var maxValue = 0;
            if(costType !== undefined) {
                if(costType === "loseMoney") {
                    maxValue = $gameParty.gold();
                }else if(costType === "subVariable") {
                    maxValue = $gameVariables.value(variableId);
                };
                max = Math.min(max, maxValue / costAmount);
                if(max <= 0) {
                    if(costType === "gainMoney") {
                        max = Math.min(originalMax, 9999999 / costAmount);
                    }else if(costType === "addVariable") {
                        max = Math.min(originalMax, 9999999 / costAmount);
                    }
                };
            };
        };
    };
    return parseInt(Math.max(max, 0));
};

Window_AlchemyNumber.prototype.createButtons = function() {
    this._buttons = [];
    if(Utils.RPGMAKER_NAME === "MV") {
        var bitmap = ImageManager.loadSystem('ButtonSet');
        var buttonWidth = 48;
        var buttonHeight = 48;
        for (var i = 0; i < 5; i++) {
            var button = new Sprite_Button();
            var x = buttonWidth * i;
            var w = buttonWidth * (i === 4 ? 2 : 1);
            button.bitmap = bitmap;
            button.setColdFrame(x, 0, w, buttonHeight);
            button.setHotFrame(x, buttonHeight, w, buttonHeight);
            button.visible = false;
            this._buttons.push(button);
            this.addChild(button);
        }
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        for(const type of ["down2", "down", "up", "up2", "ok"]) {
            const button = new Sprite_Button(type);
            this._buttons.push(button);
            this.addChild(button);
        };
    };
    this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
    this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
    this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
    this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
    this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
};

Window_AlchemyNumber.prototype.placeButtons = function() {
    var numButtons = this._buttons.length;
    var spacing = 0;
    var totalWidth = -spacing;
    for (var i = 0; i < numButtons; i++) {
        totalWidth += this._buttons[i].width + spacing;
    }
    var x = (this.width - totalWidth) / 2;
    for (var j = 0; j < numButtons; j++) {
        var button = this._buttons[j];
        button.x = x;
        button.y = this.buttonY();
        x += button.width + spacing;
    }
};

Window_AlchemyNumber.prototype.updateButtonsVisiblity = function() {
    if (TouchInput.date > Input.date) {
        this.showButtons();
    } else {
        this.hideButtons();
    }
};

Window_AlchemyNumber.prototype.showButtons = function() {
    for (var i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = true;
    }
};

Window_AlchemyNumber.prototype.hideButtons = function() {
    for (var i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = false;
    }
};

Window_AlchemyNumber.prototype.refresh = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.clear();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        Window_Selectable.prototype.refresh.call(this);
        this.drawItemBackground();
    };
    if(this._recipe === undefined) {
        return;
    };
    this._addY = 0;
    this.drawRecipeInfo();
    this.drawMultiplicationSign();
    this.drawNumber();
};

if(Utils.RPGMAKER_NAME === "MZ"){
    Window_AlchemyNumber.prototype.drawItemBackground = function() {
        const c1 = ColorManager.itemBackColor1();
        const c2 = ColorManager.itemBackColor2();
        const x = this.cursorX() + 2;
        const y = this.itemNameY() + 5;
        const w = this.cursorWidth() - this.itemPadding();
        const h = this.lineHeight() - 10;
        this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);
        this.contentsBack.strokeRect(x, y, w, h, c1);
    };
};

Window_AlchemyNumber.prototype.drawRecipeInfo = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };

    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };

    var colour = '#000000';

    if(this._createMode) {//合成
        var itemType = "";
        var successItemId = 0;
        var failedItemId = 0;
        this.contents.fontSize = 14;
        var successLabel = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuCreaterNumberLabels[1];
        var successLabelWidth = this.textWidth(successLabel);
        var failedLabel = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuCreaterNumberLabels[2];
        var failedLabelWidth = this.textWidth(failedLabel);

        if(this._useDesign) {
            this.contents.paintOpacity = 127;
            this.contents.fillRect(0,this._addY,this.contents.width,this.lineHeight(),colour);
            this.contents.paintOpacity = 255;
        };

        this.changeTextColor("#99ccff");//見出し
        this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuCreaterNumberLabels[0],5,this._addY);
        this.resetTextColor();
        this._addY += this.lineHeight();
        if(this._useDesign) {
            this.contents.fillRect(0,this._addY,this.contents.width,1,designColor);
        };
        if(this._recipe.TargetWitchItem === "Item") {
            itemType = "I";
            successItemId = this._recipe.TargetItem.EarnItem;
            failedItemId = this._recipe.TargetItem.FailedItem;
            this.changeTextColor("#00e060");//緑
            this.drawText(successLabel,0,this._addY);
            this.resetTextColor();
            this.drawIcon($dataItems[successItemId].iconIndex,successLabelWidth + 5,this._addY + 2);
            this.drawText($dataItems[successItemId].name,successLabelWidth + 5 + 36,this._addY);
            this.changeTextColor("#ff2020");//赤
            this._addY += 30;
            this.drawText(failedLabel,0,this._addY);
            this.resetTextColor();
            if(failedItemId) {
                this.drawIcon($dataItems[failedItemId].iconIndex,failedLabelWidth + 5,this._addY + 2);
                this.drawText($dataItems[failedItemId].name,failedLabelWidth + 5 + 36,this._addY);
            }else{
                this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuCreaterNumberLabels[3],failedLabelWidth + 5,this._addY);
            };
        }else if(this._recipe.TargetWitchItem === "Weapon") {
            itemType = "W";
            successItemId = this._recipe.TargetWeapon.EarnWeapon;
            failedItemId = this._recipe.TargetWeapon.FailedWeapon;
            this.changeTextColor("#00e060");//緑
            this.drawText(successLabel,0,this._addY);
            this.resetTextColor();
            this.drawIcon($dataWeapons[successItemId].iconIndex,successLabelWidth + 5,this._addY + 2);
            this.drawText($dataWeapons[successItemId].name,successLabelWidth + 5 + 36,this._addY);
            this._addY += 30;
            this.changeTextColor("#ff2020");//赤
            this.drawText(failedLabel,0,this._addY);
            this.resetTextColor();
            if(failedItemId) {
                this.drawIcon($dataWeapons[failedItemId].iconIndex,failedLabelWidth + 5,this._addY + 2);
                this.drawText($dataWeapons[failedItemId].name,failedLabelWidth + 5 + 36,this._addY);
            }else{
                this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuCreaterNumberLabels[3],failedLabelWidth + 5,this._addY);
            };
        }else if(this._recipe.TargetWitchItem === "Armor") {
            itemType = "A";
            successItemId = this._recipe.TargetArmor.EarnArmor;
            failedItemId = this._recipe.TargetArmor.FailedArmor;
            this.changeTextColor("#00e060");//緑
            this.drawText(successLabel,0,this._addY);
            this.resetTextColor();
            this.drawIcon($dataArmors[successItemId].iconIndex,successLabelWidth + 5,this._addY + 2);
            this.drawText($dataArmors[successItemId].name,successLabelWidth + 5 + 36,this._addY);
            this.changeTextColor("#ff2020");//赤
            this._addY += 30;
            this.drawText(failedLabel,0,this._addY);
            this.resetTextColor();
            if(failedItemId) {
                this.drawIcon($dataArmors[failedItemId].iconIndex,failedLabelWidth + 5,this._addY + 2);
                this.drawText($dataArmors[failedItemId].name,failedLabelWidth + 5 + 36,this._addY);
            }else{
                this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuCreaterNumberLabels[3],failedLabelWidth + 5,this._addY);
            };
        };
    }else{//解体
        this.contents.fontSize = 14;
        var failedLabel = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuDisassemblyNumberLabels[1];
        var failedLabelWidth = this.textWidth(failedLabel);

        if(this._useDesign) {
            this.contents.paintOpacity = 127;
            this.contents.fillRect(0,this._addY,this.contents.width,this.lineHeight(),colour);
            this.contents.paintOpacity = 255;
        };

        this.changeTextColor("#99ccff");//見出し
        this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuDisassemblyNumberLabels[0],5,this._addY);
        this.resetTextColor();
        this._addY += this.lineHeight();

        if(this._useDesign) {
            this.contents.fillRect(0,this._addY,this.contents.width,1,designColor);
        };

        this.changeTextColor("#ff2020");//赤
        this.drawText(failedLabel,0,this._addY);
        this.resetTextColor();
        this._addY += this.lineHeight()/2;
        this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuDisassemblyNumberLabels[2],0,this._addY);
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
};

Window_AlchemyNumber.prototype.drawMultiplicationSign = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 14;
    if(Utils.RPGMAKER_NAME === "MV") {
        var sign = '\u00d7';
        var width = this.textWidth(sign);
        var x = this.cursorX() - width * 2;
        var y = this.itemY();
        this.resetTextColor();
        this.drawText(sign, x, y, width);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        const sign = this.multiplicationSign();
        const width = this.textWidth(sign);
        const x = this.multiplicationSignX();
        const y = this.itemNameY();
        this.resetTextColor();
        this.drawText(sign, x, y, width);
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
};

if(Utils.RPGMAKER_NAME === "MZ"){
    Window_AlchemyNumber.prototype.multiplicationSign = function() {
        return "\u00d7";
    };
    Window_AlchemyNumber.prototype.multiplicationSignX = function() {
        const sign = this.multiplicationSign();
        const width = this.textWidth(sign);
        return this.cursorX() - width * 2;
    };
};

Window_AlchemyNumber.prototype.drawNumber = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 14;
    if(Utils.RPGMAKER_NAME === "MV") {
        var x = this.cursorX();
        var y = this.itemY();
        var width = this.cursorWidth() - this.textPadding();
        this.resetTextColor();
        this.drawText(this._number, x, y, width, 'right');
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        const x = this.cursorX();
        const y = this.itemNameY();
        const width = this.cursorWidth() - this.itemPadding();
        this.resetTextColor();
        this.drawText(this._number, x, y, width, "right");
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
};

if(Utils.RPGMAKER_NAME === "MV") {
    Window_AlchemyNumber.prototype.itemY = function() {
        return Math.round(this.contentsHeight() - this.lineHeight());
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_AlchemyNumber.prototype.itemNameY = function() {
        return Math.floor(this.innerHeight - this.lineHeight());
    };
};

Window_AlchemyNumber.prototype.buttonY = function() {
    return this._height;
};

Window_AlchemyNumber.prototype.cursorWidth = function() {
    this.contents.fontSize = 14;
    if(Utils.RPGMAKER_NAME === "MV") {
        var digitWidth = this.textWidth('0');
        return this.maxDigits() * digitWidth + this.textPadding() * 2;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        const padding = this.itemPadding();
        const digitWidth = this.textWidth("0");
        return this.maxDigits() * digitWidth + padding * 2;
    };
};

Window_AlchemyNumber.prototype.cursorX = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        return this.contentsWidth() - this.cursorWidth() - this.textPadding();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        const padding = this.itemPadding();
        return this.innerWidth - this.cursorWidth() - padding * 2;
    };
};

Window_AlchemyNumber.prototype.maxDigits = function() {
    return 2;
};

Window_AlchemyNumber.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.processNumberChange();
};

Window_AlchemyNumber.prototype.isOkTriggered = function() {
    return Input.isTriggered('ok');
};

Window_AlchemyNumber.prototype.playOkSound = function() {
};

Window_AlchemyNumber.prototype.processNumberChange = function() {
    if (this.isOpenAndActive()) {
        if (Input.isRepeated('right')) {
            this.changeNumber(1);
        }
        if (Input.isRepeated('left')) {
            this.changeNumber(-1);
        }
        if (Input.isRepeated('up')) {
            this.changeNumber(10);
        }
        if (Input.isRepeated('down')) {
            this.changeNumber(-10);
        }
    }
};

Window_AlchemyNumber.prototype.changeNumber = function(amount) {
    var lastNumber = this._number;
    this._number = (this._number + amount).clamp(1, this._max);
    if (this._number !== lastNumber) {
        SoundManager.playCursor();
        this.refresh();
    }
};

Window_AlchemyNumber.prototype.updateCursor = function() {
    this.setCursorRect(this.cursorX(), this.itemY(),
                       this.cursorWidth(), this.lineHeight());
};

Window_AlchemyNumber.prototype.onButtonUp = function() {
    this.changeNumber(1);
};

Window_AlchemyNumber.prototype.onButtonUp2 = function() {
    this.changeNumber(10);
};

Window_AlchemyNumber.prototype.onButtonDown = function() {
    this.changeNumber(-1);
};

Window_AlchemyNumber.prototype.onButtonDown2 = function() {
    this.changeNumber(-10);
};

Window_AlchemyNumber.prototype.onButtonOk = function() {
    this.processOk();
};

//=============================================================================
// Window_lvlInformation - レベルインフォメーションウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● レベルウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_lvlInformation() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_lvlInformation.prototype = Object.create(Window_Base.prototype);
Window_lvlInformation.prototype.constructor = Window_lvlInformation;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_lvlInformation.prototype.initialize = function(x = 0, y = 0, width = 0, height = 0) {
        var x = (Graphics.width/2) - (this.mapWindowWidth()/2);
        var y = (Graphics.height/2) - (this.mapWindowHeight()/2);
        var width = this.mapWindowWidth();
        var height = this.mapWindowHeight();
        Window_Base.prototype.initialize.call(this,x,y,width,height);
        if(Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseAll) {
            this._useDesign = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseLvler;
        }else{
            this._useDesign = false;
        };
        this.setupLvlInfo();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_lvlInformation.prototype.initialize = function(rect) {
        rect.x = (Graphics.width/2) - (this.mapWindowWidth()/2);
        rect.y = (Graphics.height/2) - (this.mapWindowHeight()/2);
        rect.width = this.mapWindowWidth();
        rect.height = this.mapWindowHeight();
        Window_Base.prototype.initialize.call(this,rect);
        if(Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseAll) {
            this._useDesign = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseLvler;
        }else{
            this._useDesign = false;
        };
        this.setupLvlInfo();
    };
};
//--------------------------------------------------------------------------
// ● マップエクストラクションの横幅 [可変式ウィンドウのため、変更は推奨されません]
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.mapWindowWidth = function() {
    return 400;
};
//--------------------------------------------------------------------------
// ● マップエクストラクションの縦幅 [可変式ウィンドウのため、変更は推奨されません]
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.mapWindowHeight = function() {
    return 400;
};
//--------------------------------------------------------------------------
// ● マップエクストラクション用のセットアップ
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.setupLvlInfo = function() {
    this._newRecipes = [];
    this._isWindow = false;
    this._updateCloseWindow = false;
    this._windowCloseTimer = 0;
    this.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.LvlerWindow.MainOpacity;
    this.backOpacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.LvlerWindow.MainBackOpacity;
    this.visible = false;
    this._canShowWindow = false;
    this._createrData = undefined;
    this._learnedRecipes = undefined;
    this._oldLvl = 0;
    this._newLvl = 0;
    this._addY = 0;
    this._bgY = 0;
    this.winSkin();
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.winSkin = function() {
    if(!Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.LvlerWindow.BackImg.UsePicture) return;
    this._spriteBg = new Sprite();
    var pictureDir = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.LvlerWindow.BackImg.PictureFile;
    this._spriteBg.bitmap = ImageManager.loadExtAlchemy(pictureDir);
    this._spriteBg.x = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.LvlerWindow.BackImg.PictureX;
    this._spriteBg.y = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.LvlerWindow.BackImg.PictureY;
    if(Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.LvlerWindow.BackImg.Anchor) {
        this._spriteBg.anchor.x = 0.5;
        this._spriteBg.anchor.y = 0.5;
    };
    this._spriteBg.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.LvlerWindow.BackImg.PictureOpacity;
    this.addChildToBack(this._spriteBg);
};
//--------------------------------------------------------------------------
// ● フレームの更新
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if(this._updateCloseWindow) this.updateWindowClose();
};
//--------------------------------------------------------------------------
// ● ウィンドウ閉じるためのタイマー更新
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.updateWindowClose = function() {
    if(this._windowCloseTimer > 0) {
        this._windowCloseTimer--;
    };
    if(this._windowCloseTimer === 0) {
        this.resetLvler();
    };
};
//--------------------------------------------------------------------------
// ● 採集データーセットアップ
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.createrMode = function(creater,oldLvl,newLvl,newRecipes = undefined) {
    if(this._createrData === creater) {
        if(!this._updateCloseWindow) {
            return;
        };
    };
    this._createrData = creater;
    this._newRecipes = newRecipes;
    this._learnedRecipes = undefined;
    this._oldLvl = oldLvl;
    this._newLvl = newLvl;
    this.backOpacity = SceneManager._scene.constructor === Scene_Map ?  192 : 255;
    this._updateCloseWindow = false;
    this._windowCloseTimer = 210;
    this.visible = false;
    this.refresh();
};
//--------------------------------------------------------------------------
// ● 採集データーセットアップ
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.showLearnedRecipes = function(LearnedRecipes) {
    if(this._learnedRecipes === LearnedRecipes) {
        if(!this._updateCloseWindow) {
            return;
        };
    };
    this._learnedRecipes = LearnedRecipes;
    this._createrData = undefined;
    this.backOpacity = SceneManager._scene.constructor === Scene_Map ?  192 : 255;
    this._updateCloseWindow = false;
    this._windowCloseTimer = 210;
    this.visible = false;
    this.refresh();
};
//--------------------------------------------------------------------------
// ● 採集データーセットアップ
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.resetLvler = function() {
    this._createrData = undefined;
    this._learnedRecipes = undefined;
    this._newRecipes = [];
    this._updateCloseWindow = false;
    this._windowCloseTimer = 0;
    this._oldLvl = 0;
    this._newLvl = 0;
    this.visible = false;
};
//--------------------------------------------------------------------------
// ● リフレッシュ
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.refresh = function() {
    this.contents.clear();
    this._addY = 0;
    this._bgY = 0;
    this._canShowWindow = false;
    if(this._createrData !== undefined) {
        this.drawCategoryTitle();
        this.drawLvlContents();
        this._canShowWindow = true;
    };
    if(this._learnedRecipes !== undefined) {
        this.drawLearnedTitle();
        this.drawLearnedContents();
        this._canShowWindow = true;
    };
    this.height = this._bgY;
    if(SceneManager._scene.constructor === Scene_Map) {
        this.x = (Graphics.width/2) - (this.mapWindowWidth()/2) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.LvlerWindow.MapX;
        this.y = Graphics.height - (Graphics.height/2) - (this.height/2) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.LvlerWindow.MapY;
    }else{
        this.x = (Graphics.width/2) - (this.mapWindowWidth()/2) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.LvlerWindow.MainX;
        this.y = Graphics.height - (Graphics.height/2) - (this.height/2) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.LvlerWindow.MainY;
    };
    this.visible = this._canShowWindow;
    this._updateCloseWindow = this._canShowWindow;
};
//--------------------------------------------------------------------------
// ● 合成カテゴリー名の描画 [合成用]
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.drawCategoryTitle = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 16;
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    this.changeTextColor("#99ccff");//見出し
    this.contents.outlineWidth = 5;
    var colour = '#000000';

    if(this._useDesign) {
        this.contents.paintOpacity = 127;
        this.contents.fillRect(0,this._addY,this.contents.width,35,colour);
        this.contents.paintOpacity = 255;
    };

    this._bgY += 35;
    var categoryName = $gameAlchemy.getName(this._createrData.alchemyId);
    this.drawIcon($gameAlchemy.getIconId(this._createrData.alchemyId),this.contents.width - this.contents.width + 5,this._addY + 2);
    this.drawText(categoryName,(this.contents.width - this.contents.width) + 5 + 36,this._addY + 2,this.contents.width);
    this.resetTextColor();
    this.contents.outlineWidth = 4;
    var newLvlInfo = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.LvlerTitleLabels[0] + this._oldLvl + " " + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.LvlerTitleLabels[1] + " " + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.LvlerTitleLabels[0] + this._newLvl;
    var newLvlInfoWidth = this.textWidth(newLvlInfo);
    this.contents.fontSize = 14;
    this.drawText(newLvlInfo,(this.contents.width - (this.contents.width/2)) - (newLvlInfoWidth/2),this._addY + 2,this.contents.width);
    this.changeTextColor("#00e060");//緑
    this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.LvlerTitleLabels[2],-5,this._addY + 2,this.contents.width,'right');
    this.resetTextColor();
    
    if(this._useDesign) {
        this.contents.fillRect(0,this._bgY,this.contents.width,1,designColor);
    };
    
    this._addY += this.lineHeight() + 5;
    this._bgY += this.lineHeight() + 5;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 採取情報の描画
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.drawLvlContents = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    var colour = '#000000';
    this.contents.fontSize = 14;
    if($gameAlchemy.isMaxLvl(this._createrData.alchemyId)) {
        var lvlMaxName = $gameAlchemy.getMaxName(this._createrData.alchemyId);
        var lvlMaxInfo = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.LvlerMaxLvlNameLabels;
        var lvlMaxNameWidth = this.textWidth(lvlMaxName);
        var lvlMaxInfoWidth = this.textWidth(lvlMaxInfo);
        this.changeTextColor("#00e060");//緑
        this.drawText(lvlMaxName,(this.contents.width - (this.contents.width/2)) - (lvlMaxNameWidth/2) - (lvlMaxInfoWidth/2),this._addY,this.contents.width);
        this.resetTextColor();
        this.drawText(lvlMaxInfo,(this.contents.width - (this.contents.width/2)) - (lvlMaxNameWidth/2),this._addY,this.contents.width);
        this._addY += this.lineHeight(); 
        this._bgY += this.lineHeight();
    };
    if(this._newRecipes !== undefined) {
        if(this._newRecipes.length > 0 ) {
            var getMostLengthName = 0;
            this._newRecipes.forEach(recipe => {
                if(recipe) {
                    if(recipe[0] === "I") {
                        var name = $dataItems[recipe[1]].name;
                        var nameWidth = this.textWidth(name);
                        if(getMostLengthName < nameWidth) getMostLengthName = nameWidth;
                    }else if(recipe[0] === "W") {
                        var name = $dataWeapons[recipe[1]].name;
                        var nameWidth = this.textWidth(name);
                        if(getMostLengthName < nameWidth) getMostLengthName = nameWidth;
                    }else if(recipe[0] === "A") {
                        var name = $dataArmors[recipe[1]].name;
                        var nameWidth = this.textWidth(name);
                        if(getMostLengthName < nameWidth) getMostLengthName = nameWidth;
                    };
                };
            });
            this._newRecipes.forEach(recipe => {
                if(recipe) {
                    if(this._useDesign) {
                        this.contents.paintOpacity = 127;
                        this.contents.fillRect(0,this._addY,this.contents.width,this.lineHeight(),colour);
                        this.contents.paintOpacity = 255;
                    };
                    if(recipe[0] === "I") {
                        var name = $dataItems[recipe[1]].name;
                        this.drawIcon($dataItems[recipe[1]].iconIndex,(this.contents.width/2) - (getMostLengthName/2) - 36,this._addY + 2);
                        this.drawText(name,(this.contents.width/2) - (getMostLengthName/2),this._addY);
                    }else if(recipe[0] === "W") {
                        var name = $dataWeapons[recipe[1]].name;
                        this.drawIcon($dataWeapons[recipe[1]].iconIndex,(this.contents.width/2) - (getMostLengthName/2) - 36,this._addY + 2);
                        this.drawText(name,(this.contents.width/2) - (getMostLengthName/2),this._addY);
                    }else if(recipe[0] === "A") {
                        var name = $dataArmors[recipe[1]].name;
                        this.drawIcon($dataArmors[recipe[1]].iconIndex,(this.contents.width/2) - (getMostLengthName/2) - 36,this._addY + 2);
                        this.drawText(name,(this.contents.width/2) - (getMostLengthName/2),this._addY);
                    };
                    this._addY += this.lineHeight(); 
                    this._bgY += this.lineHeight();
                };
            });
            this._bgY += this.lineHeight();
            this.changeTextColor("#99ccff");//見出し
            this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.LvlerNewRecipeLabels[1],-5,this._addY,this.contents.width,'right');
            this.resetTextColor();
        };
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 合成カテゴリー名の描画 [合成用]
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.drawLearnedTitle = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 16;
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    this.changeTextColor("#99ccff");//見出し
    this.contents.outlineWidth = 5;
    var colour = '#000000';

    if(this._useDesign) {
        this.contents.paintOpacity = 127;
        this.contents.fillRect(0,this._addY,this.contents.width,35,colour);
        this.contents.paintOpacity = 255;
    };
    
    this._bgY += 35;
    this.drawIcon(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.LvlerNewRecipeLabelIcons,this.contents.width - this.contents.width + 5,this._addY + 2);
    this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.LvlerNewRecipeLabels[0],(this.contents.width - this.contents.width) + 5 + 36,this._addY + 2,this.contents.width);
    this.resetTextColor();
    this.contents.outlineWidth = 4;

    if(this._useDesign) {
        this.contents.fillRect(0,this._bgY,this.contents.width,1,designColor);
    };

    this._addY += this.lineHeight() + 5;
    this._bgY += this.lineHeight() + 5;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 採取情報の描画
//--------------------------------------------------------------------------
Window_lvlInformation.prototype.drawLearnedContents = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };

    var colour = '#000000';

    this.contents.fontSize = 14;
    if(this._learnedRecipes !== undefined) {
        if(this._learnedRecipes.length > 0) {
            var getMostLengthName = 0;
            this._learnedRecipes.forEach(recipe => {
                if(recipe) {
                    var catergoryNameWidth = this.textWidth($gameAlchemy.getName(recipe[0]));
                    var recipeNameWidth = this.textWidth($gameAlchemy.getRecipeName(recipe[0],recipe[1])[2]);
                    if(getMostLengthName < catergoryNameWidth + recipeNameWidth) getMostLengthName = catergoryNameWidth + recipeNameWidth;
                };
            });
        };
    };
    if(this._learnedRecipes !== undefined) {
        if(this._learnedRecipes.length > 0) {
            this._learnedRecipes.forEach(recipe => {
                if(recipe) {
                    if(this._useDesign) {
                        this.contents.paintOpacity = 127;
                        this.contents.fillRect(0,this._addY,this.contents.width,this.lineHeight(),colour);
                        this.contents.paintOpacity = 255;
                    };
                    var categoryIcon = $gameAlchemy.getIconId(recipe[0])
                    var catergoryName = $gameAlchemy.getName(recipe[0]);
                    var recipeIcon = $gameAlchemy.getRecipeName(recipe[0],recipe[1])[1];
                    var recipeName = $gameAlchemy.getRecipeName(recipe[0],recipe[1])[2];
                    this.drawIcon(categoryIcon,(this.contents.width/2) - (getMostLengthName/2) - 36,this._addY + 2);
                    this.changeTextColor("#99ccff");//見出し
                    this.drawText(catergoryName,(this.contents.width/2) - (getMostLengthName/2),this._addY);
                    this.resetTextColor();
                    this.drawIcon(recipeIcon,(this.contents.width/2) - (getMostLengthName/2) + 36,this._addY + 2);
                    this.changeTextColor("#00e060");//緑
                    this.drawText(recipeName,(this.contents.width/2) - (getMostLengthName/2) + (36*2),this._addY);
                    this.resetTextColor();
                    this._addY += this.lineHeight(); 
                    this._bgY += this.lineHeight();
                };
            });
        };
    };
    this._bgY += this.lineHeight();
    this.changeTextColor("#99ccff");//見出し
    this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.LvlerNewRecipeLabels[1],-5,this._addY,this.contents.width,'right');
    this.resetTextColor();
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};

//=============================================================================
// Window_MapExtraction - マップエクストラクションウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● マップエクストラクションウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_MapExtraction() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_MapExtraction.prototype = Object.create(Window_Base.prototype);
Window_MapExtraction.prototype.constructor = Window_MapExtraction;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_MapExtraction.prototype.initialize = function(x, y, width, height) {
        var x = (Graphics.width/2) - (this.mapWindowWidth()/2)
        var y = (Graphics.height/2) - (this.mapWindowHeight()/2)
        var width = this.mapWindowWidth();
        var height = this.mapWindowHeight();
        Window_Base.prototype.initialize.call(this,x,y,width,height);
        if(Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseAll) {
            this._useDesign = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseExtracter;
        }else{
            this._useDesign = false;
        };
        this.setupExtraction();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_MapExtraction.prototype.initialize = function(rect) {
        rect.x = (Graphics.width/2) - (this.mapWindowWidth()/2)
        rect.y = (Graphics.height/2) - (this.mapWindowHeight()/2)
        rect.width = this.mapWindowWidth();
        rect.height = this.mapWindowHeight();
        Window_Base.prototype.initialize.call(this,rect);
        if(Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseAll) {
            this._useDesign = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.WindowSets.UseExtracter;
        }else{
            this._useDesign = false;
        };
        this.setupExtraction();
    };
};
//--------------------------------------------------------------------------
// ● マップエクストラクションの横幅 [可変式ウィンドウのため、変更は推奨されません]
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.mapWindowWidth = function() {
    return 400;
};
//--------------------------------------------------------------------------
// ● マップエクストラクションの縦幅 [可変式ウィンドウのため、変更は推奨されません]
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.mapWindowHeight = function() {
    return 400;
};
//--------------------------------------------------------------------------
// ● マップエクストラクション用のセットアップ
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.setupExtraction = function() {
    this._mode = "none";
    this._other = undefined;
    this._isWindow = false;
    this._currentGauge = 0;
    this._updateGauge = false;
    this._updateCloseWindow = false;
    this._windowCloseTimer = 0;
    this._extractChance = 0;
    this._extractSpeed = 0;
    this._extractExp = 0;
    this._gaugeWidth = 0;
    this._meterWidth = 0;
    this._gaugeTimer = 0;
    this._targetEvent = undefined;
    this.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.ExtracterWindow.MainOpacity;
    this.backOpacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.ExtracterWindow.MainBackOpacity;
    this.visible = false;
    this._createrData = undefined;
    this._extractData = undefined;
    this._addY = 0;
    this._bgY = 0;
    this.winSkin();
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.winSkin = function() {
    if(!Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.ExtracterWindow.BackImg.UsePicture) return;
    this._spriteBg = new Sprite();
    var pictureDir = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.ExtracterWindow.BackImg.PictureFile;
    this._spriteBg.bitmap = ImageManager.loadExtAlchemy(pictureDir);
    this._spriteBg.x = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.ExtracterWindow.BackImg.PictureX;
    this._spriteBg.y = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.ExtracterWindow.BackImg.PictureY;
    if(Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.ExtracterWindow.BackImg.Anchor) {
        this._spriteBg.anchor.x = 0.5;
        this._spriteBg.anchor.y = 0.5;
    };
    this._spriteBg.opacity = Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.ExtracterWindow.BackImg.PictureOpacity;
    this.addChildToBack(this._spriteBg);
};
//--------------------------------------------------------------------------
// ● フレームの更新
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if(this._updateGauge) this.updateGauge();
    if(this._updateCloseWindow) this.updateWindowClose();
};
//--------------------------------------------------------------------------
// ● ゲージの更新
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.updateGauge = function() {
    if(this._gaugeTimer > 0) {
        this._gaugeTimer--;
    };
    if(this._gaugeTimer === 0) {
        this.refresh();
        this._currentGauge++;
    };
    if(this._currentGauge >= this._extractSpeed) {
        this._gaugeTimer = 60;
        this.refresh();
        this._targetEvent.extracting = false;
        this._updateGauge = false;
    };
};
//--------------------------------------------------------------------------
// ● ウィンドウ閉じるためのタイマー更新
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.updateWindowClose = function() {
    if(this._windowCloseTimer > 0) {
        this._windowCloseTimer--;
    };
    if(this._windowCloseTimer === 0) {
        this.resetExtracter();
        $gameAlchemy.setFiberYield(false);
    };
};
//--------------------------------------------------------------------------
// ● 採集データーセットアップ
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.createrMode = function(creater,mode = "none",other = undefined) {
    if(this._createrData === creater) return;
    this._createrData = creater;
    this._mode = mode;
    this._other = other;
    this.backOpacity = 255;
    this._updateCloseWindow = false;
    if(this._mode === "licenseFailed") this._windowCloseTimer = 120;
    this.visible = false;
    this.refresh();
};
//--------------------------------------------------------------------------
// ● 採集データーセットアップ
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.extracterMode = function(extract,mode = "none",other = undefined,event = undefined) {
    if(!this._updateCloseWindow) {
        if(this._extractData === extract) return;
    };
    this._extractData = extract;
    this._targetEvent = event;
    this._mode = mode;
    this._other = other;
    this._currentGauge = 0;
    this._updateGauge = false;
    this._updateCloseWindow = false;
    this._gaugeTimer = 45;
    this.backOpacity = 192;
    if(this._mode === "extractSuccess") this._windowCloseTimer = 60;
    if(this._mode === "hasGrowItem") this._windowCloseTimer = 120;
    if(this._mode === "noGrowItem") this._windowCloseTimer = 120;
    if(this._mode === "licenseFailed") this._windowCloseTimer = 120;
    if(this._mode === "lvlFailed") this._windowCloseTimer = 120;
    this._extractChance = $gameAlchemy.getChanceOf(this._extractData,10);
    this._extractSpeed = Math.floor($gameAlchemy.getSpeedOf(this._extractData,10) * 60);
    this._extractExp = $gameAlchemy.getExpOf(this._extractData,10);
    this._gaugeWidth = 142;
    this._meterWidth = this._gaugeWidth - 2;
    this.visible = false;
    this.refresh();
};
//--------------------------------------------------------------------------
// ● 採集データーセットアップ
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.resetExtracter = function() {
    this._createrData = undefined;
    this._extractData = undefined;
    this._targetEvent = undefined;
    this._mode = "none";
    this._other = undefined;
    this._currentGauge = 0;
    this._updateGauge = false;
    this._updateCloseWindow = false;
    this._gaugeWidth = 0;
    this._meterWidth = 0;
    this._gaugeTimer = 0;
    this._windowCloseTimer = 0;
    this._extractChance = 0;
    this._extractSpeed = 0;
    this._extractExp = 0;
    this.visible = false;
};
//--------------------------------------------------------------------------
// ● リフレッシュ
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.refresh = function() {
    this.contents.clear();
    this._addY = 0;
    this._bgY = 0;
    if(this._mode === "extractSuccess") this.drawExtractContents();
    if(this._mode === "hasGrowItem") this.drawHasGrowItemContents();
    if(this._mode === "noGrowItem") this.drawNoGrowItemContents();
    if(this._mode === "licenseFailed") this.drawLicenseFailedContents();
    if(this._mode === "lvlFailed") this.drawLvlFailedContents();
    if(!this._updateGauge) {
        this.height = this._bgY;
        if(SceneManager._scene.constructor === Scene_Map) {
            this.x = (Graphics.width/2) - (this.mapWindowWidth()/2) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.ExtracterWindow.MapX;
            this.y = Graphics.height - (Graphics.height/4) - (this.height/2) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.ExtracterWindow.MapY;
        }else{
            this.x = (Graphics.width/2) - (this.mapWindowWidth()/2) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.ExtracterWindow.MainX;
            this.y = Graphics.height - (Graphics.height/2) - (this.height/2) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.ExtracterWindow.MainY;
        };
        this.visible = true;
    };
    if(this._mode === "extractSuccess") {
        this._updateGauge = true;
    }else{
        this._updateCloseWindow = true;
    };
};
//--------------------------------------------------------------------------
// ● 採集実行情報
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawExtractContents = function() {
    this.drawCategoryTitle();
    if($gameAlchemy.extractInfo()) this.drawExtractInformation();
    this.drawExtractSuccessContents();
    this.drawExtractGauge();
};
//--------------------------------------------------------------------------
// ● 育成アイテム所持情報
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawHasGrowItemContents = function() {
    this.drawCategoryTitle();
    this.drawHasGrowItemInfo();
};
//--------------------------------------------------------------------------
// ● 育成アイテム未所持情報
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawNoGrowItemContents = function() {
    this.drawCategoryTitle();
    this.drawNoGrowItemInfo();
};
//--------------------------------------------------------------------------
// ● ライセンス不十分情報
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawLicenseFailedContents = function() {
    if(this._createrData !== undefined) {
        this.drawCategoryTitleForCreater();
        this.drawLicenseFailer();
    }else{
        this.drawCategoryTitle();
        this.drawLicenseFailer();
    };
};
//--------------------------------------------------------------------------
// ● レベル不十分情報
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawLvlFailedContents = function() {
    this.drawCategoryTitle();
    if($gameAlchemy.extractInfo()) this.drawExtractInformation();
    this.drawLvlFailer();
};
//--------------------------------------------------------------------------
// ● 合成カテゴリー名の描画 [合成用]
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawCategoryTitleForCreater = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 16;
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    this.changeTextColor("#99ccff");//見出し
    this.contents.outlineWidth = 5;
    var colour = '#000000';

    if(this._useDesign) {
        this.contents.paintOpacity = 127;
        this.contents.fillRect(0,this._addY,this.contents.width,35,colour);
        this.contents.paintOpacity = 255;
    };

    this._bgY += 35;
    var categoryName = $gameAlchemy.getName(this._createrData.TargetAlchemyID);
    this.drawIcon($gameAlchemy.getIconId(this._createrData.TargetAlchemyID),this.contents.width - this.contents.width + 5,this._addY + 2);
    this.drawText(categoryName,(this.contents.width - this.contents.width) + 5 + 36,this._addY + 2,this.contents.width);
    this.resetTextColor();
    this.contents.outlineWidth = 4;

    if(this._useDesign) {
        this.contents.fillRect(0,this._bgY,this.contents.width,1,designColor);
    };

    this._addY += this.lineHeight() + 5;
    this._bgY += this.lineHeight() + 5;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 合成カテゴリー名の描画 [採集用]
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawCategoryTitle = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 16;
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    this.changeTextColor("#99ccff");//見出し
    this.contents.outlineWidth = 5;
    var colour = '#000000';

    if(this._useDesign) {
        this.contents.paintOpacity = 127;
        this.contents.fillRect(0,this._addY,this.contents.width,35,colour);
        this.contents.paintOpacity = 255;
    };
    
    this._bgY += 35;
    var categoryName = $gameAlchemy.getName(this._extractData.extractType);
    var categoryNameWidth = this.textWidth(categoryName);
    this.drawIcon($gameAlchemy.getIconId(this._extractData.extractType),this.contents.width - this.contents.width + 5,this._addY + 2);
    this.drawText(categoryName,(this.contents.width - this.contents.width) + 5 + 36,this._addY + 2,this.contents.width);
    this.resetTextColor();
    this.contents.outlineWidth = 4;
    if($gameAlchemy.canLvl(this._extractData.extractType)) {
        this.contents.fontSize = 14;
        var isMaster = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterTitleLabels[1] + $gameAlchemy.getLvl(this._extractData.extractType) + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterTitleLabels[2] + $gameAlchemy.getMaxLvl(this._extractData.extractType) + " " + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterTitleLabels[3] + $gameAlchemy.getExp(this._extractData.extractType) + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterTitleLabels[2] + $gameAlchemy.getNextExp(this._extractData.extractType);
        if($gameAlchemy.getLvl(this._extractData.extractType) === $gameAlchemy.getMaxLvl(this._extractData.extractType)) {
            isMaster = $gameAlchemy.getMaxName(this._extractData.extractType);
        };
        this.drawText(isMaster,(this.contents.width - this.contents.width) + 5 + 36 + categoryNameWidth + 5,this._addY + 4,this.contents.width);
        if($gameAlchemy.getLvl(this._extractData.extractType) >= this._extractData.extractLvl) {
            this.changeTextColor("#00e060");//緑
        }else{
            this.changeTextColor("#ff2020");//赤
        };
        this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterTitleLabels[0] + this._extractData.extractLvl,-10,this._addY + 4,this.contents.width,"right");
    };
    this.resetTextColor();

    if(this._useDesign) {
        this.contents.fillRect(0,this._bgY,this.contents.width,1,designColor);
    };

    this._addY += this.lineHeight() + 5;
    this._bgY += this.lineHeight() + 5;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 育成アイテム所持情報の描画
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawHasGrowItemInfo = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    this.contents.fontSize = 12;
    var itemIcon = "";
    var itemName = "";
    var useAmount = this._extractData.extractGrower.useAmount + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterAmountLabel;
    if(this._extractData.extractGrower.itemType === "I") {
        itemIcon = $dataItems[this._extractData.extractGrower.growItem].iconIndex;
        itemName = $dataItems[this._extractData.extractGrower.growItem].name;
        $gameParty.loseItem($dataItems[this._extractData.extractGrower.growItem],this._extractData.extractGrower.useAmount);
    }else if(this._extractData.extractGrower.itemType === "W") {
        itemIcon = $dataWeapons[this._extractData.extractGrower.growItem].iconIndex;
        itemName = $dataWeapons[this._extractData.extractGrower.growItem].name;
        $gameParty.loseItem($dataWeapons[this._extractData.extractGrower.growItem],this._extractData.extractGrower.useAmount);
    }else if(this._extractData.extractGrower.itemType === "A") {
        itemIcon = $dataArmors[this._extractData.extractGrower.growItem].iconIndex;
        itemName = $dataArmors[this._extractData.extractGrower.growItem].name;
        $gameParty.loseItem($dataArmors[this._extractData.extractGrower.growItem],this._extractData.extractGrower.useAmount);
    };
    var allWidth = this.textWidth(itemName + " " + useAmount);
    this.drawIcon(itemIcon,(this.contents.width/2) - 36 - (allWidth/2),this._addY + 2);
    this.drawText(itemName + " " + useAmount,(this.contents.width/2) - (allWidth/2),this._addY,this.contents.width);
    this._addY += this.lineHeight() - 20;
    this._bgY += this.lineHeight() - 20;
    this.resetTextColor();
    this._addY += 25;
    this._bgY -= 12;
    this.contents.fontSize = 14;
    this.changeTextColor("#99ccff");//見出し
    this.drawText(this._extractData.extractGrower.hasWord,-5,this._addY,this.contents.width,"right");

    if(this._useDesign) {
        this.contents.fillRect(0,this._bgY,this.contents.width,1,designColor);
    };

    this._bgY += this.lineHeight() + 30;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
    if(this._mode === "hasGrowItem") this._targetEvent.startGrowing();
};
//--------------------------------------------------------------------------
// ● 育成アイテム未所持情報の描画
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawNoGrowItemInfo = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    this.contents.fontSize = 12;
    var itemIcon = "";
    var itemName = "";
    var noItem = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterNotReadyLabel + " ";
    var useAmount = this._extractData.extractGrower.useAmount + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterAmountLabel;
    if(this._extractData.extractGrower.itemType === "I") {
        itemIcon = $dataItems[this._extractData.extractGrower.growItem].iconIndex;
        itemName = $dataItems[this._extractData.extractGrower.growItem].name;
    }else if(this._extractData.extractGrower.itemType === "W") {
        itemIcon = $dataWeapons[this._extractData.extractGrower.growItem].iconIndex;
        itemName = $dataWeapons[this._extractData.extractGrower.growItem].name;
    }else if(this._extractData.extractGrower.itemType === "A") {
        itemIcon = $dataArmors[this._extractData.extractGrower.growItem].iconIndex;
        itemName = $dataArmors[this._extractData.extractGrower.growItem].name;
    };
    var noItemWidth = this.textWidth(noItem);
    var allWidth = this.textWidth(itemName + " " + useAmount);
    this.changeTextColor("#ff2020");
    this.drawText(noItem,(this.contents.width/2) - (allWidth/2) - 36 - (noItemWidth/2),this._addY,this.contents.width);
    this.resetTextColor();
    this.drawIcon(itemIcon,(this.contents.width/2) - 36 - (allWidth/2) + (noItemWidth/2),this._addY + 2);
    this.drawText(itemName + " " + useAmount,(this.contents.width/2) - (allWidth/2) + (noItemWidth/2),this._addY,this.contents.width);
    this._addY += this.lineHeight() - 20;
    this._bgY += this.lineHeight() - 20;
    this.resetTextColor();
    this._addY += 25;
    this._bgY -= 12;
    this.contents.fontSize = 14;
    this.changeTextColor("#99ccff");//見出し
    this.drawText(this._extractData.extractGrower.noWord,-5,this._addY,this.contents.width,"right");

    if(this._useDesign) {
        this.contents.fillRect(0,this._bgY,this.contents.width,1,designColor);
    };

    this._bgY += this.lineHeight() + 30;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● ライセンス不十分情報の描画
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawLicenseFailer = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    this.contents.fontSize = 12;
    var getMostLengthName = 0;
    var hasItem = "";
    if(this._other.length > 0) {
        this._other.forEach(item => {
            if(item) {
                if(item[2]) {
                    hasItem = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterHasNotLabel[0] + " ";
                    this.changeTextColor("#00e060");
                }else{
                    hasItem = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterHasNotLabel[1] + " ";
                    this.changeTextColor("#ff2020");
                };
                if(item[0] === "I") {
                    if(getMostLengthName < this.textWidth(hasItem + $dataItems[item[1]].name)) getMostLengthName = this.textWidth(hasItem + $dataItems[item[1]].name);
                }else if(item[0] === "W") {
                    if(getMostLengthName < this.textWidth(hasItem + $dataWeapons[item[1]].name)) getMostLengthName = this.textWidth(hasItem + $dataWeapons[item[1]].name);
                }else if(item[0] === "A") {
                    if(getMostLengthName < this.textWidth(hasItem + $dataArmors[item[1]].name)) getMostLengthName = this.textWidth(hasItem + $dataArmors[item[1]].name);
                };
            };
        });
    };
    if(this._other.length > 0) {
        this._other.forEach(item => {
            if(item) {
                if(item[2]) {
                    hasItem = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterHasNotLabel[0] + " ";
                    this.changeTextColor("#00e060");
                }else{
                    hasItem = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterHasNotLabel[1] + " ";
                    this.changeTextColor("#ff2020");
                };
                if(item[0] === "I") {
                    this.drawText(hasItem + $dataItems[item[1]].name,this.contents.width - (this.contents.width/2) - (getMostLengthName/2),this._addY,this.contents.width);
                    this._addY += this.lineHeight() - 20;
                    this._bgY += this.lineHeight() - 20;
                }else if(item[0] === "W") {
                    this.drawText(hasItem + $dataWeapons[item[1]].name,this.contents.width - (this.contents.width/2) - (getMostLengthName/2),this._addY,this.contents.width);
                    this._addY += this.lineHeight() - 20;
                    this._bgY += this.lineHeight() - 20;
                }else if(item[0] === "A") {
                    this.drawText(hasItem + $dataArmors[item[1]].name,this.contents.width - (this.contents.width/2) - (getMostLengthName/2),this._addY,this.contents.width);
                    this._addY += this.lineHeight() - 20;
                    this._bgY += this.lineHeight() - 20;
                };
            };
        });
    };
    this.resetTextColor();
    this._addY += 25;
    this._bgY -= 12;
    this.contents.fontSize = 14;
    this.changeTextColor("#ff2020");
    this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterNoExtractLabel,-5,this._addY,this.contents.width,"right");

    if(this._useDesign) {
        this.contents.fillRect(0,this._bgY,this.contents.width,1,designColor);
    };

    this._bgY += this.lineHeight() + 30;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 採取情報の描画
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawExtractInformation = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    this.contents.fontSize = 14;
    var earnName = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterShowLotteryLabel[0];
    var earnNameWidth = this.textWidth(earnName);
    this.drawIcon(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterEarnLabelIcons,this.contents.width - (this.contents.width/2) - 36 + 5 - (earnNameWidth/2),this._addY + 2);
    this.drawText(earnName,this.contents.width - (this.contents.width/2) - (earnNameWidth/2) + 5,this._addY,this.contents.width);
    this._bgY += 5;

    if(this._useDesign) {
        this.contents.fillRect(0,this._bgY,this.contents.width,1,designColor);
    };

    this._addY += this.lineHeight() + 15;
    this._bgY += this.lineHeight();
    this.contents.fontSize = 12;
    var chances = "";
    var colour = '#000000';
    if(this._extractData.extractItems.length > 0) {
        this._extractData.extractItems.forEach(item => {
            if(item) {
                if(this._useDesign) {
                    this.contents.paintOpacity = 110;
                    this.contents.fillRect(22,this._addY + 1,32,34,colour);
                    this.contents.paintOpacity = 255;
                };
                chances = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterShowLotteryLabel[1] + " " + item[3] + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterShowLotteryLabel[2];
                if(item[0] === "I") {
                    this.drawItemName($dataItems[item[1]],20,this._addY,this.contents.width);
                    this.drawText(chances,-20,this._addY,this.contents.width,"right");
                    this._addY += this.lineHeight();
                    this._bgY += this.lineHeight();
                }else if(item[0] === "W") {
                    this.drawItemName($dataWeapons[item[1]],20,this._addY,this.contents.width);
                    this.drawText(chances,-20,this._addY,this.contents.width,"right");
                    this._addY += this.lineHeight();
                    this._bgY += this.lineHeight();
                }else if(item[0] === "A") {
                    this.drawItemName($dataArmors[item[1]],20,this._addY,this.contents.width);
                    this.drawText(chances,-20,this._addY,this.contents.width,"right");
                    this._addY += this.lineHeight();
                    this._bgY += this.lineHeight();
                };
            };
        });
    };
    if(this._mode === "lvlFailed") {
        this._bgY -= 15;

        if(this._useDesign) {
            this.contents.fillRect(0,this._bgY,this.contents.width,1,designColor);
        };

        this._addY += 15;
        this._bgY += 35;
    }else if(this._mode === "extractSuccess") {
        this._bgY -= 15;

        if(this._useDesign) {
            this.contents.fillRect(0,this._bgY,this.contents.width,1,designColor);
        };
        
        this._addY += 15;
        this._bgY += 45;
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 採取情報の描画
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawLvlFailer = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 14;
    this.changeTextColor("#ff2020");
    this.drawText(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterLvlNotOKLabel,-5,this._addY,this.contents.width,"right");
    this.resetTextColor();
    this._bgY += 35;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 採取情報の描画
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawExtractSuccessContents = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 14;
    var earnName = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterEarnLabels[0];
    var earnNameWidth = this.textWidth(earnName);
    this.changeTextColor("#84a9ff");
    this.drawIcon(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterEarnLabelIcons,this.contents.width - this.contents.width + 5,this._addY + 2);
    this.drawText(earnName,(this.contents.width - this.contents.width) + 5 + 36,this._addY,this.contents.width);
    this.resetTextColor();
    this._bgY += this.lineHeight();
    this.contents.fontSize = 12;
    var moveX = (this.contents.width - this.contents.width) + 5 + 36 + earnNameWidth + 10;
    var index = 0;
    if(this._other.length > 0) {
        this._other.forEach(item => {
            if(item) {
                if(index > 0) {
                    this._addY += this.lineHeight();
                    this._bgY += this.lineHeight();
                };
                if(item[0] === "I") {
                    this.drawIcon($dataItems[item[1]].iconIndex,moveX,this._addY + 2);
                    var itemName = $dataItems[item[1]].name;
                    var earnAmount = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterEarnLabels[1] + item[2];
                }else if(item[0] === "W") {
                    this.drawIcon($dataWeapons[item[1]].iconIndex,moveX,this._addY + 2);
                    var itemName = $dataItems[item[1]].name;
                    var earnAmount = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterEarnLabels[1] + item[2];
                }else if(item[0] === "A") {
                    this.drawIcon($dataArmors[item[1]].iconIndex,moveX,this._addY + 2);
                    var itemName = $dataItems[item[1]].name;
                    var earnAmount = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterEarnLabels[1] + item[2];
                };
                var earnAmountWidth = this.textWidth(earnAmount);
                if(earnAmountWidth <= 12) {//1桁
                    var earnX = (36/2) + moveX;
                }else{
                    if(earnAmountWidth <= 18) {//2桁
                        var earnX = (36/2) - (earnAmountWidth/4) + moveX;
                    }else{
                        if(earnAmountWidth <= 24) {//3桁
                            var earnX = (36/2) - (earnAmountWidth/3) + moveX;
                        }else{//4桁
                            var earnX = (36/2) - (earnAmountWidth/2) + moveX;
                        };
                    };
                };
                this.drawText(earnAmount,earnX,this._addY + 9,this.contents.width);
                if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterEarnMode) {
                    this.drawText(itemName,moveX + 38,this._addY + 2,this.contents.width);
                    index++;
                }else{
                    moveX += 36;
                    if(moveX >= this.contents.width) {
                        moveX = (this.contents.width - this.contents.width) + 5 + 36 + earnNameWidth + 10;
                        this._addY += this.lineHeight();
                        this._bgY += this.lineHeight();
                    };
                };
            };
        });
    };
    this._addY += this.lineHeight();
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 採取情報の描画
//--------------------------------------------------------------------------
Window_MapExtraction.prototype.drawExtractGauge = function() {
    if(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName !== "") {
        this.contents.fontFace = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.FontName;
    };
    this.contents.fontSize = 14;
    var successName = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterResultLabels[0] + this._extractChance + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterResultLabels[1];
    var successNameWidth = this.textWidth(successName);
    this.drawIcon(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterResultLabelIcons,this.contents.width - this.contents.width + 5,this._addY + 2);
    this.drawText(successName,(this.contents.width - this.contents.width) + 5 + 36,this._addY,this.contents.width);
    this.resetTextColor();
    this._addY += 9;
    this._bgY += this.lineHeight();
    var moveX = (this.contents.width - this.contents.width) + 5 + 36 + successNameWidth + 10;
    this.contents.fillRect(moveX,this._addY,this._gaugeWidth,18,"#191919");
    this.contents.fillRect(moveX+1,this._addY+1,this._meterWidth * this._currentGauge / this._extractSpeed,8,"#B4E1F5");
    this.contents.fillRect(moveX+1,this._addY+9,this._meterWidth * this._currentGauge / this._extractSpeed,8,"#14A0E1");
    if(this._gaugeTimer === 60) {
        var isSuccess = $gameAlchemy.getRandomIntInclusive(1,100);
        if(this._extractChance >= isSuccess) {
            this.changeTextColor("#00e060");
            var successCondition = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterResultLabels[3];
            var sound = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtractSuccessSound;
            AudioManager.playSe({"name": sound ,"volume":90,"pitch":100,"pan":0});
            if(this._extractExp > 0) {
                successCondition += " " + this._extractExp + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterResultLabels[2];
                $gameAlchemy.gainExp(this._extractData.extractType,this._extractExp);
            };
            $gameAlchemy.earnExtCreateItems(this._other);
        }else{
            this.changeTextColor("#ff2020");
            var successCondition = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterResultLabels[4];
            var sound = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtractFailedSound;
            AudioManager.playSe({"name": sound ,"volume":90,"pitch":100,"pan":0});
            if(this._extractExp > 0) {
                var loseExp = Math.floor(this._extractExp/2);
                if(loseExp <= 1) loseExp = 1; 
                successCondition += " " + loseExp + Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtracterResultLabels[2];
                $gameAlchemy.gainExp(this._extractData.extractType,loseExp);
            };
        };
        this._addY -= 9;
        this.drawText(successCondition,moveX + this._gaugeWidth + 10,this._addY,this.contents.width);
        this._updateCloseWindow = true;
        this._targetEvent.endingExtraction();
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};

//=============================================================================
// Game_System - $gameAlchemyの作成
//=============================================================================

var _AyatamExtractAlchemy_Game_System_prototype_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _AyatamExtractAlchemy_Game_System_prototype_initialize.call(this);
    if($gameAlchemy === null) $gameAlchemy = new Game_Alchemy();
};

//--------------------------------------------------------------------------
// ● DataManager - ニューゲーム時の初期化
//--------------------------------------------------------------------------
var _AyatamExtractAlchemy_DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    _AyatamExtractAlchemy_DataManager_setupNewGame.call(this);
    if($gameAlchemy !== null) $gameAlchemy.resetAllAlchemy();
};
//--------------------------------------------------------------------------
// ● DataManager - データの保存
//--------------------------------------------------------------------------
var _AyatamExtractAlchemy_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = _AyatamExtractAlchemy_DataManager_makeSaveContents.call(this);
    contents.ayatmExAlchemy = this.makeAyatamAlchemySave($gameAlchemy._Data);
    return contents;
};
//--------------------------------------------------------------------------
// ● DataManager - データ専用の保存機構
//--------------------------------------------------------------------------
DataManager.makeAyatamAlchemySave = function(alchemySave) {
    var makeAlchemySave = [];
    var alchemyData = Ayatam.EXTRACTALCHEMYSYSTEM.CategoryDatabase;
    if(alchemyData.length > 0) {
        for(var i = 0; i < alchemyData.length; ++i) {
            if(alchemyData[i]) {
                makeAlchemySave[i] = alchemySave[alchemyData[i].AlchemyID];
            };
        };
    };
    return makeAlchemySave;
};
//--------------------------------------------------------------------------
// ● DataManager - データロード時に合成/解体の更新情報を取得
//--------------------------------------------------------------------------
var _AyatamExtractAlchemy_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    _AyatamExtractAlchemy_DataManager_extractSaveContents.call(this, contents);
    $gameAlchemy._Data = this.extractAyatamAlchemySave(contents.ayatmExAlchemy);
    $gameAlchemy.reloadRecipeCategory();
};
//--------------------------------------------------------------------------
// ● DataManager - データ専用の読み込み
//--------------------------------------------------------------------------
DataManager.extractAyatamAlchemySave = function(alchemySave) {
    var extractAlchemySave = [];
    var alchemyData = Ayatam.EXTRACTALCHEMYSYSTEM.CategoryDatabase;
    if(alchemyData.length > 0) {
        for(var i = 0; i < alchemyData.length; ++i) {
            if(alchemyData[i]) {
                if(alchemySave.length > 0) {
                    for(var s = i; s < alchemySave.length; ++s) {
                        if(alchemyData[i].AlchemyID === alchemySave[s].alchemyId) {
                            extractAlchemySave[alchemyData[i].AlchemyID] = alchemySave[s];
                        };
                    };
                };
            };
        };
    };
    return extractAlchemySave;
};

//=============================================================================
// Game_Party - アイテム習得用のセットアップ
//=============================================================================

var _AyatamExtractAlchemy_Game_Party_prototype_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    _AyatamExtractAlchemy_Game_Party_prototype_initialize.call(this);
    this.aeAlchemySetup();
};

Game_Party.prototype.aeAlchemySetup = function() {
    this.getAeAlchemyAllNoteInformation();
};
//--------------------------------------------------------------------------
// ● 全アイテムメモ設定の参照
//--------------------------------------------------------------------------
Game_Party.prototype.getAeAlchemyAllNoteInformation = function() {
    $dataItems.forEach(item => {
        if(item) {
          this.getAeAlchemyItemNoteInformation(item);  
        };
    });
};
//--------------------------------------------------------------------------
// ● アイテムメモ設定の取得
//--------------------------------------------------------------------------
Game_Party.prototype.getAeAlchemyItemNoteInformation = function(item) {
    if($dataItems[item.id].aeAlchemyNoteLoaded !== undefined) return;
    $dataItems[item.id].aeAlchemyNoteLoaded = true;
    $dataItems[item.id].aeAlchemyRecipes = [];
    var loadRecipes = false;
    var lists = item.note.split(/[\r\n]+/);
    lists.forEach(note => {
        if(note !== "") {
            //アイテム取得レシピ情報を取得
            if(note.match(/<aeAlchemy learn recipes>/i)) loadRecipes = true;
            if(note.match(/<\/aeAlchemy learn recipes>/i)) loadRecipes = false;
            if(loadRecipes) {
                if(note.match(/recipe: (.*), (.*)/i)) {
                    var result = note.match(/recipe: (.*), (.*)/i);
                    var catergory = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                        try{return JSON.parse(value);} catch (e) {}
                        return value;
                        }
                    ));
                    var recipe = JSON.parse(JSON.stringify(result[2],(key,value)=>{
                        try{return JSON.parse(value);} catch (e) {}
                        return value;
                        }
                    ));
                    $dataItems[item.id].aeAlchemyRecipes.push([catergory,recipe]);
                };
            };
        };
    });
};

//=============================================================================
// Game_BattlerBase - アイテム習得用のセットアップ
//=============================================================================


var _AyatamExtractAlchemy_Game_BattlerBase_prototype_meetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
    return (_AyatamExtractAlchemy_Game_BattlerBase_prototype_meetsItemConditions.call(this,item) && this.canLearnRecipe(item));
};

Game_BattlerBase.prototype.canLearnRecipe = function(item) {
    if(this.constructor !== Game_Actor) return true;
    if(item.aeAlchemyRecipes.length <= 0) return true;
    var hasUnLearnedRecipes = [];
    item.aeAlchemyRecipes.forEach(recipe => {
        if(recipe) {
            hasUnLearnedRecipes.push($gameAlchemy.canLearnRecipe(recipe[0],recipe[1]));
        };
    });
    if(hasUnLearnedRecipes.length <= 0) return true;
    return !hasUnLearnedRecipes.includes(false);
};

var _AyatamExtractAlchemy_Game_Battler_prototype_consumeItem = Game_Battler.prototype.consumeItem;
Game_Battler.prototype.consumeItem = function(item) {
    _AyatamExtractAlchemy_Game_Battler_prototype_consumeItem.call(this,item);
    if(item.aeAlchemyRecipes.length <= 0) return;
    var canLearn = [];
    var learnedRecipe = []; 
    //習得レベルを満たしているか
    item.aeAlchemyRecipes.forEach(recipe => {
        if(recipe) {
            if($gameAlchemy.canLearnRecipe(recipe[0],recipe[1])) {
                canLearn.push([recipe[0],recipe[1]]);
            };
        };
    });
    //すでに習得済みか
    if(canLearn.length > 0) {
        canLearn.forEach(recipe => {
            if(recipe) {
                if(!$gameAlchemy.recipeLearned(recipe[0],recipe[1])) {
                    $gameAlchemy.learnRecipe(recipe[0],recipe[1]);
                    learnedRecipe.push([recipe[0],recipe[1]]);
                };
            };
        });
    };
    //覚えた情報のポップアップ
    if(learnedRecipe.length > 0) {
        SceneManager._scene._lvlInformationWindow.showLearnedRecipes(learnedRecipe);
    };
};

//=============================================================================
// Game_Event - 採取データのセットアップ
//=============================================================================

var _AyatamExtractAlchemy_Game_Event_prototype_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    _AyatamExtractAlchemy_Game_Event_prototype_initialize.call(this,mapId,eventId);
    this.setupExtraction();
};

Game_Event.prototype.setupExtraction = function() {
    this.lockExtraction = false;
    this.growItemRecived = false;
    this.extractAnimUpdate = true;
    this.updateRespawn = false;
    this.updateDelay = false;
    this.updateFadeOut = false;
    this.updateFadeIn = false;
    this.extractPriority = this._priorityType;
    this.extracting = false;
    this.extractStandbyAnimTimer = 0;
    this.extractStandbyAnimPlayed = false;
    this.extractGainingAnimTimer = 0;
    this.extractGainingAnimPlayed = false;
    this.extractTimes = 0;
    this.extractRespawnTimer = 0;
    this.extractDelayTimer = 0;
};

var _AyatamExtractAlchemy_Game_Event_prototype_start = Game_Event.prototype.start;
Game_Event.prototype.start = function() {
    if(this.lockExtraction) return;
    _AyatamExtractAlchemy_Game_Event_prototype_start.call(this);
    if(this._starting) this.executeExtraction();
};

Game_Event.prototype.executeExtraction = function() {
    if(this.extractInfo === undefined) return;
    if(!this.extractInfo.loaded) return;
    if(this.extractInfo.extractItems.length === 0) return;
    if(!$gameAlchemy.canExtract(this.extractInfo)) return;
    if(this.extractInfo.extractGrower !== undefined) {
        if(!this.growItemRecived) {
            var canGrowItem = false;
            if(this.extractInfo.extractGrower.itemType === "I") {
                canGrowItem = $gameParty.numItems($dataItems[this.extractInfo.extractGrower.growItem]) >= this.extractInfo.extractGrower.useAmount;
            }else if(this.extractInfo.extractGrower.itemType === "W") {
                canGrowItem = $gameParty.numItems($dataWeapons[this.extractInfo.extractGrower.growItem]) >= this.extractInfo.extractGrower.useAmount;
            }else if(this.extractInfo.extractGrower.itemType === "A") {
                canGrowItem = $gameParty.numItems($dataArmors[this.extractInfo.extractGrower.growItem]) >= this.extractInfo.extractGrower.useAmount;
            };
            if(canGrowItem) {//育てるアイテムをもっている場合
                if(SceneManager._scene.constructor === Scene_Map) {
                    var sound = Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.ExtractUseItemSound;
                    AudioManager.playSe({"name": sound ,"volume":90,"pitch":100,"pan":0});
                    SceneManager._scene._extractionWindow.extracterMode(this.extractInfo,"hasGrowItem",undefined,this);
                };
            }else{//育てるアイテムをもっていない場合
                if(SceneManager._scene.constructor === Scene_Map) {
                    SoundManager.playBuzzer();
                    SceneManager._scene._extractionWindow.extracterMode(this.extractInfo,"noGrowItem",undefined,this);
                };
            };
            return;
        };
    };
    this.extracting = true;
    $gameAlchemy.setFiberYield(true);
    if(SceneManager._scene.constructor === Scene_Map) {
        SceneManager._scene._extractionWindow.extracterMode(this.extractInfo,"extractSuccess",$gameAlchemy.startLottery(this.extractInfo),this);
    };
    this.extractTimes++;
};

Game_Event.prototype.getExtractTimes = function() {
    return this.extractTimes;
};

Game_Event.prototype.endingExtraction = function() {
    if(this.extractTimes >= this.extractInfo.extractTimes) {
        this.lockExtraction = true;
        this.extractAnimUpdate = false;
        if(this.extractInfo.extractRespawn !== undefined) {
            this.updateFadeOut = true;
            if(this.extractInfo.extractGrower === undefined) this._priorityType = 0;
        };
        if(this.extractInfo.extractDelay !== undefined) this.updateDelay = true;
        this.extractTimes = 0;
    };
};

var _AyatamExtractAlchemy_Game_Event_prototype_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    _AyatamExtractAlchemy_Game_Event_prototype_setupPageSettings.call(this);
    this.setupExtractInformation();
};

Game_Event.prototype.startGrowing = function() {
    this.growItemRecived = true;
    this.lockExtraction = true;
    this.extractAnimUpdate = false;
    if(this.extractInfo.extractRespawn !== undefined) this.updateRespawn = true;
    if(this.extractInfo.extractDelay !== undefined) this.updateDelay = true;
    this.extractTimes = 0;
};

Game_Event.prototype.setupExtractInformation = function() {
    var list = this.list();
    this.extractInfo = { extractType: undefined , extractGrower: undefined , extractLvl: 0 , extractTimes: 0 , extractSpeed: 0.0 , extractRespawn: undefined , extractDelay: undefined , extractItems: [] , extractChance: 0 , extractExp: 0 , extractStandByAnim: [] , extractGainingAnim: [] , saveOnMapChange: false , loaded: false };
    for(var i = 0; i < list.length; ++i) {
        if(list[i].code === 108) {
            if(list[i].parameters[0].match(/<extractType: (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractType: (.*)>/i);
                var extractType = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                this.extractInfo.extractType = extractType;
                this.extractInfo.loaded = true;
            }else if(list[i].parameters[0].match(/<extractGrower: (.*), (.*), (.*), (.*), (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractGrower: (.*), (.*), (.*), (.*), (.*)>/i);
                var itemType = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                var growItem = JSON.parse(JSON.stringify(result[2],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                var useAmount = JSON.parse(JSON.stringify(result[3],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                var hasWord = JSON.parse(JSON.stringify(result[4],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                var noWord = JSON.parse(JSON.stringify(result[5],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                this.extractInfo.extractGrower = { itemType: itemType, growItem: growItem, useAmount: useAmount, hasWord: hasWord , noWord: noWord };
                this.extractInfo.loaded = true;
            }else if(list[i].parameters[0].match(/<extractLvl: (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractLvl: (.*)>/i);
                var extractLvl = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                this.extractInfo.extractLvl = extractLvl;
                this.extractInfo.loaded = true;
            }else if(list[i].parameters[0].match(/<extractTimes: (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractTimes: (.*)>/i);
                var extractTimes = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                this.extractInfo.extractTimes = extractTimes;
                this.extractInfo.loaded = true;
            }else if(list[i].parameters[0].match(/<extractSpeed: (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractSpeed: (.*)>/i);
                var extractSpeed = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                this.extractInfo.extractSpeed = extractSpeed;
                this.extractInfo.loaded = true;
            }else if(list[i].parameters[0].match(/<extractRespawn: (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractRespawn: (.*)>/i);
                var extractRespawn = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                this.extractInfo.extractRespawn = extractRespawn < 0 ? 0 : extractRespawn;
                this.extractInfo.loaded = true;
            }else if(list[i].parameters[0].match(/<extractDelay: (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractDelay: (.*)>/i);
                var extractDelay = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                this.extractInfo.extractDelay = extractDelay < 0 ? 0 : extractDelay;
                this.extractInfo.loaded = true;
            }else if(list[i].parameters[0].match(/<extractItems: (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractItems: (.*)>/i);
                var item = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                item = item.replace(/\[/g,'').split('],');
                item.forEach(txt => {
                    if(txt) {
                        if(txt.includes(']')) txt = txt.replace(/\]/g,'');
                        txt = txt.split(',');
                        txt = JSON.parse(JSON.stringify(txt,(key,value)=>{
                            try{return JSON.parse(value);} catch (e) {}
                            return value;
                            }
                        ));
                        this.extractInfo.extractItems.push(txt);
                    };
                });
                this.extractInfo.loaded = true;
            }else if(list[i].parameters[0].match(/<extractChance: (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractChance: (.*)>/i);
                var extractChance = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                if(extractChance >= 100) extractChance = 100;
                if(extractChance <= 0) extractChance = 0;
                this.extractInfo.extractChance = extractChance;
                this.extractInfo.loaded = true;
            }else if(list[i].parameters[0].match(/<extractExp: (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractExp: (.*)>/i);
                var extractExp = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                this.extractInfo.extractExp = extractExp;
                this.extractInfo.loaded = true;
            }else if(list[i].parameters[0].match(/<extractSaveOnMapChange: (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractSaveOnMapChange: (.*)>/i);
                var saveOnMapChange = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                this.extractInfo.saveOnMapChange = saveOnMapChange;
                this.extractInfo.loaded = true;
            }else if(list[i].parameters[0].match(/<extractStandbyAnimation: (.*), (.*), (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractStandbyAnimation: (.*), (.*), (.*)>/i);
                var animationId = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                var beginDelay = JSON.parse(JSON.stringify(result[2],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                var loopDelay = JSON.parse(JSON.stringify(result[3],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                this.extractInfo.extractStandByAnim = [animationId,beginDelay,loopDelay];
                this.extractInfo.loaded = true;
            }else if(list[i].parameters[0].match(/<extractGainingAnimation: (.*), (.*), (.*)>/i)) {
                var result = list[i].parameters[0].match(/<extractGainingAnimation: (.*), (.*), (.*)>/i);
                var animationId = JSON.parse(JSON.stringify(result[1],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                var beginDelay = JSON.parse(JSON.stringify(result[2],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                var loopDelay = JSON.parse(JSON.stringify(result[3],(key,value)=>{
                    try{return JSON.parse(value);} catch (e) {}
                    return value;
                    }
                ));
                this.extractInfo.extractGainingAnim = [animationId,beginDelay,loopDelay];
                this.extractInfo.loaded = true;
            };
        };
    };
    if(this.extractInfo.extractDelay !== undefined) this.extractInfo.extractRespawn = undefined;
};

var _AyatamExtractAlchemy_Game_Event_prototype_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    _AyatamExtractAlchemy_Game_Event_prototype_update.call(this);
    if(this.extractInfo === undefined) return;
    if(!this.extractInfo.loaded) return;
    if(this.extractInfo.extractItems.length === 0) return;
    if(this.extractInfo.extractGrower !== undefined) {
        if(!this.growItemRecived) {
            this._priorityType = 0;
            this.setOpacity(0);
        }; 
    };
    if(this.extractAnimUpdate) this.updateExtractAnimation();
    this.updateExtractFadeIn();
    this.updateExtractFadeOut();
    if(this.updateDelay) this.updateDelayTimer();
    if(this.updateRespawn) this.updateRespawnTimer();
};

Game_Event.prototype.updateRespawnTimer = function() {
    if(this.extractRespawnTimer <= this.extractInfo.extractRespawn) {
        this.extractRespawnTimer++;
        if(this.extractRespawnTimer >= this.extractInfo.extractRespawn) {
            this.updateRespawn = false;
            this.extractRespawnTimer = 0;
            this.updateFadeIn = true;
        };
    };
};

Game_Event.prototype.updateDelayTimer = function() {
    if(this.extractDelayTimer <= this.extractInfo.extractDelay) {
        this.extractDelayTimer++;
        if(this.extractDelayTimer >= this.extractInfo.extractDelay) {
            this.updateDelay = false;
            this.extractDelayTimer = 0;
            this.extractAnimUpdate = true;
            this._priorityType = this.extractPriority;
            this.lockExtraction = false;
            if(this.growItemRecived) {
                this.updateFadeIn = true;
            };
        };
    };
};

Game_Event.prototype.updateExtractFadeIn = function() {
    if(!this.updateFadeIn) return;
    if(this.opacity() <= 255) {
        this._opacity += 4;
        if(this.opacity() >= 255) {
            this.setOpacity(255);
            this.updateFadeIn = false;
            this.extractAnimUpdate = true;
            this._priorityType = this.extractPriority;
            this.lockExtraction = false;
        };
    };
};

Game_Event.prototype.updateExtractFadeOut = function() {
    if(!this.updateFadeOut) return;
    if(this.opacity() >= 0) {
        this._opacity -= 4;
        if(this.opacity() <= 0) {
            this.setOpacity(0);
            this.updateFadeOut = false;
            if(this.extractInfo.extractGrower !== undefined) {
                this.lockExtraction = false;
                this.growItemRecived = false;
                this.updateRespawn = false;
                this.extractAnimUpdate = true;
            }else{
                this.updateRespawn = true;
            };
        };
    };
};

Game_Event.prototype.updateExtractAnimation = function() {
    if(this.extractInfo.extractStandByAnim.length > 0) {
        if(!this.extracting) {
            if(this.extractGainingAnimPlayed) this.extractGainingAnimPlayed = false;
            this.extractGainingAnimTimer = 0;
            this.extractStandbyAnimTimer++;
            if(this.extractInfo.extractStandByAnim[1] === 0) this.extractStandbyAnimPlayed = true;
            if(!this.extractStandbyAnimPlayed) {
                if(this.extractStandbyAnimTimer >= this.extractInfo.extractStandByAnim[1]) {
                    if(Utils.RPGMAKER_NAME === "MV") {
                        this.requestAnimation(this.extractInfo.extractStandByAnim[0])
                    }else if(Utils.RPGMAKER_NAME === "MZ"){
                        $gameTemp.requestAnimation([this],this.extractInfo.extractStandByAnim[0])
                    };
                    this.extractStandbyAnimTimer = 0;
                    this.extractStandbyAnimPlayed = true;
                };
            }else{
                if(this.extractStandbyAnimTimer >= this.extractInfo.extractStandByAnim[2]) {
                    if(Utils.RPGMAKER_NAME === "MV") {
                        this.requestAnimation(this.extractInfo.extractStandByAnim[0])
                    }else if(Utils.RPGMAKER_NAME === "MZ"){
                        $gameTemp.requestAnimation([this],this.extractInfo.extractStandByAnim[0])
                    };
                    this.extractStandbyAnimTimer = 0;
                };
            };
        };
    };
    if(this.extractInfo.extractGainingAnim.length > 0) {
        if(this.extracting) {
            if(this.extractStandbyAnimPlayed) this.extractStandbyAnimPlayed = false;
            this.extractStandbyAnimTimer = 0;
            this.extractGainingAnimTimer++;
            if(this.extractInfo.extractGainingAnim[1] === 0) this.extractGainingAnimPlayed = true;
            if(!this.extractGainingAnimPlayed) {
                if(this.extractGainingAnimTimer >= this.extractInfo.extractGainingAnim[1]) {
                    if(Utils.RPGMAKER_NAME === "MV") {
                        this.requestAnimation(this.extractInfo.extractGainingAnim[0])
                    }else if(Utils.RPGMAKER_NAME === "MZ"){
                        $gameTemp.requestAnimation([this],this.extractInfo.extractGainingAnim[0])
                    };
                    this.extractGainingAnimTimer = 0;
                    this.extractGainingAnimPlayed = true;
                };
            }else{
                if(this.extractGainingAnimTimer >= this.extractInfo.extractGainingAnim[2]) {
                    if(Utils.RPGMAKER_NAME === "MV") {
                        this.requestAnimation(this.extractInfo.extractGainingAnim[0])
                    }else if(Utils.RPGMAKER_NAME === "MZ"){
                        $gameTemp.requestAnimation([this],this.extractInfo.extractGainingAnim[0])
                    };
                    this.extractGainingAnimTimer = 0;
                };
            };
        };
    };
};

//=============================================================================
// Game_Interpreter - Fiber.Yield の登録
//=============================================================================

var _AyatamExtractAlchemy_Game_Interpreter_prototype_updateChild = Game_Interpreter.prototype.updateChild;
Game_Interpreter.prototype.updateChild = function() {
    return $gameAlchemy.fiberYield() ? true : _AyatamExtractAlchemy_Game_Interpreter_prototype_updateChild.call(this);
};

//=============================================================================
// Game_System - Fiber.Yield の登録
//=============================================================================

var _AyatamExtractAlchemy_Game_System_prototype_isMenuEnabled = Game_System.prototype.isMenuEnabled;
Game_System.prototype.isMenuEnabled = function() {
    return $gameAlchemy.fiberYield() ? false : _AyatamExtractAlchemy_Game_System_prototype_isMenuEnabled.call(this);
};

//=============================================================================
// Game_Player - Fiber.Yield の登録
//=============================================================================

var _AyatamExtractAlchemy_Game_Player_prototype_executeMove = Game_Player.prototype.executeMove;
Game_Player.prototype.executeMove = function(direction) {
    if(!$gameAlchemy.fiberYield())_AyatamExtractAlchemy_Game_Player_prototype_executeMove.call(this,direction);
};

var _AyatamExtractAlchemy_Game_Player_prototype_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
Game_Player.prototype.triggerButtonAction = function() {
    return $gameAlchemy.fiberYield() ? false : _AyatamExtractAlchemy_Game_Player_prototype_triggerButtonAction.call(this);
};

var _AyatamExtractAlchemy_Game_Player_prototype_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
Game_Player.prototype.triggerTouchAction = function() {
    return $gameAlchemy.fiberYield() ? false : _AyatamExtractAlchemy_Game_Player_prototype_triggerTouchAction.call(this);
};

//=============================================================================
// Scene_Menu - 合成/解体コマンドの定義
//=============================================================================

var _AyatamExtractAlchemy_Scene_Menu_prototype_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _AyatamExtractAlchemy_Scene_Menu_prototype_createCommandWindow.call(this);
    this._commandWindow.setHandler('alchemyCrafter', this.openAlchemyCrafter.bind(this));
};

Scene_Menu.prototype.openAlchemyCrafter = function() {
    SceneManager.push(Scene_AlchemyCrafter);
};

//=============================================================================
// Window_MenuCommand - 合成/解体コマンドの登録
//=============================================================================

var _AyatamExtractAlchemy_Window_MenuCommand_prototype_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    _AyatamExtractAlchemy_Window_MenuCommand_prototype_addOriginalCommands.call(this);
    this.addAlchemyCrafterCommand();
};

Window_MenuCommand.prototype.addAlchemyCrafterCommand = function() {
    if(!Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuCommandInformation.AddToMenuCommand) return;
    this.addCommand(Ayatam.EXTRACTALCHEMYSYSTEM.GlobalSettings.MenuCommandInformation.AlchemyMenuCommandName,'alchemyCrafter',true);
};

//=============================================================================
// Game_Map - イベント状態の保存
//=============================================================================

var _AyatamExtractAlchemy_Game_Map_prototype_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    this.saveExtracterEvents();
    _AyatamExtractAlchemy_Game_Map_prototype_setup.call(this,mapId);
};

Game_Map.prototype.saveExtracterEvents = function() {
    if(this._extracterEvents === undefined) this._extracterEvents = [];
    this._extracterEvents[this._mapId] = [];
    if(this._events.length > 0) {
        this._events.forEach(event => {
            if(event) {
                if(event.extractInfo !== undefined) {
                    if(event.extractInfo.loaded) {
                        if(event.extractInfo.saveOnMapChange) {
                            this._extracterEvents[this._mapId].push(event);
                        };
                    };
                };
            };
        });
    };
};

var _AyatamExtractAlchemy_Game_Map_prototype_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function() {
    _AyatamExtractAlchemy_Game_Map_prototype_setupEvents.call(this);
    this.loadExtracterEvents();
};

Game_Map.prototype.loadExtracterEvents = function() {
    if(this._events === undefined) return;
    if(this._events === null) return;
    if(this._events.length <= 0) return;
    if(this._extracterEvents === undefined ) return;
    if(this._extracterEvents[this._mapId] === undefined) return;
    if(this._extracterEvents[this._mapId] === null) return;
    if(this._extracterEvents[this._mapId].length <= 0) return;
    for(var m = 0; m < this._events.length; ++m) {
        if(this._events[m]) {
            for(var i = 0; i < this._extracterEvents[this._mapId].length; ++i) {
                if(this._events[m]._eventId === this._extracterEvents[this._mapId][i]._eventId) {
                    this._events[m] = this._extracterEvents[this._mapId][i];
                    break;
                };
            };
        };
    };
};

//=============================================================================
// Scene_AlchemyCrafter - 合成メニューシーン
//=============================================================================

//--------------------------------------------------------------------------
// ● 合成メニューシーンのオブジェクト初期化
//--------------------------------------------------------------------------
function Scene_AlchemyCrafter() {
    this.initialize.apply(this,arguments);
};

Scene_AlchemyCrafter.prototype = Object.create(Scene_MenuBase.prototype);
Scene_AlchemyCrafter.prototype.constructor = Scene_AlchemyCrafter;

Scene_AlchemyCrafter.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//--------------------------------------------------------------------------
// ● 合成メニューのセットアップ
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.findMenuCategories();
    this.createBackgroundWindow();
    this.createCategoryTitleWindow();
    this.createCategoryCommandWindow();
    this.createRecipeListCommandWindow();
    this.createRecipeDataWindow();
    this.createItemCreateWindow();
    this.createAlchemyNumberWindow();
};
//--------------------------------------------------------------------------
// ● 合成/解体シーンの準備
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.findMenuCategories = function() {
    this._exclusiveScene = $gameAlchemy.isExclusiveScene() === "" ? undefined : $gameAlchemy.isExclusiveScene();
    this._alchemyLists = [];
    if(this._exclusiveScene === undefined) {
        this._alchemyLists = $gameAlchemy.findAllAlchemyForMenu();
        this._isExclusiveScene = false;
    }else{
        this._alchemyLists = [this._exclusiveScene];
        this._isExclusiveScene = true;
    };
};
//--------------------------------------------------------------------------
// ● カテゴリータイトルウィンドウの作成
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.createBackgroundWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._alchemyBackgroundWindow = new Window_AlchemyBackGround();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._alchemyBackgroundWindow = new Window_AlchemyBackGround(new Rectangle());
    };
    this._alchemyBackgroundWindow.deactivate();
    this.addWindow(this._alchemyBackgroundWindow);
};
//--------------------------------------------------------------------------
// ● カテゴリータイトルウィンドウの作成
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.createCategoryTitleWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._categoryTitleWindow = new Window_CategoryTitleWindow();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._categoryTitleWindow = new Window_CategoryTitleWindow(new Rectangle());
    };
    this._categoryTitleWindow.height = this._isExclusiveScene ? 72 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryTitleWindow.ExclusiveH : 108 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryTitleWindow.MainH;
    this._categoryTitleWindow.deactivate();
    this.addWindow(this._categoryTitleWindow);
};
//--------------------------------------------------------------------------
// ● カテゴリーコマンドウィンドウの作成
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.createCategoryCommandWindow = function() {
    if(this._isExclusiveScene) return;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._categoryCommandWindow = new Window_AlchemyCategoryHorzCommand();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._categoryCommandWindow = new Window_AlchemyCategoryHorzCommand(new Rectangle());
    };
    this._categoryCommandWindow.x = 0 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryCommandWindow.MainX;
    this._categoryCommandWindow.y = 46 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryCommandWindow.MainY;
    this._categoryCommandWindow.width = Graphics.width + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryCommandWindow.MainW;
    this._categoryCommandWindow.height = 72 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCatergoryCommandWindow.MainH;
    this._categoryCommandWindow.setAlchemyInfo(this._alchemyLists);
    this._categoryCommandWindow.activate();
    this.addWindow(this._categoryCommandWindow);
};
//--------------------------------------------------------------------------
// ● レシピリストコマンドウィンドウの作成
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.createRecipeListCommandWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._recipeListCommandWindow = new Window_AlchemyRecipeListCommand();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._recipeListCommandWindow = new Window_AlchemyRecipeListCommand(new Rectangle());
    };
    this._recipeListCommandWindow.x = 0 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeListCommandWindow.MainX;
    this._recipeListCommandWindow.y = this._isExclusiveScene ? 72 +  + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeListCommandWindow.ExclusiveY : 108 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeListCommandWindow.MainY;
    this._recipeListCommandWindow.width = 290 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeListCommandWindow.MainW;
    this._recipeListCommandWindow.height = this._isExclusiveScene ? (Graphics.height - 72) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeListCommandWindow.ExclusiveH : (Graphics.height - 108) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeListCommandWindow.MainH;
    this._recipeListCommandWindow.setHandler("ok", this.recipeListOk.bind(this));
    this._recipeListCommandWindow.setHandler("cancel", this.menuCancel.bind(this));
    this._recipeListCommandWindow.activate();
    this.addWindow(this._recipeListCommandWindow);
};
//--------------------------------------------------------------------------
// ● レシピ情報ウィンドウの作成
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.createRecipeDataWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._recipeDataWindow = new Window_RecipeData();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._recipeDataWindow = new Window_RecipeData(new Rectangle());
    };
    this._recipeDataWindow.x = 290 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeDataWindow.MainX;
    this._recipeDataWindow.y = this._isExclusiveScene ? 72 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeDataWindow.ExclusiveY : 108 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeDataWindow.MainY;
    this._recipeDataWindow.width = (Graphics.width - 290) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeDataWindow.MainW;
    this._recipeDataWindow.height = this._isExclusiveScene ? (Graphics.height - 72 - 108) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeDataWindow.ExclusiveH : (Graphics.height - 108 - 108) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuRecipeDataWindow.MainH;
    this._recipeDataWindow.activate();
    this.addWindow(this._recipeDataWindow);
};
//--------------------------------------------------------------------------
// ● アイテム作成ウィンドウの作成
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.createItemCreateWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._itemCreateStatusWindow = new Window_ItemCreateStatus();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._itemCreateStatusWindow = new Window_ItemCreateStatus(new Rectangle());
    };
    this._itemCreateStatusWindow.x = 290 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuItemCreaterWindow.MainX;
    this._itemCreateStatusWindow.y = (Graphics.height - 108) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuItemCreaterWindow.MainY;
    this._itemCreateStatusWindow.width = (Graphics.width - 290) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuItemCreaterWindow.MainW;
    this._itemCreateStatusWindow.height = 108 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuItemCreaterWindow.MainH;
    this._itemCreateStatusWindow.deactivate();
    this.addWindow(this._itemCreateStatusWindow);
};
//--------------------------------------------------------------------------
// ● 作成/解体個数指定ウィンドウの作成
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.createAlchemyNumberWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._AlchemyNumberWindow = new Window_AlchemyNumber();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._AlchemyNumberWindow = new Window_AlchemyNumber(new Rectangle());
    };
    this._AlchemyNumberWindow.x = 0 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.MainX;
    this._AlchemyNumberWindow.y = (Graphics.height - (Graphics.height/2) - 108) + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.MainY;
    this._AlchemyNumberWindow.width = 290 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.MainW;
    this._AlchemyNumberWindow.height = 170 + Ayatam.EXTRACTALCHEMYSYSTEM.CustamizeSettings.MenuCreaterNumberWindow.MainH;
    this._AlchemyNumberWindow.setHandler("ok", this.alchemyNumberOk.bind(this));
    this._AlchemyNumberWindow.setHandler("cancel", this.alchemyNumberCancel.bind(this));
    this._AlchemyNumberWindow.deactivate();
    this.addWindow(this._AlchemyNumberWindow);
};
//--------------------------------------------------------------------------
// ● レシピリストOK
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.recipeListOk = function() {
    var recipe = this._recipeListCommandWindow.currentData();
    var mode = this._recipeDataWindow.createMode();
    if($gameAlchemy.canCreater(recipe)) {
        if(this._categoryCommandWindow !== undefined) this._categoryCommandWindow.deactivate();
        if(this._recipeDataWindow !== undefined) this._recipeDataWindow.deactivate();
        if(this._AlchemyNumberWindow) {
            this._AlchemyNumberWindow.setup(recipe,mode);
            this._AlchemyNumberWindow.visible = true;
            this._AlchemyNumberWindow.activate();
        };
    }else{
        this.alchemyNumberCancel();
    };
};
//--------------------------------------------------------------------------
// ● 作成/解体個数指定 ok
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.alchemyNumberOk = function() {
    if(this._itemCreateStatusWindow !== undefined) {
        if(this._AlchemyNumberWindow._number > 0) {
            this._itemCreateStatusWindow.startCreater(this._AlchemyNumberWindow._number);
            if(this._AlchemyNumberWindow) {
                this._AlchemyNumberWindow._number = 1;
                this._AlchemyNumberWindow.visible = false;
                this._AlchemyNumberWindow.deactivate();
            };
        }else{
            SoundManager.playBuzzer();
            this.alchemyNumberCancel();
        };
    };
};
//--------------------------------------------------------------------------
// ● 作成/解体個数指定 cancel
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.alchemyNumberCancel = function() {
    if(this._AlchemyNumberWindow) {
        this._AlchemyNumberWindow._number = 1;
        this._AlchemyNumberWindow.visible = false;
        this._AlchemyNumberWindow.deactivate();
    };
    if(this._categoryCommandWindow !== undefined) this._categoryCommandWindow.activate();
    if(this._recipeDataWindow !== undefined) this._recipeDataWindow.activate();
    if(this._recipeListCommandWindow !== undefined) this._recipeListCommandWindow.activate();
};
//--------------------------------------------------------------------------
// ● リストコマンド 「キャンセルコマンド」
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.menuCancel = function() {
    $gameAlchemy.resetExclusiveScene();
    this.popScene();
};
//--------------------------------------------------------------------------
// ● 全ウィンドウのリフレッシュ
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.refreshAllWindows = function() {
    if(this._categoryTitleWindow !== undefined) this._categoryTitleWindow.refresh();
    if(this._categoryCommandWindow !== undefined) this._categoryCommandWindow.refresh();
    if(this._recipeListCommandWindow !== undefined) this._recipeListCommandWindow.refresh();
    if(this._recipeDataWindow !== undefined) this._recipeDataWindow.refresh();
    if(this._AlchemyNumberWindow !== undefined) this._AlchemyNumberWindow.refresh();
};
//--------------------------------------------------------------------------
// ● フレームの更新
//--------------------------------------------------------------------------
Scene_AlchemyCrafter.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if(this._categoryCommandWindow) {
        if(this._alchemyBackgroundWindow) this._alchemyBackgroundWindow.setAlchemyInfo(this._categoryCommandWindow.currentData());
        if(this._categoryTitleWindow) this._categoryTitleWindow.setAlchemyInfo(this._categoryCommandWindow.currentData());
        if(this._recipeListCommandWindow) this._recipeListCommandWindow.setAlchemyInfo(this._categoryCommandWindow.currentData());
    }else{
        if(this._alchemyBackgroundWindow) this._alchemyBackgroundWindow.setAlchemyInfo(this._alchemyLists[0]);
        if(this._categoryTitleWindow) this._categoryTitleWindow.setAlchemyInfo(this._alchemyLists[0]);
        if(this._recipeListCommandWindow) this._recipeListCommandWindow.setAlchemyInfo(this._alchemyLists[0]);
    };
    if(this._recipeListCommandWindow) {
        if(this._recipeDataWindow) {
            this._recipeDataWindow.setAlchemyInfo(this._recipeListCommandWindow.currentData());
            this._recipeListCommandWindow.createMode(this._recipeDataWindow.createMode());
        };
        if(this._itemCreateStatusWindow) this._itemCreateStatusWindow.setAlchemyInfo(this._recipeListCommandWindow.currentData());
    };
    if(this._itemCreateStatusWindow) {
        if(this._recipeDataWindow) this._itemCreateStatusWindow.createMode(this._recipeDataWindow.createMode());
    };
    if(this._AlchemyNumberWindow) {
        if(this._recipeDataWindow) this._recipeDataWindow.setNumber(this._AlchemyNumberWindow.number());
    };
};

//=============================================================================
// Scene_Base - 採集/レベル関連ウィンドウの登録
//=============================================================================
var _AyatamExtractAlchemy_Scene_Base_prototype_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
    _AyatamExtractAlchemy_Scene_Base_prototype_update.call(this);
    this.createExtractionWindow();
    this.createLvlInformationWindow();
};
//--------------------------------------------------------------------------
// ● 採集関連ウィンドウの作成
//--------------------------------------------------------------------------
Scene_Base.prototype.createExtractionWindow = function() {
    if(this._windowLayer === undefined) return;
    if(this._extractionWindow !== undefined) return;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._extractionWindow = new Window_MapExtraction();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._extractionWindow = new Window_MapExtraction(new Rectangle());
    };
    this.addWindow(this._extractionWindow);
};
//--------------------------------------------------------------------------
// ● レベル関連ウィンドウの作成
//--------------------------------------------------------------------------
Scene_Base.prototype.createLvlInformationWindow = function() {
    if(this._windowLayer === undefined) return;
    if(this._lvlInformationWindow !== undefined) return;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._lvlInformationWindow = new Window_lvlInformation();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._lvlInformationWindow = new Window_lvlInformation(new Rectangle());
    };
    this.addWindow(this._lvlInformationWindow);
};

//=============================================================================
// プラグイン終了 - End of file
//=============================================================================