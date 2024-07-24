
export default function (params) {
	return {
        // PROPERTIES
        open: false,
        // INIT
        init() {
            this.open = params.open;
            this.render();
        },
        // GETTERS
        // METHODS
        close() {
            this.open = false;
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