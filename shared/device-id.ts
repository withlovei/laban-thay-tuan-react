import 'react-native-get-random-values';
import * as Keychain from 'react-native-keychain';
import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'my_app_unique_id';

export async function getOrCreateAppUniqueId() {
  const credentials = await Keychain.getGenericPassword({ service: USER_ID_KEY });

  if (credentials) {
    return credentials.password;
  } else {
    const newId = uuidv4(); // or DeviceInfo.getUniqueId()
    await Keychain.setGenericPassword('id', newId, { service: USER_ID_KEY });
    return newId;
  }
} 