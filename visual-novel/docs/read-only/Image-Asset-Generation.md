# Image Asset Generation

All images in this game will be created via AI image generation. We will use the following tools:

Stable Diffusion
Automatic1111 Stable Diffusion WebUI
- https://github.com/AUTOMATIC1111/stable-diffusion-webui
Model:
- Base Model: SDXL Turbo
- Checkpoint: EnvyAnimeXL01Turbo v1.0 by _Envy_
- (https://civitai.com/models/312826)

## Background Images

1200x900, clipped to 1200x800 (png)

Sampling method: DPM++ SDE
Sampling steps: 20
Upscaler: None
Width: 1200
Height: 800
CFG Scale: 7
Restore Faces: None

### hotel_lobby.png
Positive Prompt: `masterpiece, anime background, hotel lobby with staircase and front desk`
Negative Prompt: `character, person, girl, writing, logo, text, yellow tint, western comics, abstract, pencil sketch lines`
Seed: 2597163586

### park_lawn.png
Positive Prompt: `masterpiece, anime background, park lawn in the middle of a city, blue sky, clouds, trees, grass`
Negative Prompt: `character, person, girl, temple, pagoda, road, writing, logo, text, yellow tint, western comics, abstract, pencil sketch lines`
Seed: 1431276078

### park_bench.png
Positive Prompt: `masterpiece, anime background, evening, dusk, park bench, pond, stone lantern, trees, grass`
Negative Prompt: `bright, character, person, girl, temple, pagoda, road, writing, logo, text, yellow tint, western comics, abstract, pencil sketch lines`
Seed: 980403442

### outside_restaurant.png
Positive Prompt: `masterpiece, anime background, exterior of a restaurant on a busy street, noon`
Negative Prompt: `waitress, server, character, person, girl, writing, logo, text, yellow tint, western comics, abstract, pencil sketch lines`
Seed: 3801388125

### title.png
Positive Prompt: `masterpiece, anime background, aerial view of city in Japan, distant shot, ocean, trees`
Negative Prompt: `fuji, islands, okinawa, writing, logo, text, yellow tint, western comics, abstract, pencil sketch lines`
Seed: 1337751864

### clothing_store.png
Positive Prompt: `masterpiece, anime background, interior of a department store in a mall that sells handbags`
Negative Prompt: `shopkeeper, cashier, character, person, girl, writing, logo, text, yellow tint, western comics, abstract, pencil sketch lines`
Seed: 1923526124

### inside_train.png
Positive Prompt: `masterpiece, anime background, interior of a train in Japan heading toward the city, sitting across from a chair`
Negative Prompt: `character, person, girl, writing, logo, text, yellow tint, western comics, abstract, pencil sketch lines`
Seed: 2003719653

### inside_restaurant.png
Positive Prompt: `masterpiece, anime background, interior of a restaurant with a view of the city, empty tables, noon`
Negative Prompt: `waitress, server, character, person, girl, writing, logo, text, yellow tint, western comics, abstract, pencil sketch lines`
Seed: 3801388125

### outside_mall.png
Positive Prompt: `masterpiece, anime background, outside a shopping mall from the street, sidewalk, shopping district`
Negative Prompt: `character, person, girl, writing, logo, text, yellow tint, western comics, abstract, pencil sketch lines`
Seed: 2003719653

### train_platform.png
Positive Prompt: `masterpiece, anime background, inside airport terminal, view outside, baggage claim, luggage, kiosk`
Negative Prompt: `plane, airplane, jet, character, person, girl, writing, logo, text, yellow tint, western comics, abstract, pencil sketch lines`
Seed: 2003719653

## Character Images

600x800, clipped to 500x700 (png)

- Base Model: SDXL 1.0
- Checkpoint: Reproduction | SDXL v.2.8 by Aikimi
- (https://civitai.com/models/118729?modelVersionId=138079)
- LoRA: AnimeLoRA SDXL v1 e20 by s4shiro
- (https://civitai.com/models/126750)

Sampling method: DPM++ SDE for original, Euler A for follow-ups
Sampling steps: 20
Upscaler: None
Width: 600
Height: 800
CFG Scale: 7
Restore Faces: None

### kaori/*.png
Positive Prompt: `anime, game character, white background, happy, woman, adult, teacher, standing, facing viewer, (full body), zooming out, detailed face, detailed eyes, nose, dark hair, long hair, white hair bow, purple eyes, school uniform, white shirt, short sleeves, purple bow, blue skirt`
Negative Prompt: `low quality, worst quality, bokeh, depth of field, yellow theme, close-up, nsfw, child, young, large chest, bad hands, bad anatomy, western comics, abstract, pencil sketch lines`

updated to: (happy, laughing, thinking, astonished, etc.)

Generated an image via txt2img with a pose I liked, outcropped missing hand/hair, removed background and resized/cropped to 600x800. iterated with img2img for other expressions.

### waitress/default.png
Positive Prompt: `anime, game character, white background, happy, woman, adult, waitress, standing, facing viewer, (full body), zooming out, detailed face, detailed eyes, nose, blonde hair, short hair, apron`
Negative Prompt: `low quality, worst quality, bokeh, depth of field, yellow theme, close-up, nsfw, child, young, large chest, bad hands, bad anatomy, western comics, abstract, pencil sketch lines`

iterated off kaori happy img2img

### shopkeeper/default.png
Positive Prompt: `anime, game character, white background, happy, man, adult, handsome, strong, strong jawline, wealthy, standing, facing viewer, (full body), zooming out, detailed face, detailed eyes, nose, brown hair, short hair, suit`
Negative Prompt: `low quality, worst quality, bokeh, depth of field, yellow theme, close-up, nsfw, child, young, feminine eyes, bad hands, bad anatomy, western comics, abstract, pencil sketch lines`

iterated off kaori happy img2img
