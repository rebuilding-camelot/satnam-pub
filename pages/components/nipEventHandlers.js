// NIP-23: Long-form Content (Articles)
// NIP-58: Badges
import { useEffect } from 'react';
import { useNostrEvent } from '@cmdcode/use-nostr';

export function useNip23Handler(onArticle) {
  useNostrEvent('event', (event) => {
    // NIP-23: kind 30023 (long-form article)
    if (event.kind === 30023 && typeof onArticle === 'function') {
      onArticle(event);
    }
  });
}

export function useNip58Handler(onBadge) {
  useNostrEvent('event', (event) => {
    // NIP-58: kind 30008 (badge definition), 8 (badge award)
    if ((event.kind === 30008 || event.kind === 8) && typeof onBadge === 'function') {
      onBadge(event);
    }
  });
}

// Example usage in a component:
// useNip23Handler(article => { ... });
// useNip58Handler(badgeEvent => { ... });
