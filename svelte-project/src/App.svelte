<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import SendbirdChat, { BaseChannel, ConnectionHandler } from '@sendbird/chat'
	import type { UserMessage, UserMessageCreateParams } from '@sendbird/chat/message';
  import { OpenChannelHandler, OpenChannelModule } from '@sendbird/chat/openChannel';
  import type { OpenChannel, SendbirdOpenChat } from '@sendbird/chat/openChannel';
  import { v4 as uuidv4 } from 'uuid';

  // variables
  let isShow = false
  let inputValue = ''
  let channel: OpenChannel | null = null
  let messages: string[] = []

  const sb = SendbirdChat.init({
      appId: '0CBCE5B8-CABA-476F-9079-D7FCAF0A58DC',
      modules: [
          new OpenChannelModule(),
      ],
  }) as SendbirdOpenChat;

  const channelHandler = new OpenChannelHandler();

  // Events
  channelHandler.onMessageReceived = (channel, message) => {
    // 型があるのにない判定されてるから定義元がおかしそう
    setMessages(message.message);
  };

  // Functions
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
    messages = (typeof message === "string")
    ? [...messages, message]
    : [...messages, ...message]
  }

  const click = async () => {
    isShow = !isShow
    if (!isShow) return
    await createUser()
    channel = await createChannel()
    console.log(channel.cachedMetaData)
    if (!channel) return
    await channel.enter();

    // あったら登録できない
    // const data: MetaData = {
    //       key1: 'value1',
    //       key2: 'value2',
    //       tenant: 'test-test'
    //   };

    // await sb?.currentUser?.createMetaData(data);
    await loadMessages(channel)
    sb.openChannel.addOpenChannelHandler('jonouagebrgojnerjogbouabrionaojbrb', channelHandler);
  }

  const sendMessage = async () => {
    if (!channel) return

    const params: UserMessageCreateParams = { // UserMessageCreateParams can be imported from @sendbird/chat/message.
      message: inputValue,
    };

  channel.sendUserMessage(params)
    .onSucceeded((message: UserMessage) => {
      inputValue = ''
      setMessages(message.message)
        // The message is successfully sent to the channel.
        // The current user can receive messages from other users through the onMessageReceived() method of an event handler.
    });
  }

  const createUser = async () => {
    try {
      let id = localStorage.getItem('userId');
      if (!id) {
        // localStorageにuserIdがない場合は、新しいIDを生成して保存
        id = uuidv4() as string
        localStorage.setItem('userId', id);
      }

      await sb.connect(id);
      // The user is connected to the Sendbird server.
    } catch (err) {
        // Handle error.
    }
  }

  const createChannel = async () => {
    try {
      let storageChannelUrl = localStorage.getItem('channelUrl');

      // 無限に作成されないように固定してる
      if (storageChannelUrl) {
        const channel = await sb.openChannel.getChannel(storageChannelUrl);
        return channel
      }
      else {
        // チャンネル作成のソースコード
        const openChannelParams = {
          name: uuidv4(),
          operatorUserIds: [sb?.currentUser?.userId ?? 'unkown']
        };

        const channel = await sb.openChannel.createChannel(openChannelParams);
        localStorage.setItem('channelUrl', channel.url);
        return channel
      }

      // const data = {
      //     key1: 'value1',
      //     key2: 'value2',
      // };
      // await channel.createMetaData(data);
    } catch (error) {
      return null;
    }
  }
</script>

<main>
  <div class="img-wrapper fixed bottom-9 right-9 z-50">
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
    <div class="flex justify-end">
      <button on:click={click}>
        <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
      </button>
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
</style>
