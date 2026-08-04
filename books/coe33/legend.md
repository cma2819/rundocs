# 凡例

このページは、`books/coe33` の各Runbookで使える実装済みBlockの一覧と、それぞれの最小構文例を
まとめた参照ページです。新しいBlock(コアのBlock kind、または `plugin-expedition33` の
Component)が実装されたら、このページにも例を追加してください。

## コアBlock

Plugin/GameSchemaに依存せず、`@rundocs/core` が常に提供するBlock。

### state

任意のkey-valueを書ける汎用Block。GameSchemaのComponent名をキーにネストすると、その
Componentの専用Renderer(下記)が適用される。

:::state
formation:
  members: [gustave, lune, maelle]
:::

### note

YAMLを介さない、プレーンなテキストのみのBlock。手順の補足や注意書きに使う。

:::note
このセクションはカメラが暗転することがあるが、入力は止めなくてよい。
:::

### route

経路メモ用に、YAMLリスト(waypointの配列)を受け取るBlock。

:::route
- Manor Entrance ~> Grand Hall
- Grand Hall ~> Library
:::

### encounter

ターン制の戦闘など、1回限りの遭遇で何が起きたかを記録するBlock。`state`のような永続的な
Componentとは異なり、その場限りのイベントログとして使う。相手を表す`title`(省略可)と、
ターンごとの`actions`(行動した`character`と`action`の配列)・任意の`note`をまとめた`turns`を持つ。

:::encounter
title: Simon "Gustave"
turns:
  - actions:
      - character: gustave
        action: Attack
      - character: gustave
        action: Attack
      - character: maelle
        action: Guard
    note: 3コンボ目をPerfect Dodgeしてから全力バースト
  - actions:
      - character: lune
        action: Potion → gustave
:::

## plugin-expedition33 のComponent Block

`game.schema.yaml` の `components` に登録されたComponentは、`:::state` にネストする代わりに
`:::componentName` として単独でも書ける(意味・描画結果は同じ)。

### formation(陣形)

隊列順(前衛/後衛の区別なし、最大3人)。`members` は `formation.schema.yaml` の `enum` に
列挙されたキャラクターID。

:::formation
members: [gustave, maelle, lune]
:::

### equip(装備)

キャラクターごとの武器・Pictos(最大3、重複不可)・スキル(最大6、重複不可)。

:::equip
maelle:
  weapon: Fleuret d'Argent
  pictos: [Vitalité I]
  skills: [Ruée, Parade Élégante]
:::

### skip(ムービースキップ)

ムービースキップの累計回数と、直後にロード画面を挟むかどうか。

:::skip
count: 1
loading: true
:::
