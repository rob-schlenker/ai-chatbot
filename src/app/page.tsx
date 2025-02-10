'use client'

import { useChat } from 'ai/react'
import { Roboto } from 'next/font/google'
import { useRef, useEffect } from 'react'

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
  })
  const chatParent = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const domNode = chatParent.current
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight
    }
  })

  return (
    <div className="flex flex-col w-full max-w-2xl py-24 mx-auto stretch h-screen">
      <div className="text-center text-4xl mb-12">
        <h1 className={roboto.className}>Rob's A.I. Chatbot</h1>
      </div>
      <ul
        ref={chatParent}
        className="h-32 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4 bg-white border-gray-400 border-1 shadow-md"
      >
        {messages.map((m, index) =>
          m.role === 'user' ? (
            <li key={`user-${index}`} className="flex flex-row">
              <div className="rounded-xl p-4 bg-gray-800 shadow-md flex">
                <p className="text-primary"> {m.content}</p>
              </div>
            </li>
          ) : (
            <li key={`ai-${index}`} className="flex flex-row-reverse">
              <div className="rounded-xl p-4 bg-background shadow-md flex w-3/4">
                <p className="text-primary whitespace-pre-wrap">
                  <span className="font-bold ">Answer: </span>
                  {m.content}
                </p>
              </div>
            </li>
          ),
        )}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-2xl p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
