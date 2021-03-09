export function isDark(hexColor: string): boolean {
  // If a leading # is provided, remove it
  if (hexColor.slice(0, 1) === "#") {
    hexColor = hexColor.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (hexColor.length === 3) {
    hexColor = hexColor
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }

  // Convert to RGB value
  var r = parseInt(hexColor.substr(0, 2), 16);
  var g = parseInt(hexColor.substr(2, 2), 16);
  var b = parseInt(hexColor.substr(4, 2), 16);
  // Get YIQ ratio
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq <= 128;
}
