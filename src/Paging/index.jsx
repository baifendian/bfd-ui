/**
2	 
- * Created by BFD_270 on 2016-02-22.
3	 
- */
	 
import 'bfd-bootstrap'
	 
import React, {PropTypes} from 'react'
	 
import classNames from 'classnames'
import './main.less'
export default React.createClass({
	 

	 
	getInitialState() {
		return {
			currentIndex: 1,
			showPage: 4
		}
	},
	handleClick(i, e) {
		this.setState({	currentIndex: i	})
    this.props.onPageChange(i)
		this.props.onChange("currentPage=" + i + "&pageSize=" + this.props.pageSize, i)
	},
  handleGoPage(){
    let number = this.refs.inputNumber.value
    let pageNum=Math.ceil(this.props.totalPageNum / this.props.pageSize)
    if(number<=pageNum&&number>0){
      this.setState({	currentIndex: parseInt(this.refs.inputNumber.value)	})
      this.props.onPageChange(parseInt(this.refs.inputNumber.value))
    }else{
      this.refs.inputNumber.value="";
    }

  },
  checkNumber(){
    let number = /^\+?[1-9][0-9]*$/;
    if(!number.test(this.refs.inputNumber.value)){
      this.refs.inputNumber.value="";
    }
  }
  ,
		handleLaquoClick() {
			if (this.state.currentIndex > 1) {
				this.props.onChange("currentPage=" + (this.state.currentIndex - 1) + "&pageSize=" + this.props.pageSize, this.state.currentIndex - 1)
				this.setState({	currentIndex: this.state.currentIndex - 1})
        this.props.onPageChange(parseInt(this.state.currentIndex - 1))
			}
		},
	 
	handleRaquoClick() {
    let pageNum=Math.ceil(this.props.totalPageNum / this.props.pageSize)
		if (this.state.currentIndex < pageNum) {
			this.props.onChange("currentPage=" + (this.state.currentIndex + 1) + "&pageSize=" + this.props.pageSize, this.state.currentIndex + 1)
			this.setState({
				currentIndex: this.state.currentIndex + 1
			})
      this.props.onPageChange(parseInt(this.state.currentIndex + 1))
		}
	},
	 
   render() {
	 
    //分页逻辑代码
     let pageNum = Math.ceil(this.props.totalPageNum / this.props.pageSize)
 
      let liArr = [] , showPage = this.state.showPage
      var currentIndex = this.props.currentPage
      for ( let i = 1; i <= pageNum; i++ ) {
        if ( i <= showPage ) {
            liArr.push( <li key={i} className={this.state.currentIndex === i ? '_active':''}
                              onClick={this.handleClick.bind(this, i)}><a>{i}</a></li> )
            if ( i == showPage ) {
                   liArr[ i + 1 ] = <li key={i+1}><a>...</a></li>
            }
        }
          //显示最后一页
        if ( pageNum == i && pageNum>showPage) {
               liArr[ i ] = <li key={i+1} className={this.state.currentIndex === i ? '_active':''}
                              onClick={this.handleClick.bind(this, i)}><a>{i}</a></li>

          }
        if ( this.state.currentIndex + 1 > showPage ) {

            let index = this.state.currentIndex , show_ = index + 1;
            let everpage = show_ - (showPage - 1)
            let currentArr = []
            var k = 0;
            let lastPage = false
            for ( let o = everpage; o <= index + 1; o++ ) {
                if ( o <= pageNum ) {
                    k++
                    currentArr[ k ] = <li key={k} className={this.state.currentIndex === o ? '_active':''}
                                          onClick={this.handleClick.bind(this, o)}><a>{o}</a></li>
               }else{
                    lastPage = true
                  break
                 }
           }
           liArr[ 0 ] = <li key="01" className={this.state.currentIndex === 1 ? '_active':''}
                            onClick={this.handleClick.bind(this, 1)}><a>1</a></li>
                 liArr[ 1 ] = <li key="0"><a>...</a></li>
           for ( let p = 2; p <= currentArr.length + 1; p++ ) {
               liArr[ p ] = currentArr[ p - 2 ]
           }
          if ( !lastPage ) {
             if ( index < (pageNum - 1) ) {
                   liArr[ liArr.length ] = <li key={liArr.length}><a>...</a></li>
                   liArr[ liArr.length ] = <li key={liArr.length} className={this.state.currentIndex === pageNum ? '_active':''}
                         onClick={this.handleClick.bind(this, pageNum)}><a>{pageNum}</a></li>
                }
             }
                break	 
            }
        }
        return(
          <div className="bfd-paging row">
            <div className="col-md-8 layout-style">
             <ul className="pagination">
               <li ><a onClick={this.handleLaquoClick} >上一页</a></li>
                 {liArr}
               <li><a onClick={this.handleRaquoClick}>下一页</a></li>
              </ul>
            </div>
            <div className="col-md-3 layout-div">
              <label className="label-font">跳转到：</label>
              <input  onKeyUp={this.checkNumber} ref="inputNumber" className="input-number"/>
              <button onClick={this.handleGoPage} className="btn btn-primary">GO</button>
            </div>
          </div>
        )
   }
	 
})