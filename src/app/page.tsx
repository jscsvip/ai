'use client'
import Image from "next/image";
import { useState } from "react";
import EastIcon from '@mui/icons-material/East';

export default function Home() {
  const [input, setInput] = useState("");
  // 切换模型
  const [model, setModel] = useState("deepseek-v3");
   const handleChangeModel = () => {
    setModel(model === 'deepseek-r1' ? 'deepseek-v3' : 'deepseek-r1');
  }
  return  (
    <div className="flex flex-col items-center h-screen">
      <div className="h-1/5"></div>
      <div className="w-1/2">
        <p className="text-2xl text-center text-bold">
          有什么可以帮助您?
        </p> 
        <div className="flex flex-col items-center justify-center mt-4 shadow-lg border-[1px] border-gray-300 h-32 rounded-lg">
          <textarea className="p-3 w-full rounded-lg h-30 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
            <div className="flex justify-center items-center p-1 mr-4 rounded-full border-2 border-black">
              <EastIcon />
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}
