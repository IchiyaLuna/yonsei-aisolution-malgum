interface APIError {
  error: string;
  message: string;
  statusCode: number;
}

interface User {
  id: string;
  name: string;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  data: { text: string | undefined };
  created_at: Date;
}

interface Conversation {
  id: string;
  users: User[];
  latest_message: Message;
}
