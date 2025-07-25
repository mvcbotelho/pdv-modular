import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      // Dark theme colors
      background: '#0f0f1a',
      backgroundSecondary: '#111827',
      border: '#1f2937',
      primary: '#6366f1',
      primaryGradientStart: '#8b5cf6',
      primaryGradientEnd: '#3b82f6',
      textPrimary: '#e5e7eb',
      textSecondary: '#9ca3af',
      textMuted: '#6b7280',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
    },
  },
});

export const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
  body: {
    backgroundColor: '$$background',
    color: '$$textPrimary',
    fontFamily: 'system-ui, sans-serif',
    lineHeight: 1.5,
    WebkitFontSmoothing: 'antialiased',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  '[data-theme="light"]': {
    '--background': '#ffffff',
    '--background-secondary': '#f8fafc',
    '--border': '#e2e8f0',
    '--primary': '#6366f1',
    '--primary-gradient-start': '#8b5cf6',
    '--primary-gradient-end': '#3b82f6',
    '--text-primary': '#1e293b',
    '--text-secondary': '#64748b',
    '--text-muted': '#94a3b8',
    '--success': '#10b981',
    '--error': '#ef4444',
    '--warning': '#f59e0b',
    '--info': '#3b82f6',
  },
  '[data-theme="dark"]': {
    '--background': '#0f0f1a',
    '--background-secondary': '#111827',
    '--border': '#1f2937',
    '--primary': '#6366f1',
    '--primary-gradient-start': '#8b5cf6',
    '--primary-gradient-end': '#3b82f6',
    '--text-primary': '#e5e7eb',
    '--text-secondary': '#9ca3af',
    '--text-muted': '#6b7280',
    '--success': '#10b981',
    '--error': '#ef4444',
    '--warning': '#f59e0b',
    '--info': '#3b82f6',
  },
});