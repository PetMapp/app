import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: 'light' | 'dark';

  constructor() {
    this.currentTheme = this.detectTheme();
  }

  setTheme(theme: 'light' | 'dark') {
    this.currentTheme = theme;
  }

  getTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }

  private detectTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
