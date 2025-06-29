import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import type { FC } from "react";
import {
  ArrowDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  SendHorizontalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { ToolFallback } from "./tool-fallback";

export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root
      className="bg-gradient-to-b from-zinc-900 via-black to-zinc-950 flex h-full flex-col overflow-hidden"
      style={{
        ["--thread-max-width" as string]: "42rem",
      }}
    >
      <ThreadPrimitive.Viewport className="flex h-full flex-col items-center overflow-y-scroll scroll-smooth px-4 pt-8">
        <ThreadWelcome />

        <ThreadPrimitive.Messages
          components={{
            UserMessage: UserMessage,
            EditComposer: EditComposer,
            AssistantMessage: AssistantMessage,
          }}
        />

        <ThreadPrimitive.If empty={false}>
          <div className="min-h-8 flex-grow" />
        </ThreadPrimitive.If>

        <div className="sticky bottom-0 mt-3 flex w-full max-w-[var(--thread-max-width)] flex-col items-center justify-end rounded-t-lg pb-4">
          <ThreadScrollToBottom />
          <Composer />
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};

// Scroll button
const ThreadScrollToBottom: FC = () => (
  <ThreadPrimitive.ScrollToBottom asChild>
    <TooltipIconButton
      tooltip="Scroll to bottom"
      variant="outline"
      className="absolute -top-8 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md"
    >
      <ArrowDownIcon />
    </TooltipIconButton>
  </ThreadPrimitive.ScrollToBottom>
);

// Welcome section
const ThreadWelcome: FC = () => (
  <ThreadPrimitive.Empty>
    <div className="flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col">
      <div className="flex w-full flex-grow flex-col items-center justify-center">
        <p className="mt-4 text-white font-medium text-lg">How can I help you today?</p>
      </div>
      <ThreadWelcomeSuggestions />
    </div>
  </ThreadPrimitive.Empty>
);

// Welcome prompt suggestions
const ThreadWelcomeSuggestions: FC = () => (
  <div className="mt-3 flex w-full items-stretch justify-center gap-4">
    {[
      "What is the weather in Tokyo?",
      "What is assistant-ui?",
    ].map((prompt) => (
      <ThreadPrimitive.Suggestion
        key={prompt}
        className="transition-transform hover:scale-105 bg-white/10 backdrop-blur-md border border-white/10 text-white px-4 py-3 rounded-xl text-sm font-semibold shadow hover:bg-white/20"
        prompt={prompt}
        method="replace"
        autoSend
      >
        <span className="line-clamp-2 text-ellipsis">{prompt}</span>
      </ThreadPrimitive.Suggestion>
    ))}
  </div>
);

// Composer input
const Composer: FC = () => (
  <ComposerPrimitive.Root className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl shadow-inner focus-within:ring-2 ring-green-500 w-full flex items-center px-3 py-2">
    <ComposerPrimitive.Input
      rows={1}
      autoFocus
      placeholder="Write a message..."
      className="text-white placeholder:text-zinc-400 max-h-40 flex-grow resize-none border-none bg-transparent px-2 py-3 text-sm outline-none focus:ring-0 disabled:cursor-not-allowed"
    />
    <ComposerAction />
  </ComposerPrimitive.Root>
);

// Composer buttons
const ComposerAction: FC = () => (
  <>
    <ThreadPrimitive.If running={false}>
      <ComposerPrimitive.Send asChild>
        <TooltipIconButton
          tooltip="Send"
          variant="default"
          className="bg-green-600 hover:bg-green-500 text-white rounded-full p-2 shadow-md transition duration-200"
        >
          <SendHorizontalIcon />
        </TooltipIconButton>
      </ComposerPrimitive.Send>
    </ThreadPrimitive.If>
    <ThreadPrimitive.If running>
      <ComposerPrimitive.Cancel asChild>
        <TooltipIconButton
          tooltip="Cancel"
          variant="default"
          className="bg-red-600 text-white rounded-full p-2"
        >
          <CircleStopIcon />
        </TooltipIconButton>
      </ComposerPrimitive.Cancel>
    </ThreadPrimitive.If>
  </>
);

// User message bubble
const UserMessage: FC = () => (
  <MessagePrimitive.Root className="w-full max-w-[var(--thread-max-width)] py-4">
    <div className="flex justify-end">
      <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white shadow-lg max-w-[80%] rounded-3xl px-5 py-3">
        <MessagePrimitive.Content />
      </div>
    </div>
    <UserActionBar />
    <BranchPicker className="mt-1 flex justify-end" />
  </MessagePrimitive.Root>
);

// User message action bar
const UserActionBar: FC = () => (
  <ActionBarPrimitive.Root
    hideWhenRunning
    autohide="not-last"
    className="flex justify-end mt-2 mr-2"
  >
    <ActionBarPrimitive.Edit asChild>
      <TooltipIconButton tooltip="Edit">
        <PencilIcon />
      </TooltipIconButton>
    </ActionBarPrimitive.Edit>
  </ActionBarPrimitive.Root>
);

// Edit message input
const EditComposer: FC = () => (
  <ComposerPrimitive.Root className="bg-white/10 backdrop-blur-md border border-white/20 my-4 flex w-full max-w-[var(--thread-max-width)] flex-col gap-2 rounded-xl px-4 py-3 text-white shadow-lg">
    <ComposerPrimitive.Input className="text-white h-8 w-full resize-none bg-transparent outline-none" />
    <div className="flex justify-end gap-2">
      <ComposerPrimitive.Cancel asChild>
        <Button variant="ghost">Cancel</Button>
      </ComposerPrimitive.Cancel>
      <ComposerPrimitive.Send asChild>
        <Button>Send</Button>
      </ComposerPrimitive.Send>
    </div>
  </ComposerPrimitive.Root>
);

// Bot message bubble
const AssistantMessage: FC = () => (
  <MessagePrimitive.Root className="w-full max-w-[var(--thread-max-width)] py-4">
    <div className="flex justify-start">
      <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-md max-w-[80%] rounded-xl px-5 py-3">
        <MessagePrimitive.Content
          components={{ Text: MarkdownText, tools: { Fallback: ToolFallback } }}
        />
      </div>
    </div>
    <AssistantActionBar />
    <BranchPicker className="mt-1 ml-2" />
  </MessagePrimitive.Root>
);

// Bot message action bar
const AssistantActionBar: FC = () => (
  <ActionBarPrimitive.Root
    hideWhenRunning
    autohide="not-last"
    autohideFloat="single-branch"
    className="text-muted-foreground flex gap-1 ml-2 mt-2"
  >
    <ActionBarPrimitive.Copy asChild>
      <TooltipIconButton tooltip="Copy">
        <MessagePrimitive.If copied>
          <CheckIcon />
        </MessagePrimitive.If>
        <MessagePrimitive.If copied={false}>
          <CopyIcon />
        </MessagePrimitive.If>
      </TooltipIconButton>
    </ActionBarPrimitive.Copy>
    <ActionBarPrimitive.Reload asChild>
      <TooltipIconButton tooltip="Refresh">
        <RefreshCwIcon />
      </TooltipIconButton>
    </ActionBarPrimitive.Reload>
  </ActionBarPrimitive.Root>
);

// Branch picker (same)
const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => (
  <BranchPickerPrimitive.Root
    hideWhenSingleBranch
    className={cn(
      "text-muted-foreground inline-flex items-center text-xs",
      className
    )}
    {...rest}
  >
    <BranchPickerPrimitive.Previous asChild>
      <TooltipIconButton tooltip="Previous">
        <ChevronLeftIcon />
      </TooltipIconButton>
    </BranchPickerPrimitive.Previous>
    <span className="font-medium">
      <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
    </span>
    <BranchPickerPrimitive.Next asChild>
      <TooltipIconButton tooltip="Next">
        <ChevronRightIcon />
      </TooltipIconButton>
    </BranchPickerPrimitive.Next>
  </BranchPickerPrimitive.Root>
);

const CircleStopIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    width="16"
    height="16"
  >
    <rect width="10" height="10" x="3" y="3" rx="2" />
  </svg>
);
