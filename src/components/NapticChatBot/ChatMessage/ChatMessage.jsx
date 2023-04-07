import styles from "./styles.module.scss";

export function ChatMessage({ content }) {
  return (
    <div>
      <p>{content}</p>
    </div>
  );
}
