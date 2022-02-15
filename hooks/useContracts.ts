import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

type Contracts = {
  wallet: string;
  aUstToken: string;
  whaleToken: string;
  ustVault: string;
  ustVaultLpToken: string;
  moneyMarket: string;
  lunaUstPair: string;
  whaleUstPair: string;
  whaleUstLpToken: string;
  whaleUstStaking: string;
  gov: string;
  treasury: string;
  communityFund: string;
  warchest: string;
};

type Networks = {
  mainnet: Contracts;
  testnet: Contracts;
};

const defaultContracts: { [key: string]: any } = {
  mainnet: {
    wallet: "terra1vjws6sa429u48dlw8s6mycr62nalyhakxc4v7v",
    aUstToken: "terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu",
    treasury: "terra1cnt2dls25u40wqyjgq72stuyjrwn0u5r6m5sm5",
    whaleToken: "terra1php5m8a6qd68z02t3zpw4jv2pj4vgw4wz0t8mz",
    ustVault: "terra1ec3r2esp9cqekqqvn0wd6nwrjslnwxm7fh8egy",
    ustVaultLpToken: "terra1w0p5zre38ecdy3ez8efd5h9fvgum5s206xknrg",
    moneyMarket: "terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s",
    lunaUstPair: "terra1m6ywlgn6wrjuagcmmezzz2a029gtldhey5k552",
    whaleUstPair: "terra1v4kpj65uq63m4x0mqzntzm27ecpactt42nyp5c",
    whaleUstLpToken: "terra17pqpurglgfqnvkhypask28c3llnf69cstaquke",
    gov: "terra15qv7cr7t2s4cfskq82mskq0d397hadflrazuj7",
    communityFund: "",
    warchest: "",
  },
  testnet: {
    wallet: "terra1xhhedykp6knc0ygtggwek3w0et3dmwe6apzeuz",
    aUstToken: "terra1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl",
    whaleToken: "terra183cvzy6knvva6mpvzcq86uyfxw0nd4925m0d0m",
    ustVault: "terra1w0yhdc3atmrpgxz5gq66xltu8t6ez8r9dazvvx",
    ustVaultLpToken: "terra1zuspxvj76ngktnjuawmckpsmynwuvusdnq0pxd",
    lunaUstPair: "terra156v8s539wtz0sjpn8y8a8lfg8fhmwa7fy22aff",
    moneyMarket: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    whaleUstPair: "terra1nyaj3xv93gzh753d03yh5er8wq4vma2rm730fg",
    whaleUstLpToken: "terra1zuspxvj76ngktnjuawmckpsmynwuvusdnq0pxd",
    whaleUstStaking: "terra1acddhgjd7vdedlx870lsu7eavfc6jm5yg70hcg",
    gov: "terra1ytsms4c9e3nxzvucuxe385c9rcm8tfjvuzv5j7",
    communityFund: "terra1ugx7u99t8nqvhrt40ka759kqxy4j4r3n5v5l9j",
    warchest: "terra1twgq7ye7rz75gs82e503gh6n9cm8nvs4tsq88v",
  },
};

const useContracts = (initial?: Networks): Contracts => {
  const {
    network: { name },
  } = useWallet();
  const contracts = initial ?? defaultContracts;

  return useMemo(() => {
    return contracts[name];
  }, [contracts, name]);
};

export default useContracts;
