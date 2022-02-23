type SidebarItem = {
    id: number,
    name: string
}

type InitialStateType = {
    sidebar: Array<SidebarItem>
}

let initialState: InitialStateType = {
    sidebar: [
        {id: 1, name: 'Name 1'},
        {id: 2, name: 'Name 2'},
        {id: 3, name: 'Name 3'}
    ]
};

const sidebarReducer = (state = initialState, action: any) => {
    return state;
};

export default sidebarReducer;
