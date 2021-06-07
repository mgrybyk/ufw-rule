// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pick = (object: any, keys: Array<string>) => {
    if (typeof object !== 'object' || object === null) {
        return {}
    }

    const result: { [key: string]: string } = {}
    keys.forEach((key: string) => {
        if (object[key] !== undefined) {
            result[key] = object[key]
        }
    })
    return result
}
