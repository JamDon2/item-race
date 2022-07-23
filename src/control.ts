import { getRandomItem } from "./util"

declare const global: {
    active: Boolean
    objective?: string
    roundNumber: number
}

script.on_init(function () {
    // Initialize the round number
    global.roundNumber = 1
})

script.on_nth_tick(
    settings.startup["ir:check-timeout"].value as number,
    function () {
        if (!global.active || !global.objective) return

        for (const [_, player] of game.players) {
            if (player.get_item_count(global.objective) > 0) {
                game.print(
                    [
                        "ir:game-messages.player-won",
                        player.name,
                        global.roundNumber,
                    ],
                    {
                        r: 24,
                        g: 186,
                        b: 54,
                    }
                )

                global.roundNumber++

                startRound()
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
