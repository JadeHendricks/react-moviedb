import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Vitest has no globals, so RTL's automatic cleanup is wired up by hand.
afterEach(() => cleanup());
