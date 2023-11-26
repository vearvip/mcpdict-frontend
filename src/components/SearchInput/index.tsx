import { Component, createEffect, createSignal, For, JSX, onMount } from "solid-js";
import styles from "./index.module.less";
import settingPng from '@/assets/svg/setting.svg'
import { render } from 'solid-js/web';
import { queryFangYans,   } from "@/services";
import Dialog  from "../Dialog";


  

const SearchInput: Component<{
  style?: JSX.CSSProperties
  defaultValue?: string
  onSearch?: Function 
}> = (props) => {
  const [value, setValue] = createSignal('')
  const [open, setOpen] = createSignal(false)
  const [fangYans, setFangYans] = createSignal([])
  
  const [selectFangYanId, setSelectFangYanId] = createSignal(
    
  )


  const handleShowSettingDialog = () => {
    console.log('👒', fangYans)
    console.log('===============')
    // setOpen(true) 
    // const _selectFangYanId = localStorage.getItem('selectFangYanId')
    // if (_selectFangYanId) {
    //   setSelectFangYanId(_selectFangYanId)
    // } else {
    //   setSelectFangYanId(3)
    // } 


    let dialog = Dialog.show({
      title: '筛选查询条件',
      content: <div>哈哈哈哈</div>,
      onClose() {
        dialog.close()
      }
    })
    console.log("👒", dialog)
  }

  const handleFangYanChange = (e) => {
    const id=e.target.value
    console.log('🍓', id)
    setSelectFangYanId(id)
    localStorage.setItem('selectFangYanId', id)
  }


  onMount(async () => {
    const data = await queryFangYans()
    // setLangs(data.langs)
    console.log('data', data)
    setFangYans(data)
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