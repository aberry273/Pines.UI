# Slopes.UI
A simple Alpine.JS & TailwindCSS framework. Inspired by the work by Devdojo at with Pines.UI (https://devdojo.com/pines/)

- No build tools required
- Componentised implementation of AlpineJS

*Core framework structure*
- Mixins
Shared JS library for components
/mixins/components/mxExample.js
```
export default function (params) {
    return {
        // PROPERTIES
        mxExample_open: false,
        init() {

        },
        // GETTERS  
        get mxModal_getOpenClass() { return 'absolute right-0 w-5 h-5 mr-3' },
        // METHODS
        _mxExample_setValues(params) {
            this.mxExample_open = params.open;
        },
        _mxExample_toggle() {
            this.mxExample_open = !this.mxExample_open;
        },
    }
}
```

- Services
Implemented as a AlpineJS store, used to encapsulte multiple mixin logic and business logic of a domain
If you are creating a chat service, you would create a service that uses the mxFetch mixin and includes
additional logic to manage the CRUD operations of the chat component

$store.svcComments.createChat()

- Components
Implemented as AlpineJS data components
Each component has a params objevt it receives as its defauult data
/components/example/aclExampleComponent.js
```
import { mxExample } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxExample(params),
        // PROPERTIES
        customProperty: false,
        // INIT
        init() {
            this.setValues(params || {});
            this.render();
        },
        // GETTERS
        // METHODS
        close() {
            this.mxExample_open = false;
        },
        setValues(params) {
            this._mxExample_setValues(params || {});
        },
        render() {
            const html = `
            <div class="dropdown" :open="mxExample_open">
                aclExampleComponent
            </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}
```

index.html
```
<div x-data="aclDataComponent({open: true})>"></div>
```

*AlpineJS structure*
Alpine wiring installed above the core framework (can utilise mixins for logic)
- Magics
Standard alpine magics objects

/magics/fetch.js
```
import { mxFetch } from '/src/js/mixins/index.js';

export default () => {
    return {
        ...mxFetch(),
        async GET(url, data) { 
            return await this._mxFetch_Get(url, data);
        },
        async POST(url, data, headers, isJson = true) {
            return await this._mxFetch_Post(url, data, headers, isJson);
        },
        async PUT(url, data, headers, isJson = true) {
            return await this._mxFetch_Put(url, data, headers, isJson);
        },
        async DELETE(url, data, headers) {
            return await this._mxFetch_Delete(url, data, headers);
        }
    }
}
```
- Stores
Standard alpine store objects
 
-- Directives
Standard alpine store objects

-- Bindings
Standard alpine store objects

# setup instructions
1. Download VSCode extension LiveServer https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
2. Right click on index.html and 'open with live server'
3. Enjoy the site running locally


# CSS - Tailwing
1. download the tailwind-cli: https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.6
2. install it into the root folder
3. from terminal erun
```npx tailwindcss -i ./src/css/input.css -o ./src/css/main.css --watch```

 
# Self-signed cert for liveserver
## Windows
1. Download OpenSSL
2. Open Windows File Explorer.
3. Navigate to the OpenSSL bin directory.
> c:\OpenSSL\bin\ in our example.
4. Right-click the openssl.exe file and select Run as administrator.
5. Enter the following command to begin generating a certificate and private key:
> req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt
6. You will then be prompted to enter applicable Distinguished Name (DN) information, totaling seven fields:
7. Once completed, you will find the certificate.crt and privateKey.key files created under the \OpenSSL\bin\ directory
8. Enter the paths to .vscode/settings.json
{
  "liveServer.settings.https": {
  "enable": true, //set it true to enable the feature.
  "cert": "c:\\OpenSSL\\bin\\liveserver.crt", //full path of the certificate
  "key": "c:\\OpenSSL\\bin\\liveserver.key", //full path of the private key
  "passphrase": ""
  }
}