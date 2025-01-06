import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaTelegram, FaGithub, FaYoutube } from 'react-icons/fa';
import { CoinGeckoIcon } from './coingecko-icon';
import { SolscanIcon } from './solscan-icon';
import { JupiterIcon } from './jupiter-icon';

export const Footer = () => {
  const iconLinks = [
    { icon: <FaTwitter className="w-5 h-5" />, href: 'https://twitter.com/tardionchainxyz', label: 'Twitter' },
    { icon: <FaTelegram className="w-5 h-5" />, href: 'https://t.me/tardionchain', label: 'Telegram' },
    { icon: <FaYoutube className="w-5 h-5" />, href: 'https://youtube.com/@tardionchain', label: 'YouTube' },
    { icon: <CoinGeckoIcon />, href: 'https://www.coingecko.com/en/coins/tardigrade', label: 'CoinGecko' },
    { icon: <SolscanIcon />, href: 'https://solscan.io/token/DTTLrCGbqn6fmNuKjGYqWFeQU5Hz153f5C3pNnxepump', label: 'Solscan' },
    { icon: <JupiterIcon />, href: 'https://jup.ag/swap/SOL-tardi', label: 'Jupiter' },
    { icon: <FaGithub className="w-5 h-5" />, href: 'https://github.com/tardionchain', label: 'GitHub' },
  ];

  const textLinks = [
    { text: 'Careers', href: '/careers' },
    { text: 'Research', href: '/research' },
    { text: 'Docs', href: 'https://docs.tardionchain.xyz' },
    { text: 'GitHub Repo', href: 'https://github.com/tardionchain/prototype' },
  ];

  return (
    <footer className="w-full py-12 px-4 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Brand */}
        <Link href="/" className="mb-8">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 hover:to-white transition-colors">
            Tardionchain
          </h2>
        </Link>

        {/* Icon Links */}
        <div className="flex justify-center space-x-8 mb-8">
          {iconLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-100 transition-colors"
              aria-label={link.label}
            >
              {link.icon}
            </Link>
          ))}
        </div>

        {/* Text Links */}
        <div className="flex justify-center space-x-8 text-sm mb-8">
          {textLinks.map((link) => (
            <Link
              key={link.text}
              href={link.href}
              className="text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              {link.text}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-neutral-400 text-sm">
          © 2024 Tardionchain. All rights reserved.
        </div>
      </div>
    </footer>
  );
}; 
