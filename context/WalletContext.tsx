import React, { createContext, useContext, useState, ReactNode } from 'react';

type WalletContextType = {
  isConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  walletAddress: string | null;
};

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  connectWallet: () => {},
  disconnectWallet: () => {},
  walletAddress: null,
});

export const useWallet = () => useContext(WalletContext);

type WalletProviderProps = {
  children: ReactNode;
};

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = () => {
    // In a real app, this would interact with a real wallet
    setIsConnected(true);
    setWalletAddress('8xztR4HoQ9rjfCF3Qg4vNgFJs5m3Fgh');
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        connectWallet,
        disconnectWallet,
        walletAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}