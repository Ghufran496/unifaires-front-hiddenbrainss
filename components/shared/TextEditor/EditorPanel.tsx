"use client";
import {
  ChangeEvent,
  HTMLProps,
  KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BoldExtension,
  ItalicExtension,
  BulletListExtension,
  HeadingExtension,
  OrderedListExtension,
  TaskListExtension,
  AnnotationExtension,
  CalloutExtension,
  UnderlineExtension,
  // createCenteredAnnotationPositioner,
  BlockquoteExtension,
  CodeBlockExtension,
  CodeExtension,
  DocExtension,
  EmojiExtension,
  FontFamilyExtension,
  FontSizeExtension,
  HorizontalRuleExtension,
  ImageExtension,
  DropCursorExtension,
  LinkExtension,
  createMarkPositioner,
  PlaceholderExtension,
  StrikeExtension,
  SubExtension,
  SupExtension,
  ShortcutHandlerProps,
} from "remirror/extensions";
import { htmlToProsemirrorNode } from "remirror";
import css from "refractor/lang/css.js";
import javascript from "refractor/lang/javascript.js";
import json from "refractor/lang/json.js";
import markdown from "refractor/lang/markdown.js";
import typescript from "refractor/lang/typescript.js";
import {
  // EditorComponent,
  // PositionerPortal,
  // usePositioner,
  CommandButton,
  EditorComponent,
  FloatingToolbar,
  FloatingWrapper,
  useAttrs,
  useChainedCommands,
  useCurrentSelection,
  useExtensionEvent,
  useUpdateReason,
  CommandButtonGroup,
  CommandMenuItem,
  DropdownButton,
  useActive,
  useCommands,
  ToggleCodeButton,
  BasicFormattingButtonGroup,
  HeadingLevelButtonGroup,
  HistoryButtonGroup,
  ToggleBlockquoteButton,
  InsertHorizontalRuleButton,
  ListButtonGroup,
  ToggleStrikeButton,
  ToggleSubscriptButton,
  ToggleSuperscriptButton,
  // ,
  useRemirror,
  Remirror,
  ThemeProvider,
  Toolbar,
} from "@remirror/react";
import { AllStyledComponent } from "@remirror/styles/emotion";
import { ProsemirrorNode } from "remirror";

const renderEmoji = (node: ProsemirrorNode) => {
  const emoji = document.createElement("span");
  emoji.textContent = node.attrs.emoji;
  return emoji;
};

const extensions = () => [
  new PlaceholderExtension({ placeholder: "I'm a placeholder!" }),
  new StrikeExtension(),
  // new HeadingExtension(),
  // new BoldExtension(),
  new ItalicExtension(),
  new UnderlineExtension(),
  new BlockquoteExtension(),
  new CalloutExtension({ renderEmoji, defaultEmoji: "💡" }),
  new CodeBlockExtension({
    supportedLanguages: [css, javascript, json, markdown, typescript],
  }),
  new DocExtension({ content: "text*" }),
  new FontFamilyExtension(),
  new FontSizeExtension({ defaultSize: "16", unit: "px" }),
  // new HorizontalRuleExtension(),
  new ImageExtension({ enableResizing: true }),
  // new DropCursorExtension(),
  new LinkExtension({ autoLink: true }),
  // new BulletListExtension(),
  new OrderedListExtension(),
  new CodeExtension(),
  new TaskListExtension(),
  // new HeadingExtension(),
  new UnderlineExtension(),
  // new LinkExtension(),
  new SubExtension(),
  new SupExtension(),
];

const FONT_SIZES = ["8", "10", "12", "14", "16", "18", "24", "30"];

const FontSizeButtons = () => {
  const { setFontSize } = useCommands();
  const { fontSize } = useActive();
  return (
    <DropdownButton aria-label="Set font size" icon="fontSize">
      {FONT_SIZES.map((size) => (
        <CommandMenuItem
          key={size}
          commandName="setFontSize"
          onSelect={() => setFontSize(size)}
          enabled={setFontSize.enabled(size)}
          active={fontSize({ size })}
          label={size}
          icon={null}
          displayDescription={false}
        />
      ))}
    </DropdownButton>
  );
};

const FontFamilyButtons = () => {
  const { setFontFamily } = useCommands();
  const active = useActive();
  const FONT_FAMILIES: Array<[React.CSSProperties["fontFamily"], string]> = [
    ["serif", "Serif"],
    ["sans-serif", "San serif"],
    ["cursive", "Cursive"],
    ["fantasy", "Fantasy"],
  ];
  return (
    <CommandButtonGroup>
      <DropdownButton aria-label="Font family" icon="text">
        {FONT_FAMILIES.map(([fontFamily, label]) => (
          <CommandMenuItem
            key={fontFamily}
            commandName="setFontFamily"
            onSelect={() => setFontFamily(fontFamily as string)}
            enabled={setFontFamily.enabled(fontFamily as string)}
            active={active.fontFamily({ fontFamily })}
            label={<span style={{ fontFamily }}>{label}</span>}
          />
        ))}
      </DropdownButton>
    </CommandButtonGroup>
  );
};

function useLinkShortcut() {
  const [linkShortcut, setLinkShortcut] = useState<
    ShortcutHandlerProps | undefined
  >();
  const [isEditing, setIsEditing] = useState(false);

  useExtensionEvent(
    LinkExtension,
    "onShortcut",
    useCallback(
      (props) => {
        if (!isEditing) {
          setIsEditing(true);
        }

        return setLinkShortcut(props);
      },
      [isEditing]
    )
  );

  return { linkShortcut, isEditing, setIsEditing };
}

function useFloatingLinkState() {
  const chain = useChainedCommands();
  const { isEditing, linkShortcut, setIsEditing } = useLinkShortcut();
  const { to, empty } = useCurrentSelection();

  const url = (useAttrs().link()?.href as string) ?? "";
  const [href, setHref] = useState<string>(url);

  // A positioner which only shows for links.
  const linkPositioner = useMemo(
    () => createMarkPositioner({ type: "link" }),
    []
  );

  const onRemove = useCallback(() => {
    return chain.removeLink().focus().run();
  }, [chain]);

  const updateReason = useUpdateReason();

  useLayoutEffect(() => {
    if (!isEditing) {
      return;
    }

    if (updateReason.doc || updateReason.selection) {
      setIsEditing(false);
    }
  }, [isEditing, setIsEditing, updateReason.doc, updateReason.selection]);

  useEffect(() => {
    setHref(url);
  }, [url]);

  const submitHref = useCallback(() => {
    setIsEditing(false);
    const range = linkShortcut ?? undefined;

    if (href === "") {
      chain.removeLink();
    } else {
      chain.updateLink({ href, auto: false }, range);
    }

    chain.focus(range?.to ?? to).run();
  }, [setIsEditing, linkShortcut, chain, href, to]);

  const cancelHref = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  const clickEdit = useCallback(() => {
    if (empty) {
      chain.selectLink();
    }

    setIsEditing(true);
  }, [chain, empty, setIsEditing]);

  return useMemo(
    () => ({
      href,
      setHref,
      linkShortcut,
      linkPositioner,
      isEditing,
      clickEdit,
      onRemove,
      submitHref,
      cancelHref,
    }),
    [
      href,
      linkShortcut,
      linkPositioner,
      isEditing,
      clickEdit,
      onRemove,
      submitHref,
      cancelHref,
    ]
  );
}

const DelayAutoFocusInput = ({
  autoFocus,
  ...rest
}: HTMLProps<HTMLInputElement>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocus) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [autoFocus]);

  return <input ref={inputRef} {...rest} />;
};

const FloatingLinkToolbar = () => {
  const {
    isEditing,
    linkPositioner,
    clickEdit,
    onRemove,
    submitHref,
    href,
    setHref,
    cancelHref,
  } = useFloatingLinkState();
  const active = useActive();
  const activeLink = active.link();
  const { empty } = useCurrentSelection();

  const handleClickEdit = useCallback(() => {
    clickEdit();
  }, [clickEdit]);

  const linkEditButtons = activeLink ? (
    <>
      <CommandButton
        commandName="updateLink"
        onSelect={handleClickEdit}
        icon="pencilLine"
        enabled
      />
      <CommandButton
        commandName="removeLink"
        onSelect={onRemove}
        icon="linkUnlink"
        enabled
      />
    </>
  ) : (
    <CommandButton
      commandName="updateLink"
      onSelect={handleClickEdit}
      icon="link"
      enabled
    />
  );

  return (
    <>
      {!isEditing && <FloatingToolbar>{linkEditButtons}</FloatingToolbar>}
      {!isEditing && empty && (
        <FloatingToolbar positioner={linkPositioner}>
          {linkEditButtons}
        </FloatingToolbar>
      )}

      <FloatingWrapper
        positioner="always"
        placement="bottom"
        enabled={isEditing}
        renderOutsideEditor
      >
        <DelayAutoFocusInput
          style={{ zIndex: 20 }}
          autoFocus
          placeholder="Enter link..."
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setHref(event.target.value)
          }
          value={href}
          onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
            const { code } = event;

            if (code === "Enter") {
              submitHref();
            }

            if (code === "Escape") {
              cancelHref();
            }
          }}
        />
      </FloatingWrapper>
    </>
  );
};

const EditorPanel = () => {
  const { manager, state } = useRemirror({
    extensions,
    selection: "end",
    stringHandler: "html",
    content: {
      type: "doc",
      content: [
        { type: "text", text: "Hello ", marks: [{ type: "bold", attrs: {} }] },
      ],
    },
  });
  return (
    <AllStyledComponent>
      <ThemeProvider>
        <Remirror
          manager={manager}
          initialContent={state}
          autoFocus
          autoRender="end"
        >
          <Toolbar>
            <HistoryButtonGroup />
            <BasicFormattingButtonGroup />
            <HeadingLevelButtonGroup showAll />
            <ToggleStrikeButton />
            <ToggleBlockquoteButton />
            <ToggleCodeButton />
            <ToggleSubscriptButton />
            <ToggleSuperscriptButton />
            <FontFamilyButtons />
            {/* < /> */}
            <CommandButtonGroup>
              <FontSizeButtons />
            </CommandButtonGroup>
            <InsertHorizontalRuleButton />
            <ListButtonGroup />
          </Toolbar>
        </Remirror>
      </ThemeProvider>
    </AllStyledComponent>
  );
};

export default EditorPanel;
