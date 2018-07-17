// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata'

const keyMetadataKey = Symbol('key')
export function key(target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
    Reflect.defineMetadata(keyMetadataKey, true, target, propertyKey)
}

interface Model {
    toDocument(): { key: string, doc: object }
}

function isModel(object: any): object is Model {
    return 'toDocument' in object
}

export function model<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor implements Model {
        toDocument(): { key: string, doc: object } {
            const doc = {}
            const self = this
            let key = ''
            let hasKey = false
            for (const prop of Object.getOwnPropertyNames(self)) {
                const val = self[prop]
                if (typeof val === 'function') {
                    continue
                }
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
                    key = val
                    continue
                }
                doc[prop] = val
            }
            if (!hasKey) {
                throw new Error('No key')
            }
            return { key, doc }
        }
    }
}

export function toDocumentFrom(data: any): { key: string, doc: object } {
    if (!isModel(data)) {
        throw new Error('No document')
    }
    return data.toDocument()
}