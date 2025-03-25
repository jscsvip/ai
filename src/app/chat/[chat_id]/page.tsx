'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import EastIcon from '@mui/icons-material/East';

export default function Page() {
  console.log('Inside Page component'); 
  try {
    const { messages, input, handleInputChange, handleSubmit } = useChat({});
    console.log('useChat hook called successfully'); 
    const endRef = useRef<HTMLDivElement>(null);
    // 有消息自动到最低部
    useEffect(() => {
      if (endRef.current) {
        endRef?.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, [messages]);

    const [model, setModel] = useState("deepseek-v3");
    const handleChangeModel = () => {
      setModel(model === 'deepseek-r1' ? 'deepseek-v3' : 'deepseek-r1');
    }
    return (
      <>
      <div className='flex flex-col justify-between items-center h-screen'>
        <div className='flex overflow-auto flex-col flex-1 gap-8 justify-between w-2/3'>
          <div className='h-4'></div>
          <div className='flex flex-col flex-1 gap-8'>
            {messages.map(message => (
              <div key={message.id}
              className={`rounded-lg flex flex-row ${message.role === 'assistant' ? 'justify-start mr-18' : 'justify-end ml-10'}`}
              >
                {/* {message.role === 'user' ? 'User: ' : 'AI: '} */}
                <p className={`inline-block p-2 rounded-lg ${message?.role === 'assistant'?'bg-blue-300':'bg-slate-100'}`}>
                  {message?.content}
                </p>
              </div>
            ))}  
          </div>
        </div>
        <div className='h-4' ref={endRef}></div>
        <div className="flex flex-col items-center justify-center mt-4 shadow-lg border-[1px] border-gray-300 h-32 rounded-lg  w-2/3">
            <textarea className="p-3 w-full rounded-lg h-30 focus:outline-none"
              value={input}
              onChange={handleInputChange}
              placeholder="请输入您的问题"
            ></textarea>
            <div className="flex flex-row justify-between items-center mb-2 w-full h-12">
              <div>
                <div className={`flex flex-row items-center justify-center rounded-lg border-[1px] px-2 py-1 ml-2 cursor-pointer ${model === 'deepseek-r1'?'border-blue-300 bg-blue-200':'border-gray-300'}`}
                onClick={handleChangeModel}
                >
                  <p className="text-sm">深度思考(R1)</p>
                </div>
              </div>
              <div className="flex justify-center items-center p-1 mr-4 rounded-full border-2 border-black" onClick={handleSubmit}>
                <EastIcon />
              </div>
            </div>
          
          </div>
      </div>
      
      </>
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error calling useChat hook:', error.message, error.stack);
    } else {
      console.error('Error calling useChat hook:', error);
    }
    return <div>调用API失败</div>;
  }
}