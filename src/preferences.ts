import {getPreferenceValues} from "@raycast/api";

export const API_KEY = "apiKey"

export type Preference = {[preferenceName: string]: any};

let prefs: Preference;

export function getPrefs() {
  if (!prefs) {
    prefs = getPreferenceValues<Preference>();
  }

  return prefs;
}

export function getAPIKey() {
  return getPrefs()[API_KEY];
}
