/**
 * Security protections to prevent inspect element, DevTools shortcuts, 
 * view-source, dragging, and active console debugging.
 */
export function initSecurityProtections() {
  if (typeof window === 'undefined') return;

  // 1. Prevent Right-Click / Context Menu globally
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 2. Prevent Keyboard Shortcuts used to inspect elements or view source
  document.addEventListener('keydown', (e) => {
    // F12 (DevTools)
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    const isCtrlOrCmd = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;
    const isAlt = e.altKey;

    // Ctrl+Shift+I / Cmd+Option+I (Inspect)
    // Ctrl+Shift+J / Cmd+Option+J (Console)
    // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
    if (isCtrlOrCmd && (isShift || isAlt)) {
      const key = e.key ? e.key.toLowerCase() : '';
      if (key === 'i' || key === 'j' || key === 'c') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }

    // Ctrl+U / Cmd+Option+U (View Source)
    if (isCtrlOrCmd && e.key && e.key.toLowerCase() === 'u') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S / Cmd+S (Save Page)
    if (isCtrlOrCmd && e.key && e.key.toLowerCase() === 's') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 3. Prevent dragging images and media
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 4. Console wiping & security warning
  const printWarning = () => {
    try {
      console.clear();
      console.log(
        '%c⛔ STOP!',
        'color: #ff0055; font-size: 28px; font-weight: 900; text-shadow: 0 0 10px rgba(255,0,85,0.5);'
      );
      console.log(
        '%cThis portfolio is protected. Inspecting elements, viewing source code, or saving protected artwork assets is restricted.',
        'color: #ffffff; font-size: 14px; font-weight: 600;'
      );
    } catch {
      // ignore
    }
  };

  printWarning();
  setInterval(printWarning, 2000);

  // 5. Anti-debugger trap (halts execution if DevTools is opened via browser menu)
  const antiDebugger = () => {
    function trap() {
      try {
        (function () {}).constructor('debugger')();
      } catch {
        // ignore
      }
    }
    setInterval(trap, 600);
  };

  antiDebugger();
}
