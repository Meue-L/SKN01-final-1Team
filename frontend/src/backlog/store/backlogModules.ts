import actions, { BacklogActions } from "./actions"
import state, { BacklogState } from "./states"

export interface BacklogModule {
    namespaced: true
    state: BacklogState
    actions: BacklogActions
}

const backlogModule: BacklogModule = {
    namespaced: true,
    state,
    actions
}

export default backlogModule