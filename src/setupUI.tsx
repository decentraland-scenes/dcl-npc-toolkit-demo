import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { NpcUtilsUi } from 'dcl-npc-toolkit'
import { exampleUI1 } from './ExampleUI'

const SceneOwnedUi = () => [NpcUtilsUi(), exampleUI1()]

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(SceneOwnedUi)
}
