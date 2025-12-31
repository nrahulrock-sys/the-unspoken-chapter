
// Enum representing the different sections of the application journey
export enum AppSection {
  WELCOME = 'WELCOME',
  MEMORIES = 'MEMORIES',
  FINAL = 'FINAL'
}

// Interface for a memory record used in the story sequence
export interface Memory {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
}

// Interface for the final letter content
export interface FinalLetter {
    header: string;
    body: string;
}