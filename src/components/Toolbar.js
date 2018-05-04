import React from 'react';

const Toolbar = props => {
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{props.unreadMessages}</span>
          unread messages
        </p>
        <button onClick={props.bulkHandler} className="btn btn-default">
          <i className="fa fa-minus-square-o"></i>
        </button>

        <button
          className="btn btn-default" onClick={props.messageReadHandler}>Mark As Read</button>

        <button className="btn btn-default" onClick={props.messageUnreadHandler}>Mark As Unread</button>

        <select className="form-control label-select" onChange={props.applyLabelsHandler}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange={props.removeLabelsHandler}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={props.deleteMethod}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>

  )
}

export default Toolbar
