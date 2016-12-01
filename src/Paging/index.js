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
    const currentIndex = this.state.currentIndex
    const {
      currentPage, totalPageNum, pageSize, onPageChange, maxSeries, hideGo,
      auxiliaryRender, ...other
    } = this.props

    return (
      <Row>
        <div className="bfd-paging__layout-div bfd-paging__total-name">
          {auxiliaryRender(this.props)}
        </div>
        <div className="bfd-paging__layout-right">
          <ul className="bfd-paging__pagination">
            <li>
              <a onClick={::this.handleLaquoClick} className={'bfd-paging__pagination-li--prev '+ (currentIndex === 1 ? 'bfd-paging__pagination-li--frist' : '')}>&lt;</a>
            </li>
            {this.getPages(currentIndex, pageNum)}
            <li>
              <a onClick={::this.handleRaquoClick} className={'bfd-paging__pagination-li--next '+ (currentIndex === pageNum ? 'bfd-paging__pagination-li--end' : '')}>&gt;</a>
            </li>
          </ul>
          {!this.props.hideGo ? (
            <div className="bfd-paging__go">
              <Input onChange={::this.checkNumber} value={this.state.goPageNum} className="bfd-paging__go-number"/>
              <Button onClick={::this.handleGoPage} className="btn btn-primary">GO</Button>
            </div>
          ) : ''}
        </div>
      </Row>
    )
  }

  getPages(currentPage, maxPage) {
    const pages = []
    const showPage = this.state.showPage

    if(maxPage <= showPage + 2) {
      for(let i = 1; i <= maxPage; i++) {
        const html = this.createPageEl(i)
        pages.push(html)
      }
    } else {
      if(currentPage <= showPage) {
        for(let i = 1; i <= showPage + 2 && i <= maxPage; i++) {
          const html = this.createPageEl(i)
          if(i < maxPage - 1 && i == showPage + 1) {
            const dotsHtml = <li key={'d' + i}><span>...</span></li>
            pages.push(dotsHtml)
          } else {
            if(i == showPage + 2) {
              pages.push(this.createPageEl(maxPage, +new Date()))
            } else {
              pages.push(html)
            }
          }
        }
      } else if(currentPage > showPage && currentPage + showPage <= maxPage - 2) {
        pages[0] = this.createPageEl(1)
        if(currentPage == 3) {
          pages[1] = this.createPageEl(2)
        } else {
          pages[1] = <li key={"d1"}><span>...</span></li>
        }

        let i = currentPage
        for(; i < currentPage + showPage; i++) {
          const html = this.createPageEl(i)
          pages.push(html)
        }
        pages.push(<li key={'d' + i}><span>...</span></li>)
        pages.push(this.createPageEl(maxPage))
      } else {
        pages[0] = this.createPageEl(1)
        pages[1] = <li key={"d1"}><span>...</span></li>
        let i = currentPage
        if(maxPage - currentPage < showPage - 1) {
          i = currentPage - (showPage - 1 - (maxPage - currentPage))
        }
        for(; i <= maxPage; i++) {
          const html = this.createPageEl(i)
          pages.push(html)
        }
      }
    }
    return pages
  }

  createPageEl(num, key) {
    key = key || num
    const active = 'bfd-paging__pagination-li--active'
    const isActive = this.state.currentIndex == num ? active : ''
    return <li key={key} className={isActive} onClick={this.handleClick.bind(this, num)}><a>{num}</a></li>
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

Paging.defaultProps = {
  auxiliaryRender(props) {
    return <div>共有<span style={{color: 'red'}}>{props.totalPageNum}</span>条记录</div>
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
  hideGo: PropTypes.bool,

  /**
   * 辅助信息渲染逻辑，默认
   * ```js
   * function auxiliaryRender(props) {
   *   return <div>共有<span style={{color: 'red'}}>{props.totalPageNum}</span>条记录</div>
   * }
   * ```
   */
  auxiliaryRender: PropTypes.func
}

export default Paging
