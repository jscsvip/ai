import { integer, pgTable, varchar, text,serial } from "drizzle-orm/pg-core";
 

export const chatsTable = pgTable("chats", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title:text("title").notNull(),
  model:text("model").notNull(),
})
export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id").references(()=>chatsTable.id),
  content: text("content").notNull(),
  role: text("role").notNull(),
})

export type ChatsModel = typeof chatsTable.$inferSelect;
export type MessagesModel = typeof messagesTable.$inferSelect;