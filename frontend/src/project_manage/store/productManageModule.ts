import actions, { ProductManageActions } from "./actions"
import mutations, { ProductManageMutations } from './mutations'
import state, { ProductManageState } from './states'

export interface ProductManageModule {
    namespaced: true
    state: ProductManageState,
    actions: ProductManageActions
    mutations: ProductManageMutations
}

const productManageModule: ProductManageModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default productManageModule