import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { StakingSelectTab } from "./ui/StakingSelectTab";
import { useFetchFarmData } from "../system/hooks/useFetchFarmData";
import { Pool } from "./pool";
import SingleStaking from "./singleStaking";
import { useWrongNetwork } from "../system/hooks/useWrongNetwork";
import { WalletConnectButton } from "./ui/WallectConnectButton";

const Loveswap = () => {
  const [tab, setTab] = useState<string>("live");
  const { address } = useAccount({
    onDisconnect() {
      window.location.reload();
    },
  });
  const { farmData, onGetFarmData, poolDataLoading } = useFetchFarmData();
  const { isWrongNetwork } = useWrongNetwork();
  const [, setPrevWrongNetwork] = useState<boolean>(false);

  useEffect(() => {
    setPrevWrongNetwork(isWrongNetwork);
  }, [isWrongNetwork]);

  return (
    <div className="w-full">
      <div className="flex flex-col landscape:flex-row justify-between mt-2 ml-1">
        <div className="sm:order-first order-last flex flex-row gap-2 w-full mt-2">
          <div className="flex flex-col gap-2 w-[70%]">
            <div className="flex flex-row text-xl">
            <StakingSelectTab
                title="Swap"
                onClick={() => {
                  setTab("live");
                }}
                isSelected={tab == "live"}
              />
              
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[360px] overflow-y-auto border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 portrait:border-b-0 border-2 p-2 mb-2">
        {(isWrongNetwork || !address) && !poolDataLoading && (
          <WalletConnectButton
            connectWalletElement={
              <p className="cursor-pointer hover:opacity-70">Connect Wallet</p>
            }
            walletConnectedElement={<></>}
            wrongNetworkElement={
              <p className="cursor-pointer hover:opacity-70">Switch Network</p>
            }
          />
        )}
        {tab === "live" 
        }
      </div>
    </div>
  );
};

export default Loveswap;
