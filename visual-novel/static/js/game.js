/**
 * Japanese Visual Novel Game - Main JavaScript
 */

// Game state
const gameState = {
  currentScene: null,
  dialogIndex: 0,
  dialogHistory: [],
  choices: [],
  playerName: "Player",
  languageLevel: "beginner",
  showTranslation: true,
  showPronunciation: true,
  audioEnabled: true,
  learnedWords: []
};

// DOM Elements
let dialogBox;
let characterNameElement;
let japaneseTextElement;
let englishTextElement;
let pronunciationElement;
let choicesContainer;
let characterImage;
let backgroundImage;

// Initialize the game
function initGame() {
  console.log("Initializing game...");
  
  // Get DOM elements
  dialogBox = document.getElementById("dialog-box");
  characterNameElement = document.getElementById("character-name");
  japaneseTextElement = document.getElementById("japanese-text");
  englishTextElement = document.getElementById("english-text");
  pronunciationElement = document.getElementById("pronunciation");
  choicesContainer = document.getElementById("choices-container");
  characterImage = document.getElementById("character-image");
  backgroundImage = document.getElementById("background-image");
  
  // Set up event listeners
  document.getElementById("dialog-box").addEventListener("click", advanceDialog);
  document.getElementById("new-game-btn").addEventListener("click", startNewGame);
  document.getElementById("save-game-btn").addEventListener("click", saveGame);
  document.getElementById("load-game-btn").addEventListener("click", loadGame);
  document.getElementById("settings-btn").addEventListener("click", openSettings);
  
  // Start the game
  startNewGame();
}

// Start a new game
function startNewGame() {
  console.log("Starting new game...");
  
  // Reset game state
  gameState.currentScene = "intro";
  gameState.dialogIndex = 0;
  gameState.dialogHistory = [];
  gameState.choices = [];
  
  // Load the intro scene
  loadScene("intro");
}

// Load a scene
function loadScene(sceneId) {
  console.log(`Loading scene: ${sceneId}`);
  
  // In a real implementation, this would fetch scene data from the server
  // For now, we'll use a placeholder
  fetch(`/api/scenes/${sceneId}`)
    .then(response => response.json())
    .then(sceneData => {
      gameState.currentScene = sceneId;
      
      // Set background
      if (sceneData.background) {
        backgroundImage.src = sceneData.background;
      }
      
      // Set character if present
      if (sceneData.character) {
        characterImage.src = sceneData.character.image;
        characterImage.style.display = "block";
      } else {
        characterImage.style.display = "none";
      }
      
      // Load dialog
      if (sceneData.dialog && sceneData.dialog.length > 0) {
        gameState.dialogIndex = 0;
        gameState.dialogHistory = sceneData.dialog;
        displayCurrentDialog();
      }
    })
    .catch(error => {
      console.error("Error loading scene:", error);
    });
}

// Display current dialog
function displayCurrentDialog() {
  if (gameState.dialogIndex >= gameState.dialogHistory.length) {
    console.log("End of dialog reached");
    return;
  }
  
  const dialog = gameState.dialogHistory[gameState.dialogIndex];
  
  // Update dialog box
  characterNameElement.textContent = dialog.character || "Narrator";
  japaneseTextElement.textContent = dialog.text || "";
  englishTextElement.textContent = dialog.translation || "";
  pronunciationElement.textContent = dialog.pronunciation || "";
  
  // Show/hide translation and pronunciation based on settings
  englishTextElement.style.display = gameState.showTranslation ? "block" : "none";
  pronunciationElement.style.display = gameState.showPronunciation ? "block" : "none";
  
  // Clear choices
  choicesContainer.innerHTML = "";
  
  // Add choices if present
  if (dialog.choices && dialog.choices.length > 0) {
    gameState.choices = dialog.choices;
    displayChoices();
  } else {
    gameState.choices = [];
  }
}

// Display choices
function displayChoices() {
  choicesContainer.innerHTML = "";
  
  gameState.choices.forEach((choice, index) => {
    const choiceButton = document.createElement("button");
    choiceButton.className = "choice-button";
    choiceButton.dataset.choiceIndex = index;
    
    const japaneseDiv = document.createElement("div");
    japaneseDiv.className = "choice-japanese";
    japaneseDiv.textContent = choice.text || "";
    
    const englishDiv = document.createElement("div");
    englishDiv.className = "choice-english";
    englishDiv.textContent = choice.translation || "";
    englishDiv.style.display = gameState.showTranslation ? "block" : "none";
    
    choiceButton.appendChild(japaneseDiv);
    choiceButton.appendChild(englishDiv);
    
    choiceButton.addEventListener("click", () => selectChoice(index));
    
    choicesContainer.appendChild(choiceButton);
  });
}

// Select a choice
function selectChoice(choiceIndex) {
  console.log(`Selected choice: ${choiceIndex}`);
  
  const choice = gameState.choices[choiceIndex];
  
  // In a real implementation, this would send the choice to the server
  // For now, we'll just advance to the next dialog
  fetch("/api/choices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sceneId: gameState.currentScene,
      dialogIndex: gameState.dialogIndex,
      choiceIndex: choiceIndex
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.nextScene) {
        loadScene(data.nextScene);
      } else {
        gameState.dialogIndex++;
        displayCurrentDialog();
      }
    })
    .catch(error => {
      console.error("Error selecting choice:", error);
    });
}

// Advance dialog
function advanceDialog() {
  // If there are choices, don't advance
  if (gameState.choices.length > 0) {
    return;
  }
  
  gameState.dialogIndex++;
  
  if (gameState.dialogIndex >= gameState.dialogHistory.length) {
    // End of dialog reached, load next scene
    fetch(`/api/scenes/${gameState.currentScene}/next`)
      .then(response => response.json())
      .then(data => {
        if (data.nextScene) {
          loadScene(data.nextScene);
        } else {
          console.log("End of game reached");
        }
      })
      .catch(error => {
        console.error("Error advancing dialog:", error);
      });
  } else {
    displayCurrentDialog();
  }
}

// Save game
function saveGame() {
  console.log("Saving game...");
  
  // In a real implementation, this would send the game state to the server
  fetch("/api/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      currentScene: gameState.currentScene,
      dialogIndex: gameState.dialogIndex,
      playerName: gameState.playerName,
      languageLevel: gameState.languageLevel,
      learnedWords: gameState.learnedWords
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log("Game saved:", data);
      alert("Game saved successfully!");
    })
    .catch(error => {
      console.error("Error saving game:", error);
      alert("Error saving game. Please try again.");
    });
}

// Load game
function loadGame() {
  console.log("Loading game...");
  
  // In a real implementation, this would fetch the game state from the server
  fetch("/api/load")
    .then(response => response.json())
    .then(data => {
      gameState.currentScene = data.currentScene;
      gameState.dialogIndex = data.dialogIndex;
      gameState.playerName = data.playerName;
      gameState.languageLevel = data.languageLevel;
      gameState.learnedWords = data.learnedWords;
      
      loadScene(gameState.currentScene);
      console.log("Game loaded:", data);
    })
    .catch(error => {
      console.error("Error loading game:", error);
      alert("Error loading game. Please try again.");
    });
}

// Open settings
function openSettings() {
  console.log("Opening settings...");
  
  // In a real implementation, this would open a settings modal
  const showTranslation = confirm("Show translations?");
  if (showTranslation !== null) {
    gameState.showTranslation = showTranslation;
    englishTextElement.style.display = gameState.showTranslation ? "block" : "none";
    
    // Update choice translations
    const choiceTranslations = document.querySelectorAll(".choice-english");
    choiceTranslations.forEach(el => {
      el.style.display = gameState.showTranslation ? "block" : "none";
    });
  }
  
  const showPronunciation = confirm("Show pronunciation guides?");
  if (showPronunciation !== null) {
    gameState.showPronunciation = showPronunciation;
    pronunciationElement.style.display = gameState.showPronunciation ? "block" : "none";
  }
}

// Initialize the game when the DOM is loaded
document.addEventListener("DOMContentLoaded", initGame); 