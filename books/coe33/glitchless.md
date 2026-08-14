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
