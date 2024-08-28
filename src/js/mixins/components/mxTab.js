export default function (params) {
    return {
        // PROPERTIES  
        mxTab_items: [], 
        mxTab_tabButtons: null,
        mxTab_active: null,
        _mxTab_init() {
            this._mxTab_setValues(params);
        },
        // GETTERS  
        get mxTab_itemClass() { return '' },
        // METHODS
        _mxTab_setValues(params) {
            if (!params) return;
            this.mxTab_type = params.type
            this.mxTab_items = params.items;
            this.mxTab_active = params.active;
        },
        _mxTab_setMarkerStyle(tab){
            this.$refs.tabMarker.style.width=tab.offsetWidth + 'px';
            this.$refs.tabMarker.style.height=tab.offsetHeight + 'px';
            this.$refs.tabMarker.style.left=tab.offsetLeft + 'px';
        },
        _mxTab_isActive(tab) {
            const tabName = tab.text || tab;
            return this.mxTab_active == tabName;
        },
        _mxTab_select(tab) {
            const tabName = tab.text || tab;
            this.mxTab_active = tabName;
 //           const id = this.$id(tabName);
            const id = `${tabName}-1`;
            for(var i = 0; i < this.mxTab_tabButtons.children.length; i++) {
                const el = this.mxTab_tabButtons.children[i];
                if(el.id == id) {
                    this._mxTab_setMarkerStyle(el)
                }
            }
        },
    }
}