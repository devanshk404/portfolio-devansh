const kitchenVideoIntent = "portfolio:kitchen-video-intent";

export function notifyKitchenVideoIntent() {
  window.dispatchEvent(new Event(kitchenVideoIntent));
}

export function subscribeToKitchenVideoIntent(callback: () => void) {
  window.addEventListener(kitchenVideoIntent, callback);
  return () => window.removeEventListener(kitchenVideoIntent, callback);
}
