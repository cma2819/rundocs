# Route: Kokiri Forest → Deku Tree

## 準備

セーブデータをロードし、Kokiri Forest からスタートする。

:::state
location:
  scene: Kokiri Forest
  room: Entrance
inventory:
  bombs: 0
  sword: false
:::

## 手順1: 剣を取得する

Kokiri Forest 内の茂みを切り、剣を手に入れる。取得後は次の状態になっているはず。

:::state
location:
  scene: Kokiri Forest
  room: Deku Tree Entrance
inventory:
  bombs: 0
  sword: true
:::

## 手順2: 爆弾を集める

Deku Treeに入る前に、爆弾を5個集めておく。

:::state
location:
  scene: Kokiri Forest
  room: Deku Tree Entrance
inventory:
  bombs: 5
  sword: true
:::

以降、Deku Tree 内部の手順に続く。
