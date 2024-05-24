export function createTasksMock (count: number, active: boolean): Task[] {
    return new Array(count).fill({}).map((el, i) => {
        return {
            id: `${active ? 'active' : 'inactive'}-${i}`,
            done: !active,
            header: `${active ? 'Active' : 'Inactive'} Header - ${i}`,
        }
    })
}
