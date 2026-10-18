import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopNavigation from './TopNavigation';
import { renderWithProviders } from '../../test/render';

const openLogin = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getAllByRole('button', { name: 'Login' })[0]!);
  return document.querySelector('.modal') as HTMLElement;
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

    await user.click(document.querySelector('.modal__slug') as HTMLElement);
    expect(document.querySelector('.modal')).not.toBeNull();

    await user.click(overlay);
    expect(document.querySelector('.modal')).toBeNull();
  });

  it('closes on Escape (B3)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TopNavigation />);
    await openLogin(user);

    await user.keyboard('{Escape}');

    expect(document.querySelector('.modal')).toBeNull();
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

    const password = document.querySelector('input[name="signup_password"]') as HTMLInputElement;
    const confirm = document.querySelector('input[name="signup_confirmpassword"]') as HTMLInputElement;
    const buttonOf = (input: HTMLInputElement) => input.nextElementSibling as HTMLButtonElement;
    const hrefOf = (input: HTMLInputElement) => buttonOf(input).querySelector('use')?.getAttribute('href') ?? '';

    expect(password.type).toBe('password');
    expect(hrefOf(password)).toMatch(/#icon-eye$/);
    expect(buttonOf(password)).toHaveAttribute('aria-pressed', 'false');

    await user.click(buttonOf(password));
    expect(password.type).toBe('text');
    expect(hrefOf(password)).toMatch(/#icon-eye-blocked$/);
    expect(buttonOf(password)).toHaveAttribute('aria-pressed', 'true');
    expect(confirm.type).toBe('password');

    await user.click(buttonOf(password));
    expect(password.type).toBe('password');
    expect(hrefOf(password)).toMatch(/#icon-eye$/);
  });

  it('names the show-password buttons and links every label to its field (B22)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TopNavigation />);
    await openLogin(user);
    await user.click(screen.getAllByRole('button', { name: 'Sign up' })[0]!);

    expect(screen.getByLabelText('Email *')).toHaveAttribute('name', 'signup_email');
    expect(screen.getByLabelText('Password *')).toHaveAttribute('name', 'signup_password');
    expect(screen.getByLabelText('Confirm Password *')).toHaveAttribute('name', 'signup_confirmpassword');
    expect(screen.getByRole('button', { name: 'Show password' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show confirm password' })).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: 'Login' })[1]!);
    expect(screen.getByLabelText('Email *')).toHaveAttribute('name', 'login_email');
    expect(screen.getByLabelText('Password *')).toHaveAttribute('name', 'login_password');
  });

  it('keeps the buttons in a form, so Enter and the button do the same (B22)', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    const user = userEvent.setup();
    renderWithProviders(<TopNavigation />);
    await openLogin(user);

    const submit = document.querySelector('.modal__submit') as HTMLElement;
    expect(submit.closest('form')).not.toBeNull();
    await user.click(submit);
    expect(alertMock).toHaveBeenCalledTimes(1);
    await user.type(screen.getByLabelText('Email *'), 'a@b.c{Enter}');
    expect(alertMock).toHaveBeenCalledTimes(2);
  });

  it('is a modal dialog: it takes focus, keeps Tab inside and gives focus back on close (a11y)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TopNavigation />);
    const opener = screen.getAllByRole('button', { name: 'Login' })[0]!;
    await user.click(opener);

    const dialog = screen.getByRole('dialog', { name: 'Login' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveFocus();

    // Forward from the dialog, around the last control and back to the first.
    await user.tab();
    const first = document.activeElement as HTMLElement;
    expect(dialog).toContainElement(first);
    for (let i = 0; i < 12; i += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
    await user.tab({ shift: true });
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });
  it('does not bake a hashed build path into the icon (B19)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TopNavigation />);
    await openLogin(user);

    const href = document.querySelector('.field__icon use')?.getAttribute('href') ?? '';
    expect(href).not.toContain('12eb0e28');
  });
});