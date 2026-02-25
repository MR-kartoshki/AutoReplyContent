# AutoReplyContent — Vencord Userplugin



A Vencord userplugin that automatically sends a configurable response when a message starting with a specific trigger phrase is sent in a channel.



## Features



- Trigger on any message prefix you define

- Configurable response message

- Optional channel filter (only respond in a specific channel)

- Configurable delay before sending the response

- Prevents duplicate responses (only replies to the latest matching message)



\## Installation



1. Make sure you have \[Vencord](https://vencord.dev) installed from source

2. Download `autoReplyContent.tsx` from this repository

3. Place it in your Vencord userplugins folder:

&nbsp;  ```

&nbsp;  %APPDATA%\\Vencord\\src\\userplugins\\

&nbsp;  ```

4. Rebuild Vencord:

&nbsp;  ```

&nbsp;  pnpm build

&nbsp;  ```

5. Restart Discord

6. Enable the plugin in Vencord settings under \*\*Plugins → AutoReplyContent\*\*



## Configuration



All settings are available in the Vencord plugin settings panel:



| Setting | Description |

|---|---|

| Trigger Prefix | The plugin will respond to any message starting with this text |

| Response Message | The message that will be sent as a reply |

| Channel ID | Only trigger in this channel (leave blank for all channels) |

| Delay (ms) | How long to wait before sending the response |



## Finding a Channel ID



1. Enable Developer Mode in Discord settings (\*\*App Settings → Advanced → Developer Mode\*\*)

2. Right-click the channel and select \*\*Copy Channel ID\*\*

3. Paste it into the Channel ID setting



## Notes



> ⚠️ This plugin sends messages automatically on your account. Use it responsibly. Auto-messaging is against Discord's Terms of Service and could result in your account being actioned.



## License



MIT


## Credits

- MR-Kartoshki (GitHub)
- freddy._.fazbear (Discord)
