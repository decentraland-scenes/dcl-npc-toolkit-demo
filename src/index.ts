import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as npc from 'dcl-npc-toolkit'

import { setupUi } from './setupUI'
import { testscript } from './dialogs'
import { createDogeNpc } from './dogeNpc'
import { createChatters } from './chatters'
import { createMarshaNpc } from './marsha'


// export all the functions required to make the scene work
export * from '@dcl/sdk'

export let bob = npc.create(
	{
		position: Vector3.create(9, 0, 8),
		rotation: Quaternion.fromEulerDegrees(0, 180, 0),
		scale: Vector3.create(1, 1, 1)
	},
	{
		type: npc.NPCType.CUSTOM,
		faceUser: true,
		portrait: { path: 'images/npc.png' },
		model: 'models/npc.glb',
		onActivate: () => {
			npc.changeIdleAnim(bob, 'TalkLoop')
			npc.playAnimation(bob, 'TalkIntro', true, 1.63)
			npc.talk(bob, testscript, 0)
		},
		onWalkAway: () => {
			console.log('test on walk away function')
		}
	}
)

createDogeNpc()
createChatters()
createMarshaNpc()

setupUi()