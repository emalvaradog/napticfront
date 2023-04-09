export interface TranscriptTimestamp {
  end: number;
  id: number;
  start: number;
  text: string;
}

export interface Transcription {
  text: string;
  timestamps: TranscriptTimestamp[];
}

export interface MessageContent {
  role: "user" | "assistant";
  content: string;
}

export interface Message {
  id: string;
  content: MessageContent;
}

export interface Record {
  id: string;
  audios: string[];
  chat: Message[];
  uploadedBy: string;
  creationDate: string;
  title: string;
  transcription: Transcription;
}
