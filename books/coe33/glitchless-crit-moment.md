# Expedition 33 - Any% Glitchless Story (Critical Moment)
- [English Guide](https://docs.google.com/document/u/1/d/e/2PACX-1vQH1QZlqpVW4IqMhPRxq7dLSYNCnu2DQdkSBazySIH8kPsRGQfMU96gpLnEet4E1GQQJ2oA2zTTRYmM/pub)
- [Save files](https://drive.google.com/file/d/1qD6oc02OOpZs5Ikg-i7c5-87D4d8qI4o/view?usp=sharing)

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
      action: ${ice-lance}
:::

:::skip
count: 1
:::

- 入手 `${dodger}`
- 入手 `${critical-burn}`

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
          `${critical-burn}` [1] (`AA`)
      - character: lune
        note: |
          `${dodger}` [1] (`<AA`)
:::

:::skip
count: 2
:::

イヴェキ戦へ進む

- 入手 `${dead-energy-2}`
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
  - ${powerful}  

:::menu
actions:
  - character: gustave
    kind: pictos
    note: ${dead-energy-2} (`<AA`)
:::

:::formation
members: [lune, gustave]
:::

:::equip
gustave:
  weapon: ${noahram}（デフォルト）
  pictos: ["${critical-burn}", "${dead-energy-2}"]
  skills: ["${lumiere-assault}", "${overcharge}", "${powerful}"]
lune:
  weapon: ${lunerim}（デフォルト）
  pictos: ["${dodger}"]
  skills: ["${immolation}", "${ice-lance}"]
:::

:::encounter
title: イヴェキ
note: 全部パリィ
turns:
  - actions:
    - character: ルネ
      action: 盾削って${immolation}
    - character: ギュスターヴ
      action: ${powerful}
  - actions:
    - character: ルネ
      action: ${immolation}
    - character: ギュスターヴ
      action: ${lumiere-assault}
  - actions:
    - character: ルネ
      action: APティント（ギュスターヴの AP 足りなければ）/ ${ice-lance} / 攻撃
      note: HP残り3/8くらいを目指す
    - character: ギュスターヴ
      action: ${overcharge}
  - note: ${overcharge}でクリティカル出ないと倒せない。残ったら、頑張って削って倒す
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
        note: ${lumiere-assault}解除
      - kind: pictos
        note: 外す, 外す, ${dodger} [3, 上書き]
  - character: lune
    kind: weapon
    note: ${lighterim}（間に合わなかったら屋敷前でも可）
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
          - ${critical-burn} (`<AA`)
          - ${dead-energy-2} (`<vAA`)
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
    - ${marking-shot}
  - マエル
    - ${swift-stride}

:::encounter
title: キュレーター
turns:
  - actions:
    - character: ルネ
      action: APティント > マエル
    - character: ギュスターヴ
      action: ${marking-shot}
    - character: マエル
      action: ${percee}
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
      - ${offensive-switch}
      - ${spark}
:::

:::encounter
title: ゴブル
note: クリティカル見ておくこと
turns:
  - note: 回避する
  - actions:
      - character: ルネ
        action: ${immolation}
      - character: ギュスターヴ
        action: ${powerful}
      - character: マエル
        action: ${swift-stride}
  - note: ここも回避
  - actions:
      - character: ルネ
        action: ${ice-lance}
      - character: ギュスターヴ
        action: ${marking-shot}
      - character: マエル
        action: ${percee}
    note: ${percee}がクリティカルだったら以降も回避
  - actions:
      - character: ルネ
        action: ${immolation}
      - character: ギュスターヴ
        action: ${overcharge}
      - character: マエル
        action: ${swift-stride}
  - actions:
      - character: ルネ
        action: 攻撃
        note: ${percee}でクリティカルが出た or 他のクリティカルで100ダメージ以上増えてるならスキップ
      - character: ギュスターヴ
        action: ${marking-shot}
      - character: マエル
        action: ${percee}
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
      action: ${immolation}（盾あるときはミス）
    - character: ギュスターヴ
      action: スキップ
    - character: マエル
      action: ${swift-stride}（盾あるときはミス）
  - actions:
    - character: ルネ
      action: スキップ
    - character: ギュスターヴ
      action: ${marking-shot}
    - character: マエル
      action: ${percee}
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
        note: ${sakaram} (`vA`)
      - kind: lumina
        note: ${critical-burn}, ${dead-energy-2} (`A>A`)
  - character: lune
    kind: lumina
    note: ${dodger}, ${dead-energy-2} (R3 A>A)
  - character: maelle
    kind: lumina
    note: ${dodger}（任意）
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
      action: ${immolation}
    - character: ギュスターヴ
      action: ${powerful}
    - character: マエル
      action: ${swift-stride}
  - note: |
      - ジャンプカウンター攻撃を食らう
      - パリィ
  - actions:
    - character: ルネ
      action: エイムで盾破壊, スキップ or ${immolation} or 通常攻撃
      note: sakapatate の最初の T にゲージが乗るくらいを目安
    - character: ギュスターヴ
      action: ${marking-shot}
    - character: マエル
      action: ${percee}
    note: クリティカル出たら倒せる
  - actions:
    - character: ルネ
      action: AP ティント > マエル or スキップ
    - character: ギュスターヴ
      action: ${marking-shot}
    - character: マエル
      action: ${percee}
:::

ワールドマップ、ジェストラルの村へ

## ジェストラルの村

旗（入り口）、強化

- 特性
  - マエル
    - 攻撃力全振り（30）
- スキル
  - マエル
    - （${degagement}, ）${rain-of-fire}（手動での装備不要）

ゴルグラと会話（アリーナへ連れていってもらう）

トーナメントへ、マエルで参加

:::encounter
title: トーナメント（通常、全戦共通）
note: パリィ、${rain-of-fire}、パリィ
:::

:::encounter
title: トーナメント（${dodger}あり）
note: |
    回避、${rain-of-fire}、パリィ
    残ったら以下

    - クリティカルなし: 射撃で削って攻撃
    - クリティカルあり: 攻撃 or 削り切れそうなら射撃
:::

:::skip
count: 1
:::

:::encounter
title: 4戦目（シエル）
note: パリィ、${rain-of-fire}
:::

:::skip
count: 2
:::

ゴルグラと会話

店

- 洗練されたクロマカタリストx2
- ${last-stand}

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
    - （下へ）${fortunes-fury}、左上に装備（`AA`）

:::menu
actions:
  - kind: formation
    note: ルネ out, シエル in
  - character: maelle
    items:
      - kind: weapon
        note: ${medalum}
      - kind: pictos
        note: ${dodger}[3] (`<vvAAA`)
  - character: gustave
    items: 
      - kind: pictos
        note: ${last-stand}[1]（`v<AA`）
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
    note: ${offensive-switch} > 左上（`<AA`）
:::

:::encounter
title: フランソワ
turns:
  - note: 回避
  - actions:
    - character: ギュスターヴ
      action: エイム（1～2発）, ${marking-shot}
    - character: マエル
      action: エイム（盾はがすまで）, ${percee}
:::

:::when
エスキエムービーin
:::

:::menu
actions:
  - character: maelle
    items:
      - kind: pictos
        note: 2,3 解除、強化${first-strike}[3] (`vYvY AA`)
      - kind: lumina
        note: ${dead-energy-2} (`>>A`)
  - character: sciel
    items:
      - kind: lumina
        note: ${critical-burn}, ${dead-energy-2} (`A>A`)
      - kind: skill
        note: ${focused-foretell} > 右上 (`<A >A`)
:::

向かって左手、旗（フランソワの洞窟）へ、ファストトラベル（入り口）

ワールドマップへ

エスキエ解放メッセージ後、すぐキャンプへ

:::skip
count: 1
:::

- 武器強化
  - マエル, ${medalum}いけるところまで（Lv7 or Lv8 or Lv9）
- 焚火 -> 眠る[1]

:::skip
count: 1
:::

:::note
↓忘れない！！！
:::

- ${energising-start-1}（岩波の崖向かって左側、海辺沿い）
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
          - ${breaker}[1]
          - ${energising-start-1}[2]
      - kind: skill
        note: |
          - シエルのスキル位置調整（任意）
            - ${firing-shadow} > 左下（`vvYAA`）
            - ${harvest} > 右下（`>Av>A`）
:::

道中回収

- クロマx790
- ${delaram}

入手後のジャンプでメニュー、${delaram}装備 

- ${first-strike}

:::when
${first-strike}入手直後
:::

:::menu
actions:
  - character: maelle
    kind: pictos
    note: ${first-strike}[2]（`<<AA`） 
:::

:::encounter
title: リーパー・キュルティストほか
note: |
  オーブを撃たないこと

  - 射撃 左3 右2
  - ${rain-of-fire}
:::

- ${chation}
- 洗練されたクロマカタリスト
- ${sos-power}
- クロマx790
- ルミナのカラー

:::when
ランプマスター前
:::

:::menu
actions:
  - character: gustave
    kind: pictos
    note: ${sos-power}[2] (`vAvA`)
  - character: sciel
    kind: weapon
    note: ${chation} (`vA`)
:::

:::note
攻撃パターンによってAP状況や残りHPが変わるので、めっちゃ練習した方が良い
:::

:::encounter
title: ランプマスター第一形態
turns:
  - actions:
    - character: マエル
      action: ${rain-of-fire}
  - note: マエルが1度でもパリィしている必要あり。なければ全員攻撃で一周回す
  - actions:
    - character: ギュスターヴ
      action: ${powerful}
    - character: マエル
      action: ${swift-stride}
    - character: シエル
      action: ${fortunes-fury} > マエル
  - actions:
    - character: ギュスターヴ
      action: ${overcharge}
:::

:::encounter
title: ランプマスター第二形態
turns:
  - actions:
    - character: ギュスターヴ
      action: （第一形態で行動していなければ）${marking-shot}
    - character: マエル
      action: ${rain-of-fire}
    - character: シエル
      action: |
        マエルの AP が少ないなら、APティント
        十分あるなら、${fortunes-fury} or 通常攻撃
  - actions:
    - character: ギュスターヴ
      action: ${overcharge}か${marking-shot}
    - character: マエル
      action: ${percee}か${rain-of-fire}
    - character: シエル
      action: APティント or 攻撃などなど
  - note: ダメージ足らない場合、傷跡＋${percee}を狙っていくのが安定っぽい
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
      - それ以外なら${rain-of-fire}
:::

店

- ${inverted-affinity}

:::when
入手後のジャンプ
:::

:::menu
actions:
  - kind: formation
    note: ルネ out, マエル out,
  - character: verso
    kind: weapon
    note: ${delaram}
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
    - （${marking-shot}, ${quick-strike}, ）${powerful}, ${berserk-slash}, ${defiant-strike}
    - 左下に${defiant-strike}
    - 左中に${berserk-slash}

:::when
デュアリステ前
:::

:::menu
actions:
  - character: verso
    items:
      - kind: pictos
        note: |
          - ${inverted-affinity}[3] (`<AA`)
          - ${first-strike} > ${last-stand}[1, 上書き] (`vAvAA`)
      - kind: lumina
        note: ${last-stand} （`R2 >A`） 
:::

:::encounter
title: デュアリステ第一形態
note: |
  - 基本パリィ
turns:
  - note: ${defiant-strike}
  - note: |
      - 基本は${berserk-slash} 
      - AP3 の場合は${defiant-strike}
      - 残りHP次第で${defiant-strike}にしてもよい
:::

:::encounter
title: デュアリステ第二形態
turns:
  - note: |
      ジャンプカウンターのダメージで分岐。
      - 刻印ありでクリティカルが出たら、なにもしない
      - 刻印ありでクリティカルなし、もしくは刻印なしでクリティカルが出たら、全体攻撃をパリィカウンター
      - いずれでもなければ、単体攻撃をパリィカウンター
  - note: （射撃で削り or ランク上げ）${berserk-slash}
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
    note: ${at-deaths-door}[2] (`<AA`)
  - character: sciel
    kind: pictos
    note: ${combo-attack-1}[3] (`vAA`)
  - kind: lumina
    items:
      - character: sciel
        note: ${first-strike}
      - character: lune
        note: ${first-strike}  
      - character: maelle
        note: ${first-strike}  
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
      action: ${berserk-slash}
    - character: マエル
      action: ${rain-of-fire}
  - note: 回避（ヴェルソでクリティカルなければパリィ）
  - actions:
    - character: シエル
      action: エネルギーティント > ヴェルソ（ヴェルソがAP3以上あればスキップ）
    - character: ヴェルソ
      action: ${berserk-slash}
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
  - note: グラディエントアタック, ${berserk-slash}
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
    note: ${combo-attack-1}[1] > ${first-strike}[上書き]（`<<AAA`）
  - kind: lumina
    items:
      - character: verso
        note: 死のエネルギー2out, ${first-strike}in (`vAvA`)
      - character: monoco
        note: ${first-strike}（`R3, >A`）
:::

進む

:::when
ルネパーティ終了時
:::

:::menu
actions:
  - kind: pictos
    character: sciel
    note: ${last-stand}[2] > ${energising-start-1}（`vAvA`）
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
    note: ${critical-burn}解除[1]
:::

:::note
- リコートが一つもない場合、道中左手のクロマ（`2,495`）を取る
:::

:::encounter
title: シュヴァリエ2体
turns:
  - note: |
      - ${medalum} Lv9 なら、${percee} / ${defiant-strike}
      - ${medalum} Lv8 なら、${rain-of-fire} / ${defiant-strike}
:::

:::skip
count: 1
:::

- 入手 `${auto-rush}`

:::when
ルノアール戦ムービー前（植木3つ目の奥側に判定）
:::

:::menu
actions:
  - kind: pictos
    note: ${auto-rush} > ${critical-burn}[1] (`AA`)
  - kind: lumina
    note: ${inverted-affinity} (`(L3)R3 >A`)
:::

:::encounter
title: ルノアール戦1
turns:
  - actions:
    - character: マエル
      action: ${rain-of-fire}
    - character: ルネ
      action: ヒールティント > ヴェルソ
    - character: ヴェルソ
      action: ${berserk-slash} 
  - actions:
    - character: マエル
      action: ${offensive-switch}
    - character: ルネ
      action: エネルギーティント > ヴェルソ
    - character: ヴェルソ
      action: ${berserk-slash} 
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
  - シエル: ${chation} Lv9
  - ヴェルソ: ${delaram} Lv9
  - マエル: ${medalum} Lv9
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
          - ${first-strike}[1] > ${auto-rush}[上書き]（`<vvAA`）
      - kind: lumina
        note: ${sos-power}, ${last-stand}, ${critical-burn}（`R3, AvvA>A`）
  - character: sciel
    items:  
      - kind: lumina
        note: ${inverted-affinity} (`>A`)
      - kind: pictos
        note: ${auto-rush}[3]（`<<AA`）
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
    - ${leadership}, 左上
  - シエル
    - ${our-sacrifice}, 左中

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
      action: ${our-sacrifice}
    - character: マエル
      action: ${rain-of-fire}
  - actions:
    - character: ヴェルソ
      action: ${defiant-strike}
    - character: シエル
      action: ${fortunes-fury} > シエル
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
      action: ${rain-of-fire}（QTE失敗）
    - character: ヴェルソ
      action: ${berserk-slash}
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
          - ${breaker}[2] > ${at-deaths-door}[上書き]（`v<<v AAA`）
      - kind: lumina
        note: ${sos-power}out, ${energising-start-1}in, ${dead-energy-2}out, ${at-deaths-door}in（`R3 AvA>>AvvA`）
  - character: verso
    items:
      - kind: lumina
        note: ${energising-start-1}in, ${dodger}in（`vA>A`）
  - character: sciel
    items:
      - kind: lumina
        note: ${energising-start-1}in, ${at-deaths-door}in（`vA ^^A`）  
      - kind: pictos
        note: ${immaculate}（`AA`）
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
      action: ${leadership}
    - character: シエル
      action: ${our-sacrifice}
    - character: マエル
      action: ${rain-of-fire}
  - note: パリィ
  - actions:
    - character: シエル
      action: ${fortunes-fury} > シエル
    - character: ヴェルソ
      action: ${defiant-strike}
    - character: マエル
      action: ${offensive-switch}
  - note: 基本パリィ, 一回目の攻撃がバレエだったら回避
  - actions:
    - character: シエル
      action: グラデエント・スキル > ${firing-shadow}（フォーテルカウンターとHP0の間2/3以降まで削れていたら、攻撃でも可）
:::

:::when
シレーヌ前
:::

:::menu
actions:
  - character: maelle
    items:
      - kind: pictos
        note: ${auto-rush} > ${breaker} (2, 入れ替え `<A vAY`)
      - kind: lumina
        note: ${dodger} (`R3, >vA`)
:::

:::encounter
title: シレーヌ
turns:
  - actions:
    - character: ヴェルソ
      action: ${powerful}
    - character: シエル
      action: ${fortunes-fury} > シエル
    - character: マエル
      action: ${rain-of-fire}
  - actions:
    - character: マエル
      action: ${rain-of-fire}
    - character: ヴェルソ
      action: ヴェルセルク・ス${rush}
    - character: シエル
      action: グラデエント・スキル > ${firing-shadow}
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
          - ${energising-turn} [3] (`AA`)
      - kind: lumina
        note: ${energising-start-1}out, ${critical-burn}out, ${auto-rush}in  (`<A R3 ^^AvA`)
:::

:::encounter
title: ペイントレス（モノリス）
turns:
  - note: ヒールティント > シエル, ${harvest}（失敗）
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

道中で回収 「${weakness-gain}」

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
    - (${phantom-blade},) ${sealed-fate} > 左下

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
        note: ${tisseron}（`^A`）
      - kind: pictos
        note: ${weakness-gain} > ${energising-start-1} [2] (`<<AA`)
:::

:::encounter
title: ルノワール2戦目
turns:
  - actions:
    - character: マエル
      action: ${rain-of-fire}
    - character: シエル
      action: ${our-sacrifice}
    - character: ヴェルソ
      action: ${leadership}
    - character: シエル
      action: ${fortunes-fury} > シエル
  - actions:
    - character: マエル
      action: ${offensive-switch}
    - character: ヴェルソ
      action: ${defiant-strike}
    - character: シエル
      action: グラディエントスキル > ${sealed-fate}
:::

:::when
ペイントレス前
:::

:::menu
actions:
  - character: sciel
    kind: lumina
    note: ${auto-rush}out, ${critical-burn}, ${dodger}, ${last-stand}（`R3 ^^>A^A^Av<A`）
:::

:::encounter
title: ペイントレス第一形態
turns:
  - actions:
    - character: マエル
      action: ${rain-of-fire}
    - character: シエル
      action: ${focused-foretell}
    - character: ヴェルソ
      action: ${defiant-strike}
  - note: パリィ, ラストだけ回避。ヴェルソに1APも入らなかったらバックアップ（後述）へ
  - actions:
    - character: シエル
      action: ${fortunes-fury}
    - character: マエル
      action: ${offensive-switch}
  - note: |
      グラディエントカウンター。AP状況を確認する
      - ヴェルソ3, マエル4以上 -> シエルで倒し切り
      - 上記未満 -> シエルのQTEを失敗してカウンターで倒す
  - actions:
    - character: ヴェルソ
      action: ${berserk-slash}
    - character: シエル
      action: グラディエントスキル > ${sealed-fate}
  - note: パリィカウンター
:::

:::encounter
title: ペイントレス第一形態（2ターン目以降バックアップ）
turns:
  - actions:
    - character: シエル
      action: ${fortunes-fury}
    - character: マエル
      action: ${swift-stride}
  - note: グラディエントカウンター
  - actions:
    - character: ヴェルソ
      action: ${powerful}
    - character: シエル
      action: グラディエントスキル > ${sealed-fate}（QTEはパーフェクト）
  - note: パリィカウンター
:::

:::encounter
title: ペイントレス第二形態
turns:
  - actions:
    - character: マエル
      action: ${rain-of-fire}
  - note: |
      - クロマ波をスキップ or バックアップなら、最後回避
      - クロマ波をパリィしたなら、全部パリィ
  - actions:
    - character: ヴェルソ
      action: ${defiant-strike}
    - character: シエル
      action: ${sealed-fate}
  - note: 全部回避
  - actions:
    - character: マエル
      action: ${rain-of-fire}
    - character: シエル
      action: グラディエントスキル > ${sealed-fate}
:::

:::encounter
title: ペイントレス第三形態
note: スキップ -> ${sealed-fate}
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
        note: ${energising-start-1}out, ${first-strike}in (`L2 vA>A`)
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
    - ${stendhal} > 左上
    - (${mezzo-forte}, ) ${last-chance} > 左中
  - シエル
    - リコート
    - （${rush}, ${spectral-sweep}, ${dark-cleansing}）${intervention} > 左上
- 武器強化
  - ${medalum} > Lv13

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
      - ${auto-rush}[1] > ${immaculate}（`A>A`）
      - コンボ攻撃[2] > ${weakness-gain}[上書き]（`vAvvA`）
:::

:::encounter
title: クリアション
turns:
  - actions:
    - character: マエル
      action: ${last-chance}
    - character: シエル
      action: ${intervention} > マエル
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
    note: ${painted-power}, ${weakness-gain}, ${immaculate}（`<<AAvAAvAA`）
:::

:::encounter
title: ルノワール（最終）
turns:
  - actions:
    - character: シエル
      action: ${intervention} > ヴェルソ
    - character: ヴェルソ
      action: ${leadership}
    - character: マエル
      action: ${stendhal}（QTE失敗）
    - character: シエル
      action: ${intervention} > マエル（左）
    - character: マエル
      action: グラディエントスキル
  - note: ムービー
  - note: ${stendhal}
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
note: ${rain-of-fire}
:::
