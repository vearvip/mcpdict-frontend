import { createSignal, onCleanup, createRoot } from 'solid-js';
import { render } from 'solid-js/web';

function Dialog({ onClose }) {
  let dialogRef, overlayRef;
  const [visible, setVisible] = createSignal(false);
  let disposeRoot;

  const show = () => {
    setVisible(true);
    disposeRoot = createRoot((dispose) => {
      render(() => (
        <div
          ref={(el) => (overlayRef = el)}
          class="dialog-overlay"
          style={{ opacity: 0 }}
        >
          <div
            ref={(el) => (dialogRef = el)}
            class="dialog-content"
            style={{ opacity: 0 }}
          >
            {/* ...Dialog内容 */}
            <div class="dialog-header">
              <h3>Dialog Title</h3>
            </div>
            <div class="dialog-body">
              <p>This is a simple dialog component.</p>
            </div>
            <div class="dialog-footer">
              <button class="close-button" onClick={hide}>
                Close
              </button>
            </div>
          </div>
        </div>
      ), document.body);
      return dispose;
    });
    enterAnimation();
  };

  const hide = () => {
    exitAnimation(() => {
      setVisible(false);
      onClose && onClose();
      disposeRoot && disposeRoot();
    });
  };

  const enterAnimation = () => {
    overlayRef.style.transition = 'opacity 0.3s';
    dialogRef.style.transition = 'opacity 0.3s';
    requestAnimationFrame(() => {
      overlayRef.style.opacity = 1;
      dialogRef.style.opacity = 1;
    });
  };

  const exitAnimation = (callback) => {
    requestAnimationFrame(() => {
      overlayRef.style.opacity = 0;
      dialogRef.style.opacity = 0;
      setTimeout(() => {
        callback && callback();
      }, 300);
    });
  };

  return { show, hide };
}
 

export default Dialog