import {
  WalletWidgetProvider,
  useAddress,
  useWallet,
} from "@initia/react-wallet-widget";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
// import { bcs } from "@initia/initia.js";
// import { uuidToU256, u256ToUuid } from "./tee";
import { MsgExecute } from "@initia/initia.js";

const App = () => {
  const address = useAddress();
  const { onboard, view, requestTx, bridge, requestInitiaTx } = useWallet();

  const send = async () => {
    if (!address) return;
    const messages = [
      {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: MsgSend.fromPartial({
          fromAddress: address,
          toAddress: address,
          amount: [{ amount: "1000000", denom: "uinit" }],
        }),
      },
    ];
    const transactionHash = await requestTx({ messages });
    console.log("Transaction Hash:", transactionHash);
  };

  const uploadSignatureTest = async () => {
    if (!address) return;

    try {
      // 使用与原始代码相同的变量名
      const contractAddress = "0x6f0455e70ee4b792897d552a3e5aa6e89e110782";
      const module = "agent_tweet_event_aggregate";
      const functionName = "create";

      console.log("user initia address ========>", address);

      const requestIdBase64 = "EfYr7O6zXJ/mTr9RrlZ59QAAAAAAAAAAAAAAAAAAAAA=";
      const constantValueBase64 = "QAgAAAAAAAA=";
      const messageContentBase64 = "DEhlbGxvIEluaXRpYQ==";

      // 创建MsgExecute实例
      const msg = new MsgExecute(
        address,
        contractAddress,
        module,
        functionName,
        [], // typeArgs
        [requestIdBase64, constantValueBase64, messageContentBase64]
      );

    //   const transactionHash = await requestInitiaTx({
    //     msgs: [msg],
    //     memo: "Upload signature for UUID"
    //   });

    //   console.log("Transaction Hash:", transactionHash);

      // 构造消息 - 直接使用原始代码中 MsgExecute 的参数顺序和格式
    //   const messages = [
    //     {
    //       typeUrl: "/initia.move.v1.MsgExecute",
    //       value: {
    //         sender: address,
    //         module_address: contractAddress,
    //         module_name: module,
    //         function_name: functionName,
    //         type_args: [],
    //         args: [requestIdBase64, constantValueBase64, messageContentBase64],
    //       },
    //     },
    //   ];

    //   console.log("发送执行消息:", JSON.stringify(messages, null, 2));

    //   Request transaction
      const transactionHash = await requestTx({
        messages:[msg],
        memo: `Upload signature for UUID`,
      });

      console.log("Transaction Hash:", transactionHash);
        alert(`Signature uploaded! Hash: ${transactionHash}`);
    } catch (error: unknown) {
      console.error("Upload signature failed:", error);
      //   alert(
      //     `Upload signature failed: ${
      //       error instanceof Error ? error.message : String(error)
      //     }`
      //   );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-5">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-medium text-gray-800">
          Initia Wallet Test
        </h1>

        {address ? (
          <div className="flex flex-col gap-3">
            <button
              onClick={view}
              className="px-6 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm hover:bg-gray-100 transition-all duration-200 hover:shadow-sm font-semibold"
            >
              {address}
            </button>
            <button
              onClick={send}
              className="px-6 py-3 rounded-lg bg-gray-800 text-white text-sm hover:bg-gray-700 transition-all duration-200 hover:shadow-sm font-semibold"
            >
              Send Test Transaction
            </button>
            <button
              onClick={uploadSignatureTest}
              className="px-6 py-3 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition-all duration-200 hover:shadow-sm font-semibold"
            >
              Upload Signature Test
            </button>
            <button
              onClick={bridge}
              className="px-6 py-3 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition-all duration-200 hover:shadow-sm font-semibold"
            >
              Open Bridge
            </button>
          </div>
        ) : (
          <button
            onClick={onboard}
            className="px-6 py-3 rounded-lg bg-gray-800 text-white text-sm hover:bg-gray-700 transition-all duration-200 hover:shadow-sm"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <WalletWidgetProvider
    registryUrl="https://registry.testnet.initia.xyz"
    apiUrl="https://api.testnet.initia.xyz"
    dexApiUrl="https://dex-api.testnet.initia.xyz"
    explorerUrl="https://scan.testnet.initia.xyz"
    swaplistUrl="https://list.testnet.initia.xyz/pairs.json"
    modules={{
      usernames:
        "0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a",
      dex_utils:
        "0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a",
      swap_transfer:
        "0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a",
    }}
  >
    <App />
  </WalletWidgetProvider>
);

export default AppWrapper;
