'use client';

import { useState } from 'react';
import {
  ConnectButton,
  useCurrentAccount,
  useSuiClient,
  useWallets,
} from '@mysten/dapp-kit';

export default function Home() {
  const [name, setName] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [status, setStatus] = useState('');

  const account = useCurrentAccount();
  const client = useSuiClient();
  const { currentWallet } = useWallets();

  const handleCreateProfile = async () => {
    if (!account || !currentWallet || !currentWallet.signAndExecuteTransactionBlock) {
      setStatus('❌ Wallet not ready or unsupported.');
      return;
    }

    setStatus('⏳ Creating profile...');

    try {
      const result = await currentWallet.signAndExecuteTransactionBlock({
        transactionBlock: {
          kind: 'moveCall',
          data: {
            packageObjectId: '0x267693c887485b1fca8f396242235c89ef019b4e2d9c0c9f4fda8a73052c2f52',
            module: 'social',
            function: 'create_profile',
            typeArguments: [],
            arguments: [name, pictureUrl, isAnonymous],
          },
        },
        options: { showEffects: true },
      });

      setStatus(`✅ Created! Digest: ${result.effects?.transactionDigest}`);
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to create profile.');
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <ConnectButton />
      <h1>Create Profile</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      <input
        type="text"
        placeholder="Profile Picture URL"
        value={pictureUrl}
        onChange={(e) => setPictureUrl(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      <label>
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
        />
        Anonymous
      </label>
      <br />
      <button onClick={handleCreateProfile} style={{ marginTop: '1rem' }}>
        Create Profile
      </button>
      <p>{status}</p>
    </main>
  );
}
