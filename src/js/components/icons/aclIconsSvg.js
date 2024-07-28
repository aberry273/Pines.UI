import { mxIcon } from '/src/js/mixins/index.js';
import { userCircle, user, userGroup, tag, cog, dots, adjustmentsHorizontal, adjustmentsVertical, creditCard, expand, keyboard,
    chevronUp,
    chevronDown,
    chevronLeft,
    chevronRight,
    chatBubble,
    chatBubbles,
    calendar,
    link,
    trash,
    edit,
} from './heroIconsLibrary.js';


export default function (params) {
	return {
        ...mxIcon(params),
        // PROPERTIES
        open: false,
        // INIT
        init() {
            this.mxIcon_class = params.mxIcon_class;
            this.mxIcon_name = params.mxIcon_name;
            this.render();
        },
        // GETTERS
        // METHODS
        getSvg(icon, mxIcon_class) {
            if(icon == 'userCircle') return userCircle(mxIcon_class)
            if(icon == 'user') return user(mxIcon_class)
            if(icon == 'userGroup') return userGroup(mxIcon_class)
            if(icon == 'tag') return tag(mxIcon_class)
            if(icon == 'adjustmentsHorizontal') return adjustmentsHorizontal(mxIcon_class)
            if(icon == 'adjustmentsVertical') return adjustmentsVertical(mxIcon_class)
            if(icon == 'creditCard') return creditCard(mxIcon_class)
            if(icon == 'expand') return expand(mxIcon_class)
            if(icon == 'keyboard') return keyboard(mxIcon_class)
            if(icon == 'cog') return cog(mxIcon_class)
            if(icon == 'dots') return dots(mxIcon_class)
            if(icon == 'chevronUp') return chevronUp(mxIcon_class)
            if(icon == 'chevronDown') return chevronDown(mxIcon_class)
            if(icon == 'chevronLeft') return chevronLeft(mxIcon_class)
            if(icon == 'chevronRight') return chevronRight(mxIcon_class)
            if(icon == 'chatBubble') return chatBubble(mxIcon_class)
            if(icon == 'chatBubbles') return chatBubbles(mxIcon_class)
            if(icon == 'calendar') return calendar(mxIcon_class)
            if(icon == 'trash') return trash(mxIcon_class)
            if(icon == 'link') return link(mxIcon_class)
            if(icon == 'edit') return edit(mxIcon_class)
            return''
          },
        render() {
            let html = this.getSvg(this.mxIcon_name, this.mxIcon_class);
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}