import items from "./data/items"

export function getRandomItem() {
    const item = items[Math.floor(Math.random() * items.length)]
    return item
}
