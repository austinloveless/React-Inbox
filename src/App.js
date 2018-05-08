import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Toolbar from "./components/Toolbar";
import MessageList from "./components/MessageList";
import Message from './components/Message';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      itemsSelected: 0,
    };
  }

async componentDidMount() {
  const messagesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
const messagesJSON = await messagesResponse.json()
this.setState({data: messagesJSON})
}

async createMessage(item)  {
  const response = await fetch('http://localhost:8082/api/messages', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
       'Accept': 'application/json',
    }
  })
  const moreItems = await response.json()
  await this.setState({data:
    [...this.state.data, moreItems]
  })

}

  componentWillMount() {
    let itemsSelected = 0
  const data = this.state.data.map(item => {
    if (item.selected) {
      itemsSelected++
    }
    return item
  })

  this.setState({
    data,
    itemsSelected
  })
  console.log('will mount', this.state)
  }

deleteMethod = () => {
  const deleteItem = this.state.data.filter(item => !item.selected)
  this.setState({data: deleteItem})
  console.log('delete', deleteItem)
}

unreadMessages = () => {
  console.log('unreadMessages initialised')
  return this.state.data.reduce((sum, i) => {
    return sum + !i.read
  }, 0)
}

messageReadHandler = () => {
  const readMessages = this.state.data.map(message => {
    if(!message.read && message.selected) {
    console.log('message in messegared read handler', message)
      const item = {...message}
      item.read = true
      return item
    } else {
      return message
    }
  })
  console.log('in messageReadHandler', readMessages)
  this.setState({
    data: readMessages,
  })
}

messageUnreadHandler = () => {
  const unreadMessages1 = this.state.data.map(message => {
    if(message.read && message.selected) {
    console.log('message in messegared read handler', message)
      const item = {...message}
      item.read = false
      return item
    } else {
      return message
    }
  })
  console.log('in messageReadHandler', unreadMessages1)
  this.setState({
    data: unreadMessages1
  })
}
applyLabelsHandler = (e) => {
  console.log('event', e.target.value)
  const label = e.target.value
  const applyLabels = this.state.data.map(message => {
    if (message.selected && label && !message.labels.includes(label)) {
      const oldLabels = message.labels.slice();
      const withNewLabel = oldLabels.concat(label)
      const newMessage = {...message}
      newMessage.labels = withNewLabel;
       return newMessage
     } else {
       return message
     }
   })
   console.log('apply labels', applyLabels)

  this.setState({
    data: applyLabels
  })
}

toggleHidden() {
  this.setState({
    isHidden: !this.state.isHidden
  })
}


removeLabelsHandler = (e) => {
  console.log('event', e.target.value)
  const label = e.target.value
  const removeLabels = this.state.data.map(message => {
    if (message.selected && label && message.labels.includes(label)) {
      const oldLabels = message.labels;
      const withNewLabel = oldLabels.filter(label => label === !label)
      const newMessage = {...message}
      newMessage.labels = withNewLabel;
       return newMessage
     } else {
       return message
     }
   })
  this.setState({
    data: removeLabels
  })
}
// if (message.selected && message.includes(label)) {
//     item.labels.filter(label => label !== labelToRemove)
//     return item
// } else {
//   return message
// }


messageSelectedHandler = item => {
  console.log('item selected', item);
  let count = 0
  const messages = this.state.data.map(message => {
    if (message.selected) count++
    if (message.id === item.id) {
      let isSelected = Reflect.has(item, 'selected') ? !item.selected : true
      if (isSelected) {
        count++
        return {
          ...item,
          selected: true
        }
      } else {
        return {
          ...item,
          selected: false
        }
      }
      return {
        ...item,
        selected: isSelected
      }
    } else {
      return message
    }
  })
  this.setState({
    data: messages,
    itemsSelected: count
  })
}



bulkHandler = () => {
  console.log('anything', this.state)
  let messages
  let count = 0
  if (this.state.itemsSelected > 0) {
    messages = this.state.data.map(message => {
      return {
        ...message,
        selected: false
      }
    })
    count = 0
  } else {
    messages = this.state.data.map(message => {
      return {
        ...message,
        selected: true
      }
    })
    count = this.state.data.length
  }

  this.setState({data: messages, itemsSelected: count})
}

addItems = (item) => {
  const { data } = this.state
  this.setState({
    data: [...data, item]
  })
}



  render() {

    return (
      <div className="App">

        <Toolbar
          createMessage={this.createMessage}
          toggleHidden={this.toggleHidden}
          removeLabelsHandler={this.removeLabelsHandler}
          applyLabelsHandler={this.applyLabelsHandler}
          messageUnreadHandler={this.messageUnreadHandler}
          unreadMessages={this.unreadMessages()}
          messageReadHandler={this.messageReadHandler}
          bulkHandler={this.bulkHandler}
          deleteMethod={this.deleteMethod}
        />

        <MessageList
          data={this.state.data}
          messageSelectedHandler={this.messageSelectedHandler}
        />
      </div>
    );
  }
}

export default App;
