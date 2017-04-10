import map from 'lodash/map'
import React, { PropTypes } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import * as cardActions from '../../reducers/card'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import Card from './Card'
import Slot from './Slot'

const { string } = PropTypes
const propTypes = {
  letter: string,
}

class Board extends React.Component {
  state = {
    cards: {
      1: { id: 1, slotId: null, letter: '1' },
      2: { id: 2, slotId: null, letter: '2' },
    },
    slots: {
      1: { id: 1, cardId: null },
      2: { id: 2, cardId: null },
    },
  }

  move(targetId, sourceId) {
    const { cards, slots } = this.state
    this.setState({
      slots: {
        ...slots,
        [targetId]: {
          ...slots[targetId],
          cardId: sourceId,
        },
      },
    })
  }
  render() {
    const { cards, slots } = this.state
    return (
      <div>
        <div className="flex">
          {map(cards).filter(({ slotId }) => !slotId).map((card, key) => (
            <Card key={key} {...card} />
          ))}
        </div>
        <div className="flex">
          {map(slots, ((slot, key) =>
            <Slot
              key={key}
              {...slot}
              onMove={({ targetId, sourceId }) =>
              this.move(targetId, sourceId)}
            >
              <Card {...cards[slot.cardId]} />
            </Slot>
          ))}
        </div>
      </div>
    )
  }

}

Board.propTypes = propTypes

// const mapState = state => state.card
// const bindActions = dispatch => bindActionCreators(cardActions, dispatch)
// const mapReducer = connect(mapState, bindActions)(CardContainer)
export default DragDropContext(HTML5Backend)(Board)