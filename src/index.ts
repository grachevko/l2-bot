import L2Creature from 'l2js-client/entities/L2Creature'
import {ShotsType} from 'l2js-client/enums/ShotsType'
import {EAttacked, EDie, EMyTargetSelected, EPartyRequest} from 'l2js-client/events/EventTypes'
import l2 from './login'

l2
    .on('LoggedIn', () => {
        l2.cancelTarget()
        l2.validatePosition()
        l2.moveTo(l2.Me.X + 1, l2.Me.Y + 1, l2.Me.Z)
        l2.autoShots(ShotsType.SSS, true) // enable SSS

        setInterval(() => {
            if (l2.DroppedItems.size > 0) {
                l2.hit(Array.from(l2.DroppedItems)[0])
            } else if (!l2.Me.Target || l2.Me.Target.ObjectId === l2.Me.ObjectId) {
                const creature: L2Creature | undefined = l2.nextTarget()
                if (creature instanceof L2Creature) {
                    l2.hit(creature)
                }
            }
        }, 500)
    })

    .on('MyTargetSelected', (e: EMyTargetSelected) => {
        if (l2.Me.Target) {
            l2.hit(l2.Me.Target)
            l2.attack(l2.Me.Target)
        }
    })

    .on('Die', (e: EDie) => {
        if (l2.Me.Target && e.data.creature.ObjectId === l2.Me.Target.ObjectId) {
            l2.cancelTarget()
            l2.CreaturesList.forEach((c: L2Creature) => {
                c.calculateDistance(l2.Me)
            })
        }
    })

    .on('PartyRequest', (e: EPartyRequest) => {
        l2.acceptJoinParty()
    })

    .on('Attacked', (e: EAttacked) => {
        if (Array.from(e.data.subjects).indexOf(l2.Me.ObjectId) !== -1) {
            l2.hit(e.data.object)
            l2.hit(e.data.object)
        }
    })
