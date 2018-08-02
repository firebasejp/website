import { model, key, isModel } from '../src/modelutil'

@model('foo/{bar}')
class Foo {
    @key public id: string
    public bar: string

    constructor(public b?: number) {

    }
}

function main() {
    const foo = new Foo()
    foo.id = '1'
    foo.bar = 'baraaaa'
    if (!isModel(foo)) {
        return
    }
    console.log(foo, foo.toDocument())
}

main()