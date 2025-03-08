export function themeScript() {
  return `
    (function() {
      try {
        const storageTheme = localStorage.getItem('theme');
        if (storageTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (storageTheme === 'light') {
          document.documentElement.classList.remove('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;
}
