import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

import { faSolidDislike } from '@fortawesome/free-solid-svg-icons'
import { faSolidPoliceman } from '@fortawesome/free-solid-svg-icons'
import { faSolidProfil } from '@fortawesome/free-solid-svg-icons'
import { faSolidIn } from '@fortawesome/free-solid-svg-icons'
import { faSolidOut } from '@fortawesome/free-solid-svg-icons'
import { faSolidDeleteComment } from '@fortawesome/free-solid-svg-icons'
import { faSolidAddComment } from '@fortawesome/free-solid-svg-icons'
import { faSolidSeeAllComments } from '@fortawesome/free-solid-svg-icons'
import { faSolidSharePost } from '@fortawesome/free-solid-svg-icons'
import { faSolidEditPost } from '@fortawesome/free-solid-svg-icons'
import { faSolidDeletePost } from '@fortawesome/free-solid-svg-icons'

import { faRegLike } from '@fortawesome/free-regular-svg-icons'
import { faRegDislike } from '@fortawesome/free-regular-svg-icons'
import { faRegPoliceman } from '@fortawesome/free-regular-svg-icons'
import { faRegProfil } from '@fortawesome/free-regular-svg-icons'
import { faRegIn } from '@fortawesome/free-regular-svg-icons'
import { faRegOut } from '@fortawesome/free-regular-svg-icons'
import { faRegDeleteComment } from '@fortawesome/free-regular-svg-icons'
import { faRegAddComment } from '@fortawesome/free-regular-svg-icons'
import { faRegSeeAllComments } from '@fortawesome/free-regular-svg-icons'
import { faRegSharePost } from '@fortawesome/free-regular-svg-icons'
import { faRegEditPost } from '@fortawesome/free-regular-svg-icons'
import { faRegDeletePost } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faArrowRightToBracket, faDoorOpen, faRegLike, faSolidDislike, faRegDislike, faSolidPoliceman, faRegPoliceman,
    faSolidProfil, faRegProfil, faSolidIn, faRegIn, faSolidOut, faRegOut, faSolidDeleteComment, faRegDeleteComment,
    faSolidAddComment, faRegAddComment, faSolidSeeAllComments, faRegSeeAllComments, faSolidSharePost, faRegSharePost,
    faSolidEditPost, faRegEditPost, faSolidDeletePost, faRegDeletePost)

createApp(App)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
