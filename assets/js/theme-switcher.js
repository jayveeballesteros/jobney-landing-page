/**
 * Switch between light and dark themes
 * Copyright 2025 Jobney
 */

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  // Set initial theme and checkbox state
  const initialTheme = getPreferredTheme()
  setTheme(initialTheme)

  // Initialize checkbox state when DOM is loaded
  window.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.querySelector('#theme-mode')
    if (checkbox) {
      checkbox.checked = initialTheme === 'dark'
    }
  })

  // Listen for system color scheme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!getStoredTheme()) {
      setTheme(e.matches ? 'dark' : 'light')
    }
  })

  // Handle manual theme switches
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-bs-toggle="mode"]').forEach(toggler => {
      toggler.addEventListener('click', () => {
        const checkbox = toggler.querySelector('input[type="checkbox"]')
        if (checkbox) {
          const theme = checkbox.checked ? 'dark' : 'light'
          setStoredTheme(theme)
          setTheme(theme)
        }
      })
    })
  })
})()
