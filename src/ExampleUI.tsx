import ReactEcs, { UiEntity, Label, Button, Input } from '@dcl/sdk/react-ecs'

export const exampleUI1 = () => {
  return (
    <Label //Invisible Parent
      value="UI 1"
      fontSize={60}
      uiTransform={{
        positionType: 'absolute',
        width: 926,
        height: 300,
        position: { left: '10%', top: '50%' }
      }}
    ></Label>
  )
}

export const exampleUI2 = () => {
  return (
    <Label //Invisible Parent
      value="UI 2"
      fontSize={60}
      uiTransform={{
        positionType: 'absolute',
        width: 926,
        height: 300,
        position: { right: '10%', top: '50%' }
      }}
    ></Label>
  )
}
