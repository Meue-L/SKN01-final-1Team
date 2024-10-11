export interface ProductManageState {
    repos: string[] | null
    branches: string[] | null
    commits: string[] | null
}

const state: ProductManageState = {
    repos: null,
    branches: null,
    commits: null
}

export default state