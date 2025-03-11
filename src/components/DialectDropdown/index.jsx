import { Dropdown } from 'antd';

/**
 * 自适应文本组件，根据文本长度调整字体大小，并设置背景颜色或渐变。
 *
 * @param {Object} props - 组件属性。
 * @param {string} props.dialectName - dialectName 
 * @param {string} props.char - char 
 * @param {React.ReactNode} props.children - children。 
 * @param {Function} props.onClick - 点击事件
 */
const DialectDropdown = (props) => {
  const {
    dialectName,
    char,
    children,
    onClick
  } = props;

  // console.log('----props', props)


  const dropdownItems = [
    { key: 'add_dialect_to_custom', label: `把“${dialectName}”加入自选语言`, disabled: true },
    { key: 'see_dialect_detail', label: `查看“${dialectName}”的详细信息`, disabled: false },
    { key: 'see_dialect_homephone_list', label: `查看“${dialectName}”的同音字表`, disabled: false },
    { key: 'search_homophone', label: `查询“${char}”字的“${dialectName}”同音字`, disabled: true },
    { key: 'copy_char_phonetic_now', label: `复制“${char}”字的“${dialectName}”读音`, disabled: false },
    { key: 'copy_char_phonetic_all', label: `复制“${char}”字的所有读音`, disabled: true },
    { key: 'share_char_phonetic_all', label: `分享“${char}”字的所有读音`, disabled: true },
    { key: 'copy_char', label: `复制“${char}”字`, disabled: false },
    { key: 'add_char_to_new_word', label: `把“${char}”字加入生字本`, disabled: true },
  ];

  const handleMenuClick = (e) => {
    // console.log('click', e);
    onClick && onClick(e)
  };


  return ( 
    <Dropdown menu={{ items: dropdownItems, onClick: handleMenuClick }} trigger={['click']} >
      {
        children
      }
    </Dropdown>
  );
};

export default DialectDropdown;