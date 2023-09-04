export type Justify = 'start' | 'center' | 'end' | 'stretch' | 'space-around' | 'space-evenly' | 'space-between';
export type Align = 'start' | 'center' | 'end' | 'stretch';
export type Unit = 'em' | 'px' | 'rem' | '%';
export type Flex = `${number} ${number} ${number}${Unit}` | `${number} ${number} auto`;
export type Shadow = `${number}${Unit} ${number}${Unit} ${number}${Unit} ${number}${Unit} ${string}`;