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
    <div className="flex flex-col w-full h-screen max-h-dvh">
      <div className=" text-center text-4xl my-12 max-w-3xl mx-auto p-4">
        <h1 className={roboto.className}>Rob's A.I. Chatbot</h1>
      </div>
      <div className="mx-auto container p-4 flex flex-col flex-grow max-w-3xl">
        <ul
          ref={chatParent}
          className="h-2 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4 bg-white border-gray-400 border-1 shadow-m"
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
          ))}
          {/* <p className="text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            enim ut, a eos, distinctio nesciunt quisquam magni, dolore eligendi
            obcaecati officiis nobis provident voluptates eveniet quis est
            labore excepturi soluta?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            enim ut, a eos, distinctio nesciunt quisquam magni, dolore eligendi
            obcaecati officiis nobis provident voluptates eveniet quis est
            labore excepturi soluta?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            enim ut, a eos, distinctio nesciunt quisquam magni, dolore eligendi
            obcaecati officiis nobis provident voluptates eveniet quis est
            labore excepturi soluta?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            enim ut, a eos, distinctio nesciunt quisquam magni, dolore eligendi
            obcaecati officiis nobis provident voluptates eveniet quis est
            labore excepturi soluta?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            enim ut, a eos, distinctio nesciunt quisquam magni, dolore eligendi
            obcaecati officiis nobis provident voluptates eveniet quis est
            labore excepturi soluta?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            enim ut, a eos, distinctio nesciunt quisquam magni, dolore eligendi
            obcaecati officiis nobis provident voluptates eveniet quis est
            labore excepturi soluta?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            enim ut, a eos, distinctio nesciunt quisquam magni, dolore eligendi
            obcaecati officiis nobis provident voluptates eveniet quis est
            labore excepturi soluta?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            enim ut, a eos, distinctio nesciunt quisquam magni, dolore eligendi
            obcaecati officiis nobis provident voluptates eveniet quis est
            labore excepturi soluta?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            enim ut, a eos, distinctio nesciunt quisquam magni, dolore eligendi
            obcaecati officiis nobis provident voluptates eveniet quis est
            labore excepturi soluta?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            enim ut, a eos, distinctio nesciunt quisquam magni, dolore eligendi
            obcaecati officiis nobis provident voluptates eveniet quis est
            labore excepturi soluta?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            enim ut, a eos, distinctio nesciunt quisquam magni, dolore eligendi
            obcaecati officiis nobis provident voluptates eveniet quis est
            labore excepturi soluta?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            enim ut, a eos, distinctio nesciunt quisquam magni, dolore eligendi
            obcaecati officiis nobis provident voluptates eveniet quis est
            labore excepturi soluta?
          </p> */}
        </ul>

        <section className="py-4">
          <form onSubmit={handleSubmit}>
            <input
              className="dark:bg-zinc-900 p-4 bottom-0 max-w-3xl mx-auto border border-zinc-300 dark:border-zinc-800 rounded shadow-xl w-full"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form>
        </section>
      </div>
    </div>
  )
}
