# Japanese Conversation Game

## Overview
You are an American traveling for the first time to Japan. You get off the plane in Tokyo and meet your long-time friend Kaori, who is a native Japanese woman. She is excited to see you and introduce you to Japan. Along the way, she looks forward to teaching you some conversational Japanese by visiting various locations around Tokyo.

Along the way, Kaori will teach you some conversational Japanese as you travel on a train (1. Train Station), order food in a restaurant (2. Restaurant), visit a park with her friends(3. Park), go shopping in a mall (4. Shopping Mall), and finally retire to your hotel (5. Hotel) to rest and end the adventure.

## Game Flow and Mechanics

### Scene Structure
Each location will follow this general structure:
1. **Background Introduction**: Brief narration setting the scene (implemented as a dialog with isNarration=true)
2. **Character Dialog**: Conversation with characters in the scene
3. **Learning Moment**: Introduction of new Japanese phrases with explanations
4. **Player Choices**: 2-3 options that affect the conversation style but not the overall narrative flow
5. **Study Opportunity**: Option to study specific phrases from the conversation
6. **Transition**: Move to the next scene or location

### Player Interaction
- **Dialog Advancement**: Click/tap to advance dialog
- **Choices**: Select from multiple options to express different responses (Note: choices do not create branching narratives, they are expressive rather than consequential)
- **Study Mode**: Click on highlighted Japanese phrases to enter Study Mode
- **Settings**: Access language difficulty settings from the menu

### Difficulty Levels
- **Beginner**: All Japanese text has furigana, with romaji pronunciation and English translations
- **Intermediate**: Common kanji without furigana, some context-only Japanese
- **Advanced**: Minimal assistance, natural Japanese conversation

## Locations
These are the locations that you will visit, traveling from one to the next. When the player reaches the end of the list, the game will end.

### 1. Train Station
  - Overview: You first meet Kaori at the station (Train Station Location) in Narita Airport and take a train to Tokyo Station.
  - Events:
    - 1.1 Train Platform [Image: `locations/train_platform.png`]
      - Characters: [Kaori]
      - Greet Kaori
      - Buy a train ticket
      - **Dialog Example**:
        ```
        Kaori: [Default] こんにちは！久しぶり！元気？ (Konnichiwa! Hisashiburi! Genki?)
        [Translation: Hello! Long time no see! How are you?]
        
        Player Choice:
        1. こんにちは！元気です！(Konnichiwa! Genki desu!) [Hello! I'm good!]
        2. やあ、カオリ！会えて嬉しいよ！(Yaa, Kaori! Aete ureshii yo!) [Hey, Kaori! Happy to see you!]
        3. 疲れたよ。長いフライトだった。(Tsukareta yo. Nagai furaito datta.) [I'm tired. It was a long flight.]
        ```
      - **Learning Points**: 
        - Greeting: こんにちは (Konnichiwa) - Hello
        - Long time no see: 久しぶり (Hisashiburi)
        - How are you: 元気？ (Genki?)
    - 1.2 Inside Train [Image: `locations/inside_train.png`]
      - Characters: [Kaori]
      - Learn about trains in Tokyo
      - **Dialog Example**:
        ```
        Kaori: [Thinking] 山手線は東京の主要な駅を回る電車です。(Yamanote-sen wa Tokyo no shuyō na eki wo mawaru densha desu.)
        [Translation: The Yamanote Line is a train that goes around the major stations in Tokyo.]
        
        Player Choice:
        1. 渋谷に行きたいです。(Shibuya ni ikitai desu.) [I want to go to Shibuya.]
        2. 東京の電車システムは複雑ですね。(Tokyo no densha shisutemu wa fukuzatsu desu ne.) [Tokyo's train system is complicated, isn't it?]
        3. 山手線は何色ですか？(Yamanote-sen wa nani-iro desu ka?) [What color is the Yamanote Line?]
        ```
      - **Learning Points**:
        - Train: 電車 (Densha)
        - Station: 駅 (Eki)
        - Line: 線 (Sen)
  - Conversational Objectives:
    - Informal greetings (e.g., Hi, Hello, How are you?)
    - Travel, train, and station vocabulary (e.g., Yamanote line, Shinkansen, Tokyo Station)
    - Districts in Tokyo (e.g., Shibuya, Shinjuku, etc.)
    - Directions (e.g., Shinjuku is west, Tokyo Station is east, Shinagawa is south)
  - Transition:
    - After boarding the train, Kaori mentions that she is hungry and suggests visiting a restaurant (2.1 Outside Restaurant) when you arrive in Tokyo.
  - **Technical Implementation**:
    - Background images: train_platform.png, inside_train.png
    - Character positions: Kaori centered in both scenes
    - Audio: Train station ambience, train sounds

### 2. Restaurant
  - Overview: After arriving in Shibuya, Kaori takes you to a ramen restaurant to order your first meal in Japan.
  - Events:
    - 2.1 Outside Restaurant [Image: `locations/outside_restaurant.png`]
      - Characters: [Kaori]
      - Discuss Japanese cuisine
      - **Dialog Example**:
        ```
        Kaori: [Default] 日本料理の中で何が好きですか？(Nihon ryōri no naka de nani ga suki desu ka?)
        [Translation: What do you like among Japanese foods?]
        
        Player Choice:
        1. ラーメンが大好きです！(Rāmen ga daisuki desu!) [I love ramen!]
        2. 寿司を食べてみたいです。(Sushi wo tabete mitai desu.) [I want to try sushi.]
        3. 日本料理はあまり知りません。(Nihon ryōri wa amari shirimasen.) [I don't know much about Japanese food.]
        ```
      - **Learning Points**:
        - Japanese food: 日本料理 (Nihon ryōri)
        - I like: 好きです (Suki desu)
        - I want to try: 食べてみたい (Tabete mitai)
    - 2.2 Inside Restaurant [Image: `locations/inside_restaurant.png`]
      - Characters: [Kaori, Waitress]
      - Order a ramen dish
      - Pay for the meal, no tipping
      - **Dialog Example**:
        ```
        Waitress: [Default] いらっしゃいませ！(Irasshaimase!)
        [Translation: Welcome!]
        
        Kaori: [Thinking] ラーメンを注文しましょう。(Rāmen wo chūmon shimashō.)
        [Translation: Let's order ramen.]
        
        Player Choice:
        1. 醤油ラーメンをください。(Shōyu rāmen wo kudasai.) [Soy sauce ramen, please.]
        2. 何がおすすめですか？(Nani ga osusume desu ka?) [What do you recommend?]
        3. メニューを見せてください。(Menyū wo misete kudasai.) [Please show me the menu.]
        
        Waitress: [Default] かしこまりました。(Kashikomarimashita.)
        [Translation: Certainly, understood.]
        ```
      - **Learning Points**:
        - Please give me: をください (wo kudasai)
        - What do you recommend: 何がおすすめですか (Nani ga osusume desu ka)
        - Menu: メニュー (Menyū)
        - Certainly: かしこまりました (Kashikomarimashita)
  - Conversational Objectives:
    - Describing dishes and tastes (e.g., This ramen is good, this ramen is bad)
    - Having likes and dislikes (e.g., I don't like spicy food, I like sweet food)
    - Ordering food (e.g., I'd like a ramen, I'd like a cola)
    - Interacting with service staff (e.g., Asking for recommendations, placing an order)
    - Paying for the meal (e.g., I'll pay for the meal, I'll pay for the ramen)
    - Tipping culture (e.g., No tipping, tipping is not customary in Japan)
  - Transition:
    - After eating, Kaori suggests visiting a park (3.1 Park Lawn) to relax and meet up with her friends.
  - **Technical Implementation**:
    - Background images: outside_restaurant.png, inside_restaurant.png
    - Character positions: Kaori left side in outside scene, Kaori right side and Waitress left side in inside scene
    - Audio: Restaurant ambience, eating sounds

### 3. Park
  - Overview: After eating, you and Kaori meet up with her friends at a park.
  - Events:
    - 3.1 Park Lawn [Image: `locations/park_lawn.png`]
      - Characters: [Kaori, Takashi]
      - Meet Takashi
      - Discuss hobbies and sports
      - **Dialog Example**:
        ```
        Kaori: [Default] こちらは私の友達、タカシです。(Kochira wa watashi no tomodachi, Takashi desu.)
        [Translation: This is my friend, Takashi.]
        
        Takashi: [Default] はじめまして！(Hajimemashite!)
        [Translation: Nice to meet you!]
        
        Player Choice:
        1. はじめまして、タカシさん。(Hajimemashite, Takashi-san.) [Nice to meet you, Takashi.]
        2. カオリさんの友達ですか？(Kaori-san no tomodachi desu ka?) [Are you Kaori's friend?]
        3. 日本語を勉強しています。(Nihongo wo benkyō shite imasu.) [I'm studying Japanese.]
        ```
      - **Learning Points**:
        - This is: こちらは (Kochira wa)
        - Friend: 友達 (Tomodachi)
        - Nice to meet you: はじめまして (Hajimemashite)
    - 3.2 Park Bench [Image: `locations/park_bench.png`]
      - Characters: [Kaori]
      - Discuss seasons and weather
      - **Dialog Example**:
        ```
        Kaori: [Worried] 雨が降ってきましたね。(Ame ga futte kimashita ne.)
        [Translation: It's starting to rain, isn't it?]
        
        Player Choice:
        1. 傘を持っていますか？(Kasa wo motte imasu ka?) [Do you have an umbrella?]
        2. 日本の雨季ですか？(Nihon no uki desu ka?) [Is it Japan's rainy season?]
        3. 寒くなってきました。(Samuku natte kimashita.) [It's getting cold.]
        ```
      - **Learning Points**:
        - Rain: 雨 (Ame)
        - It's starting to: てきました (te kimashita)
        - Cold: 寒い (Samui)
  - Conversational Objectives:
    - Meeting new people (e.g., Nice to meet you)
    - Self-introduction (e.g., I'm from America, I'm a student)
    - Hobbies and interests (e.g., I like to play soccer, I like to play guitar)
    - Seasons and weather (e.g., It's cold/hot, it's raining/sunny)
  - Transition:
    - The weather becomes cold and rainy, so Kaori suggests going shopping at a nearby mall (4.1 Outside Mall).
  - **Technical Implementation**:
    - Background images: park_lawn.png, park_bench.png
    - Character positions: Kaori right, Takashi left side in lawn scene, Kaori on right side in bench scene
    - Audio: Park ambience, birds, rain starting

### 4. Shopping Mall
  - Overview: After the park, you and Kaori go shopping at a nearby mall.
  - Events:
    - 4.1 Outside Mall [Image: `locations/outside_mall.png`]
      - Characters: [Kaori]
      - Go inside the mall to get out of the rain
      - **Dialog Example**:
        ```
        Kaori: [Default] ショッピングモールに入りましょう。(Shoppingu mōru ni hairimashō.)
        [Translation: Let's go into the shopping mall.]
        
        Player Choice:
        1. いいですね。(Ii desu ne.) [That sounds good.]
        2. 何を買いたいですか？(Nani wo kaitai desu ka?) [What do you want to buy?]
        3. 雨宿りしましょう。(Amayadori shimashō.) [Let's take shelter from the rain.]
        ```
      - **Learning Points**:
        - Let's go into: に入りましょう (ni hairimashō)
        - Shopping mall: ショッピングモール (Shoppingu mōru)
        - Take shelter from rain: 雨宿り (Amayadori)
    - 4.2 Clothing Store [Image: `locations/clothing_store.png`]
      - Characters: [Kaori, Shopkeeper]
      - Discuss currency (yen vs. dollar)
      - Kaori buys a new handbag
      - **Dialog Example**:
        ```
        Shopkeeper: [Default] いらっしゃいませ！(Irasshaimase!)
        [Translation: Welcome!]
        
        Kaori: [Surprised] このバッグ、かわいいですね！いくらですか？(Kono baggu, kawaii desu ne! Ikura desu ka?)
        [Translation: This bag is cute! How much is it?]
        
        Shopkeeper: [Default] 5000円です。(Go-sen en desu.)
        [Translation: It's 5000 yen.]
        
        Player Choice:
        1. 5000円は何ドルですか？(Go-sen en wa nan doru desu ka?) [How many dollars is 5000 yen?]
        2. 素敵なバッグですね。(Suteki na baggu desu ne.) [It's a nice bag, isn't it?]
        3. 高いですね。(Takai desu ne.) [It's expensive, isn't it?]
        ```
      - **Learning Points**:
        - Welcome: いらっしゃいませ (Irasshaimase)
        - How much: いくら (Ikura)
        - Yen: 円 (En)
  - Conversational Objectives:
    - Discuss currency (e.g., yen vs. dollar)
    - Colors and physical descriptions (e.g., large, small, red, blue)
    - Product inquiries (e.g., Is this a good gift for my friend? Is this a good price?)
    - Time expressions (e.g., It's late/evening, we should go)
  - Transition:
    - After shopping, the rain stops, and Kaori wishes you farewell with a plan to meet the next day. You go to your hotel (5.1 Hotel Lobby) to rest.
  - **Technical Implementation**:
    - Background images: outside_mall.png, clothing_store.png
    - Character positions: Kaori left, Shopkeeper right in store scene
    - Audio: Mall ambience

### 5. Hotel
  - Overview: You go to your hotel to rest.
  - Events:
    - 5.1 Hotel Lobby [Image: `locations/hotel_lobby.png`]
      - Characters: []
      - Reflect on excitement to be in Japan and to learn more tomorrow
      - **Dialog Example**:
        ```
        Narration: 今日は楽しかったです。明日も日本語を勉強します。(Kyō wa tanoshikatta desu. Ashita mo nihongo wo benkyō shimasu.)
        [Translation: Today was fun. I'll study Japanese again tomorrow.]
        
        Player Choice:
        1. 日記を書く (Nikki wo kaku) [Write in journal]
        2. 明日の計画を立てる (Ashita no keikaku wo tateru) [Make plans for tomorrow]
        3. すぐに寝る (Sugu ni neru) [Go to sleep right away]
        ```
      - **Learning Points**:
        - Today: 今日 (Kyō)
        - Was fun: 楽しかった (Tanoshikatta)
        - Tomorrow: 明日 (Ashita)
  - Conversational Objectives:
    - Farewell (e.g., Goodbye, See you tomorrow)
    - Self-reflection on the day's experiences
  - Transition:
    - The game ends.
  - **Technical Implementation**:
    - Background image: hotel_lobby.png
    - No characters in this scene
    - Audio: Hotel lobby ambience
    - Special effects: Fade to credits after final choice

## Characters

### Kaori
  - Description:
    - You are meeting your long-time friend Kaori for the first time in over a year.
    - Kaori is excited to show you around Tokyo.
    - Kaori is a native Japanese woman who is currently living in Tokyo.
    - Kaori is a friendly and outgoing woman who is looking forward to showing you around Tokyo.
  - Expression States:
    - Default [Image: `characters/kaori/default.png`]
    - Worried [Image: `characters/kaori/worried.png`]
    - Surprised [Image: `characters/kaori/surprised.png`]
    - Thinking [Image: `characters/kaori/thinking.png`]
  - Voice: Female, friendly, enthusiastic
  - Personality: Patient teacher, excited tour guide, knowledgeable about Tokyo
  - Key Phrases:
    - "〜しましょう！" (Let's do ~!)
    - "すごいですね！" (That's amazing!)
    - "分かりますか？" (Do you understand?)

### Takashi
  - Description:
    - Kaori's friend.
    - Takashi is a friendly and outgoing man who is happy to meet you.
    - Takashi is a native Japanese man who is currently living in Tokyo.
    - Takashi is very interested in sports, particularly soccer.
    - Takashi is currently practicing in the park, but he will take a break to meet you.
  - Expression States:
    - Default [Image: `characters/takashi/default.png`]
  - Voice: Male, energetic, sports enthusiast
  - Personality: Athletic, direct, friendly
  - Key Phrases:
    - "サッカーが大好きです！" (I love soccer!)
    - "一緒にやりましょう！" (Let's do it together!)
    - "すごい！" (Amazing!)
    
### Shopkeeper
  - Description:
    - The shopkeeper is a friendly and outgoing woman who is happy to meet you.
    - The shopkeeper is a native Japanese woman who is currently living in Tokyo.
    - The shopkeeper is very knowledgeable about handbags.
  - Expression States:
    - Default [Image: `characters/shopkeeper/default.png`]
  - Voice: Female, professional, polite
  - Personality: Helpful, business-oriented, polite
  - Key Phrases:
    - "いらっしゃいませ！" (Welcome!)
    - "何かお手伝いできますか？" (Can I help you with anything?)
    - "ありがとうございました！" (Thank you very much!)

### Waitress
  - Description:
    - The waitress works at the ramen restaurant.
    - She is polite and efficient, providing excellent service.
    - She is a native Japanese woman who speaks in professional, service-oriented Japanese.
  - Expression States:
    - Default [Image: `characters/waitress/default.png`]
  - Voice: Female, polite, formal
  - Personality: Professional, attentive, courteous
  - Key Phrases:
    - "いらっしゃいませ！" (Welcome!)
    - "ご注文はお決まりですか？" (Have you decided on your order?)
    - "かしこまりました。" (Certainly, understood.)

## Required Assets

### Backgrounds
1. Train Platform (`locations/train_platform.png`) - Narita Airport train platform
2. Inside Train (`locations/inside_train.png`) - Interior of a Tokyo train
3. Outside Restaurant (`locations/outside_restaurant.png`) - Street view of a ramen restaurant
4. Inside Restaurant (`locations/inside_restaurant.png`) - Interior of a ramen restaurant
5. Park Lawn (`locations/park_lawn.png`) - Open grassy area in a Tokyo park
6. Park Bench (`locations/park_bench.png`) - Park bench with trees and path
7. Outside Mall (`locations/outside_mall.png`) - Exterior of a shopping mall in the rain
8. Clothing Store (`locations/clothing_store.png`) - Interior of a clothing/accessory store
9. Hotel Lobby (`locations/hotel_lobby.png`) - Modern hotel lobby

### Character Sprites
1. Kaori
   - Default (`characters/kaori/default.png`)
   - Worried (`characters/kaori/worried.png`)
   - Surprised (`characters/kaori/surprised.png`)
   - Thinking (`characters/kaori/thinking.png`)
2. Takashi
   - Default (`characters/takashi/default.png`)
3. Shopkeeper
   - Default (`characters/shopkeeper/default.png`)
4. Waitress
   - Default (`characters/waitress/default.png`)

### Audio
1. Ambient Sounds
   - Train station ambience
   - Train interior sounds
   - Restaurant ambience
   - Park ambience with birds
   - Rain sounds
   - Shopping mall ambience
   - Hotel lobby ambience
2. Effect Sounds
   - Dialog advancement sound
   - Choice selection sound
   - Scene transition sound
   - Study mode activation sound

### UI Elements
1. Dialog Box
2. Character Name Display
3. Choice Buttons
4. Study Mode Button
5. Settings Menu
6. Language Difficulty Selector

## Implementation Notes

### Dialog System
- Each dialog entry should include:
  - Character ID (who is speaking)
  - Expression state
  - Japanese text
  - Furigana for kanji (for Beginner and Intermediate levels)
  - English translation (for Beginner level)
  - Audio file reference (future implementation)

### Study Mode
- When a player enters Study Mode for a phrase:
  1. Show the original Japanese text
  2. Display furigana for all kanji
  3. Show romaji pronunciation
  4. Provide English translation
  5. Offer grammatical explanation
  6. Show example usage in other contexts

### Game State
- Track which locations and events the player has visited
- Record which Japanese phrases the player has studied
- Store player's difficulty preference

### Scene Transitions
- Use fade transitions between locations
- Implement sliding transitions between events within the same location
- Add visual effects for weather changes (rain starting/stopping)

