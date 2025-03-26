import { createChat } from "@/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { title,model } = await req.json();
  const {userId} = await auth()
  if(userId){
    // 1.创建一个新的chat
    const newChat = await createChat(userId,title,model)
    // 2.返回新的chat的id
    return new Response(JSON.stringify({id:newChat?.id}),{status:200})
  }
}