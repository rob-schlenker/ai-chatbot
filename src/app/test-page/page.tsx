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
      className="flex flex-col w-full h-screen max-h-dvh"
      style={{
        backgroundImage: 'url(/digital-6228020_1920.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100%',
      }}
    >
      <section className=" text-center text-4xl py-12 max-w-3xl mx-auto p-4">
        <h1
          onMouseEnter={handleMouseOverHeaderText}
          data-value="Rob's A.I. Chatbot"
          className={roboto.className}
        >
          {headerText}
        </h1>
      </section>

      <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
        <ul
          ref={chatParent}
          className="h-1 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4"
        >
          <li className="flex flex-row">
            <div className="rounded-xl p-4 bg-gray-800 shadow-md ">
              <p className="text-primary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nemo commodi laboriosam non dolorum exercitationem delectus accusamus ad porro reprehenderit amet distinctio ea dolores voluptates sapiente iusto itaque, minus optio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nemo commodi laboriosam non dolorum exercitationem delectus accusamus ad porro reprehenderit amet distinctio ea dolores voluptates sapiente iusto itaque, minus optio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nemo commodi laboriosam non dolorum exercitationem delectus accusamus ad porro reprehenderit amet distinctio ea dolores voluptates sapiente iusto itaque, minus optio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nemo commodi laboriosam non dolorum exercitationem delectus accusamus ad porro reprehenderit amet distinctio ea dolores voluptates sapiente iusto itaque, minus optio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nemo commodi laboriosam non dolorum exercitationem delectus accusamus ad porro reprehenderit amet distinctio ea dolores voluptates sapiente iusto itaque, minus optio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nemo commodi laboriosam non dolorum exercitationem delectus accusamus ad porro reprehenderit amet distinctio ea dolores voluptates sapiente iusto itaque, minus optio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nemo commodi laboriosam non dolorum exercitationem delectus accusamus ad porro reprehenderit amet distinctio ea dolores voluptates sapiente iusto itaque, minus optio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nemo commodi laboriosam non dolorum exercitationem delectus accusamus ad porro reprehenderit amet distinctio ea dolores voluptates sapiente iusto itaque, minus optio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nemo commodi laboriosam non dolorum exercitationem delectus accusamus ad porro reprehenderit amet distinctio ea dolores voluptates sapiente iusto itaque, minus optio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nemo commodi laboriosam non dolorum exercitationem delectus accusamus ad porro reprehenderit amet distinctio ea dolores voluptates sapiente iusto itaque, minus optio!
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nemo commodi laboriosam non dolorum exercitationem delectus accusamus ad porro reprehenderit amet distinctio ea dolores voluptates sapiente iusto itaque, minus optio!</p>
            </div>
          </li>
        </ul>
      </section>

      <section className="py-4 mx-auto container p-4 max-w-3xl">
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
  )
}
