# Expedition 33 - Any% Glitchless Story

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

テキスト -> Yes

:::skip
count: 3
:::

- アレクサンドルと会話
- マエルと会話 -> No

:::skip
count: 1
:::

- エマと会話 -> Yes

:::skip
count: 1
loading: true
:::

## 春の牧草地

:::skip
count: 3
:::

クロマエリクサー使う

:::skip
count: 1
:::

:::encounter
title: ランセリエ
turns:
  - actions:
    - character: ギュスターヴ
      action: エイム（ヘッドショット含む2発） -> 攻撃
    - character: ランセリエ
      action: 攻撃 （パリィ）
:::

:::skip
count: 1
:::

進む

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

ジャーナルムービーin

- 隊列
  - ギュスターブ: Out -> In
- ピクトス
  - ギュスターヴ(2): `クリティカルバーン`
  - ルネ(2): `回避巧者`

:::skip
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

- ピクトス
  - ギュスターヴ: `死のエネルギーII`

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

エリアinムービー中

- スキル
  - （ギュスターヴ）ルミエール・アサルト解除
- ピクトス
  - ギュスターヴ
    - 外す, 外す, 回避巧者（Yes）
- 武器
  - ルネ
    - ライトイム

小屋まで進む

:::skip
count: 1
loading: true
:::

:::skip
count: 1
:::

マエル合流

- ピクトス
  - マエル
    - クリティカルバーン
    - 死のエネルギーII
- スキル
  - マエル
    - スパーク（3）解除

旗前

- ルネ out-in

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

Gobluムービー前

- 隊列
  - マエル out-in
- 装備（やってなければ）
  - ルネ
    - ライトイム

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
        action: スキップ
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