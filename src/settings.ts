import { Data } from "typed-factorio/data/types"

declare const data: Data

data.extend([
    {
        name: "ir:check-timeout",
        type: "int-setting",
        default_value: 30,
        minimum_value: 1,
        maximum_value: 3600,
        setting_type: "startup",
    },
    {
        name: "ir:clear-map-on-win",
        type: "bool-setting",
        default_value: false,
        setting_type: "startup",
    },
    {
        name: "ir:clear-items-on-win",
        type: "bool-setting",
        default_value: false,
        setting_type: "startup",
    },
])
