window.document.addEventListener('DOMContentLoaded', () => {
  function onIOSClick() {
    try {
      window.utag.link({
        event_type: 'interactives_interaction',
        interaction_name: 'engagement:app-download:ios:${cid}',
      });
    } catch (e) { /* ignore error */ }
  }

  function onAndroidClick() {
    try {
      window.utag.link({
        event_type: 'interactives_interaction',
        interaction_name: 'engagement:app-download:android:${cid}',
      });
    } catch (e) { /* ignore error */ }
  }

  window.document.querySelector('<BUTTON_SELECTOR>').addEventListener('click', onIOSClick);
  window.document.querySelector('<BUTTON_SELECTOR>').addEventListener('click', onAndroidClick);
});
