import { fetch } from '@tauri-apps/api/http';
import store from '../store';

/**
 * This code is a WIP.
 * It's a basic implimentation of long polling the events API
 * using the realtime to wait for a 'new_change' response,
 * which then requests the latest events from the API via the established
 * stream posistion when the app boots
 */

export async function getUserEvents(streamPos) {
  const { access_token: token } = await store.settings.get('box_tokens');

  const headers = { Authorization: `Bearer ${token}` };

  const q = new URLSearchParams({
    stream_position: streamPos || 'now',
  });

  const response = await fetch(`https://api.box.com/2.0/events?${q}`, {
    method: 'GET',
    headers,
  });

  // Sets initial stream posistion on app init
  // For use in main.jsx
  if (!streamPos) {
    const pos = response.data.next_stream_position.toString();
    console.log('storing steam pos: ', pos);

    await store.settings.set({ stream_pos: pos });
  }

  return response.data;
}

export async function subscribeToEvents() {
  const { access_token: token } = await store.settings.get('box_tokens');

  const headers = { Authorization: `Bearer ${token}` };

  // OPTIONS request for real time servers
  const response = await fetch('https://api.box.com/2.0/events', {
    method: 'OPTIONS',
    headers,
  });

  // Get first realtime server URL
  const { url } = response.data.entries[0];

  // This connection remains open until a
  // user event is triggered
  const rtResponse = await fetch(url, {
    method: 'GET',
  });

  const {
    data: { message },
  } = rtResponse;

  if (rtResponse.status === 502) {
    await subscribeToEvents();
  } else if (message === 'reconnect') {
    // Received alert to reconnect
    await new Promise((r) => setTimeout(r, 1000));
    await subscribeToEvents();
  } else if (message === 'new_change') {
    // user event occured

    // Get last stream posistion from store
    const pos = await store.settings.get('stream_pos');

    // see the event(s)
    const events = await getUserEvents(pos);
    // doSomethingWithEvents(events)
    console.log(events);

    // update with new stream event
    await store.settings.set({
      stream_pos: events.next_stream_position.toString(),
    });

    // go again
    await subscribeToEvents();
  }
}
