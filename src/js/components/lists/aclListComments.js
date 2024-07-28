import { mxContent, mxIcon, mxButton, mxList } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxContent(params),
        ...mxIcon(params),
        ...mxButton(params),
        ...mxList(params),
        // PROPERTIES
        open: false,
        tooltipArrow: true,
        tooltipPosition: '',
        commentItems: [],
        actionItems: [],
        menuItems: [],
        // INIT
        init() {
            this.commentItems = params.commentItems;
            this.actionItems = params.actionItems;
            this.menuItems = params.menuItems;

            this.mxIcon_name = params.icon;
            this.mxButton_name = params.name;
            this.mxButton_label = params.label;
            this.mxButton_tooltip = params.tooltip; 
            this.mxButton_iconClass = params.class || this.mxButton_iconClass;
            this.open = params.open;
            this.render();
        },
        // GETTERS 
        // METHODS
        getCommentWithMenuActions(item) {
            // assign the menu actions to only what is available in the items menu array
            const menu = this.filterAvailableActions(this.menuItems, item.menu);
            item.menu = this.assignActionsItemAsValue(menu, item);

            const actions = this.filterAvailableActions(this.actionItems, item.actions);
            item.actions = this.assignActionsItemAsValue(actions, item);
            
            return item;
        },
        filterAvailableActions(actions, available) {
            return actions.filter(x => available.indexOf(x.name) > -1); 
        },
        assignActionsItemAsValue(actions, item) {
            return actions.map(x => { x.value = item; return x; }); 
        },
        setHover() {
            if(!this.mxButton_tooltip) return;
            this.mxButton_showTooltip = true
        },
        setLeave() {
            this.mxButton_showTooltip = false;
        },
        onClick() {
            this.$dispatch('onclick', this.mxButton_name);
        },
        render() {
            const html = `
            <div>
                <template x-for="(item, i) in commentItems" :key="(item.id || item.name || i)">
                    <div x-data="aclCardComment(getCommentWithMenuActions(item))"></div>
                </template>
            </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}