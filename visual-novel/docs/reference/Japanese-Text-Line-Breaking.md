# A Comprehensive Guide to Japanese Text Line-Breaking

## Introduction

Creating a text-wrapping system for Japanese text presents unique challenges due to the lack of explicit word boundaries. While morphological analysis would provide the most accurate results, we can build a highly effective system by carefully implementing traditional Japanese typography rules (禁則処理 - kinsoku shori) and leveraging character type transitions as word-boundary heuristics.

This guide outlines a comprehensive algorithm for Japanese text line-breaking that respects linguistic and typographic conventions without requiring advanced linguistic libraries. The approach is intended for implementation in any programming language, focusing on conceptual clarity rather than specific syntax.

## 1. Understanding Japanese Text Characteristics

Before implementing line-breaking logic, it's essential to understand how Japanese text differs from Western languages:

### 1.1 Character Types in Japanese

Japanese text consists of multiple character types:
- Kanji (漢字): Chinese-derived ideographic characters
- Hiragana (ひらがな): Phonetic characters for native Japanese words
- Katakana (カタカナ): Phonetic characters primarily for foreign words
- Latin characters (romaji): Used for foreign words, acronyms, etc.
- Numerical characters: Both full-width and half-width
- Punctuation symbols: Both Japanese-specific and Western
- Special symbols: Various marks with specific meanings

### 1.2 Character Width Considerations

Japanese typography traditionally uses:
- Full-width characters (全角): Standard for most Japanese text
- Half-width characters (半角): Sometimes used for Latin letters and numbers

### 1.3 Baseline Line-Breaking Approach

Without semantic analysis, the fundamental approach is:
1. Apply prohibited breaking rules (kinsoku shori)
2. Identify preferred breaking positions based on character type transitions
3. Handle line-breaking based on available width constraints
4. Allow the maximum width to be exceeded by one character if it's a punctuation mark or a character that cannot start a new line

## 2. Character Classification System

First, create a robust character classification system:

### 2.1 Primary Character Type Classifications

Define functions to identify:

- `isKanji(char)`: Determines if a character is a kanji (CJK Unified Ideographs block)
- `isHiragana(char)`: Checks for hiragana characters
- `isKatakana(char)`: Checks for katakana characters
- `isJapanesePunctuation(char)`: Identifies Japanese punctuation marks
- `isLatinChar(char)`: Identifies Latin alphabet characters
- `isNumeric(char)`: Identifies numeric characters
- `isSymbol(char)`: Identifies special symbols
- `isSpace(char)`: Identifies space characters (uncommon but possible)

### 2.2 Advanced Classification Functions

Create composite functions for line-breaking logic:

- `isOpening(char)`: Identifies opening brackets, quotes, etc. (「『(etc.)
- `isClosing(char)`: Identifies closing brackets, quotes, etc. (」』)etc.)
- `isLineStartProhibited(char)`: Characters prohibited at line start
- `isLineEndProhibited(char)`: Characters prohibited at line end
- `isSmallKana(char)`: Small versions of kana (っ、ょ、etc.)
- `getCharWidth(char)`: Returns character's display width (1 for half-width, 2 for full-width)

## 3. Prohibited Line-Breaking Rules (Kinsoku Shori)

The cornerstone of Japanese line-breaking is proper implementation of prohibited line-breaking rules:

### 3.1 Characters Prohibited at Line End

Characters that cannot appear at the end of a line include:
- Opening brackets/quotation marks: 「『(［｛〈《【〔〖
- Opening punctuation: ・:
- Prefixes and other characters that must be followed by content

```
const LINE_END_PROHIBITED = [
  '「', '『', '(', '［', '｛', '〈', '《', '【', '〔', '〖',
  '・', ':', 
  // Additional characters as needed
];
```

### 3.2 Characters Prohibited at Line Start

Characters that cannot appear at the beginning of a line include:
- Closing brackets/quotation marks: 」』)］｝〉》】〕〗
- Punctuation marks: 。、.,!?・:;
- Small kana: っゃゅょッャュョ
- Suffixes and other characters that must follow content
- Iteration marks: ゝゞヽヾ々
- Prolonged sound mark: ー

```
const LINE_START_PROHIBITED = [
  '」', '』', ')', '］', '｝', '〉', '》', '】', '〕', '〗',
  '。', '、', '.', ',', '!', '?', '・', ':', ';',
  'っ', 'ゃ', 'ゅ', 'ょ', 'ッ', 'ャ', 'ュ', 'ョ',
  'ー', 'ゝ', 'ゞ', 'ヽ', 'ヾ', '々',
  // Additional characters as needed
];
```

## 4. Preferred Breaking Positions

Without morphological analysis, we can use character type transitions as a heuristic for word boundaries:

### 4.1 Character Type Transition Priority

Define a priority system for breaking at character transitions (from highest to lowest):
1. Before spaces (if present)
2. Between sentences (after punctuation like 。、)
3. Between different character types (kanji→hiragana, hiragana→katakana, etc.)
4. Between any characters not prohibited by kinsoku rules

### 4.2 Transition Priority Score Function

```
function getBreakPriority(prevChar, nextChar):
    // Higher score means better breaking position
    if isSpace(nextChar): return 100
    if isPunctuation(prevChar): return 90
    
    // Transitions between character types
    if isKanji(prevChar) && !isKanji(nextChar): return 80
    if isHiragana(prevChar) && !isHiragana(nextChar): return 70
    if isKatakana(prevChar) && !isKatakana(nextChar): return 60
    if isLatinChar(prevChar) && !isLatinChar(nextChar): return 50
    
    // Any other position not prohibited by kinsoku rules
    if !isLineEndProhibited(prevChar) && !isLineStartProhibited(nextChar): return 10
    
    // Not a good breaking position
    return 0
```

## 5. The Line-Breaking Algorithm

The core algorithm combines the rules above to find optimal line breaks:

### 5.1 Measuring Text Width

Create a function to measure text width considering full-width and half-width characters:

```
function measureTextWidth(text):
    width = 0
    for each char in text:
        width += getCharWidth(char)
    return width
```

### 5.2 Finding Break Positions

The algorithm scans the text to find all possible breaking positions with their priorities:

```
function findBreakPositions(text):
    positions = []
    for i from 1 to text.length-1:
        prevChar = text[i-1]
        nextChar = text[i]
        
        // Skip positions prohibited by kinsoku rules
        if isLineEndProhibited(prevChar) || isLineStartProhibited(nextChar):
            continue
            
        priority = getBreakPriority(prevChar, nextChar)
        if priority > 0:
            positions.push({index: i, priority: priority})
    
    // Sort by priority (highest first)
    return positions.sort((a, b) => b.priority - a.priority)
```

### 5.3 Core Line-Breaking Function (With One-Character Overflow Allowance)

```
function breakText(text, maxWidth):
    lines = []
    startIndex = 0
    
    while startIndex < text.length:
        // If remaining text fits in one line
        if measureTextWidth(text.substring(startIndex)) <= maxWidth:
            lines.push(text.substring(startIndex))
            break
        
        // Find best breaking position within maxWidth (with overflow allowance)
        currentLineEnd = findBestBreakPosition(text, startIndex, maxWidth)
        
        // Add line to result
        lines.push(text.substring(startIndex, currentLineEnd))
        startIndex = currentLineEnd
    
    return lines
```

### 5.4 Finding Best Break Position With One-Character Overflow Allowance

```
function findBestBreakPosition(text, startIndex, maxWidth):
    // Find all possible breaking positions
    breakPositions = findBreakPositions(text.substring(startIndex))
    
    // Find last position that fits within maxWidth
    // Or find position where overflow would be just one character that's a punctuation
    // or a character that cannot start a new line
    let bestPosition = null
    let bestOverflow = Infinity
    
    for each position in breakPositions:
        actualPosition = startIndex + position.index
        lineText = text.substring(startIndex, actualPosition)
        lineWidth = measureTextWidth(lineText)
        
        // Case 1: Position fits perfectly within maxWidth
        if lineWidth <= maxWidth:
            bestPosition = actualPosition
            bestOverflow = 0
            // Continue searching for better positions
        
        // Case 2: Position exceeds maxWidth by exactly one character width
        // AND that character is punctuation or line-start-prohibited
        else if lineWidth <= maxWidth + getCharWidth(text[actualPosition-1]) &&
                (isPunctuation(text[actualPosition-1]) || 
                 isLineStartProhibited(text[actualPosition-1])):
            
            // This is an acceptable overflow position
            if lineWidth - maxWidth < bestOverflow:
                bestPosition = actualPosition
                bestOverflow = lineWidth - maxWidth
        
    // If we found an acceptable position (either within maxWidth or with allowed overflow)
    if bestPosition !== null:
        return bestPosition
    
    // If no good breaking position found, force break at maxWidth
    // (counting by character width to respect full/half-width chars)
    currentWidth = 0
    for i from startIndex to text.length-1:
        currentWidth += getCharWidth(text[i])
        
        // Allow one extra character if it's punctuation or line-start-prohibited
        if currentWidth > maxWidth:
            // If we're just one character over, and it's a special case character
            if currentWidth <= maxWidth + getCharWidth(text[i]) &&
               (isPunctuation(text[i]) || isLineStartProhibited(text[i+1] || '')):
                return i + 1
            return i
    
    // Fallback: return end of text
    return text.length
```

## 6. Special Case: One-Character Overflow for Punctuation and Prohibited Line-Start Characters

### 6.1 Handling the One-Character Overflow Rule

This rule allows exceeding the maximum width by one character in specific cases:

```
function shouldAllowOverflow(char, nextChar):
    // Allow overflow for punctuation characters
    if isPunctuation(char):
        return true
    
    // Allow overflow for characters that would cause a line-start prohibition issue
    if nextChar && isLineStartProhibited(nextChar):
        return true
    
    return false
```

### 6.2 Integration in the Line Breaking Logic

Modify the main algorithm to incorporate this rule:

```
function calculateBreakPositionWithOverflow(text, startIndex, maxWidth):
    // Try to find a good break position within maxWidth
    let breakPos = findGoodBreakPosition(text, startIndex, maxWidth)
    
    // If no good position found within maxWidth, check if we can allow overflow
    if breakPos === null:
        // Look one character beyond maxWidth
        let potentialBreakPos = findBreakPositionBeyondMax(text, startIndex, maxWidth)
        let overflowChar = text[potentialBreakPos - 1]
        let nextChar = text[potentialBreakPos]
        
        // If overflow is allowed for this character
        if shouldAllowOverflow(overflowChar, nextChar):
            return potentialBreakPos
    
    // Either we found a good position within maxWidth or we can't allow overflow
    return breakPos || forcedBreakPosition(text, startIndex, maxWidth)
```

> **Implementation Note**: When implementing this system, users should be advised that the actual line width might exceed the specified maximum by one character in certain cases. If this behavior is problematic, they should provide a maximum width that is one less than their absolute limit.

## 7. Handling Edge Cases

### 7.1 Very Long Words Without Breaking Opportunities

When a string of characters without any good breaking position exceeds the line width:

```
function handleLongWords(text, startIndex, maxWidth):
    // Measure how many characters can fit
    currentWidth = 0
    breakPos = startIndex
    
    for i from startIndex to text.length-1:
        charWidth = getCharWidth(text[i])
        
        // Consider allowing overflow for punctuation and prohibited line-start chars
        if currentWidth + charWidth > maxWidth:
            // Check if this is an allowed overflow character
            if currentWidth + charWidth <= maxWidth + charWidth && 
               shouldAllowOverflow(text[i], text[i+1] || ''):
                breakPos = i + 1
            break
        
        currentWidth += charWidth
        breakPos = i + 1
    
    // If we couldn't advance at all (extremely narrow line),
    // force including at least one character
    if breakPos == startIndex:
        return startIndex + 1
    
    return breakPos
```

### 7.2 Handling Extremely Narrow Containers

For very narrow containers that can't fit even a single character:

```
if maxWidth < getCharWidth(text[startIndex]):
    // Handle impossibly narrow container
    // Either force one character per line or return error
```

## 8. Optimization Considerations

### 8.1 Caching Character Classifications

For performance, cache character classifications rather than repeatedly computing them:

```
// Initialize cache at the beginning
characterTypeCache = new Map()

function getCharacterType(char):
    if characterTypeCache.has(char):
        return characterTypeCache.get(char)
    
    // Determine type
    let type
    if isKanji(char): type = "kanji"
    else if isHiragana(char): type = "hiragana"
    // etc.
    
    characterTypeCache.set(char, type)
    return type
```

### 8.2 Pre-computing Line Width

For static text that will be wrapped multiple times (e.g., when window is resized):

```
// Pre-compute and store character widths
charWidths = []
for each char in text:
    charWidths.push(getCharWidth(char))

// Use pre-computed widths for faster measurement
function measureWidthFast(start, end):
    width = 0
    for i from start to end-1:
        width += charWidths[i]
    return width
```

## 9. Integration with Rendering Systems

### 9.1 Rendering Considerations

When integrating with a rendering system:
1. Ensure character width calculations match actual rendering widths
2. Consider font metrics when available
3. Handle half-width/full-width distinctions correctly
4. Be aware that lines may occasionally exceed the specified maximum width by one character width

### 9.2 Working with Different Writing Modes

For vertical text (縦書き - tategaki), the same algorithm applies but with:
- Height constraints instead of width constraints
- Different prohibited breaking rules (some rules change in vertical text)
- Line progression from top to bottom rather than left to right

## 10. Testing and Validation

### 10.1 Test Cases

Develop comprehensive test cases covering:
1. Mixed character types
2. Punctuation at line boundaries
3. Long text without obvious breaking points
4. Very short maxWidth values
5. Full-width and half-width character mixing
6. Special characters and symbols
7. Cases where one-character overflow should be allowed
8. Cases where one-character overflow should not be allowed

### 10.2 Visual Validation

Implement visual validation by:
1. Comparing output to professional Japanese typography examples
2. Testing with real-world Japanese content of varying complexity
3. Verifying adherence to kinsoku rules
4. Ensuring one-character overflow only occurs in appropriate cases

## 11. Implementation Notes

### 11.1 Handling the One-Character Overflow Rule

It's important to communicate to users of this system that:

1. The maximum width parameter may be exceeded by one character width in specific cases
2. If a strict maximum width is required, users should provide a maximum width that is one less than their absolute limit
3. This behavior is intentional and follows traditional Japanese typography practices

### 11.2 Configuration Options

Consider making the overflow behavior configurable:

```
function breakText(text, maxWidth, options = {}):
    // Allow user to disable the overflow behavior if necessary
    const allowOverflow = options.allowOverflow !== undefined ? options.allowOverflow : true
    
    // Rest of the function using allowOverflow parameter...
```

## Conclusion

This guide provides a comprehensive approach to Japanese text line-breaking that respects traditional typographic rules while acknowledging the constraints of not having full morphological analysis capabilities.

When implemented correctly, this algorithm will produce line breaks that:
1. Fully respect prohibited line-breaking rules (kinsoku shori)
2. Take advantage of character type transitions as word boundary indicators
3. Allow one-character overflow when appropriate for punctuation and prohibited line-start characters
4. Handle edge cases gracefully
5. Provide a reading experience that approximates professionally typeset Japanese text

While not as perfect as systems using full linguistic analysis, this approach represents the best possible solution given the technical constraints, and will produce highly readable Japanese text wrapping that follows traditional typographic practices.