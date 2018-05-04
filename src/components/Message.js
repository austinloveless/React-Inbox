import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: ''
    }
  }
onSubmit = e => {
  e.preventDefault();
const { subject } = this.state
const newSubject = {
  subject
}
console.log('new subject', newSubject)
  this.props.createMessage(newSubject)
}
render() {
  return (
    <form className="form-horizontal well" onSubmit={this.onSubmit}>
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <h4>Compose Message</h4>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
    <div className="col-sm-8">
      <input
         type="text"
         className="form-control"
         id="subject"
          placeholder="Enter a subject"
          name="subject"
          onChange={e => this.setState({subject: e.target.value})}
        />
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
    <div className="col-sm-8">
      <textarea name="body" id="body" className="form-control"></textarea>
    </div>
  </div>
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <input type="submit" value="Send" className="btn btn-primary"/>
    </div>
  </div>
</form>

  )
}
}



export default Message
