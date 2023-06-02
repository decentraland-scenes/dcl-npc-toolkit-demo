import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { NpcUtilsUi } from 'dcl-npc-toolkit'
import { exampleUI1, exampleUI2 } from './ExampleUI'

const SceneOwnedUi = () => [
  // exampleUI1(),
  NpcUtilsUi(),
  // exampleUI2()
]

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(SceneOwnedUi)
}
