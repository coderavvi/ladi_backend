function toNumericId(isoString) {
  return isoString.replace(/[^0-9]/g, '');
}

module.exports = toNumericId;
