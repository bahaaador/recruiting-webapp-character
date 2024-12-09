import { Character } from "./types";

const API_BASE_URL = "https://recruiting.verylongdomaintotestwith.ca/api";
const GITHUB_USERNAME = "bahaaador";

export const saveCharacter = async (character: Character) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${GITHUB_USERNAME}/character`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(character),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save character");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving character:", error);
    throw error;
  }
};

export const loadCharacter = async (): Promise<Character | null> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${GITHUB_USERNAME}/character`
    );

    if (!response.ok) {
      throw new Error("Failed to load character");
    }
    const jsonRes = await response.json();
    return jsonRes.body ? jsonRes.body : null;
  } catch (error) {
    console.error("Error loading character:", error);
    return null;
  }
};
