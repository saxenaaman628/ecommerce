import React, {useState} from 'react';
import {Menu} from 'antd';
import {
  LogoutOutlined,
  AppstoreOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined}
  from '@ant-design/icons';
import {Link} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
const {SubMenu, Item} = Menu;

const Header = () => {
  const [current, setCurrent] =useState('home');
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>({...state}));
  const history = useHistory();

  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
    // console.log('logout');
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined/>}>
        <Link to="/">Home </Link>
      </Item>

      {!user && (
        <><Item key="register" icon={<UserAddOutlined />} className='float-end'>
          <Link to="/register">Register</Link>
        </Item><Item key="login" icon={<UserOutlined />} className='float-end'>
          <Link to="/login">Login</Link>
        </Item></>
      )}

      {user &&
      <SubMenu icon={<SettingOutlined />} title={user.email &&
        user.email.split('@')[0]}
      className='float-end'>
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined />}
          onClick={logout}>
          Logout</Item>
      </SubMenu>}
    </Menu>
  );
};

export default Header;
