import React from "react";
import PopulatedMessages from './PopulatedMessages'

export default class MessageList extends React.Component {


  renderEmailList() {
    const { data } = this.props
    console.log(data)

    return data.map((list, i) => {
    //  const isSelected = Reflect.get(list, 'selected')
    const isSelected = list.selected;
      return (
        <div className={["row message read", isSelected ? 'selected' : ''].join(' ')} key={i}>
            <div className="col-xs-1">
              <div className="row">
                <div className="col-xs-2">
                  <input
                    onChange={e => this.props.messageSelectedHandler(list)}
                    checked={isSelected ? 'checked' : ''}
                    type="checkbox"
                  />
                </div>
                <div className="col-xs-2">
                  <i className="star fa fa-star-o"></i>
                </div>
              </div>
              {list.labels.map(label => (<p>{label}</p>))}
            </div>
            <div className="col-xs-11">
              {list.subject}
            </div>
          </div>
      )
    })
  }

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
            {this.renderEmailList()}

          </ul>
        </div>
      </div>

    );
  }
}
