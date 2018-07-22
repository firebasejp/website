// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata'

const keyMetadataKey = Symbol('key')
export function key(target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
    Reflect.defineMetadata(keyMetadataKey, true, target, propertyKey)
}

interface Model {
    getRef(): string
    toDocument(): { ref: string, doc: object }
}

export function isModel(object: any): object is Model {
    return 'toDocument' in object
}

export function model(ref: string) {
    if (!ref) {
        throw new Error('model(ref) is empty')
    }
    const props: Set<string> = new Set()
    const delimiter = ['{', '}']
    let buf = ''
    let cap = false
    for (const c of ref) {
        switch (c) {
            case delimiter[0]:
                cap = true
                continue
            case delimiter[1]:
                props.add(buf)
                buf = ''
                cap = false
                continue
        }
        if (cap) {
            buf += c
        }
    }

    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor implements Model {
            getRef(): string {
                let res = ref
                for (const prop of props.keys()) {
                    const v = this[prop]
                    if (typeof v === 'undefined') {
                        throw new Error(`${prop} is undefined`)
                    }
                    res = res.replace(new RegExp(`{${prop}}`, 'g'), v)
                }
                return res
            }

            toDocument(): { ref: string, doc: object } {
                const doc: { [key: string]: any } = {}
                const self = this
                let ref = this.getRef()
                let hasKey = false
                for (const prop in self) {
                    const val = self[prop]
                    const isKey = Reflect.getMetadata(keyMetadataKey, this, prop) || false
                    if (isKey) {
                        if (hasKey) {
                            throw new Error('Multiple key error')
                        }
                        hasKey = true
                        if (typeof val !== 'string') {
                            throw new Error(`${prop} is not string`)
                        }
                        if (!val) {
                            throw new Error(`${prop} is empty`)
                        }
                        ref = `${ref}/${val}`
                        continue
                    }
                    if (typeof val === 'function') {
                        continue
                    }
                    if (typeof val === 'undefined') {
                        continue
                    }
                    doc[prop] = val
                }
                if (!hasKey) {
                    throw new Error('No key')
                }
                return { ref, doc }
            }
        }
    }
}

export function toDocumentFrom(data: any): { ref: string, doc: object } {
    if (!isModel(data)) {
        throw new Error('No document')
    }
    return data.toDocument()
}