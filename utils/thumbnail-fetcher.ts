import { storageBucket } from "@/lib/firebase-admin";

export enum ThumbnailSize {
  sixtyFour = 64,
  twoFiftySix = 256,
  fiveTwelve = 512,
}

export async function fetchThumbnail(
  size: ThumbnailSize,
  filePath: String
): Promise<string> {
  let filePathComponents = filePath.split("/");
  let imageName = filePathComponents[filePathComponents.length - 1];

  if (!imageName) {
    throw Error("no image name");
  }

  let thumbnailPath = filePathComponents.reduce((composedString, component) => {
    if (component != imageName) {
      return composedString + `/${component}`;
    } else {
      // Last component of path, most
      // likely the image file name.
      return composedString + `/thumb@${size}_${component}`;
    }
  });

  return fetchFirImageUrl(thumbnailPath);
}

async function fetchFirImageUrl(path: string): Promise<string> {
  const [signedUrl] = await storageBucket.file(path).getSignedUrl({
    version: "v4",
    action: "read",
    expires: Date.now() + 1000 * 60 * 30, // 30 minutes
  });

  // let spaceRef = this.storage.storage.ref(path);
  // let downloadUrl = await spaceRef.getDownloadURL();
  // this.cachePhoto(path, downloadUrl);
  return signedUrl;
}
