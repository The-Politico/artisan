import { type } from '@tauri-apps/api/os';
import store from '../store';
import atoms from '../atoms';

// Just a function to test things, will delete before merge
export default async function testing() {
  // await store.entities.reset();
  // await store.entities.refresh();
  const a = await store.entities.get();
  console.log(a);
}
