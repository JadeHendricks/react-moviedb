import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopNavigation from './TopNavigation';
import { renderWithProviders } from '../../test/render';

const openLogin = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getAllByRole('button', { name: 'Login' })[0]!);
  return document.querySelector('.overlay') as HTMLElement;
};

describe('login / sign-up modal', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('closes on a click on the overlay but not on a click inside the modal (B3)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TopNavigation />);

    const overlay = await openLogin(user);
    expect(overlay).not.toBeNull();

    await user.click(document.querySelector('.modalAuth__slug') as HTMLElement);
    expect(document.querySelector('.overlay')).not.toBeNull();

    await user.click(overlay);
    expect(document.querySelector('.overlay')).toBeNull();
  });

  it('closes on Escape (B3)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TopNavigation />);
    await openLogin(user);

    await user.keyboard('{Escape}');

    expect(document.querySelector('.overlay')).toBeNull();
  });

  it('adds no window listener that outlives the modal, however often it is opened (B3)', async () => {
    const user = userEvent.setup();
    const add = vi.spyOn(window, 'addEventListener');
    const remove = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderWithProviders(<TopNavigation />);
    const netWindowListeners = () =>
      ['click', 'keydown'].reduce(
        (sum, type) =>
          sum + add.mock.calls.filter(([t]) => t === type).length - remove.mock.calls.filter(([t]) => t === type).length,
        0,
      );
    const baseline = netWindowListeners();

    for (let i = 0; i < 3; i += 1) {
      await openLogin(user);
      expect(netWindowListeners()).toBe(baseline + 1); // exactly one while open: the Escape listener
      await user.keyboard('{Escape}');
      expect(netWindowListeners()).toBe(baseline);
    }

    await openLogin(user);
    unmount();
    expect(netWindowListeners()).toBe(baseline);
  });

  it('toggles the password with state: type and icon change, and each field is independent (B19)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TopNavigation />);
    await openLogin(user);
    await user.click(screen.getAllByRole('button', { name: 'Sign up' })[0]!);

    const password = document.querySelector('input[name="login_password"]') as HTMLInputElement;
    const confirm = document.querySelector('input[name="login_confirmpassword"]') as HTMLInputElement;
    const iconOf = (input: HTMLInputElement) => input.nextElementSibling as SVGSVGElement;
    const hrefOf = (input: HTMLInputElement) => iconOf(input).querySelector('use')?.getAttribute('href') ?? '';

    expect(password.type).toBe('password');
    expect(hrefOf(password)).toMatch(/#icon-eye$/);

    await user.click(iconOf(password));
    expect(password.type).toBe('text');
    expect(hrefOf(password)).toMatch(/#icon-eye-blocked$/);
    expect(confirm.type).toBe('password');

    await user.click(iconOf(password));
    expect(password.type).toBe('password');
    expect(hrefOf(password)).toMatch(/#icon-eye$/);
  });

  it('does not bake a hashed build path into the icon (B19)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TopNavigation />);
    await openLogin(user);

    const href = document.querySelector('.field__icon use')?.getAttribute('href') ?? '';
    expect(href).not.toContain('12eb0e28');
  });
});