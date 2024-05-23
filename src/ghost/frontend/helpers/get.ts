// # Get Helper
// Usage: `{{#get "posts" limit="5"}}`, `{{#get "tags" limit="all"}}`
// Fetches data from the API

// @ts-ignore
import tpl from "@tryghost/tpl";
import jsonpath from "jsonpath";

import _ from "lodash";
import { getRenderer } from "../services/renderer";

const messages = {
  mustBeCalledAsBlock:
    "The {\\{{helperName}}} helper must be called as a block. E.g. {{#{helperName}}}...{{/{helperName}}}",
  invalidResource: 'Invalid "{resource}" resource given to get helper',
};

// Short forms of paths which we should understand
const pathAliases: any = {
  "post.tags": "post.tags[*].slug",
  "post.author": "post.author.slug",
};

/**
 * ## Resolve Paths
 * Find and resolve path strings
 *
 * @param {Object} data
 * @param {String} value
 * @returns {String}
 */
function resolvePaths(globals: any, data: any, value: string) {
  const regex = /\{\{(.*?)\}\}/g;

  value = value.replace(regex, function (__: any, path: string) {
    let result;

    // Handle aliases
    path = pathAliases[path] ? pathAliases[path] : path;
    // Handle Handlebars .[] style arrays
    path = path.replace(/\.\[/g, "[");

    if (path.charAt(0) === "@") {
      result = jsonpath.query(globals, path.slice(1));
    } else {
      // Do the query, which always returns an array of matches
      result = jsonpath.query(data, path);
    }

    // Handle the case where the single data property we return is a Date
    // Data.toString() is not DB compatible, so use `toISOString()` instead
    if (_.isDate(result[0])) {
      result[0] = result[0].toISOString();
    }

    // Concatenate the results with a comma, handles common case of multiple tag slugs
    return result.join(",");
  });

  return value;
}

/**
 * ## Parse Options
 * Ensure options passed in make sense
 *
 * @param {Object} data
 * @param {Object} options
 * @returns {*}
 */
function parseOptions(config: any, globals: any, data: any, options: any) {
  if (_.isString(options.filter)) {
    options.filter = resolvePaths(globals, data, options.filter);
  }

  if (options.limit === "all") {
    if (config.get("getHelperLimitAllMax"))
      options.limit = config.get("getHelperLimitAllMax");
    else
      options.limit = undefined;
  }

  return options;
}

function optimiseFilterCacheability(_: string, options: any) {
  const noOptimisation = {
    options,
    parseResult(result: any) {
      return result;
    },
  };
  return noOptimisation;
}


/**
 * ## Get
 * @param {String} resource
 * @param {Object} options
 * @returns {Promise<any>}
 */
export default async function get(resource: string, options: any) {
  options = options || {};
  options.hash = options.hash || {};
  options.data = options.data || {};

  const { config, prepareContextResource, SafeString, hbs, store } =
    getRenderer(options);
  const createFrame = hbs.handlebars.createFrame;

  // @ts-ignore
  const self: any = this;

  const start = Date.now();
  const data = createFrame(options.data);
  const globals = _.omit(data, ["_parent", "root"]);

  let apiOptions = options.hash;

  if (!options.fn) {
    data.error = tpl(messages.mustBeCalledAsBlock, { helperName: "get" });
    console.warn(data.error);
    return;
  }

  if (!store.isValidType(resource)) {
    data.error = tpl(messages.invalidResource, { resource });
    console.warn(data.error);
    return options.inverse(self, { data: data });
  }

  // Parse the options we're going to pass to the API
  apiOptions = parseOptions(config, globals, self, apiOptions);
  apiOptions.context = { member: data.member };
  apiOptions.type = resource;
  console.log("get", { resource, options, apiOptions }, apiOptions.filter);
  try {

    const response = await store.list(apiOptions);
    console.log("got", response);

    // prepare data properties for use with handlebars
    if (response[resource] && response[resource].length) {
      response[resource].forEach(prepareContextResource);
    }

    // used for logging details of slow requests
    // returnedRowsCount = response[resource] && response[resource].length;

    // block params allows the theme developer to name the data using something like
    // `{{#get "posts" as |result pageInfo|}}`
    const blockParams = [response[resource]];
    if (response.meta && response.meta.pagination) {
      response.pagination = response.meta.pagination;
      blockParams.push(response.meta.pagination);
    }

    // Call the main template function
    const rendered = options.fn(response, {
      data: data,
      blockParams: blockParams,
    });

    if (response["@@ABORTED_GET_HELPER@@"]) {
      return new SafeString(
        `<span data-aborted-get-helper>Could not load content</span>` + rendered
      );
    } else {
      return rendered;
    }
  } catch (error: any) {
    console.error(error);
    data.error = error.message;
    return options.inverse(self, { data: data });
  } finally {
    if (config.get("optimization:getHelper:notify:threshold")) {
      const totalMs = Date.now() - start;
      // const logLevel =
      //   config.get("optimization:getHelper:notify:level") || "warn";
      const threshold = config.get("optimization:getHelper:notify:threshold");
      if (totalMs > threshold) {
        console.log("get taking too long");
        // logging[logLevel](
        //   new errors.HelperWarning({
        //     message: `{{#get}} helper took ${totalMs}ms to complete`,
        //     code: "SLOW_GET_HELPER",
        //     errorDetails: {
        //       api: `${controllerName}.${action}`,
        //       apiOptions,
        //       returnedRows: returnedRowsCount,
        //     },
        //   })
        // );
      }
    }
  }
}

get.async = true;
get.optimiseFilterCacheability = optimiseFilterCacheability;
