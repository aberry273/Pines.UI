import { mxContent } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxContent(params),
        // PROPERTIES 
        // INIT
        init() {
            this.mxContent_img = params.mxContent_img;
            this.render();
        },
        // GETTERS
        // METHODS
        close() {
            this.open = false;
        },
        render() {
            const html = ` 
            <figcaption class="flex items-top justify-center">
                <img class="rounded-md w-9 h-9" :src="mxContent_img" alt="profile picture">
            </figcaption>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}