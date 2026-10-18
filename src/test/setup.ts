import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Vitest has no globals, so RTL's automatic cleanup is wired up by hand.
afterEach(() => cleanup());

// jsdom does not implement scrollTo; the pages call it when the id changes.
window.scrollTo = vi.fn();
