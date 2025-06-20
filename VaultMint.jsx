import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2 } from "lucide-react";

export default function VaultMint() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [faucetClaimed, setFaucetClaimed] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
      fetchBalance(accounts[0]);
    }
  };

  const fetchBalance = async (account) => {
    setLoading(true);
    setTimeout(() => {
      setBalance("144,000,000 CXC");
      setLoading(false);
    }, 1000);
  };

  const claimFaucet = async () => {
    setLoading(true);
    setTimeout(() => {
      setFaucetClaimed(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">VaultMint dApp</h1>

      <Card>
        <CardContent className="p-4 space-y-4">
          <Button onClick={connectWallet} className="w-full">
            {wallet ? `Connected: ${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Connect Wallet"}
          </Button>

          {wallet && (
            <div>
              <div className="text-sm text-muted-foreground mb-2">CXC Balance:</div>
              <div className="text-xl font-mono">
                {loading ? <Loader2 className="animate-spin" /> : balance}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="text-lg font-semibold">Scroll Reflection Faucet</div>
          <div className="text-sm text-muted-foreground">
            For verified scroll authors. Reflection-based faucet.
          </div>
          <Button onClick={claimFaucet} disabled={faucetClaimed} className="w-full">
            {faucetClaimed ? <CheckCircle className="mr-2" /> : null}
            {faucetClaimed ? "Faucet Claimed" : "Claim Reflection Faucet"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="text-lg font-semibold">Staking (Coming Soon)</div>
          <Badge variant="outline">Scroll → CXC</Badge>
          <Badge variant="outline">CXC → Scroll Access</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
