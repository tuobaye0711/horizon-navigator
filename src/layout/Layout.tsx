import * as React from "react";
import "./layout.css";

import Searcher from "../components/Searcher";
import Block from "../components/Block";

export interface IWebsite {
  category?: string;
  name: string;
  url: string;
  weight?: string;
}

export interface IWebsites {
  websites: IWebsite[];
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
  "我在日本",
  "我在韩国",
  "我在台湾",
  "我在香港",
  "我在海外",
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
  "银行"
];

const Layout = ({ websites }: IWebsites) => {
  return (
    <div className="wrapper">
      <div className="header" />
      <div className="tools">
        <img
          src={require("../img/horizon_white.png")}
          alt="Horizon"
          className="img logo"
          onClick={() => window.open("https://horizon.ai")}
        />
        <img
          src={require("../img/horizon_slogan.png")}
          alt="Horizon"
          className="img slogan"
        />
        <Searcher className="search" />
      </div>
      <div className="main">
        {categorys.slice(0, 8).map(i => (
          <Block category={i} websites={websites} className="block" key={i} />
        ))}
      </div>
      <div className="footer" />
    </div>
  );
};

export default Layout;
