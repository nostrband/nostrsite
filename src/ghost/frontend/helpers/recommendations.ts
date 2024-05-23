/* Recommendations helper
 * Usage: `{{recommendations}}`
 *
 * Renders the template defined in `tpl/recommendations.hbs`
 * Can be overridden by themes by uploading a partial under `partials/recommendations.hbs`
 *
 * Available options: limit, order, filter, page
 */
import { getRenderer } from "../services/renderer";
import { templates } from "../services/theme-engine/handlebars/template";

/**
 * Parse Options
 *
 * @param {Object} options
 * @returns {*}
 */
function parseOptions(options: any) {
  let limit = options.limit ?? 5;
  let order = options.order ?? "created_at desc";
  let filter = options.filter ?? "";
  let page = options.page ?? 1;

  return {
    limit,
    order,
    filter,
    page,
  };
}

/**
 *
 * @param {object} options
 * @returns {Promise<any>}
 */
export default async function recommendations(options: any) {
  const {
    prepareContextResource,
    hbs,
    store,
  } = getRenderer(options);

  const createFrame = hbs.handlebars.createFrame;
  // FIXME add a setting
  //   const recommendationsEnabled = settingsCache.get("recommendations_enabled");

  //   if (!recommendationsEnabled) {
  //     return;
  //   }

  options = options || {};
  options.hash = options.hash || {};
  options.data = options.data || {};

  const data = createFrame(options.data);
  let apiOptions = options.hash;
  apiOptions = parseOptions(apiOptions);

  try {
    // const response = await fetchRecommendations(apiOptions);
    const response = await store.list({ type: "recommendations" });

    if (response.recommendations && response.recommendations.length) {
      response.recommendations.forEach(prepareContextResource);
    }

    if (response.meta && response.meta.pagination) {
      response.pagination = response.meta.pagination;
    }

    return templates.execute("recommendations", response, { data }, hbs);
  } catch (error) {
    console.error(error);
    return null;
  }
}

recommendations.async = true;
