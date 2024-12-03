import styles from './index.module.less'
import { Component, createSignal, For, JSX, Show } from 'solid-js'
import { MenuConfig } from '@/types'
import LogoBlock from '../LogoBlock'
import { IconButton } from "@suid/material";
import DensityMediumIcon from '@suid/icons-material/DensityMedium';
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@suid/material';
import useMediaQuery from '@suid/material/useMediaQuery';
import { useTheme } from '@suid/material/styles';

interface MenuProps {
  dataSource: MenuConfig[]
  activeKey: string
  onChange: (e: MenuConfig) => void
}

const Menu: Component<MenuProps> = (props) => {

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [showDrawer, setShowDrawer] = createSignal(false)


  return <div class={styles.menu}> 

    <Show when={isMobileScreen()}>
      <div style={{
        'margin-left': '6px',
        'margin-top': '9px',
        display: 'inline-block'
      }}>

        <IconButton onClick={() => setShowDrawer(true)}>
          <DensityMediumIcon />
        </IconButton>
      </div>
    </Show>
    <Show when={!isMobileScreen()}>

      <div>

        <For each={props.dataSource}>
          {(ele) => {
            return <div class={
              ele.disabled
                ? `${styles.menu_item} ${styles.menu_item_disabled}`
                : ele.key === props.activeKey
                  ? `${styles.menu_item} ${styles.menu_item_active}`
                  : styles.menu_item
            }
              onClick={() => !ele.disabled && props.onChange(ele)}>{ele.label}</div>
          }}
        </For>
      </div>
    </Show>

    {/* <Button onClick={() => setShowDrawer(true)}>letft</Button> */}
    <Show when={isMobileScreen()}>
      <Drawer
        open={showDrawer()} 
        onClose={() => setShowDrawer(false)}
      >
        <LogoBlock styleList={[{
          margin: '0 auto',
          width: '200px',
          display: 'flex',
          "justify-content": 'center',
          "align-items": 'center',
          padding: '10px 0',
          "border-radius": '6px',
          // background: 'rgba(0, 0, 0, 0.03)',
          // border: '1px solid rgba(0, 0, 0, 0.04)',
          "margin-top": '20px'
        }]} />
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            {(props.dataSource || []).map((item, index) => (
              <ListItem disablePadding>
                <ListItemButton
                  disabled={item.disabled}
                  onClick={() => {
                    !item.disabled && props.onChange(item)
                    setShowDrawer(false)
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* <div class={styles.menu_list_box}>
        <For each={props.dataSource}>
          {(ele) => {
            return <div class={
              ele.disabled
                ? `${styles.menu_list_item} ${styles.menu_list_item_disabled}`
                : ele.key === props.activeKey
                  ? `${styles.menu_list_item} ${styles.menu_list_item_active}`
                  : styles.menu_list_item
            }
              onClick={() => {
                setShowDrawer(false)
                !ele.disabled && props.onChange(ele)
              }}>{ele.label}</div>
          }}
        </For>
      </div> */}
      </Drawer>
    </Show>
  </div>
}

export default Menu