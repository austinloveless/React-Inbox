import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Toolbar from "./components/Toolbar";
import Message from "./components/Message";
import MessageList from "./components/MessageList";
import EmailData from "./EmailData.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: EmailData,
      itemsSelected: 0,
      itemsRead: 0
    };
  }

  componentWillMount() {
    let itemsSelected = 0
  const data = EmailData.map(item => {
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

starButton = () => {
  const star = this.state.data.filter(item => !item.starred)
  this.setState({data: star})
  console.log('star', star)
  }

  onRead = () => {
    const read = this.state.data.filter(item => !item.read)
    this.setState({data: read})
  }


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

  render() {
    const emails = this.state.data.map((email, i ) => {
      <Message key={i} email={ email } />
    })
    return (
      <div className="App">
        <Toolbar
          onRead={this.onRead}
          bulkHandler={this.bulkHandler}
          deleteMethod={this.deleteMethod}
        />
        <MessageList
          data={this.state.data}
          messageSelectedHandler={this.messageSelectedHandler}
          starButton={this.starButton}
        />
      </div>
    );
  }
}

export default App;
