import { createSignal, onCleanup, createRoot } from "solid-js";
import { render } from "solid-js/web";


function Dialog({ onClose }) {
  let ref;
  const [visible, setVisible] = createSignal(false);
  let disposeRoot;

  const show = () => {
    setVisible(true);
    disposeRoot = createRoot(dispose => {
      render(() => (
        <div class="dialog-overlay" style={{ display: visible() ? "block" : "none"}}>
          <div ref={el => ref = el} class="dialog-content" style={{ opacity: 0 }}>
            {/* ...Dialog内容 */}
            <div class="dialog-header">
              <h3>Dialog Title</h3>
            </div>
            <div class="dialog-body">
              <p>This is a simple dialog component.</p>
            </div>
            <div class="dialog-footer">
              <button class="close-button" onClick={hide}>关闭</button>
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
    requestAnimationFrame(() => {
      ref.style.opacity = 1;
      ref.style.transition = "opacity 0.3s";
    });
  };

  const exitAnimation = (callback) => {
    ref.style.opacity = 1;
    requestAnimationFrame(() => {
      ref.style.opacity = 0;
      ref.style.transition = "opacity 0.3s";
      setTimeout(() => {
        callback && callback();
      }, 300);
    });
  };

  return { show, hide };
} 

export default Dialog