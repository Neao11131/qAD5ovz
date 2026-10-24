/*:
 * @target MZ
 * @plugindesc With this plugin you can change the character's Outfits / Skins easily ingame.
 * @author  ?Undermax | Maxii1996
 * @url https://undermax.itch.io/
 * @help
 * 
 *     ――― DETAILS ――――――――――――――――――――――――
 * 
 *    Plugin Edition:       ◯ Release  ◯ Alternative
 *    Plugin Type:          ◯ Full  ◯ Demo
 *    Plugin Name:          MultiClothes
 *    Plugin Version:       1.1.1 
 *    Developed by:         Undermax | Maxii1996
 *   
 *     ――― SUPPORT ――――――――――――――――――――――――
 * 
 *    Itch.io Page:         https://undermax.itch.io
 *    Official Website:     https://undermax.online
 *    Plugins Support:      https://undermax.online/undermax/support.html
 *    Plugins Licence:      https://undermax.online/undermax/LicenceTerms.html
 * 
 *     ――― CHANGELOG ――――――――――――――――――――――――
 * 
 *    ◯ 1.1.1                     Release Version
 * 
 *    - Bug Fixed: Fixed a problem where the help window text was not updating 
 *      correctly.
 *
 *    - Bug Fixed: Resolved an issue where auto-activated switches were 
 *      globally deactivated when an actor changed their outfit?even if 
 *      another actor still required the switch to remain active. The system 
 *      now checks all party members to ensure switches stay activated as long 
 *      as needed.
 * 
 *
 *    ◯ 1.1.0                     Release Version
 * 
 *     - The plugin parameters and documentation have been updated
 *       and improved to the latest Undermax plugin's standards.
 * 
 *     - The Custom Image Settings have been improved to allow
 *      more customization options for the outfit preview.
 * 
 *     - The MultiClothes UI has been optimized and improved to.
 * 
 *     - Small bug fixes and improvements.
 * 
 *     - New Plugin Commands added.
 * 
 *     - Now you can choice the Header Display Mode for the top window.
 * 
 * 
 *    ◯ v1.0.3                    Alternative Version
 * 
 *    The graphic at the top was removed to avoid compatibility 
 *    issues with the use of custom graphics.
 * 
 *    ◯ v1.0.2                    Alternative Version
 * 
 *    Added a new parameter in Settings to choose if you want to 
 *    open the scene automatically from the menu without having to 
 *    select a character.
 * 
 *    ◯ 1.0.2                     Release Version
 * 
 *    Fixed a problem with the VisuMZ Main Menu Core plugin crash & 
 *    Window visual bug fix.
 * 
 *    ◯ 1.0.1                     Release Version
 * 
 *     Fixed a problem with the Shop Scene.
 * 
 *    ◯ 1.0.0                     Release Version
 *       
 *      Initial release.
 * 
 *     ――― CHANGELOG ――――――――――――――――――――――――
 * 
 * 
 *    This plugin allows you to have a simple system for changing the
 *    character's Outfits / Skins in the game.
 * 
 *    You must have different files for your characters with the clothes
 *    and elements you want to use.
 * 
 *    The configuration is very simple: Configure everything from the
 *    Outfits tab. Remember to initialize the Settings Tab too.
 * 
 *    Please note that the initial outfit for each character (Base) must
 *    be the same as the one you use in the database. Select it and make
 *    sure it is the first on the list.
 * 
 *    Information:
 * 
 *      This plugin was made to use the Default RPG Maker MZ size
 *      graphics (Face Size: 144x144, Character Size: 48x48.
 *      If you use different sizes, the plugin may not work correctly,
 *      and you will need to make adjustments in the plugin code directly)
 *  
 *
 *     ――― END OF DOCUMENTATION ―――――――――――――――――――
 * 
 * @param Outfits
 * @text Outfits
 * @desc Outfit settings for characters.
 * @type struct<CharacterOutfit>[]
 *
 * @param Settings
 * @text Settings
 * @type struct<Settings>
 * @desc The settings for the MultiClothes plugin.
 *
 * @command OpenWardrobeManager
 * @text Open Wardrobe Manager
 * @desc Opens the wardrobe management scene for the specified character.
 * @arg characterID
 * @text Character ID
 * @desc The ID of the character whose wardrobe to manage.
 * @type actor
 *
 * @command GetCurrentOutfit
 * @text Get Current Outfit
 * @desc Gets the name or ID of the current outfit for a specified character and saves it to a variable.
 * @arg type
 * @text Type
 * @desc The type of information to obtain (Name or ID).
 * @type select
 * @option Name
 * @value name
 * @option ID
 * @value id
 * @arg characterID
 * @text Character ID
 * @desc The ID of the character.
 * @type actor
 * @arg variableID
 * @text Variable ID
 * @desc The ID of the variable to store the result.
 * @type variable
 *
 * @command ForceChangeOutfit
 * @text Force Change Outfit
 * @desc Forces an actor to change to a specified outfit ID.
 * @arg characterID
 * @text Character ID
 * @desc The actor ID of the character whose outfit will be changed.
 * @type number
 * @arg outfitID
 * @text Outfit ID
 * @desc The ID of the outfit to which the character will change.
 * @type number
 *
 * @command SetAccessMultiClothesScene
 * @text Set Access to MultiClothes Scene
 * @desc Allows enabling or disabling the MultiClothes Scene globally.
 * @arg access
 * @text Enable Scene
 * @desc If false, the scene won't open even via plugin commands.
 * @type boolean
 * @default true
 *
 * @command SetHeaderDisplayMode
 * @text Set Header Display Mode
 * @desc Changes the display mode for the top window in the wardrobe scene.
 * @arg mode
 * @text Mode
 * @desc Possible modes: name, sprite, face
 * @type select
 * @option Actor Name Only
 * @value name
 * @option Character Sprite + Name
 * @value sprite
 * @option Face + Name
 * @value face
 * @default name
 */

/*~struct~CharacterOutfit:
 * @param characterID
 * @text Character ID
 * @desc The ID of the character.
 * @type actor
 *
 * @param characterOutfits
 * @text Character Outfits
 * @desc Outfits available for this character.
 * @type struct<OutfitFiles>[]
 */

/*~struct~OutfitFiles:
 *
 * @param ◆ General Settings
 * @text ◆ General Settings
 * @type text
 * @default
 *
 * @param outfitID
 * @text Outfit ID
 * @type number
 * @desc Unique ID of the outfit.
 *
 * @param outfitName
 * @text Outfit Name
 * @type text
 * @desc Name of the outfit.
 * @default
 *
 * @param outfitNameOffsetX
 * @text Outfit Name Offset X
 * @type number
 * @desc Horizontal offset for the outfit name text.
 * @default 0
 *
 * @param outfitNameColor
 * @text Outfit Name Color
 * @desc Hex color code for the outfit name (e.g. #FF0000). Leave blank for default.
 * @type text
 * @default
 *
 * @param ◆Unlock Settings
 * @text  ◆ Unlock Settings
 * @type text
 * @default
 *
 * @param unlockSwitches
 * @text Switches to Unlock
 * @desc Array of switches that need to be ON to unlock this outfit. Leave empty if no switch is needed.
 * @type switch[]
 *
 * @param autoActivateSwitch
 * @text Auto-Activate Switch
 * @type switch
 * @desc Switch that will be automatically activated when this outfit is equipped.
 *
 * @param ◆Sound Settings
 * @text  ◆ Sound Settings
 * @type text
 * @default
 *
 * @param sound
 * @text Sound
 * @type struct<OutfitSound>
 * @desc Sound configuration for when this outfit is equipped.
 *
 * @param ◆Appearance Settings
 * @text  ◆ Appearance Settings
 * @type text
 * @default
 *
 * @param faceFile
 * @text Face Graphic File
 * @desc Face graphic file for the outfit.
 * @type file
 * @dir img/faces/
 *
 * @param faceIndex
 * @text Face Index
 * @desc Index of the face graphic in the file (0-7).
 * @type number
 * @min 0
 * @max 7
 * @default 0
 *
 * @param characterFile
 * @text Character Graphic File
 * @desc Character graphic file for the outfit.
 * @type file
 * @dir img/characters/
 *
 * @param characterIndex
 * @text Character Index
 * @desc Index of the character graphic in the file (0-7).
 * @type number
 * @min 0
 * @max 7
 * @default 0
 *
 * @param battlerFile
 * @text Battler Graphic File
 * @desc SV Battler graphic file for the outfit.
 * @type file
 * @dir img/sv_actors/
 *
 * @param ◆Custom Image Settings
 * @text  ◆ Custom Image Settings
 * @type text
 * @default
 *
 * @param customImage
 * @text Custom Image File
 * @desc Custom image file for the outfit preview. Leave blank to use default sprite.
 * @type file
 * @dir img/pictures/
 *
 * @param customImageAlignment
 * @text Custom Image Alignment
 * @desc Horizontal alignment for the custom image (Left, Center, Right).
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @default left
 *
 * @param customImageOffsetX
 * @text Custom Image Offset X
 * @desc Horizontal offset for the custom image.
 * @type number
 * @default 0
 *
 * @param customImageOffsetY
 * @text Custom Image Offset Y
 * @desc Vertical offset for the custom image.
 * @type number
 * @default 0
 *
 * @param customImageWidth
 * @text Custom Image Width
 * @desc Width for the custom image. Use 0 for auto-size.
 * @type number
 * @min 0
 * @default 0
 *
 * @param customImageHeight
 * @text Custom Image Height
 * @desc Height for the custom image. Use 0 for auto-size.
 * @type number
 * @min 0
 * @default 0
 *
 * @param customImageOpacity
 * @text Custom Image Opacity
 * @desc Opacity for the custom image (0-255).
 * @type number
 * @min 0
 * @max 255
 * @default 255
 */

/*~struct~OutfitSound:
 * @param soundFile
 * @text Sound File
 * @type file
 * @dir audio/se/
 * @desc Sound file to play when this outfit is equipped.
 *
 * @param soundVolume
 * @text Sound Volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param soundPitch
 * @text Sound Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 */

/*~struct~Settings:
 *
 * @param ◆ General Settings
 * @type text
 * @default
 *
 * @param EnableMultiClothes
 * @text Enable MultiClothes Scene?
 * @desc If false, the scene won't be accessible, even via plugin commands.
 * @type boolean
 * @default true
 *
 * @param ◆ Menu Settings
 * @type text
 * @default
 *
 * @param AddMultiClothesToMenu
 * @text Add MultiClothes to menu?
 * @desc Add the MultiClothes wardrobe manager to the main menu.
 * @type boolean
 * @default false
 *
 * @param QuickAccessToMenu
 * @text Add direct access to menu (Without character selection)
 * @type boolean
 * @default false
 * @desc Allows opening the wardrobe scene directly, automatically selecting the first character in the party.
 *
 * @param WardrobeMenuText
 * @text Wardrobe Menu Text
 * @desc Text to display for the wardrobe in the main menu.
 * @type string
 * @default Wardrobe
 *
 * @param DisableSwitch
 * @text Disable Switch
 * @desc If this switch is ON, the MultiClothes option will be hidden from the menu.
 * @type switch
 * @default 0
 *
 * @param ◆ Display Settings
 * @type text
 * @default
 *
 * @param HeaderDisplayMode
 * @text Header Display Mode
 * @desc Display mode for the top window.
 * @type select
 * @option Actor Name Only
 * @value name
 * @option Character Sprite + Name
 * @value sprite
 * @option Face + Name
 * @value face
 * @default name
 *
 * @param ActorNameFontSize
 * @text Font Size for Actor Name
 * @type number
 * @desc Font size for the actor's name in the wardrobe scene.
 * @default 20
 *
 * @param CurrentOutfitText
 * @text Current Outfit Text
 * @type string
 * @desc Prefix text for the current outfit display.
 * @default Currently Using:
 *
 * @param CurrentOutfitFontSize
 * @text Font Size for Current Outfit
 * @type number
 * @desc Font size for the current outfit display.
 * @default 21
 *
 * @param CurrentOutfitPadding
 * @text Padding for Current Outfit
 * @type number
 * @desc Padding for the current outfit display.
 * @default 40
 *
 * @param SelectedOutfitColorStart
 * @text Selected Outfit Background Color Start
 * @type string
 * @desc The start color for the selected outfit background gradient.
 * @default rgba(135, 156, 232, 0.3)
 *
 * @param SelectedOutfitColorEnd
 * @text Selected Outfit Background Color End
 * @type string
 * @desc The end color for the selected outfit background gradient.
 * @default rgba(135, 156, 232, 0)
 *
 * @param WardrobeCols
 * @text Number of Columns in Wardrobe
 * @type number
 * @desc Number of columns in the wardrobe window.
 * @default 3
 *
 * @param WardrobeItemHeight
 * @text Wardrobe Item Height
 * @type number
 * @desc The height of each item in the wardrobe window.
 * @default 125
 *
 * @param HelpWindowText
 * @text Help Window Text
 * @type string
 * @desc The text displayed in the help window. (Use %1 to add actor name)
 * @default Select the outfit you want to use for %1
 */
/*:ja
 * @target MZ
 * @plugindesc このプラグインを使えば、ゲーム内でキャラクターの衣装やスキンを簡単に変更できます。
 * @author  Undermax | Maxii1996
 * @url https://undermax.itch.io/
 * @help
 * 
 *     ――― DETAILS ――――――――――――――――――――――――
 * 
 *    Plugin Edition:        ◯Release  ◯ Alternative
 *    Plugin Type:          ◯Full  ◯ Demo
 *    Plugin Name:          MultiClothes
 *    Plugin Version:       1.1.1 
 *    Developed by:         Undermax | Maxii1996
 *   
 *     ――― SUPPORT ――――――――――――――――――――――――
 * 
 *    Itch.io Page:         https://undermax.itch.io
 *    Official Website:     https://undermax.online
 *    Plugins Support:      https://undermax.online/undermax/support.html
 *    Plugins Licence:      https://undermax.online/undermax/LicenceTerms.html
 * 
 *     ――― CHANGELOG ――――――――――――――――――――――――
 * 
 *    ◯1.1.1                     Release Version
 * 
 *    - Bug Fixed: ヘルプウィンドウのテキストが正しく更新されない問題を
 *     修正しました。
 *
 *    - Bug Fixed: アクターが衣装を変更したときに、他のアクターがまだスイッチを
*     アクティブにしておく必要がある場合でも、自動アクティベートされたスイッチが*     グローバルに非アクティブになる問題を解決しました。 
 *     スイッチが必要なだけアクティブな状態を維持するように、
 *     すべてのパーティーメンバーをチェックするようになりました。
 * 
 *
 *    ◯1.1.0                     Release Version
 * 
 *     - プラグインのパラメータとドキュメントが更新され、最新のUndermax
 *       プラグインの標準に改善されました。
 * 
 *     - カスタム画像設定が改善され、衣装プレビューのカスタマイズオプションが増
 *      えました。
 * 
 *     - MultiClothesのUIが最適化され、改善されました。
 * 
 *     - 小さなバグ修正と改善。
 * 
 *     - 新しいプラグインコマンドが追加されました。
 * 
 *     - トップウィンドウのヘッダー表示モードを選択できるようになりました。
 * 
 * 
 *    ◯ v1.0.3                    Alternative Version
 * 
 *    カスタムグラフィックの使用による互換性の問題を避けるため、
 *    上部のグラフィックは削除されました。
 * 
 *    ◯ v1.0.2                    Alternative Version
 * 
 *    キャラクターを選択することなく、
 *    メニューから自動的にシーンを開くかどうかを選択する
 *    新しいパラメータを設定に追加しました。
 * 
 *    ◯ 1.0.2                     Release Version
 * 
 *    VisuMZメインメニューコアプラグインのクラッシュと
 *    ウィンドウビジュアルのバグを修正しました。
 * 
 *    ◯ 1.0.1                     Release Version
 * 
 *     ショップシーンの不具合を修正しました。
 * 
 *    ◯ 1.0.0                     Release Version
 *       
 *      初回リリース。
 * 
 *     ――― CHANGELOG ――――――――――――――――――――――――
 * 
 * 
 *    このプラグインを使用すると、ゲーム内でキャラクターの衣装や
 *    スキンを簡単に変更できるシステムを導入できます。
 * 
 *    使用したい衣装や要素を反映させたキャラクターごとの異なるファイルを
 *    用意しておく必要があります。
 * 
 *    設定は非常に簡単です：すべての設定は「Outfits（衣装）」タブから行います。
 *    「Settings（設定）」タブの初期化も忘れずに行ってください。
 * 
 *    各キャラクターの初期衣装（ベース）は、データベースで使用しているものと
 *    同じでなければならないことに注意してください。
 *    それを選択し、リストの最初に配置されていることを確認してください。
 * 
 *    Information:
 * 
 *      このプラグインは、RPGツクールMZのデフォルトサイズのグラフィック
 *      （顔グラフィックサイズ：144x144、キャラクターサイズ：48x48）を使用すること
 *      を前提に作られています。異なるサイズを使用する場合、プラグインが正しく動作
 *      しない可能性があり、その場合プラグインのコードを直接調整する必要があります。
 *  
 *
 *     ――― END OF DOCUMENTATION ―――――――――――――――――――
 * 
 * @param Outfits
 * @text 服装
 * @desc キャラクターの衣装設定。
 * @type struct<CharacterOutfit>[]
 *
 * @param Settings
 * @text 設定
 * @type struct<Settings>
 * @desc MultiClothesプラグインの設定。
 *
 * @command OpenWardrobeManager
 * @text ワードローブマネージャーを開く
 * @desc 指定したキャラクターのワードローブ管理シーンを開きます。
 * @arg characterID
 * @text キャラクターID
 * @descワードローブを管理するキャラクターのID。
 * @type actor
 *
 * @command GetCurrentOutfit
 * @text 現在の衣装を取得
* @desc 指定したキャラクターの現在の衣装の名前またはIDを取得し、それを変数に保存します。
 * @arg type
 * @text タイプ
 * @desc 取得する情報の種類（名前 または ID）。
 * @type select
 * @option Name
 * @value name
 * @option ID
 * @value id
 * @arg characterID
 * @text キャラクターID
 * @desc キャラクターのID
 * @type actor
 * @arg variableID
 * @text 変数ID
 * @desc 結果を保存するための変数のID。
 * @type variable
 *
 * @command ForceChangeOutfit
 * @text 衣装を強制的に変更
 * @desc アクターに指定した衣装IDへの変更を強制的に行います。
 * @arg characterID
 * @text キャラクターのID
 * @desc 衣装を変更するキャラクターのアクターID。
 * @type number
 * @arg outfitID
 * @text 衣装の ID
 * @desc キャラクターが変更する衣装のID。
 * @type number
 *
 * @command SetAccessMultiClothesScene
 * @text MultiClothesシーンへのアクセスを設定
 * @desc MultiClothesシーンを全体的に有効化または無効化できるようにします。
 * @arg access
 * @text シーンを有効化する
 * @desc false（無効）の場合、プラグインコマンド経由でもシーンは開きません。
 * @type boolean
 * @default true
 *
 * @command SetHeaderDisplayMode
 * @text ヘッダーの表示モードを設定
 * @desc ワードローブシーンにおける上部ウィンドウの表示モードを変更します。
 * @arg mode
 * @text モード
 * @desc 使用可能なモード：name（名前）、sprite（スプライト）、face（顔グラフィック）
 * @type select
 * @option Actor Name Only
 * @value name
 * @option Character Sprite + Name
 * @value sprite
 * @option Face + Name
 * @value face
 * @default name
 */

/*~struct~CharacterOutfit:ja
 * @param characterID
 * @textキャラクターID
 * @desc キャラクターのID
 * @type actor
 *
 * @param characterOutfits
 * @text キャラクターの衣装
 * @desc このキャラクターに使用可能な衣装です。
 * @type struct<OutfitFiles>[]
 */

/*~struct~OutfitFiles:ja
 *
 * @param ◆ General Settings
 * @text ◆一般設定
 * @type text
 * @default
 *
 * @param outfitID
 * @text 衣装ID
 * @type number
 * @desc 衣装のユニークIDです。
 *
 * @param outfitName
 * @text 衣装名
 * @type text
 * @desc 衣装の名前です。
 * @default
 *
 * @param outfitNameOffsetX
 * @text 衣装名のX方向オフセット
 * @type number
 * @desc 衣装名テキストの水平方向のオフセットです。
 * @default 0
 *
 * @param outfitNameColor
 * @text 衣装名のカラー
 * @desc 衣装名の16進数カラーコード（例：#FF0000）。空欄にするとデフォルトの色が使用されます。
 * @type text
 * @default
 *
 * @param ◆Unlock Settings
 * @text  ◆アンロック設定
 * @type text
 * @default
 *
 * @param unlockSwitches
 * @text アンロックに使用するスイッチ
 * @desc この衣装をアンロックするためにONにする必要があるスイッチの配列です。スイッチが不要な場合は空のままにしてください。
 * @type switch[]
 *
 * @param autoActivateSwitch
 * @text 自動アクティベートスイッチ
 * @type switch
 * @desc この衣装が装備されたときに自動的にONになるスイッチです。
 *
 * @param ◆Sound Settings
 * @text  ◆サウンド設定
 * @type text
 * @default
 *
 * @param sound
 * @text サウンド
 * @type struct<OutfitSound>
 * @desc この衣装が装備されたときに再生されるサウンドの設定です。
 *
 * @param ◆Appearance Settings
 * @text  ◆外見設定
 * @type text
 * @default
 *
 * @param faceFile
 * @text 顔グラフィックのファイル名
 * @desc この衣装用の顔グラフィックファイルです。
 * @type file
 * @dir img/faces/
 *
 * @param faceIndex
 * @text 顔グラフィックのインデックス
 * @desc ファイル内の顔グラフィックのインデックス（0～7）です。
 * @type number
 * @min 0
 * @max 7
 * @default 0
 *
 * @param characterFile
 * @text キャラクターグラフィックのファイル名
 * @desc この衣装用のキャラクターグラフィックファイルです。
 * @type file
 * @dir img/characters/
 *
 * @param characterIndex
 * @text キャラクターのインデックス
 * @desc ファイル内のキャラクターグラフィックのインデックス（0～7）です。
 * @type number
 * @min 0
 * @max 7
 * @default 0
 *
 * @param battlerFile
 * @text バトラーグラフィックのファイル名
 * @desc この衣装用のSVバトラーグラフィックファイルです。
 * @type file
 * @dir img/sv_actors/
 *
 * @param ◆Custom Image Settings
 * @text  ◆カスタム画像設定
 * @type text
 * @default
 *
 * @param customImage
 * @text カスタム画像ファイル
 * @desc 衣装プレビュー用のカスタム画像ファイルです。デフォルトのスプライトを使用する場合は空欄のままにしてください。
 * @type file
 * @dir img/pictures/
 *
 * @param customImageAlignment
 * @text カスタム画像の配置設定
 * @desc カスタム画像の水平方向の配置（左、中央、右）を指定します。
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @default left
 *
 * @param customImageOffsetX
 * @text カスタム画像のX方向オフセット
 * @desc カスタム画像の水平方向のオフセットです。
 * @type number
 * @default 0
 *
 * @param customImageOffsetY
 * @text カスタム画像のY方向オフセット
 * @desc カスタム画像の垂直方向のオフセットです。
 * @type number
 * @default 0
 *
 * @param customImageWidth
 * @text カスタム画像の幅
 * @desc カスタム画像の幅を指定します。自動サイズにする場合は0を指定してください。
 * @type number
 * @min 0
 * @default 0
 *
 * @param customImageHeight
 * @text カスタム画像の高さ
 * @desc カスタム画像の高さを指定します。自動サイズにする場合は0を指定してください。
 * @type number
 * @min 0
 * @default 0
 *
 * @param customImageOpacity
 * @text カスタム画像の不透明度
 * @desc カスタム画像の不透明度を指定します（0～255）。
 * @type number
 * @min 0
 * @max 255
 * @default 255
 */

/*~struct~OutfitSound:ja
 * @param soundFile
 * @text サウンドファイル
 * @type file
 * @dir audio/se/
 * @desc Sound file to play when this outfit is equipped.
 *
 * @param soundVolume
 * @text サウンドボリューム
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param soundPitch
 * @text サウンドピッチ
 * @type number
 * @min 50
 * @max 150
 * @default 100
 */

/*~struct~Settings:ja
 *
 * @param ◆ General Settings
 * @type text
 * @default
 *
 * @param EnableMultiClothes
 * @text MultiClothesシーンを有効にしますか？
 * @desc false（無効）の場合、プラグインコマンド経由でもシーンにはアクセスできません。
 * @type boolean
 * @default true
 *
 * @param ◆ Menu Settings
 * @type text
 * @default
 *
 * @param AddMultiClothesToMenu
 * @text メニューにMultiClothesを追加しますか？
 * @desc MultiClothesのワードローブ管理機能をメインメニューに追加します。
 * @type boolean
 * @default false
 *
 * @param QuickAccessToMenu
 * @text キャラクター選択なしで、メニューから直接アクセスできるようにします。
 * @type boolean
 * @default false
 * @desc ワードローブシーンを直接開き、パーティ内の最初のキャラクターを自動的に選択するようにします。
 *
 * @param WardrobeMenuText
 * @text ワードローブメニューのテキスト
 * @desc メインメニューでワードローブに表示するテキストです。
 * @type string
 * @default ワードローブ
 *
 * @param DisableSwitch
 * @text 無効化スイッチ
 * @descこのスイッチがONのとき、メニューからMultiClothesのオプションが非表示になります。
 * @type switch
 * @default 0
 *
 * @param ◆ Display Settings
 * @type text
 * @default
 *
 * @param HeaderDisplayMode
 * @text ヘッダー表示モード
 * @desc ヘッダーウィンドウの表示モードを設定します。
 * @type select
 * @option Actor Name Only
 * @value name
 * @option Character Sprite + Name
 * @value sprite
 * @option Face + Name
 * @value face
 * @default name
 *
 * @param ActorNameFontSize
 * @text アクター名のフォントサイズ
 * @type number
 * @desc ワードローブシーンにおけるアクター名のフォントサイズです。
 * @default 20
 *
 * @param CurrentOutfitText
 * @text 現在の衣装のテキスト
 * @type string
 * @desc 現在の衣装表示に使う接頭辞テキスト
 * @default Currently Using:
 *
 * @param CurrentOutfitFontSize
 * @text 現在の衣装のフォントサイズ
 * @type number
 * @desc 現在の衣装表示に使うフォントサイズ
 * @default 21
 *
 * @param CurrentOutfitPadding
 * @text 現在の衣装の余白
 * @type number
 * @desc 現在の衣装表示に使う余白です。
 * @default 40
 *
 * @param SelectedOutfitColorStart
 * @text 選択中の衣装の背景グラデーション開始色
 * @type string
 * @desc 選択中の衣装の背景グラデーションの開始色です。
 * @default rgba(135, 156, 232, 0.3)
 *
 * @param SelectedOutfitColorEnd
 * @text 選択中の衣装の背景グラデーション終了色
 * @type string
 * @desc 選択中の衣装の背景グラデーションの終了色です。
 * @default rgba(135, 156, 232, 0)
 *
 * @param WardrobeCols
 * @text ワードローブの列数
 * @type number
 * @desc ワードローブウィンドウに表示する列の数です。
 * @default 3
 *
 * @param WardrobeItemHeight
 * @text ワードローブ項目の高さ
 * @type number
 * @desc ワードローブウィンドウ内の各項目の高さです。
 * @default 125
 *
 * @param HelpWindowText
 * @text ヘルプウィンドウのテキスト
 * @type string
 * @desc ヘルプウィンドウに表示されるテキストです。（%1 を使うとアクター名が挿入されます）
 * @default Select the outfit you want to use for %1
 */



(() => {

    const pluginName = "MultiClothes";
    const parameters = PluginManager.parameters(pluginName);
    const settings = JSON.parse(parameters['Settings'] || '{}');
    const paramEnableMultiClothes = settings.EnableMultiClothes === "true";
    const paramHeaderDisplayMode = String(settings.HeaderDisplayMode || "name");
    const actorNameFontSize = Number(settings.ActorNameFontSize || 20);
    const currentOutfitText = String(settings.CurrentOutfitText || "Currently Using:");
    const currentOutfitFontSize = Number(settings.CurrentOutfitFontSize || 21);
    const currentOutfitPadding = Number(settings.CurrentOutfitPadding || 40);
    const selectedOutfitColorStart = String(settings.SelectedOutfitColorStart || "rgba(135, 156, 232, 0.3)");
    const selectedOutfitColorEnd = String(settings.SelectedOutfitColorEnd || "rgba(135, 156, 232, 0)");
    const wardrobeCols = Number(settings.WardrobeCols || 3);
    const wardrobeItemHeight = Number(settings.WardrobeItemHeight || 125);
    const helpWindowText = String(settings.HelpWindowText || "Select the outfit you want to use for %1");
    const addMultiClothesToMenu = JSON.parse(settings.AddMultiClothesToMenu || "false");
    const disableSwitchId = parseInt(settings.DisableSwitch || 0);
    const wardrobeMenuText = settings.WardrobeMenuText || "Wardrobe";
    const quickAccessToMenu = JSON.parse(settings.QuickAccessToMenu || "false");

    const _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _DataManager_createGameObjects.call(this);
        if ($gameSystem._multiClothesAccess === undefined) {
            $gameSystem._multiClothesAccess = paramEnableMultiClothes;
        }
        if ($gameSystem._multiClothesHeaderMode === undefined) {
            $gameSystem._multiClothesHeaderMode = paramHeaderDisplayMode;
        }
    };

    PluginManager.registerCommand(pluginName, "OpenWardrobeManager", args => {
        if (!$gameSystem._multiClothesAccess) return;
        const characterId = parseInt(args.characterID);
        if (!isNaN(characterId)) {
            SceneManager.push(Scene_Wardrobe);
            SceneManager.prepareNextScene(characterId);
        }
    });

    PluginManager.registerCommand(pluginName, "GetCurrentOutfit", args => {
        const { type, characterID, variableID } = args;
        const actor = $gameActors.actor(Number(characterID));
        if (!actor) return;
        if (actor._currentOutfitId === undefined) actor._currentOutfitId = 1;
        const outfitsData = JSON.parse(PluginManager.parameters(pluginName)['Outfits'] || '[]');
        let allOutfits = [];
        for (let data of outfitsData) {
            data = JSON.parse(data);
            if (data.characterID.toString() === characterID.toString()) {
                allOutfits = JSON.parse(data.characterOutfits || '[]').map(outfit => JSON.parse(outfit));
                break;
            }
        }
        let result = '';
        const currentOutfit = allOutfits.find(outfit => outfit.outfitID === actor._currentOutfitId.toString());
        if (type === 'name') result = currentOutfit ? currentOutfit.outfitName : "Unknown";
        else if (type === 'id') result = currentOutfit ? currentOutfit.outfitID : 0;
        $gameVariables.setValue(Number(variableID), result);
    });

    PluginManager.registerCommand(pluginName, "ForceChangeOutfit", args => {
        if (!$gameSystem._multiClothesAccess) return;
        const actorId = Number(args.characterID);
        const outfitId = Number(args.outfitID);
        const actor = $gameActors.actor(actorId);
        if (!actor) return;
        const outfitsData = JSON.parse(PluginManager.parameters(pluginName)['Outfits'] || '[]');
        const characterOutfits = outfitsData
            .filter(data => JSON.parse(data).characterID == actorId)
            .flatMap(data => JSON.parse(JSON.parse(data).characterOutfits))
            .map(outfit => JSON.parse(outfit));
        const outfitData = characterOutfits.find(outfit => outfit.outfitID == outfitId);
        if (outfitData) {
            applyOutfitChange(actor, outfitData);
        }
    });

    PluginManager.registerCommand(pluginName, "SetAccessMultiClothesScene", args => {
        if ($gameSystem) {
            $gameSystem._multiClothesAccess = (args.access === "true");
        }
    });

    PluginManager.registerCommand(pluginName, "SetHeaderDisplayMode", args => {
        if ($gameSystem) {
            $gameSystem._multiClothesHeaderMode = args.mode;
        }
    });

    function getActorCurrentOutfitData(actor) {
        if (!actor || actor._currentOutfitId === undefined) return null;
        const outfitsData = JSON.parse(PluginManager.parameters(pluginName)['Outfits'] || '[]');
        for (let data of outfitsData) {
            data = JSON.parse(data);
            if (data.characterID == actor.actorId()) {
                let characterOutfits = JSON.parse(data.characterOutfits || '[]').map(outfit => JSON.parse(outfit));
                return characterOutfits.find(outfit => outfit.outfitID == actor._currentOutfitId) || null;
            }
        }
        return null;
    }

    function applyOutfitChange(actor, newOutfitData) {
        if (!actor || !newOutfitData) return;
        const currentOutfitId = actor._currentOutfitId;
        const outfitsData = JSON.parse(PluginManager.parameters(pluginName)['Outfits'] || '[]');
        let currentOutfitData = null;
        for (let data of outfitsData) {
            data = JSON.parse(data);
            if (data.characterID == actor.actorId()) {
                let characterOutfits = JSON.parse(data.characterOutfits || '[]').map(outfit => JSON.parse(outfit));
                currentOutfitData = characterOutfits.find(outfit => outfit.outfitID == currentOutfitId);
                break;
            }
        }
        if (currentOutfitData && currentOutfitData.autoActivateSwitch) {
            let switchId = Number(currentOutfitData.autoActivateSwitch);
            let stillInUse = false;
            const members = $gameParty.members();
            for (let otherActor of members) {
                if (otherActor.actorId() !== actor.actorId()) {
                    let otherOutfit = getActorCurrentOutfitData(otherActor);
                    if (otherOutfit && Number(otherOutfit.autoActivateSwitch) === switchId) {
                        stillInUse = true;
                        break;
                    }
                }
            }
            if (!stillInUse) {
                $gameSwitches.setValue(switchId, false);
            }
        }
        actor.setCharacterImage(newOutfitData.characterFile, Number(newOutfitData.characterIndex));
        actor.setFaceImage(newOutfitData.faceFile, Number(newOutfitData.faceIndex));
        actor.setBattlerImage(newOutfitData.battlerFile);
        actor._currentOutfitId = newOutfitData.outfitID;
        if (newOutfitData.sound && JSON.parse(newOutfitData.sound).soundFile) {
            const sound = JSON.parse(newOutfitData.sound);
            AudioManager.playSe({
                name: sound.soundFile,
                pan: 0,
                pitch: Number(sound.soundPitch) || 100,
                volume: Number(sound.soundVolume) || 90
            });
        }
        if (newOutfitData.autoActivateSwitch) {
            $gameSwitches.setValue(Number(newOutfitData.autoActivateSwitch), true);
        }
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
        if (SceneManager._scene instanceof Scene_Wardrobe) {
            const wardrobeWindow = SceneManager._scene._wardrobeWindow;
            if (wardrobeWindow) {
                const index = wardrobeWindow._data.findIndex(outfit => outfit.outfitID == actor._currentOutfitId);
                if (index !== -1) {
                    wardrobeWindow.select(index);
                    wardrobeWindow.refresh();
                }
            }
        }
    };

    const originalSceneManagerPrepareNextScene = SceneManager.prepareNextScene;
    SceneManager.prepareNextScene = function (characterId) {
        if (this._scene instanceof Scene_Wardrobe || (this._nextScene && this._nextScene instanceof Scene_Wardrobe)) {
            this._nextSceneArgs = [characterId];
        } else {
            originalSceneManagerPrepareNextScene.apply(this, arguments);
        }
    };

    function Scene_Wardrobe() {
        this.initialize(...arguments);
    }

    Scene_Wardrobe.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Wardrobe.prototype.constructor = Scene_Wardrobe;

    Scene_Wardrobe.prototype.initialize = function (characterId) {
        Scene_MenuBase.prototype.initialize.call(this);
        this._actorId = characterId;
    };

    Scene_Wardrobe.prototype.prepare = function (characterId) {
        this._actorId = characterId;
    };

    Scene_Wardrobe.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this._actorId = SceneManager._nextSceneArgs[0];
        SceneManager._nextSceneArgs = null;
        const rectCurrentOutfit = this.currentOutfitWindowRect();
        this._currentOutfitWindow = new Window_CurrentOutfit(rectCurrentOutfit, this._actorId);
        this.addWindow(this._currentOutfitWindow);
        this.createWardrobeWindow();
        this.createHelpWindow();
        this.updateHelpWindow();
        this.createCharacterChangeHandlers();
        const actor = $gameActors.actor(this._actorId);
        if (actor._currentOutfitId === undefined && this._wardrobeWindow._data.length > 0) {
            actor._currentOutfitId = this._wardrobeWindow._data[0].outfitID;
        }
        this.changeActorOutfit(actor._currentOutfitId);
        const currentOutfit = this.getCurrentOutfit(actor._currentOutfitId);
        if (currentOutfit) {
            this._currentOutfitWindow.setOutfitName(currentOutfit.outfitName);
        }
        this.selectCurrentOutfit(actor._currentOutfitId);
    };

    Scene_Wardrobe.prototype.getCurrentOutfit = function (outfitId) {
        return this._wardrobeWindow._data.find(outfit => outfit.outfitID === outfitId);
    };

    Scene_Wardrobe.prototype.selectCurrentOutfit = function (outfitId) {
        const index = this._wardrobeWindow._data.findIndex(outfit => outfit.outfitID === outfitId);
        this._wardrobeWindow.select(index);
    };

    Scene_Wardrobe.prototype.createCharacterChangeHandlers = function () {
        this._characterChangeHandler = {
            pageup: this.nextCharacter.bind(this),
            pagedown: this.prevCharacter.bind(this)
        };
    };

    Scene_Wardrobe.prototype.nextCharacter = function () {
        this.changeCharacter(1);
        SoundManager.playCursor();
    };

    Scene_Wardrobe.prototype.prevCharacter = function () {
        this.changeCharacter(-1);
        SoundManager.playCursor();
    };

    Scene_Wardrobe.prototype.changeCharacter = function (direction) {
        const actors = $gameParty.members();
        const currentIndex = actors.findIndex(actor => actor.actorId() === this._actorId);
        if (currentIndex >= 0) {
            let newIndex = (currentIndex + direction + actors.length) % actors.length;
            this._actorId = actors[newIndex].actorId();
            this.refreshSceneForNewActor();
        }
        this.refreshSceneForNewActor();
    };

    Scene_Wardrobe.prototype.createCurrentOutfitWindow = function () {
        if (this._currentOutfitWindow) {
            this.removeChild(this._currentOutfitWindow);
            this._currentOutfitWindow.contents.destroy();
            this._currentOutfitWindow.destroy();
        }
        const rect = this.currentOutfitWindowRect();
        this._currentOutfitWindow = new Window_CurrentOutfit(rect, this._actorId);
        this.addWindow(this._currentOutfitWindow);
    };

    Scene_Wardrobe.prototype.refreshSceneForNewActor = function () {
        this.createCurrentOutfitWindow();
        this.createWardrobeWindow();
        this.createHelpWindow();
        this.updateHelpWindow();
        this.refreshCurrentOutfit();
        this._wardrobeWindow.activate();
        this._helpWindow.refresh();
    };

    Scene_Wardrobe.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);
        if (
            !this._wardrobeWindow.active ||
            this._wardrobeWindow.index() < 0 ||
            this._wardrobeWindow.index() >= this._wardrobeWindow.maxItems()
        ) {
            this.ensureValidSelectionInWardrobeWindow();
        }
        Object.keys(this._characterChangeHandler).forEach(key => {
            if (Input.isTriggered(key)) {
                this._characterChangeHandler[key]();
            }
        });
    };

    Scene_Wardrobe.prototype.ensureValidSelectionInWardrobeWindow = function () {
        this._wardrobeWindow.activate();
        if (this._wardrobeWindow.maxItems() > 0) {
            if (
                this._wardrobeWindow.index() < 0 ||
                this._wardrobeWindow.index() >= this._wardrobeWindow.maxItems()
            ) {
                this._wardrobeWindow.select(0);
            }
        } else {
            this._wardrobeWindow.deactivate();
        }
    };

    Scene_Wardrobe.prototype.updateHelpWindow = function () {
        const actor = $gameActors.actor(this._actorId);
        if (actor) {
            const text = helpWindowText.replace('%1', actor.name());
            this._helpWindow.setText(text);
        }
    };

    Scene_Wardrobe.prototype.refreshCurrentOutfit = function () {
        const actor = $gameActors.actor(this._actorId);
        if (actor._currentOutfitId === undefined && this._wardrobeWindow._data.length > 0) {
            actor._currentOutfitId = this._wardrobeWindow._data[0].outfitID;
        }
        const currentOutfit = this.getCurrentOutfit(actor._currentOutfitId);
        if (currentOutfit) {
            this._currentOutfitWindow.setOutfitName(currentOutfit.outfitName);
        } else {
            this._currentOutfitWindow.setOutfitName("Unknown");
        }
    };

    Scene_Wardrobe.prototype.changeActorOutfit = function (outfitId) {
        const outfit = this.getCurrentOutfit(outfitId);
        if (outfit) {
            const actor = $gameActors.actor(this._actorId);
            if (actor) {
                actor.setCharacterImage(outfit.characterFile, outfit.characterIndex);
                actor.setFaceImage(outfit.faceFile, outfit.faceIndex);
                actor.setBattlerImage(outfit.battlerFile);
                $gamePlayer.refresh();
                $gameMap.requestRefresh();
                actor._currentOutfitId = outfitId;
            }
        }
    };

    Scene_Wardrobe.prototype.createWardrobeWindow = function () {
        if (this._wardrobeWindow) {
            this.removeChild(this._wardrobeWindow);
            this._wardrobeWindow.contents.destroy();
            this._wardrobeWindow.destroy();
        }
        const rect = this.wardrobeWindowRect();
        this._wardrobeWindow = new Window_Wardrobe(rect, this._actorId);
        this._wardrobeWindow.setHandler('ok', this.onItemOk.bind(this));
        this._wardrobeWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._wardrobeWindow);
        this._wardrobeWindow.refresh();
        this._wardrobeWindow.select(0);
        const actor = $gameActors.actor(this._actorId);
        if (actor && actor._currentOutfitId !== undefined) {
            const index = this._wardrobeWindow._data.findIndex(outfit => outfit.outfitID === actor._currentOutfitId);
            this._wardrobeWindow.select(index >= 0 ? index : 0);
        } else {
            this._wardrobeWindow.select(0);
        }
        this._wardrobeWindow.activate();
    };

    Scene_Wardrobe.prototype.wardrobeWindowRect = function () {
        const ww = Graphics.boxWidth;
        const wh = Graphics.boxHeight - this.mainAreaTop() - this.helpAreaHeight() - this.currentOutfitWindowRect().height;
        const wx = 0;
        const wy = this.currentOutfitWindowRect().y + this.currentOutfitWindowRect().height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Wardrobe.prototype.onItemOk = function () {
        const outfit = this._wardrobeWindow._data[this._wardrobeWindow.index()];
        if (outfit) {
            const actor = $gameActors.actor(this._actorId);
            if (actor) {
                const isDifferentOutfit = actor._currentOutfitId !== outfit.outfitID;
                if (isDifferentOutfit && actor._currentOutfitId !== undefined) {
                    let oldOutfit = getActorCurrentOutfitData(actor);
                    if (oldOutfit && oldOutfit.autoActivateSwitch) {
                        let switchId = Number(oldOutfit.autoActivateSwitch);
                        let stillInUse = false;
                        const members = $gameParty.members();
                        for (let otherActor of members) {
                            if (otherActor.actorId() !== actor.actorId()) {
                                let otherOutfit = getActorCurrentOutfitData(otherActor);
                                if (otherOutfit && Number(otherOutfit.autoActivateSwitch) === switchId) {
                                    stillInUse = true;
                                    break;
                                }
                            }
                        }
                        if (!stillInUse) {
                            $gameSwitches.setValue(switchId, false);
                        }
                    }
                }
                actor.setCharacterImage(outfit.characterFile, outfit.characterIndex);
                actor.setFaceImage(outfit.faceFile, outfit.faceIndex);
                actor.setBattlerImage(outfit.battlerFile);
                actor._currentOutfitId = outfit.outfitID;
                if (isDifferentOutfit) {
                    if (typeof outfit.sound === 'string' && outfit.sound.trim() !== "") {
                        try {
                            outfit.sound = JSON.parse(outfit.sound);
                        } catch (e) {
                            outfit.sound = null;
                        }
                    }
                    if (outfit.sound && outfit.sound.soundFile) {
                        const sound = outfit.sound;
                        AudioManager.playSe({
                            name: sound.soundFile,
                            pan: 0,
                            pitch: parseInt(sound.soundPitch) || 100,
                            volume: parseInt(sound.soundVolume) || 90
                        });
                    }
                    if (outfit.autoActivateSwitch) {
                        $gameSwitches.setValue(Number(outfit.autoActivateSwitch), true);
                    }
                }
                $gamePlayer.refresh();
                $gameMap.requestRefresh();
            }
            this._wardrobeWindow.activate();
            this._wardrobeWindow.refresh();
            this._currentOutfitWindow.setOutfitName(outfit.outfitName);
        }
    };

    Scene_Wardrobe.prototype.currentOutfitWindowRect = function () {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth;
        const wh = 120;
        return new Rectangle(wx, wy, ww, wh);
    };

    function Window_CurrentOutfit() {
        this.initialize(...arguments);
    }

    Window_CurrentOutfit.prototype = Object.create(Window_Base.prototype);
    Window_CurrentOutfit.prototype.constructor = Window_CurrentOutfit;

    Window_CurrentOutfit.prototype.initialize = function (rect, actorId) {
        Window_Base.prototype.initialize.call(this, rect);
        this._outfitName = '';
        this._actorId = actorId;
    };

    Window_CurrentOutfit.prototype.setOutfitName = function (name) {
        this._outfitName = name;
        this.refresh();
    };

    Window_CurrentOutfit.prototype.refresh = function () {
        this.contents.clear();
        const actor = $gameActors.actor(this._actorId);
        if (!actor) return;
        const hdMode = $gameSystem._multiClothesHeaderMode || paramHeaderDisplayMode;
        let lineH = this.lineHeight();
        let margin = 10;
        if (hdMode === "face") {
            let faceBitmap = ImageManager.loadFace(actor.faceName());
            let fw = ImageManager.faceWidth;
            let fh = ImageManager.faceHeight;
            let fi = actor.faceIndex();
            let sx = (fi % 4) * fw;
            let sy = Math.floor(fi / 4) * fh;
            this.contents.blt(faceBitmap, sx, sy, fw, fh, margin, (this.contents.height - fh) / 2);
            this.contents.fontSize = actorNameFontSize;
            this.drawText(actor.name(), margin + fw + 10, (this.contents.height - lineH) / 2, 200);
        } else if (hdMode === "sprite") {
            let charBitmap = ImageManager.loadCharacter(actor.characterName());
            charBitmap.addLoadListener(() => {
                let big = ImageManager.isBigCharacter(actor.characterName());
                let w, h;
                if (big) {
                    w = charBitmap.width / 3;
                    h = charBitmap.height / 4;
                } else {
                    w = charBitmap.width / 12;
                    h = charBitmap.height / 8;
                }
                let n = actor.characterIndex();
                let colIndex = n % 4;
                let rowIndex = Math.floor(n / 4);
                let direction = 0;
                let frame = 1;
                let sx = (colIndex * 3 + frame) * w;
                let sy = (rowIndex * 4 + direction) * h;
                this.contents.blt(charBitmap, sx, sy, w, h, margin, (this.contents.height - h) / 2);
                this.contents.fontSize = actorNameFontSize;
                this.drawText(actor.name(), margin + w + 10, (this.contents.height - lineH) / 2, 200);
                if (this._outfitName) {
                    let text = currentOutfitText + " " + this._outfitName;
                    this.contents.fontSize = currentOutfitFontSize;
                    let tw = this.contents.width - currentOutfitPadding * 2;
                    let ty = (this.contents.height - this.lineHeight()) / 2;
                    this.drawText(text, currentOutfitPadding, ty, tw, 'right');
                }
            });
            return;
        } else {
            this.contents.fontSize = actorNameFontSize;
            this.drawText(actor.name(), margin, (this.contents.height - lineH) / 2, 200);
        }
        if (this._outfitName) {
            let text = currentOutfitText + " " + this._outfitName;
            this.contents.fontSize = currentOutfitFontSize;
            let tw = this.contents.width - currentOutfitPadding * 2;
            let ty = (this.contents.height - this.lineHeight()) / 2;
            this.drawText(text, currentOutfitPadding, ty, tw, 'right');
        }
    };

    function Window_Wardrobe() {
        this.initialize(...arguments);
    }

    Window_Wardrobe.prototype = Object.create(Window_Selectable.prototype);
    Window_Wardrobe.prototype.constructor = Window_Wardrobe;

    Window_Wardrobe.prototype.initialize = function (rect, actorId) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._actorId = actorId;
        this._data = [];
        this.makeItemList();
        this.setHandler('cancel', this.onCancel.bind(this));
        const actor = $gameActors.actor(this._actorId);
        this.selectCurrentOutfit(actor ? actor._currentOutfitId : null);
    };

    Window_Wardrobe.prototype.selectCurrentOutfit = function (outfitId) {
        const index = this._data.findIndex(outfit => outfit.outfitID === outfitId);
        this.select(index >= 0 ? index : 0);
    };

    Window_Wardrobe.prototype.onCancel = function () {
        SceneManager.pop();
    };

    const _Window_Wardrobe_refresh = Window_Wardrobe.prototype.refresh;
    Window_Wardrobe.prototype.refresh = function () {
        this.contents.clear();
        _Window_Wardrobe_refresh.call(this);
    };

    Window_Wardrobe.prototype.makeItemList = function () {
        const parameters = PluginManager.parameters(pluginName);
        const outfitsData = JSON.parse(parameters['Outfits'] || '[]');
        const characterOutfits = outfitsData
            .filter(data => JSON.parse(data).characterID == this._actorId)
            .flatMap(data => JSON.parse(JSON.parse(data).characterOutfits))
            .map(outfit => {
                const parsedOutfit = JSON.parse(outfit);
                if (typeof parsedOutfit.unlockSwitches === 'string') {
                    parsedOutfit.unlockSwitches = parsedOutfit.unlockSwitches ? JSON.parse(parsedOutfit.unlockSwitches) : [];
                }
                if (!parsedOutfit.outfitNameColor) {
                    parsedOutfit.outfitNameColor = null;
                }
                parsedOutfit.characterBitmap = ImageManager.loadCharacter(parsedOutfit.characterFile);
                if (parsedOutfit.customImage) {
                    parsedOutfit.customBitmap = ImageManager.loadPicture(parsedOutfit.customImage);
                }
                return parsedOutfit;
            })
            .filter(outfit => {
                if (!Array.isArray(outfit.unlockSwitches) || outfit.unlockSwitches.length === 0) {
                    return true;
                }
                return outfit.unlockSwitches.every(switchId => $gameSwitches.value(switchId));
            })
            .map((outfit, index) => {
                outfit.isImageLoaded = true;
                if (outfit.customBitmap) {
                    outfit.isImageLoaded = false;
                    outfit.customBitmap.addLoadListener(() => {
                        outfit.isImageLoaded = true;
                        this.redrawItem(index);
                    });
                }
                return outfit;
            });
        this._data = characterOutfits;
        let imagesToLoad = this._data.length;
        for (const outfit of this._data) {
            outfit.characterBitmap.addLoadListener(() => {
                imagesToLoad--;
                if (imagesToLoad === 0) {
                    this.refreshItemList();
                }
            });
        }
    };

    Window_Wardrobe.prototype.redrawItem = function (index) {
        if (index >= 0 && index < this.maxItems()) {
            this.drawItem(index);
        }
    };

    Window_Wardrobe.prototype.refreshItemList = function () {
        this.refresh();
        if (this._actorId && this._data && this._wardrobeWindow) {
            this._wardrobeWindow.refresh();
        }
    };

    Window_Wardrobe.prototype.select = function (index) {
        Window_Selectable.prototype.select.call(this, index);
    };

    Window_Wardrobe.prototype.maxItems = function () {
        return this._data.length;
    };

    Window_Wardrobe.prototype.drawItem = function (index) {
        const outfit = this._data[index];
        if (outfit) {
            const rect = this.itemRect(index);
            this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
            const actor = $gameActors.actor(this._actorId);
            if (actor && actor._currentOutfitId === outfit.outfitID) {
                this.drawSelectedOutfitBackground(rect);
            }
            if (outfit.customBitmap && outfit.isImageLoaded) {
                const alignment = outfit.customImageAlignment || 'left';
                const offsetX = Number(outfit.customImageOffsetX || 0);
                const offsetY = Number(outfit.customImageOffsetY || 0);
                const customWidth = Number(outfit.customImageWidth || 0);
                const customHeight = Number(outfit.customImageHeight || 0);
                const customOpacity = Number(outfit.customImageOpacity || 255);
                const bitmapWidth = outfit.customBitmap.width;
                const bitmapHeight = outfit.customBitmap.height;
                let drawWidth = 0;
                let drawHeight = 0;
                if (customWidth === 0 || customHeight === 0) {
                    let scale = 1;
                    const maxWidth = rect.width - 8;
                    const maxHeight = this.itemHeight() - 8;
                    if (bitmapWidth > maxWidth || bitmapHeight > maxHeight) {
                        const scaleX = maxWidth / bitmapWidth;
                        const scaleY = maxHeight / bitmapHeight;
                        scale = Math.min(scaleX, scaleY);
                    }
                    drawWidth = bitmapWidth * scale;
                    drawHeight = bitmapHeight * scale;
                } else {
                    drawWidth = customWidth;
                    drawHeight = customHeight;
                }
                let dx = rect.x + 8;
                if (alignment === 'center') {
                    dx = rect.x + (rect.width - drawWidth) / 2;
                } else if (alignment === 'right') {
                    dx = rect.x + rect.width - drawWidth - 8;
                }
                dx += offsetX;
                let dy = rect.y + (this.itemHeight() - drawHeight) / 2 + offsetY;
                this.contents.paintOpacity = customOpacity;
                this.contents.blt(
                    outfit.customBitmap,
                    0,
                    0,
                    bitmapWidth,
                    bitmapHeight,
                    dx,
                    dy,
                    drawWidth,
                    drawHeight
                );
                this.contents.paintOpacity = 255;
            } else {
                let big = ImageManager.isBigCharacter(outfit.characterFile);
                let w, h;
                if (big) {
                    w = outfit.characterBitmap.width / 3;
                    h = outfit.characterBitmap.height / 4;
                } else {
                    w = outfit.characterBitmap.width / 12;
                    h = outfit.characterBitmap.height / 8;
                }
                let n = outfit.characterIndex;
                let colIndex = n % 4;
                let rowIndex = Math.floor(n / 4);
                let direction = 0;
                let frame = 1;
                let sx = (colIndex * 3 + frame) * w;
                let sy = (rowIndex * 4 + direction) * h;
                let dx = rect.x + 8;
                let dy = rect.y + (this.itemHeight() - h) / 2;
                this.contents.blt(
                    outfit.characterBitmap,
                    sx,
                    sy,
                    w,
                    h,
                    dx,
                    dy
                );
            }
            this.drawOutfitName(outfit, rect);
        }
    };

    Window_Wardrobe.prototype.drawSelectedOutfitBackground = function (rect) {
        const context = this.contents.context;
        context.save();
        const gradient = context.createLinearGradient(rect.x, rect.y, rect.x, rect.y + rect.height);
        gradient.addColorStop(0, selectedOutfitColorStart);
        gradient.addColorStop(1, selectedOutfitColorEnd);
        context.fillStyle = gradient;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
    };

    Window_Wardrobe.prototype.drawOutfitName = function (outfit, rect) {
        this.contents.fontSize = 23;
        const textHeight = this.contents.fontSize;
        const offsetX = Number(outfit.outfitNameOffsetX || 0);
        const textY = rect.y + (this.itemHeight() - textHeight) / 2;
        if (outfit.outfitNameColor) {
            this.changeTextColor(outfit.outfitNameColor);
        }
        this.drawText(outfit.outfitName, rect.x + 60 + offsetX, textY, rect.width - 60 - offsetX);
        if (outfit.outfitNameColor) {
            this.resetTextColor();
        }
    };

    Window_Wardrobe.prototype.maxCols = function () {
        return wardrobeCols;
    };

    Window_Wardrobe.prototype.itemHeight = function () {
        return wardrobeItemHeight;
    };

    Window_Wardrobe.prototype.itemWidth = function () {
        return Math.floor((this.width - this.padding * 2) / this.maxCols());
    };

    function Window_Help() {
        this.initialize(...arguments);
    }

    Window_Help.prototype = Object.create(Window_Base.prototype);
    Window_Help.prototype.constructor = Window_Help;

    Window_Help.prototype.initialize = function (rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._text = '';
    };

    Window_Help.prototype.setText = function (text) {
        if (this._text !== text) {
            this._text = text;
            this.refresh();
        }
    };

    Window_Help.prototype.textPadding = function () {
        return 6;
    };

    Window_Help.prototype.refresh = function () {
        this.contents.clear();
        this.contents.fontSize = $gameSystem.mainFontSize();
        const textState = this.createTextState(this._text, 0, 0, this.contents.width);
        const textHeight = this.calcTextHeight(textState, false);
        const y = Math.max(0, (this.innerHeight - textHeight) / 2);
        this.drawTextEx(this._text, this.textPadding(), y, this.contents.width - this.textPadding() * 2);
    };

    if (addMultiClothesToMenu) {
        const _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
        Window_MenuCommand.prototype.addMainCommands = function () {
            _Window_MenuCommand_addMainCommands.call(this);
            if (!disableSwitchId || !$gameSwitches.value(disableSwitchId)) {
                this.addCommand(wardrobeMenuText, 'wardrobe', $gameSystem._multiClothesAccess);
            }
        };

        const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function () {
            _Scene_Menu_createCommandWindow.call(this);
            this._commandWindow.setHandler('wardrobe', this.commandWardrobe.bind(this));
        };

        Scene_Menu.prototype.commandWardrobe = function () {
            if (!$gameSystem._multiClothesAccess) {
                this.popScene();
                return;
            }
            if (quickAccessToMenu) {
                const firstActor = $gameParty.members()[0];
                if (firstActor) {
                    SceneManager.push(Scene_Wardrobe);
                    SceneManager.prepareNextScene(firstActor.actorId());
                }
            } else {
                this.commandPersonal();
            }
        };

        const originalSceneMenuOnPersonalOk = Scene_Menu.prototype.onPersonalOk;
        Scene_Menu.prototype.onPersonalOk = function () {
            const symbol = this._commandWindow.currentSymbol();
            if (symbol === 'wardrobe') {
                if (!$gameSystem._multiClothesAccess) {
                    this.popScene();
                    return;
                }
                if (quickAccessToMenu) {
                    this.commandWardrobe();
                } else {
                    const partyMembers = $gameParty.members();
                    if (partyMembers.length === 1) {
                        SceneManager.push(Scene_Wardrobe);
                        SceneManager.prepareNextScene(partyMembers[0].actorId());
                    } else {
                        const actorIndex = this._statusWindow.index();
                        const selectedActor = partyMembers[actorIndex];
                        if (selectedActor) {
                            SceneManager.push(Scene_Wardrobe);
                            SceneManager.prepareNextScene(selectedActor.actorId());
                        }
                    }
                }
            } else {
                originalSceneMenuOnPersonalOk.call(this);
            }
        };
    }
})();
