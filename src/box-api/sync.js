import { fetch } from '@tauri-apps/api/http';
import store from '../store';

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

  if (!streamPos) {
    const pos = response.data.next_stream_position.toString();
    console.log('storing steam pos: ', pos);

    await store.settings.set({ stream_pos: pos });
  }

  return response.data;
}

export async function subscribeToEvents(read, setSelf) {
  const { access_token: token } = await store.settings.get('box_tokens');

  const headers = { Authorization: `Bearer ${token}` };

  const response = await fetch('https://api.box.com/2.0/events', {
    method: 'OPTIONS',
    headers,
  });

  const { url } = response.data.entries[0];

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
    const now = await getUserEvents(pos);
    console.log(now);

    // update with new stream event
    await store.settings.set({
      stream_pos: now.next_stream_position.toString(),
    });

    // go again
    await subscribeToEvents();
  }
}
