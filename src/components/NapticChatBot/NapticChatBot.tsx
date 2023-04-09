import { ChatMessage } from "./ChatMessage/ChatMessage";
import styles from "./styles.module.scss";
import { useChat } from "../../hooks/useChat";
import { Message } from "@/interfaces/Record";

export function NapticChatBot({
  chat,
  recordId,
}: {
  chat?: Message[];
  recordId?: string;
}) {
  const { input, chatHistory, isLoading, handleInput, handleSubmit } = useChat(
    recordId,
    chat
  );

  async function handleResponse(e: React.MouseEvent<HTMLButtonElement>) {
    await handleSubmit(e);
  }

  function resizeTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    handleInput(e);
    if (e.target.innerText == "") {
      e.target.style.height = "auto";
    }
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  return (
    <div className={styles.chat}>
      <div className={styles.chatHeader}>
        <h1>Naptic Chat</h1>
      </div>
      <div className={styles.chatContent}>
        <div className={styles.chatContentContainer}>
          {chatHistory.length === 0 ? (
            <div className={styles.chatContentContainerEmpty}>
              <span>
                Preguntale a naptic bot cualquier cosa relacionada a tu audio:
                hazme un resumen / dame los 5 puntos principales
              </span>
            </div>
          ) : (
            <>
              {chatHistory.map((e: Message) => (
                <ChatMessage
                  key={e?.id}
                  role={e?.content.role}
                  content={e?.content.content}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className={styles.chatInput}>
        <div className={styles.chatInputContainer}>
          <textarea
            value={input}
            placeholder="Tu mensaje"
            onChange={resizeTextArea}
            disabled={isLoading}
          />
          <button onClick={handleResponse} disabled={isLoading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="paper-plane"
            >
              <path d="M20.34,9.32l-14-7a3,3,0,0,0-4.08,3.9l2.4,5.37h0a1.06,1.06,0,0,1,0,.82l-2.4,5.37A3,3,0,0,0,5,22a3.14,3.14,0,0,0,1.35-.32l14-7a3,3,0,0,0,0-5.36Zm-.89,3.57-14,7a1,1,0,0,1-1.35-1.3l2.39-5.37A2,2,0,0,0,6.57,13h6.89a1,1,0,0,0,0-2H6.57a2,2,0,0,0-.08-.22L4.1,5.41a1,1,0,0,1,1.35-1.3l14,7a1,1,0,0,1,0,1.78Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
