"use client";

import React, { useRef, useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Youtube from "@tiptap/extension-youtube";
import { common, createLowlight } from "lowlight";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Highlighter,
  Eraser,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListTodo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Code,
  Minus,
  Link2,
  Unlink,
  Table as TableIcon,
  Trash2,
  Video,
  ImageIcon,
  Undo2,
  Redo2,
  Loader2,
  Plus,
} from "lucide-react";
import { uploadBlogImage } from "@/lib/services/blogsService";

const lowlight = createLowlight(common);

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: false,
      }),
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-[#2B7DA8] underline font-medium hover:text-[#0C4568] transition-colors",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse table-auto w-full my-4 border border-slate-300 rounded-lg overflow-hidden",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "bg-slate-100 font-bold p-3 border border-slate-300 text-left text-slate-800 text-sm",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "p-3 border border-slate-200 text-slate-700 text-sm",
        },
      }),
      Subscript,
      Superscript,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm my-4 overflow-x-auto border border-slate-800",
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "space-y-1.5 my-3 list-none pl-0",
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex items-start gap-2.5 my-1 text-slate-700",
        },
      }),
      Youtube.configure({
        inline: false,
        width: 640,
        height: 380,
        HTMLAttributes: {
          class: "mx-auto my-6 rounded-xl overflow-hidden shadow-md max-w-full aspect-video",
        },
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none p-6 min-h-[420px] focus:outline-none bg-white text-slate-800 selection:bg-[#3CA8D9]/20 leading-relaxed",
      },
    },
  });

  // Handle Image Upload with Canvas Compression
  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;

      try {
        setIsUploading(true);
        const downloadUrl = await uploadBlogImage(file, "editor-images");
        editor.chain().focus().setImage({ src: downloadUrl, alt: file.name }).run();
      } catch (err) {
        console.error("Failed to upload editor image:", err);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [editor]
  );

  // Link Handlers
  const handleSetLink = () => {
    if (!editor) return;
    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      let formattedUrl = linkUrl.trim();
      if (!/^https?:\/\//i.test(formattedUrl) && !formattedUrl.startsWith("/") && !formattedUrl.startsWith("#")) {
        formattedUrl = `https://${formattedUrl}`;
      }
      editor.chain().focus().extendMarkRange("link").setLink({ href: formattedUrl }).run();
    }
    setShowLinkModal(false);
    setLinkUrl("");
  };

  // YouTube Handler
  const handleInsertYoutube = () => {
    if (!editor || !youtubeUrl) return;
    editor.commands.setYoutubeVideo({
      src: youtubeUrl.trim(),
    });
    setShowYoutubeModal(false);
    setYoutubeUrl("");
  };

  // Table Handler
  const handleInsertTable = () => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: Math.max(1, tableRows), cols: Math.max(1, tableCols), withHeaderRow: true })
      .run();
    setShowTableModal(false);
  };

  if (!editor) {
    return (
      <div className="border border-slate-200 rounded-xl bg-white p-8 flex items-center justify-center text-slate-400 gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-[#0C4568]" />
        <span>Loading Editor...</span>
      </div>
    );
  }

  const btnStyle = (active: boolean) =>
    `p-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center justify-center ${
      active
        ? "bg-[#0C4568] text-white shadow-2xs"
        : "text-slate-600 hover:text-[#0C4568] hover:bg-slate-200/70"
    }`;

  return (
    <div className="border border-slate-200 rounded-xl bg-white shadow-2xs overflow-hidden focus-within:ring-2 focus-within:ring-[#0C4568]/20 focus-within:border-[#0C4568] transition-all">
      {/* Hidden File Input for Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Sticky MenuBar */}
      <div className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200 text-slate-600 p-2 flex flex-wrap items-center gap-1">
        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
          <button
            type="button"
            title="Undo (Ctrl+Z)"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={`${btnStyle(false)} disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Redo (Ctrl+Y)"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={`${btnStyle(false)} disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Headings & Paragraph */}
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
          <button
            type="button"
            title="Paragraph"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={btnStyle(editor.isActive("paragraph") && !editor.isActive("heading"))}
          >
            <Pilcrow className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Heading 1"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={btnStyle(editor.isActive("heading", { level: 1 }))}
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Heading 2"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={btnStyle(editor.isActive("heading", { level: 2 }))}
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Heading 3"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={btnStyle(editor.isActive("heading", { level: 3 }))}
          >
            <Heading3 className="w-4 h-4" />
          </button>
        </div>

        {/* Text Formats */}
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
          <button
            type="button"
            title="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={btnStyle(editor.isActive("bold"))}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={btnStyle(editor.isActive("italic"))}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={btnStyle(editor.isActive("underline"))}
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Strikethrough"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={btnStyle(editor.isActive("strike"))}
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Highlight"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={btnStyle(editor.isActive("highlight"))}
          >
            <Highlighter className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Subscript"
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            className={btnStyle(editor.isActive("subscript"))}
          >
            <SubscriptIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Superscript"
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            className={btnStyle(editor.isActive("superscript"))}
          >
            <SuperscriptIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Clear Formatting"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className={btnStyle(false)}
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
          <button
            type="button"
            title="Align Left"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={btnStyle(editor.isActive({ textAlign: "left" }))}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Align Center"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={btnStyle(editor.isActive({ textAlign: "center" }))}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Align Right"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={btnStyle(editor.isActive({ textAlign: "right" }))}
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Justify"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={btnStyle(editor.isActive({ textAlign: "justify" }))}
          >
            <AlignJustify className="w-4 h-4" />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
          <button
            type="button"
            title="Bullet List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={btnStyle(editor.isActive("bulletList"))}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Numbered List"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={btnStyle(editor.isActive("orderedList"))}
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Task List"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={btnStyle(editor.isActive("taskList"))}
          >
            <ListTodo className="w-4 h-4" />
          </button>
        </div>

        {/* Inserts: Blockquote, Code Block, Horizontal Rule */}
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-1">
          <button
            type="button"
            title="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={btnStyle(editor.isActive("blockquote"))}
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Code Block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={btnStyle(editor.isActive("codeBlock"))}
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Horizontal Rule"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={btnStyle(false)}
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Media & Link Inserts */}
        <div className="flex items-center gap-0.5">
          {/* Link */}
          <button
            type="button"
            title="Insert Link"
            onClick={() => {
              const previousUrl = editor.getAttributes("link").href;
              setLinkUrl(previousUrl || "");
              setShowLinkModal(true);
            }}
            className={btnStyle(editor.isActive("link"))}
          >
            <Link2 className="w-4 h-4" />
          </button>
          {editor.isActive("link") && (
            <button
              type="button"
              title="Remove Link"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className={btnStyle(false)}
            >
              <Unlink className="w-4 h-4 text-red-500" />
            </button>
          )}

          {/* Table */}
          <button
            type="button"
            title="Insert Table"
            onClick={() => setShowTableModal(true)}
            className={btnStyle(editor.isActive("table"))}
          >
            <TableIcon className="w-4 h-4" />
          </button>
          {editor.isActive("table") && (
            <button
              type="button"
              title="Delete Table"
              onClick={() => editor.chain().focus().deleteTable().run()}
              className={`${btnStyle(false)} text-red-600 hover:bg-red-50`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* YouTube */}
          <button
            type="button"
            title="Embed YouTube Video"
            onClick={() => setShowYoutubeModal(true)}
            className={btnStyle(false)}
          >
            <Video className="w-4 h-4" />
          </button>

          {/* Image Upload */}
          <button
            type="button"
            title="Upload Image (Auto Compressed to 1200px)"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`${btnStyle(false)} bg-blue-50 text-[#0C4568] hover:bg-blue-100/70`}
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#0C4568]" />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="min-h-[420px] bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#0C4568] mb-2">Insert / Edit Link</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter target URL. Internal links will automatically omit nofollow.
            </p>
            <input
              type="url"
              placeholder="https://cavue.co/service or /contact"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C4568]/20 focus:border-[#0C4568] mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkUrl("");
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSetLink}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0C4568] hover:bg-[#0C3852] text-white transition-colors"
              >
                Apply Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Modal */}
      {showYoutubeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#0C4568] mb-2">Embed YouTube Video</h3>
            <p className="text-xs text-slate-500 mb-4">Paste the full YouTube video link or share URL.</p>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C4568]/20 focus:border-[#0C4568] mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowYoutubeModal(false);
                  setYoutubeUrl("");
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertYoutube}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0C4568] hover:bg-[#0C3852] text-white transition-colors"
              >
                Embed Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Insertion Modal */}
      {showTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#0C4568] mb-2">Create Table</h3>
            <p className="text-xs text-slate-500 mb-4">Specify the initial row and column count.</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Rows</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={tableRows}
                  onChange={(e) => setTableRows(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C4568]/20 focus:border-[#0C4568]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Columns</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={tableCols}
                  onChange={(e) => setTableCols(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C4568]/20 focus:border-[#0C4568]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowTableModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertTable}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0C4568] hover:bg-[#0C3852] text-white transition-colors"
              >
                Insert Table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
