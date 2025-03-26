import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { chatsTable, messagesTable } from './schema';
import { and, eq, desc } from 'drizzle-orm';
const client = postgres(process.env.DATABASE_URL!)
const db = drizzle({ client });

// chats
export const createChat = async (userId: string, title: string, model: string) => {
    try {
        const [newChat] = await db.insert(chatsTable).values({
            userId,
            title,
            model,
        }).returning()
        return newChat;
    } catch (error) {
        console.log('error creart chat', error)
        return null
    }
}

export const getChat = async (userId: string, chatId: number) => {
    try {
        // 引入 and 和 eq 函数
        // 修改查询语句
        const chats = await db.select().from(chatsTable).where(and(eq(chatsTable.id, chatId), eq(chatsTable.userId, userId)));
        if(chats.length === 0) return null;
        return chats[0];
    } catch (error) {
        console.log('error get chat', error)
        return null
    }
}

export const getChats = async (userId: string) => {
    try {
// 引入 desc 函数
// 修改后的代码
const chats = await db.select().from(chatsTable).where(eq(chatsTable.userId, userId)).orderBy(desc(chatsTable.id));
        return chats;
    } catch (error) {
        console.log('error get chats', error)
        return null
    }
}

//messages
export const getMessages = async (chatId: number) => {
    try {
        const messages = await db.select().from(messagesTable).where(eq(messagesTable.chatId, chatId));
        return messages;
    } catch (error) {
        console.log('error get messages', error)
        return null
    }

}

export const creatMessage = async (chat_id: number, content: string, role: string) => {
    try {
        const [newMessage] = await db.insert(messagesTable).values({
            chatId:chat_id,
            content,
            role,
        }).returning() 
        return newMessage;
    } catch (error) {
        console.log('error create message', error)
        return null 
    }
}