import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { findByPropsLazy } from "@webpack";

const MessageActions = findByPropsLazy("sendMessage", "editMessage");

const lastMessageIds: Map<string, string> = new Map();

const settings = definePluginSettings({
    triggerPrefix: {
        type: OptionType.STRING,
        description: "Send a response if the message starts with this text",
        default: "",
    },
    responseMessage: {
        type: OptionType.STRING,
        description: "The message to send when triggered",
        default: "",
    },
    channelId: {
        type: OptionType.STRING,
        description: "Only trigger in this channel ID (leave blank for all channels)",
        default: "",
    },
    delayMs: {
        type: OptionType.NUMBER,
        description: "Delay before sending the response (in milliseconds)",
        default: 500,
    },
});

export default definePlugin({
    name: "AutoReplyContent",
    description: "Automatically sends a response when a message starts with a trigger phrase",
    authors: [{ name: "you", id: 0n }],
    settings,

    flux: {
        MESSAGE_CREATE({ message }: any) {
            const { triggerPrefix, responseMessage, channelId, delayMs } = settings.store;

            if (!message?.content) return;

            const trimmedChannelId = channelId.trim();
            if (trimmedChannelId && message.channel_id !== trimmedChannelId) return;

            lastMessageIds.set(message.channel_id, message.id);

            if (!message.content.startsWith(triggerPrefix)) return;

            const triggeredMessageId = message.id;

            setTimeout(() => {
                const latestId = lastMessageIds.get(message.channel_id);
                if (latestId !== triggeredMessageId) return;

                console.log("[AutoReplyContent] Sending: " + responseMessage);
                MessageActions.sendMessage(
                    message.channel_id,
                    {
                        content: responseMessage,
                        tts: false,
                        invalidEmojis: [],
                        validNonShortcutEmojis: [],
                    },
                    undefined,
                    { nonce: String(Date.now()) }
                );
            }, delayMs);
        },
    },
});