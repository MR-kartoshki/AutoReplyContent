# AutoReplyContent

Auto-replies when a message matches your trigger.

## Install

1. Put `autoReplyContent.tsx` in `%APPDATA%\Vencord\src\userplugins\`.
2. In your Vencord repo, run `pnpm build`.
3. Restart Discord and enable `AutoReplyContent`.

## Required Setup

Set:

- `Trigger Prefix`
- One response source:
  - `Response Message` (single response), or
  - `Response Messages` (one per line, random pick)

## Key Settings

- `Use Regex`: trigger supports `/pattern/flags`.
- `Case Insensitive`: case-insensitive trigger match.
- `Exact Match`: full-message match (ignored when regex is enabled).
- `Only When Mentioned`: trigger only when your account is mentioned.
- `Only in DMs` / `Exclude DMs`: restrict where it runs.
- `Channel ID` / `Channel Whitelist`: restrict channels.
- `Delay (ms)`: wait before sending.
- `Per User Cooldown (ms)`: minimum gap before replying to the same user again.
- `Per Channel Cooldown (ms)`: minimum gap between replies in the same channel.
- `Max Replies per Minute`: global cap (`0` disables).
- `Trigger On Self Messages`: off by default.
- `Trigger On Bot Messages`: off by default.

## Template Variables

Use in responses:

- `{user}` sender display name
- `{mention}` sender mention
- `{channel}` channel mention
- `{message}` original message content

## Behavior Notes

- Duplicate events for the same message ID are ignored.
- Replies are trimmed to Discord's 2000-character limit.
- A reply is skipped if a newer message appears in the channel before delay ends.
- Automated messaging can violate Discord rules. Use at your own risk.
