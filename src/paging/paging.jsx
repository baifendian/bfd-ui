/**
 * Created by BFD_270 on 2016-02-22.
 */
import 'bfd-bootstrap'
import React, {PropTypes} from 'react'
import classNames from 'classnames'
export default React.createClass({
    preventDefault(){
        let e = window.event
        //如果提供了事件对象，则这是一个非IE浏览器
        if ( e && e.preventDefault )
        //阻止默认浏览器动作(W3C)
            e.preventDefault();
        else
        //IE中阻止函数器默认动作的方式
            window.event.returnValue = false;
        return false;
    },
    getInitialState() {
      return {
          currentIndex: 1,pageNum:Math.ceil(this.props.totalNum/ this.props.rowsPage),liArr:[],showPage:10
      }
    },
    handleClick(i, e) {

        this.preventDefault()
        this.setState({currentIndex: i})

    },
    handleLaquoClick(){
        this.preventDefault()
        if(this.state.currentIndex>1){
            this.setState({currentIndex:this.state.currentIndex-1})
        }

    },
    handleRaquoClick(){
        this.preventDefault()
        if(this.state.currentIndex<this.state.pageNum){
            this.setState({currentIndex:this.state.currentIndex+1})
        }
    }
    ,
    render() {
        let pageNum=this.state.pageNum;
            let liArr=[],showPage=this.state.showPage
            for(let i = 1;i<=pageNum;i++){
                //页数最多只能显示10页
                if(i<=showPage){
                    liArr.push(<li key={i} className={this.state.currentIndex === i ? 'active':''} onClick={this.handleClick.bind(this, i)} ><a>{i}</a></li>)
                    //如果页数超过10页 显示 ...
                    if(i==showPage){
                        liArr[i+1]=<li key={i+1}><a>...</a></li>
                    }
                }
                //显示最后一页
                if(pageNum==i){
                    liArr[i]=<li key={i} className={this.state.currentIndex === i ? 'active':''} onClick={this.handleClick.bind(this, i)}><a>{i}</a></li>
                }

                //如果当前页大于第十页，页码数就整体往后数
                if(this.state.currentIndex+1>showPage){

                    let index = this.state.currentIndex,show_=index+1;
                    let everpage = show_-(showPage-1)
                    let currentArr = []
                    var k = 0;

                    let lastPage = false
                    for(let o=everpage;o<=index+1;o++){
                        if(o<=pageNum){
                            k++
                            currentArr[k]=<li key={k} className={this.state.currentIndex === o ? 'active':''} onClick={this.handleClick.bind(this, o)} ><a>{o}</a></li>
                        }else{
                            lastPage = true
                            break
                        }
                    }

                        liArr[0]=<li key="01" className={this.state.currentIndex === 1 ? 'active':''} onClick={this.handleClick.bind(this, 1)}><a>1</a></li>
                        liArr[1]=<li key="0" ><a>...</a></li>

                    for(let p=2;p<=currentArr.length+1;p++){
                        liArr[p]=currentArr[p-2]
                    }
                    if(!lastPage){
                        if(index<(pageNum-1)){
                            liArr[liArr.length]= <li key={liArr.length} ><a>...</a></li>
                            liArr[liArr.length]= <li key={liArr.length} className={this.state.currentIndex === pageNum ? 'active':''} onClick={this.handleClick.bind(this, pageNum)}><a>{pageNum}</a></li>
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