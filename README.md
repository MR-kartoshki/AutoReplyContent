# AutoReplyContent - Vencord User Plugin

`AutoReplyContent` is a Vencord user plugin that sends a configurable reply when a message starts with a trigger prefix.

## Features

- Configurable trigger prefix
- Single response or random response from a list
- Message template variables (`{user}`, `{mention}`, `{channel}`, `{message}`)
- Optional channel filters (`Channel ID` + `Channel Whitelist`)
- Optional DM-only or DM-excluded scope
- Case-insensitive / exact / regex trigger matching
- Per-user and per-channel cooldowns
- Global replies-per-minute rate limit
- Configurable delay before sending
- Sends only if the triggered message is still the latest message in that channel when the delay ends
- Ignores bot/self messages and skips blank trigger/response config

## Installation

1. Install Vencord from source: [https://vencord.dev](https://vencord.dev)
2. Copy `autoReplyContent.tsx` into:

```text
%APPDATA%\Vencord\src\userplugins\
```

3. Rebuild Vencord:

```bash
pnpm build
```

4. Restart Discord.
5. Enable `AutoReplyContent` in Vencord plugin settings.

## Configuration

Settings are available in the plugin settings panel.

| Setting | Description | Default |
|---|---|---|
| Trigger Prefix | Trigger text (or regex pattern if regex is enabled). | (blank) |
| Response Message | Fallback single response message. | (blank) |
| Response Messages | Optional list of responses, one per line. Randomly picks one. | (blank) |
| Channel ID | Optional single channel ID (also merged into whitelist). | (blank) |
| Channel Whitelist | Optional channel IDs (comma/newline separated). | (blank) |
| Delay (ms) | Wait time before sending the reply. | `500` |
| Case Insensitive | Match trigger ignoring case. | `false` |
| Exact Match | Require full-message match (ignored when regex is enabled). | `false` |
| Use Regex | Treat trigger as regex (`/pattern/flags` supported). | `false` |
| Only in DMs | Trigger only for DM messages. | `false` |
| Exclude DMs | Do not trigger for DM messages. | `false` |
| Per User Cooldown (ms) | Minimum time between replies to the same user (`0` disables). | `10000` |
| Per Channel Cooldown (ms) | Minimum time between replies in the same channel (`0` disables). | `0` |
| Max Replies per Minute | Global auto-reply cap (`0` disables). | `0` |

## Find a Channel ID

1. Enable Developer Mode in Discord: `User Settings > Advanced > Developer Mode`.
2. Right-click a channel and select `Copy Channel ID`.
3. Paste the value into the plugin's `Channel ID` setting.

## Notes

> This plugin sends messages automatically from your account. Use at your own risk. Automated messaging can violate Discord rules and may lead to account action.

### Template variables

You can use these in response messages:

- `{user}`: Sender display name
- `{mention}`: Sender mention (`<@id>`)
- `{channel}`: Channel mention (`<#id>`)
- `{message}`: Original message content

## License

MIT

## Credits

- MR-Kartoshki (GitHub)
- freddy._.fazbear (Discord)
