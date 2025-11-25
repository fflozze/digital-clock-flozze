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
 * Calcule l'offset UTC d'un fuseau horaire en heures
 * @function getTimezoneOffset
 * @param {string} timezone - Code du fuseau horaire (ex: 'Europe/Paris')
 * @returns {number} Offset UTC en heures (ex: 1 pour UTC+1, -5 pour UTC-5)
 */
export function getTimezoneOffset(timezone) {
  const now = new Date();
  const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  const offset = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
  return Math.round(offset);
}

/**
 * Formate l'offset UTC en chaîne (ex: 'UTC+1', 'UTC-5')
 * @function formatUTC
 * @param {number} offset - Offset UTC en heures
 * @returns {string} Chaîne formatée UTC
 */
export function formatUTC(offset) {
  if (offset === 0) return 'UTC+0';
  return offset > 0 ? `UTC+${offset}` : `UTC${offset}`;
}

/**
 * Obtient le fuseau horaire du navigateur
 * @function getBrowserTimezone
 * @returns {string} Code du fuseau horaire du navigateur
 */
export function getBrowserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Trouve un fuseau horaire dans la liste qui correspond à l'offset UTC donné
 * @function findTimezoneByOffset
 * @param {number} offset - Offset UTC en heures
 * @returns {Object|null} Objet fuseau horaire ou null si non trouvé
 */
export function findTimezoneByOffset(offset) {
  // Extraire l'offset numérique de chaque fuseau horaire
  for (const tz of timezones) {
    const tzOffset = getTimezoneOffset(tz.value);
    if (tzOffset === offset) {
      return tz;
    }
  }
  return null;
}

/**
 * Obtient le fuseau horaire sauvegardé ou le fuseau horaire du navigateur par défaut
 * @function getTimezone
 * @returns {string} Code du fuseau horaire
 */
export function getTimezone() {
  const saved = localStorage.getItem('timezone');
  if (saved) {
    return saved;
  }
  
  // Utiliser le fuseau horaire du navigateur par défaut
  return getBrowserTimezone();
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

/**
 * Obtient les informations du fuseau horaire actuel (nom et UTC)
 * @function getCurrentTimezoneInfo
 * @returns {Object} Objet avec label et utc, ou null si non trouvé
 */
export function getCurrentTimezoneInfo() {
  const currentTimezone = getTimezone();
  
  // Vérifier si le fuseau horaire est dans la liste
  const found = timezones.find(tz => tz.value === currentTimezone);
  if (found) {
    return found;
  }
  
  // Si le fuseau horaire n'est pas dans la liste, calculer son offset UTC
  const offset = getTimezoneOffset(currentTimezone);
  const utc = formatUTC(offset);
  
  // Créer un objet avec le nom du fuseau horaire du navigateur
  // Extraire le nom de la ville depuis le code (ex: 'Europe/Paris' -> 'Paris')
  const parts = currentTimezone.split('/');
  const cityName = parts[parts.length - 1].replace(/_/g, ' ');
  
  return {
    value: currentTimezone,
    label: cityName,
    utc: utc
  };
}

