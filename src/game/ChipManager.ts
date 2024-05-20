import {BaseChip} from "@/game/items/chips/BaseChip"
import {RocketLauncherChip} from "@/game/items/chips/RocketLauncherChip"
import {ExampleItemChip} from "@/game/items/chips/ExampleItemChip"
import {ExampleEffectChip} from "@/game/items/chips/ExampleEffectChip"
import {PistolChip} from "@/game/items/chips/PistolChip"
import {ExampleItemChip2} from "@/game/items/chips/ExampleItemChip2"

export class ChipManager {
    existing_chips: BaseChip[] = [
        new RocketLauncherChip(),
        new PistolChip(),
        new ExampleItemChip(),
        new ExampleItemChip2(),
        new ExampleEffectChip()
    ]
    
    active_chips: BaseChip[]
    
    getRandomChips() {
        
    }
}