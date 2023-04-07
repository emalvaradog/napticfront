import { ChatMessage } from "./ChatMessage/ChatMessage";
import styles from "./styles.module.scss";

export function NapticChatBot({ history = [] }) {
  const [chatHistory, setChatHistory] = useState(history);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleInput(e) {
    const { value } = e.target;
    setInput(value);
  }

  function handleSend() {
    setIsLoading(true);

    // fetch to backend
    const newMessage = {
      id: chatHistory.length + 1,
      content: input,
    };

    setChatHistory((prev) => [...prev, newMessage]);
    setInput("");
    // Fetch to backend
    setIsLoading(false);
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h1>Chat</h1>
      </div>
      <div className={styles.chatBody}>
        {chatHistory.map((e) => (
          <ChatMessage key={e.id} content={e.content} />
        ))}
      </div>
      <div>
        <input value={input} onChange={handleInput} />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}
