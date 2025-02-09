"use client";

import React, { Component } from "react";
import dynamic from "next/dynamic";
import { FormInstance } from "antd";
import katex from "katex";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import quillModules from "./QuillTextEditorModule";
import { showError } from "@/app/utils/axiosError";

if (typeof window !== "undefined") {
  window.katex = katex;
}

interface QuillEditorProps {
  form: FormInstance;
  name: string | (string | number)[];
  maxLength?: number;
  className?: string;
  onContentChange?: (content: string) => void;
}

interface QuillEditorState {
  content: string;
  contentLength: number;
}

class QuillEditor extends Component<QuillEditorProps, QuillEditorState> {
  reactQuill: any;
  constructor(props: QuillEditorProps) {
    super(props);
    this.state = {
      content: "",
      contentLength: 0,
    };
  }

  componentDidMount() {
    const { form, name } = this.props;
    const initialContent = this.getFieldValue();
    const plainTextContent = this.stripHtmlTags(initialContent);
    this.setState({
      content: initialContent,
      contentLength: plainTextContent.length,
    });
  }

  componentDidUpdate(prevProps: QuillEditorProps) {
    const { form, name } = this.props;
    if (prevProps.name !== name) {
      const initialContent = this.getFieldValue();
      const plainTextContent = this.stripHtmlTags(initialContent);
      this.setState({
        content: initialContent,
        contentLength: plainTextContent.length,
      });
    }
  }

  getFieldValue = () => {
    const { form, name } = this.props;
    if (Array.isArray(name)) {
      return form.getFieldValue(name.join(".")) || "";
    } else {
      return form.getFieldValue(name) || "";
    }
  };

  stripHtmlTags = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  handleChange = (value: string) => {
    const { form, name, maxLength, onContentChange } = this.props;
    const plainTextContent = this.stripHtmlTags(value); // Strip HTML tags from content
    if (maxLength && plainTextContent.length > maxLength) {
      showError(`Content cannot exceed ${maxLength} characters.`);
      return;
    }
    this.setState({ content: value });
    if (Array.isArray(name)) {
      form.setFieldsValue({ [name.join(".")]: value });
    } else {
      form.setFieldsValue({ [name]: value });
    }

    if (onContentChange) {
      onContentChange(plainTextContent); // Notify the parent component with plain text content
    }
  };

  handleKeyDown = (event: React.KeyboardEvent) => {
    const { maxLength } = this.props;
    const { content } = this.state;

    if (
      maxLength &&
      this.stripHtmlTags(content).length >= maxLength &&
      event.key !== "Backspace"
    ) {
      showError(`Content cannot exceed ${maxLength} characters.`);
      event.preventDefault();
    }
  };

  render() {
    const { content, contentLength } = this.state;
    const { className } = this.props;

    return (
      <div onKeyDown={this.handleKeyDown}>
        <ReactQuill
          value={content}
          onChange={this.handleChange}
          modules={quillModules}
          theme="snow"
          placeholder="Compose an epic ..."
          className={`${className || ""}`}
          // formats={this.form}
        />
      </div>
    );
  }
}

export default QuillEditor;
