"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import {
  liveblocksConfig,
  LiveblocksPlugin,
  FloatingToolbar,
} from "@liveblocks/react-lexical";
import { Threads } from "./Threads";
export function Editor() {
  // Wrap your Lexical config with `liveblocksConfig`
  const initialConfig = liveblocksConfig({
    namespace: "Writerly",
    onError: (error: unknown) => {
        console.error("Lexical Error:", error);
      throw error;
    },
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="w-[50vw] flex items-center justify-center ">
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div className="border-2 w-full rounded-lg border-gray-500 p-2">Start typing here…</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <LiveblocksPlugin>
          <Threads/>
          <FloatingToolbar />
        </LiveblocksPlugin>
      </div>
    </LexicalComposer>
  );
}