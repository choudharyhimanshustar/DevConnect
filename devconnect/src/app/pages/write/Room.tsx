"use client";

import { ReactNode, useRef } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList } from "@liveblocks/client";
import { useStorage } from "@liveblocks/react/suspense";
import { useMutation } from "@liveblocks/react/suspense";
import Image from 'next/image';
import { Tilt } from 'react-tilt'

export function Room({ children }: { children: ReactNode }) {

  return (
    <LiveblocksProvider publicApiKey={"pk_dev_5MMLGHqgRSbH1aeTMLs4o8t9syHv6CMxJQe5wXK3lQP6nsVOOlBLgE0yPAcpsnBe"}>
      <RoomProvider id="my-room"
        initialStorage={{
          blogs: new LiveList<string>(["typewriter"])
        }}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <Content>
            {children}
          </Content>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}



function Content({ children }: { children: ReactNode }) {
  const blogRef = useRef<HTMLInputElement>(null);
  var blogs = useStorage((root) => root.blogs);
  const updateStorage = useMutation(({ storage }, newBlog: string) => {
    const newblogs = storage.get("blogs");
    newblogs.insert(newBlog, 0);
  }, []);
  const deleteStorage = useMutation(({ storage }, index) => {
    const newblogs = storage.get("blogs");
    newblogs.delete(index);
  }, [])
  if (!blogs) {
    return <div>Loading...</div>
  }
  return (
    <>
      {children}
      <div className="flex flex-col items-center">
        <div className='w-fit mx-auto p-2 bg-gray-300 h-[30%] rounded-lg flex flex-col items-center space-y-4 cursor-text justify-center'
        >
          <Image src={"https://i.pinimg.com/originals/12/e3/fb/12e3fb42f1bbb70f41fb392a3f7b6686.gif"} alt='Profile Picture' width={80} height={100} className='rounded-full' />


          <textarea placeholder="Add a blog" type="text"
            className={` w-[50vw] h-[5vh] focus:h-[30vh] bg-gray-300  outline-none resize-none rounded-md p-1 overflow-hidden`} ref={blogRef}
            onFocus={() => document.getElementById("savebtn")?.classList.remove("hidden")}
            onBlur={() => document.getElementById("savebtn")?.classList.add("hidden")}
          />
          <button onMouseDown={() => {
            if (blogRef.current) {
              updateStorage(blogRef.current.value)
              blogRef.current.value = "";
            }
          }
          } id="savebtn" className={`px-2 border-2 border-gray-500  rounded-md mt-2 relative`}>Save</button>
        </div>

        <div className="max-w-[70vw] flex flex-row grid grid-cols-3 max-h-[80vh] overflow-y-auto space-y-4 mt-5 p-2">
          {blogs.map((blog, index) => (
            <Tilt
              className={`${index === 0 ? 'mb-0 mt-[16px]' : ''} bg-gray-200 text-black p-2 m-2 rounded-md w-[20vw] max-h-[50vh] overflow-hidden text-wrap break-words  opacity-40 
            hover:opacity-100 cursor-pointer flex`}>
              <div key={index}
              >
                <button onClick={() => deleteStorage(index)}>X</button>
                {blog}
              </div>
            </Tilt>
          ))}
        </div>
      </div>


    </>
  )
}