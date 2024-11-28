import { Component } from 'solid-js'

const Skeleton: Component = () => {
  return <div class="ant-skeleton">
    <div class="ant-skeleton-content">
      <h3 class="ant-skeleton-title" style="width: 38%;"></h3>
      <ul class="ant-skeleton-paragraph">
        <li></li>
        <li></li>
        <li style="width: 61%;"></li>
      </ul>
    </div>
  </div>
}

export default Skeleton