import { Component, OnInit, OnDestroy } from '@angular/core';
import { KeyboardShortcutsService, KeyboardShortcut } from '../../../../core/services/keyboard-shortcuts.service';

@Component({
  selector: 'app-keyboard-shortcuts-modal',
  templateUrl: './keyboard-shortcuts-modal.component.html',
  styleUrls: ['./keyboard-shortcuts-modal.component.css']
})
export class KeyboardShortcutsModalComponent implements OnInit, OnDestroy {
  isOpen = false;
  shortcuts: KeyboardShortcut[] = [];

  constructor(private keyboardShortcutsService: KeyboardShortcutsService) {}

  ngOnInit(): void {
    this.shortcuts = this.keyboardShortcutsService.getShortcuts();
    document.addEventListener('showShortcutsHelp', this.open.bind(this));
    document.addEventListener('closeAllModals', this.close.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('showShortcutsHelp', this.open.bind(this));
    document.removeEventListener('closeAllModals', this.close.bind(this));
  }

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }
}