import React from "react";
import Message from "./Message";


class Toolbar extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    isHidden: true
  }
}



render () {
 return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{this.props.unreadMessages}</span>
          unread messages
        </p>
        <a className="btn btn-danger" onClick={this.props.toggleHidden.bind(this)}>
          <i className="fa fa-plus" />
        </a>

        <button onClick={this.props.bulkHandler} className="btn btn-default">
          <i className="fa fa-minus-square-o" />
        </button>

        <button className="btn btn-default" onClick={this.props.messageReadHandler}>
          Mark As Read
        </button>

        <button
          className="btn btn-default"
          onClick={this.props.messageUnreadHandler}
        >
          Mark As Unread
        </button>

        <select
          className="form-control label-select"
          onChange={this.props.applyLabelsHandler}
        >
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select
          className="form-control label-select"
          onChange={this.props.removeLabelsHandler}
        >
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={this.props.deleteMethod}>
          <i className="fa fa-trash-o" />
        </button>
        {!this.state.isHidden && <Message createMessage={this.props.createMessage}/>}
      </div>
    </div>
  );
};
}


export default Toolbar;
