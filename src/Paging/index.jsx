/**
2	 
- * Created by BFD_270 on 2016-02-22.
3	 
- */
	 
import 'bfd-bootstrap'
	 
import React, {PropTypes} from 'react'
	 
import classNames from 'classnames'
	 
export default React.createClass({
	 

	 
	getInitialState() {
		return {
			currentIndex: 1,
			showPage: 10
		}
	},
	handleClick(i, e) {
		this.setState({	currentIndex: i	})

		this.props.onChange("currentPage=" + i + "&pageSize=" + this.props.pageSize, i)
	},

		handleLaquoClick() {
			if (this.state.currentIndex > 1) {
				this.props.onChange("currentPage=" + (this.state.currentIndex - 1) + "&pageSize=" + this.props.pageSize, this.state.currentIndex - 1)
				this.setState({	currentIndex: this.state.currentIndex - 1})
			}
		},
	 
	handleRaquoClick() {
		let pageNum = Math.ceil(this.props.totalPageNum / this.props.pageSize)
		if (this.state.currentIndex < pageNum) {
			this.props.onChange("currentPage=" + (this.state.currentIndex + 1) + "&pageSize=" + this.props.pageSize, this.state.currentIndex + 1)
			this.setState({
				currentIndex: this.state.currentIndex + 1
			})
		}
	},
	 
   render() {
	 
    //分页逻辑代码
     let pageNum = Math.ceil(this.props.totalPageNum / this.props.pageSize)
 
      let liArr = [] , showPage = this.state.showPage
 
      var currentIndex = this.props.currentPage
 
      for ( let i = 1; i <= pageNum; i++ ) {
	 
          //页数最多只能显示10页 
        if ( i <= showPage ) {
	 
            liArr.push( <li key={i} className={this.state.currentIndex === i ? 'active':''}
	 
                              onClick={this.handleClick.bind(this, i)}><a>{i}</a></li> )
	 
               //如果页数超过10页 显示 ... 
            if ( i == showPage ) {	 
                   liArr[ i + 1 ] = <li key={i+1}><a>...</a></li> 
            }
	 
        }

          //显示最后一页 
        if ( pageNum == i && pageNum>showPage) {	 
               liArr[ i ] = <li key={i+1} className={this.state.currentIndex === i ? 'active':''} 
                              onClick={this.handleClick.bind(this, i)}><a>{i}</a></li>
 
          }
	 

	 
        //如果当前页大于第十页，页码数就整体往后数
 
        if ( this.state.currentIndex + 1 > showPage ) {
 
            let index = currentIndex , show_ = index + 1;
 
            let everpage = show_ - (showPage - 1)
 
            let currentArr = []
 
            var k = 0;
 
            let lastPage = false
 
           for ( let o = everpage; o <= index + 1; o++ ) {

                if ( o <= pageNum ) {
 
                    k++
 
                   currentArr[ k ] = <li key={k} className={this.state.currentIndex === o ? 'active':''}
 
                                          onClick={this.handleClick.bind(this, o)}><a>{o}</a></li>
 
               } else {
 
                    lastPage = true
 
                  break
                 }
 
           }
	 
           liArr[ 0 ] = <li key="01" className={this.state.currentIndex === 1 ? 'active':''}
 
                            onClick={this.handleClick.bind(this, 1)}><a>1</a></li>
                 liArr[ 1 ] = <li key="0"><a>...</a></li>
 
           for ( let p = 2; p <= currentArr.length + 1; p++ ) {

               liArr[ p ] = currentArr[ p - 2 ]
 
           }
	 
          if ( !lastPage ) {
                     if ( index < (pageNum - 1) ) {
 
                   liArr[ liArr.length ] = <li key={liArr.length}><a>...</a></li>

                   liArr[ liArr.length ] =

                     <li key={liArr.length} className={this.state.currentIndex === pageNum ? 'active':''}
 
                         onClick={this.handleClick.bind(this, pageNum)}><a>{pageNum}</a></li>
 
                }
 
            }	 
                break	 
            }
	 
        }	 
        return(<ul className="pagination">
 
            <li ><a onClick={this.handleLaquoClick} >&laquo;</a></li>
	 
                {
	 
                    liArr
	 
                }
	 
            <li><a onClick={this.handleRaquoClick}>&raquo;</a></li>
	 
            </ul>) 
   }
	 
})