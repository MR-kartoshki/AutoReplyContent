# AutoReplyContent - Vencord User Plugin

`AutoReplyContent` is a Vencord user plugin that sends a configurable reply when a message starts with a trigger prefix.

## Features

- Configurable trigger prefix
- Configurable response message
- Optional channel filter (`Channel ID`)
- Configurable delay before sending
- Sends only if the triggered message is still the latest message in that channel when the delay ends

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
| Trigger Prefix | Respond when a message starts with this text. | (blank) |
| Response Message | Message sent when triggered. | (blank) |
| Channel ID | Only trigger in this channel. Leave blank for all channels. | (blank) |
| Delay (ms) | Wait time before sending the reply. | `500` |

## Find a Channel ID

1. Enable Developer Mode in Discord: `User Settings > Advanced > Developer Mode`.
2. Right-click a channel and select `Copy Channel ID`.
3. Paste the value into the plugin's `Channel ID` setting.

## Notes

> This plugin sends messages automatically from your account. Use at your own risk. Automated messaging can violate Discord rules and may lead to account action.

## License

MIT

## Credits

- MR-Kartoshki (GitHub)
- freddy._.fazbear (Discord)
