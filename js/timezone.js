/**
 * @fileoverview Module de gestion des fuseaux horaires
 * @module timezone
 * @version 1.0.0
 * @author Flozze
 */

/**
 * Liste des fuseaux horaires - une capitale par UTC
 */
export const timezones = [
  { value: 'Pacific/Honolulu', label: 'Honolulu', utc: 'UTC-10' },
  { value: 'America/Anchorage', label: 'Anchorage', utc: 'UTC-9' },
  { value: 'America/Los_Angeles', label: 'Los Angeles', utc: 'UTC-8' },
  { value: 'America/Denver', label: 'Denver', utc: 'UTC-7' },
  { value: 'America/Chicago', label: 'Chicago', utc: 'UTC-6' },
  { value: 'America/New_York', label: 'New York', utc: 'UTC-5' },
  { value: 'America/Caracas', label: 'Caracas', utc: 'UTC-4' },
  { value: 'America/Sao_Paulo', label: 'São Paulo', utc: 'UTC-3' },
  { value: 'Atlantic/South_Georgia', label: 'South Georgia', utc: 'UTC-2' },
  { value: 'Atlantic/Azores', label: 'Ponta Delgada', utc: 'UTC-1' },
  { value: 'Europe/London', label: 'Londres', utc: 'UTC+0' },
  { value: 'Europe/Paris', label: 'Paris', utc: 'UTC+1' },
  { value: 'Africa/Cairo', label: 'Le Caire', utc: 'UTC+2' },
  { value: 'Europe/Moscow', label: 'Moscou', utc: 'UTC+3' },
  { value: 'Asia/Dubai', label: 'Dubaï', utc: 'UTC+4' },
  { value: 'Asia/Karachi', label: 'Karachi', utc: 'UTC+5' },
  { value: 'Asia/Dhaka', label: 'Dhaka', utc: 'UTC+6' },
  { value: 'Asia/Bangkok', label: 'Bangkok', utc: 'UTC+7' },
  { value: 'Asia/Shanghai', label: 'Shanghai', utc: 'UTC+8' },
  { value: 'Asia/Tokyo', label: 'Tokyo', utc: 'UTC+9' },
  { value: 'Australia/Sydney', label: 'Sydney', utc: 'UTC+10' },
  { value: 'Pacific/Noumea', label: 'Nouméa', utc: 'UTC+11' },
  { value: 'Pacific/Auckland', label: 'Auckland', utc: 'UTC+12' }
];

/**
 * Obtient le fuseau horaire sauvegardé ou le fuseau horaire par défaut
 * @function getTimezone
 * @returns {string} Code du fuseau horaire
 */
export function getTimezone() {
  return localStorage.getItem('timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Définit le fuseau horaire et le sauvegarde
 * @function setTimezone
 * @param {string} timezone - Code du fuseau horaire
 * @returns {void}
 */
export function setTimezone(timezone) {
  localStorage.setItem('timezone', timezone);
}

/**
 * Obtient l'objet Date ajusté au fuseau horaire sélectionné
 * @function getDateInTimezone
 * @returns {Date} Date ajustée au fuseau horaire
 */
export function getDateInTimezone() {
  const timezone = getTimezone();
  const now = new Date();
  
  // Créer une date dans le fuseau horaire spécifié
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  const parts = formatter.formatToParts(now);
  const year = parseInt(parts.find(p => p.type === 'year').value);
  const month = parseInt(parts.find(p => p.type === 'month').value) - 1;
  const day = parseInt(parts.find(p => p.type === 'day').value);
  const hour = parseInt(parts.find(p => p.type === 'hour').value);
  const minute = parseInt(parts.find(p => p.type === 'minute').value);
  const second = parseInt(parts.find(p => p.type === 'second').value);
  
  return new Date(year, month, day, hour, minute, second);
}

