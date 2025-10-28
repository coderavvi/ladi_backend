function isoToNumericId(isoString) {
  // Ensure it's a valid date string
  if (!isoString || typeof isoString !== 'string') {
    throw new Error('Invalid ISO string');
  }

  // Remove all non-numeric characters (like '-', ':', 'T', 'Z', '.')
  return isoString.replace(/\D/g, '');
}

module.exports = isoToNumericId;
