# Fallback Dialog Documentation

This document serves as a workspace for fine-tuning the fallback dialog used in our Japanese visual novel game. The fallback dialog is used when the LLM cannot provide custom dialog for a scene. This document organizes the existing dialog by scene and provides a structure for editing and improving the dialog content.

## Game Scenes Overview

Our game follows a narrative that takes the player through various locations in Tokyo, with the following scenes in order:

### 1. Train Station
- **1.1 Train Platform** - File: `phaser_game/src/data/conversations/train_platform.ts`
  - First meeting with Kaori at the station
  - Initial greetings and introduction to the game

- **1.2 Inside Train** - File: `phaser_game/src/data/conversations/inside_train.ts`
  - Conversation about trains in Tokyo
  - Introduction to travel vocabulary

### 2. Restaurant
- **2.1 Outside Restaurant** - File: `phaser_game/src/data/conversations/outside_restaurant.ts`
  - Discussing Japanese cuisine
  - Food preferences vocabulary

- **2.2 Inside Restaurant** - File: `phaser_game/src/data/conversations/inside_restaurant.ts`
  - Ordering food
  - Interacting with the waitress
  - Restaurant etiquette in Japan

### 3. Park
- **3.1 Park Lawn** - File: `phaser_game/src/data/conversations/park_lawn.ts`
  - Meeting Takashi
  - Discussing hobbies and interests

- **3.2 Park Bench** - File: `phaser_game/src/data/conversations/park_bench.ts`
  - Conversation about seasons and weather
  - Weather-related vocabulary

### 4. Shopping Mall
- **4.1 Outside Mall** - File: `phaser_game/src/data/conversations/outside_mall.ts`
  - Discussing the mall and shopping
  - Taking shelter from the rain

- **4.2 Handbag Store** - File: `phaser_game/src/data/conversations/clothing_store.ts`
  - Shopping vocabulary
  - Currency exchange
  - Interactions with the shopkeeper

### 5. Hotel
- **5.1 Hotel Lobby** - File: `phaser_game/src/data/conversations/hotel_lobby.ts`
  - End of day reflection
  - Wrap-up of the experience

## Dialog Structure

Each conversation file follows a consistent structure:

```typescript
const conversationName: Conversation = {
  id: 'unique_id',
  locationId: 'location_id',
  dialogs: [
    {
      id: 'dialog_id',
      characterId: 'character_id', // Empty string for narration
      emotion: 'character_emotion',
      position: 'character_position',
      japaneseText: '日本語のテキスト',
      romaji: 'Nihongo no tekisuto',
      englishText: 'Japanese text',
      studyableTerms: [
        {
          id: 'term_id',
          japaneseText: '用語',
          startIndex: 0,
          endIndex: 2,
          romaji: 'yougo',
          englishText: 'term',
          grammarPoints: ['Grammar_category']
        }
      ],
      playerResponses: [
        {
          id: 'response_id',
          japaneseText: '返事',
          romaji: 'Henji',
          englishText: 'Response',
        }
      ]
    }
  ],
  background: 'background_image_id',
  characters: ['character_id'],
  currentDialogIndex: 0
};
```

## Scene Scripts

Each dialog interaction in the scenes below is numbered for easy reference. The numbering scheme works as follows: scene numbers (e.g., 1.1, 2.1) are followed by the sequential interaction number within that scene. For example, "1.1.3" refers to the third interaction in scene 1.1 (Train Platform). For player response options, an additional number indicates which response option is being referenced. For instance, "1.1.3.2" refers to the second response option in the third interaction of scene 1.1. Each interaction (narration, character dialog, or set of player responses) is numbered sequentially within its scene, and player response options are numbered within their interaction block.

Below are the full dialog scripts for each scene in a format that makes it easy to read the entire conversation flow. For each dialog entry, we include:
- The speaking character (or "Narration" for narrated text)
- Character's emotion (if applicable)
- The Japanese text
- Romaji transliteration
- English translation
- Available player responses (where applicable)

Each section corresponds to a conversation file in the game, making it easy to transfer any edits back to the source files.

### 1.1 Train Platform
**File:** `phaser_game/src/data/conversations/train_platform.ts`
**Characters:** Player, Kaori
**Scene Setting:** Tokyo Station platform

```
1. NARRATION:
JP: 東京駅に到着しました。ホームに立っていると...
RM: Tokyo-eki ni touchaku shimashita. Hoomu ni tatte iru to...
EN: You've arrived at Tokyo Station. As you stand on the platform...

2. KAORI (default, position: center):
JP: こんにちは！久しぶり！元気？
RM: Konnichiwa! Hisashiburi! Genki?
EN: Hello! Long time no see! How are you?

3. [PLAYER RESPONSE OPTIONS]
    1. JP: こんにちは！元気です！
       RM: Konnichiwa! Genki desu!
       EN: Hello! I'm good!
   
    2. JP: やあ、カオリ！会えて嬉しいよ！
       RM: Yaa, Kaori! Aete ureshii yo!
       EN: Hey, Kaori! Happy to see you!
   
    3. JP: 疲れたよ。長いフライトだった。
       RM: Tsukareta yo. Nagai furaito datta.
       EN: I'm tired. It was a long flight.

4. KAORI (default, position: center):
JP: 元気で何よりです！東京へようこそ！
RM: Genki de nani yori desu! Tokyo e yōkoso!
EN: I'm glad you're well! Welcome to Tokyo!

5. KAORI (thinking, position: center):
JP: さあ、ホテルに行きましょうか？荷物を持ちましょうか？
RM: Saa, hoteru ni ikimashou ka? Nimotsu wo mochimashou ka?
EN: Now, shall we go to the hotel? Shall I help with your luggage?

6. [PLAYER RESPONSE OPTIONS]
    1. JP: はい、ホテルに行きましょう。ありがとう。
       RM: Hai, hoteru ni ikimashou. Arigatou.
       EN: Yes, let's go to the hotel. Thank you.
   
    2. JP: 荷物は自分で持てます。早く行きましょう。
       RM: Nimotsu wa jibun de motemasu. Hayaku ikimashou.
       EN: I can carry my luggage myself. Let's go quickly.

7. KAORI (default):
JP: わかりました。では、行きましょう！
RM: Wakarimashita. Dewa, ikimashou!
EN: I understand. Well then, let's go!
```

### 1.2 Inside Train
**File:** `phaser_game/src/data/conversations/inside_train.ts`
**Characters:** Player, Kaori
**Scene Setting:** Inside a Tokyo commuter train

```
1. NARRATION:
JP: 電車に乗りました。窓の外には東京の景色が流れています。
RM: Densha ni norimashita. Mado no soto niwa Tokyo no keshiki ga nagarete imasu.
EN: You boarded the train. The Tokyo landscape flows outside the window.

2. KAORI (default, position: right):
JP: 日本に来るのは初めてですか？
RM: Nihon ni kuru no wa hajimete desu ka?
EN: Is this your first time coming to Japan?

3. [PLAYER RESPONSE OPTIONS]
    1. JP: はい、初めてです。とても楽しみにしていました。
       RM: Hai, hajimete desu. Totemo tanoshimi ni shite imashita.
       EN: Yes, it's my first time. I was really looking forward to it.
   
    2. JP: いいえ、二回目です。前は大阪に行きました。
       RM: Iie, ni-kaime desu. Mae wa Osaka ni ikimashita.
       EN: No, it's my second time. I went to Osaka before.

4. KAORI (surprised, position: center):
JP: そうですか！では、色々な場所を案内します。東京は大きいですよ。
RM: Sou desu ka! Dewa, iroirona basho wo annai shimasu. Tokyo wa ookii desu yo.
EN: I see! Then, I'll show you various places. Tokyo is big, you know.

5. KAORI (thinking, position: center):
JP: 東京では電車がとても便利です。地下鉄や山手線を使うと、どこでも行けますよ。
RM: Tokyo dewa densha ga totemo benri desu. Chikatetsu ya Yamanote-sen wo tsukau to, doko demo ikemasu yo.
EN: Trains are very convenient in Tokyo. If you use the subway or Yamanote Line, you can go anywhere.

6. KAORI (default, position: center):
JP: あなたの国では、どんな交通手段をよく使いますか？
RM: Anata no kuni dewa, donna kōtsū shudan wo yoku tsukaimasu ka?
EN: In your country, what kind of transportation do you often use?

7. [PLAYER RESPONSE OPTIONS]
    1. JP: 車をよく使います。公共交通機関は少ないです。
       RM: Kuruma wo yoku tsukaimasu. Kōkyō kōtsū kikan wa sukunai desu.
       EN: I often use a car. Public transportation is limited.
   
    2. JP: バスや電車をよく使います。でも、日本ほど便利ではありません。
       RM: Basu ya densha wo yoku tsukaimasu. Demo, Nihon hodo benri dewa arimasen.
       EN: I often use buses and trains. But they're not as convenient as in Japan.

8. KAORI (default):
JP: あ、次の駅で降ります。ホテルはここから近いですよ。
RM: A, tsugi no eki de orimasu. Hoteru wa koko kara chikai desu yo.
EN: Oh, we'll get off at the next station. The hotel is close from here.
```

### 2.1 Outside Restaurant
**File:** `phaser_game/src/data/conversations/outside_restaurant.ts`
**Characters:** Player, Kaori
**Scene Setting:** Outside a traditional Japanese restaurant

```
1. NARRATION:
JP: カオリさんと一緒にレストランに到着しました。看板には「和食処 さくら」と書いてあります。
RM: Kaori-san to issho ni resutoran ni tōchaku shimashita. Kanban niwa "Washoku-dokoro Sakura" to kaite arimasu.
EN: You arrived at the restaurant with Kaori. The sign says "Japanese Restaurant Sakura".

2. KAORI (default, position: left):
JP: このレストランは日本の伝統的な料理が食べられますよ。和食は好きですか？
RM: Kono resutoran wa Nihon no dentō-teki na ryōri ga taberaremasu yo. Washoku wa suki desu ka?
EN: You can eat traditional Japanese cuisine at this restaurant. Do you like Japanese food?

3. [PLAYER RESPONSE OPTIONS]
    1. JP: 少し食べたことがあります。寿司は知っていますが、他の料理はよく分かりません。
       RM: Sukoshi tabeta koto ga arimasu. Sushi wa shitte imasu ga, hoka no ryōri wa yoku wakarimasen.
       EN: I've eaten it a little. I know about sushi, but I don't know much about other dishes.
   
    2. JP: 実は、あまり食べたことがありません。何がおすすめですか？
       RM: Jitsu wa, amari tabeta koto ga arimasen. Nani ga osusume desu ka?
       EN: Actually, I haven't eaten it much. What do you recommend?

4. KAORI (thinking):
JP: そうですね…初めてなら、定食がいいかもしれません。色々な料理が少しずつ食べられますよ。
RM: Sō desu ne... Hajimete nara, teishoku ga ii kamo shiremasen. Iroirona ryōri ga sukoshi zutsu taberaremasu yo.
EN: Let's see... For a first time, a set meal might be good. You can try various dishes in small portions.

5. KAORI (default):
JP: 入りましょうか？今はちょうどランチタイムなので、混んでいるかもしれませんよ。
RM: Hairimashou ka? Ima wa chōdo ranchi-taimu nanode, konde iru kamo shiremasen yo.
EN: Shall we go in? It might be crowded now since it's lunchtime.

6. [PLAYER RESPONSE OPTIONS]
    1. JP: はい、入りましょう。お腹が空きました。
       RM: Hai, hairimashou. Onaka ga sukimashita.
       EN: Yes, let's go in. I'm hungry.
   
    2. JP: 混んでいるかもしれませんが、大丈夫です。ぜひ入りましょう。
       RM: Konde iru kamo shiremasen ga, daijōbu desu. Zehi hairimashou.
       EN: It might be crowded, but that's okay. Let's definitely go in.

7. KAORI (default):
JP: じゃあ、入りましょう。「いらっしゃいませ」と言われたら、「よろしくお願いします」と答えてみてください。
RM: Jaa, hairimashou. "Irasshaimase" to iwaretara, "Yoroshiku onegaishimasu" to kotaete mite kudasai.
EN: Well then, let's go in. When they say "Welcome", try responding with "Pleased to meet you".
```

### 2.2 Inside Restaurant
**File:** `phaser_game/src/data/conversations/inside_restaurant.ts`
**Characters:** Player, Kaori, Waitress
**Scene Setting:** Inside a traditional Japanese restaurant

```
1. NARRATION:
JP: レストランの中は賑やかですが、伝統的な日本の雰囲気があります。壁には美しい浮世絵が飾られています。
RM: Resutoran no naka wa nigiyaka desu ga, dentō-teki na Nihon no fun'iki ga arimasu. Kabe ni wa utsukushii ukiyo-e ga kazararete imasu.
EN: The inside of the restaurant is lively but has a traditional Japanese atmosphere. Beautiful ukiyo-e paintings are displayed on the walls.

2. WAITRESS (default, position: right):
JP: いらっしゃいませ。お二人様ですか？
RM: Irasshaimase. O-futari-sama desu ka?
EN: Welcome. Table for two?

3. KAORI (default, position: left):
JP: はい、二人です。窓際の席はありますか？
RM: Hai, futari desu. Madogiwa no seki wa arimasu ka?
EN: Yes, two people. Is there a seat by the window?

4. WAITRESS (default):
JP: はい、ございます。こちらへどうぞ。
RM: Hai, gozaimasu. Kochira e dōzo.
EN: Yes, we have one. This way please.

5. KAORI (default):
JP: メニューを見てみましょう。何が食べたいですか？
RM: Menyū o mite mimashou. Nani ga tabetai desu ka?
EN: Let's look at the menu. What would you like to eat?

6. [PLAYER RESPONSE OPTIONS]
    1. JP: 寿司が食べたいです。日本では本場の寿司を食べてみたかったんです。
       RM: Sushi ga tabetai desu. Nihon de wa honba no sushi o tabete mitakattan desu.
       EN: I want to eat sushi. I've been wanting to try authentic sushi in Japan.
   
    2. JP: おすすめは何ですか？日本料理に詳しくないので、アドバイスをください。
       RM: Osusume wa nan desu ka? Nihon ryōri ni kuwashikunai node, adobaisu o kudasai.
       EN: What do you recommend? I'm not familiar with Japanese cuisine, so please give me some advice.

7. KAORI (thinking):
JP: このお店は「和食御膳」が特に美味しいですよ。さっき話した定食のなかでも最高級です。それぞれの料理が丁寧に作られています。
RM: Kono omise wa "Washoku gozen" ga toku ni oishii desu yo. Sakki hanashita teishoku no naka demo saikō-kyū desu. Sorezore no ryōri ga teinei ni tsukurarete imasu.
EN: This restaurant's "Japanese Set Meal" is especially delicious. It's the premium version of the set meal I mentioned earlier. Each dish is carefully prepared.

8. KAORI (default):
JP: では、注文しましょう。「すみません」と言って店員さんを呼んでみてください。
RM: Dewa, chūmon shimashou. "Sumimasen" to itte ten'in-san o yonde mite kudasai.
EN: Well then, let's order. Try calling the server by saying "Excuse me".

9. [PLAYER RESPONSE OPTIONS]
    1. JP: すみません！
       RM: Sumimasen!
       EN: Excuse me!
   
    2. JP: 恥ずかしいです...あなたが呼んでもらえませんか？
       RM: Hazukashii desu... Anata ga yonde moraemasen ka?
       EN: I'm embarrassed... Could you call them instead?
```

### 3.1 Park Lawn
**File:** `phaser_game/src/data/conversations/park_lawn.ts`
**Characters:** Player, Kaori
**Scene Setting:** A spacious park with cherry blossoms

```
1. NARRATION:
JP: 公園に着きました。広い芝生と美しい木々が見えます。天気が良くて、多くの人が公園で楽しんでいます。
RM: Kōen ni tsukimashita. Hiroi shibafu to utsukushii kigi ga miemasu. Tenki ga yokute, ōku no hito ga kōen de tanoshinde imasu.
EN: You arrived at the park. You can see a wide lawn and beautiful trees. The weather is nice, and many people are enjoying the park.

2. KAORI (default, position: center):
JP: この公園は四季折々の景色が楽しめますよ。今は春なので、桜がきれいに咲いています。
RM: Kono kōen wa shiki oriori no keshiki ga tanoshimemasu yo. Ima wa haru nanode, sakura ga kirei ni saite imasu.
EN: You can enjoy the seasonal scenery in this park. It's spring now, so the cherry blossoms are beautifully in bloom.

3. [PLAYER RESPONSE OPTIONS]
    1. JP: 本当にきれいですね。日本の桜は世界的に有名ですよね。
       RM: Hontō ni kirei desu ne. Nihon no sakura wa sekai-teki ni yūmei desu yo ne.
       EN: It's really beautiful. Japanese cherry blossoms are famous worldwide, aren't they?
   
    2. JP: 日本の他の季節はどうですか？どの季節が一番好きですか？
       RM: Nihon no hoka no kisetsu wa dō desu ka? Dono kisetsu ga ichiban suki desu ka?
       EN: What about other seasons in Japan? Which season do you like the most?

4. KAORI (thinking):
JP: 桜は確かに素晴らしいですね。でも、私個人は秋が一番好きです。紅葉がとても美しいし、気温も快適です。日本の四季はそれぞれ魅力がありますよ。
RM: Sakura wa tashika ni subarashii desu ne. Demo, watashi kojin wa aki ga ichiban suki desu. Kōyō ga totemo utsukushii shi, kion mo kaiteki desu. Nihon no shiki wa sorezore miryoku ga arimasu yo.
EN: Cherry blossoms are certainly wonderful. But personally, I like autumn the most. The autumn leaves are very beautiful, and the temperature is comfortable. Each of Japan's four seasons has its own charm.

5. KAORI (default):
JP: この芝生の上で少し休みませんか？日本では「花見」といって、桜の下でピクニックをする習慣があります。
RM: Kono shibafu no ue de sukoshi yasumimasen ka? Nihon de wa "hanami" to itte, sakura no shita de pikunikku o suru shūkan ga arimasu.
EN: Shall we rest a bit on this lawn? In Japan, there's a custom called "hanami," which means having a picnic under the cherry blossoms.

6. [PLAYER RESPONSE OPTIONS]
    1. JP: いいですね。少し休みましょう。花見をしたことがないので、楽しみです。
       RM: Ii desu ne. Sukoshi yasumimashou. Hanami o shita koto ga nai node, tanoshimi desu.
       EN: That sounds good. Let's rest a bit. I've never done hanami before, so I'm looking forward to it.
   
    2. JP: 今日は歩き続けたいです。公園をもっと探検しませんか？
       RM: Kyō wa aruki tsudzuketai desu. Kōen o motto tanken shimasen ka?
       EN: I want to keep walking today. Shall we explore the park more?

7. KAORI (default):
JP: 日本人は自然との調和を大切にします。四季を通じて自然を楽しむ文化があります。季節ごとの行事や食べ物も特別なんですよ。
RM: Nihonjin wa shizen to no chōwa o taisetsu ni shimasu. Shiki o tōjite shizen o tanoshimu bunka ga arimasu. Kisetsu-goto no gyōji ya tabemono mo tokubetsu nan desu yo.
EN: Japanese people value harmony with nature. There is a culture of enjoying nature throughout the four seasons. Seasonal events and foods are also special.
```

### 3.2 Park Bench
**File:** `phaser_game/src/data/conversations/park_bench.ts`
**Characters:** Player, Kaori
**Scene Setting:** Park bench near a small pond

```
1. NARRATION:
JP: 公園のベンチに座りました。前には小さな池があり、鯉が泳いでいます。穏やかな時間が流れています。
RM: Kōen no benchi ni suwarimashita. Mae ni wa chiisana ike ga ari, koi ga oyoide imasu. Odayaka na jikan ga nagarete imasu.
EN: You sat down on a park bench. There's a small pond in front where koi fish are swimming. Time passes peacefully.

2. KAORI (relaxed, position: right):
JP: ここは静かで落ち着きますね。日本の都市部でも、こういった自然スポットがあるのはいいですね。
RM: Koko wa shizuka de ochitsukimasu ne. Nihon no toshi-bu demo, kō itta shizen supotto ga aru no wa ii desu ne.
EN: It's quiet and peaceful here. It's nice that there are natural spots like this even in Japanese urban areas.

3. [PLAYER RESPONSE OPTIONS]
    1. JP: そうですね。忙しい生活の中でこういう時間が必要ですね。
       RM: Sō desu ne. Isogashii seikatsu no naka de kō iu jikan ga hitsuyō desu ne.
       EN: That's right. We need time like this in the midst of our busy lives.
   
    2. JP: 日本の都市の中でもこんな静かな場所があるのは素晴らしいですね。
       RM: Nihon no toshi no naka demo konna shizuka na basho ga aru no wa subarashii desu ne.
       EN: It's wonderful that there are such quiet places even within Japanese cities.

4. KAORI (thinking):
JP: ここにいると思い出しますね。日本には「わび・さび」という美学的な概念があります。この池と古い石灯籠がそれを表していますよ。
RM: Koko ni iru to omoidashimasu ne. Nihon ni wa "wabi-sabi" to iu bigaku-teki na gainen ga arimasu. Kono ike to furui ishi-dōrō ga sore o arawashite imasu yo.
EN: Being here reminds me. In Japan, there's an aesthetic concept called "wabi-sabi". This pond and the old stone lanterns represent it.

5. [PLAYER RESPONSE OPTIONS]
    1. JP: わび・さびとは何ですか？もう少し説明していただけますか？
       RM: Wabi-sabi to wa nan desu ka? Mō sukoshi setsumei shite itadakemasu ka?
       EN: What is wabi-sabi? Could you explain it a little more?
   
    2. JP: この池の美しさは独特ですね。完璧ではないけれど、魅力的です。
       RM: Kono ike no utsukushisa wa dokutoku desu ne. Kanpeki dewa nai keredo, miryoku-teki desu.
       EN: The beauty of this pond is unique. It's not perfect, but it's charming.

6. KAORI (default):
JP: わび・さびは難しい概念ですが、簡単に言うと「不完全さの美しさ」です。「わび」は質素さや簡素さを、「さび」は年月を経た物の風合いや風情を表します。
RM: Wabi-sabi wa muzukashii gainen desu ga, kantan ni iu to "fukanzen-sa no utsukushisa" desu. "Wabi" wa shisso-sa ya kanso-sa o, "sabi" wa nengetsu o heta mono no fuai ya fūjō o arawashimasu.
EN: Wabi-sabi is a difficult concept, but simply put, it's "the beauty of imperfection". "Wabi" represents simplicity and modesty, while "sabi" expresses the patina and elegance that comes with age.

7. KAORI (thinking):
JP: 例えば、この古い灯籠は少し欠けていて完璧ではありませんが、それが時間の流れを感じさせ、美しいと思いませんか？新しく完璧なものより魅力的なことがあります。
RM: Tatoeba, kono furui dōrō wa sukoshi kakete ite kanpeki dewa arimasen ga, sore ga jikan no nagare o kanjisase, utsukushii to omoimasen ka? Atarashiku kanpeki na mono yori miryoku-teki na koto ga arimasu.
EN: For example, this old lantern is a bit chipped and not perfect, but doesn't that make you feel the passage of time, making it beautiful? Sometimes it's more appealing than something new and perfect.

8. KAORI (default):
JP: わび・さびは陶芸や庭園だけでなく、日本人の考え方にも影響しています。完璧を求めすぎるより、物事の自然な姿や年月による変化を受け入れる価値観です。
RM: Wabi-sabi wa tōgei ya teien dake denaku, Nihonjin no kangaekata ni mo eikyō shite imasu. Kanpeki o motome sugiru yori, monogoto no shizen na sugata ya nengetsu ni yoru henka o ukeireru kachi-kan desu.
EN: Wabi-sabi influences not only pottery and gardens but also Japanese thinking. Rather than seeking perfection, it's a value system that accepts the natural state of things and changes that come with time.

9. KAORI (default):
JP: このように、日本文化を理解するには、わび・さびのような美学的な概念も大切です。言葉で説明するのは難しいですが、この公園のような場所で感じることができますよ。
RM: Kono yō ni, Nihon bunka o rikai suru ni wa, wabi-sabi no yō na bigaku-teki na gainen mo taisetsu desu. Kotoba de setsumei suru no wa muzukashii desu ga, kono kōen no yō na basho de kanjiru koto ga dekimasu yo.
EN: As you can see, aesthetic concepts like wabi-sabi are important for understanding Japanese culture. It's difficult to explain in words, but you can feel it in places like this park.
```

### 4.1 Outside Mall
**File:** `phaser_game/src/data/conversations/outside_mall.ts`
**Characters:** Player, Kaori
**Scene Setting:** Entrance of a large shopping mall

```
1. NARRATION:
JP: 大きなショッピングモールの前に到着しました。入り口には、様々な店の広告が掲示されています。多くの人が行き来しています。
RM: Ōkina shoppingu mōru no mae ni tōchaku shimashita. Iriguchi ni wa, samazama na mise no kōkoku ga keiji sarete imasu. Ōku no hito ga ikikite imasu.
EN: You arrived in front of a large shopping mall. Various store advertisements are displayed at the entrance. Many people are coming and going.

2. KAORI (default, position: center):
JP: ここは市内で一番大きなショッピングモールです。レストラン、衣料品店、電化製品店など、色々なお店があります。
RM: Koko wa shinai de ichiban ōkina shoppingu mōru desu. Resutoran, iryōhinten, denka seihinten nado, iroiro na omise ga arimasu.
EN: This is the largest shopping mall in the city. There are various stores such as restaurants, clothing stores, electronics stores, and so on.

3. [PLAYER RESPONSE OPTIONS]
    1. JP: 買い物をしたいです。日本のお土産を探しています。
       RM: Kaimono o shitai desu. Nihon no omiyage o sagashite imasu.
       EN: I want to go shopping. I'm looking for Japanese souvenirs.
   
    2. JP: 日本のショッピングモールは、他の国と何が違いますか？
       RM: Nihon no shoppingu mōru wa, hoka no kuni to nani ga chigaimasu ka?
       EN: How are Japanese shopping malls different from those in other countries?

4. KAORI (thinking):
JP: 日本のモールは清潔で、サービスが良いですね。また、地下に大きな食品売り場があるのが特徴的です。デパ地下と呼ばれています。
RM: Nihon no mōru wa seiketsu de, sābisu ga ii desu ne. Mata, chika ni ōkina shokuhin uriba ga aru no ga tokuchō-teki desu. Depachika to yobarete imasu.
EN: Japanese malls are clean and have good service. Also, a characteristic feature is that they have large food markets in the basement. They're called "depachika".

5. KAORI (default):
JP: お土産をお探しでしたら、このモールの5階に「ジャパン・トラディション」というお店があります。伝統的な日本のお土産が揃っていますよ。
RM: Omiyage o osagashi deshitara, kono mōru no go-kai ni "Japan Tradition" to iu omise ga arimasu. Dentō-teki na Nihon no omiyage ga sorotte imasu yo.
EN: If you're looking for souvenirs, there's a store called "Japan Tradition" on the 5th floor of this mall. They have a variety of traditional Japanese souvenirs.

6. [PLAYER RESPONSE OPTIONS]
    1. JP: ぜひそのお店に行きたいです。どんな商品が人気ですか？
       RM: Zehi sono omise ni ikitai desu. Donna shōhin ga ninki desu ka?
       EN: I definitely want to go to that store. What kinds of products are popular?
   
    2. JP: 他に行くべき場所はありますか？日本らしい買い物体験をしたいです。
       RM: Hoka ni ikubeki basho wa arimasu ka? Nihon-rashii kaimono taiken o shitai desu.
       EN: Are there other places I should go? I want to have a typically Japanese shopping experience.

7. KAORI (default):
JP: 人気の商品は、手ぬぐい、扇子、和柄の小物、陶器などですね。あと、日本のお菓子も外国人観光客に人気があります。
RM: Ninki no shōhin wa, tenugui, sensu, wagara no komono, tōki nado desu ne. Ato, Nihon no okashi mo gaikokujin kankōkyaku ni ninki ga arimasu.
EN: Popular items include tenugui (hand towels), folding fans, Japanese pattern accessories, pottery, and so on. Also, Japanese sweets are popular with foreign tourists.

8. KAORI (default):
JP: さて、中に入りましょうか？モールの中は広いので、どこか特に見たいところはありますか？
RM: Sate, naka ni hairimashou ka? Mōru no naka wa hiroi node, doko ka toku ni mitai tokoro wa arimasu ka?
EN: Well then, shall we go inside? The mall is quite large, is there anywhere in particular you'd like to see?

9. [PLAYER RESPONSE OPTIONS]
    1. JP: まず買い物をしましょう。色々なお店を見てみたいです。
       RM: Mazu kaimono o shimashou. Iroiro na omise o mite mitai desu.
       EN: Let's shop first. I'd like to look around at the different stores.
   
    2. JP: 特に決まっていません。カオリさんのおすすめの場所を教えてください。
       RM: Toku ni kimatte imasen. Kaori-san no osusume no basho o oshiete kudasai.
       EN: I haven't decided on anything specific. Please tell me about places you recommend, Kaori.
```

### 4.2 Handbag Store
**File:** `phaser_game/src/data/conversations/clothing_store.ts`
**Characters:** Player, Kaori, Shopkeeper
**Scene Setting:** Upscale handbag specialty store with various designs

```
1. NARRATION:
JP: バッグ専門店に入りました。店内には様々なデザインや素材のバッグが陳列されています。シンプルで洗練されたデザインが多いようです。
RM: Baggu senmonten ni hairimashita. Tennai ni wa samazama na dezain ya sozai no baggu ga chinretsu sarete imasu. Shinpuru de senren sareta dezain ga ōi yō desu.
EN: You entered a handbag specialty store. Various designs and materials of bags are displayed inside. There seem to be many simple and refined designs.

2. SHOPKEEPER (default, position: right):
JP: いらっしゃいませ！何かお探しですか？
RM: Irasshaimase! Nanika osagashi desu ka?
EN: Welcome! Are you looking for something?

3. KAORI (excited, position: left):
JP: はい、私は新しいバッグを探しています。日常使いできるシンプルなものが欲しいのですが。
RM: Hai, watashi wa atarashii baggu o sagashite imasu. Nichijō tsukai dekiru shinpuru na mono ga hoshii no desu ga.
EN: Yes, I'm looking for a new handbag. I want something simple that I can use for everyday purposes.

4. SHOPKEEPER (default):
JP: かしこまりました。こちらの商品はいかがでしょうか？日本製のレザーを使った定番デザインです。軽くて丈夫で、長く使っていただけます。こちらは黒と茶色がございます。
RM: Kashikomarimashita. Kochira no shōhin wa ikaga deshou ka? Nihon-sei no rezā o tsukatta teiban dezain desu. Karukute jōbu de, nagaku tsukatte itadakemasu. Kochira wa kuro to chairo ga gozaimasu.
EN: Certainly. How about this item? It's a classic design using Japanese leather. It's light, durable, and will last a long time. We have it in black and brown.

5. [PLAYER RESPONSE OPTIONS]
    1. JP: 黒の方が素敵だと思います。シンプルで使いやすそうですね。
       RM: Kuro no hō ga suteki da to omoimasu. Shinpuru de tsukaiyasusō desu ne.
       EN: I think the black one is nicer. It seems simple and easy to use.
   
    2. JP: そのバッグは少し大きいですね。もっと小さいものはありますか？
       RM: Sono baggu wa sukoshi ōkii desu ne. Motto chiisai mono wa arimasu ka?
       EN: That bag seems a bit large. Do you have something smaller?

6. KAORI (thinking):
JP: そうですね、黒のほうが私には似合うかもしれません。でも、サイズも考えなくては。小さすぎると使いづらいし、大きすぎると重いですよね。
RM: Sō desu ne, kuro no hō ga watashi ni wa niau kamo shiremasen. Demo, saizu mo kangaenakereba. Chiisasugiru to tsukai-zurai shi, ōkisugiru to omoi desu yo ne.
EN: I see, the black one might suit me better. But I need to consider the size too. If it's too small, it'll be hard to use, and if it's too big, it'll be heavy.

7. [PLAYER RESPONSE OPTIONS]
    1. JP: 中くらいのサイズがいいと思います。普段使いにちょうどいいですよ。
       RM: Chū kurai no saizu ga ii to omoimasu. Fudan-tsukai ni chōdo ii desu yo.
       EN: I think a medium size would be good. It's just right for everyday use.
   
    2. JP: 値段はいくらですか？品質と価格のバランスも大切ですね。
       RM: Nedan wa ikura desu ka? Hinshitsu to kakaku no baransu mo taisetsu desu ne.
       EN: How much does it cost? The balance between quality and price is important too.

8. SHOPKEEPER (default):
JP: こちらの中サイズのバッグは18,500円です。質の高い革を使っており、手作りのため一つ一つ表情が異なります。長く使えるので、コストパフォーマンスは良いと思いますよ。
RM: Kochira no chū saizu no baggu wa ichiman-hassen-gohyaku en desu. Shitsu no takai kawa o tsukatte ori, te-tsukuri no tame hitotsu hitotsu hyōjō ga kotonari masu. Nagaku tsukaeru node, kosuto pafōmansu wa yoi to omoimasu yo.
EN: This medium-sized bag is 18,500 yen. It uses high-quality leather and since it's handmade, each one has a slightly different appearance. Since it will last a long time, I think the cost performance is good.

9. KAORI (happy):
JP: 黒の中サイズにします！長く使えるものを買いたかったので、ちょうどいいですね。日本の物は品質が良くて本当に素晴らしいです。
RM: Kuro no chū saizu ni shimasu! Nagaku tsukaeru mono o kaitakatta node, chōdo ii desu ne. Nihon no mono wa hinshitsu ga yokute hontō ni subarashii desu.
EN: I'll take the black medium size! Since I wanted something that would last a long time, this is perfect. Japanese products have such good quality, they're really wonderful.

10. [PLAYER RESPONSE OPTIONS]
    1. JP: いい選択だと思います。シンプルで上品なデザインですね。
       RM: Ii sentaku da to omoimasu. Shinpuru de jōhin na dezain desu ne.
       EN: I think it's a good choice. It has a simple and elegant design.
   
    2. JP: 素敵なバッグですね。特別な日のためのプレゼントにもいいと思います。
       RM: Suteki na baggu desu ne. Tokubetsu na hi no tame no purezento ni mo ii to omoimasu.
       EN: It's a lovely bag. I think it would also make a good gift for a special day.

11. SHOPKEEPER (happy):
JP: ありがとうございます。ラッピングはいかがいたしましょうか？プレゼント用や自分用で包装紙の種類も選べますよ。また、当店のポイントカードもございます。
RM: Arigatō gozaimasu. Rappingu wa ikaga itashimashou ka? Purezento-yō ya jibun-yō de hōsō-shi no shurui mo erabemasu yo. Mata, tōten no pointo kādo mo gozaimasu.
EN: Thank you very much. How would you like it wrapped? You can choose different types of wrapping paper for gifts or personal use. Also, we have a store point card.

12. KAORI (default):
JP: 普通の包装で大丈夫です。ポイントカードもぜひお願いします。日本のお店はサービスが本当に素晴らしいですね。
RM: Futsū no hōsō de daijōbu desu. Pointo kādo mo zehi onegai shimasu. Nihon no omise wa sābisu ga hontō ni subarashii desu ne.
EN: Regular wrapping is fine. I'd definitely like a point card too. Japanese stores really have wonderful service.
```

### 5.1 Hotel Lobby
**File:** `phaser_game/src/data/conversations/hotel_lobby.ts`
**Characters:** Player
**Scene Setting:** Hotel lobby in the evening

```
1. NARRATION:
JP: ホテルのロビーに到着しました。長い一日でしたが、とても楽しかったです。日本について多くのことを学びました。
RM: Hoteru no robī ni tōchaku shimashita. Nagai ichinichi deshita ga, totemo tanoshikatta desu. Nihon ni tsuite ōku no koto o manabimashita.
EN: You arrived at the hotel lobby. It was a long day, but very enjoyable. You learned a lot about Japan.

2. NARRATION:
JP: 電車に乗って、おいしい食べ物を食べて、公園で友達に会いました。日本語もたくさん練習しました。
RM: Densha ni notte, oishii tabemono o tabete, kōen de tomodachi ni aimashita. Nihongo mo takusan renshū shimashita.
EN: You rode the train, ate delicious food, and met friends at the park. You also practiced a lot of Japanese.

3. NARRATION:
JP: 明日はどこに行きますか？もっと東京を探検したいです。日本語をもっと勉強しましょう。
RM: Ashita wa doko ni ikimasu ka? Motto Tokyo o tanken shitai desu. Nihongo o motto benkyō shimashō.
EN: Where will you go tomorrow? You want to explore more of Tokyo. Let's study more Japanese.

4. [PLAYER RESPONSE OPTIONS]
    1. JP: 日記を書きます。「今日は楽しかったです。明日も楽しみです。」
       RM: Nikki o kakimasu. "Kyō wa tanoshikatta desu. Ashita mo tanoshimi desu."
       EN: I'll write in my diary. "Today was fun. I'm looking forward to tomorrow too."
   
    2. JP: 明日の計画を立てます。もっと日本語を練習したいです。
       RM: Ashita no keikaku o tatemasu. Motto nihongo o renshū shitai desu.
       EN: I'll make plans for tomorrow. I want to practice more Japanese.
   
    3. JP: 疲れました。すぐに寝ます。おやすみなさい。
       RM: Tsukaremashita. Sugu ni nemasu. Oyasuminasai.
       EN: I'm tired. I'll sleep right away. Good night.

5. NARRATION:
JP: 今日は素晴らしい一日でした。日本語を学ぶのは大変ですが、とても面白いです。明日はきっともっと上手になるでしょう。おやすみなさい。
RM: Kyō wa subarashii ichinichi deshita. Nihongo o manabu no wa taihen desu ga, totemo omoshiroi desu. Ashita wa kitto motto jōzu ni naru deshō. Oyasuminasai.
EN: Today was a wonderful day. Learning Japanese is challenging, but very interesting. Tomorrow you'll surely get better. Good night.
```

## Conclusion

This document provides a comprehensive overview of all the dialog scripts used in our Japanese learning visual novel game. Each scene's conversation is presented in a script-like format that makes it easy to review and edit. The organized structure allows for consistent modifications across various aspects:

1. **Language accuracy** - Ensuring Japanese text is natural and appropriate
2. **Educational value** - Highlighting important vocabulary and grammar points
3. **Cultural authenticity** - Presenting Japanese customs accurately
4. **Character consistency** - Maintaining each character's unique speech patterns
5. **Learning progression** - Building vocabulary and grammar knowledge gradually

When making changes to these dialog scripts, editors can easily refer to the corresponding TypeScript files where the changes will need to be applied. This workspace document serves as an editable reference that can be modified collaboratively before implementing changes in the actual game code.

The fallback dialog system ensures that even when the LLM cannot generate custom dialog, players will still experience engaging, educational, and culturally authentic conversations throughout their Japanese learning journey. 