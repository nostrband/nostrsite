
function getPwaCode(url: string) {
  const scriptUrl = new URL(url);
  scriptUrl!.searchParams.set('pwa', 'true');
//   `
//   <div
//   id="pwa-toast"
//   role="alert"
//   aria-labelledby="toast-message"
// >
//   <div class="message">
//     <span id="toast-message"></span>
//   </div>
//   <div class="buttons">
//       <button id="pwa-refresh" type="button">
//         Reload
//       </button>
//       <button id="pwa-close" type="button">
//         Close
//       </button>
//   </div>
// </div>
// `
  return `
<script type="module" src="${scriptUrl!.href}"></script>
<style>
  #pwa-toast {
    visibility: hidden;
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 16px;
    padding: 12px;
    border: 1px solid #8885;
    border-radius: 4px;
    z-index: 1;
    text-align: left;
    box-shadow: 3px 4px 5px 0 #8885;
    display: grid;
    background-color: #fff;
  }
  #pwa-toast .message {
    margin-bottom: 8px;
  }
  #pwa-toast .buttons {
    display: flex;
  }
  #pwa-toast button {
    border: 1px solid #8885;
    outline: none;
    margin-right: 5px;
    border-radius: 2px;
    padding: 3px 10px;
  }
  #pwa-toast.show {
    visibility: visible;
  }
  button#pwa-refresh {
    display: none;
  }
  #pwa-toast.show.refresh button#pwa-refresh {
    display: block;
  }  
</style>
`;
}

export function setScriptUrl(url: string) {
  PWA_CODE = getPwaCode(url);
}

export let PWA_CODE = "";
