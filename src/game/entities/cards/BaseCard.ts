export abstract class BaseCard {
    // -1: Card does not expire (ex.: Weapon)
    usesLeft: number

    constructor(usesLeft: number) {
        this.usesLeft = usesLeft
    }

    use(): void {
        if (this.usesLeft <= 0) return
        this.usesLeft--
    }

    // Is executed when the player selects this card
    // Ex.: Adds the weapon to the inventory
    abstract onAcquire(): void

    // The opposite of onAcquire()
    // Is executed when the card expires or is replaced by another one
    abstract onExpire(): void
}
    