import React, { useState, useEffect } from 'react';
import styles from './index.module.less';
import { Menu as AntdMenu, Button, Drawer } from 'antd';
import { useMobile } from '../../utils/hooks';
import { ExportOutlined, GithubOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import LogoBlock from '../LogoBlock';
import SearchInput from '../SearchInput';
import MapFilter from '../MapFilter';
import { Popover } from 'antd';
import eventBus from '../../event/bus';
import { useSearchParams, useLocation } from 'react-router';


/**
 * 菜单项配置接口，定义了菜单项的属性。
 *
 * @typedef {Object} MenuConfig
 * @property {string} label - 菜单标签文本。
 * @property {string} key - 菜单项对应的路由或标识符。
 * @property {boolean} [disabled] - 是否禁用该菜单项，默认为 false。
 */

/**
 * 菜单组件属性接口，定义了菜单组件接收的属性。
 *
 * @typedef {Object} MenuProps
 * @property {MenuConfig[]} dataSource - 菜单项数据源。
 * @property {string} activeKey - 当前激活的菜单项键。
 * @property {function(MenuConfig): void} onChange - 点击菜单项时触发的回调函数。
 */

/**
 * 菜单组件，用于展示和交互导航菜单。
 *
 * @param {MenuProps} props - 组件属性。
 */
const Menu = (props) => {
  // console.log('props', props)
  const [showDrawer, setShowDrawer] = useState(false);
  const isMobile = useMobile();
  const [searchParams] = useSearchParams();
  const location = useLocation(); 
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [openMapPopover, setOpenMapPopover] = useState(false);

  const handleGoGithub = () => {
    window.open('https://github.com/vearvip/mcpdict-frontend');
  }

  useEffect(() => {
    if (!isMobile) {
      setShowDrawer(false);
    }
  }, [isMobile]);

  // 监听路由变化，控制 Popover 开关
  useEffect(() => {
    if (location.pathname === '/search') {
      setOpenSearchPopover(true);
      setOpenMapPopover(false);
    } else if (location.pathname === '/map') {
      setOpenMapPopover(true);
      setOpenSearchPopover(false);
    } else {
      // 路由切走时关闭所有 Popover
      setOpenSearchPopover(false);
      setOpenMapPopover(false);
    }
  }, [location.pathname]);

  /**
   * 渲染右侧内容区域
   * @returns {JSX.Element|null} 渲染的内容
   */
  const renderRightContent = () => {
    if (isMobile) {
      // 移动端逻辑
      if (location.pathname === '/search') {
        return (
          <Popover
            zIndex={100}
            trigger={'click'}
            placement="bottomRight"
            title={false}
            open={openSearchPopover}
            onOpenChange={setOpenSearchPopover}
            content={
              <SearchInput
                defaultValue={searchParams.get("q") || ""}
                onSearch={(...args) => {
                  eventBus.emit('SEARCH_EVENT', ...args)
                }} />
            }
          >
            <SearchOutlined className={styles.search_icon} />
          </Popover>
        );
      }
      
      if (location.pathname === '/map') {
        return (
          <Popover
            zIndex={100}
            trigger={'click'}
            placement="bottomRight"
            title={false}
            open={openMapPopover}
            onOpenChange={setOpenMapPopover}
            // fresh
            content={
              <div style={{
                width: '80vw',
              }}>
                <MapFilter
                defaultValue={searchParams.get('q')}
                onSearchResultChange={(...args) => {
                  eventBus.emit('MAP_SEARCH_EVENT', ...args)
                }}
                onRadioValueChange={(...args) => {
                  eventBus.emit('MAP_RADIO_EVENT', ...args)
                }}
              />
              </div>
            }
          >
            <SearchOutlined className={styles.search_icon} />
          </Popover>
        );
      }
      
      return null;
    } else {
      // 桌面端逻辑
      return (
        <GithubOutlined
          onClick={() => handleGoGithub()}
          className={styles.github_icon}
          style={{
            ...(isMobile ? {
              marginTop: 12,
            } : {})
          }}
        />
      );
    }
  };


  return (
    <>
      <div className={`${styles.menu} vear_menu`}>

        {isMobile
          ? (
            <div style={{
              marginLeft: '16px',
              marginTop: '12px',
              display: 'inline-block'
            }}>
              <Button icon={<MenuOutlined />} onClick={() => setShowDrawer(true)} />

            </div>
          )
          : (
            <div>
              <AntdMenu
                items={props.dataSource}
                mode="horizontal"
                selectedKeys={[props.activeKey]}
                onClick={props.onChange} style={{
                  marginTop: 6,
                  border: 'none',
                }} />
            </div>
          )}
        <div>
          {renderRightContent()}
        </div>

      </div>
      <Drawer
        placement="left"
        closeIcon={false}
        width={300}
        onClose={() => setShowDrawer(false)}
        open={showDrawer}

        styles={{
          body: {
            padding: 0
          },
        }}
      >

        <div className="flex-center" style={{
          marginTop: 30,
          marginBottom: 20,
          paddingLeft: 20,
        }}>
          <LogoBlock />
        </div>
        <AntdMenu
          items={[
            ...props.dataSource,
            {
              label: <>Github仓库<ExportOutlined style={{ marginLeft: 3 }} /> </>,
              key: "/github",
            }
          ]}
          selectedKeys={[props.activeKey]}
          onClick={(...args) => {
            if (args[0].key === '/github') {
              handleGoGithub();
              return;
            }
            console.log('args', args)
            props.onChange(...args);
            setShowDrawer(false);
          }}
          style={{
            marginTop: 6,
            border: 'none',
          }} />
      </Drawer>
    </>
  );
};

export default Menu;
