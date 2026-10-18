# Expedition 33 - Any% Glitchless Story (Critical Moment)
- [English Guide](https://docs.google.com/document/u/1/d/e/2PACX-1vQH1QZlqpVW4IqMhPRxq7dLSYNCnu2DQdkSBazySIH8kPsRGQfMU96gpLnEet4E1GQQJ2oA2zTTRYmM/pub)

## ルミエール

:::skip
count: 2
:::

:::encounter
title: マエル戦
turns:
  - actions:
    - character: ギュスターヴ
      action: 攻撃
      note: クリティカルだったら次のエイム飛ばせる
  - actions:
    - character: ギュスターヴ
      action: エイム3発（or ヘッドショット＋エイム）-> 攻撃
note: |
  マエルの攻撃は全部パリィ
:::

:::skip
count: 1
:::

- 港へ
- テキスト -> Yes[1]

:::skip
count: 3
:::

- アレクサンドルと会話
- マエルと会話 -> No[2]

:::skip
count: 1
:::

- エマと会話 -> Yes[1]

:::skip
count: 1
loading: true
:::

## 春の牧草地

:::skip
count: 3
:::

ランセリエ戦へ

- 道中でクロマエリクサー

:::when
ランセリエ戦
:::

:::skip
count: 1
:::

:::encounter
title: ランセリエ
turns:
  - actions:
    - character: ギュスターヴ
      action: エイム（弱点含む2発） -> スキップ
      note: 弱点逃したら3発 > 攻撃
    - character: ランセリエ
      action: 攻撃 （パリィ）
:::

:::skip
count: 1
:::

先へ進む

:::when
ルネと合流
:::

:::skip
count: 1
:::

:::encounter
title: ポルティエ
turns:
  - actions:
    - character: ギュスターヴ
      action: エイム（ヘッドショット含む2発）-> 攻撃 
    - character: ルネ
      action: アイスランス
:::

:::skip
count: 1
:::

- 入手 `回避巧者`
- 入手 `クリティカルバーン`

:::when
ヴォレステ戦
:::

:::skip
count: 1
:::

:::encounter
title: ヴォレステ
turns:
  - actions:
    - character: ヴォレステ
      action: パリィ
    - character: ヴォレステ
      action: パリィ
    - character: ギュスターヴ
      action: エイム4発（ヘッドショット含む）
:::

:::when
遠征隊ジャーナルムービーin
:::

:::menu
actions:
  - kind: formation
    note: |
      - ギュスターブ Out, In
  - kind: pictos
    items:
      - character: gustave
        note: |
          `クリティカルバーン` [1] (`AA`)
      - character: lune
        note: |
          `回避巧者` [1] (`<AA`)
:::

:::skip
count: 2
:::

イヴェキ戦へ進む

- 入手 `死のエネルギーII`
- 入手 `ルミナのカラー`

:::when
イヴェキ戦前
:::

- 特性
  - ギュスターヴ
    - 攻撃力全振り (6)
  - ルネ
    - 攻撃力全振り (6)
- スキル
  - パワフル  

:::menu
actions:
  - character: gustave
    kind: pictos
    note: 死のエネルギーII (`<AA`)
:::

:::formation
members: [lune, gustave]
:::

:::equip
gustave:
  weapon: ノアルアム（デフォルト）
  pictos: [クリティカルバーン, 死のエネルギーII]
  skills: [ルミエール・アサルト, オーバーチャージ, パワフル]
lune:
  weapon: ルネイム（デフォルト）
  pictos: [回避巧者]
  skills: [イモレーション, アイスランス]
:::

:::encounter
title: イヴェキ
note: 全部パリィ
turns:
  - actions:
    - character: ルネ
      action: 盾削ってイモレーション
    - character: ギュスターヴ
      action: パワフル
  - actions:
    - character: ルネ
      action: イモレーション
    - character: ギュスターヴ
      action: ルミエール・アサルト
  - actions:
    - character: ルネ
      action: APティント（ギュスターヴの AP 足りなければ）/ アイスランス / 攻撃
      note: HP残り3/8くらいを目指す
    - character: ギュスターヴ
      action: オーバーチャージ
  - note: オーバーチャージでクリティカル出ないと倒せない。残ったら、頑張って削って倒す
:::

:::status
lune:
  lv: 4
gustave:
  lv: 4
:::

ワールドマップ

- 浮遊する水前でキャンプ

:::skip
count: 1
:::

- 浮遊する水へ

## 浮遊する水

:::when
エリアinムービー
:::

:::menu
actions:
  - character: gustave
    items:
      - kind: skill
        note: ルミエール・アサルト解除
      - kind: pictos
        note: 外す, 外す, 回避巧者 [3, 上書き]
  - character: lune
    kind: weapon
    note: ライトイム（間に合わなかったら屋敷前でも可）
:::

- 屋敷まで進む

:::when
屋敷in
:::

:::skip
count: 1
loading: true
:::

:::skip
count: 1
:::

マエルの部屋へ

:::when
マエル合流
:::

:::menu
actions:
  - character: maelle
    items:
      - kind: pictos
        note: |
          - クリティカルバーン (`<AA`)
          - 死のエネルギーII (`<vAA`)
:::

:::when
キュレーター戦前
:::

- 特性
  - ギュスターヴ
    - 素早さ1
    - 攻撃力残（11）
  - マエル
    - 攻撃力全（15）
  - ルネ
    - 素早さ全 - 1 (5)
- スキル
  - ギュスターヴ
    - マーキングショット
  - マエル
    - スウィフト・ストライド

:::encounter
title: キュレーター
turns:
  - actions:
    - character: ルネ
      action: APティント > マエル
    - character: ギュスターヴ
      action: マーキング・ショット
    - character: マエル
      action: ペルセ
  - note: 残ったら反撃で終わり
:::

- 屋敷から出る

:::skip
count: 1
:::

- 進む

:::when
ゴブルムービー前
:::

:::menu
actions:
  - character: maelle
    note: |
      スキル解除
      - オフェンス・スイッチ
      - スパーク
:::

:::encounter
title: ゴブル
note: クリティカル見ておくこと
turns:
  - note: 回避する
  - actions:
      - character: ルネ
        action: イモレーション
      - character: ギュスターヴ
        action: パワフル
      - character: マエル
        action: スウィフト・ストライド
  - note: ここも回避
  - actions:
      - character: ルネ
        action: アイスランス
      - character: ギュスターヴ
        action: マーキング・ショット
      - character: マエル
        action: ペルセ
    note: ペルセがクリティカルだったら以降も回避
  - actions:
      - character: ルネ
        action: イモレーション
      - character: ギュスターヴ
        action: オーバーチャージ
      - character: マエル
        action: スウィフト・ストライド
  - actions:
      - character: ルネ
        action: 攻撃
        note: ペルセでクリティカルが出た or 他のクリティカルで100ダメージ以上増えてるならスキップ
      - character: ギュスターヴ
        action: マーキング・ショット
      - character: マエル
        action: ペルセ
:::

:::skip
count: 1
:::

- ワールドマップへ

:::skip
count: 1
:::

キャンプ

- 武器強化
  - マエルウム +2 -> Lv4
- 焚火 -> 眠る[2]

ワールドマップ

- いにしえの聖域へ

## いにしえの聖域

:::skip
count: 1
:::

:::encounter
title: ロバスト・サカパタト
turns:
  - note: 盾攻撃はパリィ、他は回避
  - actions:
    - character: ルネ
      action: イモレーション（盾あるときはミス）
    - character: ギュスターヴ
      action: スキップ
    - character: マエル
      action: スウィフト・ストライド（盾あるときはミス）
  - actions:
    - character: ルネ
      action: スキップ
    - character: ギュスターヴ
      action: マーキング・ショット
    - character: マエル
      action: ペルセ
  - note: 回避でOK
:::

:::skip
count: 1
:::

進む

:::when
アルティメット・サカパタト前
:::

:::menu
actions:
  - character: gustave
    items:
      - kind: weapon
        note: サカルアム (`vA`)
      - kind: lumina
        note: クリティカルバーン, 死のエネルギーII (`A>A`)
  - character: lune
    kind: lumina
    note: 回避巧者, 死のエネルギーII (R3 A>A)
  - character: maelle
    kind: lumina
    note: 回避巧者（任意）
:::

:::encounter
title: アルティメット・サカパタト
note: |
  - 体力調整に注意
  - 削り過ぎるとガード貼られてしまうので、クリティカルで倒せる範囲で抑える
turns:
  - note: 最初の叩きつけ攻撃だけ回避、他はパリィ
  - actions:
    - character: ルネ
      action: イモレーション
    - character: ギュスターヴ
      action: パワフル
    - character: マエル
      action: スウィフト・ストライド
  - note: |
      - ジャンプカウンター攻撃を食らう
      - パリィ
  - actions:
    - character: ルネ
      action: エイムで盾破壊, スキップ or イモレーション or 通常攻撃
      note: sakapatate の最初の T にゲージが乗るくらいを目安
    - character: ギュスターヴ
      action: マーキング・ショット
    - character: マエル
      action: ペルセ
    note: クリティカル出たら倒せる
  - actions:
    - character: ルネ
      action: AP ティント > マエル or スキップ
    - character: ギュスターヴ
      action: マーキング・ショット
    - character: マエル
      action: ペルセ
:::

ワールドマップ、ジェストラルの村へ

## ジェストラルの村

旗（入り口）、強化

- 特性
  - マエル
    - 攻撃力全振り（30）
- スキル
  - マエル
    - （デガジュマン, ）レイン・オブ・ファイア（手動での装備不要）

ゴルグラと会話（アリーナへ連れていってもらう）

トーナメントへ、マエルで参加

:::encounter
title: トーナメント（通常、全戦共通）
note: パリィ、レイン・オブ・ファイア、パリィ
:::

:::encounter
title: トーナメント（回避巧者あり）
note: |
    回避、レイン・オブ・ファイア、パリィ
    残ったら以下

    - クリティカルなし: 射撃で削って攻撃
    - クリティカルあり: 攻撃 or 削り切れそうなら射撃
:::

:::skip
count: 1
:::

:::encounter
title: 4戦目（シエル）
note: パリィ、レイン・オブ・ファイア
:::

:::skip
count: 2
:::

ゴルグラと会話

店

- 洗練されたクロマカタリストx2
- 土壇場

ワールドマップへ

:::skip
count: 1
:::

キャンプ、休息[2]

:::skip
count: 1
:::

エスキエの隠れ家へ

## エスキエの隠れ家

旗（入り口）、強化

- 特性
  - ギュスターヴ
    - 素早さ6 (1 -> 7)
    - 攻撃力残り（11 -> 26）
  - マエル
    - 攻撃力全振り（33）
  - シエル
    - 攻撃力全振り（45）
- スキル
  - シエル
    - （下へ）フォーチュン・フューリー、左上に装備（`AA`）

:::menu
actions:
  - kind: formation
    note: ルネ out, シエル in
  - character: maelle
    items:
      - kind: weapon
        note: メダルウム
      - kind: pictos
        note: 回避巧者[3] (`<vvAAA`)
  - character: gustave
    items: 
      - kind: pictos
        note: 土壇場[1]（`v<AA`）
:::

エスキエの元へ進む

:::skip
count: 1
:::

:::when
フランソワムービー
:::

:::menu
actions:
  - character: maelle
    kind: skill
    note: オフェンス・スイッチ > 左上（`<AA`）
  - character: sciel
    kind: skill
    note: ファイアリング・シャドウ > 左下（`AvvA`）
:::

:::encounter
title: フランソワ
turns:
  - note: 回避
  - actions:
    - character: ギュスターヴ
      action: エイム（1～2発）, マーキング・ショット
    - character: マエル
      action: エイム（盾はがすまで）, ペルセ
:::

:::when
エスキエムービーin
:::

:::menu
actions:
  - character: maelle
    items:
      - kind: pictos
        note: 2,3 解除、強化先制攻撃[3] (`vYvY AA`)
      - kind: lumina
        note: 死のエネルギーII (`>>A`)
  - character: sciel
    items:
      - kind: lumina
        note: クリティカルバーン, 死のエネルギーII (`A>A`)
      - kind: skill
        note: フォーカス・フォーテル > 右上 (`<A >A`)
:::

向かって左手、旗（フランソワの洞窟）へ、ファストトラベル（入り口）

ワールドマップへ

エスキエ解放メッセージ後、すぐキャンプへ

:::skip
count: 1
:::

- 武器強化
  - マエル, メダリウムいけるところまで（Lv7 or Lv8 or Lv9）
- 焚火 -> 眠る[1]

:::skip
count: 1
:::

:::note
↓忘れない！！！
:::

- エナジャイズスタートI（岩波の崖向かって左側、海辺沿い）
- クロマ1305 （岩波の崖道中、坂道左手のキャンプ跡地）

:::note
↑忘れない！！！
:::

## 岩波の崖

:::when
ムービーin
:::

:::menu
actions:
  - character: sciel
    items:
      - kind: pictos
        note: |
          - ブレイカー[1]
          - エナジャイズスタートI[2]
      - kind: skill
        note: ハーベストを右下へ
:::

道中回収

- クロマx790
- デラルアム

入手後のジャンプでメニュー、デラルアム装備 

- 先制攻撃

:::when
先制攻撃入手直後
:::

:::menu
actions:
  - character: maelle
    kind: pictos
    note: 先制攻撃[2]（`<<AA`） 
:::

:::encounter
title: リーパー・キュルティストほか
note: |
  オーブを撃たないこと

  - 射撃 左3 右2
  - レイン・オブ・ファイア
:::

- シャティオン
- 緊急強化
- クロマx790
- ルミナのカラー

:::when
ランプマスター前
:::

:::menu
actions:
  - character: gustave
    kind: pictos
    note: 緊急強化[2] (`vAvA`)
  - character: sciel
    kind: weapon
    note: シャティオン (`vA`)
:::

:::note
攻撃パターンによってAP状況や残りHPが変わるので、めっちゃ練習した方が良い
:::

:::encounter
title: ランプマスター第一形態
turns:
  - actions:
    - character: マエル
      action: レイン・オブ・ファイア
  - note: マエルが1度でもパリィしている必要あり。なければ全員攻撃で一周回す
  - actions:
    - character: ギュスターヴ
      action: パワフル
    - character: マエル
      action: スウィフト・ストライド
    - character: シエル
      action: フォーチュン・フューリー > マエル
  - actions:
    - character: ギュスターヴ
      action: オーバーチャージ
:::

:::encounter
title: ランプマスター第二形態
turns:
  - actions:
    - character: ギュスターヴ
      action: （第一形態で行動していなければ）マーキング・ショット
    - character: マエル
      action: レイン・オブ・ファイア
    - character: シエル
      action: |
        マエルの AP が少ないなら、APティント
        十分あるなら、フォーチュン・フューリー or 通常攻撃
  - actions:
    - character: ギュスターヴ
      action: オーバーチャージかマーキング・ショット
    - character: マエル
      action: ペルセかレイン・オブ・ファイア
    - character: シエル
      action: APティント or 攻撃などなど
  - note: ダメージ足らない場合、傷跡＋ペルセを狙っていくのが安定っぽい
:::

:::skip
count: 1
loading: true
:::

ACT 2

:::skip
count: 2
:::

キャンプ

- 眠る[1]

:::skip
count: 1
:::

:::note
安定しないうちは、ロードしておくことでメニュー位置がズレるのを防ぐ

ワールドマップ出たらキャンプ → Debug Load（Alt+V）
:::

## 忘れ去られた戦場

:::when
エリアin
:::

:::skip
count: 1
:::

:::encounter
title: シャリエ
turns:
  - note: |
      - ルネに攻撃 > 回避
      - ヴェルソに攻撃 > ダメージ受ける（1撃目がクリティカルなら2撃目を回避）
      - マエルに攻撃 > パリィ
  - note: |
      - マエルでカウンターしてたら攻撃
      - それ以外ならレイン・オブ・ファイア
:::

店

- インバーテッドアフィニティ

:::when
入手後のジャンプ
:::

:::menu
actions:
  - kind: formation
    note: ルネ out, マエル out,
  - character: verso
    kind: weapon
    note: デラルアム
:::

旗（古い橋）

強化

- 特性
  - ルネ
    - 素早さ全振り (33)
  - ヴェルソ
    - 素早さ1
    - 攻撃力残り (44)
  - マエル
    - 攻撃力全振り (45)
- スキル
  - ヴェルソ
    - （マーキングショット, クイックストライク, ）パワフル, ベルセルク・スラッシュ, ディファイアント・ストライク
    - 左下にディファイアント・ストライク
    - 左中にベルセルク・スラッシュ

:::when
デュアリステ前
:::

:::menu
actions:
  - character: verso
    items:
      - kind: pictos
        note: |
          - インバーテッドアフィニティ[3] (`<AA`)
          - 先制攻撃 > 土壇場[1, 上書き] (`vAvAA`)
      - kind: lumina
        note: 土壇場 （`^A`） 
:::

:::encounter
title: デュアリステ第一形態
note: |
  - 基本パリィ
turns:
  - note: ディファイアント・ストライク
  - note: |
      - 基本はベルセルク・スラッシュ 
      - AP3 の場合はディファイアント・ストライク
      - 残りHP次第でディファイアント・ストライクにしてもよい
:::

:::encounter
title: デュアリステ第二形態
turns:
  - note: |
      ジャンプカウンターのダメージで分岐。
      - 刻印ありでクリティカルが出たら、なにもしない
      - 刻印ありでクリティカルなし、もしくは刻印なしでクリティカルが出たら、全体攻撃をパリィカウンター
      - いずれでもなければ、単体攻撃をパリィカウンター
  - note: （射撃で削り or ランク上げ）ベルセルク・スラッシュ
:::

:::when
ムービーin
:::

:::menu
actions:
  - kind: formation
    note: シエルin, ヴェルソout-in, マエルin 
  - character: maelle
    kind: pictos
    note: 瀬戸際[2] (`<AA`)
  - character: sciel
    kind: pictos
    note: コンボ攻撃I[3] (`vAA`)
  - kind: lumina
    items:
      - character: sciel
        note: 先制攻撃
      - character: lune
        note: 先制攻撃  
      - character: maelle
        note: 先制攻撃  
:::

ワールドマップへ

:::skip
count: 1
:::

キャンプ

焚火 -> 眠る[2]

:::skip
count: 1
:::

ワールドマップ、モノコの駅へ

:::note
忘れない！
:::

モノコの駅方向すぐ右手側、キャンプ跡地に `ルミナのカラー`

## モノコの駅

:::encounter
title: モノコ
turns:
  - actions:
    - character: シエル
      action: ヒールティント > ヴェルソ
    - character: ヴェルソ
      action: ベルセルク・スラッシュ
    - character: マエル
      action: レイン・オブ・ファイア
  - note: 回避（ヴェルソでクリティカルなければパリィ）
  - actions:
    - character: シエル
      action: エネルギーティント > ヴェルソ（ヴェルソがAP3以上あればスキップ）
    - character: ヴェルソ
      action: ベルセルク・スラッシュ
:::

:::when
スタラクト前
:::

:::menu
actions:
  - kind: formation
    note: シエルout-in
:::

:::skip
count: 1
:::

:::encounter
title: スタラクト
turns:
  - note: グラディエントアタック, ベルセルク・スラッシュ
:::

:::skip
count: 2
:::

ワールドマップ、旧ルミエールへ

## 旧ルミエール

店

- 洗練されたクロマカタリストx4 (-> x15)
- ルミナのカラーx3 (-> x7)

:::when
パーティ分割ムービーin
:::

:::menu
actions:
  - kind: pictos
    character: verso
    note: コンボ攻撃I[1] > 先制攻撃[上書き]（`<<AAA`）
  - kind: lumina
    items:
      - character: verso
        note: 死のエネルギー2out, 先制攻撃in (`vAvA`)
      - character: monoco
        note: 先制攻撃（`R3, >A`）
:::

進む

:::when
ルネパーティ終了時
:::

:::menu
actions:
  - kind: pictos
    character: sciel
    note: 土壇場[2] > エナジャイズスタートI（`vAvA`）
:::

:::skip
count: 2
:::

:::when
マエル部隊最初のジャンプ
:::

:::menu
actions:
  - kind: pictos
    character: maelle
    note: クリティカルバーン解除[1]
:::

:::note
- リコートが一つもない場合、道中左手のクロマ（`2,495`）を取る
:::

:::encounter
title: シュヴァリエ2体
turns:
  - note: |
      - メダリウム Lv9 なら、ペルセ / ディファイアント・ストライク
      - メダリウム Lv8 なら、レイン・オブ・ファイア / ディファイアント・ストライク
:::

:::skip
count: 1
:::

- 入手 `自動加速`

:::when
ルノアール戦ムービー前（植木3つ目の奥側に判定）
:::

:::menu
actions:
  - kind: pictos
    note: 自動加速 > クリティカルバーン[1] (`AA`)
  - kind: lumina
    note: インバーテッドアフィニティ (`(L3)R3 >A`)
:::

:::encounter
title: ルノアール戦1
turns:
  - actions:
    - character: マエル
      action: レイン・オブ・ファイア
    - character: ルネ
      action: ヒールティント > ヴェルソ
    - character: ヴェルソ
      action: ベルセルク・スラッシュ 
  - actions:
    - character: マエル
      action: オフェンス・スイッチ
    - character: ルネ
      action: エネルギーティント > ヴェルソ
    - character: ヴェルソ
      action: ベルセルク・スラッシュ 
:::

:::skip
count: 1
loading: true
:::

:::skip
count: 1
:::

キャンプ

- 武器強化
  - シエル: シャティオン Lv9
  - ヴェルソ: デラルアム Lv9
  - マエル: メダリアム Lv9
- 資源強化
  - ルミナ > シエル全振り
  - ヒールティント
- 焚火 -> 眠る[2]

ワールドマップ、ヴィサージュへ

## ヴィサージュ

進む

:::when
ムービーin
:::

:::menu
actions:
  - kind: formation
    note: |
      - ルネout, シエルin, マエルout-in
  - character: maelle
    items:
      - kind: pictos
        note: |
          - 先制攻撃[1] > 自動加速[上書き]（`<vvAA`）
      - kind: lumina
        note: 緊急強化, 土壇場, クリティカルバーン（`R3, AvvA>A`）
  - character: sciel
    items:  
      - kind: lumina
        note: インバーテッドアフィニティ (`>A`)
      - kind: pictos
        note: 自動加速[3]（`<<AA`）
:::

リコート持っていなければリコートを買う

ヴィサージュへ

旗（ヴィサージュ前）強化

- 特性
  - マエル
    - 攻撃力7 (-> 52)
    - 素早さ全 -2 (-> 12)
  - ヴェルソ
    - リコート
    - 攻撃力14
    - 残り素早さ（-> 52）
  -  シエル
     - 素早さ9 
     - 攻撃力残り(-> 54)
- スキル
  - ヴェルソ
    - リーダーシップ, 左上
  - シエル
    - 自己犠牲, 左中

:::when
ヴィサージュ戦前
:::

:::encounter
title: ヴィサージュ
turns:
  - actions:
    - character: ヴェルソ
      action: エネルギーティント > シエル
    - character: シエル
      action: 自己犠牲
    - character: マエル
      action: レイン・オブ・ファイア
  - actions:
    - character: ヴェルソ
      action: ディファイアント・ストライク
    - character: シエル
      action: フォーチュン・フューリー > シエル
  - note: パリィ
:::

:::skip
count: 1
:::

:::encounter
title: 仮面の守護者
turns:
  - actions:
    - character: マエル
      action: レイン・オブ・ファイア（QTE失敗）
    - character: ヴェルソ
      action: ベルセルク・スラッシュ
    - character: シエル
      action: エイム > グラディエントスキル > 攻撃
:::

:::skip
count: 1
loading: true
:::

:::skip
count: 1
:::

キャンプ、眠る[2]

シレーヌへ

## シレーヌ

:::when
ムービーin
:::

:::menu
actions:
  - character: maelle
    items:
      - kind: pictos
        note: |
          - ブレイカー[2] > 瀬戸際[上書き]（`v<<v AAA`）
      - kind: lumina
        note: 緊急強化out, エナジャイズスタートIin, 死のエネルギーIIout, 瀬戸際in（`R3 AvA>>AvvA`）
  - character: verso
    items:
      - kind: lumina
        note: エナジャイズスタートIin, 回避巧者in（`vA>A`）
  - character: sciel
    items:
      - kind: lumina
        note: エナジャイズスタートIin, 瀬戸際in（`vA ^^A`）  
      - kind: pictos
        note: 完全無欠（`AA`）
:::

旗

強化

- シエル
  - 素早さ全 (-> 21)
- マエル
  - 素早さ全-3 (-> 20)
- ヴェルソ
  - 攻撃力全振り (26)

:::encounter
title: グリッサンド
turns:
  - actions:
    - character: ヴェルソ
      action: リーダーシップ
    - character: シエル
      action: 自己犠牲
    - character: マエル
      action: レイン・オブ・ファイア
  - note: パリィ
  - actions:
    - character: シエル
      action: フォーチュン・フューリー > シエル
    - character: ヴェルソ
      action: ディファイアント・ストライク
    - character: マエル
      action: オフェンス・スイッチ
  - note: 基本パリィ, 一回目の攻撃がバレエだったら回避
  - actions:
    - character: シエル
      action: グラデエント・スキル > ファイアリング・シャドウ（フォーテルカウンターとHP0の間2/3以降まで削れていたら、攻撃でも可）
:::

:::when
シレーヌ前
:::

:::menu
actions:
  - character: maelle
    items:
      - kind: pictos
        note: 自動加速 > ブレイカー (2, 入れ替え `<A vAY`)
      - kind: lumina
        note: 回避巧者 (`R3, >vA`)
:::

:::encounter
title: シレーヌ
turns:
  - actions:
    - character: ヴェルソ
      action: パワフル
    - character: シエル
      action: フォーチュン・フューリー > シエル
    - character: マエル
      action: レイン・オブ・ファイア
  - actions:
    - character: マエル
      action: レイン・オブ・ファイア
    - character: ヴェルソ
      action: ヴェルセルク・スラッシュ
    - character: シエル
      action: グラデエント・スキル > ファイアリング・シャドウ
  - note: 倒せなかったらジャンプカウンターだけやる、他は回避
:::

:::skip
count: 1
loading: true
:::

:::skip
count: 1
:::

キャンプ、寝る[2]

:::skip
count: 1
loading: true
:::

モノリスへ

:::skip
count: 1
loading: true
:::

## モノリス

:::skip
count: 1
:::

:::when
ペイントレス前までに
:::

:::menu
actions:
  - kind: formation
    note: マエルout, モノコin, シエルout-in, ヴェルソout
:::

:::when
ペイントレス（モノリス）前
:::

:::menu
actions:
  - character: sciel
    items:
      - kind: pictos
        note: |
          - スロット2,3 解除
          - エナジャイズターン [3] (`AA`)
      - kind: lumina
        note: エナジャイズスタートIout, クリティカルバーンout, 自動加速in  (`<A R3 ^^AvA`)
:::

:::encounter
title: ペイントレス（モノリス）
turns:
  - note: ヒールティント > シエル, ハーベスト（失敗）
  - note: あとはスキップ
:::

:::skip
count: 1
loading: true
:::

## モノリス内部

:::when
道中ジャンプで
:::

:::menu
actions:
  - kind: formation
    note: |
      - モノコout, マエルin
      - シエルout-in, ヴェルソin
:::

道中で回収 「弱点の恩恵」

電車に乗る

:::skip
count: 1
:::

旗（汚れたルミエール）

強化

- 特性
  - シエル
    - 素早さ全振り (30)
- スキル
  - シエル
    - (ファントム・ブレイド,) シールド・フェイト > 左下

:::note
リコート持っていなければ回収する
広場左手2つめの路地塞がってるとこ
:::

:::when
ルノワール前
:::

:::menu
actions:
  - character: sciel
    items:
      - kind: weapon
        note: ティスルオン（`^A`）
      - kind: pictos
        note: 弱点の恩恵 > エナジャイズスタートI [2] (`<<AA`)
:::

:::encounter
title: ルノワール2戦目
turns:
  - actions:
    - character: マエル
      action: レイン・オブ・ファイア
    - character: シエル
      action: 自己犠牲
    - character: ヴェルソ
      action: リーダーシップ
    - character: シエル
      action: フォーチュン・フューリー > シエル
  - actions:
    - character: マエル
      action: オフェンス・スイッチ
    - character: ヴェルソ
      action: ディファイアント・ストライク
    - character: シエル
      action: グラディエントスキル > シールド・フェイト
:::

:::when
ペイントレス前
:::

:::menu
actions:
  - character: sciel
    kind: lumina
    note: 自動加速out, クリティカルバーン, 回避巧者, 土壇場（`R3 ^^>A^A^Av<A`）
:::

:::encounter
title: ペイントレス第一形態
turns:
  - actions:
    - character: マエル
      action: レイン・オブ・ファイア
    - character: シエル
      action: フォーカス・フォーテル
    - character: ヴェルソ
      action: ディファイアント・ストライク
  - note: パリィ, ラストだけ回避。ヴェルソに1APも入らなかったらバックアップ（後述）へ
  - actions:
    - character: シエル
      action: フォーチュン・フューリー
    - character: マエル
      action: オフェンス・スイッチ
  - note: |
      グラディエントカウンター。AP状況を確認する
      - ヴェルソ3, マエル4以上 -> シエルで倒し切り
      - 上記未満 -> シエルのQTEを失敗してカウンターで倒す
  - actions:
    - character: ヴェルソ
      action: ベルセルク・スラッシュ
    - character: シエル
      action: グラディエントスキル > シールド・フェイト
  - note: パリィカウンター
:::

:::encounter
title: ペイントレス第一形態（2ターン目以降バックアップ）
turns:
  - actions:
    - character: シエル
      action: フォーチュン・フューリー
    - character: マエル
      action: スウィフト・ストライド
  - note: グラディエントカウンター
  - actions:
    - character: ヴェルソ
      action: パワフル
    - character: シエル
      action: グラディエントスキル > シールド・フェイト（QTEはパーフェクト）
  - note: パリィカウンター
:::

:::encounter
title: ペイントレス第二形態
turns:
  - actions:
    - character: マエル
      action: レイン・オブ・ファイア
  - note: |
      - クロマ波をスキップ or バックアップなら、最後回避
      - クロマ波をパリィしたなら、全部パリィ
  - actions:
    - character: ヴェルソ
      action: ディファイアント・ストライク
    - character: シエル
      action: シールド・フェイト
  - note: 全部回避
  - actions:
    - character: マエル
      action: レイン・オブ・ファイア
    - character: シエル
      action: グラディエントスキル > シールド・フェイト
:::

:::encounter
title: ペイントレス第三形態
note: スキップ -> シールド・フェイト
:::

:::skip
count: 1
loading: true
:::

:::skip
count: 5
loading: true
:::

## 屋敷

クレアと会話

:::skip
count: 1
:::

（いいえ2回）

:::skip
count: 2
loading: true
:::

:::skip
count: 3
:::

## ルミエール

:::when
ルノワールムービーin
:::

:::menu
actions:
  - character: maelle
    items:
      - kind: pictos
        note: 全部解除
      - kind: lumina
        note: エナジャイズスタートIout, 先制攻撃in (`L2 vA>A`)
:::

:::skip
count: 1
loading: true
:::

:::skip
count: 1
:::

全員と会話、選択肢「史上最高の遠征隊をつくる。」[2]

ルミエールへ

:::skip
count: 1
:::

旗（港）

:::note
リコートを2つ持っていない場合は、ここをスキップして商人からリコートを買う

その場合、噴水の近くの旗を使って強化する
:::

- 特性
  - シエル
    - リコート
    - 素早さ全
  - マエル
    - 運全
- スキル
  - マエル
    - スタンダール > 左上
    - (メッゾ・フォルテ, ) ラストチャンス > 左中
  - シエル
    - リコート
    - （ラッシュ, スペクトル・スイープ, ダーク・クレンジング）インターヴェンション > 左上
- 武器強化
  - メダルウム > Lv13

:::when
クリアション前までのジャンプ時
:::

:::menu
actions:
  - kind: formation
    note: モノコ（ルネ）out, シエルin, ヴェルソout
  - character: sciel
    kind: pictos
    note: |
      - 自動加速[1] > 完全無欠（`A>A`）
      - コンボ攻撃[2] > 弱点の恩恵[上書き]（`vAvvA`）
:::

:::encounter
title: クリアション
turns:
  - actions:
    - character: マエル
      action: ラストチャンス
    - character: シエル
      action: インターヴェンション > マエル
    - character: マエル
      action: 逃げる
:::

:::when
ルノワールムービー
:::

:::menu
actions:
  - kind: formation
    note: ヴェルソin, マエルout-in
  - character: maelle
    kind: pictos
    note: かりそめの力, 弱点の恩恵, 完全無欠（`<<AAvAAvAA`）
:::

:::encounter
title: ルノワール（最終）
turns:
  - actions:
    - character: シエル
      action: インターヴェンション > ヴェルソ
    - character: ヴェルソ
      action: リーダーシップ
    - character: マエル
      action: スタンダール（QTE失敗）
    - character: シエル
      action: インターヴェンション > マエル（左）
    - character: マエル
      action: グラディエントスキル
  - note: ムービー
  - note: スタンダール
:::

:::skip
count: 2
:::

「絵を描くのをやめる時だ。」[1]

:::skip
count: 1
:::

「マエルとして戦う。」[1]

:::encounter
title: ヴェルソ
note: レイン・オブ・ファイア
:::
