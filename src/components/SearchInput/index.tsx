import { Component, createEffect, createSignal, For, JSX, onMount } from "solid-js";
import styles from "./index.module.less";
import settingPng from '@/assets/svg/setting.svg'
import { render } from 'solid-js/web';
// import { queryFangYans, } from "@/services"; 




const SearchInput: Component<{
  style?: JSX.CSSProperties
  defaultValue?: string
  onSearch?: Function
}> = (props) => {
  const [value, setValue] = createSignal('')
  const [open, setOpen] = createSignal(false)
  const [fangYans, setFangYans] = createSignal([])

  const [selectedDialects, setSelectFangYanId] = createSignal(

  )


  const handleShowSettingDialog = () => {
    alert("🚧施工中")
    return 
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
      <img src={settingPng} class={styles.setting_icon} />
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

  </div>
}

export default SearchInput