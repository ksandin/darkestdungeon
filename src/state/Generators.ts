import {StaticState} from "./StaticState";
import {Hero} from "./types/Hero";
import {Item} from "./types/Item";
import {Dungeon} from "./types/Dungeon";
import {Quest} from "./types/Quest";
import {MapSize, QuestMap} from "./types/QuestMap";
import {QuestObjective} from "./types/QuestObjective";

export class HeroGenerator {
  next (): Hero {
    const c = new Hero();
    c.name = randomizeItem(StaticState.instance.heroNames);
    c.classInfo = randomizeItem(Array.from(StaticState.instance.heroClasses.values()));
    c.affliction = randomizeItem(Array.from(StaticState.instance.afflictions.values()));
    c.stress = Math.floor(Math.random() * c.stressMax);
    return c;
  }
}

export class ItemGenerator {
  next (): Item {
    const t = new Item();
    t.info = randomizeItem(Array.from(StaticState.instance.items.values()));
    return t;
  }
}

export class QuestGenerator {
  next (dungeons: Dungeon[]): Quest {
    const itemPool = Array.from(StaticState.instance.items.values());

    const q = new Quest();
    const dungeon = randomizeItem(dungeons);
    q.dungeonId = dungeon.id;
    q.level = dungeon.level.number;
    q.bonfires = Math.round(Math.random() * 2);
    q.map = QuestMap.generate(
      randomizeItem(Object.values(MapSize)) as MapSize
    );

    q.rewards = [
      Item.fromInfo(randomizeItem(itemPool)),
      Item.fromInfo(randomizeItem(itemPool)),
      Item.fromInfo(randomizeItem(itemPool))
    ];

    const o = new QuestObjective();
    if (Math.random() > 0.5) {
      o.monsterPercentage = 0.1 + Math.random() * 0.9;
      o.explorePercentage = 0.1 + Math.random() * 0.9;
    } else {
      o.monsterPercentage = 0.1 + Math.random() * 0.9;
    }
    q.objective = o;
    return q;
  }
}

export function randomizeItem<T> (items: T[]): T {
  const index = Math.floor(items.length * Math.random());
  return items[index];
}