"use client";
import dynamic from "next/dynamic";

const TextEditorPanel = dynamic(() => import("./EditorPanel"), {
  ssr: false,
});

const TextEditor = () => {
  return (
    <>
      <TextEditorPanel />
    </>
  );
};

export default TextEditor;
