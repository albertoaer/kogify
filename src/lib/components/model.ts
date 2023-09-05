export type Justify = 'start' | 'center' | 'end' | 'stretch' | 'space-around' | 'space-evenly' | 'space-between';
export type Align = 'start' | 'center' | 'end' | 'stretch';
export type Unit = 'em' | 'px' | 'rem' | '%';
export type UnitValue = `${number}${Unit}` | `0`;
export type Flex = `${number} ${number} ${UnitValue}` | `${number} ${number} auto`;
export type Shadow = `${UnitValue} ${UnitValue} ${UnitValue} ${UnitValue} ${string}`;
export type Padding = `${UnitValue} ${UnitValue} ${UnitValue} ${UnitValue}` | `${UnitValue} ${UnitValue}` | UnitValue;
export type Margin = Padding;