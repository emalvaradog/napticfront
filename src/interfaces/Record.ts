export interface Timestamp {
    end: Number
    id: Number
    start: Number
    text: string
}

export interface transcription {
    text: string,
    timestamps: Timestamp[]
}

export interface ChatMessage {
    role: "user" | "assistant",
    content: string
}

export interface Record {
    id: string
    audios: string[]
    chatHistory: ChatMessage[]
    uploadedBy: string
    creationDate: Date
    title: string
    transcription: any
}