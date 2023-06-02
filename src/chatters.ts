import { timers } from "@dcl-sdk/utils"
import { Entity } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { Dialog, NPCType, changeIdleAnim, closeBubble, create, playAnimation, talk, talkBubble } from "dcl-npc-toolkit"

let octo: Entity
let doge: Entity

export function createChatters() {
  createOcto()
  createDoge()

  startConversing(false)
}

function startConversing(delayed: boolean) {
  //doge starts conversation
  //octo reply
  //doge confirms
  //octo continues the conversation
  //doge reply
  //octo says bye
  //doge says bye back and starts overs
  if (delayed) {
    timers.setTimeout(() => {
      console.log("Start Conversation delayed");
      talkBubble(doge, dogeDialog, dogeStart)
    },
      3000)
  } else {
    console.log("Start Conversation Instantly");
    talkBubble(doge, dogeDialog, dogeStart)
  }
}

function createOcto() {
  octo = create(
    {
      position: Vector3.create(23, 0, 8),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0)
    },
    {
      type: NPCType.CUSTOM,
      model: "models/npc.glb",
      onlyETrigger: true,
      textBubble: true,
      onActivate: () => {
      }
    }
  )
}

function createDoge() {
  doge = create(
    {
      position: Vector3.create(25, 0, 8.5),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(1.5, 1.5, 1.5)
    },
    {
      type: NPCType.CUSTOM,
      model: "models/dogeNPC_anim4.glb",
      onlyETrigger: true,
      textBubble: true,
      onActivate: () => {
      }
    }
  )
}

const dogeStart = 0
const doge1stReply = 2
const doge2ndReply = 3
const dogeBye = 4

const dogeDialog: Dialog[] = [
  {
    text: 'Hello',
  },
  {
    text: 'Can you reply?',
    isEndOfDialog: true,//Required so this bubble dies, if removed both conversations will play simultaneously
    triggeredByNext: () => {
      //closeBubble(doge) //add an exception throw: Cannot read properties of undefined (reading 'text')
      talkBubble(octo, octoDialog, octo1stReply)
    }
  },
  {
    text: 'Good',
    isEndOfDialog: true,
    triggeredByNext: () => {
      talkBubble(octo, octoDialog, octo2ndReply)
    }
  },
  {
    text: 'Not Me!',
    isEndOfDialog: true,
    triggeredByNext: () => {
      talkBubble(octo, octoDialog, octoBye)
    }
  },
  {
    text: 'Bye',
    isEndOfDialog: true,
    triggeredByNext: () => {
      startConversing(true)
    }
  },
]

const octo1stReply = 0
const octo2ndReply = 1
const octoBye = 3

const octoDialog: Dialog[] = [
  {
    text: 'Yes!',
    isEndOfDialog: true,
    triggeredByNext: () => {
      talkBubble(doge, dogeDialog, doge1stReply)
    }
  },
  {
    text: 'Look at us',
  },
  {
    text: 'Who would\'ve thought?',
    isEndOfDialog: true,
    triggeredByNext: () => {
      talkBubble(doge, dogeDialog, doge2ndReply)
    }
  },
  {
    text: 'Okay Bye',
    isEndOfDialog: true,
    triggeredByNext: () => {
      talkBubble(doge, dogeDialog, dogeBye)
    }
  }
]