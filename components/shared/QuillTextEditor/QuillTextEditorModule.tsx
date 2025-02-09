import hljs from "highlight.js/lib/common";

const quillModules = {
  syntax: {
    highlight: function (text: string) {
      return hljs.highlightAuto(text).value;
    },
  },
  formula: true,
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video", "formula"],

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    // [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ],
};

export default quillModules;
