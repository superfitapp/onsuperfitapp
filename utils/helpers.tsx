import { PhotoInfo } from "@superfitapp/superfitjs";

export function hexColor(hex: string): string {
  if (!hex.startsWith("#")) {
    return "#" + hex;
  }

  return hex;
}

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

export function hexToRGB(hex: string, alpha: number): string {
  if (!hex) {
    return "#303030";
  }

  hex = hex.replace("#", "");
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  var result = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  return result;
}

export function getQueryString(field: string, url: string) {
  var reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
  var string = reg.exec(url);
  return string ? string[1] : null;
}

export function getThumbnailUrl(photo: PhotoInfo): string | undefined {
  switch (photo.type) {
    case "custom":
      // no thumbnail for custom
      return photo?.customPhotoUrl;
    case "unsplash":
      return photo.unsplashThumbUrl;
  }
}

export function getPhotoUrl(photo: PhotoInfo): string | undefined {
  switch (photo.type) {
    case "custom":
      // no thumbnail for custom
      return photo?.customPhotoUrl;
    case "unsplash":
      return photo.unsplashRegularUrl;
  }
}
