export default function (params) {
    return {
        // PROPERTIES
        mxToast_event: 'on:toast',
        mxToast_type: 'default',
        mxToast_title: '',
        mxToast_description: '',
        mxToast_position: 'top-center',
        mxToast_items: [],
        init() {
            this._mxToast_setValues(params);
        },
        // GETTERS  
        get mxToast_itemClass() { return '' },
        // METHODS
        _mxToast_setValues(params) {
            if (!params) return;
            this.mxToast_event = params.event || this.mxToast_event;
            this.mxToast_type = params.type
            this.mxToast_title = params.title;
            this.mxToast_description = params.description;
            this.mxToast_position = params.position;
            this.mxToast_items = params.items;
        }
    }
}