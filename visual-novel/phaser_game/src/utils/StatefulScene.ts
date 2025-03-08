/**
 * Interface for scenes that can serialize and deserialize their state.
 * Implementing this interface allows scenes to participate in state preservation
 * during hot module replacement and save/load functionality.
 */
export interface StatefulScene {
  /**
   * Serialize the scene's state into a JSON-serializable object.
   * This method should capture all relevant state that needs to be preserved.
   * @returns A JSON-serializable object representing the scene's state
   */
  serializeState(): any;
  
  /**
   * Deserialize and apply a previously serialized state to the scene.
   * This method should restore the scene to the state represented by the provided object.
   * @param state The state object to apply to the scene
   */
  deserializeState(state: any): void;
} 