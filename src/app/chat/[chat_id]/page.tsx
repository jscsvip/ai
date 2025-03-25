'use client';

import { useChat } from '@ai-sdk/react';

export default function Page() {
  console.log('Inside Page component'); 
  try {
    const { messages, input, handleInputChange, handleSubmit } = useChat({});
    console.log('useChat hook called successfully'); 
    return (
      <>
        {messages.map(message => (
          <div key={message.id}>
            {message.role === 'user' ? 'User: ' : 'AI: '}
            {message.content}
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <input name="prompt" value={input} onChange={handleInputChange} />
          <button type="submit">Submit</button>
        </form>
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