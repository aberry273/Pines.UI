
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