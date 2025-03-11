/**
 * DialogSystemTests.ts
 * Manual tests for the DialogSystem class and related interfaces.
 * This file contains functions to test the core functionality of the dialog system.
 */

import { DialogSystem, dialogSystem } from './DialogSystem';
import { mockConversations } from './MockDialogData';

/**
 * Run all dialog system tests.
 * This function exercises the core functionality of the dialog system.
 */
export function runDialogSystemTests(): void {
  console.group('=== Running Dialog System Tests ===');
  
  try {
    console.log('----------------------------------------');
    // Test conversation registration and retrieval
    testConversationRegistration();
    console.log('----------------------------------------');
    
    // Test dialog navigation
    testDialogNavigation();
    console.log('----------------------------------------');
    
    // Test player response selection
    testResponseSelection();
    console.log('----------------------------------------');
    
    // Test state serialization and deserialization
    testStateSerialization();
    console.log('----------------------------------------');
    
    console.log('✅ All dialog system tests completed successfully!');
  } catch (error) {
    console.error('❌ Dialog system tests failed:', error);
  }
  
  console.groupEnd();
}

/**
 * Test conversation registration and retrieval.
 */
function testConversationRegistration(): void {
  console.group('--- Testing Conversation Registration ---');
  
  // Clear any existing conversations
  dialogSystem.deserialize({ conversations: {}, states: {}, currentConversationId: null });
  
  // Register mock conversations
  mockConversations.forEach(conversation => {
    dialogSystem.registerConversation(conversation);
    console.log(`› Registered conversation: ${conversation.id}`);
  });
  
  // Test retrieval
  mockConversations.forEach(conversation => {
    const retrieved = dialogSystem.getConversation(conversation.id);
    console.log(`› Retrieved conversation ${conversation.id}: ${retrieved ? 'Success ✓' : 'Failed ✗'}`);
    
    if (retrieved) {
      console.log(`  • Location: ${retrieved.locationId}`);
      console.log(`  • Sub-location: ${retrieved.subLocationId || 'None'}`);
      console.log(`  • Dialog count: ${retrieved.dialogs.length}`);
    }
  });
  
  // Test setting current conversation
  const setResult = dialogSystem.setCurrentConversation(mockConversations[0].id);
  console.log(`› Set current conversation to ${mockConversations[0].id}: ${setResult ? 'Success ✓' : 'Failed ✗'}`);
  
  const current = dialogSystem.getCurrentConversation();
  console.log(`› Current conversation: ${current?.id || 'None'}`);
  
  console.groupEnd();
}

/**
 * Test dialog navigation within a conversation.
 */
function testDialogNavigation(): void {
  console.group('--- Testing Dialog Navigation ---');
  
  // Clear any existing conversations
  dialogSystem.deserialize({ conversations: {}, states: {}, currentConversationId: null });
  
  // Register and set the train platform conversation
  dialogSystem.registerConversation(mockConversations[0]);
  dialogSystem.setCurrentConversation(mockConversations[0].id);
  
  // Get the first dialog
  const firstDialog = dialogSystem.getCurrentDialog();
  console.log('› First dialog:');
  console.log(`  • Character: ${firstDialog?.characterId || 'None (Narration)'}`);
  console.log(`  • Japanese: ${firstDialog?.japaneseText.substring(0, 40)}...`);
  console.log(`  • English: ${firstDialog?.englishText.substring(0, 40)}...`);
  
  // Advance to the second dialog
  dialogSystem.advanceDialog();
  const secondDialog = dialogSystem.getCurrentDialog();
  console.log('› Second dialog:');
  console.log(`  • Character: ${secondDialog?.characterId}`);
  console.log(`  • Emotion: ${secondDialog?.emotion}`);
  console.log(`  • Japanese: ${secondDialog?.japaneseText.substring(0, 40)}...`);
  console.log(`  • English: ${secondDialog?.englishText.substring(0, 40)}...`);
  console.log(`  • Response count: ${secondDialog?.playerResponses?.length || 0}`);
  
  // Advance through the rest of the dialogs
  let dialogCount = 2;
  while (dialogSystem.advanceDialog()) {
    dialogCount++;
  }
  console.log(`› Total dialogs navigated: ${dialogCount}`);
  
  // Reset the conversation
  const resetResult = dialogSystem.resetCurrentConversation();
  console.log(`› Reset conversation: ${resetResult ? 'Success ✓' : 'Failed ✗'}`);
  
  // Verify we're back at the first dialog
  const afterResetDialog = dialogSystem.getCurrentDialog();
  console.log(`› After reset, current dialog is ${afterResetDialog?.id === firstDialog?.id ? 'the first dialog ✓' : 'not the first dialog ✗'}`);
  
  console.groupEnd();
}

/**
 * Test player response selection.
 */
function testResponseSelection(): void {
  console.group('--- Testing Response Selection ---');
  
  // Clear any existing conversations
  dialogSystem.deserialize({ conversations: {}, states: {}, currentConversationId: null });
  
  // Register and set the train platform conversation
  dialogSystem.registerConversation(mockConversations[0]);
  dialogSystem.setCurrentConversation(mockConversations[0].id);
  
  // Advance to the second dialog (which has player responses)
  dialogSystem.advanceDialog();
  const dialogWithResponses = dialogSystem.getCurrentDialog();
  
  if (dialogWithResponses && dialogWithResponses.playerResponses && dialogWithResponses.playerResponses.length > 0) {
    const responseId = dialogWithResponses.playerResponses[0].id;
    console.log(`› Dialog: "${dialogWithResponses.japaneseText.substring(0, 30)}..."`);
    console.log(`› Response: "${dialogWithResponses.playerResponses[0].japaneseText.substring(0, 30)}..."`);
    
    const selectResult = dialogSystem.selectResponse(dialogWithResponses.id, responseId);
    console.log(`› Selected response ${responseId.substring(0, 10)}... for dialog ${dialogWithResponses.id.substring(0, 10)}...: ${selectResult ? 'Success ✓' : 'Failed ✗'}`);
    
    // Verify the selected response
    const selectedResponse = dialogSystem.getSelectedResponse(dialogWithResponses.id);
    console.log(`› Retrieved selected response: ${selectedResponse === responseId ? 'Success ✓' : 'Failed ✗'}`);
  } else {
    console.log('› No dialog with responses found for testing.');
  }
  
  console.groupEnd();
}

/**
 * Test state serialization and deserialization.
 */
function testStateSerialization(): void {
  console.group('--- Testing State Serialization ---');
  
  // Clear any existing conversations
  dialogSystem.deserialize({ conversations: {}, states: {}, currentConversationId: null });
  
  // Register mock conversations
  mockConversations.forEach(conversation => {
    dialogSystem.registerConversation(conversation);
  });
  
  // Set current conversation and navigate to a specific point
  dialogSystem.setCurrentConversation(mockConversations[0].id);
  dialogSystem.advanceDialog(); // Move to second dialog
  dialogSystem.advanceDialog(); // Move to third dialog
  
  // Get the current dialog before serialization
  const currentDialogBeforeSerialization = dialogSystem.getCurrentDialog();
  console.log('› Current dialog before serialization:');
  console.log(`  • ID: ${currentDialogBeforeSerialization?.id.substring(0, 15)}...`);
  console.log(`  • Japanese: ${currentDialogBeforeSerialization?.japaneseText.substring(0, 30)}...`);
  
  // Serialize the state
  const serializedState = dialogSystem.serialize();
  console.log('› Serialized state:');
  console.log(`  • Current conversation: ${serializedState.currentConversationId}`);
  console.log(`  • Conversation count: ${Object.keys(serializedState.conversations).length}`);
  console.log(`  • State count: ${Object.keys(serializedState.states).length}`);
  
  // Clear and then deserialize
  dialogSystem.deserialize({ conversations: {}, states: {}, currentConversationId: null });
  console.log('› Cleared dialog system state');
  
  // Verify the current dialog is no longer available
  const currentDialogAfterClear = dialogSystem.getCurrentDialog();
  console.log(`› Current dialog after clear: ${currentDialogAfterClear ? 'Still present (error) ✗' : 'None (correct) ✓'}`);
  
  // Deserialize the saved state
  dialogSystem.deserialize(serializedState);
  console.log('› Deserialized saved state');
  
  // Verify the current dialog is restored
  const currentDialogAfterDeserialization = dialogSystem.getCurrentDialog();
  console.log('› Current dialog after deserialization:');
  console.log(`  • ID: ${currentDialogAfterDeserialization?.id.substring(0, 15)}...`);
  console.log(`  • Japanese: ${currentDialogAfterDeserialization?.japaneseText.substring(0, 30)}...`);
  
  // Verify the dialog is the same as before serialization
  const isSameDialog = currentDialogAfterDeserialization?.id === currentDialogBeforeSerialization?.id;
  console.log(`› Dialog correctly restored: ${isSameDialog ? 'Success ✓' : 'Failed ✗'}`);
  
  console.groupEnd();
} 