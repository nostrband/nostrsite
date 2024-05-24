// # Date Helper
// Usage: `{{date format="DD MM, YYYY"}}`, `{{date updated_at format="DD MM, YYYY"}}`
//
// Formats a date using moment-timezone.js. Formats published_at by default but will also take a date as a parameter

// import moment from "moment-timezone";
import { DateTime } from "luxon";
import { getRenderer } from "../services/renderer";
import isEmpty from "lodash/isEmpty";

const units: Intl.RelativeTimeFormatUnit[] = [
  "year",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
];

const timeAgo = (dateTime: DateTime) => {
  const diff = dateTime.diffNow().shiftTo(...units);
  const unit = units.find((unit) => diff.get(unit) !== 0) || "second";

  const relativeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });
  return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
};

export default function (...attrs: any[]) {
  // Options is the last argument
  const options = attrs.pop();

  const { SafeString } = getRenderer(options);

  // @ts-ignore
  const self: any = this;

  let date;

  // If there is any more arguments, date is the first one
  if (!isEmpty(attrs)) {
    date = attrs.shift();

    // If there is no date argument & the current context contains published_at use that by default,
    // else date being undefined means moment will use the current date
  } else if (self.published_at) {
    date = self.published_at;
  }

  // ensure that date is undefined, not null, as that can cause errors
  date = date === null ? undefined : date;

  let {
    format = "LLL dd, yyyy",
    timeago,
    timezone = options.data.site.timezone,
    locale = options.data.site.locale,
  } = options.hash;

  format = format.replace("YYYY", "yyyy").replace("DD", "dd");

  //  const timeNow = moment().tz(timezone);
  const timeNow = DateTime.now().setZone(timezone);
  // Our date might be user input
  let millis = Date.parse(date);
  let dateMoment;
  if (isNaN(millis) === false) {
    dateMoment = DateTime.fromMillis(millis); // moment.parseZone(date);
  } else {
    dateMoment = timeNow;
  }

  // i18n: Making dates, including month names, translatable to any language.
  // Documentation: http://momentjs.com/docs/#/i18n/
  // Locales: https://github.com/moment/moment/tree/develop/locale
  if (locale && locale.match("^[^/\\\\]*$") !== null) {
    dateMoment.setLocale(locale);
    //    dateMoment.locale(locale);
  }

  if (timeago) {
    //    date = dateMoment.tz(timezone).from(timeNow);
    date = timeAgo(dateMoment);
  } else {
    //    date = dateMoment.tz(timezone).format(format);
    date = dateMoment.setZone(timezone).toFormat(format);
  }

  return new SafeString(date);
}
