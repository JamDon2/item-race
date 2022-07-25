import items, { Item } from "./data/items"

declare const global: { generated: Array<string> }

export function getRandomItem(): Item {
    if (settings.startup["ir:disable-duplicate-items"].value) {
        let uniqueItem
        while (!uniqueItem) {
            const item = items[Math.floor(Math.random() * items.length)]
            if (!global.generated.includes(item.name)) {
                uniqueItem = item
                global.generated.push(item.name)
            }
        }

        return uniqueItem
    } else {
        const item = items[Math.floor(Math.random() * items.length)]
        return item
    }
}
