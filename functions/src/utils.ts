
export function asyncHandler<Req, Res>(tag: string, handler: Function): Function {
    return function() {
        const p = handler.apply(null, arguments) as Promise<Res>
        return p.catch(err => {console.error(tag, err)})
    }
}