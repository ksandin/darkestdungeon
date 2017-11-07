import {Start} from "./Start";
import {Loading} from "./Loading";
import {SoundTester} from "./SoundTester";
import {AmbienceDefinition} from "./AmbienceState";

// The map of all screens available in the game, mapped to their route name.
export const routes = {
  "start": Start,
  "loading": Loading,
  "soundTester": SoundTester
};

export const ambienceDefinitions = {
  "town": new AmbienceDefinition(
    {src: require("../assets/dd/audio/amb_town_gen_base.wav")},
    [
      {src: require("../assets/dd/audio/amb_town_gen_base_os_01.wav")},
      {src: require("../assets/dd/audio/amb_town_gen_base_os_02.wav")},
      {src: require("../assets/dd/audio/amb_town_gen_base_os_03.wav")}
    ]
  ),
  "coach": "town",
  "tavern": new AmbienceDefinition(
    {src: require("../assets/dd/audio/amb_town_tavern.wav")},
    [
      {src: require("../assets/dd/audio/amb_town_tavern_os_bar_01.wav")},
      {src: require("../assets/dd/audio/amb_town_tavern_os_bar_02.wav")},
      {src: require("../assets/dd/audio/amb_town_tavern_os_bar_03.wav")},
      {src: require("../assets/dd/audio/amb_town_tavern_os_chair_01.wav")},
      {src: require("../assets/dd/audio/amb_town_tavern_os_chair_02.wav")},
      {src: require("../assets/dd/audio/amb_town_tavern_os_chair_03.wav")}
    ]
  ),
};