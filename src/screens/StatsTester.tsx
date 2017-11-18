import * as React from "react";
import {observer} from "mobx-react";
import {AppStateComponent} from "../AppStateComponent";
import {HeroOverview} from "../ui/HeroOverview";
import {Row} from "../config/styles";
import {Stats} from "../state/types/Stats";
import {computed, observable} from "mobx";
import {CommonHeader} from "../ui/CommonHeader";
import {StatsTextList} from "../ui/StatsText";
import {SkillInfo} from "../state/types/SkillInfo";
import {Character} from "../state/types/Character";
import {Battle} from "../state/types/Battle";
import {Hero} from "../state/types/Hero";
import {randomizeItems} from "../state/Generators";

@observer
export class StatsTester extends AppStateComponent {
  @observable private skillResults: Stats[] = [];
  @observable private turnResults: Stats[] = [];

  @computed get quest () {
    return this.appState.profiles.activeProfile.selectedQuest;
  }

  @computed get battleMembers () {
    return this.appState.profiles.activeProfile.heroes;
  }

  componentWillMount () {
    this.newBattle();
    //this.resetStats();
  }

  render () {
    return (
      <div>
        <Row>
          {this.battleMembers.map((hero) => (
            <HeroOverview
              key={hero.id}
              hero={hero}
              onSkillSelected={(skill) => {
                const targetPool = this.battleMembers.slice();
                const myselfIndex = targetPool.indexOf(hero);
                targetPool.splice(myselfIndex, 1);
                this.useSkill(skill, hero, randomizeItems(targetPool));
              }}
            />
          ))}
        </Row>

        <Row>
          <button onClick={() => this.nextTurn()}>Next turn</button>
          <button onClick={() => this.resetStats()}>Reset stats</button>
          <button onClick={() => this.newBattle()}>New battle</button>
          <button onClick={() => this.endBattle()}>End battle</button>
        </Row>

        <div>
          <CommonHeader label="Skill Result"/>
          <Row style={{width: 200}}>
            {this.skillResults.map((res, index) => (
              <StatsTextList key={index} stats={res.nonNeutral}/>
            ))}
          </Row>
          <CommonHeader label="Turn Result"/>
          <Row style={{width: 200}}>
            {this.turnResults.map((res, index) => (
              <StatsTextList key={index} stats={res.nonNeutral}/>
            ))}
          </Row>

          <CommonHeader label="Battle Info"/>
          <pre style={{width: 200}}>
            {JSON.stringify(this.quest.battle)}
          </pre>
        </div>
      </div>
    );
  }

  newBattle () {
    this.quest.battle = new Battle();
  }

  endBattle () {
    this.quest.battle = undefined;
    // prompt with items stored in battle
  }

  useSkill (skill: SkillInfo, actor: Character, targets: Character[]) {
    this.skillResults = targets.map((target) => {
      const memento = actor.useSkill(skill, target);
      this.reactToStatsMemento(target, memento);
      return memento;
    });
  }

  nextTurn () {
    if (!this.quest.battle) {
      this.newBattle();
    }

    this.quest.battle.round++;
    this.turnResults = this.battleMembers.map((target) => {
      const memento = target.processTurn();
      this.reactToStatsMemento(target, memento);
      return memento;
    });
  }

  reactToStatsMemento (target: Character, memento: Stats) {
    if (target.stats.health.value <= 0) {
      if (target instanceof Hero) {
        this.appState.profiles.activeProfile.killHero(target);
      }
    }
  }

  resetStats () {
    this.battleMembers.forEach((hero) => hero.resetMutableStats());
    this.skillResults = [];
    this.turnResults = [];
  }
}