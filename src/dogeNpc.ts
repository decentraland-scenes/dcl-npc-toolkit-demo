import { Entity, TextShape, Transform, engine } from "@dcl/sdk/ecs";
import { Color4, Vector3 } from "@dcl/sdk/math";
import { create, followPath, talk } from "dcl-npc-toolkit";
import { FollowPathData, NPCType } from "dcl-npc-toolkit/dist/types";

let doge: Entity

export function createDogeNpc() {
  const offsetpath = 5
  let dogePathPoints = [
    Vector3.create(offsetpath, .24, offsetpath),
    Vector3.create(offsetpath, .24, 16 - offsetpath),
    Vector3.create(16 - offsetpath, .24, 16 - offsetpath),
    Vector3.create(16 - offsetpath, .24, offsetpath)
  ]
  let dogePath: FollowPathData = {
    path: dogePathPoints,
    totalDuration: dogePathPoints.length * 6,
    loop: true,
    // curve: true,
  }

  for (let index = 0; index < dogePathPoints.length; index++) {
    const element = dogePathPoints[index];
    createDebugEntity("Position: " + index.toString(), Vector3.add(element, Vector3.create(0, 0.5, 0)))
  }

  doge = create(
    {
      position: Vector3.clone(dogePathPoints[0]),
      scale: Vector3.create(2, 2, 2)
    },
    {
      type: NPCType.CUSTOM,
      model: 'models/dogeNPC_anim4.glb',//'models/robots/marsha.glb',//'models/Placeholder_NPC_02.glb',
      onActivate: () => {
        console.log('doge.NPC activated!')
        talk(doge,
          [
            {
              text: "Show doge",
            },
            {
              text: "Happy Robot",
              portrait: {
                path: 'images/simone/happy1.png'
              }
            },
            {
              text: "go back to doge",
            },
            {
              text: "Surprised Robot",
              portrait: {
                path: 'images/simone/surprise1.png'
              }
            },
            {
              text: "go back to doge",
            },
            {
              text: "Sad Robot",
              portrait: {
                path: 'images/simone/sad1.png'
              }
            },
            {
              text: "Debug TextF",
              isEndOfDialog: true
            },
          ])
        //connectNpcToLobby(REGISTRY.lobbyScene, doge)
      },
      onWalkAway: () => {
        console.log("NPC", "Doge", 'on walked away')
        followPath(doge, dogePath)
      },
      idleAnim: 'Idle',
      walkingAnim: 'Walk',
      faceUser: true,//continue to face user???
      portrait:
      {
        path: 'images/doge.png', height: 300, width: 300
        , offsetX: -10, offsetY: 0
        , section: { sourceHeight: 256, sourceWidth: 256 }
      },
      darkUI: true,
      coolDownDuration: 3,
      hoverText: 'WOW',
      onlyETrigger: true,
      onlyClickTrigger: false,
      onlyExternalTrigger: false,
      reactDistance: 5,
      continueOnWalkAway: false,
      //dialogCustomTheme: RESOURCES.textures.dialogAtlas,
    }
  )
  followPath(doge, dogePath)
}

function createDebugEntity(text: string, position: Vector3) {
  let test = engine.addEntity()
  Transform.create(test, {
    position: position,
    scale: Vector3.create(.25, .25, .25)
  })
  TextShape.create(test, {
    text: text,
    textColor: Color4.Black()
  })
}