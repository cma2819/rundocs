# Prologue — 遠征開始

`@rundocs/plugin-expedition33` を経由してこのページはビルドされています。`formation` は隊列順(前衛/後衛の
区別なし、最大3人)、`equip` はキャラクターごとの武器・Pictos(最大3)・スキル(最大6 = 3枠×2ページ)、
`skip` はムービースキップの累計回数とロード画面を挟むかどうかを表します。いずれも `:::state` の下に
ネストして書ける他、`:::formation`/`:::equip`/`:::skip` のようにComponent名をそのままBlock名として
単独で書くこともできます(下の「Maelle の武器を更新する」の例を参照)。

## 準備: 隊列を組む

Gustave を先頭に、Lune・Maelle を加えた3人パーティで遠征を開始する。

:::state
formation:
  members: [gustave, lune, maelle]
:::

## 装備を確認する

各キャラクターの初期装備を確認する。

:::state
equip:
  gustave:
    weapon: Sabre de Gustave
    pictos: [Vitalité I, Chance I]
    skills: [Percée, Tir de Grâce, Surcharge]
  lune:
    weapon: Grimoire de Lune
    pictos: [Foulée]
    skills: [Éclat Gelé, Brasier, Onde de Choc]
  maelle:
    weapon: Fleuret de Maelle
    pictos: []
    skills: [Ruée, Parade Élégante]
:::

## Maelle の武器を更新する

道中で拾った武器に持ち替える。他のキャラクターの装備は変わらないので、`:::state` にequip全体を
書き直す代わりに、`equip` Componentだけを単独のBlockとして直接書ける。

:::equip
maelle:
  weapon: Fleuret d'Argent
  pictos: []
  skills: [Ruée, Parade Élégante]
:::

## 序盤のムービースキップ

最初のイベントシーンをスキップする。ここはスキップ直後にロード画面を挟むため、次の入力まで数秒待つこと。

:::state
skip:
  count: 1
  loading: true
:::

続くシーンはロードを挟まずそのまま繋がる。

:::state
skip:
  count: 2
  loading: false
:::

以降、Manor 内部の手順に続く。
