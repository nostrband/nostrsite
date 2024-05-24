// Usage:
// `{{img_url feature_image}}`
// `{{img_url profile_image absolute="true"}}`
// Note:
// `{{img_url}}` - does not work, argument is required
//
// Returns the URL for the current object scope i.e. If inside a post scope will return image permalink
// `absolute` flag outputs absolute URL, else URL is relative.

// @ts-ignore
import tpl from "@tryghost/tpl";
import { getRenderer } from "../services/renderer";
import identity from "lodash/identity";

const messages = {
  attrIsRequired: "Attribute is required e.g. {{img_url feature_image}}",
};

function getAbsoluteOption(options: any) {
  const absoluteOption = options && options.hash && options.hash.absolute;

  return absoluteOption
    ? !!absoluteOption && absoluteOption !== "false"
    : false;
}

function getImageSizeOptions(options: any) {
  const requestedSize = options && options.hash && options.hash.size;
  const imageSizes =
    options &&
    options.data &&
    options.data.config &&
    options.data.config.image_sizes;
  const requestedFormat = options && options.hash && options.hash.format;

  return {
    requestedSize,
    imageSizes,
    requestedFormat,
  };
}

export default function img_url(requestedImageUrl: string, options: any) {
  const { urlUtils, imageUtils } = getRenderer(options);

  const {
    detectInternalImage,
    getImageWithSize,
    getUnsplashImage,
    detectUnsplashImage,
  } = imageUtils;

  // CASE: if no url is passed, e.g. `{{img_url}}` we show a warning
  if (arguments.length < 2) {
    console.warn(tpl(messages.attrIsRequired));
    return;
  }

  // CASE: if url is passed, but it is undefined, then the attribute was
  // an unknown value, e.g. {{img_url feature_img}} and we also show a warning
  if (requestedImageUrl === undefined) {
    console.warn(tpl(messages.attrIsRequired));
    return;
  }

  // CASE: if you pass e.g. cover_image, but it is not set, then requestedImageUrl is null!
  // in this case we don't show a warning
  if (requestedImageUrl === null) {
    return;
  }

  // CASE: if you pass an external image, there is nothing we want to do to it!
  const isInternalImage = detectInternalImage(requestedImageUrl);
  const sizeOptions = getImageSizeOptions(options);

  if (!isInternalImage) {
    // Detect Unsplash width and format
    const isUnsplashImage = detectUnsplashImage(requestedImageUrl);
    if (isUnsplashImage) {
      try {
        return getUnsplashImage(requestedImageUrl, sizeOptions);
      } catch (e) {
        // ignore errors and just return the original URL
      }
    }

    return requestedImageUrl;
  }

  const absoluteUrlRequested = getAbsoluteOption(options);

  function getImageUrl(image: string) {
    return urlUtils.urlFor("image", { image }, absoluteUrlRequested);
  }

  function ensureRelativePath(image: string) {
    return urlUtils.absoluteToRelative(image);
  }

  // CASE: only make paths relative if we didn't get a request for an absolute url
  const maybeEnsureRelativePath = !absoluteUrlRequested
    ? ensureRelativePath
    : identity;

  return maybeEnsureRelativePath(
    getImageUrl(getImageWithSize(requestedImageUrl, sizeOptions))
  );
}
