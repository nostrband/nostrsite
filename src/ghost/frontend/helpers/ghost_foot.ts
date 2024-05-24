// # Ghost Foot Helper
// Usage: `{{ghost_foot}}`
//
// Outputs scripts and other assets at the bottom of a Ghost theme
import { getRenderer } from "../services/renderer";
import { PWA_CODE } from "../../../pwa-code";

// We use the name ghost_foot to match the helper for consistency:
export default function ghost_foot(options: any) {
  const { SafeString } = getRenderer(options);

  // eslint-disable-line camelcase
  const foot: string[] = [];

  // const globalCodeinjection = settingsCache.get("codeinjection_foot");
  // const postCodeinjection =
  //   options.data.root && options.data.root.post
  //     ? options.data.root.post.codeinjection_foot
  //     : null;
  // const tagCodeinjection =
  //   options.data.root && options.data.root.tag
  //     ? options.data.root.tag.codeinjection_foot
  //     : null;

  // if (!_.isEmpty(globalCodeinjection)) {
  //   foot.push(globalCodeinjection);
  // }

  // if (!_.isEmpty(postCodeinjection)) {
  //   foot.push(postCodeinjection);
  // }

  // if (!_.isEmpty(tagCodeinjection)) {
  //   foot.push(tagCodeinjection);
  // }

  foot.push(PWA_CODE);

  foot.push(`
  <section id="__nostr_site_loading_modal">
    <div class="loader"></div>
  </section>
  <style>
    #__nostr_site_loading_modal {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: #fff;
      z-index: 1000000;
      display: block;
    }

    #__nostr_site_loading_modal .loader {
      width: 48px;
      height: 48px;
      border: 5px solid #bbb;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
      position: absolute;
      top: 50%;
      left: 50%;
    }

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

  </style>
  <script>
    const modal = document.getElementById("__nostr_site_loading_modal");
    setTimeout(() => modal.style.display = 'none', 200);
  </script>
`);

  return new SafeString(foot.join(" ").trim());
};
