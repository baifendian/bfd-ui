/**
 * Created by BFD_270 on 2016-02-22.
 */
import 'bfd-bootstrap'
import React from 'react'
import './main.less'

export default React.createClass({
  getInitialState() {
    return {
      currentIndex: this.props.currentPage,
      showPage: 4
    }
  },

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
  },

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
  },

  checkNumber() {
    const number = /^\+?[1-9][0-9]*$/
    if (!number.test(this.refs.inputNumber.value)) {
      this.refs.inputNumber.value = ''
    }
  },

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
  },

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
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.currentPage !== nextProps.currentPage) {
      this.setState({
        currentIndex: nextProps.currentPage
      })
    }
  },

  render() {
    // 分页逻辑代码
    const pageNum = Math.ceil(this.props.totalPageNum / this.props.pageSize)
    const liArr = []
    const showPage = this.state.showPage
    const currentIndex = this.state.currentIndex
    for (let i = 1; i <= pageNum; i++) {
      // 如果分页页数小于等于规定显示的分页页数就全部显示出来
      if (i <= showPage) {
        liArr.push(<li key={i} className={currentIndex === i ? '_active' : ''} onClick={this.handleClick.bind(this, i)}><a>{i}</a></li>)
      }
      // 当分页页数大于规定显示页数是出现....和最后页数
      if (pageNum > showPage) {
        if (i == showPage) {
          liArr[i + 1] = <li key={i+1} className="page"><span>...</span></li>
        }
      }
      // 显示最后一页
      if (pageNum == i && pageNum > showPage) {
        liArr[i] = <li key={i+1} className={currentIndex === i ? '_active' : ''} onClick={this.handleClick.bind(this, i)}><a>{i}</a></li>
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
            currentArr[k] = <li key={k} className={currentIndex === o ? '_active':''} onClick={this.handleClick.bind(this, o)}><a>{o}</a></li>
          } else {
            lastPage = true
            break
          }
        }
        liArr[0] = <li key="01" className={currentIndex === 1 ? '_active' : ''} onClick={this.handleClick.bind(this, 1)}><a>1</a></li>
        liArr[1] = <li key="0" className="page"><span>...</span></li>
        for (let p = 2; p <= currentArr.length + 1; p++) {
          liArr[p] = currentArr[p - 2]
        }
        if (!lastPage) {
          if (index < (pageNum - 1)) {
            liArr[liArr.length] = <li key={liArr.length} className="page"><a>...</a></li>
            liArr[liArr.length] = <li key={liArr.length} className={currentIndex===pageNum ? '_active' : ''} onClick={this.handleClick.bind(this, pageNum)}><a>{pageNum}</a></li>
          }
        }
        break
      }
    }
    return (
      <div className="bfd-paging row">
        <div className="layout-div form-inline pull-left">
          <span className="total-name">共有<span className="total-size">{parseInt(this.props.totalPageNum)}</span>条记录</span>
        </div>
        <div className="pull-right layout-right">
          <ul className="pagination">
            <li><a onClick={this.handleLaquoClick} className={'prev '+ (currentIndex === 1 ? 'frist' : '')}>上一页</a></li>
              {liArr}
            <li><a onClick={this.handleRaquoClick} className={'next '+ (currentIndex === pageNum ? 'end' : '')}>下一页</a></li>
          </ul>
          <div className="layout-div form-inline">
            <label className="label-font">跳转到：</label>
            <input onKeyUp={this.checkNumber} ref="inputNumber" className="form-control input-sm number"/>
            <button onClick={this.handleGoPage} className="btn btn-primary">GO</button>
          </div>
        </div>
      </div>
    )
  }
})