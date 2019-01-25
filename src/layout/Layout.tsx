import * as React from "react";
import { PureComponent } from "react";
import "./layout.css";

import Searcher from "../components/Searcher";
import Block from "../components/Block";
import Clock from "../components/Clock";

interface IWebsite {
  category?: string;
  name: string;
  url: string;
  weight?: string;
}

interface IProps {
  websites: IWebsite[];
  onEvent?: any;
}

interface IState {
  showClock: boolean;
}

const categorys = [
  "常用",
  "IT技术",
  "设计",
  "科技",
  "新闻",
  "数码",
  "体育",
  "工具",
  "生活",
  "社交",
  "阅读",
  "财经",
  "商业",
  "深度",
  "娱乐",
  "房产",
  "求职兼职",
  "音乐",
  "视频",
  "游戏直播",
  "二次元",
  "购物",
  "发现",
  "券商理财",
  "游戏",
  "商旅",
  "邮箱",
  "银行",
  "我在日本",
  "我在韩国",
  "我在台湾",
  "我在香港",
  "我在海外",
];

class Layout extends PureComponent<IProps, IState> {
  public state: IState = {
    showClock: false
  };
  constructor(props: IProps) {
    super(props);
  }
  public handleCommand = value => {
    switch (value.toLowerCase()) {
      case "":
        this.setState({
          showClock: false
        });
        return false;
        break;
      case "时间":
      case "time":
        this.setState({
          showClock: true
        });
        return false;
        break;
      default:
        return true;
    }
  };
  public componentDidMount() {
    window.addEventListener('storage', e => {
			console.log('​Layout -> publiccomponentDidMount -> e', e)
    })
  }
  public render() {
    const { onEvent, websites } = this.props;
    const { showClock } = this.state;
    const randomAnima = new Date().getTime() % 2 ? "anima" : "";
		console.log("​Layout -> publicrender -> randomAnima", randomAnima)
    const changeBackground = () => {
      fetch("https://api.tuobaye.com:8888/wallpaper/random/url")
        .then(res => res.json())
        .then(data => {
          console.log("​changeBackground -> data", data);
          window.localStorage.bgUrl = data.url;
          onEvent("change-bg", data.url);
        })
        .catch(err => console.log("​changeBackground -> err", err));
    };

    return (
      <div className="wrapper">
        <div className="header">{showClock && <Clock />}</div>
        <div className="tools">
          <img
            src={require("../img/logo.png")}
            // src={require("../img/horizon_white.png")}
            alt="Horizon"
            title="😜点我点我点我！"
            className={"img logo " + randomAnima}
            onClick={() => changeBackground()}
          />
          <img
            src={require("../img/slogan.png")}
            // src={require("../img/horizon_slogan.png")}
            alt="Horizon"
            className={"img slogan"}
            onClick={() => window.open("https://horizon.ai")}
          />
          <Searcher className="search" onClick={this.handleCommand} />
        </div>
        <div className="main">
          {categorys.slice(0, 8).map(i => (
            <Block category={i} websites={websites} className="block" key={i} />
          ))}
        </div>
        <div className="footer" />
      </div>
    );
  }
}

export default Layout;
