import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile as fasFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile as farFaceSmile } from '@fortawesome/free-regular-svg-icons'
import { faFaceFrown as fasFaceFrown } from '@fortawesome/free-solid-svg-icons'
import { faFaceFrown as farFaceFrown } from '@fortawesome/free-regular-svg-icons'
import { faCircleMinus} from '@fortawesome/free-solid-svg-icons'
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { faComments} from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'



/* add icons to the library */
library.add(faArrowRightToBracket, faDoorOpen, faAddressCard,
    faRightFromBracket, faUserSecret, faMessage, faPaperPlane,
    faAt, faKey, faPencil, faTrashCan, fasFaceSmile, farFaceSmile,
    fasFaceFrown, farFaceFrown, faCircleMinus, faCirclePlus, faComments,
    faCheckCircle)

createApp(App)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
