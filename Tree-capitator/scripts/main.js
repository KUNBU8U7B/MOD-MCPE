import { worlds , system } from "@minecraft/server" ;

const kapak = [
    "minecraft:wooden_axe",
    "minecraft:stone_axe",
    "minecraft:iron_axe",
    "minecraft:golden_axe",
    "minecraft:diamond_axe",
    "minecraft:netherite_axe"
];

world.afterEvents.playerBreakBlock.subscribe((event) => {
    const { brokenBlockPermutation , block , player } = event ;
    const blockTypeId = brokenBlockPermutation.type.id;

    if (!blockTypeId.endsWith("_log")) return;

    const equippedItem = player.getComponent("minecraft:eqippable")?.getEquipment("Mainhand");
    const isUsingAxe = equippedItem && kapak.includes(equippedItem.typeId);

    if (isUsingAxe) {
        destroyTreeAndLeaves(block.location , block.dimension , equippedItem);
    }
});

function destroyTreeAndLeaves(startLocation , dimension , toolItem) {
    const queue = [startLocation];
    const visited = new Set();
    const MAX_BLOCKS = 300;
    let count = 0 ;

    while (queue.length > 0  && count < MAX_BLOCKS) {
        const currentLoc = queue.shift();
        const key = '${currentLoc.x},${currentLoc.y},${currentLoc.z}';

        if (visited.has(key)) continue;
        visited.add(key);

        const block = dimension.getBlock(currentLoc);
        if (!block) continue;

        const typeId = block.typeId;
        const isLog = typeId.endsWith("_log");
        const isLeaves = typeId.endsWith("_leaves");

        if (isLog || isLeaves) {
            count++;
            dimension.destroyBlock(currentLoc , true , toolItem);

            for (let x = -1 ; x <= 1 ; x++) {
                for (let y = -1 ; y <= 1 ; y++) {
                    for (let z = -1 ; z <= 1 ; z++) {
                        if (x === 0 && y === 0 && z === 0) continue;

                        queue.push({
                            x: currentLoc.x + x,
                            y: currentLoc.y + y,
                            z: currentLoc.z + z
                        });
                    }
                }
            }
        }
    }
}