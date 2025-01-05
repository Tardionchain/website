"use client";

import { Button } from "./button";
import { Card } from "./card";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function TokenInfo() {
  const contractAddress = "DTTLrCGbqn6fmNuKjGYqWFeQU5Hz153f5C3pNnxepump"; // Replace with actual contract address
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="p-6 bg-black/5 dark:bg-white/5 backdrop-blur-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">$TARDI Token</h3>
              <p className="text-sm text-muted-foreground">
                The native token powering the Tardionchain ecosystem
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 max-md:p-2 rounded-lg bg-black/5 dark:bg-white/5">
                <div>
                  <p className="text-sm text-muted-foreground"> <span className="max-md:inline hidden">Copy</span> Contract Address (SOL)</p>
                  <p className="font-mono text-sm max-md:hidden truncate">{contractAddress}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(contractAddress)}
                  className="ml-2 relative"
                >
                  <div className="relative w-4 h-4">
                    <div className={`absolute inset-0 transition-all duration-300 transform ${copied ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
                      <Copy className="h-4 w-4" />
                    </div>
                    <div className={`absolute inset-0 transition-all duration-300 transform ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
} 