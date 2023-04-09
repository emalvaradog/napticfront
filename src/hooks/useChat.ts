import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startUpdatingChatRecord } from "../store/audioLogs/audioLogsThunks";
import { Message } from "@/interfaces/Record";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const useChat = (recordId?: string, chat?: Message[]) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>(chat || []);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(startUpdatingChatRecord(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    if (!recordId) return;
    setChatHistory(chat || []);
  }, [recordId]);

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    if (!recordId) {
      console.log("No record id");
      return;
    }
    setIsLoading(true);
    setInput("");

    const userMessage = {
      id: Date.now().toString(),
      content: { role: "user", content: input },
    } as Message;

    const botMessage = {
      id: "",
      content: { role: "assistant", content: "" },
    } as Message;

    setChatHistory((prev) => [...prev, userMessage]);

    try {
      if (API_URL) {
        const request = await fetch(
          `${API_URL}/ask?record_id=${recordId}&question=${input}`,
          {
            method: "GET",
          }
        );

        const response = await request.json();
        botMessage.id = Date.now().toLocaleString();
        botMessage.content.content = response;

        // @ts-ignore
        setChatHistory((prev) => [...prev, botMessage]);

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return { input, chatHistory, isLoading, handleInput, handleSubmit };
};
