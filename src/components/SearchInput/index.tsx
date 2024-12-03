import { Component, createEffect, createSignal, For, JSX, onMount } from "solid-js";
import styles from "./index.module.less";
import useMediaQuery from '@suid/material/useMediaQuery';
import { useTheme } from '@suid/material/styles'; 
import Dialog from "../Dialog";




const SearchInput: Component<{
  style?: JSX.CSSProperties
  defaultValue?: string
  onSearch?: Function
}> = (props) => {
  const [value, setValue] = createSignal('')
  const [open, setOpen] = createSignal(false)
  const isMobileScreen = useMediaQuery(useTheme().breakpoints.down('md')); 

  const [selectedDialects, setSelectFangYanId] = createSignal(

  )


  const handleShowSettingDialog = () => {
    setOpen(true)
  }



  onMount(async () => {
    // const data = await queryFangYans()
    // setLangs(data.langs)
    // console.log('data', data)
    // setFangYans(data)
  })
  createEffect(() => setValue(props?.defaultValue ?? ''))

  return <div class={styles.input_box} style={props.style || {}}>
    <div class={styles.setting_btn} onClick={handleShowSettingDialog}>
      <i class="bi bi-gear"></i>
      {/* <img src={settingPng} class={styles.setting_icon} /> */}
    </div>
    <input
      placeholder="请搜索，单次最多十个汉字"
      size="large"
      value={value()}
      class={styles.input}
      onkeyup={(event) => {
        if (event.key === 'Enter') {
          props.onSearch && props.onSearch(value())
        }
      }}
      onInput={(_value: any) => {
        setValue(_value.target.value)
      }}
    ></input>
    <div class={styles.search_btn} onClick={() => props.onSearch && props.onSearch(value())}>
      搜 索
    </div>
      <Dialog title="筛选" open={open()} onClose={() => setOpen(false)}>
      🚧施工中
      </Dialog>
  </div>
}

export default SearchInput