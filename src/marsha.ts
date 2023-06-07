import { ColliderLayer, Entity, InputAction, MeshCollider, MeshRenderer, TextShape, Transform, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Color4, Vector3 } from "@dcl/sdk/math";
import { create, followPath, talk } from "dcl-npc-toolkit";
import { FollowPathData, NPCType } from "dcl-npc-toolkit/dist/types";


export function createMarshaNpc(){
  //const ent = engine.addEntity()


  const npc = create(  
    {
      position: Vector3.create(17,1,17)
    }, 
    {
      //transformData: { position: Vector3.create(6, 0, 6), scale: Vector3.create(1, 1, 1) },
      //npcData: {
        type: NPCType.CUSTOM, 
        model: {
          src:'models/robots/marsha.glb',
          visibleMeshesCollisionMask: ColliderLayer.CL_NONE,
          invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS
        },//'models/Simone_Anim.glb',
        onActivate: () => {
          console.log('simonas.NPC activated!')

          talk(npc,
            [
              {
                text:"text1"
              },
              {
                text:"text2",
                isEndOfDialog: true
              }
            ]) 
          // npcLib.talk(simonas.entity, 
          //   [
          //     {
          //       text: 'happy1',
          //       portrait: {
          //         path: 'images/portraits/simone/happy1.png'
          //       }
          //     },
          //     {
          //       text: 'idle1',
          //       portrait: {
          //         path: 'images/portraits/simone/idle1.png'
          //       }
          //     },
          //     {
          //       text: 'sad1',
          //       portrait: {
          //         path: 'images/portraits/simone/sad1.png'
          //       } 
          //     },
          // ])

          //connectNpcToLobby(REGISTRY.lobbyScene, simonas)
          // if (simonas.npcAnimations.HI) npcLib.playAnimation(simonas.entity, simonas.npcAnimations.HI.name, true, simonas.npcAnimations.HI.duration)
        },
        onWalkAway: () => {
          //closeCustomUI(false)//already in walkaway dont trigger second time
          //hideThinking(simonas)
          //if (REGISTRY.activeNPC === simonas) REGISTRY.activeNPC = undefined
          //console.log("NPC", simonas.name, 'on walked away')
          ////const NO_LOOP = true
          //if (simonas.npcAnimations.SAD) npcLib.playAnimation(simonas.entity, simonas.npcAnimations.SAD.name, true, simonas.npcAnimations.SAD.duration)
        },
        idleAnim: "Idle",
        //walkingAnim: DOGE_NPC_ANIMATIONS.WALK.name,
        faceUser: true,
        /*portrait:
        {
          path: SIMONAS_NPC_ANIMATIONS.IDLE.portraitPath, height: 320, width: 320
          , offsetX: -60, offsetY: -40
          , section: { sourceHeight: 384, sourceWidth: 384 }
        },*/
        darkUI: true,
        coolDownDuration: 3,
        hoverText: 'Marsha NPC',
        onlyETrigger: true,
        onlyClickTrigger: false,
        onlyExternalTrigger: false,
        reactDistance: 5,
        continueOnWalkAway: false,
    })

    const cube2 = engine.addEntity()
    Transform.create(cube2,{position:Vector3.create(18,1,20)})
    MeshRenderer.setBox(cube2)
    MeshCollider.setBox(cube2)

    pointerEventsSystem.onPointerDown({ 
        entity: cube2,
        opts:{
          button: InputAction.IA_POINTER,
          hoverText:"Marsha say Hi2",
        }
      },
      (e) => {
        talk(npc,
          [
            {
              text:"hi2",
              isEndOfDialog: true
            }
          ])
      }
    )

    const cube1 = engine.addEntity()
    Transform.create(cube1,{position:Vector3.create(18,1,18)})
    MeshRenderer.setBox(cube1)
    MeshCollider.setBox(cube1)

    pointerEventsSystem.onPointerDown({
        entity: cube1,
        opts:{
          button: InputAction.IA_POINTER,
          hoverText:"Marsha say Hi1",
        }
      },
      (e) => {
        console.log('talk to me marsha')
        talk(npc,
          [
            {
              text:"hi1",
              isEndOfDialog: true
            }
          ])
      }
    )
}
