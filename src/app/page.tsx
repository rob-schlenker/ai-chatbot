'use client'

import { useChat } from '@ai-sdk/react'
import { Roboto } from 'next/font/google'
import { useRef, useEffect, useState } from 'react'

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    maxSteps: 5,
  })
  const chatParent = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const domNode = chatParent.current
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight
    }
  })

  const [headerText, setHeaderText] = useState("Rob's A.I. Chatbot")
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseOverHeaderText = () => {
    let iteration = 0

    clearInterval(intervalRef.current!)

    intervalRef.current = setInterval(() => {
      setHeaderText((prev) =>
        prev
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return "Rob's A.I. Chatbot"[index]
            }

            return letters[Math.floor(Math.random() * 26)]
          })
          .join(''),
      )

      if (iteration >= "Rob's A.I. Chatbot".length) {
        clearInterval(intervalRef.current!)
      }

      iteration += 1 / 3
    }, 30)
  }

  return (
    <div
      className="flex flex-col w-full h-dvh"
      style={{
        backgroundImage: 'url(/digital-6228020_1920.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className=" text-center text-4xl py-12 max-w-3xl mx-auto p-4">
        <h1
          onMouseEnter={handleMouseOverHeaderText}
          data-value="Rob's A.I. Chatbot"
          className={roboto.className}
        >
          {headerText}
        </h1>
      </div>
      <div className="mx-auto container p-4 flex flex-col flex-grow max-w-3xl">
        <ul
          ref={chatParent}
          className="relative p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4 bg-white border-gray-400 border-1 shadow-m"
        >
          {messages.length === 0 ? (
            <li className="text-gray-500 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Please ask a question below...
            </li>
          ) : (
            messages.map((m, index) =>
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
            )
          )}
          {isLoading && (
            <li className="flex flex-row-reverse">
              <div className="rounded-xl p-4 bg-background shadow-md flex w-3/4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                  <span className="text-gray-500 ml-2"></span>
                </div>
              </div>
            </li>
          )}
        </ul>

        <section className="py-4">
          <form onSubmit={handleSubmit}>
            <input
              className="dark:bg-zinc-900 p-4 bottom-0 max-w-3xl mx-auto border border-zinc-300 dark:border-zinc-800 rounded-lg shadow-xl w-full"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </form>
        </section>
      </div>
    </div>
  )
}
