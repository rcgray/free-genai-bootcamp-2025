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

- **4.2 Clothing Store** - File: `phaser_game/src/data/conversations/clothing_store.ts`
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
   
    2. JP: ちょっと待って。お土産を買いたいんですが。
       RM: Chotto matte. Omiyage wo kaitai no desu ga.
       EN: Wait a moment. I'd like to buy some souvenirs.

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
    1. JP: はい、大好きです！特に寿司や天ぷらが好きです。
       RM: Hai, daisuki desu! Tokuni sushi ya tenpura ga suki desu.
       EN: Yes, I love it! I especially like sushi and tempura.
   
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
   
    2. JP: 少し待ちましょうか？混雑が落ち着くまで。
       RM: Sukoshi machimashou ka? Konzatsu ga ochitsuku made.
       EN: Shall we wait a bit? Until the crowd settles down.

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
JP: そうですね。初めてなら、「和食御膳」がいいと思います。これは色々な和食が少しずつ楽しめるセットです。
RM: Sō desu ne. Hajimete nara, "Washoku gozen" ga ii to omoimasu. Kore wa iroiro na washoku ga sukoshi zutsu tanoshimeru setto desu.
EN: Let me see. For your first time, I think the "Japanese Set Meal" would be good. This is a set where you can enjoy various Japanese dishes in small portions.

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
JP: 私は秋が一番好きです。紅葉がとても美しいし、気温も快適です。夏は暑すぎて、冬は寒すぎると思います。
RM: Watashi wa aki ga ichiban suki desu. Kōyō ga totemo utsukushii shi, kion mo kaiteki desu. Natsu wa atsusugite, fuyu wa samusugiru to omoimasu.
EN: I like autumn the most. The autumn leaves are very beautiful, and the temperature is comfortable. I think summer is too hot and winter is too cold.

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
JP: 日本人は自然との調和を大切にします。四季を通じて自然を楽しむ文化があります。「わび・さび」という美学もあります。
RM: Nihonjin wa shizen to no chōwa o taisetsu ni shimasu. Shiki o tōjite shizen o tanoshimu bunka ga arimasu. "Wabi-sabi" to iu bigaku mo arimasu.
EN: Japanese people value harmony with nature. There is a culture of enjoying nature throughout the four seasons. There is also an aesthetic called "wabi-sabi".
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
   
    2. JP: カオリさんは休みの日は何をするのが好きですか？
       RM: Kaori-san wa yasumi no hi wa nani o suru no ga suki desu ka?
       EN: What do you like to do on your days off, Kaori?

4. KAORI (thinking):
JP: 私は読書が好きです。あとは、時々写真を撮ったり、友達と買い物に行ったりします。あなたは？
RM: Watashi wa dokusho ga suki desu. Ato wa, tokidoki shashin o tottari, tomodachi to kaimono ni ittari shimasu. Anata wa?
EN: I like reading. Also, I sometimes take photos and go shopping with friends. How about you?

5. [PLAYER RESPONSE OPTIONS]
    1. JP: 私は音楽を聴くことと、料理をすることが好きです。日本料理にも興味があります。
       RM: Watashi wa ongaku o kiku koto to, ryōri o suru koto ga suki desu. Nihon ryōri ni mo kyōmi ga arimasu.
       EN: I like listening to music and cooking. I'm also interested in Japanese cuisine.
   
    2. JP: どんな本を読むのが好きですか？おすすめの日本の作家はいますか？
       RM: Donna hon o yomu no ga suki desu ka? Osusume no Nihon no sakka wa imasu ka?
       EN: What kind of books do you like to read? Do you have any recommended Japanese authors?

6. KAORI (default):
JP: 村上春樹が好きです。「ノルウェイの森」は有名な小説です。あとは、川端康成も古典的で素晴らしいです。
RM: Murakami Haruki ga suki desu. "Norway no Mori" wa yūmei na shōsetsu desu. Ato wa, Kawabata Yasunari mo koten-teki de subarashii desu.
EN: I like Haruki Murakami. "Norwegian Wood" is a famous novel. Also, Yasunari Kawabata is classic and wonderful.

7. KAORI (default):
JP: 日本人の日常生活について知りたいことはありますか？仕事や学校のことなど、何でも聞いてください。
RM: Nihonjin no nichijō seikatsu ni tsuite shiritai koto wa arimasu ka? Shigoto ya gakkō no koto nado, nan demo kiite kudasai.
EN: Is there anything you'd like to know about Japanese people's daily lives? Please feel free to ask about work, school, or anything else.

8. [PLAYER RESPONSE OPTIONS]
    1. JP: 日本人の仕事の生活について教えてください。残業は本当に多いですか？
       RM: Nihonjin no shigoto no seikatsu ni tsuite oshiete kudasai. Zangyō wa hontō ni ōi desu ka?
       EN: Please tell me about Japanese working life. Is overtime really common?
   
    2. JP: 日本人は休日に何をして過ごすことが多いですか？人気のある趣味は何ですか？
       RM: Nihonjin wa kyūjitsu ni nani o shite sugosu koto ga ōi desu ka? Ninki no aru shumi wa nan desu ka?
       EN: What do Japanese people often do on their days off? What are popular hobbies?
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
JP: 人気の商品は、手ぬぐい、扇子、和柄の小物、陶器などですね。あと、日本のお菓子も外国人観光客に人気があります。東京ばな奈とか。
RM: Ninki no shōhin wa, tenugui, sensu, wagara no komono, tōki nado desu ne. Ato, Nihon no okashi mo gaikokujin kankōkyaku ni ninki ga arimasu. Tokyo Banana toka.
EN: Popular items include tenugui (hand towels), folding fans, Japanese pattern accessories, pottery, and so on. Also, Japanese sweets are popular with foreign tourists. Things like Tokyo Banana.

8. KAORI (default):
JP: さて、中に入りますか？それとも、まず食事をしますか？地下のフードコートもおすすめですよ。
RM: Sate, naka ni hairimasu ka? Soretomo, mazu shokuji o shimasu ka? Chika no fūdo kōto mo osusume desu yo.
EN: Well then, shall we go inside? Or would you like to eat first? The food court in the basement is also recommended.

9. [PLAYER RESPONSE OPTIONS]
    1. JP: まず買い物をしましょう。5階の「ジャパン・トラディション」に行きたいです。
       RM: Mazu kaimono o shimashou. Go-kai no "Japan Tradition" ni ikitai desu.
       EN: Let's shop first. I want to go to "Japan Tradition" on the 5th floor.
   
    2. JP: 先に食事をしたいです。フードコートがいいですね。
       RM: Saki ni shokuji o shitai desu. Fūdo kōto ga ii desu ne.
       EN: I'd like to eat first. The food court sounds good.
```

### 4.2 Clothing Store
**File:** `phaser_game/src/data/conversations/clothing_store.ts`
**Characters:** Player, Kaori, Shopkeeper
**Scene Setting:** Modern clothing store with traditional Japanese items

```
1. NARRATION:
JP: 洋服店に入りました。店内には様々なスタイルの服が並んでいます。若い女性向けのファッションが多いようです。
RM: Yōfukuten ni hairimashita. Tennai ni wa samazama na sutairu no fuku ga narabinde imasu. Wakai josei muke no fasshon ga ōi yō desu.
EN: You entered a clothing store. Various styles of clothes are displayed inside. There seems to be a lot of fashion for young women.

2. SHOPKEEPER (default, position: right):
JP: いらっしゃいませ！何かお探しですか？
RM: Irasshaimase! Nanika osagashi desu ka?
EN: Welcome! Are you looking for something?

3. KAORI (default, position: left):
JP: 友達は日本の服に興味があります。何かおすすめはありますか？
RM: Tomodachi wa Nihon no fuku ni kyōmi ga arimasu. Nanika osusume wa arimasu ka?
EN: My friend is interested in Japanese clothes. Do you have any recommendations?

4. SHOPKEEPER (default):
JP: もちろん！こちらの浴衣はいかがですか？夏祭りなどに着るのにぴったりです。または、この和柄のTシャツも人気がありますよ。
RM: Mochiron! Kochira no yukata wa ikaga desu ka? Natsu-matsuri nado ni kiru no ni pittari desu. Mata wa, kono wagara no T-shatsu mo ninki ga arimasu yo.
EN: Of course! How about this yukata? It's perfect for wearing to summer festivals and such. Or, these T-shirts with Japanese patterns are also popular.

5. [PLAYER RESPONSE OPTIONS]
    1. JP: 浴衣に興味があります。試着できますか？
       RM: Yukata ni kyōmi ga arimasu. Shichaku dekimasu ka?
       EN: I'm interested in the yukata. Can I try it on?
   
    2. JP: 和柄のTシャツを見せてください。どんなデザインがありますか？
       RM: Wagara no T-shatsu o misete kudasai. Donna dezain ga arimasu ka?
       EN: Please show me the T-shirts with Japanese patterns. What designs do you have?

6. SHOPKEEPER (default):
JP: はい、こちらの浴衣は色々なサイズがございます。着方も簡単なタイプですので、外国の方でも着やすいですよ。試着室はこちらです。
RM: Hai, kochira no yukata wa iroiro na saizu ga gozaimasu. Kikata mo kantan na taipu desu node, gaikoku no kata demo kiyasui desu yo. Shichaku-shitsu wa kochira desu.
EN: Yes, we have this yukata in various sizes. It's an easy-to-wear type, so it's easy for foreigners to wear too. The fitting room is this way.

7. KAORI (default):
JP: 浴衣は夏の着物の一種です。花火大会や夏祭りなどのイベントで着ることが多いです。帯の結び方も少し特別ですよ。
RM: Yukata wa natsu no kimono no isshu desu. Hanabi taikai ya natsu-matsuri nado no ibento de kiru koto ga ōi desu. Obi no musubikata mo sukoshi tokubetsu desu yo.
EN: A yukata is a type of summer kimono. It's often worn at events like fireworks displays and summer festivals. The way to tie the obi belt is also a bit special.

8. [PLAYER RESPONSE OPTIONS]
    1. JP: 素敵ですね！試着してみたいです。着方を教えていただけますか？
       RM: Suteki desu ne! Shichaku shite mitai desu. Kikata o oshiete itadakemasu ka?
       EN: That's lovely! I'd like to try it on. Could you please teach me how to wear it?
   
    2. JP: とても興味深いです。値段はいくらですか？
       RM: Totemo kyōmi-bukai desu. Nedan wa ikura desu ka?
       EN: That's very interesting. How much does it cost?

9. SHOPKEEPER (default):
JP: この浴衣のセットは12,800円です。浴衣、帯、下駄がセットになっています。外国人のお客様には、税金が免除されますので、パスポートをご提示ください。
RM: Kono yukata no setto wa ichiman-ni-sen-happyaku en desu. Yukata, obi, geta ga setto ni natte imasu. Gaikokujin no o-kyaku-sama ni wa, zeikin ga menjo saremasu node, pasupōto o go-teiji kudasai.
EN: This yukata set is 12,800 yen. It includes the yukata, obi belt, and geta sandals. For foreign customers, tax is exempted, so please show your passport.
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