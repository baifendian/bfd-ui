/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import { Row } from '../Layout'
import Button from '../Button'
import Input from '../Input'
import './main.less'

class Paging extends Component {

  constructor(props) {
    super()
    this.state = {
      currentIndex: props.currentPage,
      showPage: props.maxSeries || 4,
      goPageNum: ''
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
            {this.getPages(currentIndex, pageNum)}
            <li>
              <a onClick={::this.handleRaquoClick} className={'bfd-paging__pagination-li--next '+ (currentIndex === pageNum ? 'bfd-paging__pagination-li--end' : '')}>下一页</a>
            </li>
          </ul>
          {!this.props.hideGo ? (
            <div className="bfd-paging__go">
              <label className="bfd-paging__label-font">跳转到：</label>
              <Input onChange={::this.checkNumber} value={this.state.goPageNum} className="bfd-paging__go-number"/>
              <Button onClick={::this.handleGoPage} className="btn btn-primary">GO</Button>
            </div>
          ) : ''}
        </div>
      </Row>
    )
  }

  getPages(currentPage, maxPage) {
    let pages = []
    const showPage = this.state.showPage
    const active = 'bfd-paging__pagination-li--active'
    console.log(currentPage, showPage)
    for(let i = 1; i <= maxPage; i++) {
      const isActive = currentPage == i ? active : ''
      const html = <li key={i} className={isActive} onClick={this.handleClick.bind(this, i)}><a>{i}</a></li>
      const dotsHtml = <li key={i}><span>...</span></li>
      if(i == 1) {
        pages[0] = html
        continue
      } else {
        if(i > showPage) {
          if(i == maxPage) {
            pages.push(html)
            break
          }
          if(currentPage < showPage) {
            pages.push(dotsHtml)
            i = maxPage-1
          }
          
        } else {
          pages.push(html)
        }
      }

      //pages.push(html)





    }
    return pages

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
    let number = parseInt(this.state.goPageNum) || this.state.currentIndex
    const pageNum = Math.ceil(this.props.totalPageNum / this.props.pageSize)

    if(number <= 0) {
      number = 1
    } else if(number > pageNum) {
      number = pageNum
    }

    this.setState({
      currentIndex: number
    })

    number != this.state.currentIndex && this.props.onPageChange && this.props.onPageChange(number)
  }

  checkNumber(e) {
    const value = e.target.value
    const numberReg = /^\+?[1-9][0-9]*$/
    if (!numberReg.test(value)) {
      this.setState({
        goPageNum: ''
      })
    } else {
      this.setState({
        goPageNum: value
      })
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

Paging.propTypes = {

  // 当前页面
  currentPage: PropTypes.number.isRequired,

  // 总记录数
  totalPageNum: PropTypes.number.isRequired,

  // 每页显示条数
  pageSize: PropTypes.number,

  // 页码改变事件， 参数返回被选中的页码
  onPageChange: PropTypes.func,

  // 连续页码显示的最大个数，默认为4个
  maxSeries: PropTypes.number,

  // 隐藏页面跳转功能
  hideGo: PropTypes.bool

}

export default Paging