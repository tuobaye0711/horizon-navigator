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
}
interface IState {
  editable: boolean;
}

class UrlCard extends PureComponent<IProps, IState> {
  public state: IState = {
    editable: false
  };
  constructor(props) {
    super(props);
  }

  public cardClick = url => {
    window.open(url);
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
    console.log("​UrlCard -> publiceditCardSave -> this.props", this.props);
    const newName = (document.getElementById("name") as HTMLInputElement).value;
    const newUrl = (document.getElementById("url") as HTMLInputElement).value;
    if (newName !== name || newUrl !== url) {
      store.set(position, {
        ...this.props,
        name: newName,
        url: newUrl
      });
      message.success("更新成功");
      this.setState({
        editable: false
      });
    }else{
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
    const { editable } = this.state;
    return (
      <Fragment>
        {editable ? (
          <Card
            hoverable={true}
            // onClick={() => {
            //   this.cardClick(url);
            // }}
            className="card-edit"
          >
            editing...
          </Card>
        ) : (
          <Card
            hoverable={true}
            onClick={() => {
              this.cardClick(url);
            }}
            className="card"
          >
            <span title={`${name}: ${url}`}>{name}</span>
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
              <Input defaultValue={name} id="name" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>url:</label>
              <Input defaultValue={url} id="url" />
            </div>
          </form>
        </Modal>
      </Fragment>
    );
  }
}

export default UrlCard;
