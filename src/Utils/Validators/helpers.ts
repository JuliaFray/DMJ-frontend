export const updateObjectInArray = (items: Array<any>, itemId: number,
    objPropName: string, newObjProp: any
) => {
    return items.map(u => {
        if(u[objPropName] === itemId) {
            return {...u, ...newObjProp}
        }

        return u
    })
};
