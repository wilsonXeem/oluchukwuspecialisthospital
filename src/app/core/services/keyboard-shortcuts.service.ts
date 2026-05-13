import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class KeyboardShortcutsService {
  private shortcuts: KeyboardShortcut[] = [];
  private isEnabled = true;

  constructor(private router: Router) {
    this.initializeDefaultShortcuts();
    this.setupGlobalListener();
  }

  private initializeDefaultShortcuts(): void {
    this.shortcuts = [
      {
        key: 'h',
        ctrlKey: true,
        action: () => this.router.navigate(['/dashboard']),
        description: 'Go to Dashboard'
      },
      {
        key: 'p',
        ctrlKey: true,
        action: () => this.router.navigate(['/patient']),
        description: 'Go to Patients'
      },
      {
        key: 'd',
        ctrlKey: true,
        action: () => this.router.navigate(['/doctor']),
        description: 'Go to Doctor Panel'
      },
      {
        key: 'l',
        ctrlKey: true,
        action: () => this.router.navigate(['/lab']),
        description: 'Go to Lab'
      },
      {
        key: 'i',
        ctrlKey: true,
        action: () => this.router.navigate(['/inventory']),
        description: 'Go to Inventory'
      },
      {
        key: 'r',
        ctrlKey: true,
        action: () => this.router.navigate(['/reports']),
        description: 'Go to Reports'
      },
      {
        key: 's',
        ctrlKey: true,
        action: () => this.router.navigate(['/settings']),
        description: 'Go to Settings'
      },
      {
        key: '/',
        ctrlKey: true,
        action: () => this.showShortcutsHelp(),
        description: 'Show Keyboard Shortcuts'
      },
      {
        key: 'Escape',
        action: () => this.closeModals(),
        description: 'Close Modals/Dialogs'
      }
    ];
  }

  private setupGlobalListener(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (!this.isEnabled) return;
      
      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      const matchingShortcut = this.shortcuts.find(shortcut => 
        shortcut.key.toLowerCase() === event.key.toLowerCase() &&
        !!shortcut.ctrlKey === event.ctrlKey &&
        !!shortcut.altKey === event.altKey &&
        !!shortcut.shiftKey === event.shiftKey
      );

      if (matchingShortcut) {
        event.preventDefault();
        matchingShortcut.action();
      }
    });
  }

  addShortcut(shortcut: KeyboardShortcut): void {
    this.shortcuts.push(shortcut);
  }

  removeShortcut(key: string, ctrlKey = false, altKey = false, shiftKey = false): void {
    this.shortcuts = this.shortcuts.filter(shortcut => 
      !(shortcut.key === key && 
        !!shortcut.ctrlKey === ctrlKey && 
        !!shortcut.altKey === altKey && 
        !!shortcut.shiftKey === shiftKey)
    );
  }

  getShortcuts(): KeyboardShortcut[] {
    return [...this.shortcuts];
  }

  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
  }

  private showShortcutsHelp(): void {
    // Emit event to show shortcuts modal
    const event = new CustomEvent('showShortcutsHelp');
    document.dispatchEvent(event);
  }

  private closeModals(): void {
    // Emit event to close all modals
    const event = new CustomEvent('closeAllModals');
    document.dispatchEvent(event);
  }
}