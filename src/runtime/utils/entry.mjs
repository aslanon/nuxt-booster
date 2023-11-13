import { hasSufficientDownloadPerformance } from './performance.mjs';

export const triggerRunCallback = sufficient =>
  window.dispatchEvent(
    new CustomEvent('nuxt-speedkit:run', { detail: { sufficient } })
  );

export function observeSpeedkitButton(id, callback) {
  Array.from(document.querySelectorAll('#' + id)).forEach(el => {
    el.addEventListener('click', callback, {
      capture: true,
      once: true,
      passive: true
    });
  });
}

export function updateSpeedkitLayerMessage(layerEl, id) {
  const el = window.document.getElementById(id);
  if (!el) {
    throw new Error("Can't update speedkit-layer, message " + id + ' missing.');
  } else {
    el.style.display = 'block';
    layerEl.className += ' nuxt-speedkit-layer-visible';
  }
}

export function setupSpeedkitLayer(layerEl, supportedBrowser) {
  if (!supportedBrowser) {
    updateSpeedkitLayerMessage('nuxt-speedkit-message-unsupported-browser');
  }
  if (!hasSufficientDownloadPerformance()) {
    updateSpeedkitLayerMessage(
      layerEl,
      'nuxt-speedkit-message-reduced-bandwidth'
    );
  }
}

export function initReducedView() {
  document.documentElement.classList.add('nuxt-speedkit-reduced-view');

  // activate fonts
  window.document.querySelectorAll('[data-font]').forEach(node => {
    node.classList.add('font-active');
  });

  // transform noscript>picture to picture
  Array.from(
    document.querySelectorAll('noscript.nuxt-speedkit-picture-noscript')
  ).forEach(el => {
    const tmp = document.createElement('div');
    // eslint-disable-next-line no-unsanitized/property
    tmp.innerHTML = el.innerHTML;
    el.parentNode.replaceChild(tmp.children[0], el);
    tmp.remove();
  });
}

export async function hasBatteryPerformanceIssue(videoBlob) {
  if ('BatteryManager' in window && !(await isBatteryLow())) {
    throw new Error('Battery is low.');
  }
  try {
    await canVideoPlay(videoBlob);
  } catch (error) {
    throw new Error('Video cannot be played.');
  }
}

/**
 * Checks if battery still has enough energy.
 * This check is for Chrome and all other browsers that support this setting.
 *
 * Condition is: The device is not charging and Battery is below <= 20%.
 * @see https://blog.google/products/chrome/new-chrome-features-to-save-battery-and-make-browsing-smoother/
 * @see https://developer.chrome.com/blog/memory-and-energy-saver-mode/
 **/
async function isBatteryLow() {
  const MIN_BATTERY_LEVEL = 0.2;
  const battery = await window.navigator.getBattery();
  return !battery.charging && battery.level <= MIN_BATTERY_LEVEL;
}

/**
 * Checking whether a video can be played.
 * This check is for IOS and checks if the power saving mode is enabled.
 *
 * In this case no video will be played automatically and play throws an error.
 */
export function canVideoPlay(blob) {
  const video = document.createElement('video');
  video.muted = true;
  video.playsinline = true;
  video.src = URL.createObjectURL(blob);
  return video.play();
}
