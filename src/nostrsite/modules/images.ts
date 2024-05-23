// const imageTransform = require('@tryghost/image-transform');

import { NostrSiteUrlUtils } from "./urlutils";

function resolve(base: string, url: string) {
  return new URL(url, base).href;
}

// FIXME stub
const imageTransform = {
  canTransformToFormat: (_: string) => false,
};

function prefixIfPresent(prefix: string, str: string) {
  return str ? prefix + str : "";
}

export class ImageUtils {
  private urlUtils: NostrSiteUrlUtils;

  // make these members deconstructible
  public detectInternalImage: (url: string) => boolean;
  public detectUnsplashImage: (requestedImageUrl: string) => boolean;
  public getUnsplashImage: (imagePath: string, sizeOptions: any) => string;
  public getImageWithSize: (imagePath: string, sizeOptions: any) => string;

  constructor(uu: NostrSiteUrlUtils) {
    this.urlUtils = uu;
    this.detectInternalImage = this._detectInternalImage.bind(this);
    this.detectUnsplashImage = this._detectUnsplashImage.bind(this);
    this.getUnsplashImage = this._getUnsplashImage.bind(this);
    this.getImageWithSize = this._getImageWithSize.bind(this);
  }

  private _detectInternalImage(requestedImageUrl: string) {
    const siteUrl = this.urlUtils.getSiteUrl();
    const isAbsoluteImage = /https?:\/\//.test(requestedImageUrl);
    const isAbsoluteInternalImage =
      isAbsoluteImage && requestedImageUrl.startsWith(siteUrl);

    // CASE: imagePath is a "protocol relative" url e.g. "//www.gravatar.com/ava..."
    //       by resolving the the imagePath relative to the blog url, we can then
    //       detect if the imagePath is external, or internal.
    const isRelativeInternalImage =
      !isAbsoluteImage &&
      resolve(siteUrl, requestedImageUrl).startsWith(siteUrl);

    return isAbsoluteInternalImage || isRelativeInternalImage;
  }

  private _detectUnsplashImage(requestedImageUrl: string) {
    const isUnsplashImage = /images\.unsplash\.com/.test(requestedImageUrl);
    return isUnsplashImage;
  }

  private _getUnsplashImage(imagePath: string, sizeOptions: any) {
    const parsedUrl = new URL(imagePath);
    const { requestedSize, imageSizes, requestedFormat } = sizeOptions;

    if (requestedFormat) {
      const supportedFormats = ["avif", "gif", "jpg", "png", "webp"];
      if (supportedFormats.includes(requestedFormat)) {
        parsedUrl.searchParams.set("fm", requestedFormat);
      } else if (requestedFormat === "jpeg") {
        // Map to alias
        parsedUrl.searchParams.set("fm", "jpg");
      }
    }

    if (!imageSizes || !imageSizes[requestedSize]) {
      return parsedUrl.toString();
    }

    const { width, height } = imageSizes[requestedSize];

    if (!width && !height) {
      return parsedUrl.toString();
    }

    parsedUrl.searchParams.delete("w");
    parsedUrl.searchParams.delete("h");

    if (width) {
      parsedUrl.searchParams.set("w", width);
    }
    if (height) {
      parsedUrl.searchParams.set("h", height);
    }
    return parsedUrl.toString();
  }

  /**
   *
   * @param {string} imagePath
   * @param {Object} sizeOptions
   * @param {string} sizeOptions.requestedSize
   * @param {Object[]} sizeOptions.imageSizes
   * @param {string} [sizeOptions.requestedFormat]
   * @returns
   */
  private _getImageWithSize(imagePath: string, sizeOptions: any): string {
    const hasLeadingSlash = imagePath[0] === "/";

    if (hasLeadingSlash) {
      return "/" + this.getImageWithSize(imagePath.slice(1), sizeOptions);
    }
    const { requestedSize, imageSizes, requestedFormat } = sizeOptions;

    if (!requestedSize) {
      return imagePath;
    }

    if (!imageSizes || !imageSizes[requestedSize]) {
      return imagePath;
    }

    const { width, height } = imageSizes[requestedSize];

    if (!width && !height) {
      return imagePath;
    }
    // FIXME STATIC_IMAGE_URL_PREFIX isn't defined!
    const [imgBlogUrl, imageName] = imagePath.split(
      this.urlUtils.STATIC_IMAGE_URL_PREFIX
    );

    const sizeDirectoryName =
      prefixIfPresent("w", width) + prefixIfPresent("h", height);
    const formatPrefix =
      requestedFormat && imageTransform.canTransformToFormat(requestedFormat)
        ? `/format/${requestedFormat}`
        : "";

    return [
      imgBlogUrl,
      this.urlUtils.STATIC_IMAGE_URL_PREFIX,
      `/size/${sizeDirectoryName}`,
      formatPrefix,
      imageName,
    ].join("");
  }
}
