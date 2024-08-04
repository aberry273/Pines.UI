# Slows.UI
A simple Alpine.JS x TailwindCSS framework. Inspired by the work by Devdojo at with Pines.UI (https://devdojo.com/pines/)

- No build tools required
- Componentised implementation of Alpine


- Core framework structure
-- Mixins
Shared JS library for components
-- Services
Implemented as a AlpineJS store
-- Components
Implemented as AlpineJS data components
Each component has a params objevt it receives as its defauult data
/components/example/aclExampleComponent.js

```
export default function (params) {
	return {
        // PROPERTIES
        open: false,
        // INIT
        init() {
            this.setValues(params || {});
            this.render();
        },
        // GETTERS
        // METHODS
        close() {
            this.open = false;
        },
        setValues(params) {
            this.open = params.open;
        },
        render() {
            const html = `
            <div class="dropdown" :open="open">
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

- AlpineJS structure
Alpine wiring installed above the core framework (magics can implement mixins)
-- Stores
-- Magics
-- Directives
-- Bindings


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