import React from "react";
import "./Coin.scss";
import "./Reponsive.scss";
import image from "../../view/img/image.png";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

export default function Coin() {
  const [lists, setLists] = useState([]);
  const coinChange = useRef([]);
  const [file, setFile] = useState("");
  useEffect(() => {
    let data = [...coinChange.current];
    data = data.map((item) => item.outerText.replace("%", ""));

    for (let i = 0; i < coinChange.current.length; i++) {
      if (Number.parseFloat(data[i]) > 0) {
        coinChange.current[i].style.color = "#7EFF9B";
      } else {
        coinChange.current[i].style.color = "#FF909A";
      }
    }
  });
  useEffect(() => {
    async function fetchData() {
      // You can await here
      let res = await axios.get(
        "https://coinlib.io/api/v1/coin?key=8c9fa087a7d22cb3&symbol=BTC,ETH,LTC,XRP,XLM"
      );
      const icons = {
        BTC: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="24"
            viewBox="0 0 18 24"
          >
            <defs></defs>
            <path
              className="bitcoin-icon"
              d="M146.766,23.219a4.214,4.214,0,0,0,2.152-3.768c0-2.99-2.937-4.392-4.722-4.57-.146-.016-.553-.024-.553-.024V12h-2.913l.007,2.86h-1.948v-2.85h-2.962v2.835c-.521.013-3.656.011-3.656.011v2.532h1.019c1.072.029,1.467.654,1.424,1.224V29.527a.733.733,0,0,1-.662.707c-.444.02-1.108,0-1.108,0l-.571,2.869h3.561v2.891H138.8V33.12h1.947V36h2.9V33.131c3.388.09,6.5-1.935,6.53-5.264A5.137,5.137,0,0,0,146.766,23.219Zm-7.971-.735v-4.9c.448.013,2.085-.029,2.969.018a2.848,2.848,0,0,1,2.33,1.114,2.336,2.336,0,0,1-.578,3.155,3.6,3.6,0,0,1-1.964.607C141.54,22.482,138.839,22.491,138.795,22.484Zm6.56,5.884a2.419,2.419,0,0,1-.888,1.191,3.9,3.9,0,0,1-2.119.657l-3.55.007V24.929c.514.014,2.792-.024,3.78.027a3.056,3.056,0,0,1,2.516,1.207,2.374,2.374,0,0,1,.257,2.212Z"
              transform="translate(-132.17 -12)"
            />
          </svg>
        ),
        ETH: (
          <svg
            className="ethe-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="24"
            viewBox="0 0 14.736 24"
          >
            <defs></defs>
            <g transform="translate(-205 -12)">
              <path
                d="M212.366,583.85,205,579.5l7.364,10.38,7.372-10.38-7.374,4.35Z"
                transform="translate(0 -553.88)"
              />
              <path
                className="b"
                d="M212.366,583.85,205,579.5l7.364,10.38,0-6.03Z"
                transform="translate(0 -553.88)"
              />
              <path
                className="a"
                d="M212.428,12,205.06,24.223l7.367,4.354,7.367-4.35Z"
                transform="translate(-0.059)"
              />
              <path
                className="b"
                d="M212.428,12,205.06,24.223l7.367,4.354Z"
                transform="translate(-0.059)"
              />
              <path
                className="c"
                d="M212.428,380.97l-7.368,3.368,7.367,4.354,7.367-4.35Z"
                transform="translate(-0.059 -360.115)"
              />
              <path
                className="a"
                d="M212.428,380.97l-7.368,3.368,7.367,4.354Z"
                transform="translate(-0.059 -360.115)"
              />
            </g>
          </svg>
        ),
        LTC: (
          <svg
            className="lite-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="24"
            viewBox="0 0 15 20"
          >
            <defs></defs>
            <path
              d="M154.624,23.1l-1.637,5.37h8.756a.437.437,0,0,1,.457.414v.141l-.761,2.556a.566.566,0,0,1-.572.408h-13.4l2.246-7.444-2.513.74.572-1.7,2.513-.74,3.16-10.444a.574.574,0,0,1,.571-.408H157.4a.437.437,0,0,1,.457.415v.141l-2.665,8.814,2.513-.74-.533,1.778Z"
              transform="translate(-147.2 -11.987)"
            />
          </svg>
        ),
        XRP: (
          <svg
            className="xrp-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="24"
            viewBox="0 0 20 17"
          >
            <defs></defs>
            <path
              d="M29.07,97.94h2.891l-6.016,6.114a5.52,5.52,0,0,1-7.891,0L12.037,97.94H14.93l4.57,4.644a3.494,3.494,0,0,0,5,0Zm-14.178,17H12l6.055-6.151a5.52,5.52,0,0,1,7.891,0L32,114.94H29.109L24.5,110.258a3.494,3.494,0,0,0-5,0Z"
              transform="translate(-12 -97.94)"
            />
          </svg>
        ),
        XLM: (
          <svg
            className="stellar-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="24"
            viewBox="0 0 20 17"
          >
            <path
              d="M29.177,91.157l-2.408,1.232L15.14,98.34a7.041,7.041,0,0,1-.06-.908,6.922,6.922,0,0,1,10.306-6.068l1.378-.706.206-.105A8.437,8.437,0,0,0,15.152,92.44a8.526,8.526,0,0,0-1.614,4.994q0,.324.024.647a1.548,1.548,0,0,1-.836,1.494L12,99.947v1.736l2.14-1.1h0l.693-.355.683-.35h0l12.26-6.275,1.378-.7L32,91.446V89.71ZM32,93.183l-15.788,8.075-1.378.706L12,103.416v1.735l2.815-1.441,2.408-1.233,11.64-5.959a7.17,7.17,0,0,1,.06.915A6.922,6.922,0,0,1,18.608,103.5l-.085.045-1.494.765a8.437,8.437,0,0,0,11.819-1.885,8.527,8.527,0,0,0,1.614-4.991c0-.218-.008-.437-.024-.653a1.548,1.548,0,0,1,.835-1.494L32,94.914Z"
              transform="translate(-12 -88.932)"
            />
          </svg>
        ),
      };
      let newData = res.data.coins;
      newData = newData.map((data) => {
        const dataSymbol = data.symbol;
        let dataRespon = { ...data, icon: icons[dataSymbol] };
        return dataRespon;
      });
      setLists(newData);
    }
    fetchData();
  }, []);

  const showListMenu = () =>{
     const header =  document.querySelector('.header');
     if(header.clientHeight === 48 ){
        header.style.height = 'auto';
    }else{
        header.style.height = null;
    }
  }
  return (
    <div>
      <div id="main">
        <div className="header">
          <ul className="nav">
            <li className="nav-item fomos-span">
              <svg
                className="fomos-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <defs></defs>
                <path
                  className="fomos-icon"
                  d="M76.587,79.311a4.954,4.954,0,0,0-4.834,4.046A5.048,5.048,0,0,0,74.7,88.982a4.875,4.875,0,0,0,5.984-1.851,5.1,5.1,0,0,0-.613-6.347A4.847,4.847,0,0,0,76.587,79.311Zm0,8.226a3.107,3.107,0,0,1-2.4-1.143h2.4a.686.686,0,0,0,0-1.371H73.523a3.264,3.264,0,0,1,0-1.371h3.063a.686.686,0,0,0,0-1.371h-2.4a3.107,3.107,0,0,1,2.4-1.142,3.2,3.2,0,0,1,0,6.4Zm9.019.531-.825-9.085a.913.913,0,0,0-.518-.746l-8.127-3.814a.881.881,0,0,0-.892.084l-7.3,5.272a.921.921,0,0,0-.375.83l.152,1.673H66.282a.686.686,0,0,0,0,1.371h1.562l.125,1.371H66.282a.686.686,0,0,0,0,1.371h1.811l.3,3.3a.913.913,0,0,0,.519.746l8.126,3.814a.881.881,0,0,0,.892-.084l7.3-5.272A.921.921,0,0,0,85.606,88.067Zm-8.289,4.305L70.13,89l-.73-8.034L75.856,76.3l7.188,3.373.73,8.035Z"
                  transform="translate(-65.61 -74.338)"
                />
              </svg>
              <span className="fomos-des">Formos CryptoHub</span>
            </li>
            <li className="nav-item">Exchange</li>
            <li className="nav-item">Mining</li>
            <li className="nav-item">Wallets</li>
            <li className="nav-item">News</li>
          </ul>
          <div className="user-wrap">
            <span>
              <svg
                className="user-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <defs></defs>
                <path
                  className="user-icon"
                  d="M577-1558a10,10,0,0,1,10-10,10,10,0,0,1,10,10,10,10,0,0,1-10,10A10,10,0,0,1,577-1558Zm16.835,5.462a8.75,8.75,0,0,0,1.05-9.254A8.75,8.75,0,0,0,587-1566.75a8.751,8.751,0,0,0-7.885,4.957,8.752,8.752,0,0,0,1.05,9.255c.888-1.43,2.842-2.962,6.835-2.962S592.947-1553.969,593.835-1552.538ZM583.25-1560.5a3.75,3.75,0,0,1,3.75-3.75,3.75,3.75,0,0,1,3.75,3.75,3.75,3.75,0,0,1-3.75,3.751A3.75,3.75,0,0,1,583.25-1560.5Z"
                  transform="translate(-577 1568)"
                />
              </svg>
            </span>
            <span className="user-name">My profile</span>
          </div>
          <span
            onClick = {() => showListMenu()} 
            className = "list-icon"><FontAwesomeIcon icon = {faList} /></span>
        </div>
      </div>
      <div className="body">
        <div className="container">
          <p className="body-title">My Profile</p>
          <div className="body-watching">
            <h3 className="watching-title">My Watchinglist</h3>
            <div className="watch-list">
              {lists.length > 0 &&
                lists.map((list, index) => (
                  <div key={list.symbol} className="watching-item">
                    <div className="watching-item-icon">
                      <span className="watching-icon">{list.icon}</span>
                    </div>
                    <h4 className="watching-item-name">{list.name}</h4>
                    <p className="watching-item-description">
                      {list.show_symbol}
                    </p>
                    <p className="watching-item-price">
                      {parseFloat(list.price).toFixed(3)}
                    </p>
                    <p
                      ref={(element) => {
                        coinChange.current[index] = element;
                      }}
                      className="watching-item-change"
                    >
                      {list.delta_24h}%
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className="body-infomation">
            <div className="infomation-title">My Personal Information</div>
            <div className="profile-content">
              <div className="profile-heading">
                <div className="profile-img">
                  <img className="img" src={image} alt="" />
                </div>
                <p className="profile-image">Profile Image</p>
                <input
                  onChange={(e) => setFile(e.target.value)}
                  type="file"
                  id="getFile"
                  style={{ display: "none" }}
                />
                <input
                  value={file}
                  onChange={(e) => setFile(e.target.value)}
                  className="img-input"
                  type="text"
                  placeholder="Choose File"
                />
                <label className="browse-img-button" htmlFor="getFile">
                  Browse
                </label>
              </div>
              <div className="profile-body">
                <div className="profile-item">
                  <label htmlFor="" className="profile-infomation">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="profile-input"
                    placeholder="First Name..."
                  />
                </div>
                <div className="profile-item">
                  <label htmlFor="" className="profile-infomation">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="profile-input"
                    placeholder="Last Name..."
                  />
                </div>
                <div className="profile-item">
                  <label htmlFor="" className="profile-infomation">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="profile-input"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="profile-item">
                  <label htmlFor="" className="profile-infomation">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    className="profile-input"
                    placeholder="MM/DD/YYYY"
                  />
                </div>
              </div>
            </div>
            <button className="cancel-button">Cancel</button>
            <button className="save-button">Save Profile Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
