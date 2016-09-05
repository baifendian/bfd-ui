/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/Paging/index.js
 */

import React, { Component } from 'react'
import { Row } from '../Layout'
import Button from '../Button'
import Input from '../Input'
import './main.less'

class Paging extends Component {

  constructor(props) {
    super()
    this.state = {
      currentIndex: props.currentPage,
      showPage: 4
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentPage !== nextProps.currentPage) {
      this.setState({
        currentIndex: nextProps.currentPage
      })
    }
  }

  render() {
    // 分页逻辑代码
    const pageNum = Math.ceil(this.props.totalPageNum / this.props.pageSize)
    const liArr = []
    const showPage = this.state.showPage
    const currentIndex = this.state.currentIndex
    for (let i = 1; i <= pageNum; i++) {
      // 如果分页页数小于等于规定显示的分页页数就全部显示出来
      if (i <= showPage) {
        liArr.push(<li key={i} className={currentIndex === i ? 'bfd-paging__pagination-li--active' : ''} onClick={this.handleClick.bind(this, i)}><a>{i}</a></li>)
      }
      // 当分页页数大于规定显示页数是出现....和最后页数
      if (pageNum > showPage) {
        if (i == showPage) {
          liArr[i + 1] = <li key={i+1}><span>...</span></li>
        }
      }
      // 显示最后一页
      if (pageNum == i && pageNum > showPage) {
        liArr[i] = <li key={i+1} className={currentIndex === i ? 'bfd-paging__pagination-li--active' : ''} onClick={this.handleClick.bind(this, i)}><a>{i}</a></li>
      }
      if (currentIndex + 1 > showPage && pageNum > showPage) {
        const index = currentIndex,
          show_ = index + 1
        const everpage = show_ - (showPage - 1)
        const currentArr = []
        let k = 0
        let lastPage = false
        for (let o = everpage; o <= index + 1; o++) {
          if (o <= pageNum) {
            k++
            currentArr[k] = <li key={k} className={currentIndex === o ? 'bfd-paging__pagination-li--active':''} onClick={this.handleClick.bind(this, o)}><a>{o}</a></li>
          } else {
            lastPage = true
            break
          }
        }
        liArr[0] = <li key="01" className={currentIndex === 1 ? 'bfd-paging__pagination-li--active' : ''} onClick={this.handleClick.bind(this, 1)}><a>1</a></li>
        liArr[1] = <li key="0"><span>...</span></li>
        for (let p = 2; p <= currentArr.length + 1; p++) {
          liArr[p] = currentArr[p - 2]
        }
        if (!lastPage) {
          if (index < (pageNum - 1)) {
            liArr[liArr.length] = <li key={liArr.length}><span>...</span></li>
            liArr[liArr.length] = <li key={liArr.length} className={currentIndex===pageNum ? 'bfd-paging__pagination-li--active' : ''} onClick={this.handleClick.bind(this, pageNum)}><a>{pageNum}</a></li>
          }
        }
        break
      }
    }
    return (
      <Row>
        <div className="bfd-paging__layout-div">
          <span className="bfd-paging__total-name">共有<span className="bfd-paging__total-size">{parseInt(this.props.totalPageNum)}</span>条记录</span>
        </div>
        <div className="bfd-paging__layout-right">
          <ul className="bfd-paging__pagination">
            <li>
              <a onClick={::this.handleLaquoClick} className={'bfd-paging__pagination-li--prev '+ (currentIndex === 1 ? 'bfd-paging__pagination-li--frist' : '')}>上一页</a>
            </li>
              {liArr}
            <li>
              <a onClick={::this.handleRaquoClick} className={'bfd-paging__pagination-li--next '+ (currentIndex === pageNum ? 'bfd-paging__pagination-li--end' : '')}>下一页</a>
            </li>
          </ul>
          <div className="bfd-paging__go">
            <label className="bfd-paging__label-font">跳转到：</label>
            <Input onKeyUp={::this.checkNumber} ref="inputNumber" className="bfd-paging__go-number"/>
            <Button onClick={::this.handleGoPage} className="btn btn-primary">GO</Button>
          </div>
        </div>
      </Row>
    )
  }

  handleClick(i) {
    this.setState({
      currentIndex: i
    })
    if (this.props.onPageChange) {
      this.props.onPageChange(i)
    }
    if (this.props.onChange) {
      this.props.onChange('currentPage=' + i + '&pageSize=' + this.props.pageSize, i)
    }
  }

  handleGoPage() {
    const number = this.refs.inputNumber.value
    const pageNum = Math.ceil(this.props.totalPageNum / this.props.pageSize)
    if (number <= pageNum && number > 0) {
      this.setState({
        currentIndex: parseInt(this.refs.inputNumber.value)
      })
      if (this.props.onPageChange) {
        this.props.onPageChange(parseInt(this.refs.inputNumber.value))
      }
    } else {
      this.refs.inputNumber.value = ''
    }
  }

  checkNumber() {
    const number = /^\+?[1-9][0-9]*$/
    if (!number.test(this.refs.inputNumber.value)) {
      this.refs.inputNumber.value = ''
    }
  }

  handleLaquoClick() {
    if (this.state.currentIndex > 1) {
      if (this.props.onChange) {
        this.props.onChange('currentPage=' + (this.state.currentIndex - 1) + '&pageSize=' + this.props.pageSize, this.state.currentIndex - 1)
      }
      this.setState({
        currentIndex: this.state.currentIndex - 1
      })
      if (this.props.onPageChange) {
        this.props.onPageChange(parseInt(this.state.currentIndex - 1))
      }
    }
  }

  handleRaquoClick() {
    const pageNum = Math.ceil(this.props.totalPageNum / this.props.pageSize)
    if (this.state.currentIndex < pageNum) {
      if (this.props.onChange) {
        this.props.onChange('currentPage=' + (this.state.currentIndex + 1) + '&pageSize=' + this.props.pageSize, this.state.currentIndex + 1)
      }

      this.setState({
        currentIndex: this.state.currentIndex + 1
      })
      if (this.props.onPageChange) {
        this.props.onPageChange(parseInt(this.state.currentIndex + 1))
      }
    }
  }
}

export default Paging