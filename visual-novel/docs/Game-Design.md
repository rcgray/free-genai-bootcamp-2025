# Japanese Conversation Game

## Overview
You are an American traveling for the first time to Japan. You get off the plane in Tokyo and meet your long-time friend Kaori, who is a native Japanese woman. She is excited to see you and introduce you to Japan. Along the way, she looks forward to teaching you some conversational Japanese by visiting various locations around Tokyo.

Along the way, Kaori will teach you some conversational Japanese as you travel on a train (1. Train Station), order food in a restaurant (2. Restaurant), visit a park with her friends(3. Park), go shopping in a mall (4. Shopping Mall), and finally retire to your hotel (5. Hotel) to rest and end the adventure.

## Locations
These are the locations that you will visit, traveling from one to the next. When the player reaches the end of the list, the game will end.

### 1. Train Station
  - Overview: You first meet Kaori at the station (Train Station Location) in Narita Airport and take a train to Tokyo Station.
  - Events:
    - 1.1 Train Platform [Image: `locations/train_platform.png`]
      - Characters: [Kaori]
      - Greet Kaori
      - Buy a train ticket
    - 1.2 Inside Train [Image: `locations/inside_train.png`]
      - Characters: [Kaori]
      - Learn about trains in Tokyo
  - Conversational Objectives:
    - Informal greetings (e.g., Hi, Hello, How are you?)
    - Travel, train, and station vocabulary (e.g., Yamanote line, Shinkansen, Tokyo Station)
    - Districts in Tokyo (e.g., Shibuya, Shinjuku, etc.)
    - Directions (e.g., Shinjuku is west, Tokyo Station is east, Shinagawa is south)
  - Transition:
    - After boarding the train, Kaori mentions that she is hungry and suggests visiting a restaurant (2.1 Outside Restaurant) when you arrive in Tokyo.

### 2. Restaurant
  - Overview: After arriving in Shibuya, Kaori takes you to a ramen restaurant to order your first meal in Japan.
  - Events:
    - 2.1 Outside Restaurant [Image: `locations/outside_restaurant.png`]
      - Characters: [Kaori]
      - Discuss Japanese cuisine
    - 2.2 Inside Restaurant [Image: `locations/inside_restaurant.png`]
      - Characters: [Kaori]
      - Order a ramen dish
      - Pay for the meal, no tipping
  - Conversational Objectives:
    - Describing dishes and tastes (e.g., This ramen is good, this ramen is bad)
    - Having likes and dislikes (e.g., I don't like spicy food, I like sweet food)
    - Ordering food (e.g., I'd like a ramen, I'd like a cola)
    - Paying for the meal (e.g., I'll pay for the meal, I'll pay for the ramen)
    - Tipping culture (e.g., No tipping, tipping is not customary in Japan)
  - Transition:
    - After eating, Kaori suggests visiting a park (3.1 Park Lawn) to relax and meet up with her friends.

### 3. Park
  - Overview: After eating, you and Kaori meet up with her friends at a park.
  - Events:
    - 3.1 Park Lawn [Image: `locations/park_lawn.png`]
      - Characters: [Kaori, Takashi]
      - Meet Takashi
      - Discuss hobbies and sports
    - 3.2 Park Bench [Image: `locations/park_bench.png`]
      - Characters: [Kaori]
      - Discuss seasons and weather
  - Conversational Objectives:
    - Meeting new people (e.g., Nice to meet you)
    - Self-introduction (e.g., I'm from America, I'm a student)
    - Hobbies and interests (e.g., I like to play soccer, I like to play guitar)
    - Seasons and weather (e.g., It's cold/hot, it's raining/sunny)
  - Transition:
    - The weather becomes cold and rainy, so Kaori suggests going shopping at a nearby mall (4.1 Outside Mall).

### 4. Shopping Mall
  - Overview: After the park, you and Kaori go shopping at a nearby mall.
  - Events:
    - 4.1 Outside Mall [Image: `locations/outside_mall.png`]
      - Characters: [Kaori, Shopkeeper]
      - Go inside the mall to get out of the rain
    - 4.2 Clothing Store [Image: `locations/clothing_store.png`]
      - Characters: [Kaori, Shopkeeper]
      - Discuss currency (yen vs. dollar)
      - Kaori buys a new handbag
  - Conversational Objectives:
    - Discuss currency (e.g., yen vs. dollar)
    - Colors and physical descriptions (e.g., large, small, red, blue)
    - Product inquiries (e.g., Is this a good gift for my friend? Is this a good price?)
    - Time expressions (e.g., It's late/evening, we should go)
  - Transition:
    - After shopping, the rain stops, and Kaori wishes you farewell with a plan to meet the next day. You go to your hotel (5.1 Hotel Lobby) to rest.

### 5. Hotel
  - Overview: You go to your hotel to rest.
  - Events:
    - 5.1 Hotel Lobby [Image: `locations/hotel_lobby.png`]
      - Characters: []
      - Reflect on excitement to be in Japan and to learn more tomorrow
  - Conversational Objectives:
    - Farewell (e.g., Goodbye, See you tomorrow)
  - Transition:
    - The game ends.

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

### Takashi
  - Description:
    - Kaori's friend.
    - Takashi is a friendly and outgoing man who is happy to meet you.
    - Takashi is a native Japanese man who is currently living in Tokyo.
    - Takashi is very interested in sports, particularly soccer.
    - Takashi is currently practicing in the park, but he will take a break to meet you.
  - Expression States:
    - Default [Image: `characters/takashi/default.png`]
    
### Shopkeeper
  - Description:
    - The shopkeeper is a friendly and outgoing woman who is happy to meet you.
    - The shopkeeper is a native Japanese woman who is currently living in Tokyo.
    - The shopkeeper is very knowledgeable about handbags.
  - Expression States:
    - Default [Image: `characters/shopkeeper/default.png`]

