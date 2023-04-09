import styles from "./styles.module.scss";

export function ChatMessage({
  role,
  content,
}: {
  role: string;
  content: string;
}) {
  return (
    <div
      className={`${styles.message} ${
        role === "user" ? styles.userMessage : styles.systemMessage
      }`}
    >
      <p>{content}</p>
    </div>
  );
}
