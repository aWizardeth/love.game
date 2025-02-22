import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { StakingSelectTab } from "./ui/StakingSelectTab";
import { useFetchFarmData } from "../system/hooks/useFetchFarmData";
import Hero from "./heroswap";
import Simple from "./simpleswap";
//import Green from "./greenswap";

import { useWrongNetwork } from "../system/hooks/useWrongNetwork";
import { WalletConnectButton } from "./ui/WallectConnectButton";

const Swap = () => {
  const [tab, setTab] = useState<string>("simple");
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
                title="SIMPLE"
                onClick={() => {
                  setTab("simple");
                }}
                isSelected={tab === "simple"}
              />
              <StakingSelectTab
                title="HERO"
                onClick={() => {
                  setTab("hero");
                }}
                isSelected={tab === "hero"}
              />
              <StakingSelectTab
                title="GREEN"
                onClick={() => {
                  setTab("green");
                }}
                isSelected={tab === "green"}
              />

            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[400px] overflow-y-auto border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 portrait:border-b-0 border-2 p-2 mb-2">
        
        {tab === "simple" && <Simple />}

        {tab === "hero" && <Hero />}
        {tab === "green" && <Hero />}
      </div>
    </div>
  );
};

export default Swap;
