import React from "react";

export default class MessageList extends React.Component {
  renderEmailList() {
    const { data } = this.props;
    console.log('data', data);
    console.log('data from props', this.props)

    return data.map((list, i) => {
      console.log('in render email list loop', list)
      const isSelected = Reflect.get(list, 'selected');
      const isRead = list.read;
      const isUnRead = list.read;
      return (
        <div
          className={["row message",
          isSelected ? "selected"
          : "",
          isRead ? "read"
          : "",
          isUnRead ? 'unread'
          : ""
        ].join(" ")}
          key={i}
        >
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input
                  onChange={e => this.props.messageSelectedHandler(list)}
                  checked={isSelected ? "checked" : ""}
                  type="checkbox"
                />
              </div>
              <div className="col-xs-2">
                <i className={["star fa ", isSelected ? 'fa-star' : 'fa-star-o'].join(' ')}/>
              </div>
            </div>
            { list.labels &&
              list.labels.map(label => (
              <span className="label label-warning">{label}</span>
            ))}
          </div>
          <div className="col-xs-11">{list.subject}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="col-xs-1">
          <div className="row" />
        </div>
        <div className="col-xs-11">
          <ul>{this.renderEmailList()}</ul>
        </div>
      </div>
    );
  }
}
