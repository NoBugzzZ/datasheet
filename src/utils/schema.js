import jsf from 'json-schema-faker'
import { API_URL } from '../config'
const delimiter = '#'

const obj2keys = (source) => {
    let res = []
    const flat = (obj, stack) => {
        Object.keys(obj).forEach(k => {
            let s = stack.concat([k])
            let v = obj[k]
            if (typeof v === 'object') flat(v, s)
            else res.push(s.join(delimiter))
        })
    }
    flat(source, [])
    return res
}

const schema2entry = (schema) => obj2keys(jsf.generate(schema))

const keys2disabled = (keys) => {
    let res = {}
    keys.forEach(k => {
        if (k.split('#').length === 1) res[k] = { "ui:disabled": true }
        else {
            let karr = k.split('#')
            let v = { "ui:disabled": true }
            while (karr.length !== 1) {
                let tmpk = karr.pop()
                let nv = {}
                nv[tmpk] = v
                v = nv
            }
            let rtk = karr.pop()
            res[rtk] = res[rtk] ? { ...res[rtk], ...v } : v
        }
    })
    return res
}

const resolveRef = (schema) => {
    // return jref.resolve(schema)
    if (schema.hasOwnProperty('$ref')) {
        delete schema['$ref']
        schema['type'] = 'link'
        schema['url'] = API_URL.GRAPHQL
    } else {
        const { type } = schema
        if (type === 'object') {
            for (var key in schema.properties) {
                schema.properties[key] = resolveRef(schema.properties[key])
            }
        } else if (type === 'array') {
            schema.items = resolveRef(schema.items)
        } else {

        }
    }
    return schema
}


export { obj2keys, schema2entry, keys2disabled, resolveRef }