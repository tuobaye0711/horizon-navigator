import * as React from "react";
import { PureComponent, Fragment } from "react";
import { Card, Icon, Input, Modal, message } from "antd";
import store from "store";
import "./Card.css";

// const { Meta } = Card;

interface IProps {
  name: string;
  url: string;
  position: string;
  weight: string;
  category: string;
}
interface IState {
  editable: boolean;
  newName: string;
  newUrl: string;
}

class UrlCard extends PureComponent<IProps, IState> {
  public state: IState = {
    editable: false,
    newName: "",
    newUrl: ""
  };
  constructor(props) {
    super(props);
  }

  public cardClick = url => {
    if (/http|https/.test(url)) {
      window.open(url);
    } else {
      window.open(`http://${url}`);
    }
  };

  public iconClick = event => {
    event.stopPropagation();
    console.log("iconClick", event);
    this.setState({
      editable: true
    });
  };

  public editCardSave = () => {
    const { position, name, url } = this.props;
    const newName = (document.getElementById("name") as HTMLInputElement).value;
    const newUrl = (document.getElementById("url") as HTMLInputElement).value;
    if (
      ((this.state.newName &&
        (newName !== this.state.newName || newUrl !== this.state.newUrl)) ||
        (!this.state.newName && (newName !== name || newUrl !== url))) &&
      !!newName.trim() &&
      !!newUrl.trim()
    ) {
      store.set(position, {
        ...this.props,
        name: newName,
        url: newUrl
      });
      message.success("更新成功");
      this.setState({
        editable: false,
        newName,
        newUrl
      });
    } else if (!newName.trim() || !newUrl.trim()) {
      message.warn("输入项不能为空")
    } else {
      message.warn("尚未修改");
    }
  };

  public editCardClose = () => {
    this.setState({
      editable: false
    });
  };

  public render() {
    const { name, url }: IProps = this.props;
    const { editable, newName, newUrl } = this.state;
    return (
      <Fragment>
        {editable ? (
          <Card hoverable={true} className="card-edit">
            editing...
          </Card>
        ) : (
          <Card
            hoverable={true}
            onClick={() => {
              this.cardClick(newUrl ? newUrl : url);
            }}
            className="card"
          >
            <span
              title={`${newName ? newName : name}: ${newUrl ? newUrl : url}`}
            >
              {newName ? newName : name}
            </span>
            <Icon
              type="edit"
              key="name"
              onClick={event => {
                this.iconClick(event);
              }}
            />
          </Card>
        )}
        <Modal
          title={null}
          closable={false}
          visible={this.state.editable}
          onOk={this.editCardSave}
          onCancel={this.editCardClose}
          okText="save"
          cancelText="cancel"
        >
          <form id="form">
            <div style={{ marginBottom: 16 }}>
              <label>名称:</label>
              <Input defaultValue={newName ? newName : name} id="name" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>URL:</label>
              <Input defaultValue={newUrl ? newUrl : url} id="url" />
            </div>
          </form>
        </Modal>
      </Fragment>
    );
  }
}

export default UrlCard;
