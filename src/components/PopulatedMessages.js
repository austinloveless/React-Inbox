import React from 'react'

 class PopulatedMessages extends React.Component {

  render() {
    return (
    <div>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star-o"></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <ul>
          {this.props.subject}

        </ul>
      </div>
    </div>
    )
  }

}

export default PopulatedMessages
