# Expedition 33 - Any% Glitchless Story
- [English Guide](https://docs.google.com/document/u/1/d/e/2PACX-1vQE03keLEMNHDpwreijov_UN7Tq1eqiTA7F9pydlbNAyn7uDavmVrHufUKK6ZMFreWCnt0ZDg6VcBpZ/pub)
- [Reference Video](https://www.youtube.com/watch?v=Ru_raFSlok8)

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

港へ

テキスト -> Yes(1)

:::skip
count: 3
:::

- アレクサンドルと会話
- マエルと会話 -> No(2)

:::skip
count: 1
:::

- エマと会話 -> Yes(1)

:::skip
count: 1
loading: true
:::

## 春の牧草地

:::skip
count: 3
:::

ランセリエ戦へ進む

- 道中でクロマエリクサー

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

:::skip
count: 1
:::

:::encounter
title: ポルティエ
turns:
  - actions:
    - character: ギュスターヴ
      action: エイム（ヘッドショット含む2発）-> 攻撃 
    - character: エマ
      action: アイスランス
:::

:::skip
count: 1
:::

入手 `回避巧者`

入手 `クリティカルバーン`

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

進む

:::menu
when: 遠征隊ジャーナルムービーin
actions:
  - kind: formation
    note: |
      - ギュスターブ Out, In
  - kind: pictos
    items:
      - character: gustave
        note: |
          `クリティカルバーン` (2)
      - character: lune
        note: |
          `回避巧者` (2)
:::

:::skip
when: 遠征隊ジャーナル入手
count: 2
:::

入手 `死のエネルギーII`

入手 `ルミナのカラー`

エベクエ前強化

- 特性
  - ギュスターヴ
    - 攻撃力全振り (0+6)
  - ルネ
    - 攻撃力全振り (0+6)

- スキル
  - パワフル  

イヴェキムービー

:::menu
actions:
  - character: gustave
    kind: pictos
    note: 死のエネルギーII
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
      action: できるだけ削ってアイスランス / 攻撃 / APティント（ギュスターヴの AP 足りなければ）
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

## ワールドマップ

浮遊する水前でキャンプ

:::skip
count: 1
:::

浮遊する水へ

## 浮遊する水

:::menu
when: エリアinムービー
actions:
  - character: gustave
    items:
      - kind: skill
        note: ルミエール・アサルト解除
      - kind: pictos
        note: 外す, 外す, 回避巧者（3, Yes）
  - character: lune
    kind: weapon
    note: ライトイム
:::

小屋まで進む

:::skip
count: 1
loading: true
:::

:::skip
count: 1
:::

:::menu
when: マエル合流
actions:
  - character: maelle
    items:
      - kind: pictos
        note: |
          - クリティカルバーン
          - 死のエネルギーII
      - kind: skill
        note: スパーク（3）解除
:::

:::menu
when: 旗へのジャンプ時
actions:
  - kind: formation
    note: ルネ out-in
:::

キュレーター前強化

- 特性
  - ギュスターヴ
    - 素早さ1, 攻撃力残り（6 -> 11）
  - マエル
    - 攻撃力All（15）
  - ルネ
    - 素早さ All - 1 (5)
- スキル
  - ギュスターヴ
    - マーキングショット
  - マエル
    - スウィフト・ストライド

:::status
lune:
  attributes:
    m: 6
    a: 5
gustave:
  attributes:
    m: 11
    a: 1
maelle:
  attributes:
    m: 15
:::

:::equip
gustave:
  weapon: ノアルアム（デフォルト）
  pictos: [回避巧者]
  skills: [マーキング・ショット, オーバーチャージ, パワフル]
lune:
  weapon: ライトイム
  pictos: []
  skills: [イモレーション, アイスランス]
maelle:
  weapon: マエルウム（デフォルト）
  pictos: [クリティカルバーン, 死のエネルギーII]
  skills: [オフェンス・スイッチ, ペルセ, スウィフト・ストライド]
:::

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

屋敷から出る

:::skip
count: 1
:::

進む

:::menu
when: Gobluムービー前
actions:
  - kind: formation
    note: マエル out-in
:::

:::encounter
title: ゴブル
turns:
  - note: 回避する
  - actions:
      - character: ルネ
        action: イモレーション
      - character: ギュスターヴ
        action: パワフル
      - character: マエル
        action: スウィフト・ストライド
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

:::status
gustave:
  lv: 7
lune:
  lv: 7
maelle:
  lv: 7
:::

:::skip
count: 1
:::

ワールドマップへ

:::skip
count: 1
:::

## キャンプ

強化

- マエルウム -> Lv4

眠る (opt2)

## ワールドマップ

いにしえの聖域へ

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

:::menu
actions:
  - character: gustave
    items:
      - kind: weapon
        note: サカルアム
      - kind: lumina
        note: クリティカルバーン, 死のエネルギーII
  - character: maelle
    kind: lumina
    note: 回避巧者
:::

:::equip
gustave:
  weapon: サカルアム
  pictos: [回避巧者]
  luminas: [クリティカルバーン, 死のエネルギーII]
  skills: [マーキング・ショット, オーバーチャージ, パワフル]
lune:
  weapon: ライトイム
  pictos: []
  skills: [イモレーション, アイスランス]
maelle:
  weapon: マエルウム（デフォルト）
  pictos: [クリティカルバーン, 死のエネルギーII]
  luminas: [回避巧者]
  skills: [オフェンス・スイッチ, ペルセ, スウィフト・ストライド]
:::


:::encounter
title: アルティメット・サカパタト
note: 体力調整を注意すること。削り過ぎると防御が高くなるので、クリティカルで倒せる範囲で抑える
turns:
  - note: 最初の叩きつけ攻撃だけ回避、他はパリィ
  - actions:
    - character: ルネ
      action: イモレーション
    - character: ギュスターヴ
      action: パワフル
    - character: マエル
      action: スウィフト・ストライド
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

:::status
gustave:
  lv: 10
lune:
  lv: 10
maelle:
  lv: 10
:::

ワールドマップ、ジェストラルの村へ

## ジェストラルの村

旗（入り口）、強化

- 特性
  - マエル
    - 攻撃力全振り（30）
- スキル
  - マエル
    - （デガジュマン）, レイン・オブ・ファイア < スウィフト・ストライド（左下）

:::status
maelle:
  attributes:
    m: 30
:::

:::equip
maelle:
  weapon: マエルウム（デフォルト）
  pictos: [クリティカルバーン, 死のエネルギーII]
  luminas: [回避巧者]
  skills: [オフェンス・スイッチ, ペルセ, レイン・オブ・ファイア]
:::

ゴルグラと会話（アリーナへ連れていってもらう）

トーナメントへ、マエルで参加

:::encounter
title: 1戦目（ベルトラン・ビッグハンド）
note: 回避、レイン・オブ・ファイア、パリィ
:::

:::encounter
title: 2戦目（ドミニク・ジャイアントフィート）
note: 回避、レイン・オブ・ファイア、パリィ（クリティカル or 追加の通常攻撃で倒せる）
:::

:::encounter
title: 3戦目（マチュー・ザ・コロッサス）
turns:
  - note: パリィ
  - actions:
    - character: マエル
      action: レイン・オブ・ファイア（パリィでクリティカルでなければ失敗）
  - note: 残りはパリィで
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

ゴルグラと会話、ワールドマップへ

:::skip
count: 1
:::

キャンプ、休息

:::skip
count: 1
:::

エスキエの隠れ家へ

## エスキエの隠れ家

旗（入り口）、強化

- 特性
  - ギュスターヴ
    - 素早さ9 (1 -> 10)
    - 残り攻撃力（11 -> 23）
  - マエル
    - 攻撃力全振り（33）
  - シエル
    - 攻撃力全振り（45）
- スキル
  - シエル
    - フォーチュン・フューリー、左上に装備（A連打でOK）

:::menu
actions:
  - kind: formation
    note: エマ out, シエル in
  - character: maelle
    items:
      - kind: weapon
        note: メダルウム
      - kind: pictos
        note: ブレイカー（3）
      - kind: skill
        note: スウィフト・ストライド（右上）
  - character: sciel
    kind: skill
    note: ファイアリング・シャドウ（左下）
:::

:::equip
maelle:
  weapon: メダルウム
  pictos: [クリティカルバーン, 死のエネルギーII, ブレイカー]
  luminas: [回避巧者]
  skills: [オフェンス・スイッチ, ペルセ, レイン・オブ・ファイア, スウィフト・ストライド]
sciel:
  weapon: シエルオン（デフォルト）
  pictos: []
  luminas: []
  skills: [フォーチュン・フューリー, フォーカス・フォーテル, ファイアリング・シャドウ, シアリング・ボンド]
:::

エスキエの元へ進む

:::skip
count: 1
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

:::menu
when: エスキエムービーin
actions:
  - character: maelle
    items:
      - kind: pictos
        note: 2,3 解除、強化先制攻撃（3）
      - kind: lumina
        note: 死のエネルギーII追加、回避巧者解除
  - character: sciel
    items:
      - kind: lumina
        note: クリティカルバーン, 死のエネルギーII
      - kind: skill
        note: フォーカス・フォーテルを右中へ
:::

向かって左手、旗（フランソワの洞窟）へ、ファストトラベル（入り口）

ワールドマップへ

## ワールドマップ

エスキエ解放、すぐキャンプへ

:::skip
count: 1
:::

キュレーター

- メダリウム（Lv6 or Lv7）

眠る

:::skip
count: 1
:::

岩波の崖向かって左側、海辺沿いでエナジャイズスタートI回収

## 岩波の崖

:::menu
when: ムービーin
actions:
  - character: sciel
    items:
      - kind: pictos
        note: |
          - ブレイカー
          - エナジャイズスタートI
      - kind: skill
        note: ハーベストを右下へ
:::

道中回収

- クロマx790
- デラルアム

入手後のジャンプでメニュー、デラルアム装備 

- 先制攻撃
- 緊急強化
- クロマx790

:::menu
when: ランプマスター前
actions:
  - character: gustave
    kind: pictos
    note: 緊急強化（1）
  - character: maelle
    kind: pictos
    note: 先制攻撃（2）
:::

:::equip
gustave:
  weapon: デラルアム
  pictos: [緊急強化, 回避巧者]
  luminas: [クリティカルバーン, 死のエネルギーII]
  skills: [マーキング・ショット, オーバーチャージ, パワフル]
maelle:
  weapon: メダルウム
  pictos: [クリティカルバーン, 先制攻撃, 強化先制攻撃]
  luminas: [死のエネルギーII]
  skills: [オフェンス・スイッチ, ペルセ, レイン・オブ・ファイア, スウィフト・ストライド]
sciel:
  weapon: シエルオン（デフォルト）
  pictos: [ブレイカー, エナジャイジングスタートI]
  luminas: [クリティカルバーン, 死のエネルギーII]
  skills: [フォーチュン・フューリー, (空き), ファイアリング・シャドウ, シアリング・ボンド, フォーカス・フォーテル, ハーベスト]
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
title: ラインプマスター第二形態
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
      action: 倒せてなければ、倒すための行動
:::

:::status
gustave:
  lv: 13
maelle:
  lv: 14
sciel:
  lv: 16
:::

:::skip
count: 1
loading: true
:::

ACT 2

:::skip
count: 2
:::

## キャンプ

眠る

:::skip
count: 1
:::

:::note
安定しないうちは、ロードしておくことでメニュー位置がズレるのを防ぐ

ワールドマップ出たらキャンプ → Debug Load（Alt+V）
:::

## 忘れ去られた戦場

:::skip
when: エリアin
count: 1
:::

:::encounter
title: シャリエ
note: ターゲットによって分岐
turns:
  - note: |
      - ヴェルソ > ダメージ受ける（ランプマスター戦で食らってたら経験値が足りなくなるのでダメ）
      - ルネ > 回避
      - マエル > パリィ（クリティカルで撃破）
  - actions:
      - character: マエル
        action: 削ってあったらペルセ、そうでなければレイン・オブ・ファイア
:::


:::menu
when: 道中
actions:
  - kind: formation
    note: マエル out, ルネ out
:::

店

- 洗練されたクロマカタリストx5
- インバーテッドアフィニティ

:::menu
when: 入手後のジャンプ
actions:
  - character: verso
    kind: weapon
    note: デラルアム
:::

旗（古い橋）

強化

- 特性
  - ヴェルソ
    - 攻撃力全振り（42）
- スキル
  - ヴェルソ
    - （マーキングショット, クイックストライク, ）パワフル, ベルセルク・スラッシュ, ディファイアント・ストライク
    - 左下にディファイアント・ストライク
    - 左中にベルセルク・スラッシュ

:::menu
when: デュアリステ前
actions:
  - character: verso
    kind: pictos
    note: |
      - インバーテッドアフィニティ(2)
      - 回避巧者 > 先制攻撃(3)
:::

:::equip
verso:
  weapon: デラルアム
  pictos: [緊急強化, インバーテッドアフィニティ, 先制攻撃]
  luminas: [クリティカルバーン, 死のエネルギーII]
  skills: [アサルト・ゼロ, ベルセルク・スラッシュ, ディファイアント・ストライク, クイック・ストライク, パワフル]
:::

:::encounter
title: デュアリステ第一形態
note: 基本パリィ
turns:
  - note: ディファイアント・ストライク
  - note: |
      ベルセルク・スラッシュ （AP3 の場合はディファイアント・ストライク） 
      AP多ければエイムしてランク上げるのも良い
:::

:::encounter
title: デュアリステ第二形態
turns:
  - note: |
      ジャンプカウンターのダメージで分岐。
      - クリティカルもしくは傷跡つきなら、全体攻撃をパリィカウンター
      - いずれでもなければ、単体攻撃をパリィカウンター
  - note: エイムで削って、ベルセルク・スラッシュ
  - note: 倒せなければ、回避のちグラディエントカウンター
:::

:::menu
when: ムービーin
actions:
  - character: maelle
    kind: pictos
    note: 瀬戸際(2)
:::

ワールドマップへ

:::skip
count: 1
:::

## キャンプ

武器強化

- ヴェルソ: デラルアム Lv9
- マエル: メダルウム Lv8～9

眠る(2)

:::skip
count: 1
:::

ワールドマップ、モノコの駅へ

## モノコの駅

:::encounter
title: モノコ
turns:
  - note: ディファイアント・ストライク
  - note: エイムで削って、ベルセルク・スラッシュ
:::

:::menu
when: スタラクト前
actions:
  - kind: formation
    note: シエル in, マエル in
:::

:::formation
members: [verso, sciel, maelle]
:::

:::skip
count: 1
:::

:::encounter
title: スタラクト
turns:
  - note: グラディエントアタック, ベルセルク・スラッシュ
:::

:::status
verso:
  lv: 20
sciel:
  lv: 19
maelle:
  lv: 18
:::

:::skip
count: 2
:::

ワールドマップ、旧ルミエールへ

## 旧ルミエール

旗（入り口）

強化

- マエル
  - 攻撃力全振り（54）
- ヴェルソ
  - 運全振り（18）
- ルネ
  - 素早さ全振り（45）

店

- 洗練されたクロマカタリストx5
- ルミナのカラーx1 (合計4個, アルティメットサカパタト以降にダメージ受けてるなら、5個)

:::menu
when: パーティ分割ムービーin
actions:
  - kind: pictos
    character: lune
    note: エナジャイジングスタートI
  - kind: lumina
    items:
      - character: lune
        note: 先制攻撃
      - character: sciel
        note: 先制攻撃
      - character: monoco
        note: 先制攻撃
      - character: maelle
        note: 先制攻撃
:::

:::note
ルミナ画面で、補助でフィルタ＋逆順ソート（L2->R3）するといい
:::

進む

:::skip
count: 2
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

:::menu
when: ルノアール戦前
actions:
  - kind: pictos
    note: クリティカルバーン > 自動加速（1）
  - kind: lumina
    note: インバーテッドアフィニティ
:::

:::encounter
title: ルノアール戦1
turns:
  - actions:
    - character: マエル
      action: レイン・オブ・ファイア
    - character: シエル
      action: ヒールティント > ヴェルソ
    - character: ヴェルソ
      action: ベルセルク・スラッシュ 
  - actions:
    - character: マエル
      action: スキップ
    - character: シエル
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

## キャンプ

強化

- 武器
  - シエル: シエルオン Lv9
  - マエル: メダリアム Lv9
- 資源
  - ルミナ > シエル全振り
  - ヒーリングティント

眠る(2)

ワールドマップ、ヴィサージュへ

## ヴィサージュ

進む

:::menu
when: ムービーin
actions:
  - kind: formation
    note: |
      - ルネout, シエルin, マエルout-in
  - character: maelle
    items:
      - kind: pictos
        note: |
          - コンボ攻撃 < 自動加速
          - 先制攻撃 < 強化先制攻撃（入れ替え）
      - kind: lumina
        note: 緊急強化（逆順ソート、左上）
  - character: sciel
    kind: lumina
    note: インバーテッドアフィニティ
  - character: verso
    kind: lumina
    note: 先制攻撃
:::

:::formation
members: [verso, sciel, maelle]
:::

リコート持っていなければリコートを買う

ヴィサージュへ

旗（ヴィサージュ前）強化

- 特性
  - マエル
    - 攻撃力全振り
  - ヴェルソ
    - リコート
    - 攻撃力14, 残り素早さ（52）
  -  シエル
     - 攻撃力4(49), 残り素早さ（11）
- スキル
  - ヴェルソ
    - リーダーシップ, 左上
  - シエル
    - 自己犠牲, 左中

:::menu
when: ヴィサージュ戦前
actions:
  - character: sciel
    kind: pictos
    note: |
      - エナジャイジングスタートI (2) > Yes
      - 自動加速 (3)
:::


:::equip
verso:
  weapon: デラルアム
  pictos: [緊急強化, インバーテッドアフィニティ, 強化先制攻撃]
  luminas: [クリティカルバーン, 死のエネルギーII, 先制攻撃]
  skills: [リーダーシップ, ベルセルク・スラッシュ, マーキング・ショット, クイック・ストライク, パワフル]
sciel:
  weapon: シエルオン（デフォルト）
  pictos: [ブレイカー, エナジャイジングスタートI, 自動加速]
  luminas: [クリティカルバーン, 死のエネルギーII, 先制攻撃, インバーテッドアフィニティ]
  skills: [フォーチュン・フューリー, 自己犠牲, ファイアリング・シャドウ, シアリング・ボンド, フォーカス・フォーテル, ハーベスト]
maelle:
  weapon: メダルウム
  pictos: [コンボ攻撃I, 瀬戸際, 先制攻撃]
  luminas: [死のエネルギーII, インバーテッドアフィニティ, 緊急強化]
  skills: [オフェンス・スイッチ, ペルセ, レイン・オブ・ファイア, スウィフト・ストライド]
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
      action: ベルセルク・スラッシュ
    - character: シエル
      action: フォーチュン・フューリー > シエル
:::

:::skip
count: 1
:::

:::encounter
title: 仮面の守護者
turns:
  - actions:
    - character: マエル
      action: レイン・オブ・ファイア
    - character: ヴェルソ
      action: ベルセルク・スラッシュ
    - character: シエル
      action: エイム > グラディエントスキル > 攻撃
      note: |
        - HP50% 切ってたらエイムなし
:::

:::status
verso:
  lv: 26
sciel:
  lv: 25
maelle:
  lv: 25
:::

:::skip
count: 1
loading: true
:::

:::skip
count: 1
:::

キャンプ、眠る(2)

シレーヌへ

## シレーヌ

:::menu
when: ムービーin
actions:
  - kind: pictos
    items:
      - character: sciel
        note: 完全無欠(1)
  - kind: lumina 
    items:
      - character: sciel
        note: 瀬戸際
      - character: verso
        note: エナジャイズスタートI
      - character: maelle
        note: エナジャイズスタートI
:::

旗

強化

- シエル
  - 攻撃力4 (53)
  - 残り素早さ (22)
- マエル
  - 素早さ全振り (12)
- ヴェルソ
  - 攻撃力全振り (26)

:::status
sciel:
  attributes:
    m: 53
    a: 22
verso:
  attributes:
    m: 26
    a: 52
maelle:
  attributes:
    m: 63
    a: 12
:::

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
  - actions:
    - character: シエル
      action: フォーチュン・フューリー > シエル
    - character: ヴェルソ
      action: ベルセルク・スラッシュ（APなければディファイアント・ストライク）
  - actions:
    - character: マエル
      action: オフェンス・スイッチ
    - character: シエル
      action: グラデエント・スキル > ファイアリング・シャドウ
:::

:::menu
when: シレーヌ前
actions:
  - character: maelle
    items:
      - kind: pictos
        note: 強化先制攻撃 < 瀬戸際（入れ替え）
      - kind: lumina
        note: 瀬戸際
  - character: verso
    kind: pictos
    note: 自動加速 (1)
:::

:::equip
verso:
  weapon: デラルアム
  pictos: [自動加速, インバーテッドアフィニティ, 瀬戸際]
  luminas: [エナジャイズスタートI, クリティカルバーン, 先制攻撃, 死のエネルギーII]
  skills: [リーダーシップ, ベルセルク・スラッシュ, マーキング・ショット, ディファイアント・ストライク, パワフル]
sciel:
  weapon: シエルオン（デフォルト）
  pictos: [完全無欠, エナジャイジングスタートI]
  luminas: [インバーテッドアフィニティ, クリティカルバーン, 先制攻撃, 死のエネルギーII, 瀬戸際]
  skills: [フォーチュン・フューリー, 自己犠牲, ファイアリング・シャドウ, シアリング・ボンド, フォーカス・フォーテル, ハーベスト]
maelle:
  weapon: メダルウム
  pictos: [コンボ攻撃I, 強化先制攻撃, 先制攻撃]
  luminas: [死のエネルギーII, インバーテッドアフィニティ, エナジャイズスタートI, 瀬戸際, 緊急強化]
  skills: [オフェンス・スイッチ, ペルセ, レイン・オブ・ファイア, スウィフト・ストライド]
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
    - character: ヴェルソ
      action: ヴェルセルク・スラッシュ
    - character: マエル
      action: レイン・オブ・ファイア
    - character: シエル
      action: グラデエント・スキル > ファイアリング・シャドウ
  - note: 倒せなかったらジャンプカウンターだけやる、他は回避
:::

:::skip
count: 1
:::

キャンプ、寝る(2)

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

:::menu
when: ペイントレス前までに
actions:
  - kind: formation
    note: マエルout, ヴェルソout, モノコin, シエルout-in
:::

:::formation
members: [monoco, sciel]
:::

:::menu
actions:
  - character: sciel
    items:
      - kind: pictos
        note: |
          エナジャイズターン (3)
          - 左2回、AでOK
      - kind: lumina
        note: |
          - クリティカルバーンout
          - 自動加速in
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

:::menu
when: 道中ジャンプで
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
    - 素早さ全振り (31)
- スキル
  - シエル
    - シールド・フェイト > 左下

:::menu
when: ルノワール前
actions:
  - character: sciel
    items:
      - kind: weapon
        note: ティスルオン
      - kind: pictos
        note: 弱点の恩恵 < エナジャイズスタートI
:::

:::equip
sciel:
  weapon: ティスルオン
  pictos: [完全無欠, 弱点の恩恵, エナジャイズターン]
  luminas: [インバーテッドアフィニティ,  先制攻撃, 死のエネルギーII, 瀬戸際, 自動加速]
  skills: [フォーチュン・フューリー, 自己犠牲, シールド・フェイト, シアリング・ボンド, フォーカス・フォーテル, ハーベスト]
verso:
  weapon: デラルアム
  pictos: [自動加速, インバーテッドアフィニティ, 瀬戸際]
  luminas: [エナジャイズスタートI, クリティカルバーン, 先制攻撃, 死のエネルギーII]
  skills: [リーダーシップ, ベルセルク・スラッシュ, マーキング・ショット, ディファイアント・ストライク, パワフル]
maelle:
  weapon: メダルウム
  pictos: [コンボ攻撃I, 強化先制攻撃, 先制攻撃]
  luminas: [死のエネルギーII, インバーテッドアフィニティ, エナジャイズスタートI, 瀬戸際, 緊急強化]
  skills: [オフェンス・スイッチ, ペルセ, レイン・オブ・ファイア, スウィフト・ストライド]
:::

:::formation
members: [maelle, sciel, verso]
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
    - character: ヴェルソ
      action: ディファイアント・ストライク
    - character: シエル
      action: グラディエントスキル > シールド・フェイト
:::

:::menu
when: ペイントレス前
actions:
  - character: maelle
    kind: pictos
    note: コンボ攻撃 I 外す
  - character: sciel
    kind: lumina
    note: |
      - 自動加速 out
      - クリティカルバーン, 強化先制攻撃
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
      action: ベルセルク・スラッシュ
    - character: ペイントレス
      action: 隕石攻撃 > パリィ 
      note: 最低 1 AP はヴェルソに入らなければ、セーブをロード
  - actions:
    - character: シエル
      action: フォーチュン・フューリー
    - character: ヴェルソ
      action: |
        - 3 パリィ以上してたらベルセルク・スラッシュ
        - 2 か 1 パリィならディファイアント・ストライク
    - character: ペイントレス
      action: グラディエントアタック
      note: ここまでで 3 AP 以上ヴェルソに入ってなければ、次以降ダメージを減らす（シールド・フェイトのQTEで失敗するなどする）
  - actions:
    - character: マエル
      action: オフェンス・スイッチ
    - character: シエル
      action: （エイム, AP2 まで）グラディエントスキル > シールド・フェイト
:::

:::encounter
title: ペイントレス第三形態
turns:
  - actions:
    - character: ヴェルソ
      action: ディファイアント・ストライク
  - actions:
    - character: シエル
      action: シールド・フェイト
  - actions:
    - character: ヴェルソ
      action: ベルセルク・スラッシュ
    - character: マエル
      action: レイン・オブ・ファイア
    - character: シエル
      action: グラディエントスキル > シールド・フェイト
:::

:::encounter
title: ペイントレス第二形態
note: シールド・フェイト
:::

:::skip
count: 1
loading: true
:::

:::skip
count: 5
loading: true
:::

クレアと会話（いいえ2回）

:::skip
count: 2
loading: true
:::

:::skip
count: 3
:::

## ルミエール

:::menu
when: ルノワールムービーin
actions:
  - character: maelle
    items:
      - kind: pictos
        note: 強化先制攻撃 out, (2) out, かりそめの力 in
      - kind: lumina
        note: 完全無欠 in, エナジャイズスタートI out, 強化先制攻撃 in
:::

:::skip
count: 1
loading: true
:::

:::skip
count: 1
:::

全員と会話、選択肢「史上最高の遠征隊をつくる。」

ルミエールへ

:::skip
count: 1
:::

:::menu
actions:
  - kind: formation
    note: マエル out-in
:::

旗（港）

- スキル
  - シエル
    - リコート
    - （ラッシュ, スペクトル・スイープ, ダーク・クレンジング）インターヴェンション > 左上
  - マエル
    - スタンダール > 左上
    - (メッゾ・フォルテ, ) ラストチャンス > 左中

:::menu
actions:
  - character: maelle
    kind: weapon
    note: メダルウム > Lv15
:::

アべレイションと戦闘

:::encounter
title: アベレイション
note: エネルギーティント, スタンダール
:::

:::menu
when: ジャンプ時
actions:
  - character: maelle
    kind: pictos
    note: ショートカット(1)
:::

クリアションは逃げる

:::menu
when: クリアション戦後
actions:
  - kind: formation
    note: シエル in
:::

:::formation
members: [verso, maelle, sciel]
:::

:::encounter
title: ルノワール（最終）
turns:
  - actions:
    - character: ヴェルソ
      action: リーダーシップ
    - character: マエル
      action: スタンダール
    - character: シエル
      action: インターヴェンション 
    - character: マエル
      action: ラストチャンス > スタンダール
:::

:::skip
count: 2
:::

「絵を描くのをやめる時だ。」(1)

:::skip
count: 1
:::

「マエルとして戦う。」(2)

:::encounter
title: ヴェルソ
note: レイン・オブ・ファイア
:::
