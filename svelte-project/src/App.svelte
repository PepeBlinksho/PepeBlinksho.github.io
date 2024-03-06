<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import SendbirdChat, { BaseChannel, ConnectionHandler } from '@sendbird/chat'
	import type { UserMessage, UserMessageCreateParams } from '@sendbird/chat/message';
  import { OpenChannelHandler, OpenChannelModule } from '@sendbird/chat/openChannel';
  import type { OpenChannel, SendbirdOpenChat } from '@sendbird/chat/openChannel';
  // import viteLogo from '/vite.svg'
  // import Counter from './lib/Counter.svelte'

  let isShow = false
  let inputValue = ''
  let channel: OpenChannel | null = null
  let messages: string[] = ['aaaaaaaaaaaaaaaa']

  const userId = 'testkun'
  const channelName = 'testkun channel'
  const channelUrl = 'sendbird_open_channel_72664_f6edf60ba5071a58433ae0746545fc5665f7e839'

  const sb = SendbirdChat.init({
      appId: '0CBCE5B8-CABA-476F-9079-D7FCAF0A58DC',
      modules: [
          new OpenChannelModule(),
      ],
  }) as SendbirdOpenChat;

  // const connectionHandler = new ConnectionHandler();
  const channelHandler = new OpenChannelHandler();

  // sb.addConnectionHandler('jonouagebrgojnerjogbouabrionaojbrb', connectionHandler);

  channelHandler.onMessageReceived = (channel, message) => {
    // 型があるのにない判定されてるから定義元がおかしそう
    setMessages(message.message);
  };

  const loadMessages = async (channel: BaseChannel) => {
    try {
      //list all messages
      const messageListParams = {
        nextResultSize: 20,
        prevResultSize: 0,
      };

      const resMessages = await channel.getMessagesByTimestamp(0, messageListParams);
      const messages = resMessages.map((message) => message.message)
      setMessages(messages)
      return messages;
    } catch (error) {
      console.log(error)
      return null
    }
}

  const setMessages = (message: string | string[]) => {
    console.log(message)
    console.log(typeof message === "string")
    messages = (typeof message === "string")
    ? [...messages, message]
    : [...messages, ...message]
  }

  const click = async () => {
    isShow = !isShow
    if (!isShow) return
    await createUser()
    channel = await createChannel()
    if (!channel) return
    await channel.enter();
    await loadMessages(channel)
    sb.openChannel.addOpenChannelHandler('jonouagebrgojnerjogbouabrionaojbrb', channelHandler);
  }

  const sendMessage = async () => {
    if (!channel) return

    const params: UserMessageCreateParams = { // UserMessageCreateParams can be imported from @sendbird/chat/message.
      message: inputValue,
    };

  channel.sendUserMessage(params)
    .onPending((message: UserMessage) => {
    // The pending message for the message being sent has been created.
    // The pending message has the same reqId value as the corresponding failed/succeeded message.
    })
    .onFailed((err: Error, message: UserMessage) => {
    // Handle error.
    })
    .onSucceeded((message: UserMessage) => {
      inputValue = ''
      setMessages(message.message)
        // The message is successfully sent to the channel.
        // The current user can receive messages from other users through the onMessageReceived() method of an event handler.
    });
  }

  const createUser = async () => {
    try {
      const user = await sb.connect(userId);
      // The user is connected to the Sendbird server.
    } catch (err) {
        // Handle error.
    }
  }

  const createChannel = async () => {
    try {
      // チャンネル作成のソースコード
      // const openChannelParams = {
      //   name: channelName,
      //   operatorUserIds: [sb?.currentUser?.userId ?? userId]
      // };

      // const openChannel = await sb.openChannel.createChannel(openChannelParams);
      // console.log(openChannel)
      // return [openChannel, null];

      // 無限に作成されないように固定してる
      const channel = await sb.openChannel.getChannel(channelUrl);
      return channel
    } catch (error) {
      return null;
    }
  }
</script>

<main>
  <div class="img-wrapper">
    {#if isShow}
      <div class="flex flex-col gap-2 justify-end justify-items-end p-6 shadow-2xl rounded-lg">
        <div class="header">
          Docs AI Assistant
        </div>
        <div class="main-contents flex flex-col justify-between">
          <div>
          {#each messages as message, i}
            <div>
              { message }
            </div>
          {/each}
          </div>
          <div>
            <input bind:value={inputValue} type="text" placeholder="入力してね">
            <button on:click={sendMessage}>
              送信
            </button>
          </div>
        </div>
      </div>
    {/if}
    <div class="flex justify-end" on:click={click}>
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </div>
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }

  .img-wrapper {
    position: fixed;
    bottom: 36px;
    right: 36px;
  }
</style>
