import { getRandomItem } from "./util"

declare const global: {
    active: boolean
    objective?: string
    roundNumber: number
    clearMap: boolean
    clearItems: boolean
}

commands.add_command(
    "ir:start",
    ["ir:game-control.start-help"],
    function (args) {
        if (!global.active) {
            global.active = true
            game.print(["ir:game-control.start"], { r: 232, g: 208, b: 51 })
            startRound()
        } else {
            game.players[args.player_index || 0].print(
                ["ir:game-control.start-error"],
                {
                    r: 219,
                    g: 50,
                    b: 50,
                }
            )
        }
    }
)

commands.add_command("ir:stop", ["ir:game-control.stop-help"], function (args) {
    if (global.active) {
        global.active = false
        global.objective = undefined
        global.roundNumber = 1

        for (const [_, player] of game.players) {
            player.set_goal_description("")
        }

        game.print(["ir:game-control.stop"], { r: 232, g: 208, b: 51 })
    } else {
        game.players[args.player_index || 0].print(
            ["ir:game-control.stop-error"],
            {
                r: 219,
                g: 50,
                b: 50,
            }
        )
    }
})

script.on_init(function () {
    // Initialize the round number
    global.roundNumber = 1
    global.clearMap = settings.startup["ir:clear-map-on-win"].value as boolean
    global.clearItems = settings.startup["ir:clear-items-on-win"]
        .value as boolean
})

script.on_nth_tick(
    settings.startup["ir:check-timeout"].value as number,
    function () {
        if (!global.active || !global.objective) return

        for (const [_, player] of game.players) {
            if (player.get_item_count(global.objective) > 0) {
                gameWon(player)
            }
        }
    }
)

function startRound() {
    const item = getRandomItem()

    global.objective = item.name

    game.print(["ir:game-messages.item", global.roundNumber, item.name], {
        r: 232,
        g: 208,
        b: 51,
    })

    for (const [_, player] of game.players) {
        player.set_goal_description([
            "ir:game-messages.player-goal",
            item.name,
            item.locale,
        ])
    }
}

function gameWon(winner: LuaPlayer) {
    game.print(
        ["ir:game-messages.player-won", winner.name, global.roundNumber],
        {
            r: 24,
            g: 186,
            b: 54,
        }
    )

    if (global.clearMap) {
        winner.surface.clear(true)
    }

    if (global.clearItems) {
        const players = game.players

        const playersOnSurface = []

        for (const [_, player] of players) {
            if (player.surface.name === winner.surface.name) {
                playersOnSurface.push(player)
            }
        }

        for (const player of playersOnSurface) {
            player.clear_items_inside()
        }
    }

    global.roundNumber++

    startRound()
}
