import { Component, DestroyRef, ElementRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { WebsocketService } from '../services/websocket-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private destoryRef = inject(DestroyRef);
  private elementRef = inject(ElementRef<HTMLElement>);
  private websocketService = inject(WebsocketService);

  title = 'Gestion des expositions itinérantes';
  isConnected = signal(false);
  isAccessibilityPanelOpen = signal(false);
  fontSize = signal<'small' | 'normal' | 'large'>('normal');
  isDarkMode = signal(false);

  ngOnInit(): void {
    const savedFontSize = localStorage.getItem('font-size');
    const savedTheme = localStorage.getItem('theme');

    if (savedFontSize === 'small' || savedFontSize === 'normal' || savedFontSize === 'large') {
      this.fontSize.set(savedFontSize);
    }
    this.isDarkMode.set(savedTheme === 'dark');
    this.applyPreferences();

    this.websocketService
      .isConnected()
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe((connected) => this.isConnected.set(connected));
  }

  toggleAccessibilityPanel(): void {
    this.isAccessibilityPanelOpen.update((isOpen) => !isOpen);
  }

  @HostListener('document:click', ['$event'])
  closePanelOnOutsideClick(event: MouseEvent): void {
    const clickedElement = event.target;

    if (clickedElement instanceof Node && !this.elementRef.nativeElement.contains(clickedElement)) {
      this.isAccessibilityPanelOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  closePanelOnEscape(): void {
    this.isAccessibilityPanelOpen.set(false);
  }

  setFontSize(size: 'small' | 'normal' | 'large'): void {
    this.fontSize.set(size);
    localStorage.setItem('font-size', size);
    this.applyPreferences();
  }

  toggleDarkMode(): void {
    this.isDarkMode.update((isDark) => !isDark);
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    this.applyPreferences();
  }

  private applyPreferences(): void {
    document.documentElement.dataset['fontSize'] = this.fontSize();
    document.documentElement.dataset['theme'] = this.isDarkMode() ? 'dark' : 'light';
  }
}
