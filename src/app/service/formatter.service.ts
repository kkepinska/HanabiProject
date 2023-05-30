import { Injectable } from '@angular/core';
import { action, playStructure, discardStructure, hintStructure } from '../model/action';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {
  private static readonly COLORS =  ['red', 'green', 'white', 'blue', 'yellow']

  constructor() { }

  public getActionMessage(arg: action): string {
    console.log('Get action message')
    if (arg.actionType === 'play') {
      return this.getPlayActionMessage(<playStructure> arg)
    } else if (arg.actionType === 'discard') {
      return this.getDiscardActionMessage(<discardStructure> arg)
    } else if (arg.actionType === 'hint') {
      return this.getHintActionMessage(<hintStructure> arg)
    }
    console.log('no matching class of action')
    return ''
  }

  private getPlayActionMessage(playAction: playStructure): string {
    let colorName = this.getColorName(<number>playAction.card?.color)
    return playAction.player + ' played card ' + colorName + ' ' + playAction.card?.rank;
  }

  private getDiscardActionMessage(discardAction: discardStructure): string {
    let colorName = this.getColorName(<number>discardAction.card?.color)
    return discardAction.player + ' discarded card ' + colorName + ' ' + discardAction.card?.rank
  }

  private getHintActionMessage(hintAction: hintStructure): string {
    let hintValue = (hintAction.type === 'rank')? hintAction.value : this.getColorName(<number>hintAction.value)
    return hintAction.player + ' gave ' + hintAction.receiver + ' a hint about ' + hintAction.type + ' ' + hintValue
  }

  public getColorNames(): Array<string> {
    return [...FormatterService.COLORS]
  }
  
  public getColorName(colorNumber: number): string {
    return FormatterService.COLORS[colorNumber - 1]
  }

  public getClassName(colorName: string): string {
    return 'card-' + colorName
  }

  public getLgClassName(colorName: string): string {
    return 'card-' + colorName + '-lg'
  }
}
